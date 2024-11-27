<script setup lang="ts" generic="T">
import {
    computed,
    nextTick,
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
import { isClient } from "@/utils/ssr";
import {
    unrefElement,
    defineClasses,
    normalizeOptions,
    toOptionsGroup,
    toOptionsList,
    findOption,
    checkOptionsEmpty,
    firstViableOption,
    filterOptionsItems,
    useInputHandler,
    useEventListener,
    isOptionViable,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { ClassBind, OptionsItem, OptionsGroupItem } from "@/types";
import type { AutocompleteProps } from "./props";

enum SpecialOption {
    Header,
    Footer,
}

/** True if the specified option is a special option. */
function isSpecialOption(option: any): option is SpecialOption {
    return option in SpecialOption;
}

/**
 * Extended input that provide suggestions while the user types
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
    confirmKeys: () => getDefault("autocomplete.confirmKeys", ["Tab", "Enter"]),
    mobileModal: () => getDefault("autocomplete.mobileModal", false),
    animation: () => getDefault("autocomplete.animation", "fade"),
    selectOnClickOutside: false,
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
     * on input change event
     * @param value {string} input value
     * @param event {Event} native event
     */
    input: [value: string, event: Event];
    /**
     * selected element changed event
     * @param value {T} selected value
     * @param event {Event} native event
     */
    select: [value: ModelValue, event: Event];
    /**
     * header is selected
     * @param event {Event} native event
     */
    "select-header": [event: Event];
    /**
     * footer is selected
     * @param event {Event} native event
     */
    "select-footer": [event: Event];
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
const dropdownRef = useTemplateRef("dropdownComponent");
const headerRef = useTemplateRef("headerElement");
const footerRef = useTemplateRef("footerElement");
const itemRefs = ref<(HTMLElement | Component)[]>([]);

function setItemRef(
    el: HTMLElement | Component | null,
    groupIndex: number,
    itemIndex: number,
): void {
    if (groupIndex === 0 && itemIndex === 0) itemRefs.value.splice(0);
    if (el) itemRefs.value.push(el);
}

// use form input functionalities
const { checkHtml5Validity, onInvalid, onFocus, onBlur, isFocused, setFocus } =
    useInputHandler(inputRef, emits, props);

// inject parent field component if used inside one
const { parentField } = injectField();

const isActive = ref(false);

/** The selected value, use v-model to make it two-way binding */
const selectedValue = defineModel<ModelValue>({ default: undefined });

/** The value of the inner input, use v-model:input to make it two-way binding */
const inputValue = defineModel<string>("input", { default: "" });

/** create a unique id for the menu */
const menuId = useId();

/** normalized programamtic options */
const groupedOptions = computed<OptionsGroupItem<T>[]>(() => {
    const normalizedOptions = normalizeOptions<T>(props.options);
    const groupedOptions = toOptionsGroup(normalizedOptions);
    return groupedOptions;
});

/**
 * Applies an reactive filter for the options based on the input value.
 * Options are filtered by setting the hidden attribute.
 */
watchEffect(() => {
    // filter options by input value
    filterOptionsItems(groupedOptions, (o) => filterItems(o, inputValue));
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
        if (
            currentOption &&
            currentOption.label !== value &&
            !props.clearOnSelect
        )
            setSelected(undefined, false);

        // Close dropdown if data is empty
        if (isEmpty.value && !slots.empty) isActive.value = false;
        // Close dropdown if input is clear or else open it
        else if (isFocused.value && (!props.openOnFocus || value))
            isActive.value = !!value;
    },
    { flush: "post" },
);

const closeableOptions = computed(() => {
    const options = ["escape", "outside"];
    if (!props.keepOpen) options.push("content");
    return options;
});

function onDropdownClose(method: string): void {
    if (method !== "outside") return;
    if (props.keepFirst && hoveredOption.value && props.selectOnClickOutside)
        setSelected(hoveredOption.value, true);
}

// --- Select Feature ---

/**
 * Set which option is currently selected, update v-model,
 * update input value and close dropdown.
 */
function setSelected(
    option: OptionsItem<T> | undefined,
    closeDropdown: boolean = true,
    event?: Event,
): void {
    selectedValue.value = option?.value;
    emits("select", option?.value, event || new Event("select"));

    if (option) {
        if (props.clearOnSelect) inputValue.value = "";
        else inputValue.value = option.label;
        setHovered(undefined);
    }

    if (closeDropdown) nextTick(() => (isActive.value = false));
    checkHtml5Validity();
}

/** Check if header or footer was selected. */
function selectHeaderOrFooterByClick(
    event: Event,
    origin?: SpecialOption,
    closeDropdown = true,
): void {
    if (
        props.selectableHeader &&
        (headerHovered.value || origin === SpecialOption.Header)
    ) {
        emits("select-header", event);
        if (origin) setHovered(undefined);
        if (closeDropdown) isActive.value = false;
    }
    if (
        props.selectableFooter &&
        (footerHovered.value || origin === SpecialOption.Footer)
    ) {
        emits("select-footer", event);
        if (origin) setHovered(undefined);
        if (closeDropdown) isActive.value = false;
    }
}

// --- Hover Feature ---

const hoveredOption = ref<OptionsItem<T>>();
const headerHovered = ref(false);
const footerHovered = ref(false);

/** Select first option if "keep-first" */
watch(
    groupedOptions,
    (options) => {
        // Keep first option always pre-selected
        if (props.keepFirst) {
            if (isActive.value) hoverFirstOption();
            else setHovered(undefined);
        } else if (hoveredOption.value) {
            // reset hovered with found option or undefined
            const hoveredValue = findOption(options, hoveredOption.value.value);
            setHovered(hoveredValue);
        }
    },
    { flush: "post" },
);

/** Set which option is currently hovered. */
function setHovered(option: OptionsItem<T> | SpecialOption | undefined): void {
    hoveredOption.value = isSpecialOption(option) ? undefined : option;
    headerHovered.value = option === SpecialOption.Header;
    footerHovered.value = option === SpecialOption.Footer;
}

/** set first option as hovered */
function hoverFirstOption(): void {
    const option = firstViableOption(groupedOptions);
    // set found option or undefined hovered
    setHovered(option);
}

// --- Event Handler ---

/**
 * Arrows keys listener.
 * If dropdown is active, set hovered option, or else just open.
 */
function navigateItem(delta: 1 | -1): void {
    if (!dropdownRef.value?.$content) return;
    if (!isActive.value) {
        isActive.value = true;
        return;
    }

    // convert grouped options to simple list
    const options: OptionsItem<T>[] = toOptionsList(groupedOptions);
    // filter only avaibale options
    const availableOptions: (SpecialOption | OptionsItem<T>)[] = options.filter(
        (o) => isOptionViable(o),
    );

    // item elements
    const items = [...itemRefs.value];

    // add header / footer if available and selectable
    if (headerRef.value && props.selectableHeader) {
        availableOptions.unshift(SpecialOption.Header);
        items.unshift(headerRef.value);
    }
    if (footerRef.value && props.selectableFooter) {
        availableOptions.push(SpecialOption.Footer);
        items.push(footerRef.value);
    }

    // define current available options index
    let index: number;
    if (headerHovered.value) index = 0 + delta;
    else if (footerHovered.value) index = availableOptions.length - 1 + delta;
    else {
        index =
            availableOptions.findIndex(
                (o) =>
                    !isSpecialOption(o) && o.key === hoveredOption.value?.key,
            ) + delta;
    }

    // check if index overflow
    index =
        index > availableOptions.length - 1
            ? availableOptions.length - 1
            : index;
    // check if index underflow
    index = index < 0 ? 0 : index;

    // get option element
    const option = availableOptions[index];

    // set hover state
    setHovered(option);

    // get real option index
    index =
        option === SpecialOption.Header
            ? -1
            : option === SpecialOption.Footer
              ? options.length
              : options.findIndex((o) => o.key === option.key);

    if (headerRef.value && props.selectableHeader) index++;

    const dropdownMenu = unrefElement(dropdownRef.value.$content);
    const element = unrefElement(items[index]);
    if (!element) return;

    // define scroll position
    const visMin = dropdownMenu.scrollTop;
    const visMax =
        dropdownMenu.scrollTop +
        dropdownMenu.clientHeight -
        element.clientHeight;

    if (element.offsetTop < visMin) {
        // is scolled top
        dropdownMenu.scrollTop = element.offsetTop;
    } else if (element.offsetTop >= visMax) {
        // is scolled bottom
        dropdownMenu.scrollTop =
            element.offsetTop -
            dropdownMenu.clientHeight +
            element.clientHeight;
    }

    // trigger scroll events
    if (props.checkScroll) checkDropdownScroll();
}

/**
 * Key listener.
 * Select the hovered option.
 */
function onKeydown(event: KeyboardEvent): void {
    // prevent emit submit event
    if (event.key === "Enter") event.preventDefault();
    if (
        Array.isArray(props.confirmKeys) &&
        props.confirmKeys.indexOf(event.key) >= 0
    ) {
        // If adding by comma, don't add the comma to the input
        if (event.key === ",") event.preventDefault();
        // Close dropdown on select by Tab
        const closeDropdown = !props.keepOpen || event.key === "Tab";
        if (!hoveredOption.value) {
            // header and footer uses headerHovered && footerHovered. If header or footer
            // was selected then fire event otherwise just return so a value isn't selected
            selectHeaderOrFooterByClick(event, undefined, closeDropdown);
            return;
        }
        setSelected(hoveredOption.value, closeDropdown, event);
    }
}

/**
 * Focus listener.
 * If value is the same as selected, select all text.
 */
function handleFocus(event: Event): void {
    if (props.openOnFocus) {
        isActive.value = true;
        if (props.keepFirst) hoverFirstOption();
    }
    onFocus(event);
}

/**
 * Blur listener.
 * Close on blur.
 */
function handleBlur(event: Event): void {
    onBlur(event);
}

/** emit input change event */
function onInput(value: string, event: Event): void {
    if (props.keepFirst && !selectedValue.value) hoverFirstOption();
    emits("input", value, event);
    checkHtml5Validity();
}

// --- Icon Feature ---

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
        setSelected(undefined, false);
        if (props.openOnFocus) setFocus();
    } else emits("icon-right-click", event);
}

// --- InfitiveScroll Feature ---

if (isClient && props.checkScroll)
    useEventListener(
        "scroll",
        checkDropdownScroll,
        computed(() => dropdownRef.value?.$content),
    );

/** Check if the scroll list inside the dropdown reached the top or it's end. */
function checkDropdownScroll(): void {
    if (!dropdownRef.value?.$content) return;
    const dropdown = unrefElement(dropdownRef.value.$content);
    if (!dropdown) return;
    const trashhold = dropdown.offsetTop;
    const headerHeight = unrefElement(headerRef)?.clientHeight || 0;
    const footerHeight =
        (unrefElement(footerRef)?.clientHeight || 0) + trashhold;
    if (dropdown.clientHeight !== dropdown.scrollHeight) {
        if (
            dropdown.scrollTop + dropdown.clientHeight + footerHeight >=
            dropdown.scrollHeight
        ) {
            emits("scroll-end");
        } else if (dropdown.scrollTop <= headerHeight) {
            emits("scroll-start");
        }
    }
}

// --- Computed Component Classes ---

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField?.value?.inputAttrs,
    ...attrs,
    ...props.inputClasses,
}));

const rootClasses = defineClasses(["rootClass", "o-acp"]);

const itemClasses = defineClasses(["itemClass", "o-acp__item"]);

const itemHoverClasses = defineClasses([
    "itemHoverClass",
    "o-acp__item--hover",
]);

const itemEmptyClasses = defineClasses([
    "itemEmptyClass",
    "o-acp__item--empty",
]);

const itemGroupClasses = defineClasses([
    "itemGroupTitleClass",
    "o-acp__item-group-title",
]);

const itemHeaderClasses = defineClasses(
    ["itemHeaderClass", "o-acp__item-header"],
    ["itemHoverClass", "o-acp__item--hover", null, headerHovered],
);

const itemFooterClasses = defineClasses(
    ["itemFooterClass", "o-acp__item-footer"],
    ["itemHoverClass", "o-acp__item--hover", null, footerHovered],
);

function itemAppliedClasses(option: OptionsItem<T>): ClassBind[] {
    const hoverClasses =
        option.key === hoveredOption.value?.key ? itemHoverClasses.value : [];

    return [...itemClasses.value, ...hoverClasses];
}

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: inputValue });
</script>

<template>
    <o-dropdown
        ref="dropdownComponent"
        v-model="selectedValue"
        v-model:active="isActive"
        data-oruga="autocomplete"
        :class="rootClasses"
        :menu-id="menuId"
        :menu-tabindex="-1"
        :menu-tag="menuTag"
        scrollable
        aria-role="listbox"
        :tabindex="-1"
        :trap-focus="false"
        :triggers="[]"
        :disabled="disabled"
        :closeable="closeableOptions"
        :mobile-modal="mobileModal"
        :max-height="maxHeight"
        :animation="animation"
        :position="position"
        :teleport="teleport"
        :expanded="expanded"
        @close="onDropdownClose">
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
                role="combobox"
                :aria-activedescendant="
                    hoveredOption ? `${menuId}-${hoveredOption.key}` : null
                "
                :aria-autocomplete="keepFirst ? 'both' : 'list'"
                :aria-controls="menuId"
                :aria-expanded="isActive"
                :use-html5-validation="false"
                @input="onInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @invalid="onInvalid"
                @keydown="onKeydown"
                @keydown.up.prevent="navigateItem(-1)"
                @keydown.down.prevent="navigateItem(1)"
                @icon-click="emits('icon-click', $event)"
                @icon-right-click="rightIconClick" />
        </template>

        <o-dropdown-item
            v-if="$slots.header"
            :id="`${menuId}-header`"
            ref="headerElement"
            :tag="itemTag"
            :value="SpecialOption.Header"
            :clickable="selectableHeader"
            tabindex="-1"
            aria-role="option"
            :aria-selected="headerHovered"
            :class="[...itemClasses, ...itemHeaderClasses]"
            @click="
                (v, e) => selectHeaderOrFooterByClick(e, SpecialOption.Header)
            ">
            <!--
                @slot Define an additional header
            -->
            <slot name="header" />
        </o-dropdown-item>

        <template v-for="(group, groupIndex) in groupedOptions">
            <o-dropdown-item
                v-if="group.group"
                v-show="!group.hidden"
                v-bind="group.attrs"
                :key="group.key"
                :tag="itemTag"
                :clickable="false"
                tabindex="-1"
                :class="[...itemClasses, ...itemGroupClasses]">
                <!--
                    @slot Override the option grpup
                    @binding {object} group - options group
                    @binding {number} index - option index
                -->
                <slot
                    v-if="$slots.group"
                    name="group"
                    :group="group.group"
                    :index="groupIndex" />
                <span v-else>
                    {{ group.group }}
                </span>
            </o-dropdown-item>

            <o-dropdown-item
                v-for="(option, optionIndex) in group.options"
                v-show="!option.hidden"
                v-bind="option.attrs"
                :id="`${menuId}-${option.key}`"
                :key="option.key"
                :ref="(el) => setItemRef(el, groupIndex, optionIndex)"
                :tag="itemTag"
                :value="option.value"
                :class="itemAppliedClasses(option)"
                aria-role="option"
                :aria-selected="
                    hoveredOption ? option.key === hoveredOption.key : undefined
                "
                @click="
                    (value, event) => setSelected(option, !keepOpen, event)
                ">
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
            :id="`${menuId}-footer`"
            ref="footerElement"
            :tag="itemTag"
            :value="SpecialOption.Footer"
            :clickable="selectableFooter"
            tabindex="-1"
            aria-role="option"
            :aria-selected="footerHovered"
            :class="[...itemClasses, ...itemFooterClasses]"
            @click="
                (v, e) => selectHeaderOrFooterByClick(e, SpecialOption.Footer)
            ">
            <!--
                @slot Define an additional footer
            -->
            <slot name="footer" />
        </o-dropdown-item>
    </o-dropdown>
</template>
