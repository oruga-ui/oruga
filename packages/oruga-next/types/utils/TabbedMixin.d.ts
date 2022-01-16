declare const _default: (cmp: string) => import("vue").DefineComponent<{
    /** @model */
    modelValue: (StringConstructor | NumberConstructor)[];
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: (ObjectConstructor | StringConstructor)[];
    /**
     * Tab size, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Show tab in vertical layout */
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Position of the tab, optional
     * @values centered, right
     */
    position: StringConstructor;
    /** Destroy tab on hide */
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
    /**
    * Child click listener, emit input event and change active child.
    */
    childClick(child: any): void;
    /**
    * Select the first 'viable' child, starting at startingIndex and in the direction specified
    * by the boolean parameter forward. In other words, first try to select the child at index
    * startingIndex, and if it is not visible or it is disabled, then go to the index in the
    * specified direction until either returning to startIndex or finding a viable child item.
   */
    clickFirstViableChild(startingIndex: number, forward: Boolean): void;
    /**
     * Go to the next item or wrap around
    */
    next(): void;
    /**
     * Go to the previous item or wrap around
    */
    prev(): void;
    /**
     * Go to the first viable item
    */
    homePressed(): void;
    /**
     * Go to the last viable item
    */
    endPressed(): void;
    /**
    * Activate next child and deactivate prev child
    */
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
}>;
export default _default;
