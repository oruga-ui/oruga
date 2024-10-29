import type { ComponentClass } from "@/types";

// class props (will not be displayed in the docs)
export type ButtonClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the button elements wrapper */
    wrapperClass: ComponentClass;
    /** Class of the button when outlined */
    outlinedClass: ComponentClass;
    /** Class of the button with loading */
    loadingClass: ComponentClass;
    /** Class of the button when inverted */
    invertedClass: ComponentClass;
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
