<script setup lang="ts" generic="T">
import { useId, computed, useTemplateRef, ref } from "vue";

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
    name: "OListItem",
    configField: "listbox",
});

const props = withDefaults(defineProps<ListItemProps<T>>(), {
    override: undefined,
    value: undefined,
    label: undefined,
    disabled: false,
    hidden: false,
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    parentKey: undefined,
    tag: () => getDefault("listbox.itemTag", "li"),
});

const emits = defineEmits<{
    /**
     * onclick event
     * @param value {unknown} value prop data
     * @param event {event} native event
     */
    click: [value: T, event: Event];
}>();

const key = props.parentKey ?? "listbox";

const itemValue = props.value ?? useId();

const rootRef = useTemplateRef<HTMLElement>("rootElement");

// provided data is a computed ref to ensure reactivity
const providedData = computed<ListItemComponent<T>>(() => ({
    ...props,
    value: itemValue,
    hidden: isHidden,
    clickItem,
    setHidden,
    isViable,
    matches,
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<
    ListboxComponent<T>,
    ListItemComponent<T>
>(rootRef, { key, data: providedData });

const localHidden = ref(false);
const isHidden = computed(() => props.hidden || localHidden.value);

function setHidden(hidden: boolean): void {
    localHidden.value = hidden;
}

const isDisabled = computed(() => parent.value.disabled || props.disabled);

const isSelected = computed(() => {
    if (!isDefined(parent.value.selected)) return false;
    if (parent.value.multiple && Array.isArray(parent.value.selected))
        return parent.value.selected.some((selected) =>
            isEqual(itemValue, selected),
        );
    return isEqual(itemValue, parent.value.selected);
});

const isFocused = computed(
    () => item.value.identifier === parent.value.focsuedIdentifier,
);

/** Click listener, toggle the selection of the item. */
function clickItem(event: Event): void {
    if (isDisabled.value) return;
    parent.value.selectItem(item.value, !isSelected.value);
    emits("click", itemValue as T, event);
}

/** Set the item as focused element. */
function focusItem(): void {
    parent.value.setFocus(item.value);
}

/** Checks if the item is viable (not disabled or hidden). */
function isViable(): boolean {
    return !isHidden.value && !props.disabled;
}

/** Check if a value matches the label (startsWith). */
function matches(value: string): boolean {
    return !!props.label?.toLowerCase().startsWith(value.toLowerCase());
}

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["itemClass", "o-listbox__item"],
    ["itemDisabledClass", "o-listbox__item--disabled", null, isDisabled],
    ["itemSelectedClass", "o-listbox__item--selected", null, isSelected],
    ["itemFocusedClass", "o-listbox__item--focused", null, isFocused],
);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <component
        :is="tag"
        v-show="!isHidden"
        :id="`${parent.id}-${item.identifier}`"
        ref="rootElement"
        :data-oruga="`${key}-item`"
        :data-id="`${key}-${item.identifier}`"
        :class="rootClasses"
        role="option"
        tabindex="-1"
        :aria-selected="
            parent.selectable && !parent.multiple ? isSelected : undefined
        "
        :aria-checked="
            parent.selectable && parent.multiple ? isSelected : undefined
        "
        :aria-hidden="isHidden"
        :aria-disabled="isDisabled"
        :aria-label="ariaLabel ?? label"
        :aria-labelledby="ariaLabelledby"
        @click.prevent="clickItem"
        @mouseenter="focusItem">
        <!--
            @slot Override the label, default is label prop
            @binding {boolean} selected - item is selected
            @binding {boolean} disabled - item is disabled
        -->
        <slot :selected="isSelected" :disabled="disabled">{{ label }}</slot>
    </component>
</template>
