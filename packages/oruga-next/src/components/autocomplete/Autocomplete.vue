<script setup lang="ts">
import {
    computed,
    nextTick,
    ref,
    watch,
    onBeforeUpdate,
    useAttrs,
    toRaw,
    onMounted,
    type PropType,
    type Component,
} from "vue";

import OInput from "../input/Input.vue";
import ODropdown from "../dropdown/Dropdown.vue";
import ODropdownItem from "../dropdown/DropdownItem.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { getValueByPath } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import { unrefElement } from "@/utils/unrefElement";
import {
    useComputedClass,
    useVModelBinding,
    useInputHandler,
    useDebounce,
    useEventListener,
} from "@/composables";

import type { ComponentClass, DynamicComponent, PropBind } from "@/types";

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
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption("autocomplete.menuTag", "div"),
    },
    /** Menu item tag name */
    itemTag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption("autocomplete.itemTag", "div"),
    },
    /** Options / suggestions */
    data: { type: Array, default: () => [] },
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
        type: String,
        default: () => getOption("autocomplete.position", "auto"),
        validator: (value: string) =>
            ["auto", "top", "bottom"].indexOf(value) >= 0,
    },
    /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
    field: { type: String, default: undefined },
    /** Property of the object (if `data` is array of objects) to use as display text of group */
    groupField: { type: String, default: undefined },
    /** Property of the object (if `data` is array of objects) to use as key to get items array of each group */
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
    maxHeight: {
        type: [String, Number],
        default: () => getOption("autocomplete.maxHeight"),
    },
    /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
    confirmKeys: {
        type: Array,
        default: () => ["Tab", "Enter"],
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
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHoverClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemGroupTitleClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemEmptyClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
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
    /** the list inside the dropdown reached the start */
    (e: "scroll-start"): void;
    /** the list inside the dropdown reached it's end */
    (e: "scroll-end"): void;
}>();

const slots = defineSlots<{
    header(): any;
    group(props: { group: object; index: number }): any;
    default(props: { option: object; value: unknown; index: number }): any;
    empty(): any;
    footer(): any;
}>();

const inputRef = ref<InstanceType<typeof OInput>>();
const dropdownRef = ref<InstanceType<typeof ODropdown>>();
const footerRef = ref<HTMLElement>();
const headerRef = ref<HTMLElement>();
const itemRefs = ref([]);

function setItemRef(el: HTMLElement | Component): void {
    if (el) itemRefs.value.push(el);
}

onBeforeUpdate(() => {
    itemRefs.value = [];
});

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
        if (currentValue && currentValue !== value) setSelected(null, false);

        nextTick(() => {
            // Close dropdown if data is empty
            if (isEmpty.value && !slots.empty) isActive.value = false;
            // Close dropdown if input is clear or else open it
            else if (isFocused.value && (!props.openOnFocus || value))
                isActive.value = !!value;
        });
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
    // Return no data to avoid the full list to be shown when clearing input
    if (!props.openOnFocus && !props.keepOpen && vmodel.value === "") {
        // ...already returned nothing and dropdown closed.
        return [{ items: [] }];
    }
    return [{ items: props.data }];
});

const isEmpty = computed(
    () =>
        !computedData.value?.some(
            (element) => element.items && element.items.length,
        ),
);

watch(isEmpty, (empty) => {
    if (isFocused) isActive.value = !empty;
});

const closeableOptions = computed(() => {
    const options = ["escape"];
    if (!props.keepOpen) {
        options.push("content");
        options.push("outside");
    }
    return options;
});

function onDropdownClose(method: string): void {
    if (method === "outside") {
        if (
            props.keepFirst &&
            hoveredOption.value &&
            props.selectOnClickOutside
        )
            setSelected(hoveredOption.value, true);
    }
}

/**
 * Return display text for a input option.
 * If object, get value from path based on given field, or else just the value.
 * Apply a formatter function to the label if given.
 */
function getValue(option: unknown): string {
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
function setHovered(option: unknown): void {
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
    let index = data.map(toRaw).indexOf(toRaw(hoveredOption.value));
    if (headerHovered.value) index = 0 + direction;
    else if (footerHovered.value) index = data.length - 1 + direction;
    else index = index + direction;

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
        if (!isEmpty.value) isActive.value = true;
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
    const dropdown = dropdownRef.value.$content;
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
    ...attrs,
    ...props.inputClasses,
}));

const rootClasses = computed(() => [useComputedClass("rootClass", "o-acp")]);

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

function itemOptionClasses(option): PropBind {
    return [
        ...itemClasses.value,
        {
            [useComputedClass("itemHoverClass", "o-acp__item--hover")]:
                toRaw(option) === toRaw(hoveredOption.value),
        },
    ];
}
</script>

<template>
    <o-dropdown
        ref="dropdownRef"
        v-model:active="isActive"
        data-oruga="autocomplete"
        :class="rootClasses"
        :menu-tag="menuTag"
        scrollable
        :tabindex="-1"
        :triggers="[]"
        :disabled="disabled"
        :closeable="closeableOptions"
        :mobile-modal="mobileModal"
        :max-height="maxHeight"
        :animation="animation"
        :position="position"
        :teleport="teleport"
        :expanded="expanded"
        @close="onDropdownClose"
    >
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
                :aria-autocomplete="keepFirst ? 'both' : 'list'"
                :expanded="expanded"
                :disabled="disabled"
                :status-icon="statusIcon"
                @update:model-value="onInput"
                @focus="handleFocus"
                @blur="onBlur"
                @invalid="onInvalid"
                @keydown="onKeydown"
                @keydown.up.prevent="navigateItem(-1)"
                @keydown.down.prevent="navigateItem(1)"
                @icon-click="(event) => $emit('icon-click', event)"
                @icon-right-click="rightIconClick"
            />
        </template>

        <o-dropdown-item
            v-if="$slots.header"
            ref="headerRef"
            :tag="itemTag"
            aria-role="button"
            :tabindex="0"
            :class="itemHeaderClasses"
            @click="(v, e) => selectHeaderOrFoterByClick(e, 'header')"
        >
            <!--
                @slot Define an additional header
            -->
            <slot name="header" />
        </o-dropdown-item>

        <template v-for="(element, groupindex) in computedData">
            <o-dropdown-item
                v-if="element.group"
                :key="groupindex + 'group'"
                :tag="itemTag"
                :class="itemGroupClasses"
            >
                <!--
                    @slot Override the option grpup
                    @binding {object} group - options group
                    @binding {number} index - option index
                -->
                <slot
                    v-if="$slots.group"
                    name="group"
                    :group="element.group"
                    :index="groupindex"
                />
                <span v-else>
                    {{ element.group }}
                </span>
            </o-dropdown-item>

            <o-dropdown-item
                v-for="(option, index) in element.items"
                :key="groupindex + ':' + index"
                :ref="setItemRef"
                :value="option"
                :tag="itemTag"
                :class="itemOptionClasses(option)"
                aria-role="button"
                :tabindex="0"
                @click="(value, event) => setSelected(value, !keepOpen, event)"
            >
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
                    :index="index"
                />
                <span v-else>
                    {{ getValue(option) }}
                </span>
            </o-dropdown-item>
        </template>

        <o-dropdown-item
            v-if="isEmpty && $slots.empty"
            :tag="itemTag"
            :class="itemEmptyClasses"
        >
            <!--
                @slot Define content for empty state 
            -->
            <slot name="empty" />
        </o-dropdown-item>

        <o-dropdown-item
            v-if="$slots.footer"
            ref="footerRef"
            :tag="itemTag"
            aria-role="button"
            :tabindex="0"
            :class="itemFooterClasses"
            @click="(v, e) => selectHeaderOrFoterByClick(e, 'footer')"
        >
            <!--
                @slot Define an additional footer
            -->
            <slot name="footer" />
        </o-dropdown-item>
    </o-dropdown>
</template>
