<script setup lang="ts">
import { computed, watch, onMounted, ref, nextTick, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useInputHandler,
} from "@/composables";

import { injectField } from "../field/useFieldShare";

import type { OptionsItem } from "./types";
import { uuid } from "@/utils/helpers";

/**
 * Select an item in a dropdown list. Use with Field to access all functionalities
 * @displayName Select
 * @style _select.scss
 */
defineOptions({
    isOruga: true,
    name: "OSelect",
    configField: "select",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        default: null,
    },
    /** Select options, unnecessary when default slot is used */
    options: {
        type: Array as PropType<string[] | OptionsItem[]>,
        default: undefined,
    },
    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("select.size"),
    },
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("select.variant"),
    },
    /** Text when nothing is selected */
    placeholder: { type: String, default: undefined },
    /** Allow multiple selection */
    multiple: { type: Boolean, default: false },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /** Makes the element rounded */
    rounded: { type: Boolean, default: false },
    /** Same as native size */
    nativeSize: { type: [String, Number], default: undefined },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("select.iconPack", undefined),
    },
    /** Icon name to be shown */
    icon: {
        type: String,
        default: () => getOption("select.icon", undefined),
    },
    /** Makes the icon clickable */
    iconClickable: { type: Boolean, default: false },
    /**
     * 	Icon name to be added on the right side
     */
    iconRight: {
        type: String,
        default: () => getOption("select.iconRight", undefined),
    },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /** Variant of right icon */
    iconRightVariant: { type: String, default: undefined },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** The message which is shown when a validation error occurs */
    validationMessage: { type: String, default: undefined },
    /** Native options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("select.autocomplete", "off"),
    },
    /** Show status icon using field and variant prop */
    statusIcon: {
        type: Boolean,
        default: () => getOption("statusIcon", true),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "selectClass",
        "iconLeftSpaceClass",
        "iconRightSpaceClass",
        "roundedClass",
        "multipleClass",
        "expandedClass",
        "iconLeftClass",
        "iconRightClass",
        "sizeClass",
        "variantClass",
        "placeholderClass",
        "arrowClass",
    ]),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | boolean | object | Array<any>} updated modelValue prop
     */
    (
        e: "update:modelValue",
        value: string | number | boolean | object | Array<any>,
    ): void;
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
}>();

const selectRef = ref<HTMLInputElement>();

// use form input functionality
const { checkHtml5Validity, onBlur, onFocus, onInvalid, setFocus } =
    useInputHandler(selectRef, emits, props);

// inject parent field component if used inside one
const { parentField, statusVariant, statusVariantIcon } = injectField();

const vmodel = useVModelBinding<
    string | number | boolean | object | Array<any>
>(props, emits, { passive: true });

const placeholderVisible = computed(() => vmodel.value === null);

onMounted(() => {
    /**
     * When v-model is changed:
     *  1. Set parent field filled state.
     *  2. Resize textarea input
     *  3. Check html5 valdiation
     */
    watch(
        () => vmodel.value,
        (value) => {
            if (parentField?.value) parentField.value.setFilled(!!value);
            checkHtml5Validity();
        },
        { immediate: true },
    );
});

const selectOptions = computed<OptionsItem[]>(() => {
    if (!props.options || !Array.isArray(props.options)) return [];

    return props.options.map((option) =>
        typeof option === "string"
            ? { value: option, label: option, key: uuid() }
            : { ...option, key: uuid() },
    );
});

// --- Icon Feature ---

const hasIconRight = computed(
    () =>
        (props.iconRight && !props.multiple) ||
        (props.statusIcon && statusVariantIcon.value),
);

const rightIcon = computed(() =>
    props.iconRight ? props.iconRight : statusVariantIcon.value,
);

const rightIconVariant = computed(() =>
    props.iconRight
        ? props.iconRightVariant || props.variant || null
        : statusVariant.value,
);

function iconClick(emit, event): void {
    emits(emit, event);
    nextTick(() => setFocus());
}

function rightIconClick(event): void {
    if (props.iconRightClickable) iconClick("icon-right-click", event);
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-ctrl-sel"),
    {
        [useComputedClass("expandedClass", "o-ctrl-sel--expanded")]:
            props.expanded,
    },
]);

const selectClasses = computed(() => [
    useComputedClass("selectClass", "o-sel"),
    {
        [useComputedClass("roundedClass", "o-sel--rounded")]: props.rounded,
    },
    {
        [useComputedClass("multipleClass", "o-sel--multiple")]: props.multiple,
    },
    {
        [useComputedClass("sizeClass", "o-sel--", props.size)]: props.size,
    },
    {
        [useComputedClass(
            "variantClass",
            "o-sel--",
            statusVariant.value || props.variant,
        )]: statusVariant.value || props.variant,
    },
    {
        [useComputedClass("iconLeftSpaceClass", "o-sel-iconspace-left")]:
            props.icon,
    },
    {
        [useComputedClass("iconRightSpaceClass", "o-sel-iconspace-right")]:
            props.iconRight,
    },
    {
        [useComputedClass("placeholderClass", "o-sel--placeholder")]:
            placeholderVisible.value,
    },
    {
        [useComputedClass("arrowClass", "o-sel-arrow")]:
            !props.iconRight && !props.multiple,
    },
]);

const iconLeftClasses = computed(() => [
    useComputedClass("iconLeftClass", "o-sel__icon-left"),
]);

const iconRightClasses = computed(() => [
    useComputedClass("iconRightClass", "o-sel__icon-right"),
]);
</script>

<template>
    <div :class="rootClasses">
        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click="iconClick('icon-click', $event)" />

        <select
            v-bind="$attrs"
            ref="selectRef"
            v-model="vmodel"
            data-oruga-input="select"
            :class="selectClasses"
            :autocomplete="autocomplete"
            :multiple="multiple"
            :size="nativeSize"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid">
            <template v-if="placeholder || $slots.placeholder">
                <option v-if="placeholderVisible" :value="null" disabled hidden>
                    <!-- 
                        @slot Override the placeholder
                    -->
                    <slot name="placeholder">
                        {{ placeholder }}
                    </slot>
                </option>
            </template>

            <!--
                @slot Override the options
            -->
            <slot>
                <option
                    v-for="option in selectOptions"
                    :key="option.key"
                    :value="option.value"
                    v-bind="option.attrs">
                    {{ option.label }}
                </option>
            </slot>
        </select>

        <o-icon
            v-if="hasIconRight"
            :class="iconRightClasses"
            :clickable="iconRightClickable"
            :icon="rightIcon"
            :pack="iconPack"
            :size="size"
            :variant="rightIconVariant"
            both
            @click="rightIconClick" />
    </div>
</template>
