declare const _default: import("vue").DefineComponent<{
    selectedDate: {
        type: (DateConstructor | ArrayConstructor)[];
    };
    hoveredDateRange: ArrayConstructor;
    day: {
        type: NumberConstructor;
    };
    week: {
        type: ArrayConstructor;
        required: true;
    };
    month: {
        type: NumberConstructor;
        required: true;
    };
    showWeekNumber: BooleanConstructor;
    minDate: DateConstructor;
    maxDate: DateConstructor;
    disabled: BooleanConstructor;
    unselectableDates: ArrayConstructor;
    unselectableDaysOfWeek: ArrayConstructor;
    selectableDates: ArrayConstructor;
    events: ArrayConstructor;
    indicators: StringConstructor;
    dateCreator: FunctionConstructor;
    nearbyMonthDays: BooleanConstructor;
    nearbySelectableMonthDays: BooleanConstructor;
    weekNumberClickable: BooleanConstructor;
    range: BooleanConstructor;
    multiple: BooleanConstructor;
    rulesForFirstWeek: NumberConstructor;
    firstDayOfWeek: NumberConstructor;
    tableRowClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellFirstSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellWithinSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellLastSelectedClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellFirstHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellInvisibleClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellWithinHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellLastHoveredClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellTodayClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellSelectableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellUnselectableClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellNearbyClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableCellEventsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventIndicatorsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventsClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
    tableEventVariantClass: (ArrayConstructor | StringConstructor | FunctionConstructor)[];
}, unknown, unknown, {
    tableRowClasses(): any[];
    tableCellClasses(): any[];
    tableEventsClasses(): any[];
    hasEvents(): any;
}, {
    firstWeekOffset(year: any, dow: any, doy: any): number;
    daysInYear(year: any): 366 | 365;
    isLeapYear(year: any): boolean;
    getSetDayOfYear(input: any): number;
    weeksInYear(year: any, dow: any, doy: any): number;
    getWeekNumber(mom: any): any;
    clickWeekNumber(week: any): void;
    selectableDate(day: any): boolean;
    emitChosenDate(day: any): void;
    eventsDateMatch(day: any): false | any[];
    cellClasses(day: any): any[];
    eventClasses(event: any): any[];
    setRangeHoverEndDate(day: any): void;
    manageKeydown(event: any, weekDay: any): void;
    changeFocus(day: any, inc: any): void;
}, import("vue").DefineComponent<{
    override: BooleanConstructor;
}, unknown, unknown, {}, {
    computedClass(field: string, defaultValue: string, suffix?: string): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    override?: boolean;
}>, {}>, import("vue").ComponentOptionsMixin, ("select" | "rangeHoverEndDate" | "change-focus")[], "select" | "rangeHoverEndDate" | "change-focus", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    week: unknown[];
    month: number;
} & {
    disabled?: boolean;
    multiple?: boolean;
    selectedDate?: string | unknown[];
    hoveredDateRange?: unknown[];
    day?: number;
    showWeekNumber?: boolean;
    minDate?: string;
    maxDate?: string;
    unselectableDates?: unknown[];
    unselectableDaysOfWeek?: unknown[];
    selectableDates?: unknown[];
    events?: unknown[];
    indicators?: string;
    dateCreator?: Function;
    nearbyMonthDays?: boolean;
    nearbySelectableMonthDays?: boolean;
    weekNumberClickable?: boolean;
    range?: boolean;
    rulesForFirstWeek?: number;
    firstDayOfWeek?: number;
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
}>, {}>;
export default _default;
