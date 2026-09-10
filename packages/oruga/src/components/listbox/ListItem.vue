<script setup lang="ts" generic="T">
import { useId, computed, useTemplateRef, ref } from "vue";

import OIcon from "../icon/Icon.vue";
import OCheckbox from "../checkbox/Checkbox.vue";

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
    // @ts-expect-error string is not assignable of generic type T
    value: () => useId(),
    label: undefined,
    disabled: false,
    hidden: false,
    icon: undefined,
    iconPack: () => getDefault("listbox.iconPack"),
    iconSize: () => getDefault("listbox.iconSize"),
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    checkboxAttrs: () => getDefault("listbox.checkboxAttrs"),
});

const emits = defineEmits<{
    /**
     * onclick event
     * @param value {unknown} value prop data
     * @param event {event} native event
     */
    click: [value: T, event: Event];
}>();

defineSlots<{
    /**
     * Override the label, default is label prop
     * @param selected {boolean} - item is selected
     * @param disabled {boolean} - item is disabled
     */
    default?(props: { selected: boolean; disabled: boolean }): void;
}>();

const rootRef = useTemplateRef<HTMLElement>("rootElement");

// provided data is a computed ref to ensure reactivity
const providedData = computed<ListItemComponent<T>>(() => ({
    value: props.value as T,
    label: props.label,
    hidden: isHidden.value,
    isViable: isViable.value,
    setHidden,
    selectItem: (): void => rootRef.value?.click(),
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<
    ListboxComponent<T>,
    ListItemComponent<T>
>(rootRef, { data: providedData });

const localHidden = ref(false);
const isHidden = computed(() => props.hidden || localHidden.value);

function setHidden(hidden: boolean): void {
    localHidden.value = hidden;
}

/** Shows if the item is viable or not (not disabled or hidden). */
const isViable = computed(() => !isHidden.value && !props.disabled);

const isDisabled = computed(() => parent.value.disabled || props.disabled);

const isFocused = computed(
    () => item.value.identifier === parent.value.focsuedItem?.identifier,
);

/** Shows if the item is clickable or not. */
const isSelectable = computed(
    () =>
        !isDisabled.value &&
        (parent.value.selectable || parent.value.checkable),
);

const isSelected = computed(() => {
    if (!isDefined(parent.value.selected)) return false;
    if (parent.value.multiple && Array.isArray(parent.value.selected))
        return parent.value.selected.some((selected) =>
            isEqual(item.value.data.value, selected),
        );
    return isEqual(item.value.data.value, parent.value.selected);
});

/** Hover listener, set the item as focused element. */
function focusItem(): void {
    parent.value.focusItem(item.value);
}

/** Click listener, toggle the selection of the item. */
function clickItem(event: Event): void {
    if (!isSelectable.value) return;
    parent.value.selectItem(item.value, !isSelected.value);
    emits("click", providedData.value.value, event);
}

// #region --- Computed Component Classes ---

const itmeClasses = defineClasses(
    ["itemClass", "o-listbox__item"],
    ["itemSelectableClass", "o-listbox__item--selectable", null, isSelectable],
    ["itemSelectedClass", "o-listbox__item--selected", null, isSelected],
    ["itemFocusedClass", "o-listbox__item--focused", null, isFocused],
    ["itemDisabledClass", "o-listbox__item--disabled", null, isDisabled],
);

const iconClasses = defineClasses(["itemIconClass", "o-listbox__item-icon"]);

const checkboxClasses = defineClasses([
    "checkboxClass",
    "o-listbox__item-checkbox",
]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <li
        v-show="!isHidden"
        :id="`${parent.id}-${item.identifier}`"
        ref="rootElement"
        data-oruga="listbox-item"
        :data-id="`listbox-${item.identifier}`"
        :class="itmeClasses"
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
        @pointerenter="focusItem">
        <o-icon
            v-if="icon"
            :icon="icon"
            :pack="iconPack"
            :size="iconSize"
            :class="iconClasses" />

        <o-checkbox
            v-if="parent.checkable"
            v-bind="checkboxAttrs"
            :id="`${parent.id}-${item.identifier}-checkbox`"
            :class="checkboxClasses"
            :model-value="isSelected"
            tabindex="-1"
            :disabled="isDisabled"
            autocomplete="off"
            :use-html5-validation="false"
            @click.stop="clickItem" />

        <slot :selected="isSelected" :disabled="isDisabled">
            <span>{{ label }}</span>
        </slot>
    </li>
</template>
