import type { ComponentClass } from "@/types";
import type { OptionsProp, OptionsPropWithGroups } from "@/composables";

type ValueType<T, IsMultiple> = IsMultiple extends true ? T[] : T;

export type TreeProps<T, IsMultiple extends boolean = false> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** The selected item value, use v-model to make it two-way binding */
    modelValue?: ValueType<T, IsMultiple>;
    /** Allows multiple selections - converts the `modelValue` into an array */
    multiple?: IsMultiple;
    /** Tree items, unnecessary when default slot is used */
    options?: OptionsPropWithGroups<T>;
    /** Same as native id. Also set the for label for o-field wrapper - default is an uuid. */
    id?: string;
    /** If sub tree items are shown as a accordion */
    collapsable?: boolean; // rename to Expandable
    /** Enables item selection */
    selectable?: boolean;
    /** Enable a checkbox on the item element */
    checkable?: boolean;
    /** Tree will be disabled */
    disabled?: boolean;
    /** Height of the tree, a scrollbar is defined if height of list exceeds this value */
    scrollHeight?: string | number;
    /** A label which is displayed when no options are visible */
    emptyLabel?: string;
    /** The chevron icon to for the toggle element before each item */
    toggleIcon?: string;
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
    /** Custom animation (transition name) */
    animation?: string;
    /** Defines a string value that labels an interactive element. */
    ariaLabel?: string;
    /** Identifier of the underlying input element. */
    ariaLabelledby?: string;
} & TreeClasses;

// class props (will not be displayed in the docs)
export type TreeClasses = Partial<{
    /** Class of the root element */
    rootClass: ComponentClass;
    /** Clas of the root element when disabled */
    disabledClass: ComponentClass;
    /** Clas of the root element when selectable */
    selectableClass: ComponentClass;
    /** Clas of the root element when multiple */
    multipleClass: ComponentClass;
    /** Class of the header slot wrapper element */
    headerClass: ComponentClass;
    /** Class of the footer slot wrapper element */
    footerClass: ComponentClass;
    /** Class of the empty slot wrapper element */
    emptyClass: ComponentClass;
    /** Class of the tree list element */
    listClass: ComponentClass;
}>;

export type TreeItemProps<T> = {
    /** Override existing theme classes completely */
    override?: boolean;
    /** Item value (it will be used as the v-model of the wrapper component) - default is an uuid */
    value?: T;
    /** Subtree items, unnecessary when default slot is used */
    options?: OptionsProp<T>;
    /** Tree item label */
    label?: string; // TODO: make required
    /** Tree item will be expanded */
    expanded?: boolean;
    /** Tree item will be disabled */
    disabled?: boolean;
    /** Define whether the item is visible or not */
    hidden?: boolean;
    /** HTML element Id of the sub tree ol list element */
    subtreeId?: string;
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
    /** Transition name to apply on tree list */
    animation?: string;
    /** Defines a string value that labels an interactive element. */
    ariaLabel?: string;
    /** Identifier of the underlying input element. */
    ariaLabelledby?: string;
} & TreeItemClasses;

// class props (will not be displayed in the docs)
export type TreeItemClasses = Partial<{
    /** Class of the tree item root element */
    itemClass: ComponentClass;
    /** Class of the tree item root element when selected */
    itemSelectedClass: ComponentClass;
    /** Class of the tree item root element when focused */
    itemFocusedClass: ComponentClass;
    /** Class of the item element when clickable */
    itemClickableClass: ComponentClass;
    /** Class of the tree item root element when disabled */
    itemDisabledClass: ComponentClass;
    /** Class of the tree item label element element */
    itemLabelClass: ComponentClass;
    /** Class of the tree item subtree element */
    itemSubtreeClass: ComponentClass;
}>;
