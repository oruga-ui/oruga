<script
    setup
    lang="ts"
    generic="
        T extends string | number | object,
        IsMultiple extends boolean = false
    ">
import { computed, watch, ref, nextTick, useAttrs, useId } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { isDefined, isTrueish } from "@/utils/helpers";
import {
    defineClasses,
    isGroupOption,
    normalizeOptions,
    useInputHandler,
} from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { SelectProps } from "./props";

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

const props = withDefaults(defineProps<SelectProps<T, IsMultiple>>(), {
    override: undefined,
    modelValue: null,
    // multiple: false,
    options: undefined,
    size: () => getOption("select.size"),
    variant: () => getOption("select.variant"),
    placeholder: undefined,
    disabled: false,
    required: false,
    expanded: false,
    rounded: false,
    nativeSize: undefined,
    iconPack: () => getOption("select.iconPack", undefined),
    icon: () => getOption("select.icon", undefined),
    iconClickable: false,
    iconRight: () => getOption("select.iconRight", undefined),
    iconRightClickable: false,
    iconRightVariant: undefined,
    id: () => useId(),
    useHtml5Validation: () => getOption("useHtml5Validation", true),
    customValidation: "",
    autocomplete: () => getOption("select.autocomplete", "off"),
    statusIcon: () => getOption("statusIcon", true),
});

type ModelValue = typeof props.modelValue;

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | boolean | object | array} updated modelValue prop
     */
    (e: "update:modelValue", value: ModelValue): void;
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

// if `id` is given set as `for` property on o-field wrapper
if (props.id) parentField?.value?.setInputId(props.id);

const vmodel = defineModel<ModelValue>({
    get: (v) => (isDefined(v) ? v : ((props.multiple ? [] : "") as ModelValue)),
    set: (v) =>
        isDefined(v) ? v : ((props.multiple ? [] : null) as ModelValue),
    default: null as ModelValue,
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

/** normalized programamtic options */
const normalizedptions = computed(() => normalizeOptions<T>(props.options));

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

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField?.value?.inputAttrs,
    ...attrs,
}));

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
    [
        "roundedClass",
        "o-sel--rounded",
        null,
        computed(() => isTrueish(props.rounded)),
    ],
    [
        "multipleClass",
        "o-sel--multiple",
        null,
        computed(() => isTrueish(props.multiple)),
    ],
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
    [
        "disabledClass",
        "o-sel--disabled",
        null,
        computed(() => isTrueish(props.disabled)),
    ],
    [
        "iconLeftSpaceClass",
        "o-sel-iconspace-left",
        null,
        computed(() => !!props.icon),
    ],
    ["iconRightSpaceClass", "o-sel-iconspace-right", null, hasIconRight],
    ["placeholderClass", "o-sel--placeholder", null, placeholderVisible],
    [
        "arrowClass",
        "o-sel-arrow",
        null,
        computed(() => !hasIconRight.value && !isTrueish(props.multiple)),
    ],
);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-sel__icon-left"]);

const iconRightClasses = defineClasses(["iconRightClass", "o-sel__icon-right"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
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
            v-bind="inputBind"
            :id="id"
            ref="selectRef"
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
                <template v-for="option in normalizedptions" :key="option.key">
                    <optgroup
                        v-if="isGroupOption(option)"
                        v-show="!option.hidden"
                        :label="option.group">
                        <option
                            v-for="_option in option.options"
                            v-show="!_option.hidden"
                            :key="_option.key"
                            :value="_option.value"
                            v-bind="_option.attrs">
                            {{ _option.label }}
                        </option>
                    </optgroup>

                    <option
                        v-else
                        v-show="!option.hidden"
                        :value="option.value"
                        v-bind="option.attrs">
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
