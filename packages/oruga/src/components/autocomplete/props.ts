import type { ComponentClass, DynamicComponent } from "@/types";
import type { OptionsPropWithGroups } from "@/composables";
import type { InputProps } from "../input/props";

export type AutocompleteProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The selected option value, use v-model to make it two-way binding
     * @type string|number|object
     */
    modelValue?: T;
    /** The value of the inner input, use v-model:input to make it two-way binding */
    input?: string;
    /** The active state of the dropdown, use v-model:active to make it two-way binding */
    active?: boolean;
    /** Autocomplete options */
    options?: OptionsPropWithGroups<T>;
    /** Function to filter the option based on the input value - default is label string comparison */
    filter?: (option: T, value: string) => boolean;
    /** Input type */
    type?: string;
    /** Menu tag name */
    menuTag?: DynamicComponent;
    /** Menu item tag name */
    itemTag?: DynamicComponent;
    /**
     * Size of the input control
     * @values small, medium, large
     */
    size?: string;
    /**
     * Position of the dropdown
     * @values auto, top, bottom
     */
    position?: "auto" | "top" | "bottom";
    /** Input placeholder */
    placeholder?: string;
    /** Makes input full width when inside a grouped or addon field */
    expanded?: boolean;
    /** Makes the element rounded */
    rounded?: boolean;
    /** Same as native input disabled */
    disabled?: boolean;
    /** Same as native maxlength, plus character counter */
    maxlength?: string | number;
    /** Number of milliseconds to delay before to emit input event */
    debounce?: number;
    /** The first option will always be focused (easier to just hit enter or tab) */
    keepFirst?: boolean;
    /** Keep open dropdown list after select */
    keepOpen?: boolean;
    /** Clear input text on select */
    clearOnSelect?: boolean;
    /** Open dropdown list on focus */
    openOnFocus?: boolean;
    /** Trigger the select event for focused option when drodpown got closed */
    selectOnClose?: boolean;
    /** Allows the header in the autocomplete to be selectable */
    selectableHeader?: boolean;
    /** Allows the footer in the autocomplete to be selectable */
    selectableFooter?: boolean;
    /** Max height of dropdown content */
    maxHeight?: string | number;
    /** Makes the component check if list reached scroll start or end and emit scroll events. */
    checkScroll?: boolean;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Icon to be shown */
    icon?: string;
    /** Makes the icon clickable */
    iconClickable?: boolean;
    /** Icon to be added on the right side */
    iconRight?: string;
    /** Make the icon right clickable */
    iconRightClickable?: boolean;
    /** Variant of right icon */
    iconRightVariant?: string;
    /** Add a button/icon to clear the inputed text */
    clearable?: boolean;
    /** Icon name to be added on the clear button */
    clearIcon?: string;
    /** Show status icon using field and variant prop */
    statusIcon?: boolean;
    /** Dropdown content (items) are shown into a modal on mobile */
    mobileModal?: boolean;
    /** Dropdown content (items) are shown into a modal on desktop */
    desktopModal?: boolean;
    /** Transition name to apply on dropdown list */
    animation?: string;
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
} & AutocompleteClasses;

// class props (will not be displayed in the docs)
export type AutocompleteClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the menu items */
    itemClass: ComponentClass;
    /** Class of the menu items group title */
    itemGroupTitleClass: ComponentClass;
    /** Class of the empty menu placeholder item */
    itemEmptyClass: ComponentClass;
    /** Class of the menu header item */
    itemHeaderClass: ComponentClass;
    /** Class of the menu footer item */
    itemFooterClass: ComponentClass;
    /**
     * Class configuration for the internal input component
     * @ignore
     */
    inputClasses: InputProps<false>;
}>;
