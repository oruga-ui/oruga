declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: (StringConstructor | NumberConstructor)[];
    /** Native options to use in HTML5 validation */
    autocomplete: StringConstructor;
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: {
        type: StringConstructor;
        default: string;
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
     * 	Adds the reveal password functionality
     */
    passwordReveal: BooleanConstructor;
    /**
     * Makes the icon clickable
     */
    iconClickable: BooleanConstructor;
    /**
     * Show character counter when maxlength prop is passed
     */
    hasCounter: {
        type: BooleanConstructor;
        default: () => any;
    };
    /**
     * Automatically adjust height in textarea
     */
    autosize: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 	Icon name to be added on the right side
     */
    iconRight: StringConstructor;
    /**
     * Make the icon right clickable
     */
    iconRightClickable: BooleanConstructor;
    /** Variant of right icon */
    iconRightVariant: StringConstructor;
    /** Add a button/icon to clear the inputed text */
    clearable: {
        type: BooleanConstructor;
        default: () => any;
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconLeftSpaceClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconRightSpaceClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    inputClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    roundedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconLeftClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    iconRightClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    counterClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    newValue: string | number;
    newType: string;
    newAutocomplete: any;
    isPasswordVisible: boolean;
    height: string;
}, {
    rootClasses(): any[];
    inputClasses(): any[];
    iconLeftClasses(): any[];
    iconRightClasses(): any[];
    counterClasses(): any[];
    computedValue: {
        get(): any;
        set(value: any): void;
    };
    hasIconRight(): any;
    rightIcon(): any;
    rightIconVariant(): any;
    /**
    * Check if have any message prop from parent if it's a Field.
    */
    hasMessage(): boolean;
    /**
    * Current password-reveal icon name.
    */
    passwordVisibleIcon(): "eye" | "eye-off";
    /**
    * Get value length
    */
    valueLength(): any;
    /**
    * Computed inline styles for autoresize
    */
    computedStyles(): {
        resize?: undefined;
        height?: undefined;
        overflow?: undefined;
    } | {
        resize: string;
        height: any;
        overflow: string;
    };
    $elementRef(): "input" | "textarea";
}, {
    /**
    * Toggle the visibility of a password-reveal input
    * by changing the type and focus the input right away.
    */
    togglePasswordVisibility(): void;
    iconClick(emit: any, event: any): void;
    rightIconClick(event: any): void;
    resize(): void;
}, import("vue").DefineComponent<{
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
    maxlength: (StringConstructor | NumberConstructor)[];
    useHtml5Validation: {
        type: BooleanConstructor;
        default: () => any;
    };
    statusIcon: {
        type: BooleanConstructor;
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
}>, import("vue").ComponentOptionsMixin, ("update:modelValue" | "icon-click" | "icon-right-click")[], "update:modelValue" | "icon-click" | "icon-right-click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: string;
    hasCounter: boolean;
    autosize: boolean;
    clearable: boolean;
} & {
    variant?: string;
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    autocomplete?: string;
    modelValue?: string | number;
    passwordReveal?: boolean;
    iconClickable?: boolean;
    iconRight?: string;
    iconRightClickable?: boolean;
    iconRightVariant?: string;
    expandedClass?: string | Function | unknown[];
    iconLeftSpaceClass?: string | Function | unknown[];
    iconRightSpaceClass?: string | Function | unknown[];
    inputClass?: string | Function | unknown[];
    roundedClass?: string | Function | unknown[];
    iconLeftClass?: string | Function | unknown[];
    iconRightClass?: string | Function | unknown[];
    counterClass?: string | Function | unknown[];
}>, {
    type: string;
    hasCounter: boolean;
    autosize: boolean;
    clearable: boolean;
}>;
/**
 * Get user Input. Use with Field to access all functionalities
 * @displayName Input
 * @example ./examples/Input.md
 * @style _input.scss
 */
export default _default;
