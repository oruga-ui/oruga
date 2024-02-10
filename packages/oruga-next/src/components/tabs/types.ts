import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        tabs?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of Tabs component when when is vertical and its position changes */
                positionClass: ClassDefinition;
                /** Class of Tabs component when expanded */
                expandedClass: ClassDefinition;
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
                /** Class of the tab content */
                contentClass: ClassDefinition;
                /** Class of the tab content when transitioning */
                transitioningClass: ClassDefinition;
                /** Class of the tab item wrapper */
                itemWrapperClass: ClassDefinition;
                /** Class of the tab item */
                itemClass: ClassDefinition;
                /** Class of the tab item header */
                itemHeaderClass: ClassDefinition;
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
            }> &
            /** component props config definition */
            Partial<{
                /** Position of the tabs */
                position: string;
                /** Tab size */
                size: string;
                /** Color of the control */
                variant: string;
                /** Show tab in vertical layout */
                vertical: boolean;
                /** Tab will have an animation */
                animated: string;
                /** Tab type */
                type: string;
                /** Icon on the left */
                icon: string;
                /** Icon pack */
                iconPack: string;
                /** Tabs item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the div wrapper for better accessibility. */
                ariaRole: string;
            }>;
    }
}
