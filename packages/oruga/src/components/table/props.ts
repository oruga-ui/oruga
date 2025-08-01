import type { ComponentClass, DeepKeys, DeepType } from "@/types";
import type { TableColumn } from "./types";

export type TableProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Table data */
    data?: T[];
    /** Table columns */
    columns?: TableColumn<T>[];
    /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
    rowKey?: DeepKeys<T>;
    /** Define individual class for a row */
    rowClass?: (row: T, index: number) => string;
    /** Adds native attributes to a column th element */
    thAttrs?: (column: TableColumn<T>) => object;
    /** Adds native attributes to column td element of a row */
    tdAttrs?: (row: T, column: TableColumn<T>) => object;
    /**
     * Define a custom comparison function to check whether two row elements are equal.
     * By default a `rowKey` comparison is performed if given. Otherwise a simple object comparison is done.
     */
    customCompare?: (a: T, b: T) => boolean;
    /** Border to all cells */
    bordered?: boolean;
    /** Whether table is striped */
    striped?: boolean;
    /** Makes the cells narrower */
    narrowed?: boolean;
    /** Rows are highlighted when hovering */
    hoverable?: boolean;
    /** Set which row is selected, use `v-model:selected` to make it two-way binding (if selectable) */
    selected?: T;
    /** Table can be focused and user can select rows. Rows can be navigate with keyboard arrows and are highlighted when hovering. */
    selectable?: boolean;
    /** Custom method to verify if a row is selectable, works when is selectable */
    isRowSelectable?: (row: T) => boolean;
    /** Show header */
    showHeader?: boolean;
    /** Allows rows to be draggable */
    draggable?: boolean;
    /** Allows columns to be draggable */
    draggableColumn?: boolean;
    /** Add a horizontal scrollbar when table is too wide */
    scrollable?: boolean;
    /** Show a sticky table header */
    stickyHeader?: boolean;
    /** Table fixed height */
    height?: number | string;
    /** Allow each row to be checked by a checkbox */
    checkable?: boolean;
    /** Set which rows are checked, use `v-model:checkedRows` to make it two-way binding (if checkable) */
    checkedRows?: T[];
    /** Show check/uncheck all checkbox in table header (if checkable) */
    checkableHeader?: boolean;
    /**
     * Make the checkbox column sticky (if checkable)
     * @deprecated will be renamed to `checkboxSticky`
     */
    stickyCheckbox?: boolean;
    /**
     * Position of the checkbox (if checkable)
     * @values left, right
     */
    checkboxPosition?: "left" | "right";
    /**
     * Color of the checkbox (if checkable)
     * @values primary, info, success, warning, danger, and any other custom color
     */
    checkboxVariant?: string;
    /** Custom method to verify if a row is checked (if checkable) */
    isRowChecked?: (row: T) => boolean;
    /** Custom method to verify if a row is checkable (if checkable) */
    isRowCheckable?: (row: T) => boolean;
    /** Columns won't be sorted on clientside, use with `sort` event to sort in your backend */
    backendSorting?: boolean;
    /**
     * Sets the default sort column and order — e.g. 'first_name' or ['first_name', 'desc']
     * @type string | [string, 'asc' | 'desc']
     */
    defaultSort?: string | [string, "asc" | "desc"];
    /**
     * Sets the default sort column direction on the first click
     * @type 'asc'|'desc'
     * @values asc, desc
     */
    defaultSortDirection?: "asc" | "desc";
    /** Sets the header sorting icon */
    sortIcon?: string;
    /**
     * Sets the size of the sorting icon
     * @values small, medium, large
     */
    sortIconSize?: string;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Allow row details  */
    detailed?: boolean;
    /**
     * Set which rows have opened details, use `v-model:detailedRows` to make it two-way binding (if detailed).
     * Ideal to open details via vue-router. (A unique key is required; check `rowKey` prop)
     */
    detailedRows?: T[];
    /** Controls the visibility of the trigger that toggles the detailed rows (if detailed) */
    isDetailedVisible?: (row: T) => boolean;
    /** Allow detail icon and column to be visible (if detailed) */
    showDetailIcon?: boolean;
    /** Icon name of detail action (if detailed) */
    detailIcon?: string;
    /** Enable custom style on details (if detailed) */
    customDetailRow?: boolean;
    /* Transition name to use when toggling row details (if detailed) */
    detailTransition?: string;
    /** Adds pagination to the table */
    paginated?: boolean;
    /** Rows won't be paginated on clientside, use with `page-change` event to paginate in your backend */
    backendPagination?: boolean;
    /** Total number of table data if backend-pagination is enabled */
    total?: number;
    /** Current page of table data (if paginated), use `v-model:currentPage` to make it two-way binding */
    currentPage?: number;
    /** How many rows per page (if paginated) */
    perPage?: number | string;
    /**
     * Pagination position (if paginated)
     * @values bottom, top, both
     */
    paginationPosition?: "bottom" | "top" | "both";
    /**
     * Size of pagination (if paginated)
     * @values small, medium, large
     */
    paginationSize?: string;
    /** Enable rounded pagination buttons (if paginated) */
    paginationRounded?: boolean;
    /** Enable simple style pagination (if paginated) */
    paginationSimple?: boolean;
    /** Number of pagination items to show before current page */
    paginationRangeBefore?: number;
    /** Number of pagination items to show after current page */
    paginationRangeAfter?: number;
    /**
     * Pagination buttons order (if paginated)
     * @values centered, right, left
     */
    paginationOrder?: "centered" | "right" | "left";
    /** Columns won't be filtered on clientside, use with `searchable` prop to the columns to filter in your backend */
    backendFiltering?: boolean;
    /** Icon of the column search input */
    filtersIcon?: string;
    /** Placeholder of the column search input */
    filtersPlaceholder?: string;
    /** Add a native event to filter */
    filtersEvent?: string;
    /** Filtering debounce time (in milliseconds) */
    filterDebounce?: number;
    /** Label to be shown when the table is empty */
    emptyLabel?: string;
    /** Icon to be shown when the table is empty */
    emptyIcon?: string;
    /**
     * Size of empty icon
     * @values small, medium, large
     */
    emptyIconSize?: string;
    /** Enable loading state */
    loading?: boolean;
    /** Icon for the loading state */
    loadingIcon?: string;
    /** Label for the loading state */
    loadingLabel?: string;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /** Rows appears as cards on mobile (collapse rows) */
    mobileCards?: boolean;
    /** Select placeholder text when nothing is selected (if mobileCards)*/
    mobileSortPlaceholder?: string;
    /** Accessibility label for the pagination next page button. */
    ariaNextLabel?: string;
    /** Accessibility label for the pagination previous page button. */
    ariaPreviousLabel?: string;
    /** Accessibility label for the pagination page button. */
    ariaPageLabel?: string;
    /** Accessibility label for the pagination current page button. */
    ariaCurrentLabel?: string;
} & TableClasses;

// class props (will not be displayed in the docs)
export type TableClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the sortable form wrapper on mobile */
    mobileSortClass: ComponentClass;
    /** Class of the table wrapper element */
    wrapperClass: ComponentClass;
    /** Class of the table wrapper element when header is sticky */
    stickyHeaderClass: ComponentClass;
    /** Class of the table wrapper element when its content is scrollable */
    scrollableClass: ComponentClass;
    /** Class of the Table */
    tableClass: ComponentClass;
    /** Class of the table elemnet when bordered */
    borderedClass: ComponentClass;
    /** Class of the table element when striped */
    stripedClass: ComponentClass;
    /** Class of the table element when narrowed */
    narrowedClass: ComponentClass;
    /** Class of the table element when hoverable */
    hoverableClass: ComponentClass;
    /** Class of the table element when it is empty */
    emptyClass: ComponentClass;
    /** Class of the table `th` element */
    thClass: ComponentClass;
    /** Class of the table `th` element with position */
    thPositionClass: ComponentClass;
    /** Class of the table `th` element when checkable */
    thCheckboxClass: ComponentClass;
    /** Class of the table `th` element when checkbox is sticky */
    thStickyClass: ComponentClass;
    /** Class of the table `th` element of the detail column of triggers */
    thDetailedClass: ComponentClass;
    /** Class of the table `th` element when sortable */
    thSortableClass: ComponentClass;
    /** Class of the table `th` element that is currently sorted */
    thCurrentSortClass: ComponentClass;
    /** Class of the table `th` element that is unsortable */
    thUnselectableClass: ComponentClass;
    /** Class of the table `th` subheading element */
    thSubheadingClass: ComponentClass;
    /** Class of the table header label element */
    thLabelClass: ComponentClass;
    /** Class of the table header sort icon element */
    thSortIconClass: ComponentClass;
    /** Class of the table `tr` element when selected */
    trSelectedClass: ComponentClass;
    /** Class of the table `tr` element when checkable and checked */
    trCheckedClass: ComponentClass;
    /** Class of the table `tr` element when detailed  */
    trDetailedClass: ComponentClass;
    /** Class of the table `tr` element when table is empty */
    trEmptyClass: ComponentClass;
    /** Class of the table `td` element */
    tdClass: ComponentClass;
    /** Class of the table `td` element with position */
    tdPositionClass: ComponentClass;
    /** Class of the table `td` element when column is sticky */
    tdStickyClass: ComponentClass;
    /** Class of the table `td` element when row is checkable */
    tdCheckboxClass: ComponentClass;
    /** Class of the table `td` element that contains the chevron to trigger details */
    tdDetailedChevronClass: ComponentClass;
    /** Class of the Table pagination wrapper element */
    paginationWrapperClass: ComponentClass;
    /** Class of the table footer element */
    footerClass: ComponentClass;
    /**
     * Class configuration for the internal loading component
     * @ignore
     */
    loadingClasses: object;
}>;

export type TableColumnProps<
    T,
    K extends string = T extends never | unknown ? string : DeepKeys<T>,
> = {
    /** Define the column label */
    label?: string;
    /** Define an object property key if data is an object */
    field?: K;
    /** Provide a formatter function to edit the output */
    formatter?: (value: DeepType<T, K>, row: T) => string;
    /** Define a column sub heading  */
    subheading?: string;
    /** Column fixed width */
    width?: number | string;
    /** Define column value as number */
    numeric?: boolean;
    /**
     * Position of the column content
     * @values left, centered, right
     */
    position?: "left" | "centered" | "right";
    /** Enable an additional searchbar below the column header */
    searchable?: boolean;
    /** Enable column sortability */
    sortable?: boolean;
    /** Define whether the column is visible or not */
    hidden?: boolean;
    /** Whether the column is sticky or not */
    sticky?: boolean;
    /** Make header selectable */
    headerSelectable?: boolean;
    /** Define a custom sort function */
    customSort?: (a: T, b: T, isAsc: boolean) => number;
    /** Define a custom filter funtion for the search */
    customSearch?: (row: T, filter: string) => boolean;
    /** Adds native attributes to th */
    thAttrs?: object;
    /** Adds native attributes to td */
    tdAttrs?: object;
};
