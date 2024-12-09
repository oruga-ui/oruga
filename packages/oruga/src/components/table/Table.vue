<script setup lang="ts" generic="T">
import {
    computed,
    ref,
    watch,
    onMounted,
    nextTick,
    useSlots,
    toValue,
    useTemplateRef,
    type Ref,
    type MaybeRefOrGetter,
} from "vue";

import OCheckbox from "@/components/checkbox/Checkbox.vue";
import OIcon from "@/components/icon/Icon.vue";
import OInput from "@/components/input/Input.vue";
import OLoading from "@/components/loading/Loading.vue";
import OSlotComponent from "@/components/utils/SlotComponent";

import OTableMobileSort from "./TableMobileSort.vue";
import OTableColumn from "./TableColumn.vue";
import OTablePagination from "./TablePagination.vue";

import { getDefault } from "@/utils/config";
import {
    getValueByPath,
    toCssDimension,
    escapeRegExpChars,
    removeDiacriticsFromString,
    sortBy,
    isDefined,
    getPropertyValue,
} from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useProviderParent,
    useMatchMedia,
    useDebounce,
    useObjectMap,
    useSequentialId,
} from "@/composables";

import type { ClassBind } from "@/types";
import type {
    TableColumn,
    TableRow,
    TableColumnItem,
    TableColumnComponent,
    TableComponent,
} from "./types";
import type { TableProps } from "./props";

/**
 * Tabulated data are sometimes needed, it's even better when it's responsive
 * @displayName Table
 * @requires ./TableColumn.vue
 * @style _table.scss
 */
defineOptions({
    isOruga: true,
    name: "OTable",
    configField: "table",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<TableProps<T>>(), {
    override: undefined,
    data: undefined,
    columns: undefined,
    rowKey: () => getDefault("table.rowKey"),
    rowClass: getDefault("table.rowClass", () => ""),
    thAttrs: undefined,
    tdAttrs: undefined,
    customCompare: undefined,
    bordered: () => getDefault("table.bordered", false),
    striped: () => getDefault("table.striped", false),
    narrowed: () => getDefault("table.narrowed", false),
    hoverable: () => getDefault("table.hoverable", false),
    selected: undefined,
    selectable: () => getDefault("table.selectable", false),
    isRowSelectable: () => true,
    showHeader: () => getDefault("table.showHeader", true),
    draggable: false,
    draggableColumn: false,
    scrollable: undefined,
    stickyHeader: false,
    height: undefined,
    debounceSearch: () => getDefault("table.debounceSearch"),
    checkable: false,
    stickyCheckbox: false,
    headerCheckable: true,
    checkedRows: () => [],
    checkboxPosition: () => getDefault("table.checkboxPosition", "left"),
    checkboxVariant: () => getDefault("table.checkboxVariant"),
    isRowChecked: undefined,
    isRowCheckable: getDefault("table.isRowCheckable", () => true),
    backendSorting: () => getDefault("table.backendSorting", false),
    defaultSort: () => getDefault("table.defaultSort"),
    defaultSortDirection: () => getDefault("table.defaultSortDirection", "asc"),
    sortIcon: () => getDefault("table.sortIcon", "arrow-up"),
    sortIconSize: () => getDefault("table.sortIconSize", "small"),
    iconPack: () => getDefault("table.iconPack"),
    detailed: false,
    detailedRows: () => [],
    isDetailedVisible: getDefault("table.isDetailedVisible", () => true),
    showDetailIcon: () => getDefault("table.showDetailIcon", true),
    detailIcon: () => getDefault("table.detailIcon", "chevron-right"),
    customDetailRow: false,
    detailTransition: () => getDefault("table.detailTransition", "slide"),
    paginated: () => getDefault("table.paginated", false),
    backendPagination: false,
    total: 0,
    currentPage: 1,
    perPage: () => getDefault("table.perPage", 20),
    paginationPosition: () => getDefault("table.paginationPosition", "bottom"),
    paginationSize: () => getDefault("table.paginationSize", "small"),
    paginationRounded: () => getDefault("table.paginationRounded", false),
    paginationSimple: () => getDefault("table.paginationSimple", false),
    paginationOrder: () => getDefault("table.paginationOrder"),
    backendFiltering: () => getDefault("table.backendFiltering", false),
    filtersIcon: () => getDefault("table.filterIcon"),
    filtersPlaceholder: () => getDefault("table.filterPlaceholder"),
    filtersEvent: "",
    emptyLabel: () => getDefault("table.emptyLabel"),
    emptyIcon: () => getDefault("table.emptyIcon"),
    emptyIconSize: () => getDefault("table.emptyIconSize", "large"),
    loading: false,
    loadingIcon: () => getDefault("table.loadingIcon", "loading"),
    loadingLabel: () => getDefault("table.loadingLabel"),
    mobileBreakpoint: () => getDefault("table.mobileBreakpoint"),
    mobileCards: () => getDefault("table.mobileCards", true),
    mobileSortPlaceholder: () => getDefault("table.mobileSortPlaceholder"),
    ariaNextLabel: () => getDefault("table.ariaNextLabel"),
    ariaPreviousLabel: () => getDefault("table.ariaPreviousLabel"),
    ariaPageLabel: () => getDefault("table.ariaPageLabel"),
    ariaCurrentLabel: () => getDefault("table.ariaCurrentLabel"),
});

const emits = defineEmits<{
    /**
     * currentPage prop two-way binding
     * @param value {number} updated currentPage prop
     */
    "update:currentPage": [value: number];
    /**
     * is emitted each time the table data is processed into rows
     * @param value {TableRow[]} computed table rows
     */
    processed: [value: TableRow<T>[]];
    /**
     * on pagination page change event
     * @param page {number} updated page
     */
    "page-change": [page: number];
    /**
     * select prop two-way binding
     * @param value {T} updated select prop
     */
    "update:selected": [value: T];
    /**
     * on row select event
     * @param newRow {T} new select value
     * @param oldRow {T} old select value
     */
    select: [newRow: T, oldRow: T];
    /**
     * on row checked event
     * @param value {T[]} all checked rows
     * @param row {T} row data
     */
    check: [value: T[], row: T];
    /**
     * on all rows checked event
     * @param value {T[]} all checked rows
     */
    "check-all": [value: T[]];
    /**
     * checkedRows prop two-way binding
     * @param value {T[]} updated checkedRows prop
     */
    "update:checkedRows": [value: T[]];
    /**
     * on column sort change event
     * @param column {TableColumn} column data
     * @param direction {string}  'asc' or 'desc'
     * @param event {Event} native  event
     */
    sort: [column: TableColumn<T>, direction: "asc" | "desc", event: Event];
    /**
     * on filter change event
     * @param filters {object} filter object
     */
    "filters-change": [value: Record<string, string>];
    /**
     * on native filter event based on props filtersEvent
     * @param filtersEvent {string} props filtersEvent value
     * @param filters {object} filter object
     * @param event {Event} native  event
     */
    "filters-event": [
        filtersEvent: string,
        filters: Record<string, string>,
        event: Event,
    ];
    /**
     * detailedRows prop two-way binding
     * @param value {T[]} updated detailedRows prop
     */
    "update:detailedRows": [value: T[]];
    /**
     * on details open event
     * @param row {T} row data
     */
    "details-open": [row: T];
    /**
     * on details close event
     * @param row {T} row data
     */
    "details-close": [row: T];
    /**
     * on row click event
     * @param row {T} row data
     * @param index {number} index of clicked row
     * @param event {Event} native click event
     */
    click: [row: T, index: number, event: Event];
    /**
     * on row double click event
     * @param row {T} row data
     * @param index {number} index of clicked row
     * @param event {Event} native click event
     */
    dblclick: [row: T, index: number, event: Event];
    /**
     * on row right click event
     * @param row {T} row data
     * @param index {number} index of clicked row
     * @param event {Event} native contextmenu event
     */
    contextmenu: [row: T, index: number, event: Event];
    /**
     * on row mouseenter event
     * @param row {T} row data
     * @param index {number} index of clicked row
     * @param event {Event} native mouseenter event
     */
    mouseenter: [row: T, index: number, event: Event];
    /**
     * on row mouseleave event
     * @param row {T} row data
     * @param index {number} index of clicked row
     * @param event {Event} native mouseleave event
     */
    mouseleave: [row: T, index: number, event: Event];
    /**
     * on cell click event
     * @param row {T} row data
     * @param column {TableColumn} column data
     * @param index {number} row index
     * @param colindex {number} column index
     * @param event {Event} native click event
     */
    "cell-click": [
        row: T,
        column: TableColumn<T>,
        index: number,
        colindex: number,
        event: Event,
    ];
    /**
     * on row dragstart event
     * @param row {T} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragstart event
     */
    dragstart: [row: T, index: number, event: DragEvent];
    /**
     * on row dragend event
     * @param row {T} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragend event
     */
    dragend: [row: T, index: number, event: DragEvent];
    /**
     * on row drop event
     * @param row {T} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native drop event
     */
    drop: [row: T, index: number, event: DragEvent];
    /**
     * on row dragleave event
     * @param row {T} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragleave event
     */
    dragleave: [row: T, index: number, event: DragEvent];
    /**
     * on row dragover event
     * @param row {T} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragover event
     */
    dragover: [row: T, index: number, event: DragEvent];
    /**
     * on column columndragstart event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragstart event
     */
    columndragstart: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndragend event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragend event
     */
    columndragend: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndrop event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndrop event
     */
    columndrop: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndragleave event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragleave event
     */
    columndragleave: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndragover event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragover event
     */
    columndragover: [column: TableColumn<T>, index: number, event: DragEvent];
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const isMobileActive = computed(() => props.mobileCards && isMobile.value);

const slotRef = useTemplateRef("slotElement");

// provided data is a computed ref to enjure reactivity
const provideData = computed<TableComponent>(() => ({
    isColumnSorted,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<TableColumnComponent<T>>({
    rootRef: slotRef,
    data: provideData,
});

/** all defined columns */
const tableColumns = computed<TableColumnItem<T>[]>(() => {
    if (!childItems.value) return [];
    return childItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data!),
        thAttrsData: {},
        tdAttrsData: [],
    }));
});

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** all defined data elements as an object map */
const tableData = computed<TableRow<T>[]>(() =>
    useObjectMap(props.data, props.rowKey, nextSequence),
);

const tableRows = ref(tableData.value) as Ref<TableRow<T>[]>;

/** recompute table rows when table data change */
watch(tableData, () => processTableData());

/**
 * Compute tableRows based on:
 *   1. Filter data if it's not backend-filtered.
 *   2. Sort data if it's not backend-sorted.
 *   3. Update internal value.
 */
function processTableData(): void {
    // create new array to don't mutate the original data order
    let rows = [...tableData.value];

    // if not backend filtered, filter rows
    if (!props.backendFiltering) rows = filterRows(rows);

    // if not backend sorted, sort rows
    if (!props.backendSorting) rows = sortByColumn(rows);

    tableRows.value = rows;
    emits("processed", rows); // emit computed rows every time they the data get changed
}

/** Shows total data. If backend paginated, use props total else use rows data length as pagination total */
const tableTotal = computed(() =>
    props.backendPagination ? props.total : tableRows.value.length,
);

const tableCurrentPage = defineModel<number>("currentPage", { default: 1 });

/** visible rows based on current page */
const visibleRows = computed<TableRow<T>[]>((): TableRow<T>[] => {
    if (!props.paginated || props.backendPagination) return tableRows.value;

    const currentPage = tableCurrentPage.value;
    const perPage = Number(props.perPage);

    if (tableRows.value.length <= perPage) return tableRows.value;

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return tableRows.value.slice(start, end);
});

const visibleColumns = computed(() => {
    if (!tableColumns.value) return [];
    return tableColumns.value.filter(
        (column) => column.visible || column.visible === undefined,
    );
});

/** process thAttrs & tdAttrs when row or columns got changed */
watch([visibleRows, visibleColumns], () => {
    if (visibleColumns.value.length && visibleRows.value.length) {
        for (let i = 0; i < visibleColumns.value.length; i++) {
            const col = visibleColumns.value[i];
            // create additional th attrs data
            const thAttrs =
                typeof props.thAttrs === "function" ? props.thAttrs(col) : {};
            col.thAttrsData = Object.assign(thAttrs, col.thAttrs);
            // create additional td attrs data
            col.tdAttrsData = visibleRows.value.map((data) => {
                const tdAttrs =
                    typeof props.tdAttrs === "function"
                        ? props.tdAttrs(data.value, col)
                        : {};
                return Object.assign(tdAttrs, col.tdAttrs);
            });
        }
    }
});

/** total column count based if it's checkable or expanded */
const columnCount = computed(() => {
    let count = visibleColumns.value.length;
    count += props.checkable ? 1 : 0;
    count += props.detailed && props.showDetailIcon ? 1 : 0;
    return count;
});

/** check if has any searchable column. */
const hasSearchableColumns = computed(() =>
    tableColumns.value.some((column) => column.searchable),
);

/** check if table is scrollable */
const isScrollable = computed(() => {
    if (props.scrollable) return true;
    if (!tableColumns.value) return false;
    return tableColumns.value.some((column) => column.sticky);
});

const slots = useSlots();

/** check if table hast subheadings  */
const hasCustomSubheadings = computed(() => {
    if (slots.subheading) return true;
    return tableColumns.value.some((column) => !!column.subheading);
});

/**
 * Check if footer slot has custom content.
 * Must be called during rendering.
 */
function hasCustomFooterSlot(): boolean {
    if (!slots.footer) return false;

    const footer = slots.footer();
    if (footer.length > 1) return true;

    const tag = footer[0]["type"];
    return tag === "th" || tag === "td";
}

/** get the formated row value for a column */
function getColumnValue(row: T, column: TableColumn<T>): string {
    return getPropertyValue(row, column.field, column.formatter);
}

/** check if two rows are equal by a custom compare function or the rowKey attribute */
function isRowEqual(
    sourceRow: MaybeRefOrGetter<T>,
    targetRow: MaybeRefOrGetter<T>,
): boolean {
    const el1 = toValue(sourceRow);
    const el2 = toValue(targetRow);
    if (!isDefined(targetRow)) return false;
    if (typeof props.customCompare === "function")
        return props.customCompare(el1, el2);
    if (props.rowKey)
        return (
            getPropertyValue(el1, props.rowKey) ==
            getPropertyValue(el2, props.rowKey)
        );
    return el1 == el2;
}

// --- Select Feature ---

const tableSelectedRow = defineModel<T>("selected", { default: undefined });

/** table arrow keys listener, change selection */
function onArrowPressed(pos: number, event: KeyboardEvent): void {
    if (!visibleRows.value.length) return;

    let index =
        visibleRows.value.findIndex((row) =>
            isRowEqual(row.value, tableSelectedRow.value),
        ) + pos;

    // prevent from going up from first and down from last
    index =
        index < 0
            ? 0
            : index > visibleRows.value.length - 1
              ? visibleRows.value.length - 1
              : index;

    const row = visibleRows.value[index];

    if (!props.isRowSelectable(row.value)) {
        let newIndex: number | undefined;
        if (pos > 0) {
            for (
                let i = index;
                i < visibleRows.value.length && newIndex === undefined;
                i++
            ) {
                if (props.isRowSelectable(visibleRows.value[i].value))
                    newIndex = i;
            }
        } else {
            for (let i = index; i >= 0 && newIndex === undefined; i--) {
                if (props.isRowSelectable(visibleRows.value[i].value))
                    newIndex = i;
            }
        }
        if (newIndex != undefined && newIndex >= 0) {
            selectRow(visibleRows.value[newIndex], index, event);
        }
    } else {
        selectRow(row, index, event);
    }
}

/**
 * Row click listener.
 * Emit all necessary events.
 */
function selectRow(row: TableRow<T>, index: number, event: Event): void {
    emits("click", row.value, index, event);

    if (!props.selectable) return;

    if (isRowEqual(tableSelectedRow, row.value)) return;
    if (!props.isRowSelectable(row.value)) return;

    tableSelectedRow.value = row.value;
    // emit new and old row
    emits("select", row.value, tableSelectedRow.value);
}

// --- Filter Feature ---

const filters = ref<Record<string, string>>({});

watch(
    filters,
    (value) => {
        if (props.backendFiltering) return;
        if (props.debounceSearch)
            useDebounce(
                () => handleFiltersChange(value),
                props.debounceSearch,
            )();
        else handleFiltersChange(value);
    },
    { deep: true },
);

function handleFiltersChange(value: Record<string, string>): void {
    emits("filters-change", value);
    // recompute rows with updated filters
    processTableData();
}

function onFiltersEvent(event: Event): void {
    emits("filters-event", props.filtersEvent, filters.value, event);
}

/** check whether a row is filtered by filter or not */
function isRowFiltered(row: T): boolean {
    if (!Object.values(filters.value).filter(Boolean).length) return true;
    return Object.entries(filters.value).some(([key, filter]) => {
        if (!filter) return false;
        // get column for filter
        const column = tableColumns.value.find((c) => c.field === key);
        // if column has onSearch return result
        if (typeof column?.customSearch === "function")
            return column.customSearch(row, filter);

        const value =
            typeof row === "object" && !!row ? getValueByPath(row, key) : row;
        if (value == null) return false;
        // if number compare values
        if (Number.isInteger(value)) return value === Number(filter);
        const re = new RegExp(escapeRegExpChars(filter), "i");
        if (Array.isArray(value))
            return value.some(
                (val) =>
                    re.test(removeDiacriticsFromString(val)) || re.test(val),
            );
        if (typeof value !== "string") return !!value;
        return re.test(removeDiacriticsFromString(value)) || re.test(value);
    });
}

function filterRows(rows: TableRow<T>[]): TableRow<T>[] {
    return rows.filter((row) => isRowFiltered(row.value));
}

// --- Sort Feature ---

const currentSortColumn = ref<TableColumnItem<T>>();
const isAsc = ref(true);

/** check if has any sortable column */
const hasSortableColumns = computed(() =>
    tableColumns.value.some((column) => column.sortable),
);

/** check if the column is the current sort column */
function isColumnSorted(column: TableColumnItem<T>): boolean {
    return currentSortColumn.value?.identifier === column.identifier;
}

// call initSort only first time (for example async data)
// initSort must be called after TableColumns got initialised first time
onMounted(() => nextTick(() => initSort()));

/** initial sorted column based on the default-sort prop */
function initSort(): void {
    if (!tableColumns.value.length || currentSortColumn.value) return;
    if (!props.defaultSort) return;
    let sortField = "";
    let sortDirection = props.defaultSortDirection;
    if (Array.isArray(props.defaultSort)) {
        sortField = props.defaultSort[0];
        if (props.defaultSort[1]) sortDirection = props.defaultSort[1];
    } else {
        sortField = props.defaultSort;
    }
    sortByField(sortField, sortDirection);
}

/**
 * Sort the column.
 * Toggle current direction on column if it's sortable
 * and not just updating the prop.
 */
function sort(
    column: TableColumnItem<T>,
    updateDirection = false,
    event?: Event,
): void {
    if (!column || !column.sortable) return;

    if (updateDirection)
        isAsc.value = isColumnSorted(column)
            ? !isAsc.value
            : props.defaultSortDirection.toLowerCase() === "asc";

    // if not first time sort
    if (currentSortColumn.value)
        emits(
            "sort",
            column,
            isAsc.value ? "asc" : "desc",
            event || new Event("sort"),
        );

    currentSortColumn.value = column;
    // recompute rows with updated currentSortColumn
    processTableData();
}

function sortByField(field: string, direction: "asc" | "desc"): void {
    const sortColumn = tableColumns.value.find(
        (column) => column.field === field,
    );
    if (sortColumn) {
        isAsc.value = direction.toLowerCase() === "asc";
        sort(sortColumn);
    }
}

function sortByColumn(rows: TableRow<T>[]): TableRow<T>[] {
    const column = currentSortColumn.value;
    if (!column) return rows;
    return sortBy<TableRow<T>>(
        rows,
        column?.field ? "value." + column.field : "",
        column?.customSort
            ? (a, b, asc): number => column.customSort!(a.value, b.value, asc)
            : undefined,
        isAsc.value,
    );
}

// --- Checkable Feature ---

const tableCheckedRows = defineModel<T[]>("checkedRows", {
    default: [],
});

/** check if all rows in the page are checked */
const isAllChecked = computed(() => {
    const validVisibleData = visibleRows.value.filter((row) =>
        props.isRowCheckable(row.value),
    );
    if (validVisibleData.length === 0) return false;
    return validVisibleData.every((currentVisibleRow) =>
        isChecked(currentVisibleRow),
    );
});

/** check if all rows in the page are checkable */
const isAllUncheckable = computed(
    () => !visibleRows.value.some((row) => props.isRowCheckable(row.value)),
);

/** check if the row is checked (is added to the array) */
function isChecked(row: TableRow<T>): boolean {
    if (typeof props.isRowChecked === "function")
        return props.isRowChecked(row.value);
    else return tableCheckedRows.value.some((r) => isRowEqual(r, row.value));
}

/** add a checked row to the the array */
function addCheckedRow(row: TableRow<T>): void {
    tableCheckedRows.value = [...tableCheckedRows.value, row.value];
}

/** remove a checked row from the array */
function removeCheckedRow(row: TableRow<T>): void {
    const idx = tableCheckedRows.value.findIndex((r) =>
        isRowEqual(r, row.value),
    );
    if (idx >= 0)
        tableCheckedRows.value = tableCheckedRows.value.toSpliced(idx, 1);
}

/**
 * Header checkbox click listener.
 * Add or remove all rows in current page.
 */
function checkAll(): void {
    if (isAllChecked.value)
        // if all rows are already checked, check nothing
        tableCheckedRows.value = [];
    else {
        // else set all visible rows as checked
        tableCheckedRows.value = visibleRows.value
            .filter((row) => props.isRowCheckable(row.value))
            .map((row) => row.value);
    }

    // emit event after the reactive checked rows list got updated
    nextTick(() => emits("check-all", tableCheckedRows.value));
}

/** row checkbox click listener */
function checkRow(row: TableRow<T>): void {
    if (!props.isRowCheckable(row.value)) return;

    if (isChecked(row)) removeCheckedRow(row);
    else addCheckedRow(row);

    // emit event after the reactive checked rows list got updated
    nextTick(() => emits("check", tableCheckedRows.value, row.value));
}

// --- Detail Row Feature ---

const visibleDetailedRows = defineModel<T[]>("detailedRows", {
    default: [],
});

/**
 * Return if detailed row tabled.
 * Will be with chevron column & icon or not.
 */
const showDetailRowIcon = computed(
    () => props.detailed && props.showDetailIcon,
);

/** toggle to show/hide details slot */
function toggleDetails(row: TableRow<T>): void {
    if (isVisibleDetailRow(row)) {
        closeDetailRow(row);
        emits("details-close", row.value);
    } else {
        openDetailRow(row);
        emits("details-open", row.value);
    }
}

function openDetailRow(row: TableRow<T>): void {
    visibleDetailedRows.value = [...visibleDetailedRows.value, row.value];
}

function closeDetailRow(row: TableRow<T>): void {
    const idx = visibleDetailedRows.value.findIndex((r) =>
        isRowEqual(r, row.value),
    );
    if (idx >= 0)
        visibleDetailedRows.value = visibleDetailedRows.value.toSpliced(idx, 1);
}

function isVisibleDetailRow(row: TableRow<T>): boolean {
    return visibleDetailedRows.value.some((r) => isRowEqual(r, row.value));
}

function isActiveDetailRow(row: TableRow<T>): boolean {
    return props.detailed && isVisibleDetailRow(row);
}

// --- Drag&Drop Feature ---

const isDraggingRow = ref(false);
const isDraggingColumn = ref(false);

const canDragRow = computed(() => props.draggable && !isDraggingColumn.value);

const canDragColumn = computed(
    () => props.draggableColumn && !isDraggingRow.value,
);

/** emits drag start event */
function handleDragStart(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragstart", row.value, index, event);
}

/** emits drag leave event */
function handleDragEnd(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragend", row.value, index, event);
}

/** emits drop event */
function handleDrop(row: TableRow<T>, index: number, event: DragEvent): void {
    if (!props.draggable) return;
    emits("drop", row.value, index, event);
}

/** emits drag over event */
function handleDragOver(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragover", row.value, index, event);
}

/** emits drag leave event */
function handleDragLeave(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragleave", row.value, index, event);
}

/** emits drag start event (column) */
function handleColumnDragStart(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = true;
    emits("columndragstart", column, index, event);
}

/** emits drag leave event (column) */
function handleColumnDragEnd(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = false;
    emits("columndragend", column, index, event);
}

/** emits drop event (column) */
function handleColumnDrop(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndrop", column, index, event);
}

/** emits drag over event (column) */
function handleColumnDragOver(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndragover", column, index, event);
}

/** emits drag leave event (column) */
function handleColumnDragLeave(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndragleave", column, index, event);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-table__root"],
    ["mobileClass", "o-table__root--mobile", null, isMobile],
);

const tableClasses = defineClasses(
    ["tableClass", "o-table"],
    [
        "borderedClass",
        "o-table--bordered",
        null,
        computed(() => props.bordered),
    ],
    ["stripedClass", "o-table--striped", null, computed(() => props.striped)],
    [
        "narrowedClass",
        "o-table--narrowed",
        null,
        computed(() => props.narrowed),
    ],
    [
        "hoverableClass",
        "o-table--hoverable",
        null,
        computed(
            () =>
                (props.hoverable || props.selectable) &&
                !!visibleRows.value.length,
        ),
    ],
    [
        "emptyClass",
        "o-table--empty",
        null,
        computed(() => !visibleRows.value.length),
    ],
);

const tableWrapperClasses = defineClasses(
    ["wrapperClass", "o-table__wrapper"],
    [
        "stickyHeaderClass",
        "o-table__wrapper--sticky-header",
        null,
        computed(() => props.stickyHeader),
    ],
    ["scrollableClass", "o-table__wrapper--scrollable", null, isScrollable],
    ["mobileClass", "o-table__wrapper--mobile", null, isMobileActive],
);

const tableWrapperStyle = computed(() => ({
    height: toCssDimension(props.height),
}));

const footerClasses = defineClasses(["footerClass", "o-table__footer"]);

const thBaseClasses = defineClasses(["thClass", "o-table__th"]);

const thCheckboxClasses = defineClasses([
    "thCheckboxClass",
    "o-table__th-checkbox",
]);

const thDetailedClasses = defineClasses([
    "thDetailedClass",
    "o-table__th--detailed",
]);

const thSubheadingClasses = defineClasses(["thSubheadingClass", "o-table__th"]);

const thSortIconClasses = defineClasses([
    "thSortIconClass",
    "o-table__th__sort-icon",
]);

const trSelectedClasses = defineClasses([
    "trSelectedClass",
    "o-table__tr--selected",
]);

const trCheckedClasses = defineClasses([
    "trCheckedClass",
    "o-table__tr--checked",
]);

const tdBaseClasses = defineClasses(["tdClass", "o-table__td"]);

const tdCheckboxClasses = defineClasses(
    ["tdCheckboxClass", "o-table__td-checkbox"],
    [
        "thStickyClass",
        "o-table__th--sticky",
        null,
        computed(() => props.stickyCheckbox),
    ],
);

const tdDetailedChevronClasses = defineClasses([
    "tdDetailedChevronClass",
    "o-table__td-chevron",
]);

const detailedClasses = defineClasses(["detailedClass", "o-table__detail"]);

const mobileSortClasses = defineClasses([
    "mobileSortClass",
    "o-table__mobile-sort",
]);

const paginationWrapperClasses = defineClasses([
    "paginationWrapperClass",
    "o-table__pagination",
]);

const paginationWrapperRootClasses = computed(() =>
    getActiveClasses(paginationWrapperClasses),
);

function rowClasses(row: TableRow<T>, index: number): ClassBind[] {
    const selectedClasses = isRowEqual(row.value, tableSelectedRow.value)
        ? trSelectedClasses.value
        : [];

    const checkedClasses = isChecked(row) ? trCheckedClasses.value : [];

    const rowClass =
        typeof props.rowClass === "function"
            ? props.rowClass(row.value, index) || ""
            : "";

    return [...selectedClasses, ...checkedClasses, { [rowClass]: true }];
}

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ rows: tableData, sort: sortByField });
</script>

<template>
    <div :class="rootClasses" data-oruga="table">
        <div ref="slotElement" style="display: none">
            <!--
                @slot Place o-table-column here
            -->
            <slot>
                <!--
                    @slot Place extra `o-table-column` components here, even if you have some columns defined by prop
                -->
                <slot name="before" />

                <template v-if="columns?.length">
                    <o-table-column
                        v-for="(column, idx) in columns"
                        :key="column.field || idx"
                        v-slot="{ row }"
                        v-bind="column">
                        {{ getColumnValue(row as T, column) }}
                    </o-table-column>
                </template>

                <!--
                    @slot Place extra `o-table-column` components here, even if you have some columns defined by prop
                -->
                <slot name="after" />
            </slot>
        </div>

        <o-table-mobile-sort
            v-if="isMobileActive && hasSortableColumns"
            :current-sort-column="currentSortColumn"
            :columns="tableColumns"
            :placeholder="mobileSortPlaceholder"
            :icon-pack="iconPack"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            :is-asc="isAsc"
            :mobile-sort-classes="mobileSortClasses"
            @sort="(column, event) => sort(column, true, event)" />

        <template
            v-if="
                paginated &&
                (paginationPosition === 'top' || paginationPosition === 'both')
            ">
            <!--
                @slot Override pagination label
                @binding {number} current - current page
                @binding {number} per-page - rows per page
                @binding {number} total - total rows count
                @binding {(page: number): void } change - on page change event
            -->
            <slot
                name="pagination"
                :current="tableCurrentPage"
                :per-page="perPage"
                :total="tableTotal"
                :change="(page) => (tableCurrentPage = page)">
                <o-table-pagination
                    v-bind="$attrs"
                    v-model:current="tableCurrentPage"
                    :paginated="paginated"
                    :per-page="perPage"
                    :total="tableTotal"
                    :rounded="paginationRounded"
                    :size="paginationSize"
                    :order="paginationOrder"
                    :simple="paginationSimple"
                    :icon-pack="iconPack"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    :root-class="paginationWrapperRootClasses"
                    @change="(page) => $emit('page-change', page)">
                    <!--
                        @slot Additional slot if table is paginated
                    -->
                    <slot name="top-left" />
                </o-table-pagination>
            </slot>
        </template>

        <div :class="tableWrapperClasses" :style="tableWrapperStyle">
            <table
                :class="tableClasses"
                :tabindex="selectable ? 0 : undefined"
                @keydown.self.prevent.up="onArrowPressed(-1, $event)"
                @keydown.self.prevent.down="onArrowPressed(1, $event)">
                <caption v-if="$slots.caption">
                    <!--
                        @slot Define a table caption here
                    -->
                    <slot name="caption" />
                </caption>

                <thead v-if="tableColumns.length && showHeader">
                    <!--
                        @slot Define preheader content here
                    -->
                    <slot name="preheader" />
                    <tr>
                        <!-- detailed toggle column -->
                        <th
                            v-if="showDetailRowIcon"
                            :class="[...thBaseClasses, ...thDetailedClasses]" />
                        <!-- checkable column left -->
                        <th
                            v-if="checkable && checkboxPosition === 'left'"
                            :class="[...thBaseClasses, ...thCheckboxClasses]">
                            <!--
                                @slot Override check all checkbox
                                @binding {boolean} is-all-checked - if all rows are checked
                                @binding {boolean} is-all-uncheckable - if check all is uncheckable
                                @binding {(): void} check-all - check all function
                            -->
                            <slot
                                name="check-all"
                                :is-all-checked="isAllChecked"
                                :is-all-uncheckable="isAllUncheckable"
                                :check-all="checkAll">
                                <o-checkbox
                                    v-if="headerCheckable"
                                    :model-value="isAllChecked"
                                    autocomplete="off"
                                    name="row_check_all"
                                    :variant="checkboxVariant"
                                    :disabled="isAllUncheckable"
                                    @update:model-value="checkAll" />
                            </slot>
                        </th>
                        <!-- row data columns -->
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="`${column.identifier}_${index}_header`"
                            v-bind="column.thAttrsData"
                            :class="[...thBaseClasses, ...column.thClasses]"
                            :style="isMobileActive ? {} : column.style"
                            :draggable="canDragColumn"
                            @click.stop="sort(column, true, $event)"
                            @dragstart="
                                handleColumnDragStart(column, index, $event)
                            "
                            @dragend="
                                handleColumnDragEnd(column, index, $event)
                            "
                            @drop="handleColumnDrop(column, index, $event)"
                            @dragover="
                                handleColumnDragOver(column, index, $event)
                            "
                            @dragleave="
                                handleColumnDragLeave(column, index, $event)
                            ">
                            <template v-if="column.$slots?.header">
                                <o-slot-component
                                    :component="column.$el"
                                    name="header"
                                    tag="span"
                                    :props="{ column, index }" />
                            </template>
                            <template v-else>
                                <span>
                                    {{ column.label }}
                                    <span
                                        v-show="
                                            column.sortable &&
                                            isColumnSorted(column)
                                        "
                                        :class="thSortIconClasses">
                                        <o-icon
                                            :icon="sortIcon"
                                            :pack="iconPack"
                                            both
                                            :size="sortIconSize"
                                            :rotation="!isAsc ? 180 : 0" />
                                    </span>
                                </span>
                            </template>
                        </th>

                        <!-- checkable column right -->
                        <th
                            v-if="checkable && checkboxPosition === 'right'"
                            :class="[...thBaseClasses, ...thCheckboxClasses]">
                            <template v-if="headerCheckable">
                                <!--
                                    @slot Override check all checkbox
                                    @binding {boolean} is-all-checked - if all rows are checked
                                    @binding {boolean} is-all-uncheckable - if check all is uncheckable
                                    @binding {(): void} check-all - check all function
                                -->
                                <slot
                                    name="check-all"
                                    :is-all-checked="isAllChecked"
                                    :is-all-uncheckable="isAllUncheckable"
                                    :check-all="checkAll">
                                    <o-checkbox
                                        :model-value="isAllChecked"
                                        autocomplete="off"
                                        name="row_check_all"
                                        :variant="checkboxVariant"
                                        :disabled="isAllUncheckable"
                                        @update:model-value="checkAll" />
                                </slot>
                            </template>
                        </th>
                    </tr>

                    <tr v-if="hasSearchableColumns">
                        <!-- detailed toggle column -->
                        <th
                            v-if="showDetailRowIcon"
                            :class="[...thBaseClasses, ...thDetailedClasses]" />
                        <!-- checkable column left -->
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <!-- row data columns -->
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="`${column.identifier}_${index}_searchable`"
                            v-bind="column.thAttrsData"
                            :class="[...thBaseClasses, ...column.thClasses]"
                            :style="isMobileActive ? {} : column.style">
                            <template v-if="column.searchable">
                                <template v-if="column.$slots?.searchable">
                                    <o-slot-component
                                        :component="column.$el"
                                        name="searchable"
                                        tag="span"
                                        :props="{ column, index, filters }" />
                                </template>
                                <o-input
                                    v-else-if="column.field"
                                    v-model="filters[column.field]"
                                    :name="`column_${column.field}_filter`"
                                    :type="column.numeric ? 'number' : 'search'"
                                    :pack="iconPack"
                                    :placeholder="filtersPlaceholder"
                                    :icon="filtersIcon"
                                    size="small"
                                    @[filtersEvent]="onFiltersEvent" />
                            </template>
                        </th>
                        <!-- checkable column right -->
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>

                    <tr v-if="hasCustomSubheadings">
                        <!-- detailed toggle column -->
                        <th
                            v-if="showDetailRowIcon"
                            :class="[...thBaseClasses, ...thDetailedClasses]" />
                        <!-- checkable column left -->
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <!-- row data columns -->
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="`${column.identifier}_${index}_subheading`"
                            :style="isMobileActive ? {} : column.style"
                            :class="[...thBaseClasses, ...thSubheadingClasses]">
                            <template v-if="column.$slots?.subheading">
                                <o-slot-component
                                    :component="column.$el"
                                    name="subheading"
                                    tag="span"
                                    :props="{ column, index }" />
                            </template>
                            <template v-else>
                                {{ column.subheading }}
                            </template>
                        </th>
                        <!-- checkable column right -->
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                </thead>

                <tbody>
                    <template
                        v-for="(row, index) in visibleRows"
                        :key="`${row.key}_${index}_row`">
                        <tr
                            :class="rowClasses(row, index)"
                            :draggable="canDragRow"
                            @click="selectRow(row, index, $event)"
                            @dblclick="
                                $emit('dblclick', row.value, index, $event)
                            "
                            @mouseenter="
                                $emit('mouseenter', row.value, index, $event)
                            "
                            @mouseleave="
                                $emit('mouseleave', row.value, index, $event)
                            "
                            @contextmenu="
                                $emit('contextmenu', row.value, index, $event)
                            "
                            @dragstart="handleDragStart(row, index, $event)"
                            @dragend="handleDragEnd(row, index, $event)"
                            @drop="handleDrop(row, index, $event)"
                            @dragover="handleDragOver(row, index, $event)"
                            @dragleave="handleDragLeave(row, index, $event)">
                            <!-- detailed toggle column -->
                            <td
                                v-if="showDetailRowIcon"
                                :class="[
                                    ...tdBaseClasses,
                                    ...tdDetailedChevronClasses,
                                ]">
                                <o-icon
                                    v-if="isDetailedVisible(row.value)"
                                    :icon="detailIcon"
                                    :pack="iconPack"
                                    :rotation="isVisibleDetailRow(row) ? 90 : 0"
                                    role="button"
                                    clickable
                                    both
                                    @click.stop="toggleDetails(row)" />
                            </td>

                            <!-- checkable column left -->
                            <td
                                v-if="checkable && checkboxPosition === 'left'"
                                :class="[
                                    ...thBaseClasses,
                                    ...tdCheckboxClasses,
                                ]">
                                <o-checkbox
                                    :model-value="isChecked(row)"
                                    autocomplete="off"
                                    :name="`row_${index}_check`"
                                    :variant="checkboxVariant"
                                    :disabled="!isRowCheckable(row.value)"
                                    @update:model-value="checkRow(row)" />
                            </td>

                            <!-- row data columns -->
                            <o-slot-component
                                v-for="(column, colindex) in visibleColumns"
                                :key="`${column.identifier}_${index}_${colindex}`"
                                v-bind="column.tdAttrsData[index]"
                                :component="column.$el"
                                name="default"
                                tag="td"
                                :class="[...tdBaseClasses, ...column.tdClasses]"
                                :style="isMobileActive ? {} : column.style"
                                :data-label="column.label"
                                :props="{
                                    row: row.value,
                                    column,
                                    index,
                                    colindex,
                                    toggleDetails: () => toggleDetails(row),
                                }"
                                @click="
                                    $emit(
                                        'cell-click',
                                        row.value,
                                        column,
                                        index,
                                        colindex,
                                        $event,
                                    )
                                " />

                            <!-- checkable column right -->
                            <td
                                v-if="checkable && checkboxPosition === 'right'"
                                :class="[
                                    ...thBaseClasses,
                                    ...tdCheckboxClasses,
                                ]">
                                <o-checkbox
                                    :model-value="isChecked(row)"
                                    autocomplete="off"
                                    :variant="checkboxVariant"
                                    :disabled="!isRowCheckable(row.value)"
                                    @update:model-value="checkRow(row)" />
                            </td>
                        </tr>

                        <transition :name="detailTransition">
                            <template v-if="isActiveDetailRow(row)">
                                <!--
                                    @slot Place row detail content here
                                    @binding {T} row - row content
                                    @binding {number} index - row index
                                -->
                                <slot
                                    v-if="customDetailRow"
                                    name="detail"
                                    :row="row.value"
                                    :index="index" />
                                <tr
                                    v-else
                                    :key="`${row.key}_detail`"
                                    :class="detailedClasses">
                                    <td :colspan="columnCount">
                                        <!--
                                            @slot Place row detail content here
                                            @binding {T} row - row content
                                            @binding {number} index - row index
                                        -->
                                        <slot
                                            name="detail"
                                            :row="row.value"
                                            :index="index" />
                                    </td>
                                </tr>
                            </template>
                        </transition>
                    </template>

                    <tr v-if="!visibleRows.length">
                        <td :colspan="columnCount">
                            <!--
                                @slot Define content if table is empty
                            -->
                            <slot name="empty">
                                <o-icon
                                    v-if="emptyIcon"
                                    :icon="emptyIcon"
                                    :size="emptyIconSize"
                                    both />
                                {{ emptyLabel }}
                            </slot>
                        </td>
                    </tr>
                </tbody>

                <tfoot v-if="$slots.footer">
                    <tr :class="footerClasses">
                        <!--
                            @slot Define a custom footer
                            @binding {number} column-count - counts of visible columns
                            @binding {number} row-count - counts of visible rows
                        -->
                        <slot
                            v-if="hasCustomFooterSlot()"
                            name="footer"
                            :column-count="columnCount"
                            :row-count="visibleRows?.length" />
                        <th v-else :colspan="columnCount">
                            <!--
                                @slot Define a custom footer
                                @binding {number} column-count - counts of visible columns
                                @binding {number} row-count - counts of visible rows
                            -->
                            <slot
                                name="footer"
                                :column-count="columnCount"
                                :row-count="visibleRows?.length" />
                        </th>
                    </tr>
                </tfoot>
            </table>

            <!--
                @slot Override loading component
                @binding {boolean} loading - is loading state enabled
            -->
            <slot name="loading" :loading="loading">
                <o-loading
                    v-bind="loadingClasses"
                    :full-page="false"
                    :active="loading"
                    :icon="loadingIcon"
                    :label="loadingLabel"
                    role="status"
                    :aria-hidden="!loading" />
            </slot>
        </div>

        <template
            v-if="
                (checkable && $slots['bottom-left']) ||
                (paginated &&
                    (paginationPosition === 'bottom' ||
                        paginationPosition === 'both'))
            ">
            <!--
                @slot Override pagination label
                @binding {number} current - current page
                @binding {number} per-page - rows per page
                @binding {number} total - total rows count
                @binding {(page: number): void } change - on page change event
            -->
            <slot
                name="pagination"
                :current="tableCurrentPage"
                :per-page="perPage"
                :total="tableTotal"
                :change="(page) => (tableCurrentPage = page)">
                <o-table-pagination
                    v-bind="$attrs"
                    v-model:current="tableCurrentPage"
                    :paginated="paginated"
                    :per-page="perPage"
                    :total="tableTotal"
                    :rounded="paginationRounded"
                    :size="paginationSize"
                    :order="paginationOrder"
                    :simple="paginationSimple"
                    :icon-pack="iconPack"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    :root-class="paginationWrapperRootClasses"
                    @change="(page) => $emit('page-change', page)">
                    <!--
                        @slot Additional slot if table is paginated
                    -->
                    <slot name="bottom-left" />
                </o-table-pagination>
            </slot>
        </template>
    </div>
</template>
