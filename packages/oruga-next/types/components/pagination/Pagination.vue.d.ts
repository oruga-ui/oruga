declare const _default: import("vue").DefineComponent<{
    /** Total count of items */
    total: (StringConstructor | NumberConstructor)[];
    /** Items count for each page */
    perPage: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => any;
    };
    /** Current page number, use the .sync modifier (Vue 2.x) or v-model:current (Vue 3.x) to make it two-way binding */
    current: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /** Number of pagination items to show before current page */
    rangeBefore: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /** Number of pagination items to show after current page */
    rangeAfter: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * Pagination size, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /** Simple style */
    simple: BooleanConstructor;
    /** Rounded button styles */
    rounded: BooleanConstructor;
    /**
     * Buttons order, optional
     * @values centered, right, left
     */
    order: StringConstructor;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: StringConstructor;
    /** Icon to use for previous button */
    iconPrev: {
        type: StringConstructor;
        default: () => any;
    };
    /** Icon to use for next button */
    iconNext: {
        type: StringConstructor;
        default: () => any;
    };
    ariaNextLabel: StringConstructor;
    ariaPreviousLabel: StringConstructor;
    ariaPageLabel: StringConstructor;
    ariaCurrentLabel: StringConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    prevBtnClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    nextBtnClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    listClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    linkClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    linkCurrentClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    ellipsisClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    infoClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    orderClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    simpleClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    roundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    linkDisabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    rootClasses(): any[];
    prevBtnClasses(): any[];
    nextBtnClasses(): any[];
    infoClasses(): any[];
    ellipsisClasses(): any[];
    listClasses(): any[];
    linkClasses(): any[];
    linkCurrentClasses(): any[];
    beforeCurrent(): number;
    afterCurrent(): number;
    /**
    * Total page size (count).
    */
    pageCount(): number;
    /**
    * First item of the page (count).
    */
    firstItem(): number;
    /**
    * Check if previous button is available.
    */
    hasPrev(): boolean;
    /**
    * Check if first page button should be visible.
    */
    hasFirst(): boolean;
    /**
    * Check if first ellipsis should be visible.
    */
    hasFirstEllipsis(): boolean;
    /**
    * Check if last page button should be visible.
    */
    hasLast(): boolean;
    /**
    * Check if last ellipsis should be visible.
    */
    hasLastEllipsis(): boolean;
    /**
    * Check if next button is available.
    */
    hasNext(): boolean;
    /**
    * Get near pages, 1 before and 1 after the current.
    * Also add the click event to the array.
    */
    pagesInRange(): any[];
    hasDefaultSlot(): any;
    hasPreviousSlot(): any;
    hasNextSlot(): any;
}, {
    /**
    * Previous button click listener.
    */
    prev(event: any): void;
    /**
    * Next button click listener.
    */
    next(event: any): void;
    /**
    * First button click listener.
    */
    first(event: any): void;
    /**
    * Last button click listener.
    */
    last(event: any): void;
    changePage(num: any, event: any): void;
    getPage(num: any, options?: any): {
        number: any;
        isCurrent: boolean;
        click: (event: any) => any;
        disabled: any;
        class: any;
        'aria-label': any;
    };
    /**
    * Get text for aria-label according to page number.
    */
    getAriaPageLabel(pageNumber: any, isCurrent: any): string;
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
}>, {}>, import("vue").ComponentOptionsMixin, ("change" | "update:active" | "update:current")[], "change" | "update:active" | "update:current", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    iconPrev: string;
    iconNext: string;
    perPage: string | number;
    current: string | number;
    rangeBefore: string | number;
    rangeAfter: string | number;
} & {
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    iconPack?: string;
    rounded?: boolean;
    roundedClass?: string | Function | unknown[];
    mobileClass?: string | Function | unknown[];
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    prevBtnClass?: string | Function | unknown[];
    nextBtnClass?: string | Function | unknown[];
    linkClass?: string | Function | unknown[];
    linkCurrentClass?: string | Function | unknown[];
    total?: string | number;
    simple?: boolean;
    order?: string;
    ariaPageLabel?: string;
    ariaCurrentLabel?: string;
    listClass?: string | Function | unknown[];
    ellipsisClass?: string | Function | unknown[];
    infoClass?: string | Function | unknown[];
    orderClass?: string | Function | unknown[];
    simpleClass?: string | Function | unknown[];
    linkDisabledClass?: string | Function | unknown[];
}>, {
    iconPrev: string;
    iconNext: string;
    perPage: string | number;
    current: string | number;
    rangeBefore: string | number;
    rangeAfter: string | number;
}>;
/**
 * A responsive and flexible pagination
 * @displayName Pagination
 * @example ./examples/Pagination.md
 * @style _pagination.scss
 */
export default _default;
