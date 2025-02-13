import type { ComponentClass } from "@/types";

export type RadioProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state, use v-model to make it two-way binding */
    modelValue?: T;
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Size of the control
     * @values small, medium, large
     */
    size?: string;
    /** Input label, unnecessary when default slot is used */
    label?: string;
    /** Same as native value */
    nativeValue?: T;
    /** Same as native disabled */
    disabled?: boolean;
    /** Same as native required */
    required?: boolean;
    /** Same as native name */
    name?: string;
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete?: string;
    /** Same as native id. Also set the for label for o-field wrapper - default is an uuid. */
    id?: string;
    /** Enable html 5 native validation */
    useHtml5Validation?: boolean;
    /** Custom HTML 5 validation error to set on the form control */
    customValidity?:
        | string
        | ((
              currentValue: T | null | undefined,
              state: ValidityState,
          ) => string);
} & RadioClasses;

// class props (will not be displayed in the docs)
type RadioClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class when radio is disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when checked */
    checkedClass: ComponentClass;
    /** Class of the native input element */
    inputClass: ComponentClass;
    /** Class of the native input element when checked */
    inputCheckedClass: ComponentClass;
    /** Class of the radio label */
    labelClass: ComponentClass;
    /** Class of the radio size */
    sizeClass: ComponentClass;
    /** Class of the radio variant */
    variantClass: ComponentClass;
}>;
