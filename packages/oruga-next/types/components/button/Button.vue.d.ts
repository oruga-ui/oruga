declare const _default: import("vue").DefineComponent<{
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: StringConstructor;
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /**
     * Button label, optional when default slot
     */
    label: StringConstructor;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: StringConstructor;
    /**
     * Icon name to show on the left
     */
    iconLeft: StringConstructor;
    /**
     * Icon name to show on the right
     */
    iconRight: StringConstructor;
    /**
     * Rounded style
     */
    rounded: {
        type: BooleanConstructor;
        default: () => any;
    };
    /**
     * Outlined style
     */
    outlined: BooleanConstructor;
    /**
     * Button will be expanded (full-width)
     */
    expanded: BooleanConstructor;
    inverted: BooleanConstructor;
    /**
     * Button type, like native
     */
    nativeType: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Button will be disabled
     */
    disabled: BooleanConstructor;
    /**  @ignore */
    iconBoth: BooleanConstructor;
    elementsWrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    outlinedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    invertedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    roundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    disabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconLeftClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconRightClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    labelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    rootClasses(): any[];
    labelClasses(): any[];
    iconClasses(): any[];
    iconLeftClasses(): any[];
    iconRightClasses(): any[];
    elementsWrapperClasses(): any[];
    computedTag(): any;
    computedNativeType(): any;
    computedDisabled(): boolean;
}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rounded: boolean;
    nativeType: string;
    tag: string;
} & {
    label?: string;
    variant?: string;
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    iconPack?: string;
    expanded?: boolean;
    iconRight?: string;
    expandedClass?: string | Function | unknown[];
    roundedClass?: string | Function | unknown[];
    iconLeftClass?: string | Function | unknown[];
    iconRightClass?: string | Function | unknown[];
    iconLeft?: string;
    outlined?: boolean;
    inverted?: boolean;
    disabled?: boolean;
    iconBoth?: boolean;
    elementsWrapperClass?: string | Function | unknown[];
    outlinedClass?: string | Function | unknown[];
    invertedClass?: string | Function | unknown[];
    disabledClass?: string | Function | unknown[];
    iconClass?: string | Function | unknown[];
    labelClass?: string | Function | unknown[];
}>, {
    rounded: boolean;
    nativeType: string;
    tag: string;
}>;
/**
 * The classic button, in different colors, sizes, and states
 * @displayName Button
 * @example ./examples/Button.md
 * @style _button.scss
 */
export default _default;
