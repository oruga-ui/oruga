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
    // @ts-expect-error string is not assignable of generic type T
    value: () => useId(),
    label: undefined,
    disabled: false,
    clickable: true,
    hidden: false,
    tag: () => getDefault("dropdown.itemTag", "div"),
});

const emits = defineEmits<{
    /**
     * onclick event
     * @param value {unknown} - value prop data
     * @param event {event} - native event
     */
    click: [value: T, event: Event];
}>();

defineSlots<{
    /** Override the label, default is label prop */
    default?(): void;
}>();

const rootRef = useTemplateRef<HTMLElement>("rootElement");

// provided data is a computed ref to ensure reactivity
const providedData = computed<DropdownItemComponent<T>>(() => ({
    value: props.value,
    disabled: props.disabled,
    hidden: props.hidden,
    clickable: props.clickable,
    selectItem: (): void => rootRef.value?.click(),
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<
    DropdownComponent<T>,
    DropdownItemComponent<T>
>(rootRef, { data: providedData });

/** Shows if the item is clickable or not. */
const isClickable = computed(
    () => !parent.value.disabled && !props.disabled && props.clickable,
);

const isSelected = computed(() => {
    if (!isDefined(parent.value.selected)) return false;
    if (parent.value.multiple && Array.isArray(parent.value.selected))
        return parent.value.selected.some((selected: T) =>
            isEqual(item.value.data.value, selected),
        );
    return isEqual(item.value.data.value, parent.value.selected);
});

const isFocused = computed(
    () => item.value.identifier === parent.value.focsuedIdentifier,
);

/** Click listener, select the item. */
function onClick(event: Event): void {
    if (!isClickable.value) return;
    parent.value.selectItem(item.value, event);
    emits("click", props.value as T, event);
}

/** Hover listener, focus the item. */
function focusItem(): void {
    parent.value.focusItem(item.value);
}

// #region --- Computed Component Classes ---

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

// #endregion --- Computed Component Classes ---
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
        tabindex="-1"
        :aria-selected="parent.selectable ? isSelected : undefined"
        :aria-disabled="disabled"
        @click="onClick"
        @mouseenter="focusItem"
        @keydown.enter="onClick"
        @keydown.space="onClick">
        <slot>{{ label }}</slot>
    </component>
</template>
