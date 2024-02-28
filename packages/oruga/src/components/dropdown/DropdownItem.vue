<script setup lang="ts" generic="T = string">
import { computed, type ComputedRef, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { uuid, isEqual } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

import type { DropdownComponent } from "./types";
import type { ComponentClass, DynamicComponent } from "@/types";

/**
 * @displayName Dropdown Item
 */
defineOptions({
    isOruga: true,
    name: "ODropdownItem",
    configField: "dropdown",
});

const props = defineProps({
    /** The value that will be returned on events and v-model */
    value: {
        type: [String, Number, Boolean, Object, Array] as PropType<T>,
        default: () => uuid(),
    },
    /** Item label, unnecessary when default slot is used */
    label: { type: String, default: undefined },
    /** Item is disabled */
    disabled: { type: Boolean, default: false },
    /** Item is clickable and emit an event */
    clickable: { type: Boolean, default: true },
    /** Dropdown item tag name */
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption<DynamicComponent>("dropdown.itemTag", "div"),
    },
    /** Set the tabindex attribute on the dropdown item div (-1 to prevent selection via tab key) */
    tabindex: { type: [Number, String], default: 0 },
    /**
     * Role attribute to be passed to the list item for better accessibility.
     * Use menuitem only in situations where your dropdown is related to a navigation menu.
     * @values listitem, menuitem, button
     */
    ariaRole: {
        type: String,
        default: getOption("dropdown.itemAriaRole", "listitem"),
    },
    // class props (will not be displayed in the docs)
    /** Class of the dropdown item */
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the dropdown item when active  */
    itemActiveClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the dropdown item when clickable */
    itemClickableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the dropdown item when disabled */
    itemDisabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * onclick event
     * @param value {[String, Number, Boolean, Object, Array]} value prop data
     * @param event {event} Native Event
     */
    (e: "click", value: T, event: Event): void;
}>();

// Inject functionalities and data from the parent component
const { parent } = useProviderChild<ComputedRef<DropdownComponent<T>>>();

const isClickable = computed(
    () => !parent.value.props.disabled && !props.disabled && props.clickable,
);

const isActive = computed(() => {
    if (parent.value.selected === null) return false;
    if (parent.value.props.multiple && Array.isArray(parent.value.selected))
        return parent.value.selected.some((selected) =>
            isEqual(props.value, selected),
        );
    return isEqual(props.value, parent.value.selected);
});

/** Click listener, select the item. */
function selectItem(event: Event): void {
    if (!isClickable.value) return;
    parent.value.selectItem(props.value as T);
    emits("click", props.value as T, event);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["itemClass", "o-drop__item"],
    [
        "itemDisabledClass",
        "o-drop__item--disabled",
        null,
        computed(() => parent.value.props.disabled || props.disabled),
    ],
    ["itemActiveClass", "o-drop__item--active", null, isActive],
    ["itemClickableClass", "o-drop__item--clickable", null, isClickable],
);
</script>

<template>
    <component
        :is="tag"
        :class="rootClasses"
        :role="ariaRole"
        :tabindex="tabindex"
        data-oruga="dropdown-item"
        @click="selectItem">
        <!--
            @slot Override the label, default is label prop 
        -->
        <slot>{{ label }}</slot>
    </component>
</template>
