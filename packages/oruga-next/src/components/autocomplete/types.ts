import type {
    ClassDefinition,
    ComponentConfigBase,
    DynamicComponent,
} from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        autocomplete?: ComponentConfigBase &
            Partial<{
                /** Size of the control */
                size: string;
                /** Menu tag name */
                menuTag: DynamicComponent;
                /** Menu item tag name */
                itemTag: DynamicComponent;
                /** Position of the dropdown */
                position: string;
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Number of milliseconds to delay before to emit input event */
                debounce: number;
                /** The first option will always be pre-selected (easier to just hit enter or tab) */
                keepFirst: boolean;
                /** Clear input text on select */
                clearOnSelect: boolean;
                /** Open dropdown list on focus */
                openOnFocus: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Max height of dropdown content */
                maxHeight: string | number;
                /** Dropdown content (items) are shown into a modal on mobile */
                mobileModal: boolean;
                /** Transition name to apply on dropdown list */
                animation: string;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon to be added on the right side */
                iconRight: string;
                /** Add a button/icon to clear the inputed text */
                clearable: boolean;
                /** Icon name to be added on the clear button */
                clearIcon: string;
                /** Show status icon using field and variant prop */
                statusIcon: boolean;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Enable html 5 native validation */
                useHtml5Validation: boolean;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the menu items */
                itemClass: ClassDefinition;
                /** Class of the menu items on hover */
                itemHoverClass: ClassDefinition;
                /** Class of the menu items group title */
                itemGroupTitleClass: ClassDefinition;
                /** Class of the menu empty placeholder item */
                itemEmptyClass: ClassDefinition;
                /** Class of the menu header item */
                itemHeaderClass: ClassDefinition;
                /** Class of the menu footer item */
                itemFooterClass: ClassDefinition;
                /** Classes to apply on internal input component */
                inputClasses: Record<string, any>;
            }>;
    }
}
