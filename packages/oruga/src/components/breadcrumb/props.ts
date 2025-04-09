import type { ComponentClass, DynamicComponent } from "@/types";

export type BreadcrumbProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * Size of the breadcrumb
     * @values small, medium, large
     */
    size?: string;
    /**
     * Position of the breadcrumb
     * @values left, centered, right
     */
    align?: string;
    /**
     * The breadcrumb separator between breadcrumb items
     * @values
     *  has-arrow-separator, has-dot-separator, has-slash-separator, has-bullet-separator, has-succeeds-separator, has-chevron-separator
     */
    separator?: string;
    /**
     * Tag of the breadcrumb
     * @values div, section ...
     */
    tag?: DynamicComponent;
} & BreadcrumbClasses;

export type BreadcrumbItemProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * breadcrumb item is active, works only when tag provided is a
     * @values true, false
     */
    active?: boolean;
    /**
     * Active color, works only when tag provided is a
     * @values primary, success, warning, danger
     */
    activeVariant?: string;
    /**
     * breadcrumb item tag name
     * @values li, a, router-link, nuxt-link (or other nuxt alias)
     */
    tag?: DynamicComponent;
    /**
     * breadcrumb item is disabled
     * @values true, false
     */
    disabled?: boolean;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon name to show on the left */
    iconLeft?: string;
    /** Icon name to show on the right */
    iconRight?: string;
    /**
     * This is used internally
     * @ignore
     */
    iconBoth?: boolean;
} & BreadcrumbItemClasses;

// class props (will not be displayed in the docs)
type BreadcrumbClasses = Partial<{
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the breadcrumb elements wrapper */
    wrapperClass: ComponentClass;
    /** Class of the breadcrumb size */
    sizeClass: ComponentClass;
    /** Class of the breadcrumb separator */
    separatorClass: ComponentClass;
    /** Class of the breadcrumb align */
    alignClass: ComponentClass;
}>;

// class props (will not be displayed in the docs)
type BreadcrumbItemClasses = Partial<{
    /** Class of the breadcrumb elements wrapper */
    wrapperClass: ComponentClass;
    /** Class of the breadcrumb icon */
    iconClass: ComponentClass;
    /** Class of the breadcrumb icon on the left */
    iconLeftClass: ComponentClass;
    /** Class of the breadcrumb icon on the right */
    iconRightClass: ComponentClass;
}>;
