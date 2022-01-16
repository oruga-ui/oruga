declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: DateConstructor;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: StringConstructor;
    disabled: BooleanConstructor;
    iconRight: StringConstructor;
    iconRightClickable: BooleanConstructor;
    inline: BooleanConstructor;
    openOnFocus: BooleanConstructor;
    position: StringConstructor;
    mobileNative: {
        type: BooleanConstructor;
        default: boolean;
    };
    minDatetime: DateConstructor;
    maxDatetime: DateConstructor;
    datetimeFormatter: {
        type: FunctionConstructor;
    };
    datetimeParser: {
        type: FunctionConstructor;
    };
    datetimeCreator: {
        type: FunctionConstructor;
        default: (date: Date) => any;
    };
    datepicker: ObjectConstructor;
    timepicker: ObjectConstructor;
    locale: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => any;
    };
    appendToBody: BooleanConstructor;
    datepickerWrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    timepickerWrapperClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, {
    newValue: string;
}, {
    datepickerWrapperClasses(): any[];
    timepickerWrapperClasses(): any[];
    computedValue: {
        get(): any;
        set(value: any): void;
    };
    localeOptions(): Intl.ResolvedDateTimeFormatOptions;
    dtf(): any;
    isMobileNative(): any;
    isMobile(): RegExpMatchArray;
    minDate(): any;
    maxDate(): any;
    minTime(): any;
    maxTime(): any;
    datepickerSize(): any;
    timepickerSize(): any;
    timepickerDisabled(): any;
}, {
    enableSeconds(): any;
    isHourFormat24(): any;
    defaultDatetimeParser(date: any): any;
    defaultDatetimeFormatter(date: any): any;
    onChangeNativePicker(event: any): void;
    formatNative(value: any): string;
    toggle(): void;
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
}>, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    editable: boolean;
    mobileNative: boolean;
    locale: string | unknown[];
    datetimeCreator: Function;
} & {
    modelValue?: string;
    iconRight?: string;
    iconRightClickable?: boolean;
    openOnFocus?: boolean;
    appendToBody?: boolean;
    disabled?: boolean;
    position?: string;
    placeholder?: string;
    datepicker?: Record<string, any>;
    inline?: boolean;
    timepicker?: Record<string, any>;
    minDatetime?: string;
    maxDatetime?: string;
    datetimeFormatter?: Function;
    datetimeParser?: Function;
    datepickerWrapperClass?: string | Function | unknown[];
    timepickerWrapperClass?: string | Function | unknown[];
}>, {
    editable: boolean;
    mobileNative: boolean;
    locale: string | unknown[];
    datetimeCreator: Function;
}>;
/**
 * An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile
 * @displayName Datetimepicker
 * @example ./examples/Datetimepicker.md
 */
export default _default;
