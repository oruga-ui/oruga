import type { ComponentClass, OptionsPropWithGroups } from "@/types";
import type { InputProps } from "../input/props";

type ValueType<T, IsMultiple> = IsMultiple extends true ? T[] : T;

export type ListboxProps<T, IsMultiple extends boolean = false> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * The selected option value, use v-model to make it two-way binding
     * @type string|number|object
     */
    modelValue?: ValueType<T, IsMultiple>;
    /** Allows multiple selections - converts the `modelValue` into an array */
    multiple?: IsMultiple;
    /** Autocomplete options */
    options?: OptionsPropWithGroups<T>;
    /** Same as native id. Also set the for label for o-field wrapper - default is an uuid. */
    id?: string;
    /** Interaction is disabled */
    disabled?: boolean;
    /** Enable a checkbox on the item element */
    // checkable?: boolean;
    /** Enables item selection */
    selectable?: boolean;
    /** Select current focused item when focused */
    selectOnFocus?: boolean;
    /** Height of the listbox, a scrollbar is defined if height of list exceeds this value */
    scrollHeight?: string | number;
    /** A label which is displayed when no options are visible */
    emptyLabel?: string;
    /** Enable an additional searchbar below the header */
    filterable?: boolean;
    /** Items won't be filtered on clientside, use the `filter` event to filter in your backend */
    backendFiltering?: boolean;
    /** Custom filter function to filter the items based on the input value - default is label string comparison */
    filter?: (option: T, value: string) => boolean;
    /** Icon of the column search input */
    filterIcon?: string;
    /** Placeholder of the column search input */
    filterPlaceholder?: string;
    /** Number of milliseconds to delay the filter event */
    filterDebounce?: number;
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack?: string;
    /** Custom animation (transition name) */
    animation?: string;
    /** Defines a string value that labels an interactive element. */
    ariaLabel?: string;
    /** Identifier of the underlying input element. */
    ariaLabelledby?: string;
} & ListboxClasses;

// class props (will not be displayed in the docs)
export type ListboxClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Clas of the root element when disabled */
    disabledClass: ComponentClass;
    /** Clas of the root element when selectable */
    selectableClass: ComponentClass;
    /** Clas of the root element when filterable */
    filterableClass: ComponentClass;
    /** Clas of the root element when multiple */
    multipleClass: ComponentClass;
    /** Class of the header slot wrapper element */
    headerClass: ComponentClass;
    /** Class of the footer slot wrapper element */
    footerClass: ComponentClass;
    /** Class of the empty slot wrapper element */
    emptyClass: ComponentClass;
    /** Class of the filter wrapper element */
    filterClass: ComponentClass;
    /** Class of the list element */
    listClass: ComponentClass;
    /**
     * Class configuration for the internal input component
     * @ignore
     */
    inputClasses: InputProps<false>;
}>;

export type ListItemProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /**
     * Item value (it will be used as v-model of wrapper component) - default is an uuid
     * @type string|number|object
     */
    value?: T;
    /** Item label, unnecessary when default slot is used */
    label?: string; // TODO: make requried
    /** Item is disabled */
    disabled?: boolean;
    /** Define whether the item is visible or not */
    hidden?: boolean;
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
    /** Defines a string value that labels an interactive element. */
    ariaLabel?: string;
    /** Identifier of the underlying input element. */
    ariaLabelledby?: string;
    /**
     * Internal parent provider key override
     * @ignore
     */
    parentKey?: string;
} & ListItemClasses;

// class props (will not be displayed in the docs)
export type ListItemClasses = Partial<{
    /** Class of the item element. */
    itemClass: ComponentClass;
    /** Class of the item element when is selectable */
    itemSelectableClass: ComponentClass;
    /** Class of the item element when is selected */
    itemSelectedClass: ComponentClass;
    /** Class of the item element when is focused */
    itemFocusedClass: ComponentClass;
    /** Class of the item element when is disabled */
    itemDisabledClass: ComponentClass;
}>;
