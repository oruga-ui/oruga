declare const _default: import("vue").DefineComponent<{
    /**
     * Same as native indeterminate
     */
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
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
    /** Accessibility label to establish relationship between the checkbox and control label */
    ariaLabelledby: StringConstructor;
    autocomplete: StringConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    disabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkCheckedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkIndeterminateClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    labelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    isChecked(): boolean;
    rootClasses(): any[];
    checkClasses(): any[];
    labelClasses(): any[];
}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor; /**
     * Overrides the returned value when it's not checked
     */
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | import("vue").DefineComponent<{
    modelValue: (ArrayConstructor | BooleanConstructor | StringConstructor | NumberConstructor)[];
    nativeValue: (ArrayConstructor | BooleanConstructor | StringConstructor | NumberConstructor)[];
    variant: StringConstructor;
    disabled: BooleanConstructor;
    required: BooleanConstructor;
    name: StringConstructor;
    size: StringConstructor;
}, unknown, {
    newValue: string | number | boolean | unknown[];
}, {
    computedValue: {
        get(): any;
        set(value: any): void;
    };
}, {
    focus(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    variant?: string;
    size?: string;
    modelValue?: string | number | boolean | unknown[];
    disabled?: boolean;
    nativeValue?: string | number | boolean | unknown[];
    required?: boolean;
    name?: string;
}>, {}>, import("vue").ComponentOptionsMixin, "input"[], "input", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    indeterminate: boolean;
    trueValue: string | number | boolean;
    falseValue: string | number | boolean;
} & {
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    autocomplete?: string;
    disabledClass?: string | Function | unknown[];
    labelClass?: string | Function | unknown[];
    ariaLabelledby?: string;
    checkClass?: string | Function | unknown[];
    checkCheckedClass?: string | Function | unknown[];
    checkIndeterminateClass?: string | Function | unknown[];
}>, {
    indeterminate: boolean;
    trueValue: string | number | boolean;
    falseValue: string | number | boolean;
}>;
/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @example ./examples/Checkbox.md
 * @style _checkbox.scss
 */
export default _default;
