import { App } from 'vue';
declare const _default: import("vue").DefineComponent<{
    /** @model */
    modelValue: DateConstructor;
    inline: BooleanConstructor;
    minTime: DateConstructor;
    maxTime: DateConstructor;
    placeholder: StringConstructor;
    editable: BooleanConstructor;
    disabled: BooleanConstructor;
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: StringConstructor;
    hourFormat: {
        type: StringConstructor;
    };
    incrementHours: {
        type: NumberConstructor;
        default: number;
    };
    incrementMinutes: {
        type: NumberConstructor;
        default: number;
    };
    incrementSeconds: {
        type: NumberConstructor;
        default: number;
    };
    timeFormatter: {
        type: FunctionConstructor;
        default: (date: Date, vm: App<any>) => any;
    };
    timeParser: {
        type: FunctionConstructor;
        default: (date: Date, vm: App<any>) => any;
    };
    mobileNative: {
        type: BooleanConstructor;
        default: () => any;
    };
    timeCreator: {
        type: FunctionConstructor;
        default: () => any;
    };
    position: StringConstructor;
    unselectableTimes: ArrayConstructor;
    openOnFocus: BooleanConstructor;
    enableSeconds: BooleanConstructor;
    defaultMinutes: NumberConstructor;
    defaultSeconds: NumberConstructor;
    appendToBody: BooleanConstructor;
    resetOnMeridianChange: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    dateSelected: string;
    hoursSelected: any;
    minutesSelected: any;
    secondsSelected: any;
    meridienSelected: any;
    _elementRef: string;
}, {
    computedValue: {
        get(): any;
        set(value: any): void;
    };
    localeOptions(): Intl.ResolvedDateTimeFormatOptions;
    dtf(): any;
    newHourFormat(): any;
    sampleTime(): any;
    hourLiteral(): any;
    minuteLiteral(): any;
    secondLiteral(): any;
    amString(): any;
    pmString(): any;
    hours(): any[];
    minutes(): any[];
    seconds(): any[];
    meridiens(): any[];
    isMobile(): RegExpMatchArray;
    isHourFormat24(): boolean;
}, {
    onMeridienChange(value: any): void;
    onHoursChange(value: any): void;
    onMinutesChange(value: any): void;
    onSecondsChange(value: any): void;
    updateDateSelected(hours: any, minutes: any, seconds: any, meridiens: any): void;
    updateInternalState(value: any): void;
    isHourDisabled(hour: any): boolean;
    isMinuteDisabledForHour(hour: any, minute: any): boolean;
    isMinuteDisabled(minute: any): boolean;
    isSecondDisabled(second: any): boolean;
    onChange(value: any): void;
    toggle(active: any): void;
    close(): void;
    handleOnFocus(): void;
    formatHHMMSS(value: any): string;
    onChangeNativePicker(event: any): void;
    formatNumber(value: any, prependZero: any): any;
    pad(value: any): string;
    formatValue(date: any): any;
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
}, import("vue").DefineComponent<{
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
    mobileNative: boolean;
    incrementHours: number;
    incrementMinutes: number;
    incrementSeconds: number;
    timeFormatter: Function;
    timeParser: Function;
    timeCreator: Function;
    resetOnMeridianChange: boolean;
} & {
    size?: string;
    modelValue?: string;
    openOnFocus?: boolean;
    appendToBody?: boolean;
    disabled?: boolean;
    position?: string;
    placeholder?: string;
    inline?: boolean;
    editable?: boolean;
    minTime?: string;
    maxTime?: string;
    hourFormat?: string;
    unselectableTimes?: unknown[];
    enableSeconds?: boolean;
    defaultMinutes?: number;
    defaultSeconds?: number;
}>, {
    mobileNative: boolean;
    incrementHours: number;
    incrementMinutes: number;
    incrementSeconds: number;
    timeFormatter: Function;
    timeParser: Function;
    timeCreator: Function;
    resetOnMeridianChange: boolean;
}>;
export default _default;
