<script setup lang="ts" generic="T">
import {
    computed,
    ref,
    watch,
    useAttrs,
    useSlots,
    useId,
    triggerRef,
    watchEffect,
    useTemplateRef,
    toValue,
    type Component,
    type MaybeRefOrGetter,
} from "vue";

import OInput from "../input/Input.vue";
import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    normalizeOptions,
    toOptionsGroup,
    toOptionsList,
    findOption,
    checkOptionsEmpty,
    filterOptionsItems,
    useInputHandler,
    useSequentialId,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { OptionsItem, OptionsGroupItem } from "@/types";
import type { AutocompleteProps } from "./props";

enum SpecialOption {
    Header,
    Footer,
}

/**
 * Extended input that provide suggestions while the user types.
 * @displayName Autocomplete
 * @style _autocomplete.scss
 */
defineOptions({
    isOruga: true,
    name: "OAutocomplete",
    configField: "autocomplete",
    inheritAttrs: false,
});

type ModelValue = AutocompleteProps<T>["modelValue"];

const props = withDefaults(defineProps<AutocompleteProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    input: "",
    active: false,
    options: undefined,
    filter: undefined,
    type: "text",
    menuTag: () => getDefault("autocomplete.menuTag", "div"),
    itemTag: () => getDefault("autocomplete.itemTag", "div"),
    size: () => getDefault("autocomplete.size"),
    position: () => getDefault("autocomplete.position", "auto"),
    placeholder: undefined,
    expanded: false,
    rounded: false,
    disabled: false,
    maxlength: undefined,
    checkScroll: () => getDefault("autocomplete.checkScroll", false),
    debounce: () => getDefault("autocomplete.debounce", 400),
    keepFirst: () => getDefault("autocomplete.keepFirst", false),
    clearOnSelect: () => getDefault("autocomplete.clearOnSelect", false),
    openOnFocus: () => getDefault("autocomplete.openOnFocus", false),
    keepOpen: () => getDefault("autocomplete.keepOpen", false),
    maxHeight: () => getDefault("autocomplete.maxHeight"),
    selectOnClose: false,
    selectableHeader: false,
    selectableFooter: false,
    iconPack: () => getDefault("autocomplete.iconPack"),
    icon: () => getDefault("autocomplete.icon"),
    iconClickable: false,
    iconRight: () => getDefault("autocomplete.iconRight"),
    iconRightClickable: false,
    iconRightVariant: undefined,
    clearable: () => getDefault("autocomplete.clearable", false),
    clearIcon: () => getDefault("autocomplete.clearIcon", "close-circle"),
    statusIcon: () => getDefault("statusIcon", true),
    desktopModal: () => getDefault("dropdown.desktopModal", false),
    mobileModal: () => getDefault("autocomplete.mobileModal", false),
    animation: () => getDefault("autocomplete.animation", "fade"),
    autocomplete: () => getDefault("autocomplete.autocomplete", "off"),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidity: undefined,
    teleport: () => getDefault("autocomplete.teleport", false),
    inputClasses: () => getDefault("autocomplete.inputClasses", {}),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * input prop two-way binding
     * @param value {string} updated input prop
     */
    "update:input": [value: string];
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on input change event
     * @param value {string} input value
     * @param event {Event} native event
     */
    input: [value: string, event: Event];
    /**
     * selected element changed event
     * @param value {T} selected value
     */
    select: [value: ModelValue];
    /**
     * header is selected
     */
    "select-header": [];
    /**
     * footer is selected
     */
    "select-footer": [];
    /**
     * on input focus event
     * @param event {Event} native event
     */
    focus: [event: Event];
    /**
     * on input blur event
     * @param event {Event} native event
     */
    blur: [event: Event];
    /**
     * on input invalid event
     * @param event {Event} native event
     */
    invalid: [event: Event];
    /**
     * on icon click event
     * @param event {Event} native event
     */
    "icon-click": [event: Event];
    /**
     * on icon right click event
     * @param event {Event} native event
     */
    "icon-right-click": [event: Event];
    /** the list inside the dropdown reached the start */
    "scroll-start": [];
    /** the list inside the dropdown reached it's end */
    "scroll-end": [];
}>();

const slots = useSlots();

// define as Component to prevent docs memmory overload
const inputRef = useTemplateRef<Component>("inputComponent");

// use form input functionalities
const { checkHtml5Validity, onInvalid, onFocus, onBlur, isFocused, setFocus } =
    useInputHandler(inputRef, emits, props);

// inject parent field component if used inside one
const { parentField } = injectField();

// the active state of the dropdown, use v-model:active to make it two-way binding
const isActive = defineModel<boolean>("active", { default: false });

// the selected value, use v-model to make it two-way binding
const selectedValue = defineModel<ModelValue>({ default: undefined });

// the value of the inner input, use v-model:input to make it two-way binding
const inputValue = defineModel<string>("input", { default: "" });

/** create a unique id for the menu */
const menuId = useId();

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const groupedOptions = computed<OptionsGroupItem<T>[]>(() => {
    const normalizedOptions = normalizeOptions<T>(props.options, nextSequence);
    const groupedOptions = toOptionsGroup<T>(normalizedOptions, nextSequence());
    return groupedOptions;
});

/**
 * Applies an reactive filter for the options based on the input value.
 * Options are filtered by setting the hidden attribute.
 */
watchEffect(() => {
    // filter options by input value
    filterOptionsItems<T>(groupedOptions, (o) => filterItems(o, inputValue));
    // trigger reactive update of groupedOptions
    triggerRef(groupedOptions);
});

function filterItems(
    option: OptionsItem<T>,
    value: MaybeRefOrGetter<string>,
): boolean {
    if (typeof props.filter === "function")
        return props.filter(option.value, toValue(value));
    else
        return !String(option.label)
            .toLowerCase()
            .includes(toValue(value)?.toLowerCase());
}

// set initial inputValue if selected is given
if (selectedValue.value) {
    const selectedOption = findOption(groupedOptions, selectedValue);
    if (selectedOption) inputValue.value = selectedOption.label;
}

/** is no option visible */
const isEmpty = computed(() => checkOptionsEmpty(groupedOptions));

watch(isEmpty, (empty) => {
    if (isFocused.value) isActive.value = !empty || !!slots.empty;
});

// --- Select Feature ---

const dropdownValue = ref();

/**
 * When updating input's value:
 * 1. If value isn't the same as selected, set null
 * 2. Close dropdown if value is clear or else open it
 */
watch(
    inputValue,
    (value) => {
        // find the option for the current selected value
        const currentOption = findOption(groupedOptions, selectedValue);
        // clear selected if option label does not match the selected value
        if (currentOption && currentOption.label !== value) {
            // clear selected value
            selectedValue.value = undefined;
            dropdownValue.value = undefined;
        }

        // Close dropdown if data is empty
        if (isEmpty.value && !slots.empty) {
            isActive.value = false;
        }
    },
    { flush: "post" },
);

function setSelected(item: T | SpecialOption | undefined): void {
    let option: OptionsItem<T> | undefined = undefined;

    /** Check if header or footer was selected. */
    if (item === SpecialOption.Header) {
        emits("select-header");
    } else if (item === SpecialOption.Footer) {
        emits("select-footer");
    } else if (item) {
        // convert grouped options to simple list
        const options: OptionsItem<T>[] = toOptionsList(groupedOptions);

        // get option or undefined for header, footer or group
        option = options.find((o) => o.value === item);
    }

    // set the selected dropdown value
    dropdownValue.value = option;

    // Set which option is currently selected, update v-model,
    selectedValue.value = option?.value;
    emits("select", option?.value);

    // update input value
    inputValue.value = props.clearOnSelect ? "" : option?.label || "";
    checkHtml5Validity();

    if (props.keepOpen) setFocus();
    else isActive.value = false;
}

// --- Event Handler ---

/** emit input change event */
function onInput(value: string, event: Event): void {
    if (isFocused.value) {
        if (!isActive.value && value && (!isEmpty.value || slots.empty)) {
            // open dropdown if input has value and options are available
            isActive.value = true;
        } else if (isActive.value && !value && !props.keepOpen) {
            // close dropdown if input has not value and is not keep open
            isActive.value = false;
        }
    }
    emits("input", value, event);
    checkHtml5Validity();
}

/**
 * Focus listener.
 * If value is the same as selected, select all text.
 */
function handleFocus(event: Event): void {
    // open dropdown if `openOnFocus` and has options
    if (
        props.openOnFocus &&
        (!!props.options?.length || !!slots.header || !!slots.footer)
    )
        isActive.value = true;
    onFocus(event);
}

/**
 * Blur listener.
 * Close on blur.
 */
function handleBlur(event: Event): void {
    onBlur(event);
}

// #endregion --- Event Handler ---

// #region --- Icon Feature ---

const computedIconRight = computed(() =>
    props.clearable && inputValue.value && props.clearIcon
        ? props.clearIcon
        : props.iconRight,
);

const computedIconRightClickable = computed(() =>
    props.clearable ? true : props.iconRightClickable,
);

function rightIconClick(event: Event): void {
    if (props.clearable) {
        inputValue.value = "";
    } else emits("icon-right-click", event);
}

// #endregion --- Icon Feature ---

// #region --- Computed Component Classes ---

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField?.value?.inputAttrs,
    ...attrs,
    ...props.inputClasses,
}));

const rootClasses = defineClasses(["rootClass", "o-autocomplete"]);

const itemClasses = defineClasses(["itemClass", "o-autocomplete__item"]);

const itemEmptyClasses = defineClasses([
    "itemEmptyClass",
    "o-autocomplete__item--empty",
]);

const itemGroupClasses = defineClasses([
    "itemGroupTitleClass",
    "o-autocomplete__item-group-title",
]);

const itemHeaderClasses = defineClasses([
    "itemHeaderClass",
    "o-autocomplete__item-header",
]);

const itemFooterClasses = defineClasses([
    "itemFooterClass",
    "o-autocomplete__item-footer",
]);

// #endregion --- Computed Component Classes ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: inputValue });
</script>

<template>
    <o-dropdown
        v-model="dropdownValue"
        v-model:active="isActive"
        data-oruga="autocomplete"
        :class="rootClasses"
        :menu-id="menuId"
        :menu-tag="menuTag"
        :triggers="[]"
        scrollable
        selectable
        :keep-open="keepOpen"
        :keep-first="keepFirst"
        :check-scroll="checkScroll"
        :select-on-close="selectOnClose"
        :disabled="disabled"
        :desktop-modal="desktopModal"
        :mobile-modal="mobileModal"
        :max-height="maxHeight"
        :animation="animation"
        :position="position"
        :teleport="teleport"
        :expanded="expanded"
        @select="setSelected"
        @scroll-start="emits('scroll-start')"
        @scroll-end="emits('scroll-end')">
        <template #trigger>
            <o-input
                ref="inputComponent"
                v-bind="inputBind"
                v-model="inputValue"
                :type="type"
                :size="size"
                :rounded="rounded"
                :icon="icon"
                :icon-right="computedIconRight"
                :icon-right-clickable="computedIconRightClickable"
                :icon-pack="iconPack"
                :placeholder="placeholder"
                :maxlength="maxlength"
                :autocomplete="autocomplete"
                :expanded="expanded"
                :disabled="disabled"
                :status-icon="statusIcon"
                :debounce="debounce"
                :aria-autocomplete="keepFirst ? 'both' : 'list'"
                :aria-controls="menuId"
                enterkeyhint="enter"
                :use-html5-validation="false"
                @input="onInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @invalid="onInvalid"
                @icon-click="emits('icon-click', $event)"
                @icon-right-click="rightIconClick" />
        </template>

        <o-dropdown-item
            v-if="$slots.header"
            :tag="itemTag"
            :value="SpecialOption.Header"
            :clickable="selectableHeader"
            :class="[...itemClasses, ...itemHeaderClasses]">
            <!--
                @slot Define an additional header
            -->
            <slot name="header" />
        </o-dropdown-item>

        <template v-for="(group, groupIndex) in groupedOptions">
            <o-dropdown-item
                v-if="group.label"
                v-show="!group.hidden"
                :key="group.key"
                v-bind="group.attrs"
                :hidden="group.hidden"
                :value="group.value"
                :tag="itemTag"
                role="presentation"
                :clickable="false"
                :class="[...itemClasses, ...itemGroupClasses]">
                <!--
                    @slot Override the option group
                    @binding {object} group - options group
                    @binding {number} index - option index
                -->
                <slot
                    v-if="$slots.group"
                    name="group"
                    :group="group.label"
                    :index="groupIndex" />
                <span v-else>
                    {{ group.label }}
                </span>
            </o-dropdown-item>

            <o-dropdown-item
                v-for="(option, optionIndex) in group.options"
                v-show="!option.hidden"
                :key="option.key"
                v-bind="option.attrs"
                :value="option.value"
                :hidden="option.hidden"
                :tag="itemTag"
                :class="itemClasses">
                <!--
                    @slot Override the select option
                    @binding {object} option - option object
                    @binding {number} index - option index
                    @binding {unknown} value - option value
                -->
                <slot
                    v-if="$slots.default"
                    :option="option"
                    :value="option.value"
                    :index="optionIndex" />
                <span v-else>
                    {{ option.label }}
                </span>
            </o-dropdown-item>
        </template>

        <o-dropdown-item
            v-if="isEmpty && $slots.empty"
            :tag="itemTag"
            :class="[...itemClasses, ...itemEmptyClasses]">
            <!--
                @slot Define content for empty state
            -->
            <slot name="empty" />
        </o-dropdown-item>

        <o-dropdown-item
            v-if="$slots.footer"
            :tag="itemTag"
            :value="SpecialOption.Footer"
            :clickable="selectableFooter"
            :class="[...itemClasses, ...itemFooterClasses]">
            <!--
                @slot Define an additional footer
            -->
            <slot name="footer" />
        </o-dropdown-item>
    </o-dropdown>
</template>
