import type { ComponentClass } from "@/types";

export type SwitchProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The input value state
     * @type string|number|boolean|object
     */
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
    /**
     * Same as native value
     * @type string|number|boolean|object
     */
    nativeValue?: T;
    /** Same as native disabled */
    disabled?: boolean;
    /** Same as native required */
    required?: boolean;
    /** Name attribute on native checkbox */
    name?: string;
    /**
     * Overrides the returned value when it's checked
     * @type string|number|boolean|object
     */
    trueValue?: T | boolean;
    /**
     * Overrides the returned value when it's not checked
     * @type string|number|boolean|object
     */
    falseValue?: T | boolean;
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
type SwitchClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class when switch is disabled */
    disabledClass: ComponentClass;
    /** Class of the outer switch check */
    switchClass: ComponentClass;
    /** Class of the outer switch check when checked */
    switchCheckedClass: ComponentClass;
    /** Class of the inner switch check */
    switchCheckClass: ComponentClass;
    /** Class of the switch when rounded */
    roundedClass: ComponentClass;
    /** Class of the switch passive variant */
    passiveVariantClass: ComponentClass;
    /** Class of switch label position */
    positionClass: ComponentClass;
    /** Root class of the native input checkbox */
    inputClass: ComponentClass;
    /** Class of the native input element when checked */
    inputCheckedClass: ComponentClass;
    /** Class of the switch label */
    labelClass: ComponentClass;
    /** Class of the switch size */
    sizeClass: ComponentClass;
    /** Class of the switch variant */
    variantClass: ComponentClass;
}>;
