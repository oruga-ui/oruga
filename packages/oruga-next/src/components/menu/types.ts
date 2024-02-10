import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        menu?: ComponentConfigBase &
            Partial<{
                /** Icon pack to use */
                iconPack: string;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Icon size */
                iconSize: string;
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: string;
                /** Class of the menu list */
                listClass: ClassDefinition;
                /** Class of the menu list label */
                listLabelClass: ClassDefinition;
                /** Transition name to apply on menu list */
                animation: string;
                /** Class of the menu item */
                itemClass: ClassDefinition;
                /** Menu item tag name */
                menuTag: DynamicComponent;
                /** Role attribute to be passed to the list item for better accessibility. */
                itemAriaRole: string;
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
            }>;
    }
}
