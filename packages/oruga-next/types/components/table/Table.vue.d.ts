declare const _default: import("vue").DefineComponent<{
    /** Table data */
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    /** Table columns */
    columns: {
        type: ArrayConstructor;
        default: () => any[];
    };
    /** Border to all cells */
    bordered: BooleanConstructor;
    /** Whether table is striped */
    striped: BooleanConstructor;
    /** Makes the cells narrower */
    narrowed: BooleanConstructor;
    /** Rows are highlighted when hovering */
    hoverable: BooleanConstructor;
    /** Loading state */
    loading: BooleanConstructor;
    /** Allow row details  */
    detailed: BooleanConstructor;
    /** Rows can be checked (multiple), checked rows will have a .is-checked class if you want to style */
    checkable: BooleanConstructor;
    /** Show check/uncheck all checkbox in table header when checkable */
    headerCheckable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Position of the checkbox (if checkable is true)
     * @values left, right
     */
    checkboxPosition: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /** Set which row is selected, use the .sync modifier (Vue 2.x) or v-model:selected (Vue 3.x) to make it two-way binding */
    selected: ObjectConstructor;
    /** Custom method to verify if a row is selectable, works when is selected. */
    isRowSelectable: {
        type: FunctionConstructor;
        default: () => true;
    };
    /** Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering */
    focusable: BooleanConstructor;
    /** Custom method to verify if row is checked, works when is checkable. Useful for backend pagination */
    customIsChecked: FunctionConstructor;
    /** Custom method to verify if a row is checkable, works when is checkable */
    isRowCheckable: {
        type: FunctionConstructor;
        default: () => true;
    };
    /** Set which rows are checked, use the .sync modifier (Vue 2.x) or v-model:checkedRows (Vue 3.x) to make it two-way binding */
    checkedRows: {
        type: ArrayConstructor;
        default: () => any[];
    };
    /** Rows appears as cards on mobile (collapse rows) */
    mobileCards: {
        type: BooleanConstructor;
        default: () => any;
    };
    /** Sets the default sort column and order — e.g. ['first_name', 'desc']	 */
    defaultSort: (ArrayConstructor | StringConstructor)[];
    /**
     * Sets the default sort column direction on the first click
     * @values asc, desc
     */
    defaultSortDirection: {
        type: StringConstructor;
        default: string;
    };
    /** Sets the header sorting icon */
    sortIcon: {
        type: StringConstructor;
        default: () => any;
    };
    /**
     * Sets the size of the sorting icon
     * @values small, medium, large
     */
    sortIconSize: {
        type: StringConstructor;
        default: () => any;
    };
    /** Adds pagination to the table */
    paginated: BooleanConstructor;
    /** Current page of table data (if paginated), use the .sync modifier (Vue 2.x) or v-model:currentPage (Vue 3.x) to make it two-way binding */
    currentPage: {
        type: NumberConstructor;
        default: number;
    };
    /** How many rows per page (if paginated) */
    perPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => any;
    };
    /** Allow chevron icon and column to be visible */
    showDetailIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Icon name of detail action */
    detailIcon: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Pagination position (if paginated)
     * @values bottom, top, bot
     */
    paginationPosition: {
        type: StringConstructor;
        default: () => any;
        validator: (value: string) => boolean;
    };
    /** Columns won't be sorted with Javascript, use with sort event to sort in your backend */
    backendSorting: BooleanConstructor;
    /** Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend */
    backendFiltering: BooleanConstructor;
    /** Add a class to row based on the return */
    rowClass: {
        type: FunctionConstructor;
        default: () => "";
    };
    /** Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) */
    openedDetailed: {
        type: ArrayConstructor;
        default: () => any[];
    };
    /** Controls the visibility of the trigger that toggles the detailed rows. */
    hasDetailedVisible: {
        type: FunctionConstructor;
        default: () => true;
    };
    /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
    detailKey: {
        type: StringConstructor;
        default: string;
    };
    /** Custom style on details */
    customDetailRow: {
        type: BooleanConstructor;
        default: boolean;
    };
    detailTransition: {
        type: StringConstructor;
        default: string;
    };
    /** Rows won't be paginated with Javascript, use with page-change event to paginate in your backend */
    backendPagination: BooleanConstructor;
    /** Total number of table data if backend-pagination is enabled */
    total: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /** Icon pack to use */
    iconPack: StringConstructor;
    /** Text when nothing is selected */
    mobileSortPlaceholder: StringConstructor;
    /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
    customRowKey: StringConstructor;
    /** Allows rows to be draggable */
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Add a horizontal scrollbar when table is too wide */
    scrollable: BooleanConstructor;
    ariaNextLabel: StringConstructor;
    ariaPreviousLabel: StringConstructor;
    ariaPageLabel: StringConstructor;
    ariaCurrentLabel: StringConstructor;
    /** Show a sticky table header */
    stickyHeader: BooleanConstructor;
    /** Table fixed height */
    height: (StringConstructor | NumberConstructor)[];
    /** Add a native event to filter */
    filtersEvent: {
        type: StringConstructor;
        default: string;
    };
    /** Filtering debounce time (in milliseconds) */
    debounceSearch: NumberConstructor;
    /** Show header */
    showHeader: {
        type: BooleanConstructor;
        default: () => any;
    };
    /** Make the checkbox column sticky when checkable */
    stickyCheckbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Rounded pagination if paginated */
    paginationRounded: BooleanConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    wrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    footerClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    emptyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    detailedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    borderedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stripedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    narrowedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    hoverableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tdClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thPositionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thStickyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thCheckboxClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thCurrentSortClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thSortableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thUnselectableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thSortIconClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thDetailedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tdPositionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tdStickyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tdCheckboxClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tdDetailedChevronClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    trSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stickyHeaderClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    scrollableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileSortClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    paginationWrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    thSubheadingClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    visibleDetailRows: unknown[];
    newData: unknown[];
    newDataTotal: string | number;
    newCheckedRows: unknown[];
    lastCheckedRowIndex: any;
    newCurrentPage: number;
    currentSortColumn: {};
    isAsc: boolean;
    filters: {};
    defaultSlots: any[];
    firstTimeSort: boolean;
    sequence: number;
}, {
    rootClasses(): any[];
    tableClasses(): any[];
    tableWrapperClasses(): any[];
    footerClasses(): any[];
    thBaseClasses(): any[];
    tdBaseClasses(): any[];
    thCheckboxClasses(): any[];
    thDetailedClasses(): any[];
    thSubheadingClasses(): any[];
    tdCheckboxClasses(): any[];
    detailedClasses(): any[];
    tdDetailedChevronClasses(): any[];
    mobileSortClasses(): any[];
    paginationWrapperClasses(): any[];
    tableWrapperStyle(): {
        height: string | number;
    };
    /**
    * Splitted data based on the pagination.
    */
    visibleData(): any;
    visibleColumns(): any;
    /**
    * Check if all rows in the page are checked.
    */
    isAllChecked(): boolean;
    /**
    * Check if all rows in the page are checkable.
    */
    isAllUncheckable(): boolean;
    /**
    * Check if has any sortable column.
    */
    hasSortablenewColumns(): any;
    /**
    * Check if has any searchable column.
    */
    hasSearchablenewColumns(): any;
    /**
    * Return total column count based if it's checkable or expanded
    */
    columnCount(): any;
    /**
    * return if detailed row tabled
    * will be with chevron column & icon or not
    */
    showDetailRowIcon(): any;
    /**
    * return if scrollable table
    */
    isScrollable(): any;
    newColumns(): any;
    isMobile(): any;
    hasCustomSubheadings(): any;
}, {
    thClasses(column: any): any[];
    thStickyClasses(column: any): {
        [x: number]: any;
    }[];
    rowClasses(row: any, index: any): any[];
    thSortIconClasses(): any[];
    tdClasses(row: any, column: any): any[];
    onFiltersEvent(event: any): void;
    handleFiltersChange(value: any): void;
    /**
    * Sort an array by key without mutating original data.
    * Call the user sort function if it was passed.
    */
    sortBy(array: any, key: any, fn: any, isAsc: any): any[];
    /**
    * Sort the column.
    * Toggle current direction on column if it's sortable
    * and not just updating the prop.
    */
    sort(column: any, updatingData?: boolean, event?: any): void;
    doSortSingleColumn(column: any): void;
    isRowSelected(row: any, selected: any): boolean;
    /**
    * Check if the row is checked (is added to the array).
    */
    isRowChecked(row: any): boolean;
    /**
    * Remove a checked row from the array.
    */
    removeCheckedRow(row: any): void;
    /**
    * Header checkbox click listener.
    * Add or remove all rows in current page.
    */
    checkAll(): void;
    /**
    * Row checkbox click listener.
    */
    checkRow(row: any, index: any, event: any): void;
    /**
     * Check row when shift is pressed.
     */
    shiftCheckRow(row: any, index: any, lastCheckedRowIndex: any): void;
    /**
    * Row click listener.
    * Emit all necessary events.
    */
    selectRow(row: any, index: any): void;
    /**
    * Toggle to show/hide details slot
    */
    toggleDetails(obj: any): void;
    openDetailRow(obj: any): void;
    closeDetailRow(obj: any): void;
    isVisibleDetailRow(obj: any): boolean;
    isActiveDetailRow(row: any): any;
    isActiveCustomDetailRow(row: any): any;
    isRowFiltered(row: any): boolean;
    /**
    * When the detailKey is defined we use the object[detailKey] as index.
    * If not, use the object reference by default.
    */
    handleDetailKey(index: any): any;
    /**
    * Call initSort only first time (For example async data).
    */
    checkSort(): void;
    /**
    * Check if footer slot has custom content.
    */
    hasCustomFooterSlot(): boolean;
    /**
    * Table arrow keys listener, change selection.
    */
    pressedArrow(pos: any): void;
    /**
    * Focus table element if has selected prop.
    */
    focus(): void;
    /**
    * Initial sorted column based on the default-sort prop.
    */
    initSort(): void;
    /**
    * Emits drag start event
    */
    handleDragStart(event: any, row: any, index: any): void;
    /**
    * Emits drag leave event
    */
    handleDragEnd(event: any, row: any, index: any): void;
    /**
    * Emits drop event
    */
    handleDrop(event: any, row: any, index: any): void;
    /**
    * Emits drag over event
    */
    handleDragOver(event: any, row: any, index: any): void;
    /**
    * Emits drag leave event
    */
    handleDragLeave(event: any, row: any, index: any): void;
    emitEventForRow(eventName: any, event: any, row: any): any;
    _addColumn(column: any): void;
    _removeColumn(column: any): void;
    _nextSequence(): number;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | import("vue").DefineComponent<{
    mobileBreakpoint: StringConstructor;
}, unknown, {
    $matchMediaRef: any;
    isMatchMedia: any;
}, {}, {
    onMatchMedia(event: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    mobileBreakpoint?: string;
}>, {}>, import("vue").ComponentOptionsMixin, ("select" | "check" | "click" | "contextmenu" | "dblclick" | "dragend" | "dragleave" | "dragover" | "dragstart" | "drop" | "mouseenter" | "mouseleave" | "sort" | "page-change" | "check-all" | "update:checkedRows" | "update:selected" | "filters-change" | "details-close" | "update:openedDetailed" | "sorting-priority-removed" | "cell-click")[], "select" | "check" | "click" | "contextmenu" | "dblclick" | "dragend" | "dragleave" | "dragover" | "dragstart" | "drop" | "mouseenter" | "mouseleave" | "sort" | "page-change" | "check-all" | "update:checkedRows" | "update:selected" | "filters-change" | "details-close" | "update:openedDetailed" | "sorting-priority-removed" | "cell-click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    data: unknown[];
    total: string | number;
    perPage: string | number;
    columns: unknown[];
    sortIcon: string;
    sortIconSize: string;
    headerCheckable: boolean;
    checkboxPosition: string;
    isRowSelectable: Function;
    isRowCheckable: Function;
    checkedRows: unknown[];
    mobileCards: boolean;
    defaultSortDirection: string;
    currentPage: number;
    showDetailIcon: boolean;
    detailIcon: string;
    paginationPosition: string;
    rowClass: Function;
    openedDetailed: unknown[];
    hasDetailedVisible: Function;
    detailKey: string;
    customDetailRow: boolean;
    detailTransition: string;
    draggable: boolean;
    filtersEvent: string;
    showHeader: boolean;
    stickyCheckbox: boolean;
} & {
    rootClass?: string | Function | unknown[];
    iconPack?: string;
    mobileClass?: string | Function | unknown[];
    tableClass?: string | Function | unknown[];
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    footerClass?: string | Function | unknown[];
    loading?: boolean;
    wrapperClass?: string | Function | unknown[];
    ariaPageLabel?: string;
    ariaCurrentLabel?: string;
    height?: string | number;
    bordered?: boolean;
    striped?: boolean;
    narrowed?: boolean;
    hoverable?: boolean;
    detailed?: boolean;
    checkable?: boolean;
    selected?: Record<string, any>;
    focusable?: boolean;
    customIsChecked?: Function;
    defaultSort?: string | unknown[];
    paginated?: boolean;
    backendSorting?: boolean;
    backendFiltering?: boolean;
    backendPagination?: boolean;
    mobileSortPlaceholder?: string;
    customRowKey?: string;
    scrollable?: boolean;
    stickyHeader?: boolean;
    debounceSearch?: number;
    paginationRounded?: boolean;
    emptyClass?: string | Function | unknown[];
    detailedClass?: string | Function | unknown[];
    borderedClass?: string | Function | unknown[];
    stripedClass?: string | Function | unknown[];
    narrowedClass?: string | Function | unknown[];
    hoverableClass?: string | Function | unknown[];
    thClass?: string | Function | unknown[];
    tdClass?: string | Function | unknown[];
    thPositionClass?: string | Function | unknown[];
    thStickyClass?: string | Function | unknown[];
    thCheckboxClass?: string | Function | unknown[];
    thCurrentSortClass?: string | Function | unknown[];
    thSortableClass?: string | Function | unknown[];
    thUnselectableClass?: string | Function | unknown[];
    thSortIconClass?: string | Function | unknown[];
    thDetailedClass?: string | Function | unknown[];
    tdPositionClass?: string | Function | unknown[];
    tdStickyClass?: string | Function | unknown[];
    tdCheckboxClass?: string | Function | unknown[];
    tdDetailedChevronClass?: string | Function | unknown[];
    trSelectedClass?: string | Function | unknown[];
    stickyHeaderClass?: string | Function | unknown[];
    scrollableClass?: string | Function | unknown[];
    mobileSortClass?: string | Function | unknown[];
    paginationWrapperClass?: string | Function | unknown[];
    thSubheadingClass?: string | Function | unknown[];
}>, {
    data: unknown[];
    total: string | number;
    perPage: string | number;
    columns: unknown[];
    sortIcon: string;
    sortIconSize: string;
    headerCheckable: boolean;
    checkboxPosition: string;
    isRowSelectable: Function;
    isRowCheckable: Function;
    checkedRows: unknown[];
    mobileCards: boolean;
    defaultSortDirection: string;
    currentPage: number;
    showDetailIcon: boolean;
    detailIcon: string;
    paginationPosition: string;
    rowClass: Function;
    openedDetailed: unknown[];
    hasDetailedVisible: Function;
    detailKey: string;
    customDetailRow: boolean;
    detailTransition: string;
    draggable: boolean;
    filtersEvent: string;
    showHeader: boolean;
    stickyCheckbox: boolean;
}>;
/**
 * Tabulated data are sometimes needed, it's even better when it's responsive
 * @displayName Table
 * @requires ./TableColumn.vue
 * @example ./examples/Table.md
 * @style _table.scss
 */
export default _default;
