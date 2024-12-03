import type { ComponentClass, DynamicComponent } from "@/types";
import type { OptionsPropWithGroups } from "@/composables";

type ValueType<T, IsMultiple> = IsMultiple extends true ? T[] : T;

export type DropdownProps<T, IsMultiple extends boolean> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The selected option value */
    modelValue?: ValueType<T, IsMultiple>;
    /** Allows multiple selections - converts the `modelValue` into an array */
    multiple?: IsMultiple;
    /** Dropdown options, unnecessary when default slot is used */
    options?: OptionsPropWithGroups<T>;
    /** The active state of the dropdown, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Trigger label, unnecessary when trgger slot is used */
    label?: string;
    /** Dropdown is disabled */
    disabled?: boolean;
    /** Dropdown content (items) are shown inline, trigger is removed */
    inline?: boolean;
    /** Dropdown content will be scrollable */
    scrollable?: boolean;
    /** Max height of dropdown content */
    maxHeight?: string | number;
    /**
     * Position of the dropdown relative to the trigger
     * @values auto, top, bottom, left, right, top-right, top-left, bottom-left, bottom-right
     */
    position?:
        | "auto"
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "top-right"
        | "top-left"
        | "bottom-left"
        | "bottom-right";
    /** Dropdown content (items) are shown into a modal on mobile */
    mobileModal?: boolean;
    /** Dropdown content (items) are shown into a modal on desktop */
    desktopModal?: boolean;
    /** Custom animation (transition name) */
    animation?: string;
    /** Trap focus inside the dropdown. */
    trapFocus?: boolean;
    /** Makes the component check if menu reached scroll start or end and emit scroll events. */
    checkScroll?: boolean;
    /** Dropdown will be expanded (full-width) */
    expanded?: boolean;
    /** HTML element Id of the dropdown menu element */
    menuId?: string;
    /** Tabindex of the dropdown menu element */
    menuTabindex?: number;
    /** Dropdown menu tag name */
    menuTag?: DynamicComponent;
    /** Dropdown trigger tag name */
    triggerTag?: DynamicComponent;
    /**
     * Dropdown will be triggered by any events
     * @values click, hover, contextmenu, focus
     */
    triggers?: ("click" | "hover" | "contextmenu" | "focus")[];
    /** Dropdown delay before it appears (number in ms) */
    delay?: number;
    /**
     * Dropdown close options (pressing escape, clicking the content or outside)
     * @values true, false, escape, outside, content
     */
    closeable?: string[] | boolean;
    /** Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key) */
    tabindex?: number;
    /**
     * Role attribute to be passed to the list container for better accessibility.
     * Use menu only in situations where your dropdown is related to a navigation menu.
     * @values list, listbox, menu, dialog
     */
    ariaRole?: "list" | "listbox" | "menu" | "dialog";
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
} & DropdownClasses;

// class props (will not be displayed in the docs)
type DropdownClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class when the dropdown is teleported */
    teleportClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of dropdown menu when inline */
    inlineClass: ComponentClass;
    /** Class of the dropdown menu */
    menuClass: ComponentClass;
    /** Class of dropdown menu position */
    menuPositionClass: ComponentClass;
    /** Class of dropdown menu when active */
    menuActiveClass: ComponentClass;
    /** Class of dropdown when on mobile */
    mobileClass: ComponentClass;
    /** Class of dropdown when on is shown as modal */
    modalClass: ComponentClass;
    /** Class of the overlay when is shown as modal */
    overlayClass: ComponentClass;
    /** Class of dropdown when disabled */
    disabledClass: ComponentClass;
    /** Class of dropdown when expanded */
    expandedClass: ComponentClass;
    /** Class for the root element indicating position of dropdown */
    positionClass: ComponentClass;
    /** Class for the root element indicating whether the dropdown is open */
    activeClass: ComponentClass;
    /** Class for the root element when the dropdown is hoverable */
    hoverableClass: ComponentClass;
    /** Class of the body when dropdown is open and scroll is clip */
    scrollClipClass: ComponentClass;
    /** Class of the body when dropdown is open and scroll is not clip */
    noScrollClass: ComponentClass;
}>;

export type DropdownItemProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * Item value (it will be used as v-model of wrapper component) - default is an uuid
     * @type string|number|object
     */
    value?: T;
    /** Item label, unnecessary when default slot is used */
    label?: string;
    /** Item is disabled */
    disabled?: boolean;
    /** Item is clickable and emit an event */
    clickable?: boolean;
    /** Dropdown item tag name */
    tag?: DynamicComponent;
    /**
     * Role attribute to be passed to the list item for better accessibility.
     * Use menuitem only in situations where your dropdown is related to a navigation menu.
     * @values listitem, menuitem, option
     */
    ariaRole?: "listitem" | "menuitem" | "option";
} & DropdownItemClasses;

// class props (will not be displayed in the docs)
type DropdownItemClasses = Partial<{
    /** Class of the dropdown item */
    itemClass: ComponentClass;
    /** Class of the dropdown item when active  */
    itemActiveClass: ComponentClass;
    /** Class of the dropdown item when clickable */
    itemClickableClass: ComponentClass;
    /** Class of the dropdown item when disabled */
    itemDisabledClass: ComponentClass;
}>;
