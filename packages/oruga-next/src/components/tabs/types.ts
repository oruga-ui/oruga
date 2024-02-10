import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        tabs?: ComponentConfigBase &
            Partial<{
                /** Icon pack */
                iconPack: string;
                /** Icon on the left */
                icon: string;
                /** Class of the tab item */
                itemClass: ClassDefinition;
                /** Class of the tab item header */
                itemHeaderClass: ClassDefinition;
                /** Tabs item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
                /** Sets a class to the item header */
                headerClass: string;
                /** Class of the tab item header when active */
                itemHeaderActiveClass: ClassDefinition;
                /** Class of the tab item header when disabled */
                itemHeaderDisabledClass: ClassDefinition;
                /** Class of the tab item header type */
                itemHeaderTypeClass: ClassDefinition;
                /** Class of the tab item header icon */
                itemHeaderIconClass: ClassDefinition;
                /** Class of the tab item header text */
                itemHeaderTextClass: ClassDefinition;
                /** Tab size */
                size: string;
                /** Tab type */
                type: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Color of the control */
                variant: string;
                /** Class of Tabs component when expanded */
                expandedClass: ClassDefinition;
                /** Class of the tab content */
                contentClass: ClassDefinition;
                /** Class of the tab item wrapper */
                itemWrapperClass: ClassDefinition;
                /** Class of Tabs component when when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Tab will have an animation */
                animated: boolean;
                /** Show tab in vertical layout */
                vertical: boolean;
                /** Class of Tabs component when vertical */
                verticalClass: ClassDefinition;
                /** Class of Tabs component when multiline */
                multilineClass: ClassDefinition;
                /** Class of the Tabs component nav tabs */
                navTabsClass: ClassDefinition;
                /** Size of the navigation */
                navSizeClass: ClassDefinition;
                /** Class of the Tabs component nav position */
                navPositionClass: ClassDefinition;
                /** Type of the navigation */
                navTypeClass: ClassDefinition;
                /** Class of the tab content when transitioning */
                transitioningClass: ClassDefinition;
            }>;
    }
}
