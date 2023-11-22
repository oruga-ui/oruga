import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

declare module "@/types" {
    interface OrugaOptions {
        menu?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the menu list */
                listClass: ClassDefinition;
                /** Class of the menu list label */
                listLabelClass: ClassDefinition;
                /** Class of the menu item */
                itemClass: ClassDefinition;
                /** Class of the active menu item */
                itemActiveClass: ClassDefinition;
                /** Class of the disabled menu item */
                itemDisabledClass: ClassDefinition;
                /** Class of the icon of menu item */
                itemIconTextClass: ClassDefinition;
                /** Class of the menu item when is a submenu */
                itemSubmenuClass: ClassDefinition;
                /** Class of the root element of menu item */
                itemWrapperClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /**  Role attribute to be passed to the list container for better accessibility */
                ariaRole: string;
                /**  Role attribute to be passed to the list item for better accessibility */
                itemAriaRole: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon size */
                iconSize: string;
                /** Transition name to apply on menu list */
                animation: string;
                /** Menu item tag name */
                tag: DynamicComponent;
            }>;
    }
}
