import type { ComponentClass, DynamicComponent } from "@/types";
import type { OptionsPropWithGroups } from "@/composables";

type ValueType<T, IsMultiple> = IsMultiple extends true ? T[] : T;

export type DropdownProps<T, IsMultiple extends boolean = false> = {
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
    /** Enables item selection */
    selectable?: boolean;
    /** Dropdown content will be scrollable */
    scrollable?: boolean;
    /** Makes the component check if menu reached scroll start or end and emit scroll events */
    checkScroll?: boolean;
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
    /** Custom animation (transition name) */
    animation?: string;
    /** Dropdown will be expanded (full-width) */
    expanded?: boolean;
    /** HTML element Id of the dropdown menu element */
    menuId?: string;
    /** Dropdown menu tag name */
    menuTag?: DynamicComponent;
    /** Dropdown trigger tag name */
    triggerTag?: DynamicComponent;
    /**
     * Dropdown will be triggered by any events
     * @values click, hover, contextmenu, focus
     */
    triggers?: ("click" | "keydown" | "hover" | "contextmenu" | "focus")[];
    /** Dropdown delay before it appears (number in ms) */
    delay?: number;
    /** Keep dropdown list open when item get selected */
    keepOpen?: boolean;
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst?: boolean;
    /** Close Dropdown when clicked outside */
    closeOnOutside?: boolean;
    /** Close Dropdown when page get scrolled */
    closeOnScroll?: boolean;
    /** Select current focused item when focused */
    selectOnFocus?: boolean;
    /** Select current focused item when closed */
    selectOnClose?: boolean;
    /** Dropdown content (items) are shown into a modal on mobile */
    mobileModal?: boolean;
    /** Dropdown content (items) are shown into a modal on desktop */
    desktopModal?: boolean;
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint?: string;
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
    /**
     * Set `true` to remove the body scrollbar.
     * When `false`, a non-scrollable scrollbar will be kept to avoid moving the background,
     * but will set the body to a fixed position, which may break some layouts.
     */
    clipScroll?: boolean;
    /** Ensures that each input has an accessible name. */
    labelledby?: string;
    /** Accessibility aria-label to be passed to the trigger element - usefull if selectable */
    ariaLabel?: string;
} & DropdownClasses;

// class props (will not be displayed in the docs)
export type DropdownClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the root element when on mobile */
    mobileClass: ComponentClass;
    /** Class of the root element when shown as modal */
    modalClass: ComponentClass;
    /** Class of the root element when teleported */
    teleportClass: ComponentClass;
    /** Class of the root element when inlined */
    inlineClass: ComponentClass;
    /** Class of the root element when disabled */
    disabledClass: ComponentClass;
    /** Class of the root element when expanded */
    expandedClass: ComponentClass;
    /** Class for the root element with position */
    positionClass: ComponentClass;
    /** Class for the root element when active or inline */
    activeClass: ComponentClass;
    /** Class for the root element when trigger is hoverable */
    hoverableClass: ComponentClass;
    /** Class of the trigger element */
    triggerClass: ComponentClass;
    /** Class of the menu element */
    menuClass: ComponentClass;
    /** Class of the menu element with position */
    menuPositionClass: ComponentClass;
    /** Class of the menu element when active or inline */
    menuActiveClass: ComponentClass;
    /** Class of the overlay when is shown as modal */
    overlayClass: ComponentClass;
    /** Class of the body when dropdown is open and scroll is clipped */
    scrollClipClass: ComponentClass;
    /** Class of the body when dropdown is open and scroll is keeped */
    scrollKeepClass: ComponentClass;
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
    /** Define whether the item is visible or not */
    hidden?: boolean;
    /** Dropdown item tag name */
    tag?: DynamicComponent;
} & DropdownItemClasses;

// class props (will not be displayed in the docs)
export type DropdownItemClasses = Partial<{
    /** Class of the item element. */
    itemClass: ComponentClass;
    /** Class of the item element when selected */
    itemSelectedClass: ComponentClass;
    /** Class of the item element when focused */
    itemFocusedClass: ComponentClass;
    /** Class of the item element when clickable */
    itemClickableClass: ComponentClass;
    /** Class of the item element when disabled */
    itemDisabledClass: ComponentClass;
}>;
