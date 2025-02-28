import type { ComponentClass } from "@/types";

export type BreadcrumbProps<> = {
    /** Override existing theme classes completely */
    override?: boolean;
} & BreadcrumbClasses;

export type BreadcrumbItemProps<> = {
    /** Override existing theme classes completely */
    override?: boolean;
} & BreadcrumbItemClasses;

// class props (will not be displayed in the docs)
type BreadcrumbClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class when radio is disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when checked */
    checkedClass: ComponentClass;
    /** Class of the native input element */
    inputClass: ComponentClass;
    /** Class of the native input element when checked */
    inputCheckedClass: ComponentClass;
    /** Class of the radio label */
    labelClass: ComponentClass;
    /** Class of the radio size */
    sizeClass: ComponentClass;
    /** Class of the radio variant */
    variantClass: ComponentClass;
}>;

// class props (will not be displayed in the docs)
type BreadcrumbItemClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class when radio is disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when checked */
    checkedClass: ComponentClass;
    /** Class of the native input element */
    inputClass: ComponentClass;
    /** Class of the native input element when checked */
    inputCheckedClass: ComponentClass;
    /** Class of the radio label */
    labelClass: ComponentClass;
    /** Class of the radio size */
    sizeClass: ComponentClass;
    /** Class of the radio variant */
    variantClass: ComponentClass;
}>;
