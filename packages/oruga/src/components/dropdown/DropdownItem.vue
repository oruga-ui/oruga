<script setup lang="ts" generic="T">
import { useId, computed, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { isDefined, isEqual } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

import type { DropdownComponent, DropdownItemComponent } from "./types";
import type { DropdownItemProps } from "./props";

/**
 * An option item used by the dropdown component.
 * @displayName Dropdown Item
 */
defineOptions({
    isOruga: true,
    name: "ODropdownItem",
    configField: "dropdown",
});

const props = withDefaults(defineProps<DropdownItemProps<T>>(), {
    override: undefined,
    value: undefined,
    label: undefined,
    disabled: false,
    clickable: true,
    hidden: false,
    tag: () => getDefault("dropdown.itemTag", "div"),
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

const rootRef = useTemplateRef<Element>("rootElement");

// provided data is a computed ref to ensure reactivity
const providedData = computed<DropdownItemComponent<T>>(() => ({
    ...props,
    $el: rootRef.value,
    value: itemValue,
    selectItem,
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<
    DropdownComponent<T>,
    DropdownItemComponent<T>
>({ data: providedData });

const isClickable = computed(
    () => !parent.value.disabled && !props.disabled && props.clickable,
);

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
    if (!isClickable.value) return;
    parent.value.selectItem(item.value, event);
    emits("click", itemValue as T, event);
}

/** Hover listener, focus the item. */
function focusItem(): void {
    parent.value.focusItem(item.value);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["itemClass", "o-dropdown__item"],
    [
        "itemDisabledClass",
        "o-dropdown__item--disabled",
        null,
        computed(() => parent.value.disabled || props.disabled),
    ],
    ["itemSelectedClass", "o-dropdown__item--active", null, isSelected],
    ["itemClickableClass", "o-dropdown__item--clickable", null, isClickable],
    ["itemFocusedClass", "o-dropdown__item--focused", null, isFocused],
);
</script>

<template>
    <component
        :is="tag"
        :id="`${parent.menuId}-${item.identifier}`"
        ref="rootElement"
        data-oruga="dropdown-item"
        :data-id="`dropdown-${item.identifier}`"
        :class="rootClasses"
        :role="parent.selectable ? 'option' : 'menuitem'"
        :aria-selected="parent.selectable ? isSelected : undefined"
        :aria-disabled="disabled"
        @click="selectItem"
        @mouseenter="focusItem"
        @keydown.enter="selectItem"
        @keydown.space="selectItem">
        <!--
            @slot Override the label, default is label prop 
        -->
        <slot>{{ label }}</slot>
    </component>
</template>
