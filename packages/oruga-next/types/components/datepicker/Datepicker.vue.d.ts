import { App, PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (DateConstructor | ArrayConstructor)[];
    };
    dayNames: {
        type: ArrayConstructor;
        default: () => any;
    };
    monthNames: {
        type: ArrayConstructor;
        default: () => any;
    };
    firstDayOfWeek: {
        type: NumberConstructor;
        default: () => any;
    };
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    inline: BooleanConstructor;
    minDate: PropType<Date>;
    maxDate: PropType<Date>;
    focusedDate: PropType<Date>;
    placeholder: StringConstructor;
    editable: BooleanConstructor;
    disabled: BooleanConstructor;
    unselectableDates: ArrayConstructor;
    unselectableDaysOfWeek: {
        type: ArrayConstructor;
        default: () => any;
    };
    selectableDates: ArrayConstructor;
    dateFormatter: {
        type: FunctionConstructor;
        default: (date: string, vm: App<any>) => any;
    };
    dateParser: {
        type: FunctionConstructor;
        default: (date: string, vm: App<any>) => any;
    };
    dateCreator: {
        type: FunctionConstructor;
        default: () => any;
    };
    mobileNative: {
        type: BooleanConstructor;
        default: () => any;
    };
    position: StringConstructor;
    iconRight: StringConstructor;
    iconRightClickable: BooleanConstructor;
    events: ArrayConstructor;
    indicators: {
        type: StringConstructor;
        default: string;
    };
    openOnFocus: BooleanConstructor;
    iconPrev: {
        type: StringConstructor;
        default: () => any;
    };
    iconNext: {
        type: StringConstructor;
        default: () => any;
    };
    yearsRange: {
        type: ArrayConstructor;
        default: () => any;
    };
    type: {
        type: StringConstructor;
        validator: (value: string) => boolean;
    };
    nearbyMonthDays: {
        type: BooleanConstructor;
        default: () => any;
    };
    nearbySelectableMonthDays: {
        type: BooleanConstructor;
        default: () => any;
    };
    showWeekNumber: {
        type: BooleanConstructor;
        default: () => any;
    };
    weekNumberClickable: {
        type: BooleanConstructor;
        default: () => any;
    };
    rulesForFirstWeek: {
        type: NumberConstructor;
        default: () => 4;
    };
    range: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    mobileModal: {
        type: BooleanConstructor;
        default: () => any;
    };
    trapFocus: {
        type: BooleanConstructor;
        default: () => any;
    };
    locale: {
        type: (ArrayConstructor | StringConstructor)[];
        default: () => any;
    };
    appendToBody: BooleanConstructor;
    ariaNextLabel: StringConstructor;
    ariaPreviousLabel: StringConstructor;
    rootClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    sizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    boxClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    headerClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    headerButtonsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    headerButtonsSizeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    prevBtnClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    nextBtnClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    listsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    footerClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableHeadClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableHeadCellClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableBodyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableRowClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellFirstSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellInvisibleClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellWithinSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellLastSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellFirstHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellWithinHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellLastHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellTodayClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellSelectableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellUnselectableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellNearbyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellEventsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventVariantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventIndicatorsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    mobileClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthBodyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthTableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellFirstSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellWithinSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellLastSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellWithinHoveredRangeClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellFirstHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellWithinHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellLastHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellTodayClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellSelectableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellUnselectableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    monthCellEventsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    inputClasses: {
        type: ObjectConstructor;
        default: () => any;
    };
    dropdownClasses: {
        type: ObjectConstructor;
        default: () => any;
    };
}, unknown, {
    dateSelected: string | unknown[];
    focusedDateData: {
        day: any;
        month: any;
        year: any;
    };
}, {
    inputBind(): any;
    dropdownBind(): any;
    rootClasses(): any[];
    boxClasses(): any[];
    headerClasses(): any[];
    headerButtonsClasses(): any[];
    prevBtnClasses(): any[];
    nextBtnClasses(): any[];
    listsClasses(): any[];
    footerClasses(): any[];
    computedValue: {
        get(): any;
        set(value: any): void;
    };
    formattedValue(): any;
    localeOptions(): Intl.ResolvedDateTimeFormatOptions;
    dtf(): Intl.DateTimeFormat;
    dtfMonth(): Intl.DateTimeFormat;
    newMonthNames(): any;
    newDayNames(): any;
    listOfMonths(): any;
    listOfYears(): any[];
    showPrev(): boolean;
    showNext(): boolean;
    isMobile(): RegExpMatchArray;
    isTypeMonth(): boolean;
    ariaRole(): string;
    $elementRef(): string;
}, {
    onChange(value: any): void;
    formatValue(value: any): any;
    prev(): void;
    next(): void;
    formatNative(value: any): any;
    formatYYYYMMDD(value: string): string;
    formatYYYYMM(value: string): string;
    onChangeNativePicker(event: any): void;
    updateInternalState(value: any): void;
    togglePicker(active: any): void;
    handleOnFocus(event: any): void;
    toggle(): void;
    onInputClick(event: any): void;
    /**
     * Keypress event that is bound to the document.
     */
    keyPress({ key }: {
        key: any;
    }): void;
    /**
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value: any): void;
    changeFocus(day: any): void;
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
}> | import("vue").DefineComponent<{
    mobileBreakpoint: StringConstructor;
}, unknown, {
    $matchMediaRef: any;
    isMatchMedia: any;
}, {}, {
    onMatchMedia(event: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    mobileBreakpoint?: string;
}>, {}>, import("vue").ComponentOptionsMixin, ("blur" | "focus" | "update:modelValue" | "icon-right-click" | "range-start" | "range-end" | "change-month" | "change-year" | "active-change")[], "blur" | "focus" | "update:modelValue" | "icon-right-click" | "range-start" | "range-end" | "change-month" | "change-year" | "active-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    inputClasses: Record<string, any>;
    iconPrev: string;
    iconNext: string;
    multiple: boolean;
    showWeekNumber: boolean;
    unselectableDaysOfWeek: unknown[];
    indicators: string;
    dateCreator: Function;
    nearbyMonthDays: boolean;
    nearbySelectableMonthDays: boolean;
    weekNumberClickable: boolean;
    range: boolean;
    rulesForFirstWeek: number;
    firstDayOfWeek: number;
    dayNames: unknown[];
    monthNames: unknown[];
    dateFormatter: Function;
    dateParser: Function;
    mobileNative: boolean;
    yearsRange: unknown[];
    closeOnClick: boolean;
    mobileModal: boolean;
    trapFocus: boolean;
    locale: string | unknown[];
    dropdownClasses: Record<string, any>;
} & {
    size?: string;
    rootClass?: string | Function | unknown[];
    sizeClass?: string | Function | unknown[];
    modelValue?: string | unknown[];
    type?: string;
    iconRight?: string;
    iconRightClickable?: boolean;
    openOnFocus?: boolean;
    appendToBody?: boolean;
    disabled?: boolean;
    position?: string;
    mobileClass?: string | Function | unknown[];
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    unselectableDates?: unknown[];
    selectableDates?: unknown[];
    events?: unknown[];
    tableRowClass?: string | Function | unknown[];
    tableCellClass?: string | Function | unknown[];
    tableCellSelectedClass?: string | Function | unknown[];
    tableCellFirstSelectedClass?: string | Function | unknown[];
    tableCellWithinSelectedClass?: string | Function | unknown[];
    tableCellLastSelectedClass?: string | Function | unknown[];
    tableCellFirstHoveredClass?: string | Function | unknown[];
    tableCellInvisibleClass?: string | Function | unknown[];
    tableCellWithinHoveredClass?: string | Function | unknown[];
    tableCellLastHoveredClass?: string | Function | unknown[];
    tableCellTodayClass?: string | Function | unknown[];
    tableCellSelectableClass?: string | Function | unknown[];
    tableCellUnselectableClass?: string | Function | unknown[];
    tableCellNearbyClass?: string | Function | unknown[];
    tableCellEventsClass?: string | Function | unknown[];
    tableEventClass?: string | Function | unknown[];
    tableEventIndicatorsClass?: string | Function | unknown[];
    tableEventsClass?: string | Function | unknown[];
    tableEventVariantClass?: string | Function | unknown[];
    tableClass?: string | Function | unknown[];
    tableHeadClass?: string | Function | unknown[];
    tableHeadCellClass?: string | Function | unknown[];
    tableBodyClass?: string | Function | unknown[];
    monthClass?: string | Function | unknown[];
    monthBodyClass?: string | Function | unknown[];
    monthTableClass?: string | Function | unknown[];
    monthCellClass?: string | Function | unknown[];
    monthCellSelectedClass?: string | Function | unknown[];
    monthCellFirstSelectedClass?: string | Function | unknown[];
    monthCellWithinSelectedClass?: string | Function | unknown[];
    monthCellLastSelectedClass?: string | Function | unknown[];
    monthCellWithinHoveredRangeClass?: string | Function | unknown[];
    monthCellFirstHoveredClass?: string | Function | unknown[];
    monthCellWithinHoveredClass?: string | Function | unknown[];
    monthCellLastHoveredClass?: string | Function | unknown[];
    monthCellTodayClass?: string | Function | unknown[];
    monthCellUnselectableClass?: string | Function | unknown[];
    monthCellEventsClass?: string | Function | unknown[];
    inline?: boolean;
    focusedDate?: Date;
    editable?: boolean;
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    boxClass?: string | Function | unknown[];
    headerClass?: string | Function | unknown[];
    headerButtonsClass?: string | Function | unknown[];
    headerButtonsSizeClass?: string | Function | unknown[];
    prevBtnClass?: string | Function | unknown[];
    nextBtnClass?: string | Function | unknown[];
    listsClass?: string | Function | unknown[];
    footerClass?: string | Function | unknown[];
    monthCellSelectableClass?: string | Function | unknown[];
}>, {
    inputClasses: Record<string, any>;
    iconPrev: string;
    iconNext: string;
    multiple: boolean;
    showWeekNumber: boolean;
    unselectableDaysOfWeek: unknown[];
    indicators: string;
    dateCreator: Function;
    nearbyMonthDays: boolean;
    nearbySelectableMonthDays: boolean;
    weekNumberClickable: boolean;
    range: boolean;
    rulesForFirstWeek: number;
    firstDayOfWeek: number;
    dayNames: unknown[];
    monthNames: unknown[];
    dateFormatter: Function;
    dateParser: Function;
    mobileNative: boolean;
    yearsRange: unknown[];
    closeOnClick: boolean;
    mobileModal: boolean;
    trapFocus: boolean;
    locale: string | unknown[];
    dropdownClasses: Record<string, any>;
}>;
/**
 * An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile
 * @displayName Datepicker
 * @example ./examples/Datepicker.md
 */
export default _default;
