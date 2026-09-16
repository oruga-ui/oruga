import type { ComponentClass } from "@/types";
import type { AriaAttributes, InputHTMLAttributes } from "vue";

/**
 * Native HTML input attributes passed through as fallthrough attrs
 * (not compiled as reactive Vue props). Applied via `@vue-ignore` in `defineProps`.
 */
export type HTMLSwitchPassthroughProps = {
    /** Same as native required */
    required?: InputHTMLAttributes["required"];
    /** Same as native name */
    name?: InputHTMLAttributes["name"];
    /** Same as native form */
    form?: InputHTMLAttributes["form"];
} & AriaAttributes;

export type SwitchProps<T> = HTMLSwitchPassthroughProps & {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The input value state, use v-model to make it two-way binding */
    modelValue?: T;
    /**
     * Color variant of the control
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
    /** Overrides the returned value when it's checked */
    trueValue?: T;
    /** Overrides the returned value when it's not checked */
    falseValue?: T;
    /** Enable rounded style */
    rounded?: boolean;
    /** Label position */
    position?: string;
    /** Same as native id. Also pass the id to a wrapping `o-field` component. Default is a uuid. */
    id?: string;
    /**
     * Native options to use in HTML5 validation,
     * whether the value of the form's controls can be automatically completed by the browser.
     */
    autocomplete?: string;
    /** Enable HTML 5 native validation */
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
    /** Class of the root element when rounded */
    roundedClass: ComponentClass;
    /** Class of the root element when checked */
    checkedClass: ComponentClass;
    /** Class of the native input element */
    inputClass: ComponentClass;
    /** Class of the label element */
    labelClass: ComponentClass;
}>;
