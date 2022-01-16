declare const _default: import("vue").DefineComponent<{
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    disabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkCheckedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    checkClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    labelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    isChecked(): boolean;
    rootClasses(): any[];
    checkClasses(): any[];
    labelClasses(): any[];
}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor;
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
}>, {}>, import("vue").ComponentOptionsMixin, "input"[], "input", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    disabledClass?: string | Function | unknown[];
    labelClass?: string | Function | unknown[];
    checkClass?: string | Function | unknown[];
    checkCheckedClass?: string | Function | unknown[];
}>, {}>;
/**
 * Select an option from a set
 * @displayName Radio
 * @example ./examples/Radio.md
 * @style _radio.scss
 */
export default _default;
