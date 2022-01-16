declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: (StringConstructor | NumberConstructor)[];
    /** Options / suggestions */
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    /** Native options to use in HTML5 validation */
    autocomplete: StringConstructor;
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
    field: {
        type: StringConstructor;
        default: string;
    };
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: BooleanConstructor;
    /** Clear input text on select */
    clearOnSelect: BooleanConstructor;
    /** Open dropdown list on focus */
    openOnFocus: BooleanConstructor;
    /** Function to format an option to a string for display in the input as alternative to field prop) */
    customFormatter: FunctionConstructor;
    /** Makes the component check if list reached scroll end and emit infinite-scroll event. */
    checkInfiniteScroll: BooleanConstructor;
    /** Keep open dropdown list after select */
    keepOpen: BooleanConstructor;
    /** Add a button/icon to clear the inputed text */
    clearable: BooleanConstructor;
    /** Max height of dropdown content */
    maxHeight: (StringConstructor | NumberConstructor)[];
    /**
     * Position of dropdown
     * @values auto, top, bottom
     */
    menuPosition: {
        type: StringConstructor;
        default: string;
    };
    /** Transition name to apply on dropdown list */
    animation: {
        type: StringConstructor;
        default: () => any;
    };
    /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
    groupField: StringConstructor;
    /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
    groupOptions: StringConstructor;
    /** Number of milliseconds to delay before to emit typing event */
    debounceTyping: NumberConstructor;
    /** Icon name to be added on the right side */
    iconRight: StringConstructor;
    /** Clickable icon right if exists */
    iconRightClickable: BooleanConstructor;
    /** Append autocomplete content to body */
    appendToBody: BooleanConstructor;
    /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
    confirmKeys: {
        type: ArrayConstructor;
        default: () => string[];
    };
    /** Input type */
    type: {
        type: StringConstructor;
        default: string;
    };
    /** Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled */
    selectOnClickOutside: BooleanConstructor;
    /** Allows the header in the autocomplete to be selectable */
    selectableHeader: BooleanConstructor;
    /** Allows the footer in the autocomplete to be selectable */
    selectableFooter: BooleanConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    menuClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    menuPositionClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHoverClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemGroupTitleClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemEmptyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemHeaderClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    itemFooterClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    inputClasses: {
        type: ObjectConstructor;
        default: () => any;
    };
}, unknown, {
    selected: any;
    hovered: any;
    headerHovered: any;
    footerHovered: any;
    isActive: boolean;
    newValue: string | number;
    ariaAutocomplete: string;
    newAutocomplete: string;
    isListInViewportVertically: boolean;
    hasFocus: boolean;
    itemRefs: any[];
    width: any;
    bodyEl: any;
}, {
    rootClasses(): any[];
    menuClasses(): any[];
    itemClasses(): any[];
    itemEmptyClasses(): any[];
    itemGroupClasses(): any[];
    itemHeaderClasses(): any[];
    itemFooterClasses(): any[];
    inputBind(): any;
    computedData(): any[];
    isEmpty(): boolean;
    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList(): any[];
    newDropdownPosition(): "top" | "bottom";
    newIconRight(): any;
    newIconRightClickable(): any;
    menuStyle(): {
        maxHeight: string | number;
    };
    $elementRef(): string;
}, {
    itemOptionClasses(option: any): any[];
    /**
     * Set which option is currently hovered.
     */
    setHovered(option: any): void;
    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected(option: any, closeDropdown?: boolean, event?: any): void;
    /**
     * Select first option
     */
    selectFirstOption(computedData: any): void;
    /**
     * Key listener.
     * Select the hovered option.
     */
    keydown(event: any): void;
    selectHeaderOrFoterByClick(event: any, origin: any): void;
    /**
     * Check if header or footer was selected.
     */
    checkIfHeaderOrFooterSelected(event: any, triggerClick: any, closeDropdown?: boolean): void;
    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside(event: any): void;
    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue(option: any): any;
    /**
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll(): void;
    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical(): void;
    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(direction: any): void;
    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused(event: any): void;
    /**
    * Blur listener.
    */
    onBlur(event: any): void;
    onInput(): void;
    emitTyping(): void;
    rightIconClick(event: any): void;
    checkValidity(): void;
    setItemRef(el: any): void;
    updateAppendToBody(): void;
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
}>, import("vue").ComponentOptionsMixin, ("select" | "blur" | "focus" | "update:modelValue" | "icon-click" | "icon-right-click" | "infinite-scroll" | "typing")[], "select" | "blur" | "focus" | "update:modelValue" | "icon-click" | "icon-right-click" | "infinite-scroll" | "typing", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    data: unknown[];
    type: string;
    field: string;
    menuPosition: string;
    animation: string;
    confirmKeys: unknown[];
    inputClasses: Record<string, any>;
} & {
    size?: string;
    rootClass?: string | Function | unknown[];
    autocomplete?: string;
    modelValue?: string | number;
    iconRight?: string;
    iconRightClickable?: boolean;
    clearable?: boolean;
    expandedClass?: string | Function | unknown[];
    keepFirst?: boolean;
    clearOnSelect?: boolean;
    openOnFocus?: boolean;
    customFormatter?: Function;
    checkInfiniteScroll?: boolean;
    keepOpen?: boolean;
    maxHeight?: string | number;
    groupField?: string;
    groupOptions?: string;
    debounceTyping?: number;
    appendToBody?: boolean;
    selectOnClickOutside?: boolean;
    selectableHeader?: boolean;
    selectableFooter?: boolean;
    menuClass?: string | Function | unknown[];
    menuPositionClass?: string | Function | unknown[];
    itemClass?: string | Function | unknown[];
    itemHoverClass?: string | Function | unknown[];
    itemGroupTitleClass?: string | Function | unknown[];
    itemEmptyClass?: string | Function | unknown[];
    itemHeaderClass?: string | Function | unknown[];
    itemFooterClass?: string | Function | unknown[];
}>, {
    data: unknown[];
    type: string;
    field: string;
    menuPosition: string;
    animation: string;
    confirmKeys: unknown[];
    inputClasses: Record<string, any>;
}>;
/**
 * Extended input that provide suggestions while the user types
 * @displayName Autocomplete
 * @example ./examples/Autocomplete.md
 * @style _autocomplete.scss
 */
export default _default;
