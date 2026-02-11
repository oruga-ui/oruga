<script setup lang="ts" generic="T = string">
import { computed, useAttrs, useTemplateRef, watchEffect, ref } from "vue";

import OAutocomplete from "../autocomplete/Autocomplete.vue";
import OTag from "../tag/Tag.vue";

import { getDefault } from "@/utils/config";
import { isEqual } from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useInputHandler,
    useIndexer,
    type Option,
} from "@/composables";

import type { TaginputProps } from "./props";
import type { Numberish } from "@/types";
import type { DropdownItemProps } from "../dropdown/props";
import type { ComponentExposed } from "vue-component-type-helpers";

/**
 * A simple tag input field that can have autocomplete functionality.
 * @displayName Taginput
 * @style _taginput.scss
 */
defineOptions({
    isOruga: true,
    name: "OTaginput",
    configField: "taginput",
    inheritAttrs: false,
});

type ModelValue = TaginputProps<T>["modelValue"];

const props = withDefaults(defineProps<TaginputProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    input: "",
    options: undefined,
    filter: undefined,
    size: () => getDefault("taginput.size"),
    variant: () => getDefault("taginput.variant"),
    maxitems: undefined,
    maxlength: undefined,
    counter: () => getDefault("taginput.counter", true),
    openOnFocus: () => getDefault("taginput.openOnFocus", true),
    keepOpen: () => getDefault("taginput.keepOpen", false),
    placeholder: undefined,
    expanded: false,
    disabled: false,
    keepFirst: () => getDefault("taginput.keepFirst", false),
    allowNew: () => getDefault("taginput.allowNew", false),
    allowDuplicates: () => getDefault("taginput.allowDuplicates", false),
    validateItem: () => true,
    createItem: (item: T | string) => item as T,
    closeable: () => getDefault("taginput.closeable", true),
    iconPack: () => getDefault("taginput.iconPack"),
    icon: () => getDefault("taginput.icon"),
    closeIcon: () => getDefault("taginput.closeIcon", "close"),
    ariaCloseLabel: () => getDefault("taginput.ariaCloseLabel", "Remove"),
    autocomplete: () => getDefault("taginput.autocomplete", "off"),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidity: undefined,
    teleport: () => getDefault("taginput.teleport", false),
    autocompleteClasses: () => getDefault("taginput.autocompleteClasses", {}),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {unknown[]} - updated modelValue prop
     */
    "update:model-value": [value: ModelValue[]];
    /**
     * input prop two-way binding
     * @param value {string} - updated input prop
     */
    "update:input": [value: string];
    /**
     * on input change event
     * @param value {string} - input value
     * @param event {Event} - native event
     */
    input: [value: string, event: Event];
    /**
     * new item got added
     * @param value {unknown} - added item
     */
    add: [value: T];
    /**
     * item got removed
     * @param value {unknown} - removed item
     */
    remove: [value: T];
    /**
     * on input focus event
     * @param event {Event} - native event
     */
    focus: [event: Event];
    /**
     * on input blur event
     * @param event {Event} - native event
     */
    blur: [event: Event];
    /**
     * on input invalid event
     * @param event {Event} - native event
     */
    invalid: [event: Event];
    /**
     * on icon click event
     * @param event {Event} - native event
     */
    "icon-click": [event: Event];
    /**
     * on icon right click event
     * @param event {Event} - native event
     */
    "icon-right-click": [event: Event];
    /** the list inside the dropdown reached the start */
    "scroll-start": [];
    /** the list inside the dropdown reached it's end */
    "scroll-end": [];
}>();

defineSlots<{
    /**
     * Define the taginput items here
     * @param toggle {(): void} - toggle dropdown active state
     */
    default?(props: { toggle: (event: Event) => void }): void;
    /**
     * Define an additional header
     * @param toggle {(): void} - toggle dropdown active state
     */
    header?(props: { toggle: (event: Event) => void }): void;
    /**
     * Define an additional footer
     * @param toggle {(): void} - toggle dropdown active state
     */
    footer?(props: { toggle: (event: Event) => void }): void;
    /**
     * Define the content to show if the list is empty
     * @param toggle {(): void} - toggle dropdown active state
     */
    empty?(props: { toggle: (event: Event) => void }): void;
    /**
     * Override the selected items
     * @param items {(string, object)[]} - selected items
     * @param options {object[]} - selected options
     * @param removeItem {(index, event): void} - remove item function
     */
    selected?(props: {
        items: T[] | undefined;
        options: SelectedTag[];
        removeItem: (index: number, event: Event) => void;
    }): void;
    /**
     * Define a selected option here
     * @param option {object} - option object
     */
    option?(props: { option: Option<DropdownItemProps<T>> }): void;
    /**
     * Override the counter
     * @param items {number} - items count
     * @param total {number} - total count
     */
    counter?(props: { items: number; total: Numberish }): void;
}>();

// define as Component to prevent docs memmory overload
const autocompleteRef = useTemplateRef<
    ComponentExposed<typeof OAutocomplete<T>>
>("autocompleteComponent");

// use form input functionalities
const { checkHtml5Validity, setFocus, onFocus, onBlur, onInvalid } =
    useInputHandler(autocompleteRef, emits, props);

const isDropdownActive = ref(false);

// the selected items, use v-model to make it two-way binding
const selectedItems = defineModel<ModelValue>({ default: undefined });

// the value of the inner input, use v-model:input to make it two-way binding
const inputValue = defineModel<string>("input", { default: "" });

const inputLength = computed(() => inputValue.value.trim().length);
const itemsLength = computed(() => selectedItems.value?.length || 0);

const childItems = computed(() => autocompleteRef.value?.items ?? []);

// create a unique id sequence
const indexer = useIndexer();

type SelectedTag = {
    label: string;
    value: T;
    key: string;
};

/** map the selected items into option items */
const selectedOptions = computed<SelectedTag[]>(() => {
    if (!selectedItems.value) return [];
    return selectedItems.value.map((value) => {
        const option = childItems.value.find((item) =>
            isEqual(value, item.data.value),
        );
        // return the found option or create a new option object
        if (option)
            return {
                label: option.data.label,
                value: option.data.value,
                key: option.identifier,
            };
        else return { label: String(value), value, key: indexer.nextIndex() };
    });
});

/** show the input field if a maxitems hasn't been set or reached */
const hasInput = computed(
    () => props.maxitems == null || itemsLength.value < Number(props.maxitems),
);

watchEffect(() => {
    // blur if input is empty
    if (!hasInput.value) onBlur();
});

function addItem(item?: T | string): void {
    item = item || inputValue.value.trim();

    if (item) {
        const itemToAdd = props.createItem(item);

        if (!selectedItems.value?.length) {
            // Add the item input if not items are set yet
            if (props.validateItem(item)) {
                selectedItems.value = [itemToAdd];
                emits("add", itemToAdd);
            }
        } else {
            // Add the item input if it is not blank
            // or previously added (if not allowDuplicates).
            const add = !props.allowDuplicates
                ? !selectedItems.value.includes(itemToAdd)
                : true;

            if (add && props.validateItem(item)) {
                selectedItems.value = [...selectedItems.value, itemToAdd];
                emits("add", itemToAdd);
            }
        }
    }

    // after autocomplete events
    requestAnimationFrame(() => {
        inputValue.value = "";
        emits("input", "", new InputEvent("input"));
    });
}

function removeItem(index: number, event?: Event): void {
    if (!selectedItems.value?.length) return;
    const item = selectedItems.value[index];
    if (!item) return;
    // create a new array without the removed item at index for reactivity
    const items = selectedItems.value.slice();
    items.splice(index, 1);
    selectedItems.value = items;
    emits("remove", item);
    if (event) event.stopPropagation();
    if (props.openOnFocus && autocompleteRef.value) setFocus();
}

// #region --- Event Handler ---

function onSelect(option: T | undefined): void {
    if (!option) return;
    addItem(option);
}

function onInput(value: string, event: Event): void {
    emits("input", value?.trim(), event);
}

function onBackspace(): void {
    if (!inputValue.value?.length && itemsLength.value > 0)
        // remove last item
        removeItem(itemsLength.value - 1);
}

function onEnter(event: Event): void {
    // Add item if not select only and dropdown selection is closed
    if (props.allowNew && !isDropdownActive.value) {
        event.stopPropagation();
        addItem();
    }
}
// #endregion --- Event Handler ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-taginput"],
    [
        "sizeClass",
        "o-taginput--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-taginput--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "expandedClass",
        "o-taginput--expanded",
        null,
        computed(() => props.expanded),
    ],
    [
        "disabledClass",
        "o-taginput--disabled",
        null,
        computed(() => props.disabled),
    ],
);

const containerClasses = defineClasses([
    "containerClass",
    "o-taginput__container",
]);

const itemClasses = defineClasses(["itemClass", "o-taginput__item"]);

const counterClasses = defineClasses(["counterClass", "o-taginput__counter"]);

const autocompleteRootClasses = defineClasses([
    "autocompleteClasses.rootClass",
    "o-taginput__autocomplete",
]);

const autocompleteInputClasses = defineClasses([
    "autocompleteClasses.inputClasses.inputClass",
    "o-taginput__input",
]);

const attrs = useAttrs();

const autocompleteBind = computed(() => ({
    ...attrs,
    "root-class": getActiveClasses(autocompleteRootClasses),
    "input-classes": {
        "input-class": getActiveClasses(autocompleteInputClasses),
    },
    ...props.autocompleteClasses,
}));

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ checkHtml5Validity, focus: setFocus, value: selectedItems });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <div data-oruga="taginput" :class="rootClasses">
        <div :class="containerClasses" @focus="onFocus" @blur="onBlur">
            <slot
                name="selected"
                :items="selectedItems"
                :options="selectedOptions"
                :remove-item="removeItem">
                <o-tag
                    v-for="(option, index) in selectedOptions"
                    :key="option.key"
                    :label="option.label"
                    :variant="variant"
                    :size="size"
                    :class="itemClasses"
                    :closeable="closeable && !disabled"
                    :close-icon="closeIcon"
                    :close-icon-pack="iconPack"
                    :aria-close-label="ariaCloseLabel"
                    @close="removeItem(index, $event)" />
            </slot>

            <o-autocomplete
                v-show="hasInput"
                ref="autocompleteComponent"
                v-model:active="isDropdownActive"
                v-model:input="inputValue"
                v-bind="autocompleteBind"
                :options="options"
                :filter="filter"
                :placeholder="placeholder"
                :icon="icon"
                :icon-pack="iconPack"
                :maxlength="maxlength"
                :size="size"
                :disabled="disabled"
                :autocomplete="autocomplete"
                :open-on-focus="openOnFocus"
                :keep-first="keepFirst"
                :keep-open="keepOpen"
                :teleport="teleport"
                :has-counter="false"
                :use-html5-validation="false"
                expanded
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                @invalid="onInvalid"
                @keydown.enter="onEnter"
                @keydown.tab="onEnter"
                @keydown.backspace="onBackspace"
                @select="onSelect"
                @scroll-start="$emit('scroll-start')"
                @scroll-end="$emit('scroll-end')"
                @icon-click="$emit('icon-click', $event)"
                @icon-right-click="$emit('icon-right-click', $event)">
                <template v-if="$slots.header" #header="{ toggle }">
                    <slot name="header" :toggle />
                </template>

                <template v-if="$slots.default" #default="{ toggle }">
                    <slot :toggle />
                </template>

                <template v-if="$slots.option" #option="{ option }">
                    <slot name="option" :option="option" />
                </template>

                <template v-if="$slots.empty" #empty="{ toggle }">
                    <slot name="empty" :toggle />
                </template>

                <template v-if="$slots.footer" #footer="{ toggle }">
                    <slot name="footer" :toggle />
                </template>
            </o-autocomplete>
        </div>

        <small
            v-if="counter && (maxitems || maxlength)"
            :class="counterClasses">
            <template v-if="maxlength && inputLength > 0">
                <slot name="counter" :items="inputLength" :total="maxlength">
                    {{ inputLength }} / {{ maxlength }}
                </slot>
            </template>

            <template v-else-if="maxitems">
                <slot name="counter" :items="itemsLength" :total="maxitems">
                    {{ itemsLength }} / {{ maxitems }}
                </slot>
            </template>
        </small>
    </div>
</template>
