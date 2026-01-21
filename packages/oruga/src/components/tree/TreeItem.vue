<script setup lang="ts" generic="T">
import { computed, ref, useId, useTemplateRef, watch } from "vue";

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
    // @ts-expect-error string is not asignale of generic type T
    value: () => useId(),
    options: undefined,
    label: undefined,
    selectable: undefined,
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
     * onclick event
     * @param value {unknown} - value prop data
     * @param event {event} - native event
     */
    click: [value: T, event: Event];
    /** on sub tree opened */
    open: [];
    /** on sub tree closed */
    close: [];
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

const subtreeKey = Symbol("subtree");

/** provide functionalities and data to subtree child item components */
const { childItems } = useProviderParent<SubtreeItemComponent>({
    key: subtreeKey,
});

// provided data is a computed ref to ensure reactivity
const providedSubtreeItemData = computed<SubtreeItemComponent>(() => ({
    setHidden,
}));

/** inject functionalities and data from the subtree parent item component */
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
    matches,
}));

/** inject functionalities and data from the parent tree component */
const { parent, item } = useProviderChild<
    TreeComponent<T>,
    TreeItemComponent<T>
>(rootRef, { data: providedData });

const nextSequence = parent.value.nextSequence;

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
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
    () => !isDisabled.value && (props.selectable ?? parent.value.selectable),
);

const isSelected = computed(() => {
    if (!isDefined(parent.value.selected)) return false;
    if (parent.value.multiple && Array.isArray(parent.value.selected))
        return parent.value.selected.some((selected) =>
            isEqual(item.value.data.value, selected),
        );
    return isEqual(item.value.data.value, parent.value.selected);
});

const itemIconPack = computed(() => props.iconPack ?? parent.value.iconPack);

const itemIconSize = computed(() => props.iconSize ?? parent.value.iconSize);

/** Click listener, toggle the selection of the item. */
function clickItem(event: Event): void {
    // toggle collapsable if not dedicated icon is available
    if (!parent.value.toggleIcon) toggleExpand();

    if (isSelectable.value) {
        const selectionState = parent.value.toggleIcon
            ? isExpanded.value
            : !isSelected.value;
        parent.value.selectItem(item.value, selectionState);
    }

    emits("click", props.value as T, event);
}

/** Set the item as focused element. */
function focusItem(): void {
    parent.value.focusItem(item.value);
}

const isExpanded = ref(props.expanded);
// always expand if not collapsible feature
if (!parent.value.collapsable) isExpanded.value = true;

watch(isExpanded, (value) => (value ? emits("open") : emits("close")));

/** open/close sub item if collapsable */
function toggleExpand(): void {
    if (!parent.value.collapsable) return;
    if (!hasChildren.value) return;
    isExpanded.value = !isExpanded.value;
}

function setExpand(state: boolean): void {
    if (!parent.value.collapsable) return;
    if (!hasChildren.value) return;
    isExpanded.value = state;
    // set hidden state for all the child items
    childItems.value.forEach((item) => item.data.setHidden(!state));
}

const localHidden = ref(false);
const isHidden = computed(() => props.hidden || localHidden.value);

function setHidden(state: boolean): void {
    localHidden.value = state;
}

/** Check if a value matches the label (startsWith). */
function matches(value: string): boolean {
    return !!props.label?.toLowerCase().startsWith(value.toLowerCase());
}

// #region --- Computed Component Classes ---

const itemClasses = defineClasses(
    ["itemClass", "o-tree__item"],
    ["itemSelectableClass", `o-tree__item--selectable`, null, isSelectable],
    ["itemSelectedClass", "o-tree__item--selected", null, isSelected],
    ["itemFocusedClass", "o-tree__item--focused", null, isFocused],
    ["itemDisabledClass", "o-tree__item--disabled", null, isDisabled],
);

const labelClasses = defineClasses(["itemLabelClass", "o-tree__item-label"]);

const iconClasses = defineClasses(["itemIconClass", "o-tree__item-icon"]);

const toggleClasses = defineClasses([
    "itemToggleIconClass",
    "o-tree__item-toggle-icon",
]);

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
        :aria-owns="hasChildren ? subtreeId : undefined">
        <div :class="labelClasses" @mouseenter="focusItem" @click="clickItem">
            <o-icon
                v-if="parent.toggleIcon"
                :icon="parent.toggleIcon"
                :pack="itemIconPack"
                :size="itemIconSize"
                :class="toggleClasses"
                @click.prevent="toggleExpand" />

            <o-icon
                v-if="icon"
                :icon="icon"
                :pack="itemIconPack"
                :size="itemIconSize"
                :class="iconClasses" />

            <slot
                name="label"
                :expanded="isExpanded"
                :selected="isSelected"
                :disabled="disabled">
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
                    <o-tree-item
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
