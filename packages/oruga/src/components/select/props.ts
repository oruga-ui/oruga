import type { ComponentClass } from "@/types";
import type { OptionsPropWithGroups } from "@/composables";

type ValueType<T, IsMultiple> = IsMultiple extends true ? T[] : T;

export type SelectProps<T, IsMultiple extends boolean = false> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state */
    modelValue?: ValueType<T, IsMultiple>;
    /** Allow multiple selection - converts the `modelValue` into an array */
    multiple?: IsMultiple;
    /** Select options, unnecessary when default slot is used */
    options?: OptionsPropWithGroups<T>;
    /**
     * Vertical size of input
     * @values small, medium, large
     */
    size?: string;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /** Text when nothing is selected */
    placeholder?: string;
    /** Disable the input - same as native disabled */
    disabled?: boolean;
    /** Same as native required */
    required?: boolean;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the element rounded */
    rounded?: boolean;
    /** Same as native size */
    nativeSize?: string | number;
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
    /** Same as native id. Also set the `for` label for o-field wrapper - default is an uuid. */
    id?: string;
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete?: string;
    /** Show status icon using field and variant prop */
    statusIcon?: boolean;
    /** Enable HTML 5 native validation */
    useHtml5Validation?: boolean;
    /** Custom HTML 5 validation error to set on the form control */
    customValidity?:
        | string
        | ((
              currentValue: ValueType<T, IsMultiple> | null | undefined,
              state: ValidityState,
          ) => string);
} & SelectClasses;

// class props (will not be displayed in the docs)
export type SelectClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root elelement with variant */
    rootVariantClass: ComponentClass;
    /** Class of the root element when expanded */
    expandedClass: ComponentClass;
    /** Class of the native select element */
    selectClass: ComponentClass;
    /** Class of the select element when multiple */
    multipleClass: ComponentClass;
    /** Class of the select element with size */
    sizeClass: ComponentClass;
    /** Class of the select element with variant */
    variantClass: ComponentClass;
    /** Class of the select element when disabled */
    disabledClass: ComponentClass;
    /** Class of the select element when rounded */
    roundedClass: ComponentClass;
    /** Class of the select element with anplaceholder */
    placeholderClass: ComponentClass;
    /** Class of the select element with an arrow */
    arrowedClass: ComponentClass;
    /** Class of the select element with left icon space */
    iconLeftSpaceClass: ComponentClass;
    /** Class of the select element with right icon space */
    iconRightSpaceClass: ComponentClass;
    /** Class of the left icon element */
    iconLeftClass: ComponentClass;
    /** Class of the right icon element */
    iconRightClass: ComponentClass;
}>;
