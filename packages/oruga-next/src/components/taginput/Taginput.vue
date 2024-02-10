<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";
import OAutocomplete from "../autocomplete/Autocomplete.vue";

import { getOption } from "@/utils/config";
import { getValueByPath } from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useVModelBinding,
    useInputHandler,
} from "@/composables";

import type { ComponentClass } from "@/types";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** @model */
    modelValue: { type: Array, default: () => [] },
    /** Items data */
    data: { type: Array, default: () => [] },
    /** Property of the object (if data is array of objects) to use as display text */
    field: { type: String, default: "value" },
    /** Property of the object (if `data` is array of objects) to use as display text of group */
    groupField: { type: String, default: undefined },
    /** Property of the object (if `data` is array of objects) to use as key to get items array of each group */
    groupOptions: { type: String, default: undefined },
    /**
     * Vertical size of the input control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("taginput.size"),
    },
    /**
     * Color of the each item
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("taginput.variant"),
    },
    /** Limits the number of items, plus item counter */
    maxitems: { type: Number, default: undefined },
    /** Same as native maxlength, plus character counter */
    maxlength: { type: Number, default: undefined },
    /** Show counter when maxlength or maxtags props are passed */
    counter: {
        type: Boolean,
        default: () => getOption("taginput.counter", true),
    },
    /** Opens a dropdown with choices when the input field is focused */
    openOnFocus: { type: Boolean, default: false },
    /** Keep open dropdown list after select */
    keepOpen: {
        type: Boolean,
        default: () => getOption("autocomplete.keepOpen", false),
    },
    /** Input placeholder */
    placeholder: { type: String, default: undefined },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /** Same as native input disabled */
    disabled: { type: Boolean, default: false },
    /**
     * Array of keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
     * which will add a item when typing
     */
    confirmKeys: {
        type: Array as PropType<string[]>,
        default: () => getOption("taginput.confirmKeys", [",", "Tab", "Enter"]),
    },
    /** Array of chars used to split when pasting a new string */
    separators: {
        type: Array as PropType<string[]>,
        default: () => getOption("taginput.separators", [","]),
    },
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: { type: Boolean, default: false },
    /** When autocomplete, it allow to add new items */
    allowNew: { type: Boolean, default: false },
    /** Allows adding the same item multiple time */
    allowDuplicates: { type: Boolean, default: false },
    /** Add autocomplete feature (if true, any Autocomplete props may be used too) */
    allowAutocomplete: { type: Boolean, default: false },
    /** Allow removing last item when pressing given keys, if input is empty */
    removeOnKeys: {
        type: Array as PropType<string[]>,
        default: () => getOption("taginput.removeOnKeys", ["Backspace"]),
    },
    /** Function to validate the value of the item before adding */
    beforeAdding: {
        type: Function as PropType<(value: string) => boolean>,
        default: () => true,
    },
    /** Function to create a new item to push into v-model (items) */
    createItem: {
        type: Function as PropType<(value: any) => any>,
        default: (item: any) => item,
    },
    /** Makes the component check if list reached scroll start or end and emit scroll events. */
    checkScroll: {
        type: Boolean,
        default: () => getOption("taginput.checkScroll", false),
    },
    /** Add close/delete button to the item */
    closable: {
        type: Boolean,
        default: () => getOption("taginput.closable", true),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("taginput.iconPack"),
    },
    /** Icon to be shown */
    icon: {
        type: String,
        default: () => getOption("taginput.icon"),
    },
    /** Icon name of close icon on selected item */
    closeIcon: {
        type: String,
        default: () => getOption("taginput.closeIcon", "close"),
    },
    /** Accessibility label for the close button */
    ariaCloseLabel: {
        type: String,
        default: () => getOption("taginput.ariaCloseLabel"),
    },
    /** Native options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("taginput.autocomplete", "off"),
    },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** The message which is shown when a validation error occurs */
    validationMessage: { type: String, default: undefined },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("taginput.teleport", false),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of input when expanded */
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the input container */
    containerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the input container size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the entered item variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the close button of entered item */
    closeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the entered item */
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the counter element */
    counterClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /**
     * Class configuration for the underlying autocomplete component
     * @ignore
     */
    autocompleteClasses: {
        type: Object,
        default: () => getOption("taginput.autocompleteClasses", {}),
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {any[]} updated modelValue prop
     */
    (e: "update:modelValue", value: any[]): void;
    /**
     * on input change event
     * @param value {any} input value
     */
    (e: "input", value: any): void;
    /**
     * new item got added
     * @param value {any} added item
     */
    (e: "add", value: any): void;
    /**
     * item got removed
     * @param value {any} removed item
     */
    (e: "remove", value: any): void;
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

const autocompleteRef = ref<InstanceType<typeof OAutocomplete>>();

const items = useVModelBinding<any[]>(props, emits, {
    passive: true,
    deep: true,
});

// use form input functionalities
const { setFocus, onFocus, onBlur, onInvalid } = useInputHandler(
    autocompleteRef,
    emits,
    props,
);

const newItem = ref("");
const isComposing = ref(false);

const valueLength = computed(() => newItem.value.trim().length);
const itemsLength = computed(() => items.value.length);

/** When modelValue is changed set internal value. */
watch(
    () => props.modelValue,
    (value) => {
        items.value = Array.isArray(value) ? value.slice(0) : value || [];
    },
);

/** Show the input field if a maxitems hasn't been set or reached. */
const hasInput = computed(
    () => props.maxitems == null || itemsLength.value < props.maxitems,
);

watch(
    () => hasInput.value,
    () => {
        // blur if input is empty
        if (!hasInput.value) onBlur();
    },
);

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

function getNormalizedItemText(item: any): string {
    if (typeof item === "object") item = getValueByPath(item, props.field);
    return `${item}`;
}

function addItem(item?: string): void {
    item = item || newItem.value.trim();

    if (item) {
        if (!props.allowAutocomplete) {
            const reg = separatorsAsRegExp.value;
            if (reg && item.match(reg)) {
                item.split(reg)
                    .map((t) => t.trim())
                    .filter((t) => t.length !== 0)
                    .map(addItem);
                return;
            }
        }
        // Add the item input if it is not blank
        // or previously added (if not allowDuplicates).
        const itemToAdd = props.createItem(item);
        const add = !props.allowDuplicates
            ? items.value.indexOf(itemToAdd) === -1
            : true;
        if (add && props.beforeAdding(item)) {
            items.value.push(itemToAdd);
            emits("add", itemToAdd);
        }
    }

    // after autocomplete events
    requestAnimationFrame(() => {
        newItem.value = "";
        emits("input", newItem.value);
    });
}

function removeItem(index: number, event?: Event): void {
    const item = items.value.splice(index, 1)[0];
    emits("remove", item);
    if (event) event.stopPropagation();
    if (props.openOnFocus && autocompleteRef.value) setFocus();
}

// --- Event Handler ---

function onSelect(option?: string): void {
    if (!option) return;
    addItem(option);
    nextTick(() => (newItem.value = ""));
}

function onKeydown(event: KeyboardEvent): void {
    if (
        props.removeOnKeys.indexOf(event.key) !== -1 &&
        !newItem.value?.length &&
        itemsLength.value > 0
    ) {
        // remove last item
        removeItem(itemsLength.value - 1);
    }
    // Stop if is to accept select only
    if (props.allowAutocomplete && !props.allowNew) return;

    if (props.confirmKeys.indexOf(event.key) >= 0) {
        // Allow Tab to advance to next field regardless
        if (event.key !== "Tab") event.preventDefault();
        if (event.key === "Enter" && isComposing.value) return;
        addItem();
    }
}

function onInput(value: string | number): void {
    emits("input", String(value).trim());
}

function handleOnBlur(event: Event): void {
    // Add item on-blur if not select only
    if (!props.allowAutocomplete) addItem();
    onBlur(event);
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
    "root-class": getActiveClasses(autocompleteRootClasses.value),
    "input-classes": {
        "input-class": getActiveClasses(autocompleteInputClasses.value),
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
</script>

<template>
    <div data-oruga="taginput" :class="rootClasses">
        <div :class="containerClasses" @focus="onFocus" @blur="onBlur">
            <!--
                @slot Override selected items
                @binding {unknown[]} items - selected items
            -->
            <slot name="selected" :items="items">
                <span
                    v-for="(item, index) in items"
                    :key="getNormalizedItemText(item) + index"
                    :class="itemClasses">
                    <span>{{ getNormalizedItemText(item) }}</span>
                    <o-icon
                        v-if="closable"
                        :class="closeClasses"
                        clickable
                        :pack="iconPack"
                        :icon="closeIcon"
                        :aria-label="ariaCloseLabel"
                        both
                        @click="removeItem(index, $event)" />
                </span>
            </slot>

            <o-autocomplete
                v-show="hasInput"
                ref="autocompleteRef"
                v-model="newItem"
                v-bind="autocompleteBind"
                :data="data"
                :field="field"
                :icon="icon"
                :icon-pack="iconPack"
                :maxlength="maxlength"
                :size="size"
                :disabled="disabled"
                :autocomplete="autocomplete"
                :open-on-focus="openOnFocus"
                :keep-first="keepFirst"
                :keep-open="keepOpen"
                :group-field="groupField"
                :group-options="groupOptions"
                :has-counter="false"
                :use-html5-validation="useHtml5Validation"
                :check-scroll="checkScroll"
                :teleport="teleport"
                :confirm-keys="confirmKeys"
                :placeholder="placeholder"
                :validation-message="validationMessage"
                :expanded="expanded"
                @input="onInput"
                @focus="onFocus"
                @blur="handleOnBlur"
                @invalid="onInvalid"
                @keydown="onKeydown"
                @compositionstart="isComposing = true"
                @compositionend="isComposing = false"
                @select="onSelect($event as string)"
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

                <template v-if="$slots.default" #default="props">
                    <!--
                        @slot Override the select option
                        @binding {object} option - option object
                        @binding {number} index - option index
                        @binding {unknown} value - option value
                    -->
                    <slot
                        :option="props.option"
                        :index="props.index"
                        :value="props.value" />
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
            <template v-if="maxlength && valueLength > 0">
                <!--
                    @slot Override the counter
                    @binding {number} items - items count
                    @binding {number} total - total count
                -->
                <slot name="counter" :items="valueLength" :total="maxlength">
                    {{ valueLength }} / {{ maxlength }}
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
