declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: {
        type: (ArrayConstructor | ObjectConstructor | BooleanConstructor | StringConstructor | NumberConstructor)[];
        default: any;
    };
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: StringConstructor;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: StringConstructor;
        default: () => any;
    };
    /**
     * 	Icon name to be added on the right side
     */
    iconRight: {
        type: StringConstructor;
        default: () => any;
    };
    /** Text when nothing is selected */
    placeholder: StringConstructor;
    multiple: BooleanConstructor;
    /** Same as native size */
    nativeSize: (StringConstructor | NumberConstructor)[];
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    selectClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconLeftSpaceClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconRightSpaceClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    roundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    multipleClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconLeftClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconRightClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    placeholderClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    arrowClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    selected: any;
}, {
    rootClasses(): any[];
    selectClasses(): any[];
    iconLeftClasses(): any[];
    iconRightClasses(): any[];
    placeholderVisible(): boolean;
    computedValue: {
        get(): any;
        set(value: any): void;
    };
    $elementRef(): string;
}, {}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}> | import("vue").DefineComponent<{
    expanded: BooleanConstructor;
    rounded: BooleanConstructor;
    icon: StringConstructor;
    iconPack: StringConstructor;
    autocomplete: StringConstructor;
    maxlength: (StringConstructor | NumberConstructor)[]; /** @model */
    useHtml5Validation: {
        type: BooleanConstructor;
        default: () => any;
    };
    statusIcon: {
        type: BooleanConstructor; /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        default: () => any;
    };
    validationMessage: StringConstructor;
}, unknown, {
    isValid: boolean;
    isFocused: boolean;
    newIconPack: string;
}, {
    parentField(): any;
    statusVariant(): any;
    statusMessage(): any;
    statusVariantIcon(): any;
}, {
    focus(): void;
    onBlur(event: Event): void;
    onFocus(event: Event): void;
    getElement(): any;
    setInvalid(): void;
    setValidity(variant: any, message: any): void;
    checkHtml5Validity(): any;
    syncFilled(value: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("blur" | "focus")[], "blur" | "focus", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    useHtml5Validation: boolean;
    statusIcon: boolean;
} & {
    icon?: string;
    iconPack?: string;
    expanded?: boolean;
    rounded?: boolean;
    autocomplete?: string;
    maxlength?: string | number;
    validationMessage?: string;
}>, {
    useHtml5Validation: boolean;
    statusIcon: boolean;
}>, import("vue").ComponentOptionsMixin, ("blur" | "focus" | "update:modelValue")[], "blur" | "focus" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    iconPack: string;
    modelValue: any;
    iconRight: string;
} & {
    variant?: string;
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    expandedClass?: string | Function | unknown[];
    iconLeftSpaceClass?: string | Function | unknown[];
    iconRightSpaceClass?: string | Function | unknown[];
    roundedClass?: string | Function | unknown[];
    iconLeftClass?: string | Function | unknown[];
    iconRightClass?: string | Function | unknown[];
    placeholder?: string;
    multiple?: boolean;
    nativeSize?: string | number;
    selectClass?: string | Function | unknown[];
    multipleClass?: string | Function | unknown[];
    placeholderClass?: string | Function | unknown[];
    arrowClass?: string | Function | unknown[];
}>, {
    iconPack: string;
    modelValue: any;
    iconRight: string;
}>;
/**
 * Select an item in a dropdown list. Use with Field to access all functionalities
 * @displayName Select
 * @example ./examples/Select.md
 * @style _select.scss
 */
export default _default;
