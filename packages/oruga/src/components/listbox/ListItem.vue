<script setup lang="ts" generic="T">
import { useId, computed, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { isDefined, isEqual } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

import type { ListboxComponent, ListItemComponent } from "./types";
import type { ListItemProps } from "./props";

/**
 * An option item used by the listbox component.
 * @displayName Listbox Item
 */
defineOptions({
    isOruga: true,
    name: "OListboxItem",
    configField: "listbox",
});

const props = withDefaults(defineProps<ListItemProps<T>>(), {
    override: undefined,
    value: undefined,
    label: undefined,
    disabled: false,
    hidden: false,
    tag: () => getDefault("listbox.itemTag", "li"),
});

const emits = defineEmits<{
    /**
     * onclick event
     * @param value {string | number | object} value prop data
     * @param event {event} Native Event
     */
    click: [value: T, event: Event];
}>();

const itemValue = props.value ?? useId();

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
const providedData = computed<ListItemComponent<T>>(() => ({
    ...props,
    value: itemValue,
    selectItem,
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<
    ListboxComponent<T>,
    ListItemComponent<T>
>(rootRef, { data: providedData });

const isDisabled = computed(() => parent.value.disabled && props.disabled);

const isSelected = computed(() => {
    if (!isDefined(parent.value.selected)) return false;
    if (parent.value.multiple && Array.isArray(parent.value.selected))
        return parent.value.selected.some((selected: T) =>
            isEqual(itemValue, selected),
        );
    return isEqual(itemValue, parent.value.selected);
});

const isFocused = computed(
    () => item.value.identifier === parent.value.focsuedIdentifier,
);

/** Click listener, select the item. */
function selectItem(event: Event): void {
    if (isDisabled.value) return;
    parent.value.selectItem(item.value, event);
    emits("click", itemValue as T, event);
}

/** Hover listener, focus the item. */
function focusItem(): void {
    parent.value.focusItem(item.value);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["itemClass", "o-listbox__item"],
    ["itemDisabledClass", "o-listbox__item--disabled", null, isDisabled],
    ["itemSelectedClass", "o-listbox__item--active", null, isSelected],
    ["itemFocusedClass", "o-listbox__item--focused", null, isFocused],
);
</script>

<template>
    <component
        :is="tag"
        :id="`${parent.id}-${item.identifier}`"
        ref="rootElement"
        data-oruga="listbox-item"
        :data-id="`listbox-${item.identifier}`"
        :class="rootClasses"
        role="option"
        tabindex="-1"
        :aria-selected="parent.selectable ? isSelected : undefined"
        :aria-hidden="hidden"
        :aria-disabled="disabled"
        :aria-label="label"
        @click="selectItem"
        @mouseenter="focusItem"
        @keydown.enter="selectItem"
        @keydown.space="selectItem">
        <!--
            @slot Override the label, default is label prop
            @binding {boolean} selected - item is selected
            @binding {boolean} disabled - item is disabled
        -->
        <slot :selected="isSelected" :disabled="disabled">{{ label }}</slot>
    </component>
</template>
