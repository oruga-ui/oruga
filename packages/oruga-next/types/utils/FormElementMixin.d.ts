declare const _default: import("vue").DefineComponent<{
    /**
     * Makes input full width when inside a grouped or addon field
     */
    expanded: BooleanConstructor;
    /**
     * Makes the element rounded
     */
    rounded: BooleanConstructor;
    /**
     * Icon name to be added
     */
    icon: StringConstructor;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: StringConstructor;
    /** Native options to use in HTML5 validation */
    autocomplete: StringConstructor;
    /** Same as native maxlength, plus character counter */
    maxlength: (StringConstructor | NumberConstructor)[];
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: BooleanConstructor;
        default: () => any;
    };
    /** Show status icon using field and variant prop */
    statusIcon: {
        type: BooleanConstructor;
        default: () => any;
    };
    /**
     * The message which is shown when a validation error occurs
     */
    validationMessage: StringConstructor;
}, unknown, {
    isValid: boolean;
    isFocused: boolean;
    newIconPack: string;
}, {
    parentField(): any;
    /**
     * Get the type prop from parent if it's a Field.
     */
    statusVariant(): any;
    /**
     * Get the message prop from parent if it's a Field.
     */
    statusMessage(): any;
    /**
    * Icon name based on the variant.
    */
    statusVariantIcon(): any;
}, {
    /**
     * Focus method that work dynamically depending on the component.
     */
    focus(): void;
    onBlur(event: Event): void;
    onFocus(event: Event): void;
    getElement(): any;
    setInvalid(): void;
    setValidity(variant: any, message: any): void;
    /**
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'danger' type,
     * and error message to parent if it's a Field.
     */
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
}>;
export default _default;
