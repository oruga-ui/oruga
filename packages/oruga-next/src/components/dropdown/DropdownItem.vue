<script setup lang="ts" generic="T">
import { computed, onMounted, type Component, type PropType } from "vue";

import { useComputedClass, useClassProps } from "@/composables";
import { getOption } from "@/utils/config";
import { injectDropdown } from "./useDropdownShare";
import { uuid } from "@/utils/helpers";

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
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("dropdown.itemTag", "div"),
    },
    /** Set the tabindex attribute on the dropdown item div (-1 to prevent selection via tab key) */
    tabindex: { type: [Number, String], default: 0 },
    /**
     * Role attribute to be passed to the list item for better accessibility.
     * Use menuitem only in situations where your dropdown is related to a navigation menu.
     * @values listitem, menuitem
     */
    ariaRole: {
        type: String,
        default: getOption("dropdown.itemAriaRole", "listitem"),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "itemClass",
        "itemActiveClass",
        "itemClickableClass",
        "itemDisabledClass",
    ]),
});

const emits = defineEmits<{
    /**
     * onclick event
     * @param value {[String, Number, Boolean, Object, Array]} value prop data
     * @param event {event} Native Event
     */
    (e: "click", value: T, event: Event): void;
}>();

// inject parent dropdown component if used inside one
const { parentDropdown } = injectDropdown<T>();

onMounted(() => {
    if (!parentDropdown.value)
        throw new Error("You should wrap oDropdownItem on a oDropdown");
});

const isClickable = computed(
    () =>
        !parentDropdown.value.props.disabled &&
        !props.disabled &&
        props.clickable,
);

const isActive = computed(() => {
    if (parentDropdown.value.selected === null) return false;
    if (parentDropdown.value.props.multiple)
        return parentDropdown.value.selected.indexOf(props.value as T) >= 0;
    return props.value === parentDropdown.value.selected;
});

/** Click listener, select the item. */
function selectItem(event: Event): void {
    if (!isClickable.value) return;
    parentDropdown.value.selectItem(props.value as T);
    emits("click", props.value as T, event);
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("itemClass", "o-drop__item"),
    {
        [useComputedClass("itemDisabledClass", "o-drop__item--disabled")]:
            parentDropdown.value.props.disabled || props.disabled,
    },
    {
        [useComputedClass("itemActiveClass", "o-drop__item--active")]:
            isActive.value,
    },
    {
        [useComputedClass("itemClickableClass", "o-drop__item--clickable")]:
            isClickable.value,
    },
]);
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
