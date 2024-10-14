import type { ComponentClass } from "@/types";
import type { SelectProps } from "../select/types";
import type { DropdownProps } from "../dropdown/types";
import type { InputProps } from "../input/types";

export type TimepickerProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state */
    modelValue?: Date;
    /** The active state of the dropdown */
    active?: boolean;
    /** Min time to select */
    minTime?: Date;
    /** Max time to select */
    maxTime?: Date;
    /** Display datepicker inline */
    inline?: boolean;
    /** Input placeholder */
    placeholder?: string;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the input rounded */
    rounded?: boolean;
    /** Same as native input readonly */
    readonly?: boolean;
    /** Same as native disabled */
    disabled?: boolean;
    /**
     * Size of the button
     * @values small, medium, large
     */
    size?: string;
    hourFormat?: "12" | "24" | 12 | 24;
    incrementHours?: number;
    incrementMinutes?: number;
    incrementSeconds?: number;
    /** Open dropdown on focus */
    openOnFocus?: boolean;
    /** Close dropdown on click */
    closeOnClick?: boolean;
    enableSeconds?: boolean;
    defaultMinutes?: number;
    defaultSeconds?: number;
    /** Date format locale */
    locale?: string;
    /** Custom function to format a date into a string */
    formatter?: (date: TimepickerProps["modelValue"]) => string;
    /** Custom function to parse a string into a date */
    parser?: (date: string) => TimepickerProps["modelValue"];
    /** time creator function, default is `new Date()` */
    creator?: () => Date;
    /** Define a list of times which can not be selected */
    unselectableTimes?: Date[] | ((date: Date) => boolean);
    /** Reset the time inputs when meridian changes */
    resetOnMeridianChange?: boolean;
    /** Dropdown trapFocus */
    trapFocus?: boolean;
    /** Dropdown position */
    position?: string;
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
              currentValue: Date | null | undefined,
              state: ValidityState,
          ) => string);
} & TimepickerClasses;

// class props (will not be displayed in the docs)
type TimepickerClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the Timepicker component size */
    sizeClass: ComponentClass;
    /** Class of the Timepicker component box where you choose the date */
    boxClass: ComponentClass;
    /** Class of the Timepicker separator */
    separatorClass: ComponentClass;
    /** Class of the Timepicker footer */
    footerClass: ComponentClass;
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
