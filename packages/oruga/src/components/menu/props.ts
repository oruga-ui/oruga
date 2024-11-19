import type { ComponentClass, DynamicComponent } from "@/types";

export type MenuProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Menu label */
    label?: string;
    /** If sub menu items are collapsible */
    accordion?: boolean;
    /** If the menu items are clickable */
    activable?: boolean;
    /**
     * Role attribute to be passed to the list container for better accessibility.
     * Use menu only in situations where your dropdown is related to a navigation menu.
     * @values list, menu, dialog
     */
    ariaRole?: "menu" | "list" | "dialog";
    /** Icon to be shown */
    icon?: string;
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
} & MenuClasses;

// class props (will not be displayed in the docs)
type MenuClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the menu list */
    listClass: ComponentClass;
    /** Class of the menu list label */
    listLabelClass: ComponentClass;
}>;

export type MenuItemProps = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The active state of the menu item, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Menu item label */
    label?: string;
    /** Menu item will be expanded */
    expanded?: boolean;
    /** Menu item will be disabled */
    disabled?: boolean;
    /** Icon to be shown */
    icon?: string;
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
    /** Transition name to apply on menu list */
    animation?: string;
    /** Menu item tag name */
    tag?: DynamicComponent;
    /**
     * Role attribute to be passed to the list item for better accessibility.
     * @values listitem, menuitem
     */
    ariaRole?: string;
} & MenuItemClasses;

// class props (will not be displayed in the docs)
type MenuItemClasses = Partial<{
    /** Class of the root element of menu item */
    itemClass: ComponentClass;
    /** Class of the menu item */
    itemButtonClass: ComponentClass;
    /** Class of the active menu item */
    itemButtonActiveClass: ComponentClass;
    /** Class of the disabled menu item */
    itemButtonDisabledClass: ComponentClass;
    /** Class of the menu item with icon */
    itemButtonIconClass: ComponentClass;
    /** Class of the menu item when is a submenu */
    itemSubmenuClass: ComponentClass;
}>;
