import type { Booleanish, ComponentClass, DynamicComponent } from "@/types";

export type IconProps = {
    /** Override existing theme classes completely */
    override?: Booleanish;
    /** Icon name */
    icon?: string;
    /** Icon component name */
    component?: DynamicComponent;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    pack?: string;
    /**
     * Color of the icon
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Icon size
     * @values small, medium, large
     */
    size?: string;
    /**
     * Overrides icon font size
     * @values Depends on library: null (smallest), fa-sm, fa-lg, fa-xl, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize?: string;
    /**
     * Add class to icon font.
     * See icon library documentation for custom classes.
     */
    customClass?: string;
    /** Makes the icon interactive by clicking and focusable */
    clickable?: boolean;
    /** Enable spin effect on icon */
    spin?: boolean;
    /** Rotation 0-360 */
    rotation?: number | string;
} & IconClasses;

// class props (will not be displayed in the docs)
export type IconClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element when clickable */
    clickableClass: ComponentClass;
    /** Class of the root element when spin */
    spinClass: ComponentClass;
}>;
