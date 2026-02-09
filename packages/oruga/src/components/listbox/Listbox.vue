<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    ref,
    toValue,
    useId,
    useTemplateRef,
    watch,
    watchEffect,
} from "vue";

import OListboxItem from "./ListItem.vue";
import OInput from "@/components/input/Input.vue";

import {
    alternateArray,
    isDefined,
    isEmpty,
    isEqual,
    isPrintableCharacter,
    isTrueish,
    mod,
    toCssDimension,
} from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import { getDefault } from "@/utils/config";
import {
    areOptionsGrouped,
    defineClasses,
    findOptionIndex,
    getOptionsLength,
    isGroupOption,
    normalizeOptions,
    scrollElementInView,
    unrefElement,
    useProviderParent,
    useScrollEvents,
    useSequentialId,
} from "@/composables";

import { injectField } from "@/components/field/fieldInjection";

import type { ListboxProps } from "./props";
import type { ListItem, ListboxComponent, ListItemComponent } from "./types";

/**
 * Listbox is used to select one or more values from a list of items.
 * @experimental
 * @displayName Listbox
 * @requires ./ListItem.vue
 * @style _listbox.scss
 */
defineOptions({
    isOruga: true,
    name: "OListbox",
    configField: "listbox",
});

type ModelValue = ListboxProps<T, IsMultiple>["modelValue"];

const props = withDefaults(defineProps<ListboxProps<T, IsMultiple>>(), {
    override: undefined,
    modelValue: undefined,
    // multiple: false,
    options: undefined,
    scrollHeight: () => getDefault("listbox.scrollHeight", "225"),
    disabled: false,
    selectable: true,
    // checkable: false,
    selectOnFocus: false,
    emptyLabel: () => getDefault("listbox.emptyLabel"),
    filterable: false,
    backendFiltering: false,
    filter: undefined,
    filterIcon: () => getDefault("listbox.filterIcon"),
    filterDebounce: () => getDefault("listbox.filterDebounce", 400),
    filterPlaceholder: () => getDefault("listbox.filterPlaceholder"),
    iconPack: () => getDefault("listbox.iconPack"),
    animation: () => getDefault("listbox.animation", "fade"),
    id: () => useId(),
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    inputClasses: () => getDefault("listbox.inputClasses"),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {unknown | unknown[]} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on select event - fired before update:modelValue
     * @param value {unknown} selected value
     */
    select: [value: T];
    /**
     * on filter change event
     * @param value {string} filter value
     * @param event {Event} native event
     */
    filter: [value: string, event: Event];
    /**
     * on list focus event
     * @param event {Event} native event
     */
    focus: [event: Event];
    /**
     * on list blur event
     * @param event {Event} native event
     */
    blur: [event: Event];
    /** scrolling inside the list reached the start */
    "scroll-start": [];
    /** scrolling inside the list reached the end */
    "scroll-end": [];
}>();

defineSlots<{
    /** Define an additional header */
    header?(): void;
    /**
     * Overridet the filter input
     * @param value {string} - filter input value
     * @param onChange {(input: string, event: Event): void} - on filter input change event
     * @param onKeydown {(event: Event): void} - on filter input keydown event
     */
    filter?(props: {
        value: string;
        onChange: (input: string, event: Event) => void;
        onKeydown: (event: KeyboardEvent) => void;
    }): void;
    /** Define the listbox items here */
    default?(): void;
    /** Define the content to show if the list is empty */
    empty?(): void;
    /** Define an additional footer */
    footer?(): void;
}>();

const listRef = useTemplateRef<HTMLElement>("listElement");

// inject parent field component if used inside one
const { parentField } = injectField();

// if `id` is given set as `for` property on o-field wrapper
if (props.id) parentField.value?.setInputId(props.id);

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

/** determines if the options are grouped or not */
const optionsGrouped = computed(() => areOptionsGrouped(normalizedOptions));

// #region --- Child Items ---

// provided data is a computed ref to ensure reactivity
const provideData = computed<ListboxComponent<T>>(() => ({
    id: props.id,
    disabled: props.disabled,
    multiple: isTrueish(props.multiple),
    // checkable: props.checkable,
    selectable: props.selectable,
    selected: vmodel.value,
    focsuedItem: focusedItem.value,
    selectItem,
    focusItem,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<
    ListItemComponent<T>,
    ListboxComponent<T>
>({ rootRef: listRef, data: provideData });

const hasViableItems = computed(() =>
    childItems.value.some((item) => item.data.isViable),
);

/**
 * List of child items without disabled or hidden items.
 * Returns empty list when no items are viable or component is disabled.
 */
const viableItems = computed(() => {
    if (!props.selectable || props.disabled) return [];
    return childItems.value.filter((item) => item.data.isViable);
});

/**
 * Get the first 'viable' child, starting at startingIndex and in the direction specified
 * by the boolean parameter forward. In other words, first try to select the child at index
 * startingIndex, and if it is not visible or it is disabled, then go to the index in the
 * specified direction until either returning to startIndex or finding a viable child item.
 */
function getFirstViableItem(startingIndex: number, delta: 1 | -1): ListItem<T> {
    let newIndex = mod(
        focusedItem.value?.index == startingIndex
            ? startingIndex + delta
            : startingIndex,
        childItems.value.length,
    );

    for (
        ;
        newIndex !== focusedItem.value?.index;
        newIndex = mod(newIndex + delta, childItems.value.length)
    ) {
        // Break if the item at this index is viable (not disabled or hidden)
        if (childItems.value[newIndex].data.isViable) break;
    }

    return childItems.value[newIndex];
}

// #endregion --- Child Items ---

// #region --- Scroll Feature ---

// set infinite scroll handler
if (isClient && props.scrollHeight)
    useScrollEvents(
        listRef,
        {
            onScrollEnd: () => emits("scroll-end"),
            onScrollStart: () => emits("scroll-start"),
        },
        { passive: true },
    );

const listStyle = computed(() => ({
    maxHeight: toCssDimension(props.scrollHeight),
    overflow: "auto",
}));

// #endregion --- Scroll Handler ---

// #region --- Select Feature ---

// the selected item value, use v-model to make it two-way binding
const vmodel = defineModel<ModelValue>({ default: undefined });

/** Checks if the value of the given item is part of the modelValue. */
function isItemSelected(item: ListItem<T>): boolean {
    if (isTrueish(props.multiple)) {
        if (Array.isArray(vmodel.value))
            return vmodel.value.some((value) =>
                isEqual(item.data.value, value),
            );
        else return false;
    } else return isEqual(item.data.value, vmodel.value);
}

/** Replaces the modelValue when selectable and multiple. */
function updateSelectedItems(items: ListItem<T>[]): void {
    if (!props.selectable || !isTrueish(props.multiple)) return;
    const values = items.map((item) => item.data.value).filter(isDefined);
    vmodel.value = values as ModelValue;
}

/** Updates the modelValue for one item when selectable. */
function selectItem(item: ListItem<T>, selection: boolean = true): void {
    if (!props.selectable) return;

    const value = item.data.value!;
    if (selection) emits("select", value);

    // set selected option
    if (isTrueish(props.multiple)) {
        if (vmodel.value && Array.isArray(vmodel.value)) {
            if (selection && !vmodel.value.includes(value)) {
                // add a value
                vmodel.value = [...vmodel.value, value] as ModelValue;
            } else if (!selection) {
                // remove a value
                vmodel.value = vmodel.value.filter(
                    (val) => val !== value,
                ) as ModelValue;
            }
        } else {
            // init new value array
            vmodel.value = (selection ? [value] : []) as ModelValue;
        }
    } else {
        if (!selection) vmodel.value = undefined;
        else if (vmodel.value !== value) {
            // update a single value
            vmodel.value = value as ModelValue;
        }
    }
}

/** Select a range of items from a staring index to an end index. */
function selectItemRange(start: number, end: number): void {
    if (!props.selectable || !isTrueish(props.multiple)) return;
    if (start < 0 || end < 0) return;

    const rangeStart = Math.min(start, end);
    const rangeEnd = Math.max(start, end);
    const items = childItems.value
        // get the items by the rande
        .slice(rangeStart, rangeEnd + 1)
        // remove not viable items
        .filter((item) => item.data.isViable);

    // select all items in the range
    updateSelectedItems(items);
}

/** Returns the first selected item or undefined started by the given index alternating between the next and previous elements. */
function findFirstSelectedItem(index: number = 0): ListItem<T> | undefined {
    if (isEmpty(vmodel.value)) return undefined;

    if (isTrueish(props.multiple)) {
        if (!Array.isArray(vmodel.value)) return undefined;
        // check index overflow
        if (index < 0 || index >= childItems.value.length) return undefined;

        // reorders array by alternating between the next and previous elements
        const items = alternateArray(childItems.value, index)
            // filter only viable items
            .filter((item) => item.data.isViable);

        // find first option which is in the selection list
        return items.find(isItemSelected);
    } else {
        const items = childItems.value;
        // find first option which is in the selection list
        return items.find(isItemSelected);
    }
}

// #endregion --- Select Feature ---

// #region --- Focus Feature ---

const isFocused = ref(false);
const focusedItem = ref<ListItem<T>>();
const startRangeIndex = ref(-1);

/** Sets the beginn index for an multiselection. */
function startFocusRange(): void {
    if (isTrueish(props.multiple))
        startRangeIndex.value = focusedItem.value?.index ?? -1;
}

/** Set an item as focused element. */
function focusItem(value?: ListItem<T>): void {
    focusedItem.value = value;
}

/** Set focus on an item. */
function setFocus(item: ListItem<T>): void {
    isFocused.value = true;
    if (props.selectOnFocus && item.data.value) selectItem(item, true);

    // set item as focused
    focusedItem.value = item;

    // scroll item into view
    scrollElementInView(listRef, item.el);
}

/** Select the current focused item. */
function selectFocusedItem(event: KeyboardEvent): void {
    if (!props.selectable || !focusedItem.value) return;

    // ensure item is in view
    setFocus(focusedItem.value);

    // check mulitple selection
    if (isTrueish(props.multiple) && event.shiftKey) {
        const nearestSelectedItem = findFirstSelectedItem(
            focusedItem.value.index,
        );
        // select from nearest selected option to focused option
        if (nearestSelectedItem)
            selectItemRange(focusedItem.value.index, nearestSelectedItem.index);
    } else
        // select the item
        selectItem(focusedItem.value, !isItemSelected(focusedItem.value));
}

/** Move the focus one element up the list. */
function moveFocusUp(event: KeyboardEvent): void {
    if (!hasViableItems.value) return;
    // get the previous item
    const delta = -1;
    const item = getFirstViableItem(focusedItem.value?.index || 0, delta);

    // check mulitple selection
    if (isTrueish(props.multiple) && event.shiftKey)
        selectItemRange(item.index, startRangeIndex.value);

    // focus new item
    setFocus(item);
}

/** Move the focus one element down the list. */
function moveFocusDown(event: KeyboardEvent): void {
    if (!hasViableItems.value) return;
    // get the next item
    const delta = 1;
    const item = getFirstViableItem(focusedItem.value?.index || 0, delta);

    // check mulitple selection
    if (isTrueish(props.multiple) && event.shiftKey)
        selectItemRange(startRangeIndex.value, item.index);

    // focus new item
    setFocus(item);
}

/** Go to the first viable item. */
function focusFirstItem(event?: KeyboardEvent): void {
    if (!hasViableItems.value) return;

    // get the first item
    const item = getFirstViableItem(0, 1);

    // check mulitple selection
    if (isTrueish(props.multiple) && event?.shiftKey)
        selectItemRange(startRangeIndex.value, item.index);

    // focus new item
    setFocus(item);
}

/** Go to the last viable item. */
function focusLastItem(event?: KeyboardEvent): void {
    if (!hasViableItems.value) return;
    // get the last item
    const item = getFirstViableItem(childItems.value.length - 1, -1);

    // check mulitple selection
    if (isTrueish(props.multiple) && event?.shiftKey)
        selectItemRange(startRangeIndex.value, item.index);

    // focus new item
    setFocus(item);
}

function onFocusin(event: FocusEvent): void {
    // prevent when already focused
    if (isFocused.value) return;

    if (event.target !== event.currentTarget) {
        isFocused.value = true;

        // ensure that the list is the real focused element
        const listElement = unrefElement(listRef);
        if (listElement) listElement.focus();
    } else {
        const firstSelectedItem = findFirstSelectedItem();
        // when an item is already selected
        if (firstSelectedItem)
            // focus this item
            setFocus(firstSelectedItem);
        else
            // else focus first item
            focusFirstItem();
    }

    emits("focus", event);
}

function onFocusout(event: FocusEvent): void {
    // check if focus is still inside the component
    const listElement = event.currentTarget as HTMLElement;
    const newFocus = event.relatedTarget as HTMLElement;
    if (listElement?.contains(newFocus)) return;
    if (listElement?.contains(event.target as Node)) return;

    // clear focus
    isFocused.value = false;
    focusedItem.value = undefined;
    startRangeIndex.value = -1;
}

function onBlur(event: Event): void {
    // clear focus
    isFocused.value = false;
    focusedItem.value = undefined;
    startRangeIndex.value = -1;

    emits("blur", event);
}

// #endregion --- Focus Feature ---

// #region --- Filter Feature ---

function onFilterChange(value: string, event: Event): void {
    emits("filter", value, event);

    focusedItem.value = undefined;
    startRangeIndex.value = -1;
}

const filterValue = ref<string>("");

// if not backend filtered
if (!props.backendFiltering) {
    // update the hidden state for every item based on filter value
    watchEffect(() => {
        if (!props.filterable) return;

        childItems.value.forEach((item) => {
            if (!item.data) return;

            // prevent filtering for presentation items
            if ((item.data as any).role === "presentation") return;

            // no filter means not hidden
            if (!filterValue.value) {
                item.data.setHidden(false);
                return;
            }

            const isVisible =
                typeof props.filter === "function"
                    ? // call filter function if available
                      props.filter(item.data.value!, toValue(filterValue))
                    : // else check filter value matches item value
                      item.data.matches(toValue(filterValue));

            // update hidden state
            item.data.setHidden(!isVisible);
        });
    });
}

// #endregion --- Filter Handler ---

// #region --- Type-Ahead Feature ---

const typeAheadValue = ref("");
let searchTimeout: ReturnType<typeof setTimeout> | undefined;

// on type-ahead value change
watch(typeAheadValue, (value) => {
    // clear old timeout
    if (searchTimeout) clearTimeout(searchTimeout);

    // when value is not empty
    if (!isEmpty(value)) {
        // find first item that starts with the search value
        const matchedItem = viableItems.value.find((item) =>
            item.data.matches(value),
        );

        if (matchedItem)
            // focus the item
            setFocus(matchedItem);
    }

    // set timeout to search value get cleared
    searchTimeout = setTimeout(() => {
        typeAheadValue.value = "";
        searchTimeout = undefined;
    }, 500);
});

// #endregion --- Type-Ahead Feature ---

// #region --- Keyboard Listener ---

function onListKeyDown(event: KeyboardEvent): void {
    const metaKey = event.metaKey || event.ctrlKey;

    switch (event.code) {
        case "ArrowDown":
            moveFocusDown(event);
            event.preventDefault();
            break;

        case "ArrowUp":
            moveFocusUp(event);
            event.preventDefault();
            break;

        case "Home":
            focusFirstItem(event);
            event.preventDefault();
            break;

        case "End":
            focusLastItem(event);
            event.preventDefault();
            break;

        case "Enter":
        case "NumpadEnter":
        case "Space":
            selectFocusedItem(event);
            event.preventDefault();
            break;

        case "Tab":
            //NOOP
            break;

        case "ShiftLeft":
        case "ShiftRight":
            startFocusRange();
            break;

        default:
            if (isTrueish(props.multiple) && event.code === "KeyA" && metaKey) {
                // select all avaibale items
                updateSelectedItems(viableItems.value);
                event.preventDefault();
                break;
            }

            if (!metaKey && isPrintableCharacter(event.key)) {
                // append event key char to previus searched chars
                typeAheadValue.value = (typeAheadValue.value || "") + event.key;
                event.preventDefault();
            }

            break;
    }
}

function onFilterKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
        case "ArrowDown":
            moveFocusDown(event);
            event.preventDefault();
            break;

        case "ArrowUp":
            moveFocusUp(event);
            event.preventDefault();
            break;

        case "Home":
            focusFirstItem(event);
            event.preventDefault();
            break;

        case "End":
            focusLastItem(event);
            event.preventDefault();
            break;

        case "Enter":
        case "NumpadEnter":
            selectFocusedItem(event);
            break;

        case "ShiftLeft":
        case "ShiftRight":
            startFocusRange();
            break;

        default:
            break;
    }
}

// #endregion --- Keyboard Listener ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-listbox"],
    [
        "disabledClass",
        "o-listbox--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "selectableClass",
        "o-listbox--selectable",
        null,
        computed(() => props.selectable),
    ],
    [
        "filterableClass",
        "o-listbox--filterable",
        null,
        computed(() => props.filterable),
    ],
    [
        "multipleClass",
        "o-listbox--multiple",
        null,
        computed(() => !!props.multiple),
    ],
);

const headerClasses = defineClasses(["headerClass", "o-listbox__header"]);

const footerClasses = defineClasses(["footerClass", "o-listbox__footer"]);

const filterClasses = defineClasses(["filterClass", "o-listbox__filter"]);

const listClasses = defineClasses(["listClass", "o-listbox__list"]);

const emptyClasses = defineClasses(["emptyClass", "o-listbox__empty"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div
        data-oruga="listbox"
        :class="rootClasses"
        @focusout="onFocusout"
        @mouseleave="isFocused && onFocusout($event)">
        <div v-if="$slots.header" :class="headerClasses">
            <slot name="header" />
        </div>

        <div v-if="filterable" :class="filterClasses">
            <slot
                name="filter"
                :value="filterValue"
                :on-change="onFilterChange"
                :on-keydown="onFilterKeyDown">
                <o-input
                    v-model="filterValue"
                    v-bind="inputClasses"
                    name="filter"
                    type="search"
                    role="searchbox"
                    :tabindex="!disabled && !isFocused ? 0 : -1"
                    :debounce="filterDebounce"
                    :placeholder="filterPlaceholder"
                    :icon="filterIcon"
                    :pack="iconPack"
                    :disabled="disabled"
                    expanded
                    size="small"
                    aria-label="listbox filter input"
                    :aria-owns="id + '_list'"
                    :aria-activedescendant="
                        focusedItem
                            ? `${id}-${focusedItem.identifier}`
                            : undefined
                    "
                    autocomplete="off"
                    :use-html5-validation="false"
                    @input="onFilterChange"
                    @blur="onBlur"
                    @keydown="onFilterKeyDown" />
            </slot>
        </div>

        <component
            :is="optionsGrouped ? 'div' : 'ul'"
            :id="id + '_list'"
            ref="listElement"
            role="listbox"
            :tabindex="disabled || isFocused ? -1 : 0"
            :class="listClasses"
            :style="listStyle"
            :aria-multiselectable="multiple"
            :aria-activedescendant="
                focusedItem ? `${id}-${focusedItem.identifier}` : undefined
            "
            :aria-label="ariaLabel"
            :aria-labelledby="props.ariaLabelledby ?? parentField?.labelId"
            :aria-disabled="disabled"
            @focusin="onFocusin"
            @blur="onBlur"
            @mouseleave="focusItem(undefined)"
            @keydown="onListKeyDown">
            <transition-group :name="animation">
                <slot>
                    <template
                        v-for="option in normalizedOptions"
                        :key="option.key">
                        <ul v-if="isGroupOption(option)" role="group">
                            <o-listbox-item
                                v-bind="option.attrs"
                                :label="option.label"
                                :hidden="option.hidden"
                                disabled
                                role="presentation" />

                            <o-listbox-item
                                v-for="_option in option.options"
                                v-bind="_option.attrs"
                                :key="_option.key"
                                :value="_option.value"
                                :label="_option.label"
                                :hidden="_option.hidden"
                                :aria-setsize="getOptionsLength(option.options)"
                                :aria-posinset="
                                    findOptionIndex(option.options, _option) + 1
                                " />
                        </ul>

                        <o-listbox-item
                            v-else
                            v-bind="option.attrs"
                            :value="option.value"
                            :label="option.label"
                            :hidden="option.hidden"
                            :aria-setsize="getOptionsLength(normalizedOptions)"
                            :aria-posinset="
                                findOptionIndex(normalizedOptions, option) + 1
                            " />
                    </template>
                </slot>
            </transition-group>
        </component>

        <transition :name="animation">
            <div
                v-if="!hasViableItems && ($slots.empty || emptyLabel)"
                :class="emptyClasses">
                <slot name="empty">
                    {{ emptyLabel }}
                </slot>
            </div>
        </transition>

        <div v-if="$slots.footer" :class="footerClasses">
            <slot name="footer" />
        </div>
    </div>
</template>
