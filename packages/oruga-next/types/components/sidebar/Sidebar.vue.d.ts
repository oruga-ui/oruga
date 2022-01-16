declare const _default: import("vue").DefineComponent<{
    /** To control the behaviour of the sidebar programmatically, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding */
    open: BooleanConstructor;
    /**
    * Color of the sidebar, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: (ObjectConstructor | StringConstructor)[];
    /** Show an overlay like modal */
    overlay: BooleanConstructor;
    /**
     * Skeleton position in relation to the window
     * @values fixed, absolute, static
     */
    position: {
        type: StringConstructor;
        default: () => any;
        validator: (value: string) => boolean;
    };
    /** Show sidebar in fullheight */
    fullheight: BooleanConstructor;
    /** Show sidebar in fullwidth */
    fullwidth: BooleanConstructor;
    /** Show the sidebar on right */
    right: BooleanConstructor;
    /**
     * Custom layout on mobile
     * @values fullwidth, reduced, hidden
     */
    mobile: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    /** Show a small sidebar */
    reduce: BooleanConstructor;
    /** Expand sidebar on hover when reduced or mobile is reduce */
    expandOnHover: BooleanConstructor;
    /** Expand sidebar on hover with fixed position when reduced or mobile is reduce */
    expandOnHoverFixed: BooleanConstructor;
    /**
     * Sidebar cancel options
     * @values true, false, 'escape', 'outside'
     */
    canCancel: {
        type: (ArrayConstructor | BooleanConstructor)[];
        default: () => any;
    };
    /**
     * Callback on cancel
     */
    onCancel: {
        type: FunctionConstructor;
        default: () => void;
    };
    scroll: {
        type: StringConstructor;
        default: () => any;
        validator: (value: string) => boolean;
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    overlayClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    contentClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    fixedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    staticClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    absoluteClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    fullheightClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    fullwidthClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    rightClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    reduceClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandOnHoverClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandOnHoverFixedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    isOpen: boolean;
    transitionName: any;
    animating: boolean;
    savedScrollTop: any;
}, {
    rootClasses(): any[];
    overlayClasses(): any[];
    contentClasses(): any[];
    cancelOptions(): any;
    isStatic(): boolean;
    isFixed(): boolean;
    isAbsolute(): boolean;
    hideOnMobile(): any;
}, {
    /**
     * White-listed items to not close when clicked.
     * Add sidebar content and all children.
     */
    whiteList(): any[];
    /**
    * Keypress event that is bound to the document.
    */
    keyPress({ key }: {
        key: any;
    }): void;
    /**
    * Close the Sidebar if canCancel and call the onCancel prop (function).
    */
    cancel(method: any): void;
    /**
    * Call the onCancel prop (function) and emit events
    */
    close(): void;
    /**
     * Close fixed sidebar if clicked outside.
     */
    clickedOutside(event: any): void;
    /**
    * Transition before-enter hook
    */
    beforeEnter(): void;
    /**
    * Transition after-leave hook
    */
    afterEnter(): void;
    handleScroll(): void;
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
}>, {}>, import("vue").ComponentOptionsMixin, ("close" | "update:open")[], "close" | "update:open", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    scroll: string;
    position: string;
    canCancel: boolean | unknown[];
    onCancel: Function;
} & {
    variant?: unknown;
    rootClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    reduce?: boolean;
    overlay?: boolean;
    overlayClass?: string | Function | unknown[];
    open?: boolean;
    contentClass?: string | Function | unknown[];
    mobileClass?: string | Function | unknown[];
    right?: boolean;
    fullwidth?: boolean;
    fullheight?: boolean;
    mobile?: string;
    expandOnHover?: boolean;
    expandOnHoverFixed?: boolean;
    fixedClass?: string | Function | unknown[];
    staticClass?: string | Function | unknown[];
    absoluteClass?: string | Function | unknown[];
    fullheightClass?: string | Function | unknown[];
    fullwidthClass?: string | Function | unknown[];
    rightClass?: string | Function | unknown[];
    reduceClass?: string | Function | unknown[];
    expandOnHoverClass?: string | Function | unknown[];
    expandOnHoverFixedClass?: string | Function | unknown[];
}>, {
    scroll: string;
    position: string;
    canCancel: boolean | unknown[];
    onCancel: Function;
}>;
/**
 * A sidebar to use as left/right overlay or static
 * @displayName Sidebar
 * @example ./examples/Sidebar.md
 * @style _sidebar.scss
 */
export default _default;
