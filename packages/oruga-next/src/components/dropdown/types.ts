import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        dropdown?: ComponentConfigBase &
            Partial<{
                /** Dropdown menu tag name */
                menuTag: DynamicComponent;
                /** Position of the dropdown relative to the trigger */
                position: string;
                /** Makes the component check if menu reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Max height of dropdown content */
                maxHeight: string | number;
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Custom animation (transition name) */
                animation: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of dropdown when expanded */
                expandedClass: ClassDefinition;
                /** Class of dropdown when disabled */
                disabledClass: ClassDefinition;
                /** Role attribute to be passed to the list container for better accessibility.
Use menu only in situations where your dropdown is related to a navigation menu. */
                ariaRole: string;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
                /** Trap focus inside the dropdown. */
                trapFocus: boolean;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /** Class of dropdown when on mobile */
                mobileClass: ClassDefinition;
                /** Dropdown trigger tag name */
                triggerTag: DynamicComponent;
                /** Dropdown will be triggered by any events */
                triggers: string[];
                /** Dropdown close options (pressing escape, clicking the content or outside) */
                closeable: boolean | string[];
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of dropdown menu when inline */
                inlineClass: ClassDefinition;
                /** Class of the overlay when on mobile */
                menuMobileOverlayClass: ClassDefinition;
                /** Class of the dropdown menu */
                menuClass: ClassDefinition;
                /** Class of dropdown menu position */
                menuPositionClass: ClassDefinition;
                /** Class of dropdown menu when active */
                menuActiveClass: ClassDefinition;
                /** Class of the dropdown item */
                itemClass: ClassDefinition;
                /** Dropdown item tag name */
                itemTag: DynamicComponent;
                /** Role attribute to be passed to the list item for better accessibility.
Use menuitem only in situations where your dropdown is related to a navigation menu. */
                itemAriaRole: string;
                /** Class of the dropdown item when active */
                itemActiveClass: ClassDefinition;
                /** Class of the dropdown item when clickable */
                itemClickableClass: ClassDefinition;
                /** Class of the dropdown item when disabled */
                itemDisabledClass: ClassDefinition;
            }>;
    }
}
