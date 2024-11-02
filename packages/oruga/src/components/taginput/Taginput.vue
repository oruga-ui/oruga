<script setup lang="ts" generic="T = string">
import {
    computed,
    ref,
    useAttrs,
    useTemplateRef,
    useId,
    watchEffect,
} from "vue";

import OIcon from "../icon/Icon.vue";
import OAutocomplete from "../autocomplete/Autocomplete.vue";

import { getOption } from "@/utils/config";
import {
    defineClasses,
    getActiveClasses,
    normalizeOptions,
    findOption,
    useInputHandler,
} from "@/composables";

import type { TaginputProps } from "./props";

/**
 * A simple tag input field that can have autocomplete functionality
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
    size: () => getOption("taginput.size"),
    variant: () => getOption("taginput.variant"),
    maxitems: undefined,
    maxlength: undefined,
    counter: () => getOption("taginput.counter", true),
    openOnFocus: false,
    keepOpen: () => getOption("taginput.keepOpen", false),
    placeholder: undefined,
    expanded: false,
    disabled: false,
    confirmKeys: () => getOption("taginput.confirmKeys", [",", "Tab", "Enter"]),
    separators: () => getOption("taginput.separators", [","]),
    keepFirst: false,
    allowNew: () => getOption("taginput.allowNew", false),
    allowDuplicates: () => getOption("taginput.allowDuplicates", false),
    removeOnKeys: () => getOption("taginput.removeOnKeys", ["Backspace"]),
    validateItem: () => true,
    createItem: (item: T | string) => item as T,
    checkScroll: () => getOption("taginput.checkScroll", false),
    closable: () => getOption("taginput.closable", true),
    iconPack: () => getOption("taginput.iconPack"),
    icon: () => getOption("taginput.icon"),
    closeIcon: () => getOption("taginput.closeIcon", "close"),
    ariaCloseLabel: () => getOption("taginput.ariaCloseLabel"),
    autocomplete: () => getOption("taginput.autocomplete", "off"),
    useHtml5Validation: () => getOption("useHtml5Validation", true),
    customValidity: undefined,
    teleport: () => getOption("taginput.teleport", false),
    autocompleteClasses: () => getOption("taginput.autocompleteClasses", {}),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string[] | number[] | object[]} updated modelValue prop
     */
    (e: "update:modelValue", value: ModelValue[]): void;
    /**
     * input prop two-way binding
     * @param value {string} updated input prop
     */
    (e: "update:input", value: string): void;
    /**
     * on input change event
     * @param value {string} input value
     */
    (e: "input", value: string): void;
    /**
     * new item got added
     * @param value {string | number | object} added item
     */
    (e: "add", value: T): void;
    /**
     * item got removed
     * @param value {string | number | object} removed item
     */
    (e: "remove", value: T): void;
    /**
     * on input focus event
     * @param event {Event} native event
     */
    (e: "focus", event: Event): void;
    /**
     * on input blur event
     * @param event {Event} native event
     */
    (e: "blur", event: Event): void;
    /**
     * on input invalid event
     * @param event {Event} native event
     */
    (e: "invalid", event: Event): void;
    /**
     * on icon click event
     * @param event {Event} native event
     */
    (e: "icon-click", event: Event): void;
    /**
     * on icon right click event
     * @param event {Event} native event
     */
    (e: "icon-right-click", event: Event): void;
    /** the list inside the dropdown reached the start */
    (e: "scroll-start"): void;
    /** the list inside the dropdown reached it's end */
    (e: "scroll-end"): void;
}>();

const autocompleteRef = useTemplateRef("autocompleteComponent");

// use form input functionalities
const { setFocus, onFocus, onBlur, onInvalid } = useInputHandler(
    autocompleteRef,
    emits,
    props,
);

/** the selected items, use v-model to make it two-way binding */
const selectedItems = defineModel<ModelValue>({ default: undefined });

/** the value of the inner input, use v-model:input to make it two-way binding */
const inputValue = defineModel<string>("input", { default: "" });

const inputLength = computed(() => inputValue.value.trim().length);
const itemsLength = computed(() => selectedItems.value?.length || 0);

const isComposing = ref(false);

/** normalized programamtic options */
const normalizedOptions = computed(() => normalizeOptions<T>(props.options));

/** map the selected items into option items */
const selectedOptions = computed(() => {
    if (!selectedItems.value) return [];
    return selectedItems.value.map((value) => {
        const option = findOption(normalizedOptions, value);
        // return the found option or create a new option object
        if (option) return option;
        else return { label: value, value, key: useId() };
    });
});

/** show the input field if a maxitems hasn't been set or reached */
const hasInput = computed(
    () => props.maxitems == null || itemsLength.value < Number(props.maxitems),
);

watchEffect(() => {
    // blur if input is empty
    if (!hasInput.value) onBlur(new Event("blur"));
});

/**
 * If input has pasteSeparators prop,
 * returning new RegExp used to split pasted string.
 */
const separatorsAsRegExp = computed(() =>
    props.separators.length
        ? new RegExp(
              props.separators
                  .map((s) =>
                      s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : null,
                  )
                  .join("|"),
              "g",
          )
        : null,
);

function addItem(item?: T | string): void {
    item = item || inputValue.value.trim();

    if (item) {
        if (typeof item === "string") {
            const reg = separatorsAsRegExp.value;
            if (reg && item.match(reg)) {
                item.split(reg)
                    .map((t) => t.trim())
                    .filter((t) => t.length !== 0)
                    .map(addItem);
                return;
            }
        }
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
        emits("input", "");
    });
}

function removeItem(index: number, event?: Event): void {
    if (!selectedItems.value?.length) return;
    const item = selectedItems.value.at(index);
    if (!item) return;
    selectedItems.value = selectedItems.value.toSpliced(index, 1);
    emits("remove", item);
    if (event) event.stopPropagation();
    if (props.openOnFocus && autocompleteRef.value) setFocus();
}

// --- Event Handler ---

function onSelect(option: T): void {
    if (!option) return;
    addItem(option);
}

function onInput(value: string): void {
    emits("input", value.trim());
}

function onKeydown(event: KeyboardEvent): void {
    if (
        props.removeOnKeys.indexOf(event.key) >= 0 &&
        !inputValue.value?.length &&
        itemsLength.value > 0
    ) {
        // remove last item
        removeItem(itemsLength.value - 1);
    }

    if (props.confirmKeys.indexOf(event.key) >= 0) {
        // Allow Tab to advance to next field regardless
        if (event.key !== "Tab") event.preventDefault();
        if (event.key === "Enter" && isComposing.value) return;
        // Add item if not select only
        if (props.allowNew) addItem();
    }
}

// --- Computed Component Classes ---

const attrs = useAttrs();

const autocompleteRootClasses = defineClasses([
    "autocompleteClasses.rootClass",
    "o-taginput__autocomplete",
]);

const autocompleteInputClasses = defineClasses([
    "autocompleteClasses.inputClasses.inputClass",
    "o-taginput__input",
]);

const autocompleteBind = computed(() => ({
    ...attrs,
    "root-class": getActiveClasses(autocompleteRootClasses),
    "input-classes": {
        "input-class": getActiveClasses(autocompleteInputClasses),
    },
    ...props.autocompleteClasses,
}));

const rootClasses = defineClasses(
    ["rootClass", "o-taginput"],
    [
        "expandedClass",
        "o-taginput--expanded",
        null,
        computed(() => props.expanded),
    ],
);

const containerClasses = defineClasses(
    ["containerClass", "o-taginput__container"],
    [
        "sizeClass",
        "o-taginput__container--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
);

const itemClasses = defineClasses(
    ["itemClass", "o-taginput__item"],
    [
        "variantClass",
        "o-taginput__item--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

const closeClasses = defineClasses(["closeClass", "o-taginput__item__close"]);

const counterClasses = defineClasses(["counterClass", "o-taginput__counter"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: selectedItems });
</script>

<template>
    <div data-oruga="taginput" :class="rootClasses">
        <div :class="containerClasses" @focus="onFocus" @blur="onBlur">
            <!--
                @slot Override selected items
                @binding {(string, object)[]} items - selected items
                @binding {object[]} options - selected options
            -->
            <slot
                name="selected"
                :items="selectedItems"
                :options="selectedOptions"
                :remove-item="removeItem">
                <span
                    v-for="(option, index) in selectedOptions"
                    :key="option.key"
                    :class="itemClasses">
                    <span> {{ option.label }}</span>

                    <o-icon
                        v-if="closable"
                        :class="closeClasses"
                        :pack="iconPack"
                        :icon="closeIcon"
                        clickable
                        tabindex="0"
                        role="button"
                        :aria-label="ariaCloseLabel"
                        both
                        @keydown.enter="removeItem(index, $event)"
                        @click="removeItem(index, $event)" />
                </span>
            </slot>

            <o-autocomplete
                v-show="hasInput"
                ref="autocompleteComponent"
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
                :check-scroll="checkScroll"
                :confirm-keys="confirmKeys"
                :teleport="teleport"
                :has-counter="false"
                :use-html5-validation="false"
                expanded
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                @invalid="onInvalid"
                @keydown="onKeydown"
                @compositionstart="isComposing = true"
                @compositionend="isComposing = false"
                @select="onSelect"
                @scroll-start="$emit('scroll-start')"
                @scroll-end="$emit('scroll-end')"
                @icon-click="$emit('icon-click', $event)"
                @icon-right-click="$emit('icon-right-click', $event)">
                <template v-if="$slots.header" #header>
                    <!--
                        @slot Define an additional header
                    -->
                    <slot name="header" />
                </template>

                <template
                    v-if="$slots.default"
                    #default="{ option, index, value }">
                    <!--
                        @slot Override the select option
                        @binding {object} option - option object
                        @binding {number} index - option index
                        @binding {unknown} value - option value
                    -->
                    <slot :option="option" :index="index" :value="value" />
                </template>

                <template v-if="$slots.empty" #empty>
                    <!--
                        @slot Define content for empty state 
                    -->
                    <slot name="empty" />
                </template>

                <template v-if="$slots.footer" #footer>
                    <!--
                        @slot Define an additional footer
                    -->
                    <slot name="footer" />
                </template>
            </o-autocomplete>
        </div>

        <small
            v-if="counter && (maxitems || maxlength)"
            :class="counterClasses">
            <template v-if="maxlength && inputLength > 0">
                <!--
                    @slot Override the counter
                    @binding {number} items - items count
                    @binding {number} total - total count
                -->
                <slot name="counter" :items="inputLength" :total="maxlength">
                    {{ inputLength }} / {{ maxlength }}
                </slot>
            </template>

            <template v-else-if="maxitems">
                <!--
                    @slot Override the counter
                    @binding {number} items - items count
                    @binding {number} total - total count
                -->
                <slot name="counter" :items="itemsLength" :total="maxitems">
                    {{ itemsLength }} / {{ maxitems }}
                </slot>
            </template>
        </small>
    </div>
</template>
