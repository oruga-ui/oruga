import type { ComponentClass, DynamicComponent, OptionsProp } from "@/types";

export type BreadcrumbProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** breadcrumb items, unnecessary when default slot is used */
    options?: OptionsProp<never>;
    /**
     * Size of the breadcrumb
     * @values small, medium, large
     */
    size?: string;
    /**
     * Color variant of the breadcrumb
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /**
     * Position of the breadcrumb
     * @values left, centered, right
     */
    align?: string;
    /** The separator between breadcrumb items */
    separator?: string;
    /** Accessibility aria-label to be passed to the nav wrapper element */
    ariaLabel?: string;
} & BreadcrumbClasses;

// class props (will not be displayed in the docs)
export type BreadcrumbClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element with size */
    sizeClass: ComponentClass;
    /** Class of the root element with variant */
    variantClass: ComponentClass;
    /** Class of the root element with alignment */
    alignClass: ComponentClass;
    /** Class of the list element */
    listClass: ComponentClass;
}>;

export type BreadcrumbItemProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Item label, unnecessary when default slot is used */
    label?: string;
    /** Whether item is active or not */
    active?: boolean;
    /** Item is disabled */
    disabled?: boolean;
    /** Define whether the item is visible or not */
    hidden?: boolean;
    /** Icon name to show on the left */
    iconLeft?: string;
    /** Icon name to show on the right */
    iconRight?: string;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize?: string;
    /**
     * Item tag name
     * @values li, a, router-link, nuxt-link (or other nuxt alias)
     */
    tag?: DynamicComponent;
} & BreadcrumbItemClasses;

// class props (will not be displayed in the docs)
export type BreadcrumbItemClasses = Partial<{
    /** Class of the item element */
    itemClass: ComponentClass;
    /** Class of the item element when disabled */
    disabledClass: ComponentClass;
    /** Class of the item element when active */
    activeClass: ComponentClass;
    /** Class of the seperator element */
    seperatorClass: ComponentClass;
    /** Class of the link element */
    linkClass: ComponentClass;
    /** Class of the icon element */
    iconClass: ComponentClass;
    /** Class of the left icon element */
    iconLeftClass: ComponentClass;
    /** Class of the right icon element */
    iconRightClass: ComponentClass;
}>;
