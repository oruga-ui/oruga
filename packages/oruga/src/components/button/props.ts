import type { ComponentClass, DynamicComponent } from "@/types";

export type ButtonProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag?: DynamicComponent;
    /**
     * Color variant of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Size of the control
     * @values small, medium, large
     */
    size?: string;
    /** Button label, unnecessary when default slot is used */
    label?: string;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon name to show on the left */
    iconLeft?: string;
    /** Icon name to show on the right */
    iconRight?: string;
    /** Enable rounded style */
    rounded?: boolean;
    /** Button will be expanded (full-width) */
    expanded?: boolean;
    /** Button will be disabled */
    disabled?: boolean;
    /** Enable outlined style */
    outlined?: boolean;
    /** Enable loading style */
    loading?: boolean;
    /** Enable inverted style */
    inverted?: boolean;
    /**
     * Button type, like native
     * @values button, submit, reset
     */
    type?: "button" | "submit" | "reset";
    /**
     * This is used internally
     * @ignore
     */
    iconBoth?: boolean;
} & ButtonClasses;

// class props (will not be displayed in the docs)
export type ButtonClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the button elements wrapper */
    wrapperClass: ComponentClass;
    /** Class of the button when outlined */
    outlinedClass: ComponentClass;
    /** Class of the button when inverted */
    invertedClass: ComponentClass;
    /** Class of the button with loading */
    loadingClass: ComponentClass;
    /** Class of the button when expanded */
    expandedClass: ComponentClass;
    /** Class of the button when rounded */
    roundedClass: ComponentClass;
    /** Class of the button when disabled */
    disabledClass: ComponentClass;
    /** Class of the button icon */
    iconClass: ComponentClass;
    /** Class of the button icon on the left */
    iconLeftClass: ComponentClass;
    /** Class of the button icon on the right */
    iconRightClass: ComponentClass;
    /** Class of the button label */
    labelClass: ComponentClass;
    /** Class of the button size */
    sizeClass: ComponentClass;
    /** Class of the button variant */
    variantClass: ComponentClass;
}>;
