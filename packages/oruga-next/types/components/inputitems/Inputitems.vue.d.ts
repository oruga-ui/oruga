declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: {
        type: ArrayConstructor;
        default: () => any[];
    };
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /** Items data */
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    /**
     * Color of the each items, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: StringConstructor;
    /** Limits the number of items, plus item counter */
    maxitems: {
        type: (StringConstructor | NumberConstructor)[];
        required: false;
    };
    /** Show counter when maxlength or maxtags props are passed */
    hasCounter: {
        type: BooleanConstructor;
        default: () => any;
    };
    /** Property of the object (if data is array of objects) to use as display text */
    field: {
        type: StringConstructor;
        default: string;
    };
    /** Add autocomplete feature (if true, any Autocomplete props may be used too) */
    autocomplete: BooleanConstructor;
    /**  Property of the object (if data is array of objects) to use as display text of group */
    groupField: StringConstructor;
    /**  Property of the object (if data is array of objects) to use as key to get items array of each group, optional */
    groupOptions: StringConstructor;
    nativeAutocomplete: StringConstructor;
    /**  Opens a dropdown with choices when the input field is focused */
    openOnFocus: BooleanConstructor;
    /** Input will be disabled */
    disabled: BooleanConstructor;
    /** Add close/delete button to the item */
    closable: {
        type: BooleanConstructor;
        default: () => any;
    };
    /**
     * Array of keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
     * which will add a item when typing (default comma, tab and enter)
     */
    confirmKeys: {
        type: ArrayConstructor;
        default: () => any;
    };
    /** Allow removing last item when pressing given keys, if input is empty */
    removeOnKeys: {
        type: ArrayConstructor;
        default: () => any;
    };
    /** When autocomplete, it allow to add new items */
    allowNew: BooleanConstructor;
    /** Array of chars used to split when pasting a new string */
    onPasteSeparators: {
        type: ArrayConstructor;
        default: () => any;
    };
    /** Function to validate the value of the item before adding */
    beforeAdding: {
        type: FunctionConstructor;
        default: () => true;
    };
    /** Allows adding the same item multiple time */
    allowDuplicates: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event */
    checkInfiniteScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Function to create a new item to push into v-model (items) */
    createItem: {
        type: FunctionConstructor;
        default: (item: any) => any;
    };
    /** Icon name of close icon on selected item */
    closeIcon: {
        type: StringConstructor;
        default: () => any;
    };
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: BooleanConstructor;
    /** Accessibility label for the close button */
    ariaCloseLabel: StringConstructor;
    /** Append autocomplete content to body */
    appendToBody: BooleanConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    closeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    counterClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    autocompleteClasses: {
        type: ObjectConstructor;
        default: () => any;
    };
}, unknown, {
    items: any[];
    newItem: string;
    isComposing: boolean;
}, {
    rootClasses(): any[];
    containerClasses(): any[];
    itemClasses(): any[];
    closeClasses(): any[];
    counterClasses(): any[];
    autocompleteBind(): any;
    valueLength(): any;
    hasDefaultSlot(): boolean;
    hasEmptySlot(): boolean;
    hasHeaderSlot(): boolean;
    hasFooterSlot(): boolean;
    /**
     * Show the input field if a maxitems hasn't been set or reached.
     */
    hasInput(): boolean;
    itemsLength(): any;
    /**
     * If input has onPasteSeparators prop,
     * returning new RegExp used to split pasted string.
     */
    separatorsAsRegExp(): RegExp;
    $elementRef(): string;
}, {
    addItem(item: any): void;
    getNormalizedItemText(item: any): string;
    customOnBlur(event: any): void;
    onSelect(option: any): void;
    removeItem(index: any, event: any): any;
    removeLastItem(): void;
    keydown(event: any): void;
    onTyping(event: any): void;
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
        default: () => any; /** @model */
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
}>, import("vue").ComponentOptionsMixin, ("blur" | "focus" | "update:modelValue" | "icon-right-click" | "infinite-scroll" | "typing" | "add" | "remove")[], "blur" | "focus" | "update:modelValue" | "icon-right-click" | "infinite-scroll" | "typing" | "add" | "remove", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    data: unknown[];
    modelValue: unknown[];
    hasCounter: boolean;
    field: string;
    checkInfiniteScroll: boolean;
    confirmKeys: unknown[];
    closable: boolean;
    removeOnKeys: unknown[];
    onPasteSeparators: unknown[];
    beforeAdding: Function;
    allowDuplicates: boolean;
    createItem: Function;
    closeIcon: string;
    autocompleteClasses: Record<string, any>;
} & {
    variant?: string;
    size?: string;
    rootClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    autocomplete?: boolean;
    expandedClass?: string | Function | unknown[];
    counterClass?: string | Function | unknown[];
    keepFirst?: boolean;
    openOnFocus?: boolean;
    groupField?: string;
    groupOptions?: string;
    appendToBody?: boolean;
    itemClass?: string | Function | unknown[];
    disabled?: boolean;
    maxitems?: string | number;
    nativeAutocomplete?: string;
    allowNew?: boolean;
    ariaCloseLabel?: string;
    closeClass?: string | Function | unknown[];
}>, {
    data: unknown[];
    modelValue: unknown[];
    hasCounter: boolean;
    field: string;
    checkInfiniteScroll: boolean;
    confirmKeys: unknown[];
    closable: boolean;
    removeOnKeys: unknown[];
    onPasteSeparators: unknown[];
    beforeAdding: Function;
    allowDuplicates: boolean;
    createItem: Function;
    closeIcon: string;
    autocompleteClasses: Record<string, any>;
}>;
/**
 * A simple item input field that can have autocomplete functionality
 * @displayName Inputitems
 * @example ./examples/InputItems.md
 * @style _inputItems.scss
 */
export default _default;
