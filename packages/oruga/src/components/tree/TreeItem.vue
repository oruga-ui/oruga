<script setup lang="ts" generic="T">
import { computed, ref, useId, useTemplateRef, watch } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    normalizeOptions,
    useProviderChild,
    useProviderParent,
} from "@/composables";

import type {
    TreeComponent,
    TreeItemComponent,
    SubtreeComponent,
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

// provided data is a computed ref to ensure reactivity
const subtreeProvidedData = computed<SubtreeComponent>(() => ({
    expanded: isExpanded.value,
}));

/** provide functionalities and data to subtree child item components */
const { childItems } = useProviderParent({
    key: subtreeKey,
    data: subtreeProvidedData,
});

/** inject functionalities and data from the subtree parent item component */
const { parent: parentSubtree } = useProviderChild<SubtreeComponent>(rootRef, {
    key: subtreeKey,
    needParent: false,
});

// provided data is a computed ref to ensure reactivity
const providedData = computed<TreeItemComponent<T>>(() => ({
    value: props.value as T,
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

const indexer = parent.value.indexer;

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions(props.options, indexer),
);

const hasChildren = computed(() => !!childItems.value.length);

const hasToggleIcon = computed(
    () => parent.value.toggleIcon && hasChildren.value,
);

const isHidden = computed(
    () =>
        props.hidden ?? (parentSubtree.value && !parentSubtree.value.expanded),
);

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
    if (hasToggleIcon.value) {
        const toggleIcon = (event.target as HTMLElement).closest(
            "[data-toggle]",
        );
        if (toggleIcon && rootRef.value?.contains(toggleIcon)) {
            event.stopPropagation();
            toggleExpand();
            return;
        }
    }
    // toggle collapsable if not a dedicated icon is available
    else toggleExpand();

    if (isSelectable.value) {
        // toggle selection state
        parent.value.selectItem(item.value, !isSelected.value);
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
}

/** Check if a value matches the label (startsWith). */
// TODO: refactor to mave into Parent because not name does noch match implementation
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
                v-if="hasToggleIcon"
                data-toggle
                :icon="parent.toggleIcon"
                :pack="itemIconPack"
                :size="itemIconSize"
                :class="toggleClasses"
                :rotation="isExpanded ? 90 : 0" />

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
                    <template
                        v-for="option in normalizedOptions"
                        :key="option.key">
                        <o-tree-item
                            v-if="option.isGroup"
                            v-bind="option.attrs"
                            :label="option.label"
                            :hidden="option.hidden">
                            <o-tree-item
                                v-for="_option in option.options"
                                v-bind="_option.item"
                                :key="_option.key"
                                :hidden="_option.hidden" />
                        </o-tree-item>

                        <o-tree-item
                            v-else
                            v-bind="option.item"
                            :hidden="option.hidden" />
                    </template>
                </slot>
            </ul>
        </transition>
    </li>
</template>
