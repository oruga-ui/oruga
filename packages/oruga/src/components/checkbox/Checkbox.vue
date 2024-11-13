<script setup lang="ts" generic="T">
import { computed, useAttrs, useId, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { CheckboxProps } from "./props";

/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @style _checkbox.scss
 */
defineOptions({
    isOruga: true,
    name: "OCheckbox",
    configField: "checkbox",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<CheckboxProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    variant: () => getDefault("checkbox.variant"),
    size: () => getDefault("checkbox.size"),
    label: undefined,
    indeterminate: false,
    nativeValue: undefined,
    disabled: false,
    required: false,
    name: undefined,
    trueValue: undefined,
    falseValue: undefined,
    autocomplete: () => getDefault("checkbox.autocomplete", "off"),
    id: () => useId(),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidity: "",
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T | T[]} updated modelValue prop
     */
    "update:modelValue": [value: T | T[]];
    /**
     * on input change event
     * @param value {T | T[]} input value
     * @param event {Event} native event
     */
    input: [value: T | T[], event: Event];
    /**
     * indeterminate prop two-way binding
     * @param value {boolean} updated indeterminate prop
     */
    "update:indeterminate": [value: boolean];
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
}>();

const inputRef = useTemplateRef("inputElement");

// use form input functionalities
const { onBlur, onFocus, onInvalid, setFocus } = useInputHandler(
    inputRef,
    emits,
    props,
);

// inject parent field component if used inside one
const { parentField } = injectField();

const vmodel = defineModel<T | T[]>({ default: undefined });

// if not `label` is given and `id` is given set as `for` property on o-field wrapper
if (!props.label && props.id) parentField?.value?.setInputId(props.id);

const isIndeterminate = defineModel<boolean>("indeterminate", {
    default: false,
});

const _trueValue =
    typeof props.trueValue === "undefined" ? true : props.trueValue;
const _falseValue =
    typeof props.falseValue === "undefined" ? false : props.falseValue;

const isChecked = computed(
    () =>
        vmodel.value === _trueValue ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.includes(props.nativeValue as T)),
);

function onInput(event: Event): void {
    emits("input", vmodel.value, event);
}

// --- Computed Component Classes ---

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField?.value?.inputAttrs,
    ...attrs,
}));

const rootClasses = defineClasses(
    ["rootClass", "o-chk"],
    ["checkedClass", "o-chk--checked", null, isChecked],
    [
        "sizeClass",
        "o-chk--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    ["disabledClass", "o-chk--disabled", null, computed(() => props.disabled)],
    [
        "variantClass",
        "o-chk--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

const inputClasses = defineClasses(
    ["inputClass", "o-chk__input"],
    ["inputCheckedClass", "o-chk__input--checked", null, isChecked],
    [
        "indeterminateClass",
        "o-chk__input--indeterminate",
        null,
        isIndeterminate,
    ],
);

const labelClasses = defineClasses(["labelClass", "o-chk__label"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <label
        ref="label"
        :class="rootClasses"
        data-oruga="checkbox"
        role="checkbox"
        :aria-checked="isChecked"
        @click.stop="setFocus"
        @keydown.prevent.enter="setFocus">
        <input
            v-bind="inputBind"
            :id="id"
            ref="inputElement"
            v-model="vmodel"
            type="checkbox"
            data-oruga-input="checkbox"
            :class="inputClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :autocomplete="autocomplete"
            :value="nativeValue"
            :indeterminate.prop="indeterminate"
            :true-value="_trueValue"
            :false-value="_falseValue"
            @click.stop
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />

        <span v-if="label || $slots.default" :class="labelClasses">
            <!--
                @slot Content slot, default is label prop
            -->
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
