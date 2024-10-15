import type { ComponentClass } from "@/types";
import type { OptionsPropWithGroups } from "@/composables";

export type TaginputProps<T extends string | number | object> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The selected items, use v-model to make it two-way binding binding
     * @type string[]|number[]|object[]
     */
    modelValue?: T[];
    /** The value of the inner input, use v-model:input to make it two-way binding */
    input?: string;
    /** Taginput options */
    options?: OptionsPropWithGroups<T>;
    /** Function to filter the options based on the input value - default is label string comparison */
    filter?: (options: T, value: string) => boolean;
    /**
     * Vertical size of the input control
     * @values small, medium, large
     */
    size?: string;
    /**
     * Color of the each item
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant?: string;
    /** Limits the number of items, plus item counter */
    maxitems?: string | number;
    /** Same as native maxlength, plus character counter */
    maxlength?: string | number;
    /** Show counter when maxlength or maxtags props are passed */
    counter?: boolean;
    /** Opens a dropdown with choices when the input field is focused */
    openOnFocus?: boolean;
    /** Keep open dropdown list after select */
    keepOpen?: boolean;
    /** Input placeholder */
    placeholder?: string;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Same as native input disabled */
    disabled?: boolean;
    /**
     * Array of keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
     * which will add a item when typing
     */
    confirmKeys?: string[];
    /** Array of chars used to split when pasting a new string */
    separators?: string[];
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst?: boolean;
    /** Allows adding new items */
    allowNew?: boolean;
    /** Allows adding the same item multiple time */
    allowDuplicates?: boolean;
    /**
     * Allow removing last item when pressing given keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values),
     * if input is empty
     */
    removeOnKeys?: string[];
    /** Function to validate the value of a new item before it got added */
    validateItem?: (value: T | string) => boolean;
    /** Function to create a new item to push into v-model (items) */
    createItem?: (value: T | string) => T;
    /** Makes the component check if list reached scroll start or end and emit scroll events. */
    checkScroll?: boolean;
    /** Add close/delete button to the item */
    closable?: boolean;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon to be shown */
    icon?: string;
    /** Icon name of close icon on selected item */
    closeIcon?: string;
    /** Accessibility label for the close button */
    ariaCloseLabel?: string;
    /** Native options to use in HTML5 validation */
    autocomplete?: string;
    /** Enable HTML 5 native validation */
    useHtml5Validation?: boolean;
    /** Custom HTML 5 validation error to set on the form control */
    customValidity?:
        | string
        | ((
              currentValue: T | null | undefined,
              state: ValidityState,
          ) => string);
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport?: boolean | string | object;
} & TaginputClasses;

// class props (will not be displayed in the docs)
type TaginputClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of input when expanded */
    expandedClass: ComponentClass;
    /** Class of the input container */
    containerClass: ComponentClass;
    /** Class of the input container size */
    sizeClass: ComponentClass;
    /** Class of the entered item variant */
    variantClass: ComponentClass;
    /** Class of the close button of entered item */
    closeClass: ComponentClass;
    /** Class of the entered item */
    itemClass: ComponentClass;
    /** Class of the counter element */
    counterClass: ComponentClass;
    /**
     * Class configuration for the underlying autocomplete component
     * @ignore
     */
    autocompleteClasses: object;
}>;
