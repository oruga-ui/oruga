<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    onMounted,
    ref,
    toValue,
    useId,
    useTemplateRef,
    watch,
} from "vue";

import OTreeItem from "../tree/TreeItem.vue";

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
    defineClasses,
    isGroupOption,
    normalizeOptions,
    scrollElementInView,
    useProviderParent,
    useScrollEvents,
    useSequentialId,
} from "@/composables";

import { injectField } from "@/components/field/fieldInjection";

import type { TreeComponent, TreeItem, TreeItemComponent } from "./types";
import type { TreeProps } from "./props";

/**
 * A simple tree, for any type of vertical navigation.
 * @displayName Tree
 * @requires ./TreeItem.vue
 * @style _tree.scss
 */
defineOptions({
    isOruga: true,
    name: "OTree",
    configField: "tree",
});

type ModelValue = TreeProps<T, IsMultiple>["modelValue"];

const props = withDefaults(defineProps<TreeProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    multiple: false,
    options: undefined,
    scrollHeight: () => getDefault("listbox.scrollHeight", "225"),
    disabled: false,
    collapsable: true,
    selectable: true,
    checkable: false,
    emptyLabel: () => getDefault("listbox.emptyLabel"), // TODO: add
    icon: undefined,
    iconPack: () => getDefault("tree.iconPack"),
    iconSize: () => getDefault("tree.iconSize"),
    animation: () => getDefault("listbox.animation", "fade"),
    id: () => useId(),
    ariaLabel: undefined,
    ariaLabelledby: undefined,
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {unknown} - updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on select event - fired before update:modelValue
     * @param value {unknown} - selected value
     */
    select: [value: T];
    /**
     * on tree focus event
     * @param event {Event} native event
     */
    focus: [event: Event];
    /**
     * on tree blur event
     * @param event {Event} native event
     */
    blur: [event: Event];
    /** scrolling inside the tree reached the start */
    "scroll-start": [];
    /** scrolling inside the tree reached the end */
    "scroll-end": [];
}>();

defineSlots<{
    /** Define an additional header */
    header?(): void;
    /** Define the tree items here */
    default?(): void;
    /** Define the content to show if the list is empty */
    empty?(): void;
    /** Define an additional footer */
    footer?(): void;
}>();

const listRef = useTemplateRef("listElement");

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

// #region --- Child Items ---

// provided data is a computed ref to ensure reactivity
const provideData = computed<TreeComponent<T>>(() => ({
    id: props.id,
    disabled: props.disabled,
    multiple: isTrueish(props.multiple),
    collapsable: props.collapsable,
    checkable: props.checkable,
    selectable: props.selectable,
    selected: vmodel.value,
    focsuedItem: focusedItem.value,
    nextSequence,
    selectItem,
    focusItem,
    // resetSelection,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<
    TreeItemComponent<T>,
    TreeComponent<T>
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
function getFirstViableItem(startingIndex: number, delta: 1 | -1): TreeItem<T> {
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
        // Break if the item at this index is viable (not disabled)
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

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

/** Checks if the value of the given item is part of the modelValue. */
function isItemSelected(item: TreeItem<T>): boolean {
    if (isTrueish(props.multiple)) {
        if (Array.isArray(vmodel.value))
            return vmodel.value.some((value) =>
                isEqual(item.data.value, value),
            );
        else return false;
    } else return isEqual(item.data.value, vmodel.value);
}

/** Replaces the modelValue when selectable and multiple. */
function updateSelectedItems(items: TreeItem<T>[]): void {
    if (!props.selectable || !isTrueish(props.multiple)) return;
    const values = items.map((item) => item.data.value).filter(isDefined);
    vmodel.value = values as ModelValue;
}

/** Updates the modelValue for one item when selectable. */
function selectItem(item: TreeItem<T>, selection: boolean = true): void {
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

/** Unselect every tree item excluding the given one. */
// function resetSelection(excludedItems: TreeItem<T>[] = []): void {
//     childItems.value.forEach((item) => {
//         if (!excludedItems.map((i) => i?.identifier).includes(item.identifier))
//             item.data.reset(); // TODO: rename unselect
//     });
// }

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

/**
 * Returns the first selected item or undefined,
 * starting by the given index,
 * alternating between the next and previous elements.
 */
function findFirstSelectedItem(index: number = 0): TreeItem<T> | undefined {
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
const focusedItem = ref<TreeItem<T>>();
const startRangeIndex = ref(-1);

// focus the item when the focused item changes
watch(focusedItem, () => toValue(focusedItem.value?.el)?.focus(), {
    flush: "post",
});

// initialise focus on mounted
onMounted(resetFocus);

/** Clear the focus properties and add the first viable treeitem in the tree to the tab sequence */
function resetFocus(): void {
    // clear focus
    isFocused.value = false;
    focusedItem.value = undefined;
    startRangeIndex.value = -1;

    if (!hasViableItems.value) return;
    // make the first viable tabable
    const firstSelectedItem = findFirstSelectedItem();
    const firstViableItem = firstSelectedItem ?? getFirstViableItem(0, 1);
    const el = toValue(firstViableItem.el);
    if (el) el.tabIndex = 0;
}

/** Sets the beginn index for an multiselection. */
function startFocusRange(): void {
    if (isTrueish(props.multiple))
        startRangeIndex.value = focusedItem.value?.index ?? -1;
}

/** Set an item as focused element. */
function focusItem(item?: TreeItem<T>): void {
    focusedItem.value = item;
}

/** Set focus on an item. */
function setFocus(item: TreeItem<T>): void {
    // set item as focused
    focusedItem.value = item;
    // scroll item into view
    scrollElementInView(listRef, item.el);
}

/** Move the focus one viable item up the list. */
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

/** Move the focus one viable item down the list. */
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

/**
 * Collapse the current focused item if already expanded,
 * else move focus up to the previus viable item.
 */
function onCollapse(event: KeyboardEvent): void {
    if (!focusedItem.value) return;

    if (focusedItem.value.data.expanded)
        focusedItem.value.data.setExpand(false);
    else moveFocusUp(event);
}

/**
 * Expand the current focused item if not already expanded,
 * else move focus down to the next viable item.
 */
function onExpend(event: KeyboardEvent): void {
    if (!focusedItem.value) return;

    if (focusedItem.value.data.hasChildren && !focusedItem.value.data.expanded)
        focusedItem.value.data.setExpand(true);
    else moveFocusDown(event);
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

function onFocusin(event: FocusEvent): void {
    // prevent when already focused
    if (isFocused.value) return;

    isFocused.value = true;

    const firstSelectedItem = findFirstSelectedItem();

    // when an item is already selected
    if (firstSelectedItem)
        // focus this item
        setFocus(firstSelectedItem);
    else
        // else focus first item
        focusFirstItem();

    emits("focus", event);
}

function onFocusout(event: FocusEvent): void {
    // check if focus is still inside the component
    const listElement = event.currentTarget as HTMLElement;
    const newFocus = event.relatedTarget as HTMLElement;
    if (listElement?.contains(newFocus)) return;

    resetFocus();

    emits("blur", event);
}

// #endregion --- Focus Feature ---

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

        // focus the item
        if (matchedItem) setFocus(matchedItem);
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

        case "ArrowLeft":
            onCollapse(event);
            event.preventDefault();
            break;

        case "ArrowRight":
            onExpend(event);
            event.preventDefault();
            break;

        case "Home":
            focusFirstItem();
            event.preventDefault();
            break;

        case "End":
            focusLastItem();
            event.preventDefault();
            break;

        case "Enter":
        case "NumpadEnter":
        case "Space":
            selectFocusedItem(event);
            event.preventDefault();
            break;

        case "Tab":
            // NOOP
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

// #endregion --- Keyboard Listener ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-tree"],
    ["disabledClass", "o-tree--disabled", null, computed(() => props.disabled)],
    [
        "selectableClass",
        "o-tree--selectable",
        null,
        computed(() => props.selectable),
    ],
    [
        "multipleClass",
        "o-tree--multiple",
        null,
        computed(() => !!props.multiple),
    ],
);

const listClasses = defineClasses(
    ["listClass", "o-tree__list"],
    // TODO add class
    [
        "selectableClass",
        "o-tree__selectable",
        null,
        computed(() => props.selectable),
    ],
);

const headerClasses = defineClasses(["headerClass", "o-tree__header"]);

const footerClasses = defineClasses(["footerClass", "o-tree__footer"]);

const emptyClasses = defineClasses(["emptyClass", "o-tree__empty"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div
        data-oruga="tree"
        :class="rootClasses"
        @focusout="onFocusout"
        @mouseleave="isFocused && onFocusout($event)">
        <div v-if="$slots.header" :class="headerClasses">
            <slot name="header" />
        </div>
        {{ focusedItem?.index }}
        <!-- TODO REMVOE -->
        <ul
            :id="id + '_list'"
            ref="listElement"
            role="tree"
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
            @mouseleave="focusItem(undefined)"
            @keydown="onListKeyDown">
            <transition-group :name="animation">
                <slot>
                    <template
                        v-for="option in normalizedOptions"
                        :key="option.key">
                        <OTreeItem
                            v-if="isGroupOption(option)"
                            v-bind="option.attrs"
                            :label="option.label"
                            :hidden="option.hidden">
                            <OTreeItem
                                v-for="_option in option.options"
                                v-bind="_option.attrs"
                                :key="_option.key"
                                :value="_option.value"
                                :label="_option.label"
                                :hidden="_option.hidden" />
                        </OTreeItem>

                        <OTreeItem
                            v-else
                            v-bind="option.attrs"
                            :value="option.value"
                            :label="option.label"
                            :hidden="option.hidden" />
                    </template>
                </slot>
            </transition-group>
        </ul>

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
