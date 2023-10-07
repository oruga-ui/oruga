<script setup lang="ts">
import {
    computed,
    nextTick,
    ref,
    watch,
    onMounted,
    onBeforeUpdate,
    onUnmounted,
    useAttrs,
    toRaw,
    type PropType,
    type Component,
} from "vue";

import OInput from "../input/Input.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useEventListener,
    useInputHandler,
    useDebounce,
} from "@/composables";
import {
    getValueByPath,
    removeElement,
    createAbsoluteElement,
    toCssDimension,
} from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import type { BindProp } from "@/types";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: [String, Number], default: "" },
    /** Input type */
    type: { type: String, default: "text" },
    /** Menu tag name */
    menuTag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("autocomplete.menuTag", "div"),
    },
    /** Menu item tag name */
    itemTag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("autocomplete.itemTag", "div"),
    },
    /** Options / suggestions */
    data: { type: Array, default: () => [] },
    /**
     * Size of the control, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("autocomplete.size"),
    },
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("autocomplete.variant"),
    },
    /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
    field: { type: String, default: "value" },
    /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
    groupField: { type: String, default: undefined },
    /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
    groupOptions: { type: String, default: undefined },
    /** Function to format an option to a string for display in the input (as alternative to field prop) */
    formatter: {
        type: Function as PropType<(value: string | number) => string | number>,
        default: undefined,
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
    maxlength: { type: Number, default: undefined },
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
    maxHeight: { type: [String, Number], default: undefined },
    /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
    confirmKeys: {
        type: Array,
        default: () => ["Tab", "Enter"],
    },
    /**
     * Position of dropdown
     * @values auto, top, bottom
     */
    menuPosition: {
        type: String,
        default: () => getOption("autocomplete.menuPosition", "auto"),
        validator: (value: string) => {
            return ["auto", "top", "bottom"].indexOf(value) >= 0;
        },
    },
    /** Transition name to apply on dropdown list */
    animation: {
        type: String,
        default: () => getOption("autocomplete.animation", "fade"),
    },
    /** Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled */
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
    /** Icon name to be shown */
    icon: {
        type: String,
        default: () => getOption("autocomplete.icon", undefined),
    },
    /** Makes the icon clickable */
    iconClickable: { type: Boolean, default: false },
    /** Icon name to be added on the right side */
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
    /** Append autocomplete content to body */
    appendToBody: {
        type: Boolean,
        default: () => getOption("autocomplete.appendToBody", false),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "menuClass",
        "expandedClass",
        "menuPositionClass",
        "itemClass",
        "itemHoverClass",
        "itemGroupTitleClass",
        "itemEmptyClass",
        "itemHeaderClass",
        "itemFooterClass",
    ]),
    inputClasses: {
        type: Object,
        default: () => getOption("autocomplete.inputClasses", {}),
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number} updated modelValue prop
     */
    (e: "update:modelValue", value: string | number): void;
    /**
     * on input change event
     * @param value {string | number} input value
     */
    (e: "input", value: string | number): void;
    /**
     * selected element changed event
     * @param value {string | number} selected value
     */
    (e: "select", value: string | number, evt: Event): void;
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
    /** the scroll list inside the dropdown reached the start */
    (e: "scroll-start"): void;
    /** the scroll list inside the dropdown reached it's end */
    (e: "scroll-end"): void;
}>();

const inputRef = ref<InstanceType<typeof OInput>>();
const dropdownRef = ref<HTMLElement>();
const footerRef = ref<HTMLElement>();
const headerRef = ref<HTMLElement>();
const itemRefs = ref([]);

function setItemRef(el: HTMLElement): void {
    if (el) itemRefs.value.push(el);
}

// use form input functionalities
const { checkHtml5Validity, onInvalid, onFocus, onBlur, isFocused } =
    useInputHandler(inputRef, emits, props);

const vmodel = useVModelBinding<string | number>(props, emits, {
    passive: true,
});

const isActive = ref(false);

const selectedOption = ref(null);
const hoveredOption = ref(null);
const headerHovered = ref(false);
const footerHovered = ref(false);
const isListInViewportVertically = ref(true);
const width = ref(undefined);

onBeforeUpdate(() => {
    width.value = inputRef.value ? inputRef.value.$el.clientWidth : undefined;
    itemRefs.value = [];
});

/**
 * When updating input's value
 *   1. If value isn't the same as selected, set null
 *   2. Close dropdown if value is clear or else open it
 */
watch(
    () => vmodel.value,
    (value) => {
        // Check if selected is invalid
        const currentValue = getValue(selectedOption.value);
        if (currentValue && currentValue !== value) {
            setSelected(null, false);
        }
        // Close dropdown if input is clear or else open it
        if (isFocused.value && (!props.openOnFocus || value)) {
            isActive.value = !!value;
        }
    },
);

/** Select first option if "keep-first" */
watch(
    () => props.data,
    () => {
        // Keep first option always pre-selected
        if (props.keepFirst) {
            nextTick(() => {
                if (isActive.value) selectFirstOption();
                else setHovered(null);
            });
        } else if (hoveredOption.value) {
            // reset hovered if list doesn't contain it
            const hoveredValue = getValue(hoveredOption.value);
            const data = computedData.value
                .map((d) => d.items)
                .reduce((a, b) => [...a, ...b], []);
            if (!data.some((d) => getValue(d) === hoveredValue)) {
                setHovered(null);
            }
        }
    },
);

// add outisde click event listener
if (isClient) useEventListener("click", clickedOutside);

/** Close dropdown if clicked outside. */
function clickedOutside(event: PointerEvent): void {
    if (
        !isFocused.value &&
        Array.isArray(whiteList.value) &&
        whiteList.value.indexOf(event.target as HTMLElement) < 0
    ) {
        if (
            props.keepFirst &&
            hoveredOption.value &&
            props.selectOnClickOutside
        ) {
            setSelected(hoveredOption.value, true);
        } else {
            isActive.value = false;
        }
    }
}

const computedData = computed<{ items: any; group?: any }[]>(() => {
    if (props.groupField) {
        if (props.groupOptions)
            return props.data.map((option) => {
                const group = getValueByPath(option, props.groupField);
                const items = getValueByPath(option, props.groupOptions);
                return { group, items };
            });
        else
            return Object.keys(props.data).map((group) => ({
                group,
                items: props.data[group],
            }));
    }
    return [{ items: props.data }];
});

const isEmpty = computed(() =>
    !computedData.value
        ? true
        : !computedData.value.some(
              (element) => element.items && element.items.length,
          ),
);

/**
 * White-listed items to not close when clicked.
 * Add input, dropdown and all children.
 */
const whiteList = computed(() => {
    const whiteList: Element[] = [];
    whiteList.push(inputRef.value.$el.querySelector("input"));
    whiteList.push(dropdownRef.value);
    // Add all children from dropdown
    if (dropdownRef.value !== undefined) {
        const children = dropdownRef.value.querySelectorAll("*");
        for (const child of children) {
            whiteList.push(child);
        }
    }
    return whiteList;
});

const dropdownPosition = computed(() =>
    props.menuPosition === "top" ||
    (props.menuPosition === "auto" && !isListInViewportVertically.value)
        ? "top"
        : "bottom",
);

const menuStyle = computed(() => ({
    maxHeight: toCssDimension(props.maxHeight),
}));

/**
 * Return display text for a input option.
 * If object, get value from path based on given field, or else just the value.
 * Apply a formatter function to the label if given.
 */
function getValue(option): string {
    if (!option) return "";

    const property =
        props.field && typeof option === "object"
            ? getValueByPath(option, props.field)
            : option;

    const label =
        typeof props.formatter === "function"
            ? props.formatter(property)
            : property;

    return label || "";
}

/** Set which option is currently hovered. */
function setHovered(option): void {
    if (option === undefined) return;
    hoveredOption.value = option;
}

/**
 * Set which option is currently selected, update v-model,
 * update input value and close dropdown.
 */
function setSelected(option, closeDropdown = true, event = undefined): void {
    if (option === undefined) return;
    selectedOption.value = option;
    emits("select", selectedOption.value, event);
    if (selectedOption.value !== null) {
        if (props.clearOnSelect) {
            const input = inputRef.value.$el.querySelector("input");
            input.value = "";
        } else {
            vmodel.value = getValue(selectedOption.value);
        }
        setHovered(null);
    }
    if (closeDropdown) nextTick(() => (isActive.value = false));
    checkHtml5Validity();
}

/** Select first option */
function selectFirstOption(): void {
    nextTick(() => {
        const nonEmptyElements = computedData.value.filter(
            (element) => element.items && element.items.length,
        );
        if (nonEmptyElements.length) {
            const option = nonEmptyElements[0].items[0];
            setHovered(option);
        } else {
            setHovered(null);
        }
    });
}

/** Check if header or footer was selected. */
function selectHeaderOrFoterByClick(
    event: Event,
    origin?: "header" | "footer",
    closeDropdown = true,
): void {
    if (
        props.selectableHeader &&
        (headerHovered.value || origin === "header")
    ) {
        emits("select-header", event);
        headerHovered.value = false;
        if (origin) setHovered(null);
        if (closeDropdown) isActive.value = false;
    }
    if (
        props.selectableFooter &&
        (footerHovered.value || origin === "footer")
    ) {
        emits("select-footer", event);
        footerHovered.value = false;
        if (origin) setHovered(null);
        if (closeDropdown) isActive.value = false;
    }
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

    const data = computedData.value
        .map((d) => d.items)
        .reduce((a, b) => [...a, ...b], []);

    // add header / footer if selectable
    if (headerRef.value && props.selectableHeader) data.unshift(undefined);
    if (footerRef.value && props.selectableFooter) data.push(undefined);

    // define current index
    let index;
    if (headerHovered.value) index = 0 + direction;
    else if (footerHovered.value) index = data.length - 1 + direction;
    else index = data.indexOf(toRaw(hoveredOption.value)) + direction;

    // check if index overflow
    index = index > data.length - 1 ? data.length - 1 : index;
    // check if index underflow
    index = index < 0 ? 0 : index;

    // set hover state
    footerHovered.value = false;
    headerHovered.value = false;
    if (footerRef.value && props.selectableFooter && index === data.length - 1)
        footerHovered.value = true;
    else if (headerRef.value && props.selectableHeader && index === 0)
        headerHovered.value = true;
    else setHovered(data[index] !== undefined ? data[index] : null);

    // get items from input
    let items = itemRefs.value || [];
    if (headerRef.value && props.selectableHeader)
        items = [headerRef.value, ...items];
    if (footerRef.value && props.selectableFooter)
        items = [...items, footerRef.value];

    const element = items[index];
    if (!element) return;

    // define scroll position
    const dropdownMenu = dropdownRef.value;
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
    // Close dropdown on Tab & no hovered
    if (event.key === "Escape" || event.key === "Tab") {
        isActive.value = false;
    }
    if (props.confirmKeys.indexOf(event.key) >= 0) {
        // If adding by comma, don't add the comma to the input
        if (event.key === ",") event.preventDefault();
        // Close dropdown on select by Tab
        const closeDropdown = !props.keepOpen || event.key === "Tab";
        if (hoveredOption.value === null) {
            // header and footer uses headerHovered && footerHovered. If header or footer
            // was selected then fire event otherwise just return so a value isn't selected
            selectHeaderOrFoterByClick(event, null, closeDropdown);
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
    if (getValue(selectedOption.value) === vmodel.value) {
        inputRef.value.$el.querySelector("input").select();
    }
    if (props.openOnFocus) {
        isActive.value = true;
        if (props.keepFirst)
            // If open on focus, update the hovered
            selectFirstOption();
    }
    onFocus(event);
}

/** emit input change event */
function onInput(value: string | number): void {
    const currentValue = getValue(selectedOption.value);
    if (currentValue && currentValue === vmodel.value) return;
    debouncedInput(value);
}

let debouncedInput = useDebounce(emitInput, props.debounce || 0);

watch(
    () => props.debounce,
    (value) => {
        debouncedInput = useDebounce(emitInput, value);
    },
);

function emitInput(value: string | number): void {
    emits("input", value);
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
        vmodel.value = "";
        setSelected(null, false);
        if (props.openOnFocus) inputRef.value.$el.focus();
    } else emits("icon-right-click", event);
}

// --- Resize Feature ---

// add resize event listener
if (isClient && props.menuPosition === "auto") {
    useEventListener("resize", calcDropdownInViewportVertical, window);
}

/**
 * When dropdown is toggled, check the visibility to know when
 * to open upwards.
 */
watch(isActive, (active) => {
    if (props.menuPosition === "auto") {
        if (active) calcDropdownInViewportVertical();
        else
            window.requestAnimationFrame(() =>
                calcDropdownInViewportVertical(),
            );
    }
});

/**
 * Calculate if the dropdown is vertically visible when activated,
 * otherwise it is openened upwards.
 */
function calcDropdownInViewportVertical(): void {
    nextTick(() => {
        /**
         * dropdownRef may be undefined
         * when Autocomplete is conditional rendered
         */
        if (!dropdownRef.value) return;

        const rect = dropdownRef.value.getBoundingClientRect();

        isListInViewportVertically.value =
            rect.top >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight);
        if (props.appendToBody) {
            updateAppendToBody();
        }
    });
}

// --- InfitiveScroll Feature ---

onMounted(() => {
    if (props.checkScroll && dropdownRef.value) {
        dropdownRef.value.addEventListener("scroll", checkDropdownScroll);
    }
});

onUnmounted(() => {
    if (props.checkScroll && dropdownRef.value) {
        dropdownRef.value.removeEventListener("scroll", checkDropdownScroll);
    }
});

/** Check if the scroll list inside the dropdown reached the top or it's end. */
function checkDropdownScroll(): void {
    const dropdown = dropdownRef.value;
    const trashhold = 15;
    const headerHeight = headerRef.value ? headerRef.value.clientHeight : 0;
    const footerHeight = footerRef.value
        ? footerRef.value.clientHeight + trashhold
        : 0;
    if (dropdown.clientHeight !== dropdown.scrollHeight) {
        console.log(
            dropdown.scrollTop,
            dropdown.clientHeight,
            footerHeight,
            ">=",
            dropdown.scrollHeight,
        );
        if (
            dropdown.scrollTop + dropdown.clientHeight + footerHeight >=
            dropdown.scrollHeight
        )
            emits("scroll-end");
        else if (dropdown.scrollTop <= headerHeight) {
            emits("scroll-start");
        }
    }
}

// --- AppendToBody Feature ---

const bodyEl = ref(); // Used to append to body

onMounted(() => {
    if (props.appendToBody) {
        bodyEl.value = createAbsoluteElement(dropdownRef.value);
        updateAppendToBody();
    }
});

onUnmounted(() => {
    if (props.appendToBody) removeElement(bodyEl.value);
});

function updateAppendToBody(): void {
    const dropdownMenu = dropdownRef.value;
    const trigger = inputRef.value.$el;
    if (dropdownMenu && trigger) {
        // update wrapper dropdown
        const root = bodyEl.value;
        root.classList.forEach((item) =>
            root.classList.remove(...item.split(" ")),
        );
        rootClasses.value.forEach((item) => {
            if (item) {
                if (typeof item === "object") {
                    Object.keys(item)
                        .filter((key) => key && item[key])
                        .forEach((key) => root.classList.add(key));
                } else {
                    root.classList.add(...item.split(" "));
                }
            }
        });
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;
        if (dropdownPosition.value !== "top") {
            top += trigger.clientHeight;
        } else {
            top -= dropdownMenu.clientHeight;
        }
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.top = `${top}px`;
        dropdownMenu.style.left = `${left}px`;
        dropdownMenu.style.width = `${trigger.clientWidth}px`;
        dropdownMenu.style.maxWidth = `${trigger.clientWidth}px`;
        dropdownMenu.style.zIndex = "9999";
    }
}

// --- Computed Component Classes ---

const attrs = useAttrs();
const inputBind = computed(() => ({
    ...attrs,
    ...props.inputClasses,
}));

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-acp"),
    {
        [useComputedClass("expandedClass", "o-acp--expanded")]: props.expanded,
    },
]);

const menuClasses = computed(() => [
    useComputedClass("menuClass", "o-acp__menu"),
    {
        [useComputedClass(
            "menuPositionClass",
            "o-acp__menu--",
            dropdownPosition.value,
        )]: !props.appendToBody,
    },
]);

const itemClasses = computed(() => [
    useComputedClass("itemClass", "o-acp__item"),
]);

const itemEmptyClasses = computed(() => [
    ...itemClasses.value,
    useComputedClass("itemEmptyClass", "o-acp__item--empty"),
]);

const itemGroupClasses = computed(() => [
    ...itemClasses.value,
    useComputedClass("itemGroupTitleClass", "o-acp__item-group-title"),
]);

const itemHeaderClasses = computed(() => [
    ...itemClasses.value,
    useComputedClass("itemHeaderClass", "o-acp__item-header"),
    {
        [useComputedClass("itemHoverClass", "o-acp__item--hover")]:
            headerHovered.value,
    },
]);

const itemFooterClasses = computed(() => [
    ...itemClasses.value,
    useComputedClass("itemFooterClass", "o-acp__item-footer"),
    {
        [useComputedClass("itemHoverClass", "o-acp__item--hover")]:
            footerHovered.value,
    },
]);

function itemOptionClasses(option): BindProp {
    return [
        ...itemClasses.value,
        {
            [useComputedClass("itemHoverClass", "o-acp__item--hover")]:
                toRaw(option) === toRaw(hoveredOption.value),
        },
    ];
}

// --- Expose Public Functionalities ---

const rootRef = ref();
defineExpose({
    // expose the html root element of this component
    $el: computed(() => rootRef.value),
    // expose the input element
    $inputRef: computed(() => inputRef.value.$inputRef),
});
</script>

<template>
    <div ref="rootRef" :class="rootClasses">
        <o-input
            ref="inputRef"
            v-model="vmodel"
            v-bind="inputBind"
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
            :aria-autocomplete="keepFirst ? 'both' : 'list'"
            :expanded="expanded"
            :disabled="disabled"
            @update:model-value="onInput"
            @focus="handleFocus"
            @blur="onBlur"
            @invalid="onInvalid"
            @keydown="onKeydown"
            @keydown.up.prevent="navigateItem(-1)"
            @keydown.down.prevent="navigateItem(1)"
            @icon-click="(event) => $emit('icon-click', event)"
            @icon-right-click="rightIconClick" />

        <transition :name="animation">
            <component
                :is="menuTag"
                v-show="
                    isActive &&
                    (!isEmpty || $slots.empty || $slots.header || $slots.footer)
                "
                ref="dropdownRef"
                :class="menuClasses"
                :style="menuStyle">
                <component
                    :is="itemTag"
                    v-if="$slots.header"
                    ref="headerRef"
                    role="button"
                    :tabindex="0"
                    :class="itemHeaderClasses"
                    @click="selectHeaderOrFoterByClick($event, 'header')">
                    <slot name="header" />
                </component>
                <template v-for="(element, groupindex) in computedData">
                    <component
                        :is="itemTag"
                        v-if="element.group"
                        :key="groupindex + 'group'"
                        :class="itemGroupClasses">
                        <slot
                            v-if="$slots.group"
                            name="group"
                            :group="element.group"
                            :index="groupindex" />
                        <span v-else>
                            {{ element.group }}
                        </span>
                    </component>

                    <component
                        :is="itemTag"
                        v-for="(option, index) in element.items"
                        :key="groupindex + ':' + index"
                        :ref="setItemRef"
                        :class="itemOptionClasses(option)"
                        role="button"
                        :tabindex="0"
                        @click.stop="setSelected(option, !keepOpen, $event)">
                        <slot
                            v-if="$slots.default"
                            :option="option"
                            :value="getValue(option)"
                            :index="index" />
                        <span v-else>
                            {{ getValue(option) }}
                        </span>
                    </component>
                </template>

                <component
                    :is="itemTag"
                    v-if="isEmpty && $slots.empty"
                    :class="itemEmptyClasses">
                    <slot name="empty" />
                </component>

                <component
                    :is="itemTag"
                    v-if="$slots.footer"
                    ref="footerRef"
                    role="button"
                    :tabindex="0"
                    :class="itemFooterClasses"
                    @click="selectHeaderOrFoterByClick($event, 'footer')">
                    <slot name="footer" />
                </component>
            </component>
        </transition>
    </div>
</template>
