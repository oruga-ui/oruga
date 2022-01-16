declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: (ArrayConstructor | BooleanConstructor | StringConstructor | NumberConstructor)[];
    /**
     * Same as native value
     */
    nativeValue: (ArrayConstructor | BooleanConstructor | StringConstructor | NumberConstructor)[];
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: StringConstructor;
    /**
     * Same as native disabled
     */
    disabled: BooleanConstructor;
    required: BooleanConstructor;
    /**
     * Same as native name
     */
    name: StringConstructor;
    /**
     * Size of the control, optional
     * @values small, medium, large
     */
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
}>, {}>;
export default _default;
