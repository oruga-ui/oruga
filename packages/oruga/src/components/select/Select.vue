<script setup lang="ts" generic="T">
import { computed, watch, onMounted, ref, nextTick, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { OptionsItem } from "./types";
import type { ComponentClass } from "@/types";

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
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** @model */
    modelValue: {
        type: [String, Number, Boolean, Object, Array] as PropType<T | T[]>,
        default: undefined,
    },
    /** Select options, unnecessary when default slot is used */
    options: {
        type: Array as PropType<string[] | OptionsItem<T>[]>,
        default: undefined,
    },
    /**
     * Vertical size of input
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("select.size"),
    },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("select.variant"),
    },
    /** Text when nothing is selected */
    placeholder: { type: String, default: undefined },
    /** Allow multiple selection - same as native multiple */
    multiple: { type: Boolean, default: false },
    /** Disable the input - same as native disabled */
    disabled: { type: Boolean, default: false },
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
    /** Icon to be shown */
    icon: {
        type: String,
        default: () => getOption("select.icon", undefined),
    },
    /** Makes the icon clickable */
    iconClickable: { type: Boolean, default: false },
    /** Icon to be added on the right side */
    iconRight: {
        type: String,
        default: () => getOption("select.iconRight", undefined),
    },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /** Variant of right icon */
    iconRightVariant: { type: String, default: undefined },
    /** Same as native id. Also set the for label for o-field wrapper. */
    id: { type: String, default: () => uuid() },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** The message which is shown when a validation error occurs */
    validationMessage: { type: String, default: undefined },
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("select.autocomplete", "off"),
    },
    /** Show status icon using field and variant prop */
    statusIcon: {
        type: Boolean,
        default: () => getOption("statusIcon", true),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the native select element */
    selectClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the left icon space inside the select */
    iconLeftSpaceClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the right icon space inside the select */
    iconRightSpaceClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of select when rounded */
    roundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the select when multiple mode is active */
    multipleClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of select when expanded */
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of select when disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the left icon */
    iconLeftClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the right icon */
    iconRightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the select size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the select variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the select placeholder */
    placeholderClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the select arrow */
    arrowClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the select variant for the root element*/
    rootVariantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | boolean | object | Array<any>} updated modelValue prop
     */
    (e: "update:modelValue", value: T | T[]): void;
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
const { checkHtml5Validity, onBlur, onFocus, onInvalid, setFocus, isValid } =
    useInputHandler(selectRef, emits, props);

// inject parent field component if used inside one
const { parentField, statusVariant, statusVariantIcon } = injectField();

const vmodel = defineModel<T | T[]>({ default: undefined });

const placeholderVisible = computed(() => !props.multiple && !vmodel.value);

onMounted(() => {
    /**
     * When v-model is changed:
     *  1. Set parent field filled state.
     *  2. Check html5 valdiation
     */
    watch(
        vmodel,
        (value) => {
            if (parentField?.value) parentField.value.setFilled(!!value);
            if (!isValid.value) checkHtml5Validity();
        },
        { immediate: true, flush: "post" },
    );
});

const selectOptions = computed<OptionsItem<T>[]>(() => {
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

function iconClick(emit, event: Event): void {
    emits(emit, event);
    nextTick(() => setFocus());
}

function leftIconClick(event: Event): void {
    if (props.iconClickable) iconClick("icon-click", event);
}

function rightIconClick(event: Event): void {
    if (props.iconRightClickable) iconClick("icon-right-click", event);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-ctrl-sel"],
    [
        "expandedClass",
        "o-ctrl-sel--expanded",
        null,
        computed(() => props.expanded),
    ],
    [
        "rootVariantClass",
        "o-ctrl-sel--",
        computed(() => statusVariant.value || props.variant),
        computed(() => !!statusVariant.value || !!props.variant),
    ],
);

const selectClasses = defineClasses(
    ["selectClass", "o-sel"],
    ["roundedClass", "o-sel--rounded", null, computed(() => props.rounded)],
    ["multipleClass", "o-sel--multiple", null, computed(() => props.multiple)],
    [
        "sizeClass",
        "o-sel--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-sel--",
        computed(() => statusVariant.value || props.variant),
        computed(() => !!statusVariant.value || !!props.variant),
    ],
    ["disabledClass", "o-sel--disabled", null, computed(() => props.disabled)],
    [
        "iconLeftSpaceClass",
        "o-sel-iconspace-left",
        null,
        computed(() => !!props.icon),
    ],
    [
        "iconRightSpaceClass",
        "o-sel-iconspace-right",
        null,
        computed(() => !!props.iconRight),
    ],
    ["placeholderClass", "o-sel--placeholder", null, placeholderVisible],
    [
        "arrowClass",
        "o-sel-arrow",
        null,
        computed(() => !hasIconRight.value && !props.multiple),
    ],
);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-sel__icon-left"]);

const iconRightClasses = defineClasses(["iconRightClass", "o-sel__icon-right"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel.value });
</script>

<template>
    <div :class="rootClasses" data-oruga="select">
        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click="leftIconClick($event)" />

        <select
            v-bind="$attrs"
            :id="id"
            ref="selectRef"
            v-model="vmodel"
            data-oruga-input="select"
            :class="selectClasses"
            :autocomplete="autocomplete"
            :multiple="multiple"
            :size="nativeSize"
            :disabled="disabled"
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
                @slot Override the options, default is options prop
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
