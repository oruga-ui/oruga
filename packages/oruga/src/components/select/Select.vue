<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    watch,
    nextTick,
    useAttrs,
    useId,
    useTemplateRef,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { isDefined, isTrueish } from "@/utils/helpers";
import {
    defineClasses,
    isGroupOption,
    normalizeOptions,
    useInputHandler,
    useSequentialId,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { SelectProps } from "./props";

/**
 * Select an item in a list. Use with Field to access all functionalities.
 * @displayName Select
 * @style _select.scss
 */
defineOptions({
    isOruga: true,
    name: "OSelect",
    configField: "select",
    inheritAttrs: false,
});

type ModelValue = SelectProps<T, IsMultiple>["modelValue"];

const props = withDefaults(defineProps<SelectProps<T, IsMultiple>>(), {
    override: undefined,
    modelValue: undefined,
    // multiple: false,
    options: undefined,
    size: () => getDefault("select.size"),
    variant: () => getDefault("select.variant"),
    placeholder: undefined,
    disabled: false,
    required: false,
    expanded: false,
    rounded: false,
    nativeSize: undefined,
    iconPack: () => getDefault("select.iconPack"),
    icon: () => getDefault("select.icon"),
    iconClickable: false,
    iconRight: () => getDefault("select.iconRight"),
    iconRightClickable: false,
    iconRightVariant: undefined,
    id: () => useId(),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidation: "",
    autocomplete: () => getDefault("select.autocomplete", "off"),
    statusIcon: () => getDefault("statusIcon", true),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T | T[]} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
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
}>();

const selectRef = useTemplateRef("selectElement");

// use form input functionality
const { checkHtml5Validity, onBlur, onFocus, onInvalid, setFocus, isValid } =
    useInputHandler(selectRef, emits, props);

// inject parent field component if used inside one
const { parentField, statusVariant, statusVariantIcon } = injectField();

// if `id` is given set as `for` property on o-field wrapper
if (props.id) parentField?.value?.setInputId(props.id);

const vmodel = defineModel<ModelValue>({
    get: (value) =>
        typeof value !== "undefined"
            ? value
            : ((props.multiple ? [] : "") as ModelValue),
    set: (value) =>
        typeof value !== "undefined"
            ? value
            : ((props.multiple ? [] : undefined) as ModelValue),
    default: undefined,
});

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

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

const placeholderVisible = computed(
    () =>
        !isTrueish(props.multiple) &&
        (!isDefined(vmodel.value) || vmodel.value === ""),
);

// --- Icon Feature ---

const hasIconRight = computed(
    () =>
        (!!props.iconRight && !isTrueish(props.multiple)) ||
        (props.statusIcon && !!statusVariantIcon.value),
);

const rightIcon = computed(() =>
    props.iconRight ? props.iconRight : statusVariantIcon.value,
);

const rightIconVariant = computed(() =>
    props.iconRight
        ? props.iconRightVariant || props.variant
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

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField?.value?.inputAttrs,
    ...attrs,
}));

const rootClasses = defineClasses(
    ["rootClass", "o-select"],
    [
        "sizeClass",
        "o-select--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-select--",
        computed(() => statusVariant.value || props.variant),
        computed(() => !!statusVariant.value || !!props.variant),
    ],
    [
        "expandedClass",
        "o-select--expanded",
        null,
        computed(() => props.expanded),
    ],
    [
        "disabledClass",
        "o-select--disabled",
        null,
        computed(() => isTrueish(props.disabled)),
    ],
    [
        "roundedClass",
        "o-select--rounded",
        null,
        computed(() => isTrueish(props.rounded)),
    ],
    ["hasIconRightClass", "o-select--icon-right", null, hasIconRight],
    [
        "multipleClass",
        "o-select--multiple",
        null,
        computed(() => isTrueish(props.multiple)),
    ],
);

const selectClasses = defineClasses(
    ["selectClass", "o-select__input"],
    [
        "iconLeftSpaceClass",
        "o-select__input--iconspace-left",
        null,
        computed(() => !!props.icon),
    ],
    [
        "iconRightSpaceClass",
        "o-select__input--iconspace-right",
        null,
        hasIconRight,
    ],
    [
        "placeholderClass",
        "o-select__input--placeholder",
        null,
        placeholderVisible,
    ],
    [
        "arrowedClass",
        "o-select__input--arrowed",
        null,
        computed(() => !hasIconRight.value && !isTrueish(props.multiple)),
    ],
);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-select__icon-left"]);

const iconRightClasses = defineClasses([
    "iconRightClass",
    "o-select__icon-right",
]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <div data-oruga="select" :class="rootClasses">
        <o-icon
            v-if="icon"
            :class="iconLeftClasses"
            :clickable="iconClickable"
            :icon="icon"
            :pack="iconPack"
            :size="size"
            @click="leftIconClick($event)" />

        <select
            v-bind="inputBind"
            :id="id"
            ref="selectElement"
            v-model="vmodel"
            data-oruga-input="select"
            :class="selectClasses"
            :autocomplete="autocomplete"
            :multiple="props.multiple"
            :size="nativeSize"
            :disabled="disabled"
            :required="required"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid">
            <template v-if="placeholder || $slots.placeholder">
                <option v-if="placeholderVisible" value="" disabled hidden>
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
                <template v-for="option in normalizedOptions" :key="option.key">
                    <optgroup
                        v-if="isGroupOption(option)"
                        v-show="!option.hidden"
                        v-bind="option.attrs"
                        :label="option.label"
                        :value="option.value">
                        <option
                            v-for="_option in option.options"
                            v-show="!_option.hidden"
                            v-bind="_option.attrs"
                            :key="_option.key"
                            :value="_option.value"
                            :selected="option.value === vmodel">
                            {{ _option.label }}
                        </option>
                    </optgroup>

                    <option
                        v-else
                        v-show="!option.hidden"
                        v-bind="option.attrs"
                        :value="option.value"
                        :selected="option.value === vmodel">
                        {{ option.label }}
                    </option>
                </template>
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
