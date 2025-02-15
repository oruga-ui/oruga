import type { ComponentClass } from "@/types";
import type { DatepickerProps } from "../datepicker/props";
import type { TimepickerProps } from "../timepicker/props";

export type DatetimepickerProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state */
    modelValue?: Date;
    /** The active state of the dropdown, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Define props for the underlying datepicker component */
    datepicker?: DatepickerProps;
    /** Define props for the underlying timepicker component */
    timepicker?: TimepickerProps;
    /** Min date to select */
    minDatetime?: Date;
    /** Max date to select */
    maxDatetime?: Date;
    /**
     * Size of the input control
     * @values small, medium, large
     */
    size?: string;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the input rounded */
    rounded?: boolean;
    /** Input placeholder */
    placeholder?: string;
    /** Same as native input readonly */
    readonly?: boolean;
    /** Same as native disabled */
    disabled?: boolean;
    /** Display datetimepicker inline */
    inline?: boolean;
    /** Open dropdown on focus */
    openOnFocus?: boolean;
    /** Date format locale */
    locale?: string;
    /** Custom function to format a date into a string */
    formatter?: (date: DatetimepickerProps["modelValue"]) => string;
    /** Custom function to parse a string into a date */
    parser?: (date: string) => DatetimepickerProps["modelValue"];
    /** Date creator function, default is `new Date()` */
    creator?: () => Date;
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
    /** Enable mobile native input if mobile agent */
    mobileNative?: boolean;
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
              currentValue: Date | null | undefined,
              state: ValidityState,
          ) => string);
} & DatetimePickerClasses;

// class props (will not be displayed in the docs)
export type DatetimePickerClasses = Partial<{
    /** Class of the Datepicker wrapper */
    datepickerWrapperClass: ComponentClass;
    /** Class of the Timepicker wrapper */
    timepickerWrapperClass: ComponentClass;
}>;
