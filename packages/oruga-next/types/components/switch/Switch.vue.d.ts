declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: (BooleanConstructor | StringConstructor | NumberConstructor)[];
    /**
     * Same as native value
     */
    nativeValue: (BooleanConstructor | StringConstructor | NumberConstructor)[];
    disabled: BooleanConstructor;
    /**
     * Color of the switch, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: StringConstructor;
    /**
    * Color of the switch when is passive, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    passiveVariant: StringConstructor;
    /** Name attribute on native checkbox */
    name: StringConstructor;
    required: BooleanConstructor;
    /**
     * Vertical size of switch, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /**
     * Overrides the returned value when it's checked
     */
    trueValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: boolean;
    };
    /**
     * Overrides the returned value when it's not checked
     */
    falseValue: {
        type: (BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: boolean;
    };
    /** Rounded style */
    rounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Label position */
    position: {
        type: StringConstructor;
        default: string;
    };
    /** Accessibility label to establish relationship between the switch and control label' */
    ariaLabelledby: StringConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    disabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkCheckedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkSwitchClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    roundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    labelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    elementsWrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    passiveVariantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    positionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    inputClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    newValue: string | number | boolean;
    isMouseDown: boolean;
}, {
    rootClasses(): any[];
    inputClasses(): any[];
    checkClasses(): any[];
    checkSwitchClasses(): any[];
    labelClasses(): any[];
    computedValue: {
        get(): any;
        set(value: any): void;
    };
}, {
    focus(): void;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rounded: boolean;
    trueValue: string | number | boolean;
    falseValue: string | number | boolean;
    position: string;
} & {
    variant?: string;
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    modelValue?: string | number | boolean;
    inputClass?: string | Function | unknown[];
    roundedClass?: string | Function | unknown[];
    disabled?: boolean;
    elementsWrapperClass?: string | Function | unknown[];
    disabledClass?: string | Function | unknown[];
    labelClass?: string | Function | unknown[];
    nativeValue?: string | number | boolean;
    required?: boolean;
    name?: string;
    ariaLabelledby?: string;
    checkClass?: string | Function | unknown[];
    checkCheckedClass?: string | Function | unknown[];
    positionClass?: string | Function | unknown[];
    passiveVariant?: string;
    checkSwitchClass?: string | Function | unknown[];
    passiveVariantClass?: string | Function | unknown[];
}>, {
    rounded: boolean;
    trueValue: string | number | boolean;
    falseValue: string | number | boolean;
    position: string;
}>;
/**
 * Switch between two opposing states
 * @displayName Switch
 * @example ./examples/Switch.md
 * @style _switch.scss
 */
export default _default;
