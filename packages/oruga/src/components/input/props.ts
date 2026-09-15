import type { ComponentClass } from "@/types";
import type {
    AriaAttributes,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from "vue";

export type InputType<IsNumber extends boolean> = IsNumber extends true
    ? number
    : string;

/**
 * Native HTML input attributes passed through as fallthrough attrs
 * (not compiled as reactive Vue props). Applied via `@vue-ignore` in `defineProps`.
 * `maxlength` and `autocomplete` are intentionally excluded — they are managed
 * as regular Vue props because the component reads them programmatically.
 */
export type HTMLInputPassthroughProps = {
    /** Same as native placeholder */
    placeholder?: InputHTMLAttributes["placeholder"];
    /** Same as native required */
    required?: InputHTMLAttributes["required"];
    /** Same as native readonly */
    readonly?: InputHTMLAttributes["readonly"];
    /** Same as native name */
    name?: InputHTMLAttributes["name"];
    /** Same as native min */
    min?: InputHTMLAttributes["min"];
    /** Same as native max */
    max?: InputHTMLAttributes["max"];
    /** Same as native pattern */
    pattern?: InputHTMLAttributes["pattern"];
    /** Same as native title */
    title?: InputHTMLAttributes["title"];
    /** Same as native minlength */
    minlength?: InputHTMLAttributes["minlength"];
    /** Same as native translate */
    translate?: InputHTMLAttributes["translate"];
    /** Same as native step */
    step?: InputHTMLAttributes["step"];
    /** Same as native inputmode */
    inputmode?: InputHTMLAttributes["inputmode"];
    /** Same as native enterkeyhint */
    enterkeyhint?: InputHTMLAttributes["enterkeyhint"];
    /** Same as native list */
    list?: InputHTMLAttributes["list"];
    /** Same as native form */
    form?: InputHTMLAttributes["form"];
    /** Same as native rows (textarea only) */
    rows?: TextareaHTMLAttributes["rows"];
    /** Same as native cols (textarea only) */
    cols?: TextareaHTMLAttributes["cols"];
    /** Same as native wrap (textarea only) */
    wrap?: TextareaHTMLAttributes["wrap"];
} & AriaAttributes;

export type InputProps<IsNumber extends boolean = boolean> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Same as native id. Also pass the id to a wrapping `o-field` component. Default is a uuid. */
    id?: string;
    /**
     * The input value state, use v-model to make it two-way binding
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
     * Color variant of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /** Number of milliseconds to delay before the value get emitted */
    debounce?: number;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the element rounded */
    rounded?: boolean;
    /** Same as native disabled */
    disabled?: boolean;
    /** Adds the reveal password functionality */
    passwordReveal?: boolean;
    /** Show character counter when maxlength prop is passed */
    counter?: boolean;
    /** Automatically adjust height in textarea */
    autosize?: boolean;
    /** Same as native maxlength. Also used to show character counter when `counter` prop is enabled. */
    maxlength?: number | string;
    /**
     * Native options to use in HTML5 validation,
     * whether the value of the form's controls can be automatically completed by the browser.
     */
    autocomplete?: string;
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
export type InputClasses = Partial<{
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
