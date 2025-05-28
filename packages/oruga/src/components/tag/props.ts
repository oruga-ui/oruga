import type { ComponentClass } from "@/types";

export type TagProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Tag label, unnecessary when default slot is used */
    label?: string;
    /**
     * Color variant of the breadcrumb
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Size of the control
     * @values small, medium, large
     */
    size?: string;
    /** Enable badge style */
    badge?: boolean;
    /** Enable rounded style */
    rounded?: boolean;
    /** The tag element will react to the hover states */
    hoverable?: boolean;
    /** Adds an icon to the left of the tag. */
    icon?: string;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Add close/delete button to the item */
    closeable?: boolean;
    /** Close icon name */
    closeIcon?: string;
    /**
     * Icon pack to use for the close icon
     * @values mdi, fa, fas and any other custom icon pack
     */
    closeIconPack?: string;
    /** Accessibility label for the close button */
    ariaCloseLabel?: string;
} & TagClasses;

// class props (will not be displayed in the docs)
export type TagClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element when badge style */
    badgeClass: ComponentClass;
    /** Class of the root element when rounded */
    roundedClass: ComponentClass;
    /** Class of the root element when hoverable */
    hoverableClass: ComponentClass;
    /** Class of the label element */
    labelClass: ComponentClass;
    /** Class of the icon element to the left of the tag */
    iconClass: ComponentClass;
    /** Class of the tag item close button element */
    closeClass: ComponentClass;
}>;
