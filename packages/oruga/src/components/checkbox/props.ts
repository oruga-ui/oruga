import type { ComponentClass } from "@/types";

export type CheckboxProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state, use v-model to make it two-way binding */
    modelValue?: T | T[];
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
    /** Same as native indeterminate */
    indeterminate?: boolean;
    /** Same as native value */
    nativeValue?: T;
    /** Same as native disabled */
    disabled?: boolean;
    /** Same as native required */
    required?: boolean;
    /** Same as native name */
    name?: string;
    /** Overrides the returned value when it's checked */
    trueValue?: T;
    /** Overrides the returned value when it's not checked */
    falseValue?: T;
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete?: string;
    /** Same as native id. Also set the for label for o-field wrapper - default is an uuid. */
    id?: string;
    /** Enable HTML 5 native validation */
    useHtml5Validation?: boolean;
    /** Custom HTML 5 validation error to set on the form control */
    customValidity?:
        | string
        | ((
              currentValue: T | T[] | null | undefined,
              state: ValidityState,
          ) => string);
} & CheckboxClasses;

// class props (will not be displayed in the docs)
type CheckboxClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when checked */
    checkedClass: ComponentClass;
    /** Class of the the root element when indeterminate */
    indeterminateClass: ComponentClass;
    /** Class of the native input element */
    inputClass: ComponentClass;
    /** Class of the label element */
    labelClass: ComponentClass;
}>;
