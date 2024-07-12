<script setup lang="ts" generic="T extends string | object">
import {
    computed,
    nextTick,
    ref,
    watch,
    useAttrs,
    toRaw,
    onMounted,
    useSlots,
    type PropType,
    type Component,
} from "vue";
import type { ComponentExposed } from "vue-component-type-helpers";

import OInput from "../input/Input.vue";
import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";

import { getOption } from "@/utils/config";
import { getValueByPath, getPropertyValue, uuid } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    unrefElement,
    defineClasses,
    useInputHandler,
    useEventListener,
} from "@/composables";

import type { ComponentClass, DynamicComponent, ClassBind } from "@/types";
import { injectField } from "../field/fieldInjection";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** The selected option, use v-model to make it two-way binding */
    modelValue: {
        type: [String, Object] as PropType<T>,
        default: undefined,
    },
    /** The value of the inner input, use v-model:input to make it two-way binding */
    input: { type: String, default: "" },
    /**
     * Options / suggestions
     * @type string[]|object[]
     * */
    options: { type: Array as PropType<T[]>, default: () => [] },
    /** Property of the object (if `options` are an array of objects) to use as display text, and to keep track of selected option */
    field: { type: String, default: undefined },
    /** Property of the object (if `options` are an array of objects) to use as display text of group */
    groupField: { type: String, default: undefined },
    /** Property of the object (if `options` are an array of objects) to use as key to get items array of each group */
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
    /** Input type */
    type: { type: String, default: "text" },
    /** Menu tag name */
    menuTag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () =>
            getOption<DynamicComponent>("autocomplete.menuTag", "div"),
    },
    /** Menu item tag name */
    itemTag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () =>
            getOption<DynamicComponent>("autocomplete.itemTag", "div"),
    },
    /**
     * Size of the control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("autocomplete.size"),
    },
    /**
     * Position of the dropdown
     * @values auto, top, bottom
     */
    position: {
        type: String as PropType<"auto" | "top" | "bottom">,
        default: () => getOption("autocomplete.position", "auto"),
        validator: (value: string) =>
            ["auto", "top", "bottom"].indexOf(value) >= 0,
    },
    /** Input placeholder */
    placeholder: { type: String, default: undefined },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /** Makes the element rounded */
    rounded: { type: Boolean, default: false },
    /** Same as native input disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native maxlength, plus character counter */
    maxlength: { type: [String, Number], default: undefined },
    /** Makes the component check if list reached scroll start or end and emit scroll events. */
    checkScroll: {
        type: Boolean,
        default: () => getOption("autocomplete.checkScroll", false),
    },
    /** Number of milliseconds to delay before to emit input event */
    debounce: {
        type: Number,
        default: () => getOption("autocomplete.debounce", 400),
    },
    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: {
        type: Boolean,
        default: () => getOption("autocomplete.keepFirst", false),
    },
    /** Clear input text on select */
    clearOnSelect: {
        type: Boolean,
        default: () => getOption("autocomplete.clearOnSelect", false),
    },
    /** Open dropdown list on focus */
    openOnFocus: {
        type: Boolean,
        default: () => getOption("autocomplete.openOnFocus", false),
    },
    /** Keep open dropdown list after select */
    keepOpen: {
        type: Boolean,
        default: () => getOption("autocomplete.keepOpen", false),
    },
    /** Max height of dropdown content */
    maxHeight: {
        type: [String, Number],
        default: () => getOption("autocomplete.maxHeight"),
    },
    /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
    confirmKeys: {
        type: Array as PropType<string[]>,
        default: () => getOption("autocomplete.confirmKeys", ["Tab", "Enter"]),
    },
    /** Dropdown content (items) are shown into a modal on mobile */
    mobileModal: {
        type: Boolean,
        default: () => getOption("autocomplete.mobileModal", false),
    },
    /** Transition name to apply on dropdown list */
    animation: {
        type: String,
        default: () => getOption("autocomplete.animation", "fade"),
    },
    /** Trigger the select event for the first pre-selected option when clicking outside and `keep-first` is enabled */
    selectOnClickOutside: { type: Boolean, default: false },
    /** Allows the header in the autocomplete to be selectable */
    selectableHeader: { type: Boolean, default: false },
    /** Allows the footer in the autocomplete to be selectable */
    selectableFooter: { type: Boolean, default: false },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("autocomplete.iconPack", undefined),
    },
    /** Icon to be shown */
    icon: {
        type: String,
        default: () => getOption("autocomplete.icon", undefined),
    },
    /** Makes the icon clickable */
    iconClickable: { type: Boolean, default: false },
    /** Icon to be added on the right side */
    iconRight: {
        type: String,
        default: () => getOption("autocomplete.iconRight", undefined),
    },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /** Variant of right icon */
    iconRightVariant: { type: String, default: undefined },
    /** Add a button/icon to clear the inputed text */
    clearable: {
        type: Boolean,
        default: () => getOption("autocomplete.clearable", false),
    },
    /** Icon name to be added on the clear button */
    clearIcon: {
        type: String,
        default: () => getOption("autocomplete.clearIcon", "close-circle"),
    },
    /** Show status icon using field and variant prop */
    statusIcon: {
        type: Boolean,
        default: () => getOption("statusIcon", true),
    },
    /** Native options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("autocomplete.autocomplete", "off"),
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
        default: () => getOption("autocomplete.teleport", false),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu items */
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu items on hover */
    itemHoverClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu items group title */
    itemGroupTitleClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu empty placeholder item */
    itemEmptyClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu header item */
    itemHeaderClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu footer item */
    itemFooterClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /**
     * Classes to apply on internal input component
     * @ignore
     */
    inputClasses: {
        type: Object,
        default: () => getOption("autocomplete.inputClasses", {}),
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | object} updated modelValue prop
     */
    (e: "update:modelValue", value: T): void;
    /**
     * input prop two-way binding
     * @param value {string}  updated input prop
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

/** The selected option, use v-model to make it two-way binding */
const selectedOption = defineModel<T>({ default: undefined });

/** The value of the inner input, use v-model:input to make it two-way binding */
const vmodel = defineModel<string>("input", { default: "" });

const hoveredOption = ref<T>();
const headerHovered = ref(false);
const footerHovered = ref(false);

const hoveredId = ref(null);
const menuId = uuid();

/** options filtered by input value */
const filteredOptions = computed<T[]>(() =>
    typeof props.filter === "function"
        ? props.filter(props.options, vmodel.value)
        : props.options.filter((option) =>
              getValue(option)
                  .toLowerCase()
                  .includes(vmodel.value.toLowerCase()),
          ),
);

/** filtered options formatted as groups */
const groupOptions = computed<{ items: any[]; group?: string }[]>(() => {
    if (props.groupField) {
        if (props.groupOptions)
            return filteredOptions.value.map((item: T) => {
                if (typeof item === "string" || typeof item === "number")
                    return { group: item, items: [item] };
                const group = getValueByPath(item, props.groupField);
                const items = getValueByPath(item, props.groupOptions);
                return { group, items };
            });
        else
            return Object.keys(filteredOptions.value).map((group: string) => ({
                group,
                items: filteredOptions.value[group],
            }));
    }

    // Return no options to avoid the full list to be shown when clearing input
    if (!props.openOnFocus && !props.keepOpen && !vmodel.value) {
        // ...already returned nothing and dropdown closed.
        return [{ items: [] }];
    }
    return [{ items: filteredOptions.value }];
});

/** is any option visible */
const isEmpty = computed(
    () =>
        !groupOptions.value?.some(
            (element) => element.items && element.items.length,
        ),
);

watch(isEmpty, (empty) => {
    if (isFocused.value) isActive.value = !empty || !!slots.empty;
});

/**
 * When updating input's value
 *   1. If value isn't the same as selected, set null
 *   2. Close dropdown if value is clear or else open it
 */
watch(
    vmodel,
    (value) => {
        // clear selected if value does not match the selected option
        const currentValue = getValue(selectedOption.value);
        if (currentValue && currentValue !== value && !props.clearOnSelect)
            setSelected(null, false);

        // Close dropdown if data is empty
        if (isEmpty.value && !slots.empty) isActive.value = false;
        // Close dropdown if input is clear or else open it
        else if (isFocused.value && (!props.openOnFocus || value))
            isActive.value = !!value;
    },
    { flush: "post" },
);

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
            const hoveredValue = getValue(hoveredOption.value);
            const data = groupOptions.value
                .map((d) => d.items)
                .reduce((a, b) => [...a, ...b], []);
            const index = data.findIndex((d) => getValue(d) === hoveredValue);
            if (index >= 0) setHoveredIdToIndex(index);
            else setHovered(null);
        }
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

/** get the formated option value for a column */
function getValue(option?: T): string {
    return getPropertyValue(option, props.field, props.formatter);
}

// --- Select Feature ---

/**
 * Set which option is currently selected, update v-model,
 * update input value and close dropdown.
 */
function setSelected(
    option: T,
    closeDropdown: boolean = true,
    event: Event = undefined,
): void {
    selectedOption.value = option;
    emits("select", option, event);

    if (option) {
        if (props.clearOnSelect) vmodel.value = "";
        else vmodel.value = getValue(option);
        setHovered(null);
    } else vmodel.value = "";

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

/** Set which option is currently hovered. */
function setHovered(option: T | SpecialOption): void {
    hoveredOption.value = isSpecialOption(option) ? null : option;
    headerHovered.value = option === SpecialOption.Header;
    footerHovered.value = option === SpecialOption.Footer;
    hoveredId.value = null;
}

/** Set which option is the aria-activedescendant by index. */
function setHoveredIdToIndex(index: number): void {
    const element = unrefElement(itemRefs.value[index]);
    hoveredId.value = element ? element.id : null;
}

/** set first option as hovered */
function hoverFirstOption(): void {
    nextTick(() => {
        const nonEmptyElements = groupOptions.value.filter(
            (element) => element.items?.length,
        );
        if (nonEmptyElements.length) {
            const option = nonEmptyElements[0].items[0];
            setHovered(option);
            setHoveredIdToIndex(0);
        } else {
            setHovered(null);
        }
    });
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

    const data = groupOptions.value
        .map((d) => d.items)
        .reduce((a, b) => [...a, ...b], []);

    // add header / footer if selectable
    if (headerRef.value && props.selectableHeader) data.unshift(undefined);
    if (footerRef.value && props.selectableFooter) data.push(undefined);

    // define current index
    let index = data.map(toRaw).indexOf(toRaw(hoveredOption.value));
    if (headerHovered.value) index = 0 + direction;
    else if (footerHovered.value) index = data.length - 1 + direction;
    else index = index + direction;

    // check if index overflow
    index = index > data.length - 1 ? data.length - 1 : index;
    // check if index underflow
    index = index < 0 ? 0 : index;

    // set hover state
    if (footerRef.value && props.selectableFooter && index === data.length - 1)
        setHovered(SpecialOption.Footer);
    else if (headerRef.value && props.selectableHeader && index === 0)
        setHovered(SpecialOption.Header);
    else setHovered(data[index] !== undefined ? data[index] : null);

    // get items from input
    let items = itemRefs.value || [];
    if (headerRef.value && props.selectableHeader)
        items = [headerRef.value, ...items];
    if (footerRef.value && props.selectableFooter)
        items = [...items, footerRef.value];

    const element = unrefElement(items[index]);
    if (!element) return;

    // set aria-activedescendant
    hoveredId.value = element.id;

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
        if (hoveredOption.value === null) {
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
    if (props.keepFirst && !selectedOption.value) hoverFirstOption();
    emits("input", String(value));
    checkHtml5Validity();
}

// --- Icon Feature ---

const computedIconRight = computed(() =>
    props.clearable && vmodel.value && props.clearIcon
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
    ...parentField?.value?.inputAria,
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

function itemOptionClasses(option): ClassBind[] {
    const optionClasses = defineClasses([
        "itemHoverClass",
        "o-acp__item--hover",
        null,
        computed(() => toRaw(option) === toRaw(hoveredOption.value)),
    ]);

    return [...itemClasses.value, ...optionClasses.value];
}

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <o-dropdown
        ref="dropdownRef"
        v-model="selectedOption"
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
                v-model="vmodel"
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
                :aria-activedescendant="hoveredId"
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
            :value="SpecialOption.Header"
            :tag="itemTag"
            aria-role="option"
            :aria-selected="headerHovered"
            :tabindex="-1"
            :class="[...itemClasses, ...itemHeaderClasses]"
            @click="
                (v, e) => selectHeaderOrFooterByClick(e, SpecialOption.Header)
            ">
            <!--
                @slot Define an additional header
            -->
            <slot name="header" />
        </o-dropdown-item>

        <template v-for="(element, groupindex) in groupOptions">
            <o-dropdown-item
                v-if="element.group"
                :key="`${groupindex}_group`"
                :tag="itemTag"
                :tabindex="-1"
                :class="[...itemClasses, ...itemGroupClasses]">
                <!--
                    @slot Override the option grpup
                    @binding {object} group - options group
                    @binding {number} index - option index
                -->
                <slot
                    v-if="$slots.group"
                    name="group"
                    :group="element.group"
                    :index="groupindex" />
                <span v-else>
                    {{ element.group }}
                </span>
            </o-dropdown-item>

            <o-dropdown-item
                v-for="(option, index) in element.items"
                :id="`${menuId}-${groupindex}-${index}`"
                :key="`${groupindex}_${index}`"
                :ref="(el) => setItemRef(el, groupindex, index)"
                :value="option"
                :tag="itemTag"
                :class="itemOptionClasses(option)"
                aria-role="option"
                :aria-selected="toRaw(option) === toRaw(hoveredOption)"
                :tabindex="-1"
                @click="
                    (value, event) => setSelected(value as T, !keepOpen, event)
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
                    :value="getValue(option)"
                    :index="index" />
                <span v-else>
                    {{ getValue(option) }}
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
            :value="SpecialOption.Footer"
            :tag="itemTag"
            aria-role="option"
            :aria-selected="footerHovered"
            :tabindex="-1"
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
