<script setup lang="ts" generic="T">
import { computed, ref, useId, useTemplateRef } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    normalizeOptions,
    useProviderChild,
    useProviderParent,
    // type ProviderItem,
} from "@/composables";

import type {
    TreeComponent,
    TreeItemComponent,
    // SubtreeComponent,
    SubtreeItemComponent,
} from "./types";
import type { TreeItemProps } from "./props";
import { isDefined, isEqual } from "@/utils/helpers";

/**
 * A tree list item.
 * @displayName Tree Item
 */
defineOptions({
    isOruga: true,
    name: "OTreeItem",
    configField: "tree",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<TreeItemProps<T>>(), {
    override: undefined,
    active: false,
    // @ts-expect-error string is not asignale of generic type T
    value: () => useId(),
    options: undefined,
    label: undefined,
    expanded: false,
    disabled: false,
    hidden: false,
    subtreeId: () => useId(),
    icon: undefined,
    iconPack: () => getDefault("tree.iconPack"),
    iconSize: () => getDefault("tree.iconSize"),
    animation: () => getDefault("tree.animation", "slide"),
    ariaLabel: undefined,
    ariaLabelledby: undefined,
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * onclick event
     * @param value {unknown} - value prop data
     * @param event {event} - native event
     */
    click: [value: T, event: Event];
}>();

defineSlots<{
    /**
     * Override the label, default is label prop
     * @param expanded {boolean} - item is expanded
     * @param selected {boolean} - item is selected
     * @param disabled {boolean} - item is disabled
     */
    label?(props: {
        expanded: boolean;
        selected: boolean;
        disabled: boolean;
    }): void;
    /** Define subtree items here  */
    default?(): void;
}>();

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
// const providedSubtreeData = computed<SubtreeComponent<T>>(() => ({
//     expanded: isExpanded.value,
// }));

const subtreeKey = Symbol("subtree");

/** provide functionalities and data to subtree child item components */
const { childItems } = useProviderParent<SubtreeItemComponent>({
    key: subtreeKey,
    // data: providedSubtreeData,
});

// provided data is a computed ref to ensure reactivity
const providedSubtreeItemData = computed<SubtreeItemComponent>(() => ({
    setHidden,
}));

/** inject functionalities and data from the subtree parent item component */
// const subtreeItem =
// SubtreeComponent
useProviderChild<unknown, SubtreeItemComponent>(rootRef, {
    key: subtreeKey,
    needParent: false,
    data: providedSubtreeItemData,
});

// provided data is a computed ref to ensure reactivity
const providedData = computed<TreeItemComponent<T>>(() => ({
    value: props.value as T,
    hidden: isHidden.value,
    expanded: isExpanded.value,
    isViable: isViable.value,
    hasChildren: hasChildren.value,
    setExpand,
    // reset,
    matches,
}));

/** inject functionalities and data from the parent tree component */
const { parent, item } = useProviderChild<
    TreeComponent<T>,
    TreeItemComponent<T>
>(rootRef, { data: providedData });

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, parent.value.nextSequence),
);

const hasChildren = computed(() => !!childItems.value.length);

/** Shows if the item is viable or not (not disabled or hidden). */
const isViable = computed(() => !isHidden.value && !props.disabled);

const isDisabled = computed(() => parent.value.disabled || props.disabled);

const isFocused = computed(
    () => item.value.identifier === parent.value.focsuedItem?.identifier,
);

/** Shows if the item is selectable or not. */
const isSelectable = computed(
    () => !isDisabled.value && parent.value.selectable,
);

const isSelected = computed(() => {
    if (!isDefined(parent.value.selected)) return false;
    if (parent.value.multiple && Array.isArray(parent.value.selected))
        return parent.value.selected.some((selected) =>
            isEqual(item.value.data.value, selected),
        );
    return isEqual(item.value.data.value, parent.value.selected);
});

/** Click listener, toggle the selection of the item. */
function clickItem(event: Event): void {
    if (!isSelectable.value) return;

    // prevent event boubeling up
    event.stopPropagation();

    // open/close sub item if collapsable
    if (parent.value.collapsable && hasChildren.value)
        isExpanded.value = !isSelected.value;

    parent.value.selectItem(item.value, !isSelected.value);
    emits("click", props.value as T, event);
}

/** Set the item as focused element. */
function focusItem(): void {
    parent.value.focusItem(item.value);
}

const isExpanded = ref(props.expanded);
// always expand if not collapsible feature
if (!parent.value.collapsable) isExpanded.value = true;

function setExpand(state: boolean): void {
    if (!parent.value.collapsable) return;
    isExpanded.value = state;
    // set hidden state for all the child items
    childItems.value.forEach((item) => item.data.setHidden(!state));

    // // expand parent subtree if available
    // if (typeof subtreeItem.parent.value?.setExpand === "function")
    //     subtreeItem.parent.value.setExpand(state);
}

const localHidden = ref(false);
const isHidden = computed(() => props.hidden || localHidden.value);

function setHidden(state: boolean): void {
    localHidden.value = state;
}

// /** Called by the parent to reset this item selection. */
// function reset(): void {
//     // close collapsable if available
//     if (parent.value.collapsable) isExpanded.value = false;
//     // deselect item
//     parent.value.selectItem(item.value, false);
// }

/**
 *  // TODO: check if used?
 *  The point of this method is to collect references to the clicked item and any parent,
 *  this way we can skip resetting those elements.
 */
// function bubbleReset(childs?: ProviderItem<TreeItemComponent<T>>[]): void {
//     if (typeof subtreeItem.parent.value?.bubbleReset === "function") {
//         subtreeItem.parent.value.bubbleReset(
//             childs ? [item.value, ...childs] : [item.value],
//         );
//     }
//     // else if not a sub item reset parent tree
//     else if (typeof parent.value.resetSelection === "function") {
//         parent.value.resetSelection(
//             childs ? [item.value, ...childs] : [item.value],
//         );
//     }
// }

/** Check if a value matches the label (startsWith). */
function matches(value: string): boolean {
    return !!props.label?.toLowerCase().startsWith(value.toLowerCase());
}

// #region --- Computed Component Classes ---

const itemClasses = defineClasses(
    ["itemClass", "o-tree__item"],
    ["itemSelectabelClass", `o-tree__item--selectable`, null, isSelectable],
    ["itemDisabledClass", "o-tree__item--disabled", null, isDisabled],
    ["itemSelectedClass", "o-tree__item--selected", null, isSelected],
    ["itemFocusedClass", "o-tree__item--focused", null, isFocused],
);

const labelClasses = defineClasses(["itemLabelClass", "o-tree__item-label"]);

const subtreeClasses = defineClasses(["subtreeClass", "o-tree__subtree"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <li
        v-show="!hidden"
        :id="`${parent.id}-${item.identifier}`"
        ref="rootElement"
        data-oruga="tree-item"
        :data-id="`tree-${item.identifier}`"
        :class="itemClasses"
        role="treeitem"
        :tabindex="isFocused ? 0 : -1"
        :aria-selected="isSelected"
        :aria-expanded="hasChildren ? isExpanded : undefined"
        :aria-hidden="isHidden"
        :aria-disabled="disabled || parent.disabled"
        :aria-label="ariaLabel ?? label"
        :aria-labelledby="ariaLabelledby"
        :aria-owns="hasChildren ? subtreeId : undefined"
        @click.prevent="clickItem"
        @mouseenter="focusItem">
        <div :class="labelClasses">
            <slot
                name="label"
                :expanded="isExpanded"
                :selected="isSelected"
                :disabled="disabled">
                <o-icon :icon="icon" :pack="iconPack" :size="iconSize" />
                <span>{{ label }}</span>
            </slot>
        </div>

        <!-- sub tree items -->
        <transition v-if="$slots.default || options" :name="animation">
            <ul
                v-show="isExpanded"
                :id="subtreeId"
                :class="subtreeClasses"
                tabindex="-1"
                :aria-hidden="!isExpanded"
                role="group">
                <slot>
                    <OTreeItem
                        v-for="option in normalizedOptions"
                        :key="option.key"
                        v-bind="option.attrs"
                        :value="option.value"
                        :label="option.label"
                        :hidden="option.hidden" />
                </slot>
            </ul>
        </transition>
    </li>
</template>
