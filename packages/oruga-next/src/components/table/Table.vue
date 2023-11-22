<script setup lang="ts">
import {
    computed,
    ref,
    watch,
    onMounted,
    nextTick,
    useSlots,
    toValue,
    type PropType,
    type ComputedRef,
} from "vue";

import OCheckbox from "../checkbox/Checkbox.vue";
import OIcon from "../icon/Icon.vue";
import OInput from "../input/Input.vue";
import OLoading from "../loading/Loading.vue";

import OSlotComponent from "@/utils/SlotComponent";

import OTableMobileSort from "./TableMobileSort.vue";
import OTableColumn from "./TableColumn.vue";
import OTablePagination from "./TablePagination.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useProviderParent,
    usePropBinding,
    useMatchMedia,
    useDebounce,
} from "@/composables";
import {
    getValueByPath,
    indexOf,
    toCssDimension,
    escapeRegExpChars,
    removeDiacriticsFromString,
    uuid,
} from "@/utils/helpers";
import type { Column, TableColumn, TableColumnComponent } from "./types";
import type { PropBind } from "@/types";

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

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Table data */
    data: { type: Array as PropType<unknown[]>, default: () => [] },
    /** Table columns */
    columns: { type: Array as PropType<Column[]>, default: () => [] },
    /** Border to all cells */
    bordered: { type: Boolean, default: false },
    /** Whether table is striped */
    striped: { type: Boolean, default: false },
    /** Makes the cells narrower */
    narrowed: { type: Boolean, default: false },
    /** Rows are highlighted when hovering */
    hoverable: { type: Boolean, default: false },
    /** Enable loading state */
    loading: { type: Boolean, default: false },
    /** Allow row details  */
    detailed: { type: Boolean, default: false },
    /** Rows can be checked (multiple) */
    checkable: { type: Boolean, default: false },
    /** Show check/uncheck all checkbox in table header when checkable */
    headerCheckable: { type: Boolean, default: true },
    /**
     * Position of the checkbox when checkable
     * @values left, right
     */
    checkboxPosition: {
        type: String,
        default: () => getOption("table.checkboxPosition", "left"),
        validator: (value: string) => ["left", "right"].indexOf(value) >= 0,
    },
    /**
     * Color of the checkbox when checkable
     * @values primary, info, success, warning, danger, and any other custom color
     */
    checkboxVariant: {
        type: String,
        default: () => getOption("table.checkboxVariant"),
    },
    /** Set which row is selected, use v-model:selected to make it two-way binding */
    selected: { type: Object, default: undefined },
    /** Custom method to verify if a row is selectable, works when is selected. */
    isRowSelectable: { type: Function, default: () => true },
    /** Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering */
    focusable: { type: Boolean, default: false },
    /** Custom method to verify if row is checked, works when is checkable. Useful for backend pagination */
    customIsChecked: {
        type: Function as PropType<(row: unknown, data: unknown[]) => boolean>,
        default: undefined,
    },
    /** Custom method to verify if a row is checkable, works when is checkable */
    isRowCheckable: {
        type: Function as PropType<(row: unknown) => boolean>,
        default: (row: unknown) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("table.isRowCheckable", (row) => true)(row),
    },
    /** Set which rows are checked, use v-model:checkedRows to make it two-way binding */
    checkedRows: { type: Array, default: () => [] },
    /** Rows appears as cards on mobile (collapse rows) */
    mobileCards: {
        type: Boolean,
        default: () => getOption("table.mobileCards", true),
    },
    /** Sets the default sort column and order — e.g. ['first_name', 'desc'] */
    defaultSort: {
        type: [String, Array] as PropType<string | string[]>,
        default: () => getOption("table.defaultSort"),
    },
    /**
     * Sets the default sort column direction on the first click
     * @values asc, desc
     */
    defaultSortDirection: {
        type: String,
        default: () => getOption("table.defaultSortDirection", "asc"),
    },
    /** Sets the header sorting icon */
    sortIcon: {
        type: String,
        default: () => getOption("table.sortIcon", "arrow-up"),
    },
    /**
     * Sets the size of the sorting icon
     * @values small, medium, large
     */
    sortIconSize: {
        type: String,
        default: () => getOption("table.sortIconSize", "small"),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("table.iconPack"),
    },
    /** Columns won't be sorted with Javascript, use with sort event to sort in your backend */
    backendSorting: {
        type: Boolean,
        default: () => getOption("table.backendSorting", false),
    },
    /** Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend */
    backendFiltering: {
        type: Boolean,
        default: () => getOption("table.backendFiltering", false),
    },
    /** Add a class to row based on the return */
    rowClass: {
        type: Function as PropType<(row: unknown, index: number) => string>,
        default: (row: unknown, index: number) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("table.rowClass", (row, index) => "")(row, index),
    },
    /** Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) */
    openedDetailed: { type: Array, default: () => [] },
    /** Controls the visibility of the trigger that toggles the detailed rows. */
    hasDetailedVisible: {
        type: Function as PropType<(row: unknown) => boolean>,
        default: (row: unknown) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("table.hasDetailedVisible", (row) => true)(row),
    },
    /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
    detailKey: {
        type: String,
        default: () => getOption("table.detailKey"),
    },
    /** Allow chevron icon and column to be visible */
    showDetailIcon: {
        type: Boolean,
        default: () => getOption("table.showDetailIcon", true),
    },
    /** Icon name of detail action */
    detailIcon: {
        type: String,
        default: () => getOption("table.detailIcon", "chevron-right"),
    },
    /** Custom style on details */
    customDetailRow: { type: Boolean, default: false },
    /* Transition name to use when toggling row details. */
    detailTransition: {
        type: String,
        default: () => getOption("table.detailTransition", "slide"),
    },
    /** Text when nothing is selected */
    mobileSortPlaceholder: {
        type: String,
        default: () => getOption("table.mobileSortPlaceholder"),
    },
    /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
    customRowKey: {
        type: String,
        default: () => getOption("table.customRowKey"),
    },
    /** Allows rows to be draggable */
    draggable: { type: Boolean, default: false },
    /** Allows columns to be draggable */
    draggableColumn: { type: Boolean, default: false },
    /** Add a horizontal scrollbar when table is too wide */
    scrollable: { type: Boolean, default: undefined },
    /** Show a sticky table header */
    stickyHeader: { type: Boolean, default: undefined },
    /** Table fixed height */
    height: { type: [Number, String], default: undefined },
    /** Add a native event to filter */
    filtersEvent: { type: String, default: "" },
    /** Filtering debounce time (in milliseconds) */
    debounceSearch: { type: Number, default: undefined },
    /** Show header */
    showHeader: {
        type: Boolean,
        default: () => getOption("table.showHeader", true),
    },
    /** Make the checkbox column sticky when checkable */
    stickyCheckbox: { type: Boolean, default: false },
    /** Adds pagination to the table */
    paginated: {
        type: Boolean,
        default: () => getOption("table.paginated", false),
    },
    /** Rows won't be paginated with Javascript, use with page-change event to paginate in your backend */
    backendPagination: { type: Boolean, default: false },
    /** Total number of table data if backend-pagination is enabled */
    total: { type: Number, default: 0 },
    /** Current page of table data (if paginated), use v-model:currentPage to make it two-way binding */
    currentPage: { type: Number, default: 1 },
    /** How many rows per page (if paginated) */
    perPage: {
        type: [Number, String],
        default: () => getOption("table.perPage", 20),
    },
    /**
     * Pagination position (if paginated)
     * @values bottom, top, both
     */
    paginationPosition: {
        type: String,
        default: () => getOption("table.paginationPosition", "bottom"),
        validator: (value: string) =>
            ["bottom", "top", "both"].indexOf(value) >= 0,
    },
    /** Rounded pagination if paginated */
    paginationRounded: {
        type: Boolean,
        default: () => getOption("table.paginationRounded", false),
    },
    /** Size of pagination if paginated */
    paginationSize: {
        type: String,
        default: () => getOption("table.paginationSize", "small"),
    },
    /** Enable simple style pagination if paginated */
    paginationSimple: {
        type: Boolean,
        default: () => getOption("table.paginationSimple", false),
    },
    /**
     * Pagination buttons order if paginated
     * @values centered, right, left
     */
    paginationOrder: {
        type: String,
        default: () => getOption("table.paginationOrder"),
        validator: (value: string) =>
            ["centered", "right", "left"].indexOf(value) >= 0,
    },
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("table.mobileBreakpoint"),
    },
    /** Accessibility label for the pagination next page button. */
    ariaNextLabel: {
        type: String,
        default: () => getOption("table.ariaNextLabel"),
    },
    /** Accessibility label for the pagination previous page button. */
    ariaPreviousLabel: {
        type: String,
        default: () => getOption("table.ariaPreviousLabel"),
    },
    /** Accessibility label for the pagination page button. */
    ariaPageLabel: {
        type: String,
        default: () => getOption("table.ariaPageLabel"),
    },
    /** Accessibility label for the pagination current page button. */
    ariaCurrentLabel: {
        type: String,
        default: () => getOption("table.ariaCurrentLabel"),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "tableClass",
        "wrapperClass",
        "footerClass",
        "emptyClass",
        "detailedClass",
        "borderedClass",
        "stripedClass",
        "narrowedClass",
        "hoverableClass",
        "trSelectedClass",
        "trCheckedClass",
        "thClass",
        "thPositionClass",
        "thStickyClass",
        "thCheckboxClass",
        "thCurrentSortClass",
        "thSortableClass",
        "thUnselectableClass",
        "thSortIconClass",
        "thDetailedClass",
        "thSubheadingClass",
        "tdClass",
        "tdPositionClass",
        "tdStickyClass",
        "tdCheckboxClass",
        "tdDetailedChevronClass",
        "stickyHeaderClass",
        "scrollableClass",
        "mobileSortClass",
        "paginationWrapperClass",
        "mobileClass",
    ]),
});

const emits = defineEmits<{
    /**
     * currentPage prop two-way binding
     * @param value {number} updated currentPage prop
     */
    (e: "update:currentPage", value: number): void;
    /**
     * on pagination page change event
     * @param page {number} updated page
     */
    (e: "page-change", page: number): void;
    /**
     * select prop two-way binding
     * @param value {typeof data} updated select prop
     */
    (e: "update:selected", value: unknown): void;
    /**
     * on row select event
     * @param newRow {typeof data} new select value
     * @param oldRow {typeof data} old select value
     */
    (e: "select", newrow: unknown, oldrow: unknown): void;
    /**
     * on row checked event
     * @param value {Array<typeof data>} all checked rows
     * @param row {typeof data} row data
     */
    (e: "check", value: Array<unknown>, row?: unknown): void;
    /**
     * on all rows checked event
     * @param value {Array<typeof data>} all checked rows
     */
    (e: "check-all", value: Array<unknown>): void;
    /**
     * checkedRows prop two-way binding
     * @param value {Array<typeof data>} updated checkedRows prop
     */
    (e: "update:checkedRows", value: Array<unknown>): void;
    /**
     * on column sort change event
     * @param column {Column} column data
     * @param direction {string}  'asc' or 'desc'
     *
     * @param event {Event} native  event
     */
    (e: "sort", column: Column, direction: "asc" | "desc", event: Event): void;
    /**
     * on filter change event
     * @param filters {Record<string, string>} filter object
     */
    (e: "filters-change", value: Record<string, string>): void;
    /**
     * on natvie filter event based on props filtersEvent
     * @param filtersEvent {string} props filtersEvent value
     * @param filters {Record<string, string>} filter object
     * @param event {Event} native  event
     */
    (
        e: "filters-event",
        filtersEvent: string,
        filters: Record<string, string>,
        event: Event,
    ): void;
    /**
     * openedDetailed prop two-way binding
     * @param value {Array<typeof data>} updated openedDetailed prop
     */
    (e: "update:openedDetailed", value: Array<unknown>): void;
    /**
     * on details open event
     * @param row {typeof data} row data
     */
    (e: "details-open", row: unknown): void;
    /**
     * on details close event
     * @param row {typeof data} row data
     */
    (e: "details-close", row: unknown): void;
    /**
     * on row click event
     * @param row {typeof data} row data
     * @param index {number} index of clicked row
     * @param event {Event} native click event
     */
    (e: "click", row: unknown, index: number, event: Event): void;
    /**
     * on row double click event
     * @param row {typeof data} row data
     * @param index {number} index of clicked row
     * @param event {Event} native click event
     */
    (e: "dblclick", row: unknown, index: number, event: Event): void;
    /**
     * on row right click event
     * @param row {typeof data} row data
     * @param index {number} index of clicked row
     * @param event {Event} native contextmenu event
     */
    (e: "contextmenu", row: unknown, index: number, event: Event): void;
    /**
     * on row mouseenter event
     * @param row {typeof data} row data
     * @param index {number} index of clicked row
     * @param event {Event} native mouseenter event
     */
    (e: "mouseenter", row: unknown, index: number, event: Event): void;
    /**
     * on row mouseleave event
     * @param row {typeof data} row data
     * @param index {number} index of clicked row
     * @param event {Event} native mouseleave event
     */
    (e: "mouseleave", row: unknown, index: number, event: Event): void;
    /**
     * on cell click event
     * @param row {typeof data} row data
     * @param column {Column} column data
     * @param index {number} row index
     * @param colindex {number} column index
     * @param event {Event} native click event
     */
    (
        e: "cell-click",
        row: unknown,
        column: Column,
        index: number,
        colindex: number,
        event: Event,
    ): void;
    /**
     * on row dragstart event
     * @param row {typeof data} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragstart event
     */
    (e: "dragstart", row: unknown, index: number, event: DragEvent): void;
    /**
     * on row dragend event
     * @param row {typeof data} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragend event
     */
    (e: "dragend", row: unknown, index: number, event: DragEvent): void;
    /**
     * on row drop event
     * @param row {typeof data} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native drop event
     */
    (e: "drop", row: unknown, index: number, event: DragEvent): void;

    /**
     * on row dragleave event
     * @param row {typeof data} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragleave event
     */
    (e: "dragleave", row: unknown, index: number, event: DragEvent): void;
    /**
     * on row dragover event
     * @param row {typeof data} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragover event
     */
    (e: "dragover", row: unknown, index: number, event: DragEvent): void;
    /**
     * on column columndragstart event
     * @param column {Column} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragstart event
     */
    (
        e: "columndragstart",
        column: Column,
        index: number,
        event: DragEvent,
    ): void;
    /**
     * on column columndragend event
     * @param column {Column} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragend event
     */
    (e: "columndragend", column: Column, index: number, event: DragEvent): void;
    /**
     * on column columndrop event
     * @param column {Column} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndrop event
     */
    (e: "columndrop", column: Column, index: number, event: DragEvent): void;
    /**
     * on column columndragleave event
     * @param column {Column} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragleave event
     */
    (
        e: "columndragleave",
        column: Column,
        index: number,
        event: DragEvent,
    ): void;
    /**
     * on column columndragover event
     * @param column {Column} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragover event
     */
    (
        e: "columndragover",
        column: Column,
        index: number,
        event: DragEvent,
    ): void;
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const isMobileActive = computed(() => props.mobileCards && isMobile.value);

const rootRef = ref<HTMLElement>();
const slotRef = ref<HTMLElement>();

/** Provide functionalities and data to child item components */
const provider = useProviderParent<ComputedRef<TableColumnComponent>>(slotRef);

const tableColumns = computed<TableColumn[]>(() =>
    provider.sortedItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data),
    })),
);

const tableData = computed(() => {
    if (!props.data?.length) return [...props.data];
    // if no customRowKey is given and data are objects, create unique row id for each row
    return props.data.map((row) =>
        !props.customRowKey && typeof row === "object"
            ? Object.assign(row, { __rowKey: uuid() })
            : row,
    );
});

const tableRows = ref(tableData.value);
const dataTotal = ref(
    props.backendPagination ? props.total : tableData.value.length,
);

const tableCurrentPage = usePropBinding<number>("currentPage", props, emits);

/**
 * When table rows data change:
 *   1. Update internal value.
 *   2. Filter data if it's not backend-filtered.
 *   3. Sort again if it's not backend-sorted.
 *   4. Set new total if it's not backend-paginated.
 */
watch(
    () => tableData.value,
    (value) => {
        // if not backend filtered, filter rows
        if (!props.backendFiltering)
            tableRows.value = value.filter((row) => isRowFiltered(row));
        else tableRows.value = [...value];
        // if not backend sorted, sort rows
        if (!props.backendSorting) sort(currentSortColumn.value, true);
        // if not backend paginated, set pagination total
        if (!props.backendPagination) dataTotal.value = tableRows.value.length;
    },
    { deep: true },
);

/**
 * When Pagination total change, update internal total
 * only if it's backend-paginated.
 */
watch(
    () => props.total,
    (newTotal) => {
        if (!props.backendPagination) return;
        dataTotal.value = newTotal;
    },
);

const tableWrapperStyle = computed(() => ({
    height: toCssDimension(props.height),
}));

/** Splitted data based on the pagination. */
const visibleRows = computed(() => {
    if (!props.paginated) return tableRows.value;

    const currentPage = tableCurrentPage.value;
    const perPage = Number(props.perPage);

    if (tableRows.value.length <= perPage) {
        return tableRows.value;
    } else {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        return tableRows.value.slice(start, end);
    }
});

const visibleColumns = computed(() => {
    if (!tableColumns.value) return tableColumns.value;
    return tableColumns.value.filter((column) => {
        return column.visible || column.visible === undefined;
    });
});

watch([() => visibleRows.value, () => visibleColumns.value], () => {
    // process tdAttrs when row or columns got changed
    if (visibleColumns.value.length && visibleRows.value.length) {
        for (let i = 0; i < visibleColumns.value.length; i++) {
            const col = visibleColumns.value[i];
            col.tdAttrsData = visibleRows.value.map((data) =>
                typeof col.tdAttrs === "function" ? col.tdAttrs(data, col) : {},
            );
        }
    }
});

/** Return total column count based if it's checkable or expanded */
const columnCount = computed(() => {
    let count = visibleColumns.value.length;
    count += props.checkable ? 1 : 0;
    count += props.detailed && props.showDetailIcon ? 1 : 0;
    return count;
});

/** Check if has any searchable column. */
const hasSearchablenewColumns = computed(() =>
    tableColumns.value.some((column) => column.searchable),
);

/** return if scrollable table */
const isScrollable = computed(() => {
    if (props.scrollable) return true;
    if (!tableColumns.value) return false;
    return tableColumns.value.some((column) => column.sticky);
});

const slots = useSlots();

const hasCustomSubheadings = computed(() => {
    if (slots.subheading) return true;
    return tableColumns.value.some((column) => !!column.subheading);
});

/** Check if footer slot has custom content. */
function hasCustomFooterSlot(): boolean {
    if (slots.footer) {
        // [Vue warn]: Slot "footer" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.
        const footer = slots.footer();
        if (footer.length > 1) return true;

        const tag = footer[0]["tag"];
        if (tag !== "th" && tag !== "td") return false;
    }
    return true;
}

/** Table arrow keys listener, change selection. */
function onArrowPressed(pos: number, event: KeyboardEvent): void {
    if (!visibleRows.value.length) return;

    let index = visibleRows.value.indexOf(props.selected) + pos;

    // Prevent from going up from first and down from last
    index =
        index < 0
            ? 0
            : index > visibleRows.value.length - 1
            ? visibleRows.value.length - 1
            : index;

    const row = visibleRows.value[index];

    if (!props.isRowSelectable(row)) {
        let newIndex = null;
        if (pos > 0) {
            for (
                let i = index;
                i < visibleRows.value.length && newIndex === null;
                i++
            ) {
                if (props.isRowSelectable(visibleRows.value[i])) newIndex = i;
            }
        } else {
            for (let i = index; i >= 0 && newIndex === null; i--) {
                if (props.isRowSelectable(visibleRows.value[i])) newIndex = i;
            }
        }
        if (newIndex >= 0) {
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
function selectRow(row: unknown, index: number, event: Event): void {
    emits("click", row, index, event);

    if (props.selected === row) return;
    if (!props.isRowSelectable(row)) return;

    // emit new and old row
    emits("select", row, props.selected);

    // emit new row to update user variable
    emits("update:selected", row);
}

function isRowSelected(row: unknown, selectedRow: unknown): boolean {
    return selectedRow ? getRowKey(row) === getRowKey(selectedRow) : false;
}

function getRowKey(row: unknown): unknown {
    if (props.customRowKey) return row[props.customRowKey];
    if (typeof row === "object") return row["__rowKey"];
    return row;
}

// --- Filter Feature ---

const filters = ref<Record<string, string>>({});

watch(
    filters.value,
    (value) => {
        if (props.debounceSearch)
            useDebounce(() => handleFiltersChange(value), props.debounceSearch);
        else handleFiltersChange(value);
    },
    { deep: true },
);

function onFiltersEvent(event: Event): void {
    emits("filters-event", props.filtersEvent, filters.value, event);
}

function handleFiltersChange(value: Record<string, string>): void {
    if (props.backendFiltering) {
        emits("filters-change", value);
    } else {
        tableRows.value = props.data.filter((row) => isRowFiltered(row));
        if (!props.backendPagination) {
            dataTotal.value = tableRows.value.length;
        }
        if (!props.backendSorting) {
            if (Object.keys(currentSortColumn.value).length > 0) {
                doSortSingleColumn(currentSortColumn.value);
            }
        }
    }
}

function isRowFiltered(row: unknown): boolean {
    for (const key in filters.value) {
        if (!filters.value[key]) continue;
        const input = filters.value[key];
        const column = tableColumns.value.filter((c) => c.field === key)[0];
        if (typeof column?.customSearch === "function") {
            if (!column.customSearch(row, input)) return false;
        } else {
            const value = getValueByPath(row, key);
            if (value == null) return false;
            if (Number.isInteger(value)) {
                if (value !== Number(input)) return false;
            } else {
                const re = new RegExp(escapeRegExpChars(input), "i");
                if (Array.isArray(value)) {
                    const valid = value.some(
                        (val) =>
                            re.test(removeDiacriticsFromString(val)) ||
                            re.test(val),
                    );
                    if (!valid) return false;
                } else {
                    if (
                        !re.test(removeDiacriticsFromString(value)) &&
                        !re.test(value)
                    ) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

// --- Sort Feature ---

const currentSortColumn = ref<TableColumn>();
const isAsc = ref(true);

onMounted(() => nextTick(() => checkSort()));

/** Check if has any sortable column. */
const hasSortablenewColumns = computed(() =>
    tableColumns.value.some((column) => column.sortable),
);

/** Check if the column is the current sort column. */
function isColumnSorted(column: TableColumn): boolean {
    return currentSortColumn.value?.identifier === column.identifier;
}

/** Call initSort only first time (For example async data). */
function checkSort(): void {
    if (tableColumns.value.length && !currentSortColumn.value) {
        // is first time sort
        initSort();
    } else if (tableColumns.value.length) {
        if (
            currentSortColumn.value &&
            Object.keys(currentSortColumn.value).length > 0
        ) {
            for (let i = 0; i < tableColumns.value.length; i++) {
                if (
                    currentSortColumn.value.field ===
                    tableColumns.value[i].field
                ) {
                    currentSortColumn.value = tableColumns.value[i];
                    break;
                }
            }
        }
    }
}

/** Initial sorted column based on the default-sort prop. */
function initSort(): void {
    if (!props.defaultSort) return;
    let sortField = "";
    let sortDirection = props.defaultSortDirection;
    if (Array.isArray(props.defaultSort)) {
        sortField = props.defaultSort[0];
        if (props.defaultSort[1]) {
            sortDirection = props.defaultSort[1];
        }
    } else {
        sortField = props.defaultSort;
    }
    const sortColumn = tableColumns.value.filter(
        (column) => column.field === sortField,
    )[0];
    if (sortColumn) {
        isAsc.value = sortDirection.toLowerCase() !== "desc";
        sort(sortColumn, true);
    }
}

/**
 * Sort the column.
 * Toggle current direction on column if it's sortable
 * and not just updating the prop.
 */
function sort(
    column: TableColumn,
    updateDirection = false,
    event?: Event,
): void {
    if (!column || !column.sortable) return;

    if (!updateDirection)
        isAsc.value = isColumnSorted(column)
            ? !isAsc.value
            : props.defaultSortDirection.toLowerCase() !== "desc";

    // if not first time sort
    if (currentSortColumn.value)
        emits("sort", column, isAsc.value ? "asc" : "desc", event);

    if (!props.backendSorting) doSortSingleColumn(column);

    currentSortColumn.value = column;
}

function doSortSingleColumn(column: Column): void {
    tableRows.value = sortBy(
        tableRows.value,
        column.field,
        column.customSort,
        isAsc.value,
    );
}

/**
 * Sort an array by key without mutating original data.
 * Call the user sort function if it was passed.
 */
function sortBy(
    array: unknown[],
    key: string,
    fn: (a: unknown, b: unknown, asc: boolean) => number,
    isAsc: boolean,
): unknown[] {
    let sorted = [];
    // Sorting without mutating original data
    if (fn && typeof fn === "function") {
        sorted = [...array].sort((a, b) => fn(a, b, isAsc));
    } else {
        sorted = [...array].sort((a, b) => {
            // Get nested values from objects
            let newA = getValueByPath(a, key);
            let newB = getValueByPath(b, key);

            // sort boolean type
            if (typeof newA === "boolean" && typeof newB === "boolean") {
                return isAsc ? (newA > newB ? 1 : -1) : newA > newB ? -1 : 1;
            }

            if (!newA && newA !== 0) return 1;
            if (!newB && newB !== 0) return -1;
            if (newA === newB) return 0;

            newA = typeof newA === "string" ? newA.toUpperCase() : newA;
            newB = typeof newB === "string" ? newB.toUpperCase() : newB;

            return isAsc ? (newA > newB ? 1 : -1) : newA > newB ? -1 : 1;
        });
    }

    return sorted;
}

// --- Checkable Feature ---

const newCheckedRows = ref([...props.checkedRows]);
const lastCheckedRowIndex = ref(null);

/**
 * When checkedRows prop change, update internal value without
 * mutating original data.
 */
watch(
    () => props.checkedRows,
    (rows) => {
        newCheckedRows.value = [...rows];
    },
    { deep: true },
);

/** Check if all rows in the page are checked. */
const isAllChecked = computed(() => {
    const validVisibleData = visibleRows.value.filter((row) =>
        props.isRowCheckable(row),
    );
    if (validVisibleData.length === 0) return false;
    const isAllChecked = validVisibleData.some(
        (currentVisibleRow) =>
            indexOf(
                newCheckedRows.value,
                currentVisibleRow,
                props.customIsChecked,
            ) < 0,
    );
    return !isAllChecked;
});

/** Check if all rows in the page are checkable. */
const isAllUncheckable = computed(() => {
    const validVisibleData = visibleRows.value.filter((row) =>
        props.isRowCheckable(row),
    );
    return validVisibleData.length === 0;
});

/** Check if the row is checked (is added to the array). */
function isRowChecked(row: unknown): boolean {
    return indexOf(newCheckedRows.value, row, props.customIsChecked) >= 0;
}

/** Remove a checked row from the array. */
function removeCheckedRow(row: unknown): void {
    const index = indexOf(newCheckedRows.value, row, props.customIsChecked);
    if (index >= 0) newCheckedRows.value.splice(index, 1);
}

/**
 * Header checkbox click listener.
 * Add or remove all rows in current page.
 */
function checkAll(): void {
    const allChecked = isAllChecked.value;
    visibleRows.value.forEach((currentRow) => {
        if (props.isRowCheckable(currentRow)) removeCheckedRow(currentRow);

        if (!allChecked) {
            if (props.isRowCheckable(currentRow))
                newCheckedRows.value.push(currentRow);
        }
    });

    emits("check", newCheckedRows.value);
    emits("check-all", newCheckedRows.value);

    // Emit checked rows to update user variable
    emits("update:checkedRows", newCheckedRows.value);
}

/** Row checkbox click listener. */
function checkRow(row: unknown, index: number): void {
    if (!props.isRowCheckable(row)) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const lastIndex = lastCheckedRowIndex.value;
    lastCheckedRowIndex.value = index;

    // if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
    //         shiftCheckRow(row, index, lastIndex);

    if (!isRowChecked(row)) newCheckedRows.value.push(row);
    else removeCheckedRow(row);

    emits("check", newCheckedRows.value, row);

    // Emit checked rows to update user variable
    emits("update:checkedRows", newCheckedRows.value);
}

/** Check row when shift is pressed. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function shiftCheckRow(
    row: unknown,
    index: number,
    lastCheckedRowIndex: number,
): void {
    // Get the subset of the list between the two indicies
    const subset = visibleRows.value.slice(
        Math.min(index, lastCheckedRowIndex),
        Math.max(index, lastCheckedRowIndex) + 1,
    );

    // Determine the operation based on the state of the clicked checkbox
    const shouldCheck = !isRowChecked(row);

    subset.forEach((item) => {
        removeCheckedRow(item);
        if (shouldCheck && props.isRowCheckable(item))
            newCheckedRows.value.push(item);
    });
}

// --- Detail Row Feature ---

const visibleDetailRows = ref(props.openedDetailed);

/**
 * return if detailed row tabled
 * will be with chevron column & icon or not
 */
const showDetailRowIcon = computed(
    () => props.detailed && props.showDetailIcon,
);

/**
 * When the user wants to control the detailed rows via props.
 * Or wants to open the details of certain row with the router for example.
 */
watch(
    () => props.openedDetailed,
    (expandedRows) => {
        visibleDetailRows.value = expandedRows;
    },
);

/** Toggle to show/hide details slot */
function toggleDetails(row: unknown): void {
    const found = isVisibleDetailRow(row);

    if (found) {
        closeDetailRow(row);
        emits("details-close", row);
    } else {
        openDetailRow(row);
        emits("details-open", row);
    }

    // Syncs the detailed rows with the parent component
    emits("update:openedDetailed", visibleDetailRows.value);
}

function openDetailRow(row: unknown): void {
    const index = handleDetailKey(row);
    visibleDetailRows.value.push(index);
}

function closeDetailRow(row: unknown): void {
    const index = handleDetailKey(row);
    const i = visibleDetailRows.value.indexOf(index);
    if (i >= 0) visibleDetailRows.value.splice(i, 1);
}

function isVisibleDetailRow(row: unknown): boolean {
    const index = handleDetailKey(row);
    return visibleDetailRows.value.indexOf(index) >= 0;
}

function isActiveDetailRow(row: unknown): boolean {
    return props.detailed && !props.customDetailRow && isVisibleDetailRow(row);
}

function isActiveCustomDetailRow(row: unknown): boolean {
    return props.detailed && props.customDetailRow && isVisibleDetailRow(row);
}

/**
 * When the detailKey is defined we use the object[detailKey] as index.
 * If not, use the object reference by default.
 */
function handleDetailKey(row: unknown): string {
    const key = props.detailKey;
    return !key?.length || !row ? row : row[key];
}

// --- Drag&Drop Feature ---

const isDraggingRow = ref(false);
const isDraggingColumn = ref(false);

const canDragRow = computed(() => props.draggable && !isDraggingColumn.value);

const canDragColumn = computed(
    () => props.draggableColumn && !isDraggingRow.value,
);

/** Emits drag start event*/
function handleDragStart(row: unknown, index: number, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragstart", row, index, event);
}

/** Emits drag leave event */
function handleDragEnd(row: unknown, index: number, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragend", row, index, event);
}

/** Emits drop event */
function handleDrop(row: unknown, index: number, event: DragEvent): void {
    if (!props.draggable) return;
    emits("drop", row, index, event);
}

/** Emits drag over event */
function handleDragOver(row: unknown, index: number, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragover", row, index, event);
}

/** Emits drag leave event */
function handleDragLeave(row: unknown, index: number, event: DragEvent): void {
    if (!props.draggable) return;
    emits("dragleave", row, index, event);
}

/** Emits drag start event (column) */
function handleColumnDragStart(
    column: Column,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = true;
    emits("columndragstart", column, index, event);
}

/** Emits drag leave event (column) */
function handleColumnDragEnd(
    column: Column,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = false;
    emits("columndragend", column, index, event);
}

/** Emits drop event (column) */
function handleColumnDrop(
    column: Column,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndrop", column, index, event);
}

/** Emits drag over event (column) */
function handleColumnDragOver(
    column: Column,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndragover", column, index, event);
}

/** Emits drag leave event (column) */
function handleColumnDragLeave(
    column: Column,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndragleave", column, index, event);
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-table__root"),
    {
        [useComputedClass("mobileClass", "o-table__wrapper--mobile")]:
            isMobileActive.value,
    },
]);

const tableClasses = computed(() => [
    useComputedClass("tableClass", "o-table"),
    {
        [useComputedClass("borderedClass", "o-table--bordered")]:
            props.bordered,
    },
    {
        [useComputedClass("stripedClass", "o-table--striped")]: props.striped,
    },
    {
        [useComputedClass("narrowedClass", "o-table--narrowed")]:
            props.narrowed,
    },
    {
        [useComputedClass("hoverableClass", "o-table--hoverable")]:
            (props.hoverable || props.focusable) && visibleRows.value.length,
    },
    {
        [useComputedClass("emptyClass", "o-table--table__empty")]:
            !visibleRows.value.length,
    },
]);

const tableWrapperClasses = computed(() => [
    useComputedClass("wrapperClass", "o-table__wrapper"),
    {
        [useComputedClass(
            "stickyHeaderClass",
            "o-table__wrapper--sticky-header",
        )]: props.stickyHeader,
    },
    {
        [useComputedClass("scrollableClass", "o-table__wrapper--scrollable")]:
            isScrollable.value,
    },
    {
        [useComputedClass("mobileClass", "o-table__wrapper--mobile")]:
            isMobileActive.value,
    },
]);

const footerClasses = computed(() => [
    useComputedClass("footerClass", "o-table__footer"),
]);

const thBaseClasses = computed(() => [
    useComputedClass("thClass", "o-table__th"),
]);

const tdBaseClasses = computed(() => [
    useComputedClass("tdClass", "o-table__td"),
]);

const thCheckboxClasses = computed(() => [
    ...thBaseClasses.value,
    useComputedClass("thCheckboxClass", "o-table__th-checkbox"),
]);

const thDetailedClasses = computed(() => [
    ...thBaseClasses.value,
    useComputedClass("thDetailedClass", "o-table__th--detailed"),
]);

const thSubheadingClasses = computed(() => [
    ...thBaseClasses.value,
    useComputedClass("thSubheadingClass", "o-table__th"),
]);

const tdCheckboxClasses = computed(() => [
    ...tdBaseClasses.value,
    useComputedClass("tdCheckboxClass", "o-table__td-checkbox"),
    ...thStickyClasses({ sticky: props.stickyCheckbox }),
]);

const detailedClasses = computed(() => [
    useComputedClass("detailedClass", "o-table__detail"),
]);

const tdDetailedChevronClasses = computed(() => [
    ...tdBaseClasses.value,
    useComputedClass("tdDetailedChevronClass", "o-table__td-chevron"),
]);

const mobileSortClasses = computed(() => [
    useComputedClass("mobileSortClass", "o-table__mobile-sort"),
]);

const paginationWrapperClasses = computed(() => [
    useComputedClass("paginationWrapperClass", "o-table__pagination"),
]);

function thClasses(column: TableColumn): PropBind {
    return [
        ...thBaseClasses.value,
        ...thStickyClasses(column),
        {
            [useComputedClass(
                "thCurrentSortClass",
                "o-table__th-current-sort",
            )]: isColumnSorted(column),
        },
        {
            [useComputedClass("thSortableClass", "o-table__th--sortable")]:
                column.sortable,
        },
        {
            [useComputedClass(
                "thUnselectableClass",
                "o-table__th--unselectable",
            )]: column.isHeaderUnselectable,
        },
        {
            [useComputedClass(
                "thPositionClass",
                "o-table__th--",
                column.position,
            )]: column.position,
        },
    ];
}

function thStickyClasses(column: Column): PropBind {
    return [
        {
            [useComputedClass("thStickyClass", "o-table__th--sticky")]:
                column.sticky,
        },
    ];
}

function rowClasses(row: unknown, index: number): PropBind {
    return [
        props.rowClass(row, index),
        {
            [useComputedClass("trSelectedClass", "o-table__tr--selected")]:
                isRowSelected(row, props.selected),
        },
        {
            [useComputedClass("trCheckedClass", "o-table__tr--checked")]:
                isRowChecked(row),
        },
    ];
}

function thSortIconClasses(): PropBind {
    return [useComputedClass("thSortIconClass", "o-table__th__sort-icon")];
}

function tdClasses(row: unknown, column: TableColumnComponent): PropBind {
    return [
        ...tdBaseClasses.value,
        {
            [useComputedClass(
                "tdPositionClass",
                "o-table__td--",
                column.position,
            )]: column.position,
        },
        {
            [useComputedClass("tdStickyClass", "o-table__td--sticky")]:
                column.sticky,
        },
    ];
}
</script>

<template>
    <div ref="rootRef" :class="rootClasses" data-oruga="table">
        <div ref="slotRef" style="display: none">
            <!--
                @slot Place o-table-column here
            -->
            <slot>
                <template v-if="columns?.length">
                    <o-table-column
                        v-for="(column, idx) in columns"
                        :key="idx"
                        v-slot="{ row }"
                        v-bind="column">
                        {{ column.field ? row[column.field] : row }}
                    </o-table-column>
                </template>
            </slot>
        </div>

        <o-table-mobile-sort
            v-if="isMobileActive && hasSortablenewColumns"
            :current-sort-column="currentSortColumn"
            :columns="tableColumns"
            :placeholder="mobileSortPlaceholder"
            :icon-pack="iconPack"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            :is-asc="isAsc"
            :mobile-sort-classes="mobileSortClasses"
            @sort="(column, event) => sort(column, null, event)" />

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
                :total="dataTotal"
                :change="(page) => (tableCurrentPage = page)">
                <o-table-pagination
                    v-bind="$attrs"
                    v-model:current="tableCurrentPage"
                    :paginated="paginated"
                    :per-page="perPage"
                    :total="dataTotal"
                    :rounded="paginationRounded"
                    :size="paginationSize"
                    :order="paginationOrder"
                    :simple="paginationSimple"
                    :icon-pack="iconPack"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    :root-class="paginationWrapperClasses"
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
                :tabindex="!focusable ? null : 0"
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
                        <th
                            v-if="showDetailRowIcon"
                            :class="thDetailedClasses" />
                        <th
                            v-if="checkable && checkboxPosition === 'left'"
                            :class="thCheckboxClasses">
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
                                    :variant="checkboxVariant"
                                    :disabled="isAllUncheckable"
                                    @update:modelValue="checkAll" />
                            </slot>
                        </th>
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="column.identifier + ':' + index + 'header'"
                            v-bind="column.thAttrsData"
                            :class="thClasses(column)"
                            :style="isMobileActive ? {} : column.style"
                            :draggable="canDragColumn"
                            @click.stop="sort(column, null, $event)"
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
                                        :class="thSortIconClasses()">
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
                        <th
                            v-if="checkable && checkboxPosition === 'right'"
                            :class="thCheckboxClasses">
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
                                        :variant="checkboxVariant"
                                        :disabled="isAllUncheckable"
                                        @update:modelValue="checkAll" />
                                </slot>
                            </template>
                        </th>
                    </tr>
                    <tr v-if="hasSearchablenewColumns">
                        <th
                            v-if="showDetailRowIcon"
                            :class="thDetailedClasses" />
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="
                                column.identifier + ':' + index + 'searchable'
                            "
                            v-bind="column.thAttrsData"
                            :class="thClasses(column)"
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
                                    v-else
                                    v-model="filters[column.field]"
                                    :type="column.numeric ? 'number' : 'text'"
                                    @[filtersEvent]="onFiltersEvent" />
                            </template>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                    <tr v-if="hasCustomSubheadings">
                        <th
                            v-if="showDetailRowIcon"
                            :class="thDetailedClasses" />
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="
                                column.identifier + ':' + index + 'subheading'
                            "
                            :style="isMobileActive ? {} : column.style"
                            :class="thSubheadingClasses">
                            <template v-if="column.$slots?.subheading">
                                <o-slot-component
                                    :component="column.$el"
                                    name="subheading"
                                    tag="span"
                                    :props="{ column, index }" />
                            </template>
                            <template v-else>{{ column.subheading }}</template>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                </thead>
                <tbody>
                    <template
                        v-for="(row, index) in visibleRows"
                        :key="getRowKey(row) + 'row'">
                        <tr
                            :class="rowClasses(row, index)"
                            :draggable="canDragRow"
                            @click="selectRow(row, index, $event)"
                            @dblclick="$emit('dblclick', row, index, $event)"
                            @mouseenter="
                                $emit('mouseenter', row, index, $event)
                            "
                            @mouseleave="
                                $emit('mouseleave', row, index, $event)
                            "
                            @contextmenu="
                                $emit('contextmenu', row, index, $event)
                            "
                            @dragstart="handleDragStart(row, index, $event)"
                            @dragend="handleDragEnd(row, index, $event)"
                            @drop="handleDrop(row, index, $event)"
                            @dragover="handleDragOver(row, index, $event)"
                            @dragleave="handleDragLeave(row, index, $event)">
                            <!-- detailed toggle column -->
                            <td
                                v-if="showDetailRowIcon"
                                :class="tdDetailedChevronClasses">
                                <o-icon
                                    v-if="hasDetailedVisible(row)"
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
                                :class="tdCheckboxClasses">
                                <o-checkbox
                                    :model-value="isRowChecked(row)"
                                    autocomplete="off"
                                    :variant="checkboxVariant"
                                    :disabled="!isRowCheckable(row)"
                                    @update:modelValue="checkRow(row, index)" />
                            </td>

                            <!-- row data columns -->
                            <o-slot-component
                                v-for="(column, colindex) in visibleColumns"
                                :key="
                                    column.identifier + index + ':' + colindex
                                "
                                v-bind="column.tdAttrsData[index]"
                                :component="column.$el"
                                name="default"
                                tag="td"
                                :class="tdClasses(row, column)"
                                :style="isMobileActive ? {} : column.style"
                                :data-label="column.label"
                                :props="{
                                    row,
                                    column,
                                    index,
                                    colindex,
                                    toggleDetails,
                                }"
                                @click="
                                    $emit(
                                        'cell-click',
                                        row,
                                        column,
                                        index,
                                        colindex,
                                        $event,
                                    )
                                " />

                            <!-- checkable column right -->
                            <td
                                v-if="checkable && checkboxPosition === 'right'"
                                :class="tdCheckboxClasses">
                                <o-checkbox
                                    :model-value="isRowChecked(row)"
                                    autocomplete="off"
                                    :variant="checkboxVariant"
                                    :disabled="!isRowCheckable(row)"
                                    @update:modelValue="checkRow(row, index)" />
                            </td>
                        </tr>

                        <transition :name="detailTransition">
                            <tr
                                v-if="isActiveDetailRow(row)"
                                :key="getRowKey(row) + 'detail'"
                                :class="detailedClasses">
                                <td :colspan="columnCount">
                                    <!--
                                        @slot Place row detail content here 
                                        @binding {unknown} row - row conent
                                        @binding {number} index - row index
                                    -->
                                    <slot
                                        name="detail"
                                        :row="row"
                                        :index="index" />
                                </td>
                            </tr>
                        </transition>
                        <!--
                            @slot Place row detail content here 
                            @binding {unknown} row - row conent
                            @binding {number} index - row index
                        -->
                        <slot
                            v-if="isActiveCustomDetailRow(row)"
                            name="detail"
                            :row="row"
                            :index="index" />
                    </template>

                    <tr v-if="!visibleRows.length">
                        <td :colspan="columnCount">
                            <!--
                                @slot Define content if table is empty
                            -->
                            <slot name="empty" />
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
                @binding {boolean} loading - is loading enabled
            -->
            <slot name="loading" :loading="loading">
                <o-loading :full-page="false" :active="loading" />
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
                :total="dataTotal"
                :change="(page) => (tableCurrentPage = page)">
                <o-table-pagination
                    v-bind="$attrs"
                    v-model:current="tableCurrentPage"
                    :paginated="paginated"
                    :per-page="perPage"
                    :total="dataTotal"
                    :rounded="paginationRounded"
                    :size="paginationSize"
                    :order="paginationOrder"
                    :simple="paginationSimple"
                    :icon-pack="iconPack"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                    :root-class="paginationWrapperClasses"
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
