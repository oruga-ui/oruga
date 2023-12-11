import type { ClassDefinition, ComponentConfigBase } from "@/types";

declare module "../../index" {
    interface OrugaOptions {
        taginput?: ComponentConfigBase &
            /** component class config definition */
            Partial<{
                /** Class of the root element */
                rootClass: ClassDefinition;
                /** Class of input when expanded */
                expandedClass: ClassDefinition;
                /** Class of the entered item variant */
                variantClass: ClassDefinition;
                /** Class of the close button of entered item */
                closeClass: ClassDefinition;
                /** Class of the entered item */
                itemClass: ClassDefinition;
                /** Class of the counter element */
                counterClass: ClassDefinition;
            }> &
            /** component props config definition */
            Partial<{
                /** Vertical size of the input control */
                size: string;
                /** Color of the each item */
                variant: string;
                /** Show counter when maxlength or maxtags props are passed */
                counter: boolean;
                /** Keep open dropdown list after select */
                keepOpen: boolean;
                /** Array of keys which will add a item when typing */
                confirmKeys: string[];
                /** Array of chars used to split when pasting a new string */
                separators: string[];
                /** Allow removing last item when pressing given keys, if input is empty */
                removeOnKeys: string[];
                /** Makes the component check if list reached scroll start or end and emit scroll events. */
                checkScroll: boolean;
                /** Add close/delete button to the item */
                closable: boolean;
                /** Icon pack to use */
                iconPack: string;
                /** Icon to be shown */
                icon: string;
                /** Icon name of close icon on selected item */
                closeIcon: string;
                /** Accessibility label for the close button */
                ariaCloseLabel: string;
                /** Native options to use in HTML5 validation */
                autocomplete: string;
                /** Append the component to another part of the DOM. */
                teleport: boolean | string;
                /** Class configuration for the underlying autocomplete component */
                autocompleteClasses: OrugaOptions["autocomplete"];
            }>;
    }
}
