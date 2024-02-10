import type { ClassDefinition, ComponentConfigBase } from "@/types";

// Auto generated component theme config definition
declare module "../../index" {
    interface OrugaOptions {
        taginput?: ComponentConfigBase &
            Partial<{
                /** Vertical size of the input control */
                size: string;
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Array of keys
(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
which will add a item when typing */
                confirmKeys: string[];
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Append the component to another part of the DOM.
Set `true` to append the component to the body.
In addition, any CSS selector string or an actual DOM node can be used. */
                teleport: string | boolean | Record<string, any>;
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of the entered item */
                itemClass: ClassDefinition;
                /** Color of the each item */
                variant: string;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of the input container size */
                sizeClass: ClassDefinition;
                /** Class of the entered item variant */
                variantClass: ClassDefinition;
                /** Show counter when maxlength or maxtags props are passed */
                counter: boolean;
                /** Class of the counter element */
                counterClass: ClassDefinition;
                /** Icon name of close icon on selected item */
                closeIcon: string;
                /** Class of the close button of entered item */
                closeClass: ClassDefinition;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Add close/delete button to the item */
                closable: boolean;
                /** Array of chars used to split when pasting a new string */
                separators: string[];
                /** Allow removing last item when pressing given keys, if input is empty */
                removeOnKeys: string[];
                /** Class of the input container */
                containerClass: ClassDefinition;
                /** Class configuration for the underlying autocomplete component */
                autocompleteClasses: Record<string, any>;
            }>;
    }
}
