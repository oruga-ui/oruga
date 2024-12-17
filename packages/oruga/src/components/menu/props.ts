import type { ComponentClass, DynamicComponent, OptionsProp } from "@/types";

export type MenuProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The selected item value, use v-model to make it two-way binding */
    modelValue?: T;
    /** Menu items, unnecessary when default slot is used */
    options?: OptionsProp<T>;
    /** Menu label */
    label?: string;
    /** If sub menu items are collapsible */
    accordion?: boolean;
    /** Menu will be disabled */
    disabled?: boolean;
    /** HTML element Id of the ol list element */
    menuId?: string;
    /** HTML element Id of the label element */
    labelId?: string;
    /**
     * Role attribute to be passed to the list container for better accessibility.
     * Use menu only in situations where your dropdown is related to a navigation menu.
     * @values menu, tree
     */
    role?: "menu" | "tree";
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
    /** Class of the menu label */
    labelClass: ComponentClass;
}>;

export type MenuItemProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Item value (it will be used as v-model of wrapper component) - default is an uuid */
    value?: T;
    /** The active state of the menu item, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Submenu items, unnecessary when default slot is used */
    options?: OptionsProp<T>;
    /** Menu item label */
    label?: string;
    /** Menu item will be expanded */
    expanded?: boolean;
    /** Menu item will be disabled */
    disabled?: boolean;
    /** Define whether the item is visible or not */
    hidden?: boolean;
    /** HTML element Id of the sub menu ol list element */
    submenuId?: string;
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
} & MenuItemClasses;

// class props (will not be displayed in the docs)
type MenuItemClasses = Partial<{
    /** Class of the root element of menu item */
    itemClass: ComponentClass;
    /** Class of the menu item root when active */
    itemActiveClass: ComponentClass;
    /** Class of the menu item root when focused */
    itemFocusedClass: ComponentClass;
    /** Class of the menu item root when disabled */
    itemDisabledClass: ComponentClass;
    /** Class of the menu item */
    itemButtonClass: ComponentClass;
    /** Class of the menu item when active*/
    itemButtonActiveClass: ComponentClass;
    /** Class of the menu item when focused */
    itemButtonFocusedClass: ComponentClass;
    /** Class of the menu item when disabled */
    itemButtonDisabledClass: ComponentClass;
    /** Class of the menu item with icon */
    itemButtonIconClass: ComponentClass;
    /** Class of the menu item submenu */
    itemSubmenuClass: ComponentClass;
}>;
