import type { ComponentClass } from "@/types";
import type { DatepickerEvent } from "./types";
import type { SelectProps } from "../select/types";
import type { DropdownProps } from "../dropdown/types";
import type { InputProps } from "../input/types";

type DatepickerType<IsRange, IsMultiple> = IsRange extends true
    ? [Date, Date] | Date[]
    : IsMultiple extends true
      ? Date[]
      : Date;

export type DatepickerProps<
    IsRange extends boolean = false,
    IsMultiple extends boolean = false,
> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state */
    modelValue?: DatepickerType<IsRange, IsMultiple>;
    /** Enable date range selection */
    range?: IsRange;
    /** Same as native, also push new item to v-model instead of replacing */
    multiple?: IsMultiple;
    /** The active state of the dropdown, use v-model:active to make it two-way binding */
    active?: boolean;
    /**
     * Define picker mode
     * @values date, month
     */
    type?: "month" | "date";
    /** Set custom day names, else use names based on locale */
    dayNames?: string[];
    /** Set custom month names, else use names based on locale */
    monthNames?: string[];
    /**
     * Size of the control input
     * @values small, medium, large
     */
    size?: string;
    /** Set default date to focus on */
    focusedDate?: Date;
    /** Events to display on picker */
    events?: DatepickerEvent[];
    /** Event indicators for style class definiton */
    indicators?: string;
    /** Min date to select */
    minDate?: Date;
    /** Max date to select */
    maxDate?: Date;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the input rounded */
    rounded?: boolean;
    /** Display datepicker inline */
    inline?: boolean;
    /** Input placeholder */
    placeholder?: string;
    /** Same as native input readonly */
    readonly?: boolean;
    /** Same as native disabled */
    disabled?: boolean;
    /** Open dropdown on focus */
    openOnFocus?: boolean;
    /** Close dropdown on click */
    closeOnClick?: boolean;
    /** Date format locale */
    locale?: string;
    /** Custom function to format a date into a string */
    dateFormatter?: (
        date: DatepickerProps<IsRange, IsMultiple>["modelValue"],
    ) => string;
    /** Custom function to parse a string into a date */
    dateParser?: (
        date: string,
    ) => DatepickerProps<IsRange, IsMultiple>["modelValue"];
    /** Date creator function, default is `new Date()` */
    dateCreator?: () => Date;
    /** Define a list of dates which can be selected */
    selectableDates?: Date[] | ((date: Date) => boolean);
    /** Define a list of dates which can not be selected */
    unselectableDates?: Date[] | ((date: Date) => boolean);
    /** Define a list of weeks which can not be selected */
    unselectableDaysOfWeek?: number[];
    /** Show nearby month days */
    nearbyMonthDays?: boolean;
    /** Define if nearby month days can be selected */
    nearbySelectableMonthDays?: boolean;
    /** Show week numbers */
    showWeekNumber?: boolean;
    /** Define if week numbers are clickable */
    weekNumberClickable?: boolean;
    /** Set the first day of a week */
    firstDayOfWeek?: number;
    /** Rules for the first week - 1 for the 1st January, 4 for the 4th January */
    rulesForFirstWeek?: number;
    /** Define the range of years to show */
    yearsRange?: number[];
    /** Trap dropdown on focus */
    trapFocus?: boolean;
    /**
     * Position of the dropdown relative to the input
     * @values auto, top, bottom, left, right, top-right, top-left, bottom-left, bottom-right
     */
    position?:
        | "auto"
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "top-right"
        | "top-left"
        | "bottom-left"
        | "bottom-right";
    /** Enable dropdown mobile modal */
    mobileModal?: boolean;
    /** Enable mobile native input if mobile agent */
    mobileNative?: boolean;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon to be shown */
    icon?: string;
    /** Icon to be added on the right side */
    iconRight?: string;
    /** Make the icon right clickable */
    iconRightClickable?: boolean;
    /** Icon name for previous icon */
    iconPrev?: string;
    /** Icon name for next icon */
    iconNext?: string;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
    /** Enable HTML 5 native validation */
    useHtml5Validation?: boolean;
    /** Custom HTML 5 validation error to set on the form control */
    customValidity?:
        | string
        | ((
              currentValue:
                  | DatepickerType<IsRange, IsMultiple>
                  | null
                  | undefined,
              state: ValidityState,
          ) => string);
    /** Accessibility next button aria label */
    ariaNextLabel?: string;
    /** Accessibility previous button aria label  */
    ariaPreviousLabel?: string;
} & DatepickerClasses;

// class props (will not be displayed in the docs)
type DatepickerClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the Datepicker size */
    sizeClass: ComponentClass;
    /** Class of the Datepicker box where you choose the date */
    boxClass: ComponentClass;
    /** Class of the Datepicker header inside the box */
    headerClass: ComponentClass;
    /** Class of the Datepicker buttons inside the box */
    headerButtonsClass: ComponentClass;
    /** Class of the Datepicker buttons inside the box when a size is choosen */
    headerButtonsSizeClass: ComponentClass;
    /** Class of the prev button inside the Datepicker box */
    prevButtonClass: ComponentClass;
    /** Class of the next button inside the Datepicker box */
    nextButtonClass: ComponentClass;
    /** Class of the month and year selects container inside the Datepicker box */
    listsClass: ComponentClass;
    /** Class of the Datepicker footer */
    footerClass: ComponentClass;
    /** Class of the Datepicker table inside the box */
    tableClass: ComponentClass;
    /** Class of Datepicker header with days of the week inside the table */
    tableHeadClass: ComponentClass;
    /** Class of the cell inside the table header */
    tableHeadCellClass: ComponentClass;
    /** Class of the table body inside the box */
    tableBodyClass: ComponentClass;
    /** Class of the table row */
    tableRowClass: ComponentClass;
    /** Class of the table cell */
    tableCellClass: ComponentClass;
    /** Class of the table cell when nearby month days are hidden */
    tableCellInvisibleClass: ComponentClass;
    /** Class of table cell when it's selected */
    tableCellSelectedClass: ComponentClass;
    /** Class of the first selected table cell when in range */
    tableCellFirstSelectedClass: ComponentClass;
    /** Class of the table cells within the range when the range is selected */
    tableCellWithinSelectedClass: ComponentClass;
    /** Class of the last selected table cell during range selection */
    tableCellLastSelectedClass: ComponentClass;
    /** Class of the first hovered table cell during range selection */
    tableCellFirstHoveredClass: ComponentClass;
    /** Class of the table cell when hovered during range selection */
    tableCellWithinHoveredClass: ComponentClass;
    /** Class of the last table cell hovered during range selection */
    tableCellLastHoveredClass: ComponentClass;
    /** Class of the table cell of the current day */
    tableCellTodayClass: ComponentClass;
    /** Class of the table cell that is selectable */
    tableCellSelectableClass: ComponentClass;
    /** Class of the table cell that is unselectable */
    tableCellUnselectableClass: ComponentClass;
    /** Class of the table cell when nearby days (prev/next month) are selectable */
    tableCellNearbyClass: ComponentClass;
    /** Class of the cell of a row when at least one event is present */
    tableCellEventsClass: ComponentClass;
    /** Class of the events container */
    tableEventsClass: ComponentClass;
    /** Class of the event */
    tableEventClass: ComponentClass;
    /** Class of the event indicator when a `variant` is specified */
    tableEventVariantClass: ComponentClass;
    /** Class of the event indicator */
    tableEventIndicatorsClass: ComponentClass;
    /** Class of the Datepicker table inside the box when type is month */
    monthClass: ComponentClass;
    /** Class of the table body inside the box when type is month */
    monthBodyClass: ComponentClass;
    /** Class of the table container when type is month */
    monthTableClass: ComponentClass;
    /** Class of the table cell when type is month */
    monthCellClass: ComponentClass;
    /** Class of table cell when it's selected when type is month */
    monthCellSelectedClass: ComponentClass;
    /** Class of the first selected table cell when in range when type is month */
    monthCellFirstSelectedClass: ComponentClass;
    /** Class of the table cells within the range when the range is selected when type is month */
    monthCellWithinSelectedClass: ComponentClass;
    /** Class of the last selected table cell during range selection when type is month */
    monthCellLastSelectedClass: ComponentClass;
    /** Class of the first hovered table cell during range selection when type is month */
    monthCellWithinHoveredRangeClass: ComponentClass;
    /** Class of the table cell when hovered during range selection when type is month */
    monthCellFirstHoveredClass: ComponentClass;
    /** Class of the table cell when hovered during range selection and cell is in range when type is month */
    monthCellWithinHoveredClass: ComponentClass;
    /** Class of the last table cell hovered during range selection when type is month */
    monthCellLastHoveredClass: ComponentClass;
    /** Class of the table cell of the current day when type is month */
    monthCellTodayClass: ComponentClass;
    /** Class of the table cell that is selectable when type is month */
    monthCellSelectableClass: ComponentClass;
    /** Class of the table cell that is unselectable when type is month */
    monthCellUnselectableClass: ComponentClass;
    /**Class of the events container when type is month */
    monthCellEventsClass: ComponentClass;
    /** Class of the Datepicker when on mobile */
    mobileClass: ComponentClass;
    /** Class for the underlaying dropdown component */
    dropdownClass: ComponentClass;
    /** Class for the HTML input element */
    inputClass: ComponentClass;
    /**
     * Class configuration for the internal input component
     * @ignore
     */
    inputClasses: InputProps;
    /**
     * Class configuration for the internal dropdown component
     * @ignore
     */
    dropdownClasses: DropdownProps;
    /**
     * Class configuration for the internal select component
     * @ignore
     */
    selectClasses: SelectProps;
}>;
