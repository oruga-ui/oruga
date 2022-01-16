declare const _default: import("vue").DefineComponent<{
    /**
     * 	Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: StringConstructor;
    /**
     * Field label
     */
    label: StringConstructor;
    /**
     * Same as native for set on the label
     */
    labelFor: StringConstructor;
    /**
     * Help message text
     */
    message: StringConstructor;
    /**
     * Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)
     */
    grouped: BooleanConstructor;
    /**
     * Allow controls to fill up multiple lines, making it responsive
     */
    groupMultiline: BooleanConstructor;
    /**
     * Group label and control on the same line for horizontal forms
     */
    horizontal: BooleanConstructor;
    /**
     * Field automatically attach controls together
     */
    addons: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
    * Vertical size of input, optional
    * @values small, medium, large
    */
    labelSize: StringConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    horizontalClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    groupedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    groupMultilineClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    labelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    labelSizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    labelHorizontalClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    bodyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    bodyHorizontalClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    addonsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    messageClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantMessageClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantLabelClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    focusedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    filledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    newVariant: string;
    newMessage: string;
    isFocused: boolean;
    isFilled: boolean;
}, {
    rootClasses(): any[];
    messageClasses(): any[];
    labelClasses(): any[];
    labelHorizontalClasses(): any[];
    bodyClasses(): any[];
    bodyHorizontalClasses(): any[];
    innerFieldClasses(): any[];
    parent(): any;
    hasLabelSlot(): any;
    hasMessageSlot(): any;
    hasLabel(): any;
    hasMessage(): any;
    hasInnerField(): any;
}, {
    hasAddons(): boolean;
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
}>, {}>, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    addons: boolean;
} & {
    label?: string;
    variant?: string;
    rootClass?: string | Function | unknown[];
    message?: string;
    labelClass?: string | Function | unknown[];
    labelFor?: string;
    grouped?: boolean;
    groupMultiline?: boolean;
    horizontal?: boolean;
    labelSize?: string;
    horizontalClass?: string | Function | unknown[];
    groupedClass?: string | Function | unknown[];
    groupMultilineClass?: string | Function | unknown[];
    labelSizeClass?: string | Function | unknown[];
    labelHorizontalClass?: string | Function | unknown[];
    bodyClass?: string | Function | unknown[];
    bodyHorizontalClass?: string | Function | unknown[];
    addonsClass?: string | Function | unknown[];
    messageClass?: string | Function | unknown[];
    variantMessageClass?: string | Function | unknown[];
    variantLabelClass?: string | Function | unknown[];
    mobileClass?: string | Function | unknown[];
    focusedClass?: string | Function | unknown[];
    filledClass?: string | Function | unknown[];
}>, {
    addons: boolean;
}>;
/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @example ./examples/Field.md
 * @style _field.scss
 */
export default _default;
