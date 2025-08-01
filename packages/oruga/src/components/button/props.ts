import type { Booleanish, ComponentClass, DynamicComponent } from "@/types";

export type ButtonProps = {
    /** Override existing theme classes completely */
    override?: Booleanish;
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
} & ButtonClasses;

// class props (will not be displayed in the docs)
export type ButtonClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element when outlined */
    outlinedClass: ComponentClass;
    /** Class of the root element when inverted */
    invertedClass: ComponentClass;
    /** Class of the root element when loading */
    loadingClass: ComponentClass;
    /** Class of the root element when expanded */
    expandedClass: ComponentClass;
    /** Class of the root element when rounded */
    roundedClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the inner wrapper element */
    wrapperClass: ComponentClass;
    /** Class of the icon element */
    iconClass: ComponentClass;
    /** Class of the icon element on the left */
    iconLeftClass: ComponentClass;
    /** Class of the icon element on the right */
    iconRightClass: ComponentClass;
    /** Class of the label element */
    labelClass: ComponentClass;
}>;
