declare const _default: import("vue").DefineComponent<{
    /**
     * Tab type
     * @values boxed, toggle
     */
    type: {
        type: StringConstructor;
        default: string;
    };
    /**
    * Tabs will be expanded (full-width)
    */
    expanded: BooleanConstructor;
    /** Tab will have an animation */
    animated: {
        type: BooleanConstructor;
        default: () => any;
    };
    /** Show tab items multiline when there is no space */
    multiline: BooleanConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    positionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    verticalClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    multilineClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    navTabsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    navSizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    navPositionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    navTypeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    contentClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    transitioningClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tabItemWrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    rootClasses(): any[];
    itemWrapperClasses(): any[];
    navClasses(): any[];
    contentClasses(): any[];
}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | import("vue").DefineComponent<{
    modelValue: (StringConstructor | NumberConstructor)[];
    variant: (ObjectConstructor | StringConstructor)[];
    size: StringConstructor;
    /** Tab will have an animation */
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: StringConstructor;
    destroyOnHide: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    activeId: string | number;
    contentHeight: number;
    isTransitioning: boolean;
}, {
    activeItem(): any;
    activeIndex(): number;
    items(): any[];
}, {
    childClick(child: any): void;
    clickFirstViableChild(startingIndex: number, forward: Boolean): void;
    next(): void;
    prev(): void;
    homePressed(): void;
    endPressed(): void;
    performAction(newId: number): void;
}, import("vue").DefineComponent<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    [x: string]: any;
}> | Readonly<{
    [x: string]: any;
} & {
    [x: number]: any;
}>, {} | {
    [x: string]: any;
}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    destroyOnHide: boolean;
    animated: boolean;
    vertical: boolean;
} & {
    variant?: unknown;
    size?: string;
    modelValue?: string | number;
    position?: string;
}>, {
    destroyOnHide: boolean;
    animated: boolean;
    vertical: boolean;
}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: string;
    animated: boolean;
} & {
    rootClass?: string | Function | unknown[];
    expanded?: boolean;
    expandedClass?: string | Function | unknown[];
    contentClass?: string | Function | unknown[];
    positionClass?: string | Function | unknown[];
    multilineClass?: string | Function | unknown[];
    verticalClass?: string | Function | unknown[];
    multiline?: boolean;
    navTabsClass?: string | Function | unknown[];
    navSizeClass?: string | Function | unknown[];
    navPositionClass?: string | Function | unknown[];
    navTypeClass?: string | Function | unknown[];
    transitioningClass?: string | Function | unknown[];
    tabItemWrapperClass?: string | Function | unknown[];
}>, {
    type: string;
    animated: boolean;
}>;
/**
 * Responsive horizontal navigation tabs, switch between contents with ease
 * @displayName Tabs
 * @requires ./TabItem.vue
 * @example ./examples/Tabs.md
 * @style _tabs.scss
 */
export default _default;
