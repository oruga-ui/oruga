<script setup lang="ts" generic="T = string">
import {
    computed,
    useAttrs,
    useTemplateRef,
    useId,
    watchEffect,
    ref,
    type Component,
} from "vue";

import OAutocomplete from "../autocomplete/Autocomplete.vue";
import OTag from "../tag/Tag.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    getActiveClasses,
    normalizeOptions,
    findOption,
    useInputHandler,
    useSequentialId,
    toOptionsGroup,
    type OptionsGroupItem,
    type OptionItem,
} from "@/composables";

import type { TaginputProps } from "./props";

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
     * Override the selected items
     * @param items {(string, object)[]} - selected items
     * @param options {object[]} - selected options
     * @param removeItem {(index, event): void} - remove item function
     */
    selected?(props: {
        items: T[] | undefined;
        options: OptionItem<T>[];
        removeItem: (index: number, event: Event) => void;
    }): void;
    /** Define an additional header */
    header?(): void;
    /**
     * Define the select option here
     * @param option {object} - option object
     * @param index {number} - option index
     * @param value {unknown} - option value
     */
    default?(props: { option: OptionItem<T>; index: number; value: T }): void;
    /** Define the content to show if the list is empty */
    empty?(): void;
    /** Define an additional footer */
    footer?(): void;
    /**
     * Override the counter
     * @param items {number} - items count
     * @param total {number} - total count
     */
    counter?(): void;
}>();

// define as Component to prevent docs memmory overload
const autocompleteRef = useTemplateRef<Component>("autocompleteComponent");

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

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const groupedOptions = computed<OptionsGroupItem<T>[]>(() => {
    const normalizedOptions = normalizeOptions<T>(props.options, nextSequence);
    const groupedOptions = toOptionsGroup<T>(normalizedOptions, nextSequence());
    return groupedOptions;
});

/** map the selected items into option items */
const selectedOptions = computed(() => {
    if (!selectedItems.value) return [];
    return selectedItems.value.map((value) => {
        const option = findOption<T>(groupedOptions, value);
        // return the found option or create a new option object
        if (option) return option;
        else return { label: String(value), value, key: useId() };
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

// --- Event Handler ---

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

function onEnter(): void {
    // Add item if not select only and dropdown selection is closed
    if (props.allowNew && !isDropdownActive.value) addItem();
}

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
                <template v-if="$slots.header" #header>
                    <slot name="header" />
                </template>

                <template
                    v-if="$slots.default"
                    #default="{ option, index, value }">
                    <slot :option="option" :index="index" :value="value" />
                </template>

                <template v-if="$slots.empty" #empty>
                    <slot name="empty" />
                </template>

                <template v-if="$slots.footer" #footer>
                    <slot name="footer" />
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
