import type { ComponentClass } from "@/types";

export type InputType<IsNumber extends boolean> = IsNumber extends true
    ? number
    : string;

export type InputProps<IsNumber extends boolean> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The input value state
     * @type string | number
     */
    modelValue?: InputType<IsNumber>;
    /**
     * Convert the ´modelValue` into type `number`
     * @type boolean
     */
    number?: IsNumber;
    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type?: string;
    /**
     * Size of the control
     * @values small, medium, large
     */
    size?: string;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /** Input placeholder */
    placeholder?: string;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the element rounded */
    rounded?: boolean;
    /** Same as native disabled */
    disabled?: boolean;
    /** Adds the reveal password functionality */
    passwordReveal?: boolean;
    /** Same as native maxlength, plus character counter */
    maxlength?: number | string;
    /** Show character counter when maxlength prop is passed */
    counter?: boolean;
    /** Automatically adjust height in textarea */
    autosize?: boolean;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon to be shown */
    icon?: string;
    /** Makes the icon clickable */
    iconClickable?: boolean;
    /** Icon to be added on the right side */
    iconRight?: string;
    /** Make the icon right clickable */
    iconRightClickable?: boolean;
    /** Variant of right icon */
    iconRightVariant?: string;
    /** Add a button/icon to clear the inputed text */
    clearable?: boolean;
    /** Icon name to be added on the clear button */
    clearIcon?: string;
    /** Show status icon using field and variant prop */
    statusIcon?: boolean;
    /** Number of milliseconds to delay before to emit input event */
    debounce?: number;
    /** Native options to use in HTML5 validation */
    autocomplete?: string;
    /** Same as native id. Also set the for label for o-field wrapper - default is an uuid. */
    id?: string;
    /** Enable HTML 5 native validation */
    useHtml5Validation?: boolean;
    /** Custom HTML 5 validation error to set on the form control */
    customValidity?:
        | string
        | ((
              currentValue: InputType<IsNumber> | null | undefined,
              state: ValidityState,
          ) => string);
} & InputClasses;

// class props (will not be displayed in the docs)
type InputClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element when expanded */
    expandedClass: ComponentClass;
    /** Class of the root element when rounded */
    roundedClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when type `textarea` */
    textareaClass: ComponentClass;
    /** Class to the root element when has a right icon */
    hasIconRightClass: ComponentClass;
    /** Class of the native input element */
    inputClass: ComponentClass;
    /** Class of the native input element with left icon space */
    iconLeftSpaceClass: ComponentClass;
    /** Class of the native input element with right icon space */
    iconRightSpaceClass: ComponentClass;
    /** Class of the native input element with placeholder */
    placeholderClass: ComponentClass;
    /** Class of the left icon element */
    iconLeftClass: ComponentClass;
    /** Class of the right icon element */
    iconRightClass: ComponentClass;
    /** Class of the counter element */
    counterClass: ComponentClass;
}>;
