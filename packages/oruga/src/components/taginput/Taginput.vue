<script setup lang="ts" generic="T extends string | object">
import {
    computed,
    ref,
    useAttrs,
    watchEffect,
    type ComponentInstance,
    type PropType,
} from "vue";

import OIcon from "../icon/Icon.vue";
import OAutocomplete from "../autocomplete/Autocomplete.vue";

import { getOption } from "@/utils/config";
import { getValueByPath } from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useInputHandler,
    useVModel,
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
    /**
     * The input value state
     * @type string[]|object[]
     */
    modelValue: { type: Array as PropType<T[]>, default: () => [] },
    /**
     * Items data
     * @type string[]|object[]
     */
    options: { type: Array as PropType<T[]>, default: () => [] },
    /** Property of the object (if data is array of objects) to use as display text */
    field: { type: String, default: "value" },
    /** Property of the object (if `data` is array of objects) to use as display text of group */
    groupField: { type: String, default: undefined },
    /** Property of the object (if `data` is array of objects) to use as key to get items array of each group */
    groupOptions: { type: String, default: undefined },
    /** Function to format an option to a string for display it in the input (as alternative to field prop) */
    formatter: {
        type: Function as PropType<(value: unknown, option: T) => string>,
        default: undefined,
    },
    /** Function to filter the options based on the input value - default is display text comparison */
    filter: {
        type: Function as PropType<(options: T[], value: string) => T[]>,
        default: undefined,
    },
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
    maxitems: { type: [String, Number], default: undefined },
    /** Same as native maxlength, plus character counter */
    maxlength: { type: [String, Number], default: undefined },
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
        default: () => getOption("taginput.keepOpen", false),
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
    /** Allows adding new items */
    allowNew: {
        type: Boolean,
        default: () => getOption("taginput.allowNew", false),
    },
    /** Allows adding the same item multiple time */
    allowDuplicates: {
        type: Boolean,
        default: () => getOption("taginput.allowDuplicates", false),
    },
    /**
     * Allow removing last item when pressing given keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values),
     * if input is empty
     */
    removeOnKeys: {
        type: Array as PropType<string[]>,
        default: () => getOption("taginput.removeOnKeys", ["Backspace"]),
    },
    /** Function to validate the value of a new item before it got added */
    validateItem: {
        type: Function as PropType<(value: T | string) => boolean>,
        default: () => true,
    },
    /** Function to create a new item to push into v-model (items) */
    createItem: {
        type: Function as PropType<(value: T | string) => T>,
        default: (item: T | string) => item,
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
    /** Enable HTML 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** Custom HTML 5 validation error to set on the form control */
    customValidity: { type: String, default: "" },
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
     * @param value {string[] | object[]} updated modelValue prop
     */
    (e: "update:modelValue", value: T[]): void;
    /**
     * on input change event
     * @param value {string} input value
     */
    (e: "input", value: string): void;
    /**
     * new item got added
     * @param value {string | object} added item
     */
    (e: "add", value: T): void;
    /**
     * item got removed
     * @param value {string | object} removed item
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

const autocompleteRef = ref<ComponentInstance<typeof OAutocomplete<T>>>();

// const items = defineModel<T[]>({ default: () => [] });
const items = useVModel<T[]>();

// use form input functionalities
const { setFocus, onFocus, onBlur, onInvalid } = useInputHandler(
    autocompleteRef,
    emits,
    props,
);

const newItem = ref<string>("");
const isComposing = ref(false);

const valueLength = computed(() => newItem.value.trim().length);
const itemsLength = computed(() => items.value.length);

/** Show the input field if a maxitems hasn't been set or reached. */
const hasInput = computed(
    () => props.maxitems == null || itemsLength.value < Number(props.maxitems),
);

watchEffect(() => {
    // blur if input is empty
    if (!hasInput.value) onBlur();
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

function getNormalizedItemText(item: T): string {
    if (typeof item === "object") item = getValueByPath(item, props.field);
    return `${item}`;
}

function addItem(item?: T | string): void {
    item = item || newItem.value.trim();

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
        // Add the item input if it is not blank
        // or previously added (if not allowDuplicates).
        const itemToAdd = props.createItem(item);
        const add = !props.allowDuplicates
            ? !items.value.includes(itemToAdd)
            : true;

        if (add && props.validateItem(item)) {
            items.value = [...items.value, itemToAdd];
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
    const item = items.value.at(index);
    items.value = items.value.toSpliced(index, 1);
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
        !newItem.value?.length &&
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

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: items });
</script>

<template>
    <div data-oruga="taginput" :class="rootClasses">
        <div :class="containerClasses" @focus="onFocus" @blur="onBlur">
            <!--
                @slot Override selected items
                @binding {(string, object)[]} items - selected items
            -->
            <slot name="selected" :items="items" :remove-item="removeItem">
                <span
                    v-for="(item, index) in items"
                    :key="getNormalizedItemText(item) + index"
                    :class="itemClasses"
                    :tabindex="0"
                    @keydown.enter="removeItem(index, $event)">
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
                v-model:input="newItem"
                v-bind="autocompleteBind"
                :options="options"
                :field="field"
                :group-field="groupField"
                :group-options="groupOptions"
                :formatter="formatter"
                :filter="filter"
                :icon="icon"
                :icon-pack="iconPack"
                :maxlength="maxlength"
                :size="size"
                :disabled="disabled"
                :autocomplete="autocomplete"
                :open-on-focus="openOnFocus"
                :keep-first="keepFirst"
                :keep-open="keepOpen"
                :has-counter="false"
                :use-html5-validation="useHtml5Validation"
                :custom-validity="customValidity"
                :check-scroll="checkScroll"
                :teleport="teleport"
                :confirm-keys="confirmKeys"
                :placeholder="placeholder"
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
