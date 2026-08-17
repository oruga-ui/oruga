<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    onMounted,
    ref,
    toValue,
    useId,
    useTemplateRef,
    watch,
    watchEffect,
} from "vue";

import OInput from "../input/Input.vue";
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
    normalizeOptions,
    scrollElementInView,
    unrefElement,
    useIndexer,
    useProviderParent,
    useScrollEvents,
} from "@/composables";

import { injectField } from "@/components/field/fieldInjection";

import type { TreeProps } from "./props";
import type { TreeComponent, TreeItem, TreeItemComponent } from "./types";

/**
 * A simple tree view, for any type of hierarchical list.
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

const props = withDefaults(defineProps<TreeProps<T, IsMultiple>>(), {
    override: undefined,
    modelValue: undefined,
    // multiple: false,
    options: undefined,
    scrollHeight: () => getDefault("tree.scrollHeight"),
    disabled: false,
    collapsable: true,
    selectable: false,
    checkable: false,
    emptyLabel: () => getDefault("tree.emptyLabel"),
    filterable: false,
    backendFiltering: false,
    filter: undefined,
    filterIcon: undefined,
    filterDebounce: 400,
    filterPlaceholder: undefined,
    toggleIcon: () => getDefault("tree.toggleIcon", "chevron-right"),
    iconPack: () => getDefault("tree.iconPack"),
    iconSize: () => getDefault("tree.iconSize"),
    animation: () => getDefault("tree.animation", "slide"),
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
    /**
     * on filter change event
     * @param value {string} filter value
     * @param event {Event} native event
     */
    filter: [value: string, event: Event];
}>();

defineSlots<{
    /** Define an additional header */
    header?(): void;
    /**
     * Override the filter input
     * @param value {string} - filter input value
     * @param onChange {(input: string, event: Event): void} - on filter input change event
     * @param onKeydown {(event: Event): void} - on filter input keydown event
     */
    filter?(props: {
        value: string;
        onChange: (input: string, event: Event) => void;
        onKeydown: (event: KeyboardEvent) => void;
    }): void;
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

/** unique key sequencer */
const indexer = useIndexer();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions(props.options, indexer),
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
    toggleIcon: props.toggleIcon,
    iconPack: props.iconPack,
    iconSize: props.iconSize,
    filterActive: !!filterValue.value,
    indexer: indexer,
    selectItem,
    focusItem,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<
    TreeItemComponent<T>,
    TreeComponent<T>
>({ rootRef: listRef, data: provideData });

/**
 * Find the correct object of the item.
 * Child items children might not have a data attribute, the correct object does.
 * @param identifier - The item identifier.
 */
function findChild(identifier: string): TreeItem<T> | undefined {
    return childItems.value.find((child) => child.identifier === identifier);
}

/** Shows if the items are selectable or not. */
const isSelectable = computed(
    () => !props.disabled && (props.selectable || props.checkable),
);

const hasViableItems = computed(() =>
    childItems.value.some((item) => item.data.isViable),
);

/**
 * List of child items without disabled or hidden items.
 * Returns empty list when no items are viable or component is disabled.
 */
const viableItems = computed(() => {
    if (!isSelectable.value || props.disabled) return [];
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
    maxHeight: props.scrollHeight
        ? toCssDimension(props.scrollHeight)
        : undefined,
    overflow: props.scrollHeight ? "auto" : undefined,
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

const flatChilds = (item: TreeItem<T>): TreeItem<T>[] => {
    // find correct object of the item
    // children might not have a data attribute, the correct object does
    const current = findChild(item.identifier);

    if (!current) return [];
    const descendants = current.data.children?.flatMap(flatChilds) ?? [];
    return [...descendants, current];
};

/** Updates the modelValue for one item when selectable. */
function selectItem(item: TreeItem<T>, selection: boolean): void {
    if (!isSelectable.value) return;

    const value = item.data.value;
    if (selection) emits("select", value);

    // set selected option
    if (!isTrueish(props.multiple)) {
        if (!selection) vmodel.value = undefined;
        else if (vmodel.value !== value) {
            // update a single value
            vmodel.value = value as ModelValue;
        }
    } else {
        // set selected option when multiple
        const items: TreeItem<T>[] = [];
        if (props.checkable) {
            // add child items to selection checkable
            const childs = flatChilds(item);
            items.push(...childs);
        } else {
            items.push(item);
        }
        selectItems(items, selection);
    }
}

/**
 * Update the modelValue then selectable and multiple is set.
 * Use selection to define whether the given items should be included or excluded from modelValue.
 * If no selection is given, the modelValue will be replaced by the given items.
 */
function selectItems(items: TreeItem<T>[], selection?: boolean): void {
    if (!isSelectable.value || !isTrueish(props.multiple)) return;

    const values = items.map((item) => item.data.value).filter(isDefined);

    if (vmodel.value && Array.isArray(vmodel.value)) {
        if (selection === true) {
            const set = new Set([...vmodel.value, ...values]);
            // add a value
            vmodel.value = Array.from(set) as ModelValue;
        } else if (selection === false) {
            // remove a value
            vmodel.value = vmodel.value.filter(
                (val) => !values.includes(val),
            ) as ModelValue;
        } else {
            vmodel.value = values as ModelValue;
        }
    } else {
        // init new value array
        vmodel.value = (selection ? values : []) as ModelValue;
    }
}

/** Select a range of items from a staring index to an end index. */
function selectItemRange(start: number, end: number): void {
    if (!isSelectable.value || !isTrueish(props.multiple)) return;
    if (start < 0 || end < 0) return;

    const rangeStart = Math.min(start, end);
    const rangeEnd = Math.max(start, end);
    const items = childItems.value
        // get the items by the rande
        .slice(rangeStart, rangeEnd + 1)
        // remove not viable items
        .filter((item) => item.data.isViable);

    // select all items in the range
    // replaced the existing items
    selectItems(items);
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
watch(
    focusedItem,
    (newFocus, oldFocus) => {
        if (newFocus)
            // focus new element
            toValue(newFocus.el)?.focus();
        else {
            if (oldFocus)
                // blur old if no new focus available to
                unrefElement(oldFocus.el)?.blur();
            // reset focus if no new item is focused
            resetFocus();
        }
    },
    { flush: "post" },
);

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

    if (props.collapsable && focusedItem.value.data.expanded)
        focusedItem.value.data.setExpand(false);
    else moveFocusUp(event);
}

/**
 * Expand the current focused item if not already expanded,
 * else move focus down to the next viable item.
 */
function onExpend(event: KeyboardEvent): void {
    if (!focusedItem.value) return;

    if (
        props.collapsable &&
        focusedItem.value.data.hasChildren &&
        !focusedItem.value.data.expanded
    )
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
    if (!isSelectable.value || !focusedItem.value) return;

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

    emits("focus", event);

    // prevent further when an item is already focused
    if (focusedItem.value) return;

    const firstSelectedItem = findFirstSelectedItem();

    // when an item is already selected
    if (firstSelectedItem)
        // focus this item
        setFocus(firstSelectedItem);
    else
        // else focus first item
        focusFirstItem();
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

// #region --- Filter Feature ---

function onFilterChange(value: string, event: Event): void {
    emits("filter", value, event);

    focusedItem.value = undefined;
    startRangeIndex.value = -1;
}

const filterValue = ref<string>("");

if (!props.backendFiltering) {
    watchEffect(() => {
        if (!props.filterable) return;

        const currentFilter = filterValue.value.trim();

        const updateItemVisibility = (item: TreeItem<T>): boolean => {
            // prevent filtering for presentation items
            if (!item.data || (item.data as any).role === "presentation")
                return false;

            // no filter means not hidden
            if (!currentFilter) {
                // update states
                item.data.setHidden(false);
                item.data.setExpand(false);
                return true;
            }

            const itemMatches =
                typeof props.filter === "function"
                    ? // call filter function if available
                      props.filter(item.data.value, currentFilter)
                    : // else check filter value matches item value
                      matches(item, currentFilter);

            const childMatches = item.data.children
                .map((child) => findChild(child.identifier))
                .filter(isDefined)
                .some((child) => updateItemVisibility(child));

            const shouldHide = !itemMatches && !childMatches;

            // update states
            item.data.setHidden(shouldHide);
            item.data.setExpand(!shouldHide);
            return !shouldHide;
        };

        childItems.value.forEach((item) => updateItemVisibility(item));
    });
}

/** Check if a value matches the label (startsWith). */
function matches(item: TreeItem<T>, value: string): boolean {
    return !!item.data?.label?.toLowerCase().startsWith(value.toLowerCase());
}

// #endregion --- Filter Feature ---

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
            matches(item, value),
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
                selectItems(viableItems.value);
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
    ["rootClass", "o-tree"],
    ["disabledClass", "o-tree--disabled", null, computed(() => props.disabled)],
    [
        "selectableClass",
        "o-tree--selectable",
        null,
        computed(() => props.selectable),
    ],
    [
        "filterableClass",
        "o-tree--filterable",
        null,
        computed(() => props.filterable),
    ],
    [
        "multipleClass",
        "o-tree--multiple",
        null,
        computed(() => !!props.multiple),
    ],
);

const listClasses = defineClasses(["listClass", "o-tree__list"]);

const headerClasses = defineClasses(["headerClass", "o-tree__header"]);

const footerClasses = defineClasses(["footerClass", "o-tree__footer"]);

const filterClasses = defineClasses(["filterClass", "o-tree__filter"]);

const emptyClasses = defineClasses(["emptyClass", "o-tree__empty"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div
        data-oruga="tree"
        :class="rootClasses"
        @focusout="onFocusout"
        @pointerleave="isFocused && onFocusout($event)">
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
                    v-bind="inputAttrs"
                    name="filter"
                    type="search"
                    role="searchbox"
                    :tabindex="!disabled && !isFocused ? 0 : -1"
                    :debounce="filterDebounce"
                    :placeholder="filterPlaceholder"
                    :icon="filterIcon"
                    :disabled="disabled"
                    expanded
                    size="small"
                    aria-label="tree filter input"
                    :aria-owns="id + '_list'"
                    :aria-activedescendant="
                        focusedItem
                            ? `${id}-${focusedItem.identifier}`
                            : undefined
                    "
                    autocomplete="off"
                    :use-html5-validation="false"
                    @input="onFilterChange"
                    @keydown="onFilterKeyDown" />
            </slot>
        </div>

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
            @pointerleave="focusItem(undefined)"
            @keydown="onListKeyDown">
            <transition-group :name="animation">
                <slot>
                    <o-tree-item
                        v-for="option in normalizedOptions"
                        :key="option.key"
                        v-bind="option.item" />
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
