import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "@/types" {
    interface OrugaOptions {
        datepicker?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the Datepicker size */
                sizeClass: ClassDefinition;
                /** Class of the Datepicker box where you choose the date */
                boxClass: ClassDefinition;
                /** Class of the Datepicker header inside the box */
                headerClass: ClassDefinition;
                /** Class of the Datepicker buttons inside the box */
                headerButtonsClass: ClassDefinition;
                /** Class of the Datepicker buttons inside the box when a size is choosen */
                headerButtonsSizeClass: ClassDefinition;
                /** Class of the prev button inside the Datepicker box */
                prevButtonClass: ClassDefinition;
                /** Class of the next button inside the Datepicker box */
                nextButtonClass: ClassDefinition;
                /** Class of the month and year selects container inside the Datepicker box */
                listsClass: ClassDefinition;
                /** Class of the Datepicker footer */
                footerClass: ClassDefinition;
                /** Class of the Datepicker table inside the box */
                tableClass: ClassDefinition;
                /** Class of Datepicker header with days of the week inside the table */
                tableHeadClass: ClassDefinition;
                /** Class of the cell inside the table header */
                tableHeadCellClass: ClassDefinition;
                /** Class of the table body inside the box */
                tableBodyClass: ClassDefinition;
                /** Class of the table row */
                tableRowClass: ClassDefinition;
                /** Class of the table cell */
                tableCellClass: ClassDefinition;
                /** Class of the table cell when nearby month days are hidden */
                tableCellInvisibleClass: ClassDefinition;
                /** Class of table cell when it's selected */
                tableCellSelectedClass: ClassDefinition;
                /** Class of the first selected table cell when in range */
                tableCellFirstSelectedClass: ClassDefinition;
                /** Class of the table cells within the range when the range is selected */
                tableCellWithinSelectedClass: ClassDefinition;
                /** Class of the last selected table cell during range selection */
                tableCellLastSelectedClass: ClassDefinition;
                /** Class of the first hovered table cell during range selection */
                tableCellFirstHoveredClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection */
                tableCellWithinHoveredClass: ClassDefinition;
                /** Class of the last table cell hovered during range selection */
                tableCellLastHoveredClass: ClassDefinition;
                /** Class of the table cell of the current day */
                tableCellTodayClass: ClassDefinition;
                /** Class of the table cell that is selectable */
                tableCellSelectableClass: ClassDefinition;
                /** Class of the table cell that is unselectable */
                tableCellUnselectableClass: ClassDefinition;
                /** Class of the table cell when nearby days (prev/next month) are selectable */
                tableCellNearbyClass: ClassDefinition;
                /** Class of the cell of a row when at least one event is present */
                tableCellEventsClass: ClassDefinition;
                /** Class of the events container */
                tableEventsClass: ClassDefinition;
                /** Class of the event */
                tableEventClass: ClassDefinition;
                /** Class of the event indicator when a `variant` is specified */
                tableEventVariantClass: ClassDefinition;
                /** Class of the event indicator */
                tableEventIndicatorsClass: ClassDefinition;
                /** Class of the Datepicker table inside the box when type is month */
                monthClass: ClassDefinition;
                /** Class of the table body inside the box when type is month */
                monthBodyClass: ClassDefinition;
                /** Class of the table container when type is month */
                monthTableClass: ClassDefinition;
                /** Class of the table cell when type is month */
                monthCellClass: ClassDefinition;
                /** Class of table cell when it's selected when type is month */
                monthCellSelectedClass: ClassDefinition;
                /** Class of the first selected table cell when in range when type is month */
                monthCellFirstSelectedClass: ClassDefinition;
                /** Class of the table cells within the range when the range is selected when type is month */
                monthCellWithinSelectedClass: ClassDefinition;
                /** Class of the last selected table cell during range selection when type is month */
                monthCellLastSelectedClass: ClassDefinition;
                /** Class of the first hovered table cell during range selection when type is month */
                monthCellFirstHoveredClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection when type is month */
                monthCellWithinHoveredClass: ClassDefinition;
                /** Class of the table cell when hovered during range selection and cell is in range when type is month */
                monthCellWithinHoveredRangeClass: ClassDefinition;
                /** Class of the last table cell hovered during range selection when type is month */
                monthCellLastHoveredClass: ClassDefinition;
                /** Class of the table cell of the current day when type is month */
                monthCellTodayClass: ClassDefinition;
                /** Class of the table cell that is selectable when type is month */
                monthCellSelectableClass: ClassDefinition;
                /** Class of the table cell that is unselectable when type is month */
                monthCellUnselectableClass: ClassDefinition;
                /**Class of the events container when type is month */
                monthCellEventsClass: ClassDefinition;
                /** Class of the Datepicker when on mobile */
                mobileClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Set custom day names, else use names based on locale */
                dayNames: string[];
                /** Set custom month names, else use names based on locale */
                monthNames: string[];
                /** Size of the control */
                size: string;
                /** Open dropdown on focus */
                openOnFocus: boolean;
                /** Close dropdown on click */
                closeOnClick: boolean;
                /** Custom function to format a date into a string */
                dateFormatter: (date: Date | Date[]) => string;
                /** Custom function to parse a string into a date */
                dateParser: (date: string) => Date;
                /** Date creator function, default is `new Date()` */
                dateCreator: () => Date;
                /** Define a list of weeks which can not be selected */
                unselectableDaysOfWeek: number[];
                /** Show nearby month days */
                nearbyMonthDays: boolean;
                /** Define if nearby month days can be selected */
                nearbySelectableMonthDays: boolean;
                /** Show weeek numbers */
                showWeekNumber: boolean;
                /** Define if weeek numbers are clickable */
                weekNumberClickable: boolean;
                /** Set the first day of a week */
                firstDayOfWeek: number;
                /** Define the range of years to show */
                yearsRange: number[];
                /** Trap dropdown on focus */
                trapFocus: boolean;
                /** Enable dropdown mobile modal */
                mobileModal: boolean;
                /** Enable mobile native input if mobile agent */
                mobileNative: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Icon name for previous icon */
                iconPrev: string;
                /** Icon name for next icon */
                iconNext: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /**  Append the component to another part of the DOM. */
                teleport: boolean | string;
                /** Accessibility next button aria label */
                ariaNextLabel: string;
                /** Accessibility previous button aria label  */
                ariaPreviousLabel: string;
                /** Class configuration for the internal input component */
                inputClasses: OrugaOptions["input"];
                /** Class configuration for the internal dropdown component */
                dropdownClasses: OrugaOptions["dropdown"];
                /** Class configuration for the internal select component */
                selectClasses: OrugaOptions["select"];
            }>;
    }
}
