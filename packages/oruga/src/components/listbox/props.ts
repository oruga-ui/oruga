import type {
    ComponentClass,
    DynamicComponent,
    OptionsPropWithGroups,
} from "@/types";

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
    /** Interaction is disabled */
    disabled?: boolean;
    /** Enables item selection */
    selectable?: boolean;
    /** Height of the listbox, a scrollbar is defined if height of list exceeds this value */
    scrollHeight?: string | number;
    /** Select current focused item when focused */
    selectOnFocus?: boolean;
    /** Enable an additional searchbar below the header */
    filterable?: boolean;
    /** Columns won't be filtered on clientside, use with `searchable` prop to the columns to filter in your backend */
    backendFiltering?: boolean;
    /** Icon of the column search input */
    filtersIcon?: string;
    /** Placeholder of the column search input */
    filtersPlaceholder?: string;
    /** Function to filter the option based on the input value - default is label string comparison */
    filter?: (option: T, value: string) => boolean;
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
    /** List tag name */
    listTag?: DynamicComponent;
    /** List item tag name */
    itemTag?: DynamicComponent;
} & ListboxClasses;

// class props (will not be displayed in the docs)
export type ListboxClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Class of the header slot wrapper element */
    headerClass: ComponentClass;
    /** Class of the footer slot wrapper element */
    footerClass: ComponentClass;
    /** Class of the filter wrapper element */
    filterClass: ComponentClass;
    /** Class of the list container element */
    containerClass: ComponentClass;
    /** Class of the list element */
    listClass: ComponentClass;
    /** Class of the list item element when empty */
    itemEmptyClass: ComponentClass;
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
    label?: string;
    /** Item is disabled */
    disabled?: boolean;
    /** Define whether the item is visible or not */
    hidden?: boolean;
    /** Item tag name */
    tag?: DynamicComponent;
} & ListItemClasses;

// class props (will not be displayed in the docs)
export type ListItemClasses = Partial<{
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
