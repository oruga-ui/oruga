declare const _default: {
    name: string;
    mixins: (import("vue").DefineComponent<{
        override: BooleanConstructor;
    }, unknown, unknown, {}, {
        computedClass(field: string, defaultValue: string, suffix?: string): string;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
        override?: boolean;
    }>, {}> | {
        methods: {
            manageKeydown(event: any, weekDay: any): void;
        };
    })[];
    emits: string[];
    props: {
        modelValue: {
            type: (DateConstructor | ArrayConstructor)[];
        };
        monthNames: ArrayConstructor;
        events: ArrayConstructor;
        indicators: StringConstructor;
        minDate: DateConstructor;
        maxDate: DateConstructor;
        focused: ObjectConstructor;
        disabled: BooleanConstructor;
        dateCreator: FunctionConstructor;
        unselectableDates: (ArrayConstructor | FunctionConstructor)[];
        unselectableDaysOfWeek: ArrayConstructor;
        selectableDates: (ArrayConstructor | FunctionConstructor)[];
        range: BooleanConstructor;
        multiple: BooleanConstructor;
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
    };
    data(): {
        selectedBeginDate: any;
        selectedEndDate: any;
        hoveredEndDate: any;
        multipleSelectedDates: any;
    };
    computed: {
        monthClasses(): any[];
        monthBodyClasses(): any[];
        monthTableClasses(): any[];
        monthCellClasses(): any[];
        hasEvents(): any;
        eventsInThisYear(): any[];
        monthDates(): any[];
        focusedMonth(): any;
        hoveredDateRange(): any[];
    };
    watch: {
        focusedMonth(month: any): void;
    };
    methods: {
        selectMultipleDates(date: any): void;
        selectableDate(day: any): boolean;
        eventsDateMatch(day: any): false | any[];
        cellClasses(day: any): any[];
        updateSelectedDate(date: any): void;
        emitChosenDate(day: any): void;
        handleSelectRangeDate(date: any): void;
        setRangeHoverEndDate(day: any): void;
        changeFocus(month: any, inc: any): void;
    };
};
export default _default;
