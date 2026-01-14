<script setup lang="ts" generic="T">
import {
    computed,
    ref,
    watch,
    nextTick,
    useSlots,
    toValue,
    useTemplateRef,
    toRaw,
    triggerRef,
    type MaybeRefOrGetter,
    type VNode,
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
    sortBy,
    isDefined,
    getPropertyValue,
} from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useProviderParent,
    useMatchMedia,
    useSequentialId,
} from "@/composables";

import type { ClassBinding, Numberish } from "@/types";
import type {
    TableColumn,
    TableRow,
    TableColumnItem,
    TableColumnComponent,
} from "./types";
import type { TableProps } from "./props";

/**
 * Tabulated data are sometimes needed, it's even better when it's responsive.
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
    checkable: false,
    checkedRows: () => [],
    checkableHeader: true,
    stickyCheckbox: false,
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
    paginationRangeBefore: undefined,
    paginationRangeAfter: undefined,
    backendFiltering: () => getDefault("table.backendFiltering", false),
    filtersIcon: () => getDefault("table.filterIcon"),
    filtersPlaceholder: () => getDefault("table.filterPlaceholder"),
    filterDebounce: () => getDefault("table.filterDebounce", 300),
    filtersEvent: "",
    emptyLabel: () => getDefault("table.emptyLabel"),
    emptyIcon: () => getDefault("table.emptyIcon"),
    emptyIconSize: () => getDefault("table.emptyIconSize"),
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
     * @param value {number} - updated currentPage prop
     */
    "update:currentPage": [value: number];
    /**
     * on pagination page change event
     * @param page {number} - updated page
     */
    "page-change": [page: number];
    /**
     * select prop two-way binding
     * @param value {unknown} - updated select prop
     */
    "update:selected": [value: T];
    /**
     * on row select event
     * @param newRow {unknown} - new select value
     * @param oldRow {unknown} - old select value
     */
    select: [newRow: T, oldRow: T];
    /**
     * on row checked event
     * @param value {unknown[]} - all checked rows
     * @param row {unknown} - row data
     */
    check: [value: T[], row: T];
    /**
     * on all rows checked event
     * @param value {unknown[]} - all checked rows
     */
    "check-all": [value: T[]];
    /**
     * checkedRows prop two-way binding
     * @param value {unknown[]} - updated checkedRows prop
     */
    "update:checkedRows": [value: T[]];
    /**
     * on column sort change event
     * @param column {TableColumn} - column data
     * @param direction {string} - 'asc' or 'desc'
     * @param event {Event} - native event
     */
    sort: [column: TableColumn<T>, direction: "asc" | "desc", event: Event];
    /**
     * on filter change event
     * @param filters {object} - filter object
     */
    "filters-change": [value: Record<string, string>];
    /**
     * on native filter event
     * @param column {TableColumn} - column data
     * @param value {string} - filter input value
     * @param event {Event} - native event
     */
    filter: [column: TableColumn<T>, value: string, event: Event];
    /**
     * on native filter event based on props filtersEvent
     * @deprecated use `filter` event instead
     * @param filtersEvent {string} - props filtersEvent value
     * @param filters {object} - filter object
     * @param event {Event} - native event
     */
    "filters-event": [
        filtersEvent: string,
        filters: Record<string, string>,
        event: Event,
    ];
    /**
     * detailedRows prop two-way binding
     * @param value {unknown[]} - updated detailedRows prop
     */
    "update:detailedRows": [value: T[]];
    /**
     * on details open event
     * @param row {unknown} - row data
     */
    "details-open": [row: T];
    /**
     * on details close event
     * @param row {unknown} - row data
     */
    "details-close": [row: T];
    /**
     * on row click event
     * @param row {unknown} - row data
     * @param index {number} - index of clicked row
     * @param event {Event} - native click event
     */
    click: [row: T, index: number, event: Event];
    /**
     * on row double click event
     * @param row {unknown} - row data
     * @param index {number} - index of clicked row
     * @param event {Event} - native click event
     */
    dblclick: [row: T, index: number, event: Event];
    /**
     * on row right click event
     * @param row {unknown} - row data
     * @param index {number} - index of clicked row
     * @param event {Event} - native contextmenu event
     */
    contextmenu: [row: T, index: number, event: Event];
    /**
     * on row mouseenter event
     * @param row {unknown} - row data
     * @param index {number} - index of clicked row
     * @param event {Event} - native mouseenter event
     */
    mouseenter: [row: T, index: number, event: Event];
    /**
     * on row mouseleave event
     * @param row {unknown} - row data
     * @param index {number} - index of clicked row
     * @param event {Event} - native mouseleave event
     */
    mouseleave: [row: T, index: number, event: Event];
    /**
     * on cell click event
     * @param row {unknown} - row data
     * @param column {TableColumn} - column data
     * @param index {number} - row index
     * @param colindex {number} - column index
     * @param event {Event} - native click event
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
     * @param row {unknown} - row data
     * @param index {number} - index of draged row
     * @param event {DragEvent} - native dragstart event
     */
    dragstart: [row: T, index: number, event: DragEvent];
    /**
     * on row dragend event
     * @param row {unknown} - row data
     * @param index {number} - index of draged row
     * @param event {DragEvent} - native dragend event
     */
    dragend: [row: T, index: number, event: DragEvent];
    /**
     * on row drop event
     * @param row {unknown} - row data
     * @param index {number} - index of draged row
     * @param event {DragEvent} - native drop event
     */
    drop: [row: T, index: number, event: DragEvent];
    /**
     * on row dragleave event
     * @param row {unknown} - row data
     * @param index {number} - index of draged row
     * @param event {DragEvent} - native dragleave event
     */
    dragleave: [row: T, index: number, event: DragEvent];
    /**
     * on row dragover event
     * @param row {unknown} - row data
     * @param index {number} - index of draged row
     * @param event {DragEvent} - native dragover event
     */
    dragover: [row: T, index: number, event: DragEvent];
    /**
     * on column columndragstart event
     * @param column {TableColumn} - column data
     * @param index {number} - index of draged column
     * @param event {DragEvent} - native columndragstart event
     */
    columndragstart: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndragend event
     * @param column {TableColumn} - column data
     * @param index {number} - index of draged column
     * @param event {DragEvent} - native columndragend event
     */
    columndragend: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndrop event
     * @param column {TableColumn} - column data
     * @param index {number} - index of draged column
     * @param event {DragEvent} - native columndrop event
     */
    columndrop: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndragleave event
     * @param column {TableColumn} - column data
     * @param index {number} - index of draged column
     * @param event {DragEvent} - native columndragleave event
     */
    columndragleave: [column: TableColumn<T>, index: number, event: DragEvent];
    /**
     * on column columndragover event
     * @param column {TableColumn} - column data
     * @param index {number} - index of draged column
     * @param event {DragEvent} - native columndragover event
     */
    columndragover: [column: TableColumn<T>, index: number, event: DragEvent];
}>();

defineSlots<{
    /** Define extra `o-table-column` components here, even if you have some columns defined by prop */
    before?(): void;
    /** Define extra `o-table-column` components here, even if you have some columns defined by prop */
    after?(): void;
    /** Define `o-table-column` here */
    default?(): void;
    /**
     * Override the pagination label
     * @param current {number} - current page
     * @param perPage {number} - rows per page
     * @param total {number} - total rows count
     * @param change {(page: number): void } - on page change event
     */
    pagination?(props: {
        current: number;
        perPage: Numberish;
        total: number;
        change: (page: number) => void;
    }): void;
    /** Define a table caption here */
    caption?(): void;
    /** Define content to palce before the header here */
    preheader?(): void;
    /**
     * Override the check all checkbox
     * @param isAllChecked {boolean} - if all rows are checked
     * @param isAllUncheckable {boolean} - if check all is uncheckable
     * @param checkAll {(): void}  - check all function
     */
    checkAll?(props: {
        isAllChecked: boolean;
        isAllUncheckable: boolean;
        checkAll: () => void;
    }): void;
    /**
     * Define row detail content here
     * @param row {unknown} - row content
     * @param index {number} - row index
     */
    detail?(props: { row: T; index: number }): void;
    /** Define the content to show if table is empty */
    empty?(): void;
    /**
     * Define a custom footer
     * @param columnCount {number} - counts of visible columns
     * @param rowCount {number} - counts of visible rows
     */
    footer?(props: { columnCount: number; rowCount: number }): VNode[];
    /**
     * Override loading component
     * @param loading {boolean} - is loading state enabled
     */
    loading?(): void;
    /** Additional slot if table is paginated */
    topLeft?(): void;
    /** Additional slot if table is paginated */
    bottomLeft?(): void;
}>();

const slots = useSlots();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const isMobileActive = computed(() => props.mobileCards && isMobile.value);

const slotsRef = useTemplateRef("slotsWrapper");

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<TableColumnComponent<T>>({
    rootRef: slotsRef,
});

// #region --- Table Columns Definition ---

/** all defined columns */
const tableColumns = computed<TableColumnItem<T>[]>(() => {
    if (!childItems.value.length) return [];
    return childItems.value.map((columnItem) => {
        const column = toValue(columnItem.data!);

        // create additional th attrs data
        let thAttrsData =
            typeof props.thAttrs === "function" ? props.thAttrs(column) : {};
        thAttrsData = Object.assign(thAttrsData, column.thAttrs);

        // create additional td attrs data
        const tdAttrsData = (props.data ?? []).map((data) => {
            const tdAttrs =
                typeof props.tdAttrs === "function"
                    ? props.tdAttrs(data, column)
                    : {};
            return Object.assign(tdAttrs, column.tdAttrs);
        });

        return {
            ...column,
            value: column,
            el: columnItem.el,
            index: columnItem.index,
            identifier: columnItem.identifier,
            thAttrsData: thAttrsData,
            tdAttrsData: tdAttrsData,
        };
    });
});

/** total columns count */
const columnCount = computed(() => {
    let i = tableColumns.value.length;
    if (showDetailRowIcon.value) i++;
    if (props.checkable) i++;
    return i;
});

/** aria-colindex start value for ths */
const ariaColIndexStart = computed(() => {
    let i = 1;
    if (showDetailRowIcon.value) i++;
    if (props.checkable && props.checkboxPosition === "left") i++;
    return i;
});

/** check if table has subheadings  */
const hasSubheadings = computed(() => {
    return tableColumns.value.some((column) => !!column.subheading);
});

/** check if table is scrollable */
const isScrollable = computed(() => {
    if (props.scrollable) return true;
    return tableColumns.value.some((column) => column.sticky);
});

// #endregion --- Table Columns Definition ---

// #region --- Table Rows Definition ---

const tableCurrentPage = defineModel<number>("currentPage", { default: 1 });

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** All defined data elements as normalized rows with a unique key. */
const tableRows = computed<TableRow<T>[]>(() => {
    if (!props.data) return [];
    return props.data.map((value: T, idx: number) => ({
        label: "row " + idx, // row display label
        value: toValue(value), // normalizes wrapped ref values
        index: idx, // row index
        key:
            // if no key is given and data is object, create unique row id for each row
            String(getValueByPath(value, props.rowKey) || nextSequence()),
        hidden: false,
    }));
});

/** Filtered normalized rows by any given filter value. */
const filteredRows = computed<TableRow<T>[]>(() =>
    // defines the hidden state on the original row list and returns a filtered row list
    filterRows(tableRows.value),
);

/** Visible rows for the current page. */
const availableRows = computed<TableRow<T>[]>(() =>
    // defines the hidden state on the original row list and returns only the rows on the current page
    paginateRows(filteredRows.value),
);

// reset row hidden states on specifc prop change
watch(
    () => props.paginated,
    () => {
        tableRows.value.forEach((row) => (row.hidden = false));
        // Force trigger effects for the base normalized rows after making same deep mutations.
        // This forces reactive dependencies to recompute and to redefine the hidden states.
        triggerRef(tableRows);
    },
);

/**
 * Check if footer slot has custom content.
 * Must be called during rendering.
 */
function hasCustomFooterSlot(): boolean {
    if (!slots.footer) return false;

    const footer = slots.footer({
        columnCount: columnCount.value,
        rowCount: rowCount.value,
    });
    if (footer.length > 1) return true;

    const tag = footer[0]["type"];
    return tag === "th" || tag === "td";
}

/** check if two rows are equal by a custom compare function or the rowKey attribute */
function isRowEqual(
    sourceRow: MaybeRefOrGetter<T>,
    targetRow: MaybeRefOrGetter<T>,
): boolean {
    const el1 = toRaw(toValue(sourceRow));
    const el2 = toRaw(toValue(targetRow));
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

// #endregion  --- Table Rows Definition ---

// #region --- Pagination Feature ---

/*
 * Total data count.
 * If backend paginated, use props total else use rows data length as pagination total.
 */
const tableTotal = computed(() =>
    props.backendPagination ? props.total : filteredRows.value.length,
);

/** total rows count  */
const rowCount = computed(() => {
    return tableTotal.value + ariaRowIndexStart.value;
});

/** aria-rowindex start value for tds based if any column is filterable or has subheading */
const ariaRowIndexStart = computed(() => {
    let i = 1;
    if (hasFilterColumns.value) i++;
    if (hasSubheadings.value) i++;
    return i;
});

function paginateRows(rows: TableRow<T>[]): TableRow<T>[] {
    if (!props.paginated || props.backendPagination)
        // always return a new array object
        return [...rows];

    // calculate pagination information
    const perPage = Number(props.perPage);
    const currentPage = Math.min(rows.length / perPage, tableCurrentPage.value);
    const pageStart = (currentPage - 1) * perPage;
    const pageEnd = pageStart + perPage;

    // check if a row is filtered out (hidden) by not on the current page
    return rows.filter((row, idx) => {
        // check if row is on the current page
        const currentPage =
            rows.length < perPage || (idx >= pageStart && idx < pageEnd);

        // update hidden state
        row.hidden = !currentPage;
        return !row.hidden;
    });
}

// #endregion --- Pagination Feature ---

// #region --- Filter Feature ---

/** filter record alias { fieldKey: filterValue } */
const filters = ref<Record<string, string>>({});

/** check if any column has filterable active */
const hasFilterColumns = computed(() =>
    tableColumns.value.some((column) => column.searchable || column.filterable),
);

/** check if any filter is set */
const hasFilter = computed(
    () => !!Object.values(filters.value).filter(Boolean).length,
);

// emit filter change event
watch(filters, (value) => emits("filters-change", value), { deep: true });

/** @deprecated */
function onFiltersEvent(event: Event): void {
    emits("filters-event", props.filtersEvent, filters.value, event);
}

/**
 * Set the hidden state for the given rows based on active filter values.
 * Returns a filtered list of the mutated rows.
 */
function filterRows(rows: TableRow<T>[]): TableRow<T>[] {
    if (!hasFilter.value || props.backendFiltering)
        // always return a new array object
        return [...rows];

    // check if a row is filtered out (hidden) by not matching any active filter expresssions
    return rows.filter((row) => {
        const matches = Object.entries(filters.value).some(
            ([columnKey, filter]) => {
                if (!filter) return false;
                // get column for the filter
                const column = tableColumns.value.find(
                    (c) => c.field === columnKey,
                );
                if (!column) return false;

                // check if the value matches the filter string
                return column.matches(row.value, filter);
            },
        );

        // update hidden state
        row.hidden = !matches;
        return !row.hidden;
    });
}

// #endregion --- Filter Feature ---

// #region --- Sort Feature ---

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

// calculate default sort on columns change and on initial load
watch(tableColumns, defaultSort, { immediate: true });

/** sort column based on the default-sort prop if not already sorted */
function defaultSort(): void {
    // prevent sort when not columns or already sorted (for example async data)
    if (!tableColumns.value.length || currentSortColumn.value) return;
    if (!props.defaultSort) return;

    let sortField = props.defaultSort;
    let sortDirection = props.defaultSortDirection;
    if (Array.isArray(props.defaultSort)) {
        sortField = props.defaultSort[0];
        if (props.defaultSort[1]) sortDirection = props.defaultSort[1];
    } else {
        sortField = props.defaultSort;
    }
    sortByField(sortField, sortDirection);
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

/**
 * Sort the column.
 * Toggle current direction on column if it's sortable
 * and not just updating the prop.
 */
function sort(
    column: TableColumnItem<T>,
    updateDirection = false,
    event: Event = new Event("sort"),
): void {
    if (!column?.sortable) return;

    if (updateDirection)
        isAsc.value = isColumnSorted(column)
            ? !isAsc.value
            : props.defaultSortDirection.toLowerCase() === "asc";

    // if not first time sort
    if (currentSortColumn.value)
        emits("sort", column, isAsc.value ? "asc" : "desc", event);

    currentSortColumn.value = column;

    // sort rows by mutating the array
    sortRows(tableRows.value, column);

    // Force trigger effects for the base normalized rows after making deep mutations.
    // This forces reactive dependencies to recompute.
    triggerRef(tableRows);
}

// recompute table rows sorting on data prop change
watch(
    () => props.data,
    () => {
        if (currentSortColumn.value)
            sortRows(tableRows.value, currentSortColumn.value);
    },
);

/** sort rows by mutating the given array */
function sortRows(rows: TableRow<T>[], column: TableColumn<T>): TableRow<T>[] {
    if (props.backendSorting) return rows;

    // sort rows by mutating the rows array
    return sortBy<TableRow<T>>(
        rows,
        column.field ? "value." + column.field : "",
        column.customSort
            ? (a, b, asc): number => column.customSort!(a.value, b.value, asc)
            : undefined,
        isAsc.value,
        true, // mutate the original array
    );
}

// #endregion --- Sort Feature ---

// #region --- Row Selection Feature ---

const tableSelectedRow = defineModel<T>("selected", { default: undefined });

/** table arrow keys listener, change selection */
function onArrowPressed(delta: 1 | -1, event: KeyboardEvent): void {
    if (!availableRows.value.length) return;

    let index =
        availableRows.value.findIndex((row) =>
            isRowEqual(row.value, tableSelectedRow.value),
        ) + delta;

    // check if index overflow
    index =
        index > availableRows.value.length - 1
            ? availableRows.value.length - 1
            : index;
    // check if index underflow
    index = index < 0 ? 0 : index;

    // get row element
    const row = availableRows.value[index];

    if (!props.isRowSelectable(row.value)) {
        let newIndex: number | undefined;
        if (delta > 0) {
            for (
                let i = index;
                i < availableRows.value.length && newIndex === undefined;
                i++
            ) {
                if (props.isRowSelectable(availableRows.value[i].value))
                    newIndex = i;
            }
        } else {
            for (let i = index; i >= 0 && newIndex === undefined; i--) {
                if (props.isRowSelectable(availableRows.value[i].value))
                    newIndex = i;
            }
        }
        if (newIndex != undefined && newIndex >= 0)
            selectRow(availableRows.value[newIndex], event);
    } else {
        selectRow(row, event);
    }
}

/**
 * Row click listener.
 * Emit all necessary events.
 */
function selectRow(row: TableRow<T>, event: Event): void {
    emits("click", row.value, row.index, event);

    if (!props.selectable) return;

    if (isRowEqual(tableSelectedRow, row.value)) return;
    if (!props.isRowSelectable(row.value)) return;

    tableSelectedRow.value = row.value;
    // emit new and old row
    emits("select", row.value, tableSelectedRow.value);
}

// #endregion --- Row Selection Feature ---

// #region --- Row Checkable Feature ---

const tableCheckedRows = defineModel<T[]>("checkedRows", {
    default: [],
});

/** reset checkedRows whem page props changes */
watch(
    [tableCurrentPage, () => props.perPage],
    () => (tableCheckedRows.value = []),
);

/** check if all rows in the page are checked */
const isAllChecked = computed(() => {
    const validVisibleData = availableRows.value.filter((row) =>
        props.isRowCheckable(row.value),
    );
    if (validVisibleData.length === 0) return false;
    return validVisibleData.every(isChecked);
});

/** check if all rows in the page are checkable */
const isAllUncheckable = computed(
    () => !availableRows.value.some((row) => props.isRowCheckable(row.value)),
);

/** check if the row is checked (is added to the array) */
function isChecked(row: TableRow<T>): boolean {
    if (typeof props.isRowChecked === "function")
        return props.isRowChecked(row.value);
    else return tableCheckedRows.value.some((r) => isRowEqual(r, row.value));
}

/**
 * Update checked rows list.
 * If all rows are checked, uncheck all.
 * If not all rows are checked, check all visible rows.
 * Emits "check-all" event with the updated checked rows list.
 */
function updateCheckedRows(checkAll?: boolean): void {
    if (typeof checkAll === "undefined" ? isAllChecked.value : !checkAll)
        // if all rows are already checked, check nothing
        tableCheckedRows.value = [];
    else {
        // else set all visible rows as checked
        tableCheckedRows.value = availableRows.value
            .map((row) => row.value)
            .filter((value) => props.isRowCheckable(value));
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
        // remove the item at idx
        tableCheckedRows.value = [
            ...tableCheckedRows.value.slice(0, idx),
            ...tableCheckedRows.value.slice(idx + 1),
        ];
}

// #endregion --- Row Checkable Feature  ---

// #region --- Detail Row Feature ---

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
    if (isDetailRowVisible(row)) {
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
        // remove the item at idx
        visibleDetailedRows.value = [
            ...visibleDetailedRows.value.slice(0, idx),
            ...visibleDetailedRows.value.slice(idx + 1),
        ];
}

function isDetailRowVisible(row: TableRow<T>): boolean {
    return (
        props.detailed &&
        visibleDetailedRows.value.some((r) => isRowEqual(r, row.value))
    );
}

// #endregion --- Detail Row Feature ---

// #region --- Drag&Drop Feature ---

const isDraggingRow = ref(false);
const isDraggingColumn = ref(false);

const canDragRow = computed(() => props.draggable && !isDraggingColumn.value);

const canDragColumn = computed(
    () => props.draggableColumn && !isDraggingRow.value,
);

/** emits drag start event */
function handleDragStart(row: TableRow<T>, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragstart", row.value, row.index, event);
}

/** emits drag leave event */
function handleDragEnd(row: TableRow<T>, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragend", row.value, row.index, event);
}

/** emits drop event */
function handleDrop(row: TableRow<T>, event: DragEvent): void {
    if (!props.draggable) return;
    emits("drop", row.value, row.index, event);
}

/** emits drag over event */
function handleDragOver(row: TableRow<T>, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragover", row.value, row.index, event);
}

/** emits drag leave event */
function handleDragLeave(row: TableRow<T>, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragleave", row.value, row.index, event);
}

/** emits drag start event (column) */
function handleColumnDragStart(
    column: TableColumnItem<T>,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = true;
    emits("columndragstart", column.value, column.index, event);
}

/** emits drag leave event (column) */
function handleColumnDragEnd(
    column: TableColumnItem<T>,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = false;
    emits("columndragend", column.value, column.index, event);
}

/** emits drop event (column) */
function handleColumnDrop(column: TableColumnItem<T>, event: DragEvent): void {
    if (!canDragColumn.value) return;
    emits("columndrop", column.value, column.index, event);
}

/** emits drag over event (column) */
function handleColumnDragOver(
    column: TableColumnItem<T>,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndragover", column.value, column.index, event);
}

/** emits drag leave event (column) */
function handleColumnDragLeave(
    column: TableColumnItem<T>,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndragleave", column.value, column.index, event);
}

// #endregion --- Drag&Drop Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-table__root"],
    ["mobileClass", "o-table__root--mobile", null, isMobileActive],
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
                !!availableRows.value.length,
        ),
    ],
    [
        "emptyClass",
        "o-table--empty",
        null,
        computed(() => !availableRows.value.length),
    ],
);

const thBaseClasses = defineClasses(["thClass", "o-table__th"]);

const thCheckboxClasses = defineClasses(
    ["thCheckboxClass", "o-table__th-checkbox"],
    [
        "thStickyClass",
        "o-table__th--sticky",
        null,
        computed(() => props.stickyCheckbox),
    ],
);

const thSortedClasses = defineClasses(
    /** @deprecated use `thSortedClass` instead */
    ["thCurrentSortClass", "o-table__th-current-sort"],
    ["thSortedClass", "o-table__th--sorted"],
);

const thDetailedClasses = defineClasses([
    "thDetailedClass",
    "o-table__th-detailed",
]);

const thLabelClasses = defineClasses(["thLabelClass", "o-table__th__label"]);

const thSortIconClasses = defineClasses([
    "thSortIconClass",
    "o-table__th__sort-icon",
]);

const trBaseClasses = defineClasses(["trClass", "o-table__tr"]);

const trSelectedClasses = defineClasses([
    "trSelectedClass",
    "o-table__tr--selected",
]);

const trCheckedClasses = defineClasses([
    "trCheckedClass",
    "o-table__tr--checked",
]);

const trEmptyClasses = defineClasses(["trEmptyClass", "o-table__tr-empty"]);

const trDetailedClasses = defineClasses([
    "trDetailedClass",
    "o-table__tr-detail",
]);

const tdBaseClasses = defineClasses(["tdClass", "o-table__td"]);

const tdCheckboxClasses = defineClasses(
    ["tdCheckboxClass", "o-table__td-checkbox"],
    [
        "thStickyClass",
        "o-table__td--sticky",
        null,
        computed(() => props.stickyCheckbox),
    ],
);

const tdDetailedClasses = defineClasses(
    /** @deprecated use `tdDetailClass` instead */
    ["tdDetailedChevronClass", "o-table__td-chevron"],
    ["tdDetailClass", "o-table__td-detail"],
);

const footerClasses = defineClasses(["footerClass", "o-table__footer"]);

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

function columnClasses(column: TableColumnItem<T>): ClassBinding[] {
    return isColumnSorted(column) ? thSortedClasses.value : [];
}

function rowClasses(row: TableRow<T>): ClassBinding[] {
    const selectedClasses = isRowEqual(row.value, tableSelectedRow.value)
        ? trSelectedClasses.value
        : [];

    const checkedClasses = isChecked(row) ? trCheckedClasses.value : [];

    const rowClass =
        typeof props.rowClass === "function"
            ? props.rowClass(row.value, row.index) || ""
            : "";

    return [
        ...trBaseClasses.value,
        ...selectedClasses,
        ...checkedClasses,
        { [rowClass]: true },
    ];
}

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({
    columns: tableColumns,
    rows: tableRows,
    filters,
    sort: sortByField,
});

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <div data-oruga="table" :class="rootClasses">
        <div ref="slotsWrapper" style="display: none">
            <slot name="before" />

            <slot>
                <template v-if="columns?.length">
                    <o-table-column
                        v-for="(column, idx) in columns"
                        :key="column.field || idx"
                        v-bind="column" />
                </template>
            </slot>

            <slot name="after" />
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
            <slot
                name="pagination"
                :current="tableCurrentPage"
                :per-page="perPage"
                :total="tableTotal"
                :change="(page) => (tableCurrentPage = page)">
                <o-table-pagination
                    v-model:current="tableCurrentPage"
                    :paginated="paginated"
                    :per-page="perPage"
                    :total="tableTotal"
                    :rounded="paginationRounded"
                    :size="paginationSize"
                    :order="paginationOrder"
                    :simple="paginationSimple"
                    :range-before="paginationRangeBefore"
                    :range-after="paginationRangeAfter"
                    :icon-pack="iconPack"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    :root-class="paginationWrapperRootClasses"
                    @change="(page) => $emit('page-change', page)">
                    <slot name="topLeft" />
                </o-table-pagination>
            </slot>
        </template>

        <div :class="tableWrapperClasses" :style="tableWrapperStyle">
            <table
                v-if="tableColumns.length"
                v-bind="$attrs"
                :class="tableClasses"
                :tabindex="selectable || isScrollable ? 0 : undefined"
                :aria-rowcount="rowCount"
                :aria-colcount="columnCount"
                @keydown.prevent.up="onArrowPressed(-1, $event)"
                @keydown.prevent.down="onArrowPressed(1, $event)"
                @keydown.prevent.home="selectRow(availableRows[0], $event)"
                @keydown.prevent.end="
                    selectRow(availableRows[availableRows.length - 1], $event)
                ">
                <caption v-if="$slots.caption">
                    <slot name="caption" />
                </caption>

                <thead v-if="showHeader">
                    <slot name="preheader" />

                    <tr :aria-rowindex="1">
                        <!-- detailed toggle column -->
                        <th
                            v-if="showDetailRowIcon"
                            :class="[...thBaseClasses, ...thDetailedClasses]"
                            :aria-colindex="1"
                            aria-hidden="true" />

                        <!-- checkable column left -->
                        <th
                            v-if="checkable && checkboxPosition === 'left'"
                            :class="[...thBaseClasses, ...thCheckboxClasses]"
                            :aria-colindex="showDetailRowIcon ? 2 : 1">
                            <slot
                                v-if="checkableHeader"
                                name="checkAll"
                                :is-all-checked="isAllChecked"
                                :is-all-uncheckable="isAllUncheckable"
                                :check-all="updateCheckedRows">
                                <o-checkbox
                                    :model-value="isAllChecked"
                                    autocomplete="off"
                                    name="row_check_all"
                                    :variant="checkboxVariant"
                                    :disabled="isAllUncheckable"
                                    aria-label="Check all"
                                    @update:model-value="
                                        updateCheckedRows(!!$event)
                                    " />
                            </slot>
                        </th>

                        <!-- row header columns -->
                        <template
                            v-for="column in tableColumns"
                            :key="column.identifier">
                            <th
                                v-if="!column.hidden"
                                v-bind="column.thAttrsData"
                                :class="[
                                    ...thBaseClasses,
                                    ...column.thClasses,
                                    ...columnClasses(column),
                                ]"
                                :style="isMobileActive ? {} : column.style"
                                :draggable="canDragColumn"
                                :aria-sort="
                                    isColumnSorted(column)
                                        ? isAsc
                                            ? 'ascending'
                                            : 'descending'
                                        : undefined
                                "
                                :aria-colindex="
                                    ariaColIndexStart + column.index
                                "
                                @click.stop="sort(column, true, $event)"
                                @dragstart="
                                    handleColumnDragStart(column, $event)
                                "
                                @dragend="handleColumnDragEnd(column, $event)"
                                @drop="handleColumnDrop(column, $event)"
                                @dragover="handleColumnDragOver(column, $event)"
                                @dragleave="
                                    handleColumnDragLeave(column, $event)
                                ">
                                <o-slot-component
                                    v-if="column.$slots?.header"
                                    :component="column"
                                    name="header"
                                    tag="span"
                                    :class="thLabelClasses"
                                    :props="{
                                        column: column.value,
                                        index: column.index,
                                    }" />

                                <template v-else>
                                    <span :class="thLabelClasses">
                                        {{ column.label }}
                                    </span>
                                    <span
                                        v-if="column.sortable"
                                        v-show="isColumnSorted(column)"
                                        :class="thSortIconClasses"
                                        :aria-hidden="!isColumnSorted(column)">
                                        <o-icon
                                            :icon="sortIcon"
                                            :pack="iconPack"
                                            :size="sortIconSize"
                                            :rotation="!isAsc ? 180 : 0" />
                                    </span>
                                </template>
                            </th>
                        </template>

                        <!-- checkable column right -->
                        <th
                            v-if="checkable && checkboxPosition === 'right'"
                            :class="[...thBaseClasses, ...thCheckboxClasses]"
                            :aria-colindex="
                                ariaColIndexStart + tableColumns.length
                            ">
                            <slot
                                v-if="checkableHeader"
                                name="checkAll"
                                :is-all-checked="isAllChecked"
                                :is-all-uncheckable="isAllUncheckable"
                                :check-all="updateCheckedRows">
                                <o-checkbox
                                    :model-value="isAllChecked"
                                    autocomplete="off"
                                    name="row_check_all"
                                    :variant="checkboxVariant"
                                    :disabled="isAllUncheckable"
                                    aria-label="Check all"
                                    @update:model-value="
                                        updateCheckedRows(!!$event)
                                    " />
                            </slot>
                        </th>
                    </tr>

                    <tr v-if="hasFilterColumns" :aria-rowindex="2">
                        <!-- detailed toggle column -->
                        <th
                            v-if="showDetailRowIcon"
                            :class="[...thBaseClasses, ...thDetailedClasses]"
                            aria-hidden="true" />

                        <!-- checkable column left -->
                        <th
                            v-if="checkable && checkboxPosition === 'left'"
                            :class="thBaseClasses" />

                        <!-- row filter columns -->
                        <template
                            v-for="column in tableColumns"
                            :key="column.identifier">
                            <th
                                v-if="!column.hidden"
                                v-bind="column.thAttrsData"
                                :class="[...thBaseClasses, ...column.thClasses]"
                                :style="isMobileActive ? {} : column.style">
                                <template
                                    v-if="
                                        column.searchable || column.filterable
                                    ">
                                    <o-slot-component
                                        v-if="column.$slots?.searchable"
                                        :component="column"
                                        name="searchable"
                                        tag="span"
                                        :props="{
                                            column: column.value,
                                            index: column.index,
                                            filters,
                                        }" />
                                    <o-slot-component
                                        v-else-if="column.$slots?.filter"
                                        :component="column"
                                        name="filter"
                                        tag="span"
                                        :props="{
                                            column: column.value,
                                            index: column.index,
                                            filters,
                                        }" />
                                    <o-input
                                        v-else-if="column.field"
                                        v-model="filters[column.field]"
                                        :name="`column_${column.field}_filter`"
                                        :type="
                                            column.numeric ? 'number' : 'search'
                                        "
                                        role="searchbox"
                                        :placeholder="filtersPlaceholder"
                                        :debounce="filterDebounce"
                                        :icon="filtersIcon"
                                        :pack="iconPack"
                                        size="small"
                                        :aria-label="`${column.label} filter`"
                                        @[filtersEvent]="onFiltersEvent"
                                        @input="
                                            (v, e) =>
                                                $emit('filter', column, v, e)
                                        " />
                                </template>
                            </th>
                        </template>

                        <!-- checkable column right -->
                        <th
                            v-if="checkable && checkboxPosition === 'right'"
                            :class="thBaseClasses" />
                    </tr>

                    <tr
                        v-if="hasSubheadings"
                        :aria-rowindex="hasFilterColumns ? 3 : 2">
                        <!-- detailed toggle column -->
                        <th
                            v-if="showDetailRowIcon"
                            :class="[...thBaseClasses, ...thDetailedClasses]" />

                        <!-- checkable column left -->
                        <th
                            v-if="checkable && checkboxPosition === 'left'"
                            :class="thBaseClasses" />

                        <!-- row data columns -->
                        <template
                            v-for="column in tableColumns"
                            :key="column.identifier">
                            <th
                                v-if="!column.hidden"
                                v-bind="column.thAttrsData"
                                :class="[
                                    ...thBaseClasses,
                                    ...column.thSubClasses,
                                ]"
                                :style="isMobileActive ? {} : column.style">
                                <o-slot-component
                                    :component="column"
                                    name="subheading"
                                    tag="span"
                                    :props="{
                                        column: column.value,
                                        index: column.index,
                                    }">
                                    <span :class="thLabelClasses">
                                        {{ column.subheading }}
                                    </span>
                                </o-slot-component>
                            </th>
                        </template>

                        <!-- checkable column right -->
                        <th
                            v-if="checkable && checkboxPosition === 'right'"
                            :class="thBaseClasses" />
                    </tr>
                </thead>

                <tbody>
                    <!-- table rows -->
                    <template
                        v-for="(row, rowIndex) in tableRows"
                        :key="(row.key ?? '0') + (row.hidden ?? false)">
                        <tr
                            v-if="!row.hidden"
                            :class="rowClasses(row)"
                            :draggable="canDragRow"
                            :aria-rowindex="ariaRowIndexStart + rowIndex + 1"
                            @click="selectRow(row, $event)"
                            @dblclick="
                                $emit('dblclick', row.value, row.index, $event)
                            "
                            @mouseenter="
                                $emit(
                                    'mouseenter',
                                    row.value,
                                    row.index,
                                    $event,
                                )
                            "
                            @mouseleave="
                                $emit(
                                    'mouseleave',
                                    row.value,
                                    row.index,
                                    $event,
                                )
                            "
                            @contextmenu="
                                $emit(
                                    'contextmenu',
                                    row.value,
                                    row.index,
                                    $event,
                                )
                            "
                            @dragstart="handleDragStart(row, $event)"
                            @dragend="handleDragEnd(row, $event)"
                            @drop="handleDrop(row, $event)"
                            @dragover="handleDragOver(row, $event)"
                            @dragleave="handleDragLeave(row, $event)">
                            <!-- detailed toggle column -->
                            <td
                                v-if="showDetailRowIcon"
                                :class="[
                                    ...tdBaseClasses,
                                    ...tdDetailedClasses,
                                ]">
                                <o-icon
                                    v-if="isDetailedVisible(row.value)"
                                    :icon="detailIcon"
                                    :pack="iconPack"
                                    :rotation="isDetailRowVisible(row) ? 90 : 0"
                                    clickable
                                    :aria-label="`Open ${row.label} details`"
                                    @click.prevent="toggleDetails(row)" />
                            </td>

                            <!-- checkable column left -->
                            <td
                                v-if="checkable && checkboxPosition === 'left'"
                                :class="[
                                    ...tdBaseClasses,
                                    ...tdCheckboxClasses,
                                ]">
                                <o-checkbox
                                    :model-value="isChecked(row)"
                                    autocomplete="off"
                                    :name="`row_${row.index}_check`"
                                    :variant="checkboxVariant"
                                    :disabled="!isRowCheckable(row.value)"
                                    :aria-label="`Check ${row.label}`"
                                    @update:model-value="checkRow(row)" />
                            </td>

                            <!-- row data columns -->
                            <template
                                v-for="column in tableColumns"
                                :key="column.identifier">
                                <o-slot-component
                                    v-if="!column.hidden"
                                    v-bind="column.tdAttrsData[row.index]"
                                    :component="column"
                                    name="default"
                                    tag="td"
                                    :class="[
                                        ...tdBaseClasses,
                                        ...column.tdClasses,
                                    ]"
                                    :data-label="column.label"
                                    :style="isMobileActive ? {} : column.style"
                                    :props="{
                                        row: row.value,
                                        index: row.index,
                                        column: column.value,
                                        colindex: column.index,
                                        toggleDetails: () => toggleDetails(row),
                                    }"
                                    @click="
                                        $emit(
                                            'cell-click',
                                            row.value,
                                            column.value,
                                            row.index,
                                            column.index,
                                            $event,
                                        )
                                    ">
                                    {{ column.getValue(row.value) }}
                                </o-slot-component>
                            </template>

                            <!-- checkable column right -->
                            <td
                                v-if="checkable && checkboxPosition === 'right'"
                                :class="[
                                    ...tdBaseClasses,
                                    ...tdCheckboxClasses,
                                ]">
                                <o-checkbox
                                    :model-value="isChecked(row)"
                                    autocomplete="off"
                                    :variant="checkboxVariant"
                                    :disabled="!isRowCheckable(row.value)"
                                    :aria-label="`Check ${row.label}`"
                                    @update:model-value="checkRow(row)" />
                            </td>
                        </tr>

                        <transition-group
                            v-if="!row.hidden && props.detailed"
                            :name="detailTransition">
                            <template v-if="isDetailRowVisible(row)">
                                <slot
                                    v-if="customDetailRow"
                                    name="detail"
                                    :row="row.value"
                                    :index="row.index" />
                                <tr
                                    v-else
                                    :key="`${row.key}_detail`"
                                    :class="trDetailedClasses">
                                    <td :colspan="columnCount">
                                        <slot
                                            name="detail"
                                            :row="row.value"
                                            :index="row.index" />
                                    </td>
                                </tr>
                            </template>
                        </transition-group>
                    </template>

                    <tr v-if="!availableRows.length" :class="trEmptyClasses">
                        <td :colspan="columnCount">
                            <slot name="empty">
                                <o-icon
                                    v-if="emptyIcon"
                                    :icon="emptyIcon"
                                    :size="emptyIconSize"
                                    :pack="iconPack" />
                                {{ emptyLabel }}
                            </slot>
                        </td>
                    </tr>
                </tbody>

                <tfoot v-if="$slots.footer">
                    <tr :class="footerClasses">
                        <slot
                            v-if="hasCustomFooterSlot()"
                            name="footer"
                            :column-count="columnCount"
                            :row-count="rowCount" />
                        <th v-else :colspan="columnCount">
                            <slot
                                name="footer"
                                :column-count="columnCount"
                                :row-count="rowCount" />
                        </th>
                    </tr>
                </tfoot>
            </table>
            <slot name="loading" :loading="loading">
                <o-loading
                    v-bind="loadingClasses"
                    :full-page="false"
                    :active="loading"
                    :icon="loadingIcon"
                    :label="loadingLabel" />
            </slot>
        </div>

        <template
            v-if="
                (checkable && $slots['bottomLeft']) ||
                (paginated &&
                    (paginationPosition === 'bottom' ||
                        paginationPosition === 'both'))
            ">
            <slot
                name="pagination"
                :current="tableCurrentPage"
                :per-page="perPage"
                :total="tableTotal"
                :change="(page) => (tableCurrentPage = page)">
                <o-table-pagination
                    v-model:current="tableCurrentPage"
                    :paginated="paginated"
                    :per-page="perPage"
                    :total="tableTotal"
                    :rounded="paginationRounded"
                    :size="paginationSize"
                    :order="paginationOrder"
                    :simple="paginationSimple"
                    :range-before="paginationRangeBefore"
                    :range-after="paginationRangeAfter"
                    :icon-pack="iconPack"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    :root-class="paginationWrapperRootClasses"
                    @change="(page) => $emit('page-change', page)">
                    <slot name="bottomLeft" />
                </o-table-pagination>
            </slot>
        </template>
    </div>
</template>
