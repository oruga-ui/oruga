import type { ComponentClass } from "@/types";
import type { SelectProps } from "../select/props";
import type { InputProps } from "../input/props";

export type TimepickerProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state, use v-model to make it two-way binding */
    modelValue?: Date;
    /** The active state of the dropdown */
    active?: boolean;
    /** The picker stays open after date got picked */
    stayOpen?: boolean;
    /** Open picker on focus */
    openOnFocus?: boolean;
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
    /**
     * Position of the popover relative to the input
     * @values auto, top, bottom, left, right, center
     */
    position?: "top" | "bottom" | "left" | "right" | "center";
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
    /** Picker content is shown into a modal on mobile */
    mobileModal?: boolean;
    /** Picker content is shown into a modal on desktop */
    desktopModal?: boolean;
    /** Enable mobile native input if mobile agent */
    mobileNative?: boolean;
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
    /** Accessibility seconds select aria label */
    ariaSelectSecondsLabel?: string;
    /** Accessibility minutes select aria label */
    ariaSelectMinutesLabel?: string;
    /** Accessibility hours select aria label */
    ariaSelectHoursLabel?: string;
} & TimepickerClasses;

// class props (will not be displayed in the docs)
export type TimepickerClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when expanded */
    expandedClass: ComponentClass;
    /** Class of the root element when inlined */
    inlineClass: ComponentClass;
    /** Class for the root element when active or inline */
    activeClass: ComponentClass;
    /** Class of the root element component size */
    sizeClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the content container element where you choose the date */
    contentClass: ComponentClass;
    /** Class of the content element when active or inline */
    contentActiveClass: ComponentClass;
    /** Class of the content element when shown as modal */
    contentModalClass: ComponentClass;
    /** Class of the content element when should has a backdrop */
    contentBackdropClass: ComponentClass;
    /** Class of the select separator element */
    separatorClass: ComponentClass;
    /** Class of the footer element */
    footerClass: ComponentClass;
    /** Class for the HTML input element */
    inputClass: ComponentClass;
    /**
     * Class configuration for the internal input component
     * @ignore
     */
    inputAttrs: InputProps<false>;
    /**
     * Class of the HTML select element
     * @ignore
     */
    selectClass: ComponentClass;
    /**
     * Class configuration for the internal select component
     * @ignore
     */
    selectAttrs: SelectProps<number | string, false>;
}>;
