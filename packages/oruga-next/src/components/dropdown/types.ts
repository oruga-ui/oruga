import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        dropdown?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class when the dropdown is teleported */
                teleportClass: ClassDefinition;
                /** Class of the trigger element */
                triggerClass: ClassDefinition;
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
                /** Class of dropdown when on mobile */
                mobileClass: ClassDefinition;
                /** Class of dropdown when disabled */
                disabledClass: ClassDefinition;
                /** Class of dropdown when expanded */
                expandedClass: ClassDefinition;
                /** Class of the dropdown item */
                itemClass: ClassDefinition;
                /** Class of the dropdown item when active  */
                itemActiveClass: ClassDefinition;
                /** Class of the dropdown item when clickable */
                itemClickableClass: ClassDefinition;
                /** Class of the dropdown item when disabled */
                itemDisabledClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Max height of dropdown content */
                maxHeight: string | number;
                /**  Position of the dropdown relative to the trigger */
                position: string;
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Custom animation (transition name) */
                animation: string;
                /** Trap focus inside the dropdown. */
                trapFocus: boolean;
                /** Makes the component check if menu reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Tabindex of dropdown menu element. */
                menuTabindex: number;
                /** Dropdown menu tag name */
                menuTag: DynamicComponent;
                /** Dropdown trigger tag name */
                triggerTag: DynamicComponent;
                /** Dropdown item tag name */
                itemTag: DynamicComponent;
                /** Dropdown will be triggered by any events */
                triggers: string[];
                /** Dropdown close options */
                closeable: string[] | boolean;
                /** Role attribute to be passed to the list container for better accessibility */
                ariaRole: string;
                /** Role attribute to be passed to the list item for better accessibility */
                itemAriaRole: string;
                /** Mobile breakpoint as max-width value */
                mobileBreakpoint: string;
                /**  Append the component to another part of the DOM. */
                teleport: boolean | string;
            }>;
    }
}
