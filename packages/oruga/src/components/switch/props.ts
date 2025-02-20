import type { ComponentClass } from "@/types";

export type SwitchProps<T> = {
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
     * Color of the switch when is passive
     * @values primary, info, success, warning, danger, and any other custom color
     */
    passiveVariant?: string;
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
    /** Name attribute on native checkbox */
    name?: string;
    /** Overrides the returned value when it's checked */
    trueValue?: T;
    /** Overrides the returned value when it's not checked */
    falseValue?: T;
    /** Rounded style */
    rounded?: boolean;
    /** Label position */
    position?: string;
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
} & SwitchClasses;

// class props (will not be displayed in the docs)
export type SwitchClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element with passive variant */
    passiveVariantClass: ComponentClass;
    /** Class of the root element with position */
    positionClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the native input element */
    inputClass: ComponentClass;
    /** Class of the native input element when checked */
    inputCheckedClass: ComponentClass;
    /** Class of the outer switch check element */
    switchClass: ComponentClass;
    /** Class of the outer switch check element when checked */
    switchCheckedClass: ComponentClass;
    /** Class of the switch check element when rounded */
    roundedClass: ComponentClass;
    /** Class of the inner switch check element */
    switchCheckClass: ComponentClass;
    /** Class of the switch label element */
    labelClass: ComponentClass;
}>;
