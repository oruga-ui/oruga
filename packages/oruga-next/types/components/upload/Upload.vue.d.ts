declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: (ArrayConstructor | ObjectConstructor | {
        new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
        prototype: File;
    })[];
    /** Same as native, also push new item to v-model instead of replacing */
    multiple: BooleanConstructor;
    /** Same as native disabled */
    disabled: BooleanConstructor;
    /** Same as native accept */
    accept: StringConstructor;
    /** Accepts drag & drop and change its style */
    dragDrop: BooleanConstructor;
    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: {
        type: StringConstructor;
    };
    /** Replace last chosen files every time (like native file input element) */
    native: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Upload will be expanded (full-width) */
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    draggableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    variantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    expandedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    disabledClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    hoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    newValue: unknown;
    dragDropFocus: boolean;
}, {
    rootClasses(): any[];
    draggableClasses(): any[];
    $elementRef(): string;
}, {
    /**
    * Listen change event on input type 'file',
    * emit 'input' event and validate
    */
    onFileChange(event: any): void;
    clearInput(): void;
    /**
    * Listen drag-drop to update internal variable
    */
    updateDragDropFocus(focus: any): void;
    /**
    * Check mime type of file
    */
    checkType(file: any): boolean;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string; /**
    * Listen change event on input type 'file',
    * emit 'input' event and validate
    */
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
        type: BooleanConstructor; /** Accepts drag & drop and change its style */
        default: () => any;
    };
    statusIcon: {
        type: BooleanConstructor;
        default: () => any;
    }; /** Replace last chosen files every time (like native file input element) */
    validationMessage: StringConstructor;
}, unknown, {
    isValid: boolean;
    isFocused: boolean; /** Upload will be expanded (full-width) */
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
}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    expanded: boolean;
    native: boolean;
} & {
    variant?: string;
    rootClass?: string | Function | unknown[];
    variantClass?: string | Function | unknown[];
    modelValue?: unknown;
    expandedClass?: string | Function | unknown[];
    disabled?: boolean;
    disabledClass?: string | Function | unknown[];
    multiple?: boolean;
    accept?: string;
    dragDrop?: boolean;
    draggableClass?: string | Function | unknown[];
    hoveredClass?: string | Function | unknown[];
}>, {
    expanded: boolean;
    native: boolean;
}>;
/**
 * Upload one or more files
 * @displayName Upload
 * @example ./examples/Upload.md
 * @style _upload.scss
 */
export default _default;
