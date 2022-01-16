declare const _default: import("vue").DefineComponent<{
    /**
     * Icon pack to use for the navigation
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: StringConstructor;
    /** Icon to use for navigation button */
    iconPrev: {
        type: StringConstructor;
        default: () => any;
    };
    /** Icon to use for navigation button */
    iconNext: {
        type: StringConstructor;
        default: () => any;
    };
    /**
     * Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items.
     */
    hasNavigation: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Step navigation is animated
     */
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Position of the marker label, optional
     * @values bottom, right, left
     */
    labelPosition: {
        type: StringConstructor;
        validator(value: string): boolean;
        default: string;
    };
    /** Rounded step markers */
    rounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    ariaNextLabel: StringConstructor;
    ariaPreviousLabel: StringConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    verticalClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    positionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    animatedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepMarkerRoundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepDividerClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepMarkerClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepContentClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepContentTransitioningClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepNavigationClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepLinkClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepLinkClickableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepLinkLabelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    stepLinkLabelPositionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    wrapperClasses(): any[];
    mainClasses(): any[];
    stepDividerClasses(): any[];
    stepMarkerClasses(): any[];
    stepContentClasses(): any[];
    stepNavigationClasses(): any[];
    stepLinkLabelClasses(): any[];
    activeItem(): any;
    /**
     * Check if previous button is available.
     */
    hasPrev(): boolean;
    /**
     * Retrieves the next visible item
     */
    nextItem(): any;
    /**
     * Retrieves the previous visible item
     */
    prevItem(): any;
    /**
     * Check if next button is available.
     */
    hasNext(): boolean;
    navigationProps(): {
        previous: {
            disabled: boolean;
            action: any;
        };
        next: {
            disabled: boolean;
            action: any;
        };
    };
}, {
    stepLinkClasses(childItem: any): any[];
    /**
     * Return if the step should be clickable or not.
     */
    isItemClickable(stepItem: any): any;
    /**
     * Previous button click listener.
     */
    prev(): void;
    /**
     * Previous button click listener.
     */
    next(): void;
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
}>, {}> | import("vue").DefineComponent<{
    modelValue: (StringConstructor | NumberConstructor)[];
    variant: (ObjectConstructor | StringConstructor)[];
    size: StringConstructor;
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
    activeIndex(): number; /**
     * Position of the marker label, optional
     * @values bottom, right, left
     */
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
    rounded: boolean;
    iconPrev: string;
    iconNext: string;
    animated: boolean;
    hasNavigation: boolean;
    labelPosition: string;
} & {
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    iconPack?: string;
    mobileClass?: string | Function | unknown[];
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    positionClass?: string | Function | unknown[];
    verticalClass?: string | Function | unknown[];
    stepsClass?: string | Function | unknown[];
    animatedClass?: string | Function | unknown[];
    stepDividerClass?: string | Function | unknown[];
    stepMarkerClass?: string | Function | unknown[];
    stepMarkerRoundedClass?: string | Function | unknown[];
    stepContentClass?: string | Function | unknown[];
    stepContentTransitioningClass?: string | Function | unknown[];
    stepNavigationClass?: string | Function | unknown[];
    stepLinkLabelClass?: string | Function | unknown[];
    stepLinkClass?: string | Function | unknown[];
    stepLinkClickableClass?: string | Function | unknown[];
    stepLinkLabelPositionClass?: string | Function | unknown[];
}>, {
    rounded: boolean;
    iconPrev: string;
    iconNext: string;
    animated: boolean;
    hasNavigation: boolean;
    labelPosition: string;
}>;
/**
 * Responsive horizontal process steps
 * @displayName Steps
 * @requires ./StepItem.vue
 * @example ./examples/Steps.md
 * @style _steps.scss
 */
export default _default;
