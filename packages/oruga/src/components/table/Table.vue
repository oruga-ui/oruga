<script setup lang="ts" generic="T">
import {
    computed,
    ref,
    watch,
    onMounted,
    nextTick,
    useSlots,
    toValue,
    type PropType,
    type Ref,
} from "vue";

import OCheckbox from "@/components/checkbox/Checkbox.vue";
import OIcon from "@/components/icon/Icon.vue";
import OInput from "@/components/input/Input.vue";
import OLoading from "@/components/loading/Loading.vue";
import OSlotComponent from "@/components/utils/SlotComponent";

import OTableMobileSort from "./TableMobileSort.vue";
import OTableColumn from "./TableColumn.vue";
import OTablePagination from "./TablePagination.vue";

import { getOption } from "@/utils/config";
import {
    getValueByPath,
    indexOf,
    toCssDimension,
    escapeRegExpChars,
    removeDiacriticsFromString,
    sortBy,
    isEqual,
} from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useProviderParent,
    useMatchMedia,
    useDebounce,
    useObjectMap,
} from "@/composables";

import type {
    TableColumn,
    TableRow,
    TableColumnItem,
    TableColumnComponent,
} from "./types";
import type { ComponentClass, ClassBind, OrugaOptions } from "@/types";

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
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Table data */
    data: { type: Array as PropType<T[]>, default: () => [] },
    /** Table columns */
    columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
    /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
    rowKey: { type: String, default: () => getOption("table.rowKey") },
    /** Define individual class for a row */
    rowClass: {
        type: Function as PropType<(row: T, index: number) => string>,
        default: (row: T, index: number) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("table.rowClass", (row, index) => "")(row, index),
    },
    /** Set which row is selected, use `v-model:selected` to make it two-way binding */
    selected: { type: Object as PropType<TableRow<T>>, default: undefined },
    /** Border to all cells */
    bordered: {
        type: Boolean,
        default: () => getOption("table.bordered", false),
    },
    /** Whether table is striped */
    striped: {
        type: Boolean,
        default: () => getOption("table.striped", false),
    },
    /** Makes the cells narrower */
    narrowed: {
        type: Boolean,
        default: () => getOption("table.narrowed", false),
    },
    /** Rows are highlighted when hovering */
    hoverable: {
        type: Boolean,
        default: () => getOption("table.hoverable", false),
    },
    /** Enable loading state */
    loading: { type: Boolean, default: false },
    /** Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering */
    focusable: { type: Boolean, default: false },
    /** Show header */
    showHeader: {
        type: Boolean,
        default: () => getOption("table.showHeader", true),
    },
    /** Allows rows to be draggable */
    draggable: { type: Boolean, default: false },
    /** Allows columns to be draggable */
    draggableColumn: { type: Boolean, default: false },
    /** Add a horizontal scrollbar when table is too wide */
    scrollable: { type: Boolean, default: undefined },
    /** Show a sticky table header */
    stickyHeader: { type: Boolean, default: false },
    /** Table fixed height */
    height: { type: [Number, String], default: undefined },
    /** Filtering debounce time (in milliseconds) */
    debounceSearch: {
        type: Number,
        default: () => getOption("table.debounceSearch", undefined),
    },
    /** Rows can be checked (multiple) */
    checkable: { type: Boolean, default: false },
    /** Make the checkbox column sticky when checkable */
    stickyCheckbox: { type: Boolean, default: false },
    /** Show check/uncheck all checkbox in table header when checkable (if checkable) */
    headerCheckable: { type: Boolean, default: true },
    /** Set which rows are checked, use `v-model:checkedRows` to make it two-way binding (if checkable) */
    checkedRows: { type: Array as PropType<TableRow<T>[]>, default: () => [] },
    /**
     * Position of the checkbox when checkable (if checkable)
     * @values left, right
     */
    checkboxPosition: {
        type: String,
        default: () => getOption("table.checkboxPosition", "left"),
        validator: (value: string) => ["left", "right"].indexOf(value) >= 0,
    },
    /**
     * Color of the checkbox when checkable (if checkable)
     * @values primary, info, success, warning, danger, and any other custom color
     */
    checkboxVariant: {
        type: String,
        default: () => getOption("table.checkboxVariant"),
    },
    /** Custom method to verify if a row is checked (if checkable). Useful for backend pagination. */
    isRowChecked: {
        type: Function as PropType<(row: T, data: T[]) => boolean>,
        default: undefined,
    },
    /** Custom method to verify if a row is checkable (if checkable) */
    isRowCheckable: {
        type: Function as PropType<(row: T) => boolean>,
        default: (row: T) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("table.isRowCheckable", (row) => true)(row),
    },
    /** Custom method to verify if a row is selectable, works when is selected. */
    isRowSelectable: {
        type: Function as PropType<(row: T) => boolean>,
        default: () => true,
    },
    /** Columns won't be sorted with Javascript, use with `sort` event to sort in your backend */
    backendSorting: {
        type: Boolean,
        default: () => getOption("table.backendSorting", false),
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
    /** Allow row details  */
    detailed: { type: Boolean, default: false },
    /**
     * Set which rows have opened details, use `v-model:detailedRows` to make it two-way binding (if detailed).
     * Ideal to open details via vue-router. (A unique key is required; check `rowKey` prop)
     */
    detailedRows: { type: Array as PropType<TableRow<T>[]>, default: () => [] },
    /** Controls the visibility of the trigger that toggles the detailed rows (if detailed) */
    isDetailedVisible: {
        type: Function as PropType<(row: T) => boolean>,
        default: (row: T) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("table.isDetailedVisible", (row) => true)(row),
    },
    /** Allow detail icon and column to be visible (if detailed) */
    showDetailIcon: {
        type: Boolean,
        default: () => getOption("table.showDetailIcon", true),
    },
    /** Icon name of detail action (if detailed) */
    detailIcon: {
        type: String,
        default: () => getOption("table.detailIcon", "chevron-right"),
    },
    /** Enable custom style on details (if detailed) */
    customDetailRow: { type: Boolean, default: false },
    /* Transition name to use when toggling row details (if detailed) */
    detailTransition: {
        type: String,
        default: () => getOption("table.detailTransition", "slide"),
    },
    /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
    customRowKey: {
        type: String,
        default: () => getOption("table.customRowKey"),
    },
    /** Adds pagination to the table */
    paginated: {
        type: Boolean,
        default: () => getOption("table.paginated", false),
    },
    /** Rows won't be paginated with Javascript, use with `page-change` event to paginate in your backend */
    backendPagination: { type: Boolean, default: false },
    /** Total number of table data if backend-pagination is enabled */
    total: { type: Number, default: 0 },
    /** Current page of table data (if paginated), use `v-model:currentPage` to make it two-way binding */
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
    /**
     * Size of pagination (if paginated)
     * @values small, medium, large
     */
    paginationSize: {
        type: String,
        default: () => getOption("table.paginationSize", "small"),
    },
    /** Enable rounded pagination buttons (if paginated) */
    paginationRounded: {
        type: Boolean,
        default: () => getOption("table.paginationRounded", false),
    },
    /** Enable simple style pagination (if paginated) */
    paginationSimple: {
        type: Boolean,
        default: () => getOption("table.paginationSimple", false),
    },
    /**
     * Pagination buttons order (if paginated)
     * @values centered, right, left
     */
    paginationOrder: {
        type: String,
        default: () => getOption("table.paginationOrder"),
        validator: (value: string) =>
            ["centered", "right", "left"].indexOf(value) >= 0,
    },
    /** Columns won't be filtered with Javascript, use with `searchable` prop to the columns to filter in your backend */
    backendFiltering: {
        type: Boolean,
        default: () => getOption("table.backendFiltering", false),
    },
    /** Icon of the column search input */
    filtersIcon: {
        type: String,
        default: () => getOption("table.filterIcon"),
    },
    /** Placeholder of the column search input */
    filtersPlaceholder: {
        type: String,
        default: () => getOption("table.filterPlaceholder"),
    },
    /** Add a native event to filter */
    filtersEvent: { type: String, default: "" },
    /** Icon for the loading state */
    loadingIcon: {
        type: String,
        default: () => getOption("table.loadingIcon", "loading"),
    },
    /** Label for the loading state */
    loadingLabel: {
        type: String,
        default: () => getOption("table.loadingLabel"),
    },
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("table.mobileBreakpoint"),
    },
    /** Rows appears as cards on mobile (collapse rows) */
    mobileCards: {
        type: Boolean,
        default: () => getOption("table.mobileCards", true),
    },
    /** Select placeholder text when nothing is selected (if mobileCards)*/
    mobileSortPlaceholder: {
        type: String,
        default: () => getOption("table.mobileSortPlaceholder"),
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
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table */
    tableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table wrapper */
    wrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table footer */
    footerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table when it is empty */
    emptyClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table row detail */
    detailedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table when is bordered */
    borderedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table when rows are striped */
    stripedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table when rows are narrowed */
    narrowedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table when is hoverable */
    hoverableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table wrapper when header is sticky */
    stickyHeaderClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table wrapper when its content is scrollable */
    scrollableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table row when selected */
    trSelectedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table row when checkable and checked */
    trCheckedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` element */
    thClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` element when component is positioned */
    thPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` element when component is sticky" */
    thStickyClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` element when is checkable */
    thCheckboxClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` element currently sorted */
    thCurrentSortClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sortable Table `th` element */
    thSortableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` element that is unsortable */
    thUnselectableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table sort icon in the header */
    thSortIconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` element of the detail column of triggers */
    thDetailedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `th` subheading element */
    thSubheadingClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `td` element */
    tdClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `td` element when component is positioned */
    tdPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `td` element when component is sticky */
    tdStickyClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `td` element when is checkable */
    tdCheckboxClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table `td` element that contains the chevron to trigger details */
    tdDetailedChevronClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the sortable form wrapper on mobile */
    mobileSortClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table pagination wrapper */
    paginationWrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Table component when on mobile */
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /**
     * Class configuration for the internal loading component
     * @ignore
     */
    loadingClasses: {
        type: Object,
        default: () =>
            getOption<OrugaOptions["loading"]>("table.loadingClasses", {}),
    },
});

const emits = defineEmits<{
    /**
     * currentPage prop two-way binding
     * @param value {number} updated currentPage prop
     */
    (e: "update:currentPage", value: number): void;
    /**
     * is emitted each time the table data is processed into rows
     * @param value {TableRow[]} computed table rows
     */
    (e: "rows", value: Array<TableRow<T>>): void;
    /**
     * on pagination page change event
     * @param page {number} updated page
     */
    (e: "page-change", page: number): void;
    /**
     * select prop two-way binding
     * @param value {TableRow} updated select prop
     */
    (e: "update:selected", value: TableRow<T>): void;
    /**
     * on row select event
     * @param newRow {TableRow} new select value
     * @param oldRow {TableRow} old select value
     */
    (e: "select", newRow: TableRow<T>, oldRow: TableRow<T>): void;
    /**
     * on row checked event
     * @param value {TableRow[]} all checked rows
     * @param row {TableRow} row data
     */
    (e: "check", value: Array<TableRow<T>>, row: TableRow<T>): void;
    /**
     * on all rows checked event
     * @param value {TableRow[]} all checked rows
     */
    (e: "check-all", value: Array<TableRow<T>>): void;
    /**
     * checkedRows prop two-way binding
     * @param value {TableRow[]} updated checkedRows prop
     */
    (e: "update:checkedRows", value: Array<TableRow<T>>): void;
    /**
     * on column sort change event
     * @param column {TableColumn} column data
     * @param direction {string}  'asc' or 'desc'
     * @param event {Event} native  event
     */
    (
        e: "sort",
        column: TableColumn<T>,
        direction: "asc" | "desc",
        event: Event,
    ): void;
    /**
     * on filter change event
     * @param filters {Object} filter object
     */
    (e: "filters-change", value: Record<string, string>): void;
    /**
     * on native filter event based on props filtersEvent
     * @param filtersEvent {string} props filtersEvent value
     * @param filters {object} filter object
     * @param event {Event} native  event
     */
    (
        e: "filters-event",
        filtersEvent: string,
        filters: Record<string, string>,
        event: Event,
    ): void;
    /**
     * detailedRows prop two-way binding
     * @param value {TableRow[]} updated detailedRows prop
     */
    (e: "update:detailedRows", value: Array<TableRow<T>>): void;
    /**
     * on details open event
     * @param row {TableRow} row data
     */
    (e: "details-open", row: TableRow<T>): void;
    /**
     * on details close event
     * @param row {TableRow} row data
     */
    (e: "details-close", row: TableRow<T>): void;
    /**
     * on row click event
     * @param row {TableRow} row data
     * @param index {number} index of clicked row
     * @param event {Event} native click event
     */
    (e: "click", row: TableRow<T>, index: number, event: Event): void;
    /**
     * on row double click event
     * @param row {TableRow} row data
     * @param index {number} index of clicked row
     * @param event {Event} native click event
     */
    (e: "dblclick", row: TableRow<T>, index: number, event: Event): void;
    /**
     * on row right click event
     * @param row {TableRow} row data
     * @param index {number} index of clicked row
     * @param event {Event} native contextmenu event
     */
    (e: "contextmenu", row: TableRow<T>, index: number, event: Event): void;
    /**
     * on row mouseenter event
     * @param row {TableRow} row data
     * @param index {number} index of clicked row
     * @param event {Event} native mouseenter event
     */
    (e: "mouseenter", row: TableRow<T>, index: number, event: Event): void;
    /**
     * on row mouseleave event
     * @param row {TableRow} row data
     * @param index {number} index of clicked row
     * @param event {Event} native mouseleave event
     */
    (e: "mouseleave", row: TableRow<T>, index: number, event: Event): void;
    /**
     * on cell click event
     * @param row {TableRow} row data
     * @param column {TableColumn} column data
     * @param index {number} row index
     * @param colindex {number} column index
     * @param event {Event} native click event
     */
    (
        e: "cell-click",
        row: TableRow<T>,
        column: TableColumn<T>,
        index: number,
        colindex: number,
        event: Event,
    ): void;
    /**
     * on row dragstart event
     * @param row {TableRow} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragstart event
     */
    (e: "dragstart", row: TableRow<T>, index: number, event: DragEvent): void;
    /**
     * on row dragend event
     * @param row {TableRow} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragend event
     */
    (e: "dragend", row: TableRow<T>, index: number, event: DragEvent): void;
    /**
     * on row drop event
     * @param row {TableRow} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native drop event
     */
    (e: "drop", row: TableRow<T>, index: number, event: DragEvent): void;

    /**
     * on row dragleave event
     * @param row {TableRow} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragleave event
     */
    (e: "dragleave", row: TableRow<T>, index: number, event: DragEvent): void;
    /**
     * on row dragover event
     * @param row {TableRow} row data
     * @param index {number} index of draged row
     * @param event {DragEvent} native dragover event
     */
    (e: "dragover", row: TableRow<T>, index: number, event: DragEvent): void;
    /**
     * on column columndragstart event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragstart event
     */
    (
        e: "columndragstart",
        column: TableColumn<T>,
        index: number,
        event: DragEvent,
    ): void;
    /**
     * on column columndragend event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragend event
     */
    (
        e: "columndragend",
        column: TableColumn<T>,
        index: number,
        event: DragEvent,
    ): void;
    /**
     * on column columndrop event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndrop event
     */
    (
        e: "columndrop",
        column: TableColumn<T>,
        index: number,
        event: DragEvent,
    ): void;
    /**
     * on column columndragleave event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragleave event
     */
    (
        e: "columndragleave",
        column: TableColumn<T>,
        index: number,
        event: DragEvent,
    ): void;
    /**
     * on column columndragover event
     * @param column {TableColumn} column data
     * @param index {number} index of draged column
     * @param event {DragEvent} native columndragover event
     */
    (
        e: "columndragover",
        column: TableColumn<T>,
        index: number,
        event: DragEvent,
    ): void;
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const isMobileActive = computed(() => props.mobileCards && isMobile.value);

const slotRef = ref<HTMLElement>();

// provide functionalities and data to child item components
const provider = useProviderParent<TableColumnComponent<T>>(slotRef);

/** all defined columns */
const tableColumns = computed<TableColumnItem<T>[]>(() => {
    if (!provider.sortedItems.value) return [];
    return provider.sortedItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data),
        thAttrsData: {},
        tdAttrsData: [],
    }));
});

/** all defined data elements as an object map */
const tableData = computed<TableRow<T>[]>(() =>
    useObjectMap(props.data, props.rowKey),
);

// TODO: refactor to use only tableData with more attributes like hidden, detailed
const tableRows = ref(tableData.value) as Ref<TableRow<T>[]>;

emits("rows", tableData.value); // emit computed rows first time

/** recompute table rows when table data change */
watch(tableData, (data) => {
    emits("rows", data); // emit computed rows every time they the data get changed
    processTableData();
});

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
}

/** Shows total data. If backend paginated, use props total else use rows data length as pagination total */
const tableTotal = computed(() =>
    props.backendPagination ? props.total : tableRows.value.length,
);

const tableCurrentPage = defineModel<number>("currentPage", { default: 1 });

/** Visible rows based on current page */
const visibleRows = computed(() => {
    if (!props.paginated || props.backendPagination) return tableRows.value;

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
            col.thAttrsData =
                typeof col.thAttrs === "function" ? col.thAttrs(col) : {};
            col.tdAttrsData = visibleRows.value.map((data) =>
                typeof col.tdAttrs === "function"
                    ? col.tdAttrs(data.value, col)
                    : {},
            );
        }
    }
});

/** Total column count based if it's checkable or expanded */
const columnCount = computed(() => {
    let count = visibleColumns.value.length;
    count += props.checkable ? 1 : 0;
    count += props.detailed && props.showDetailIcon ? 1 : 0;
    return count;
});

/** Check if has any searchable column. */
const hasSearchableColumns = computed(() =>
    tableColumns.value.some((column) => column.searchable),
);

/** Check if table is scrollable */
const isScrollable = computed(() => {
    if (props.scrollable) return true;
    if (!tableColumns.value) return false;
    return tableColumns.value.some((column) => column.sticky);
});

const slots = useSlots();

/** Check if table hast subheadings  */
const hasCustomSubheadings = computed(() => {
    if (slots.subheading) return true;
    return tableColumns.value.some((column) => !!column.subheading);
});

/** Check if footer slot has custom content */
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

/** Get the formated row value for a column */
function getColumnValue(row: T, column: TableColumn): string {
    const prop = column.field ? getValueByPath(row, column.field) : row;
    return column.display ? column.display(prop, row) : String(prop);
}

// --- Select Feature ---

const tableSelectedRow = defineModel<TableRow<T>>("selected");

/** Table arrow keys listener, change selection */
function onArrowPressed(pos: number, event: KeyboardEvent): void {
    if (!visibleRows.value.length) return;

    let index =
        visibleRows.value.findIndex(
            (r) => r.key === tableSelectedRow.value?.key,
        ) + pos;

    // Prevent from going up from first and down from last
    index =
        index < 0
            ? 0
            : index > visibleRows.value.length - 1
              ? visibleRows.value.length - 1
              : index;

    const row = visibleRows.value[index];

    if (!props.isRowSelectable(row.value)) {
        let newIndex = null;
        if (pos > 0) {
            for (
                let i = index;
                i < visibleRows.value.length && newIndex === null;
                i++
            ) {
                if (props.isRowSelectable(visibleRows.value[i].value))
                    newIndex = i;
            }
        } else {
            for (let i = index; i >= 0 && newIndex === null; i--) {
                if (props.isRowSelectable(visibleRows.value[i].value))
                    newIndex = i;
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
function selectRow(row: TableRow<T>, index: number, event: Event): void {
    emits("click", row, index, event);

    if (isEqual(tableSelectedRow.value, row)) return;
    if (!props.isRowSelectable(row.value)) return;

    tableSelectedRow.value = row;
    // emit new and old row
    emits("select", row, tableSelectedRow.value);
}

function isRowSelected(row: TableRow<T>, selectedRow: TableRow<T>): boolean {
    return selectedRow ? row.key === selectedRow.key : false;
}

// --- Filter Feature ---

const filters = ref<Record<string, string>>({});

watch(
    filters.value,
    (value) => {
        if (!props.backendFiltering) return;
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

/** Check whether a row is filtered by filter or not */
function isRowFiltered(row: T): boolean {
    return Object.entries(filters.value).some(([key, filter]) => {
        if (!filter) return false;
        // get column for filter
        const column = tableColumns.value.find((c) => c.field === key);
        // if column has onSearch return result
        if (typeof column?.onSearch === "function")
            return column.onSearch(row, filter);

        const value = getValueByPath(row, key);
        if (value == null) return false;
        // if number compare values
        if (Number.isInteger(value)) return value === Number(filter);
        const re = new RegExp(escapeRegExpChars(filter), "i");
        if (Array.isArray(value))
            return value.some(
                (val) =>
                    re.test(removeDiacriticsFromString(val)) || re.test(val),
            );

        return re.test(removeDiacriticsFromString(value)) || re.test(value);
    });
}

function filterRows(rows: TableRow<T>[]): TableRow<T>[] {
    return rows.filter((row) => !isRowFiltered(row.value));
}

// --- Sort Feature ---

const currentSortColumn = ref<TableColumnItem<T>>();
const isAsc = ref(true);

onMounted(() => nextTick(() => checkSort()));

/** Check if has any sortable column. */
const hasSortableColumns = computed(() =>
    tableColumns.value.some((column) => column.sortable),
);

/** Check if the column is the current sort column. */
function isColumnSorted(column: TableColumnItem<T>): boolean {
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
            const column = tableColumns.value.find(
                (column) => currentSortColumn.value.field === column.field,
            );
            if (column) currentSortColumn.value = column;
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
    const sortColumn = tableColumns.value.find(
        (column) => column.field === sortField,
    );
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
    column: TableColumnItem<T>,
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

    currentSortColumn.value = column;
    // recompute rows with updated currentSortColumn
    processTableData();
}

function sortByColumn(rows: TableRow<T>[]): TableRow<T>[] {
    const column = currentSortColumn.value;
    if (!column) return rows;
    return sortBy<TableRow<T>>(
        rows,
        column?.field ? "value." + column.field : undefined,
        column?.onSort
            ? (a, b, asc): number => column.onSort(a.value, b.value, asc)
            : undefined,
        isAsc.value,
    );
}

// --- Checkable Feature ---

const tableCheckedRows = defineModel<TableRow<T>[]>("checkedRows", {
    default: [],
});
const lastCheckedRowIndex = ref(null);

/** Check if all rows in the page are checked. */
const isAllChecked = computed(() => {
    const validVisibleData = visibleRows.value.filter((row) =>
        props.isRowCheckable(row.value),
    );
    if (validVisibleData.length === 0) return false;
    return !validVisibleData.some(
        (currentVisibleRow) =>
            indexOf(
                tableCheckedRows.value.map((r) => r.value),
                currentVisibleRow.value,
                props.isRowChecked,
            ) < 0,
    );
});

/** Check if all rows in the page are checkable. */
const isAllUncheckable = computed(
    () => !visibleRows.value.some((row) => props.isRowCheckable(row.value)),
);

/** Check if the row is checked (is added to the array). */
function isChecked(row: TableRow<T>): boolean {
    return (
        indexOf(
            tableCheckedRows.value.map((r) => r.value),
            row.value,
            props.isRowChecked,
        ) >= 0
    );
}

/** Add a checked row to the the array. */
function addCheckedRow(row: TableRow<T>): void {
    tableCheckedRows.value = [...tableCheckedRows.value, row];
}

/** Remove a checked row from the array. */
function removeCheckedRow(row: TableRow<T>): void {
    const idx = indexOf(
        tableCheckedRows.value.map((r) => r.value),
        row.value,
        props.isRowChecked,
    );
    if (idx >= 0)
        tableCheckedRows.value = tableCheckedRows.value.toSpliced(idx, 1);
}

/**
 * Header checkbox click listener.
 * Add or remove all rows in current page.
 */
function checkAll(): void {
    const checkedRows = visibleRows.value.filter((row) =>
        props.isRowCheckable(row.value),
    );

    tableCheckedRows.value = isAllChecked.value ? [] : checkedRows;

    emits("check-all", tableCheckedRows.value);
}

/** Row checkbox click listener. */
function checkRow(row: TableRow<T>, index: number): void {
    if (!props.isRowCheckable(row.value)) return;
    lastCheckedRowIndex.value = index;

    if (!isChecked(row)) addCheckedRow(row);
    else removeCheckedRow(row);

    emits("check", tableCheckedRows.value, row);
}

// --- Detail Row Feature ---

const visibleDetailedRows = defineModel<TableRow<T>[]>("detailedRows", {
    default: [],
});

/**
 * return if detailed row tabled
 * will be with chevron column & icon or not
 */
const showDetailRowIcon = computed(
    () => props.detailed && props.showDetailIcon,
);

/** Toggle to show/hide details slot */
function toggleDetails(row: TableRow<T>): void {
    if (isVisibleDetailRow(row)) {
        closeDetailRow(row);
        emits("details-close", row);
    } else {
        openDetailRow(row);
        emits("details-open", row);
    }
}

function openDetailRow(row: TableRow<T>): void {
    visibleDetailedRows.value = [...visibleDetailedRows.value, row];
}

function closeDetailRow(row: TableRow<T>): void {
    const idx = visibleDetailedRows.value.findIndex((r) => r.key === row.key);
    if (idx >= 0)
        visibleDetailedRows.value = visibleDetailedRows.value.toSpliced(idx, 1);
}

function isVisibleDetailRow(row: TableRow<T>): boolean {
    return visibleDetailedRows.value.some((r) => r.key === row.key);
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

/** Emits drag start event*/
function handleDragStart(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragstart", row, index, event);
}

/** Emits drag leave event */
function handleDragEnd(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragend", row, index, event);
}

/** Emits drop event */
function handleDrop(row: TableRow<T>, index: number, event: DragEvent): void {
    if (!props.draggable) return;
    emits("drop", row, index, event);
}

/** Emits drag over event */
function handleDragOver(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragover", row, index, event);
}

/** Emits drag leave event */
function handleDragLeave(
    row: TableRow<T>,
    index: number,
    event: DragEvent,
): void {
    if (!props.draggable) return;
    emits("dragleave", row, index, event);
}

/** Emits drag start event (column) */
function handleColumnDragStart(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = true;
    emits("columndragstart", column, index, event);
}

/** Emits drag leave event (column) */
function handleColumnDragEnd(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    isDraggingColumn.value = false;
    emits("columndragend", column, index, event);
}

/** Emits drop event (column) */
function handleColumnDrop(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndrop", column, index, event);
}

/** Emits drag over event (column) */
function handleColumnDragOver(
    column: TableColumn<T>,
    index: number,
    event: DragEvent,
): void {
    if (!canDragColumn.value) return;
    emits("columndragover", column, index, event);
}

/** Emits drag leave event (column) */
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
    ["mobileClass", "o-table__wrapper--mobile", null, isMobileActive],
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
                (props.hoverable || props.focusable) &&
                !!visibleRows.value.length,
        ),
    ],
    [
        "emptyClass",
        "o-table--table__empty",
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

const tdBaseClasses = defineClasses(["tdClass", "o-table__td"]);

const thCheckboxClasses = defineClasses([
    "thCheckboxClass",
    "o-table__th-checkbox",
]);

const thDetailedClasses = defineClasses([
    "thDetailedClass",
    "o-table__th--detailed",
]);

const thSubheadingClasses = defineClasses(["thSubheadingClass", "o-table__th"]);

const tdCheckboxClasses = defineClasses(
    ["tdCheckboxClass", "o-table__td-checkbox"],
    [
        "thStickyClass",
        "o-table__th--sticky",
        null,
        computed(() => props.stickyCheckbox),
    ],
);

const detailedClasses = defineClasses(["detailedClass", "o-table__detail"]);

const tdDetailedChevronClasses = defineClasses([
    "tdDetailedChevronClass",
    "o-table__td-chevron",
]);

const mobileSortClasses = defineClasses([
    "mobileSortClass",
    "o-table__mobile-sort",
]);

const paginationWrapperClasses = defineClasses([
    "paginationWrapperClass",
    "o-table__pagination",
]);

const paginationWrapperRootClasses = computed(() =>
    getActiveClasses(paginationWrapperClasses.value),
);

const thSortIconClasses = defineClasses([
    "thSortIconClass",
    "o-table__th__sort-icon",
]);

function thClasses(column: TableColumnItem<T>): ClassBind[] {
    const classes = defineClasses(
        [
            "thCurrentSortClass",
            "o-table__th-current-sort",
            null,
            isColumnSorted(column),
        ],
        ["thSortableClass", "o-table__th--sortable", null, column.sortable],
        [
            "thUnselectableClass",
            "o-table__th--unselectable",
            null,
            column.isHeaderUnselectable,
        ],
        [
            "thPositionClass",
            "o-table__th--",
            column.position,
            !!column.position,
        ],
        ["thStickyClass", "o-table__th--sticky", null, column.sticky],
    );

    return [...thBaseClasses.value, ...classes.value];
}

function rowClasses(row: TableRow<T>, index: number): ClassBind[] {
    const classes = defineClasses(
        [
            "trSelectedClass",
            "o-table__tr--selected",
            null,
            isRowSelected(row, tableSelectedRow.value),
        ],
        ["trCheckedClass", "o-table__tr--checked", null, isChecked(row)],
    );

    const rowClass =
        typeof props.rowClass === "function"
            ? props.rowClass(row.value, index) || ""
            : "";

    return [...classes.value, { [rowClass]: true }];
}

function tdClasses(row: TableRow<T>, column: TableColumnItem<T>): ClassBind[] {
    const classes = defineClasses(
        [
            "tdPositionClass",
            "o-table__td--",
            column.position,
            !!column.position,
        ],

        ["tdStickyClass", "o-table__td--sticky", null, column.sticky],
    );

    return [...tdBaseClasses.value, ...classes.value];
}

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ rows: tableData });
</script>

<template>
    <div :class="rootClasses" data-oruga="table">
        <div ref="slotRef" style="display: none">
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
                        {{ getColumnValue(row, column) }}
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
                            :key="
                                column.identifier + ':' + index + 'subheading'
                            "
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
                        :key="row.key + ':' + index + '_row'">
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
                                    @update:model-value="
                                        checkRow(row, index)
                                    " />
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
                                    row: row.value,
                                    column,
                                    index,
                                    colindex,
                                    toggleDetails: () => toggleDetails(row),
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
                                :class="[
                                    ...thBaseClasses,
                                    ...tdCheckboxClasses,
                                ]">
                                <o-checkbox
                                    :model-value="isChecked(row)"
                                    autocomplete="off"
                                    :variant="checkboxVariant"
                                    :disabled="!isRowCheckable(row.value)"
                                    @update:model-value="
                                        checkRow(row, index)
                                    " />
                            </td>
                        </tr>

                        <transition :name="detailTransition">
                            <template v-if="isActiveDetailRow(row)">
                                <!--
                                    @slot Place row detail content here
                                    @binding {T} row - row conent
                                    @binding {number} index - row index
                                -->
                                <slot
                                    v-if="customDetailRow"
                                    name="detail"
                                    :row="row.value"
                                    :index="index" />
                                <tr
                                    v-else
                                    :key="row.key + '_detail'"
                                    :class="detailedClasses">
                                    <td :colspan="columnCount">
                                        <!--
                                            @slot Place row detail content here
                                            @binding {T} row - row conent
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
                @binding {boolean} loading - is loading state enabled
            -->
            <slot name="loading" :loading="loading">
                <o-loading
                    v-bind="loadingClasses"
                    :full-page="false"
                    :active="loading"
                    :icon="loadingIcon"
                    :label="loadingLabel"
                    icon-size="large"
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
