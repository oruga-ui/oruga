<script setup lang="ts" generic="T extends string | number | object">
import {
    computed,
    nextTick,
    ref,
    watch,
    useAttrs,
    onMounted,
    toValue,
    useSlots,
    useId,
    triggerRef,
    watchEffect,
    type Component,
} from "vue";
import type { ComponentExposed } from "vue-component-type-helpers";

import OInput from "../input/Input.vue";
import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";

import { getOption } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    unrefElement,
    defineClasses,
    normalizeOptions,
    toOptionsGroup,
    toOptionsList,
    findOption,
    checkOptionsEmpty,
    firstValidOption,
    filterOptionsItems,
    useInputHandler,
    useEventListener,
    type OptionsItem,
    type OptionsGroupItem,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { DynamicComponent, ClassBind } from "@/types";
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

const props = withDefaults(defineProps<AutocompleteProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    input: "",
    options: undefined,
    filter: undefined,
    type: "text",
    menuTag: () => getOption<DynamicComponent>("autocomplete.menuTag", "div"),
    itemTag: () => getOption<DynamicComponent>("autocomplete.itemTag", "div"),
    size: () => getOption("autocomplete.size"),
    position: () => getOption("autocomplete.position", "auto"),
    placeholder: undefined,
    expanded: false,
    rounded: false,
    disabled: false,
    maxlength: undefined,
    checkScroll: () => getOption("autocomplete.checkScroll", false),
    debounce: () => getOption("autocomplete.debounce", 400),
    keepFirst: () => getOption("autocomplete.keepFirst", false),
    clearOnSelect: () => getOption("autocomplete.clearOnSelect", false),
    openOnFocus: () => getOption("autocomplete.openOnFocus", false),
    keepOpen: () => getOption("autocomplete.keepOpen", false),
    maxHeight: () => getOption("autocomplete.maxHeight"),
    confirmKeys: () => getOption("autocomplete.confirmKeys", ["Tab", "Enter"]),
    mobileModal: () => getOption("autocomplete.mobileModal", false),
    animation: () => getOption("autocomplete.animation", "fade"),
    selectOnClickOutside: false,
    selectableHeader: false,
    selectableFooter: false,
    iconPack: () => getOption("autocomplete.iconPack", undefined),
    icon: () => getOption("autocomplete.icon", undefined),
    iconClickable: false,
    iconRight: () => getOption("autocomplete.iconRight", undefined),
    iconRightClickable: false,
    iconRightVariant: undefined,
    clearable: () => getOption("autocomplete.clearable", false),
    clearIcon: () => getOption("autocomplete.clearIcon", "close-circle"),
    statusIcon: () => getOption("statusIcon", true),
    autocomplete: () => getOption("autocomplete.autocomplete", "off"),
    useHtml5Validation: () => getOption("useHtml5Validation", true),
    customValidity: undefined,
    teleport: () => getOption("autocomplete.teleport", false),
    inputClasses: () => getOption("autocomplete.inputClasses", {}),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | object} updated modelValue prop
     */
    (e: "update:modelValue", value: T): void;
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
     * selected element changed event
     * @param value {string | object} selected value
     */
    (e: "select", value: T, evt: Event): void;
    /**
     * header is selected
     * @param event {Event} native event
     */
    (e: "select-header", event: Event): void;
    /**
     * footer is selected
     * @param event {Event} native event
     */
    (e: "select-footer", event: Event): void;
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

const slots = useSlots();
const inputRef = ref<ComponentExposed<typeof OInput>>();
const dropdownRef = ref<ComponentExposed<typeof ODropdown>>();
const footerRef = ref<HTMLElement>();
const headerRef = ref<HTMLElement>();
const itemRefs = ref([]);

function setItemRef(
    el: HTMLElement | Component,
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

/** the selected value, use v-model to make it two-way binding */
const selectedValue = defineModel<T>({ default: undefined });

/** the value of the inner input, use v-model:input to make it two-way binding */
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
    filterOptionsItems(groupedOptions, inputValue, props.filter);
    // trigger reactive update of groupedOptions
    triggerRef(groupedOptions);
});

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
            setSelected(null, false);

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
    option: OptionsItem<T>,
    closeDropdown: boolean = true,
    event: Event = undefined,
): void {
    selectedValue.value = option?.value;
    emits("select", option?.value, event);

    if (option) {
        if (props.clearOnSelect) inputValue.value = "";
        else inputValue.value = option.label;
        setHovered(null);
    } else inputValue.value = "";

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
        if (origin) setHovered(null);
        if (closeDropdown) isActive.value = false;
    }
    if (
        props.selectableFooter &&
        (footerHovered.value || origin === SpecialOption.Footer)
    ) {
        emits("select-footer", event);
        if (origin) setHovered(null);
        if (closeDropdown) isActive.value = false;
    }
}

// --- Hover Feature ---

const hoveredOption = ref<OptionsItem<T> | null>();
const headerHovered = ref(false);
const footerHovered = ref(false);

/** Select first option if "keep-first" */
watch(
    () => props.options,
    () => {
        // Keep first option always pre-selected
        if (props.keepFirst) {
            if (isActive.value) hoverFirstOption();
            else setHovered(null);
        } else if (hoveredOption.value) {
            // reset hovered if list doesn't contain it
            const hoveredValue = findOption(
                groupedOptions,
                toValue(hoveredOption).value,
            );
            if (hoveredValue) setHovered(hoveredValue);
            else setHovered(null);
        }
    },
    { flush: "post" },
);

/** Set which option is currently hovered. */
function setHovered(option: OptionsItem<T> | SpecialOption | null): void {
    hoveredOption.value = isSpecialOption(option) ? null : option;
    headerHovered.value = option === SpecialOption.Header;
    footerHovered.value = option === SpecialOption.Footer;
}

/** set first option as hovered */
function hoverFirstOption(): void {
    const option = firstValidOption(groupedOptions);
    if (option) setHovered(option);
    else setHovered(null);
}

// --- Event Handler ---

/**
 * Arrows keys listener.
 * If dropdown is active, set hovered option, or else just open.
 */
function navigateItem(direction: 1 | -1): void {
    if (!isActive.value) {
        isActive.value = true;
        return;
    }

    const options = toOptionsList(groupedOptions);

    // add header / footer if selectable
    if (headerRef.value && props.selectableHeader) options.unshift(undefined);
    if (footerRef.value && props.selectableFooter) options.push(undefined);

    // define current index
    let index = options.findIndex((o) => o.key === toValue(hoveredOption)?.key);
    if (headerHovered.value) index = 0 + direction;
    else if (footerHovered.value) index = options.length - 1 + direction;
    else index = index + direction;

    // check if index overflow
    index = index > options.length - 1 ? options.length - 1 : index;
    // check if index underflow
    index = index < 0 ? 0 : index;

    // set hover state
    if (
        footerRef.value &&
        props.selectableFooter &&
        index === options.length - 1
    )
        setHovered(SpecialOption.Footer);
    else if (headerRef.value && props.selectableHeader && index === 0)
        setHovered(SpecialOption.Header);
    else setHovered(options[index] || null);

    // get items from input
    let items = itemRefs.value || [];
    if (headerRef.value && props.selectableHeader)
        items = [headerRef.value, ...items];
    if (footerRef.value && props.selectableFooter)
        items = [...items, footerRef.value];

    const element = unrefElement(items[index]);
    if (!element) return;

    // define scroll position
    const dropdownMenu = unrefElement(dropdownRef.value.$content);
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
    // trigger scroll
    if (props.checkScroll) checkDropdownScroll();
}

/**
 * Key listener.
 * Select the hovered option.
 */
function onKeydown(event: KeyboardEvent): void {
    // prevent emit submit event
    if (event.key === "Enter") event.preventDefault();
    if (props.confirmKeys.indexOf(event.key) >= 0) {
        // If adding by comma, don't add the comma to the input
        if (event.key === ",") event.preventDefault();
        // Close dropdown on select by Tab
        const closeDropdown = !props.keepOpen || event.key === "Tab";
        if (!hoveredOption.value) {
            // header and footer uses headerHovered && footerHovered. If header or footer
            // was selected then fire event otherwise just return so a value isn't selected
            selectHeaderOrFooterByClick(event, null, closeDropdown);
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
function onInput(value: string): void {
    if (props.keepFirst && !selectedValue.value) hoverFirstOption();
    emits("input", value.trim());
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
        setSelected(null, false);
        if (props.openOnFocus) setFocus();
    } else emits("icon-right-click", event);
}

// --- InfitiveScroll Feature ---

onMounted(() => {
    if (isClient && props.checkScroll)
        useEventListener(
            "scroll",
            checkDropdownScroll,
            dropdownRef.value.$content,
            { immediate: true },
        );
});

/** Check if the scroll list inside the dropdown reached the top or it's end. */
function checkDropdownScroll(): void {
    const dropdown = unrefElement(dropdownRef.value.$content);
    if (!dropdown) return;
    const trashhold = dropdown.offsetTop;
    const headerHeight = headerRef.value?.clientHeight || 0;
    const footerHeight = (footerRef.value?.clientHeight || 0) + trashhold;
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

function itemOptionClasses(option: OptionsItem): ClassBind[] {
    const optionClasses = defineClasses([
        "itemHoverClass",
        "o-acp__item--hover",
        null,
        computed(() => option.key === toValue(hoveredOption)?.key),
    ]);

    return [...itemClasses.value, ...optionClasses.value];
}

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: inputValue });
</script>

<template>
    <o-dropdown
        ref="dropdownRef"
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
                ref="inputRef"
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
                :use-html5-validation="false"
                role="combobox"
                :aria-activedescendant="
                    hoveredOption ? `${menuId}-${hoveredOption.key}` : null
                "
                :aria-autocomplete="keepFirst ? 'both' : 'list'"
                :aria-controls="menuId"
                :aria-expanded="isActive"
                :expanded="expanded"
                :disabled="disabled"
                :status-icon="statusIcon"
                :debounce="debounce"
                @update:model-value="onInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @invalid="onInvalid"
                @keydown="onKeydown"
                @keydown.up.prevent="navigateItem(-1)"
                @keydown.down.prevent="navigateItem(1)"
                @icon-click="(event) => $emit('icon-click', event)"
                @icon-right-click="rightIconClick" />
        </template>

        <o-dropdown-item
            v-if="$slots.header"
            :id="`${menuId}-header`"
            ref="headerRef"
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
                :class="itemOptionClasses(option)"
                tabindex="-1"
                aria-role="option"
                :aria-selected="
                    hoveredOption ? option.key === hoveredOption.key : null
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
            ref="footerRef"
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
