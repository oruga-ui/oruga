<script setup lang="ts" generic="T">
import {
    computed,
    ref,
    watch,
    useAttrs,
    useId,
    useTemplateRef,
    type Component,
} from "vue";

import OInput from "../input/Input.vue";
import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    normalizeOptions,
    toOptionsGroup,
    checkOptionsEmpty,
    useInputHandler,
    useSequentialId,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { OptionsItem, OptionsGroupItem } from "@/types";
import type { AutocompleteProps } from "./props";
import { isEqual } from "@/utils/helpers";

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
    backendFiltering: () => getDefault("autocomplete.backendFiltering", false),
    type: "text",
    menuTag: () => getDefault("autocomplete.menuTag", "div"),
    itemTag: () => getDefault("autocomplete.itemTag", "div"),
    size: () => getDefault("autocomplete.size"),
    position: () => getDefault("autocomplete.position", "auto"),
    placeholder: undefined,
    expanded: () => getDefault("autocomplete.expanded", false),
    rounded: false,
    disabled: false,
    maxlength: undefined,
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
     * @param value {unknown} - updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * input prop two-way binding
     * @param value {string} - updated input prop
     */
    "update:input": [value: string];
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on input change event
     * @param value {string} - input value
     * @param event {Event} - native event
     */
    input: [value: string, event: Event];
    /**
     * selected element changed event
     * @param value {unknown} - selected value
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

const slots = defineSlots<{
    /**
     * Define the dropdown items here
     * @param active {boolean} - dropdown active state
     * @param focusedIndex {number | undefined} - index of the focused element
     * @param toggle {(): void} - toggle dropdown active state
     */
    default?(props: {
        active: boolean;
        focusedIndex?: number;
        toggle: (event: Event) => void;
    }): void;
    /**
     * Override the select option
     * @param option {object} - option object
     * @param index {number} - option index
     * @param value {unknown} - option value
     */
    option?(props: { option: OptionsItem<T>; index: number; value: T }): void;
    /**
     * Override the option group
     * @param group {object} - options group
     * @param index {number} - option index
     */
    group?(props: { group: OptionsGroupItem<T>; index: number }): void;
    /** Define an additional header */
    header?(): void;
    /** Define an additional footer */
    footer?(): void;
    /** Define the content to show if the list is empty */
    empty?(): void;
}>();

const dropdownRef = useTemplateRef("dropdownElement");

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

const childItems = computed(() => dropdownRef.value?.items ?? []);

// filter child items based on the input value
watch(inputValue, (filter) => {
    if (props.backendFiltering) return;
    childItems.value.forEach((item) => {
        // check if the value matches the filter string
        const matches =
            typeof props.filter === "function"
                ? props.filter(item.data.value, filter)
                : item.data.matches(filter);

        console.log("hidden", !matches, filter, item.data.label);
        // update hidden state
        item.data.setHidden(!matches);
    });
});

/** is no option visible */
const isEmpty = computed(() => checkOptionsEmpty(groupedOptions));

watch(isEmpty, (empty) => {
    if (isFocused.value) isActive.value = !empty || !!slots.empty;
});

function findOption(
    value: T,
): (typeof childItems)["value"][number] | undefined {
    return childItems.value.find((item) => isEqual(value, item.data.value));
}

// --- Select Feature ---

const dropdownValue = ref<T>();

/**
 * When updating input's value:
 * 1. If value isn't the same as selected, set undefined
 * 2. Close dropdown if value is clear or else open it
 */
watch(
    inputValue,
    (filter) => {
        // find the option for the current selected value
        const currentOption = selectedValue.value
            ? findOption(selectedValue.value)
            : undefined;

        // clear selected if option label does not match the selected value
        if (currentOption && currentOption.data.label !== filter) {
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

/**
 * When updating selected value:
 * 1. Set selected option label as input value
 * 2. Set the selected option value as dropdown value
 */
watch(
    selectedValue,
    (value) => {
        if (!value) return;
        const option = findOption(value);
        if (!option) return;

        // set selected option label as input value
        inputValue.value = props.clearOnSelect ? "" : (option.data.label ?? "");
        checkHtml5Validity();

        // set the selected option value as dropdown value
        dropdownValue.value = option.data.value;
    },
    // set initial values if selected is given
    { immediate: true },
);

/**
 * Set the selected value when the dropdown value changes.
 * 1. update v-model value
 * 2. emit select event
 * 3. close dropdown if not keepOpen
 */
function setSelected(item: T | SpecialOption | undefined): void {
    let value: T | undefined = undefined;

    /** Check if header or footer was selected. */
    if (item === SpecialOption.Header) {
        emits("select-header");
    } else if (item === SpecialOption.Footer) {
        emits("select-footer");
    } else if (item) {
        value = item;
    }

    // set which option is currently selected, update v-model,
    selectedValue.value = value;
    emits("select", value);

    if (props.keepOpen) setFocus();
    else isActive.value = false;
}

// #region --- Event Handler ---

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
        (!!props.options?.length ||
            !!slots.default ||
            !!slots.header ||
            !!slots.footer)
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
    "itemGroupClass",
    "o-autocomplete__item-group",
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

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({
    value: inputValue,
    items: childItems,
    checkHtml5Validity,
    focus: setFocus,
});

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <o-dropdown
        ref="dropdownElement"
        v-model="dropdownValue"
        v-model:active="isActive"
        data-oruga="autocomplete"
        :class="rootClasses"
        :menu-id="menuId"
        :menu-tag="menuTag"
        scrollable
        selectable
        :open-on-click="false"
        :open-on-contextmenu="false"
        :open-on-focus="false"
        :open-on-hover="false"
        :keep-open="keepOpen"
        :keep-first="keepFirst"
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

        <template #default="{ active, toggle, focusedIndex }">
            <o-dropdown-item
                v-if="$slots.header"
                :tag="itemTag"
                :value="SpecialOption.Header"
                :clickable="selectableHeader"
                :class="[...itemClasses, ...itemHeaderClasses]">
                <slot name="header" />
            </o-dropdown-item>

            <slot :active :toggle :focused-index>
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
                        <slot name="group" :group="group" :index="groupIndex">
                            <span> {{ group.label }} </span>
                        </slot>
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
                        <slot
                            name="option"
                            :option="option"
                            :value="option.value"
                            :index="optionIndex">
                            <span> {{ option.label }} </span>
                        </slot>
                    </o-dropdown-item>
                </template>
            </slot>

            <o-dropdown-item
                v-if="isEmpty && $slots.empty"
                :tag="itemTag"
                :class="[...itemClasses, ...itemEmptyClasses]">
                <slot name="empty" />
            </o-dropdown-item>

            <o-dropdown-item
                v-if="$slots.footer"
                :tag="itemTag"
                :value="SpecialOption.Footer"
                :clickable="selectableFooter"
                :class="[...itemClasses, ...itemFooterClasses]">
                <slot name="footer" />
            </o-dropdown-item>
        </template>
    </o-dropdown>
</template>
