<script setup lang="ts" generic="T">
import { computed, useAttrs, useId, useSlots, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { CheckboxProps } from "./props";

/**
 * Select a single or grouped options.
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
    id: () => useId(),
    variant: () => getDefault("checkbox.variant"),
    size: () => getDefault("checkbox.size"),
    label: undefined,
    indeterminate: false,
    required: false,
    disabled: false,
    name: undefined,
    nativeValue: undefined,
    trueValue: undefined,
    falseValue: undefined,
    autocomplete: () => getDefault("checkbox.autocomplete", "off"),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidity: "",
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T | T[]} updated modelValue prop
     */
    "update:model-value": [value: T | T[]];
    /**
     * on input change event
     * @param value {T | T[]} input value
     * @param event {Event} native event
     */
    input: [value: T | T[], event: Event];
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
const { checkHtml5Validity, onBlur, onFocus, onInvalid, setFocus } =
    useInputHandler(inputRef, emits, props);

// inject parent field component if used inside one
const { parentField } = injectField();

// set field labelId or create a unique label id if a label is given
const labelId =
    !!parentField.value || !!props.label || !!useSlots().default
        ? parentField.value?.labelId || useId()
        : undefined;

// if no `label` is given and `id` is given set as `for` property on o-field wrapper
if (!props.label && props.id) parentField.value?.setInputId(props.id);

const vmodel = defineModel<T | T[]>({ default: undefined });

const isChecked = computed(
    () =>
        vmodel.value === (props.trueValue ?? true) ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.includes(props.nativeValue as T)),
);

function onInput(event: Event): void {
    emits("input", vmodel.value, event);
}

// --- Computed Component Classes ---

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField.value?.inputAttrs,
    ...attrs,
}));

const rootClasses = defineClasses(
    ["rootClass", "o-checkbox"],
    [
        "sizeClass",
        "o-checkbox--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-checkbox--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "disabledClass",
        "o-checkbox--disabled",
        null,
        computed(() => props.disabled),
    ],
    ["checkedClass", "o-checkbox--checked", null, isChecked],
    [
        "indeterminateClass",
        "o-checkbox--indeterminate",
        null,
        computed(() => props.indeterminate),
    ],
);

const inputClasses = defineClasses(["inputClass", "o-checkbox__input"]);

const labelClasses = defineClasses(["labelClass", "o-checkbox__label"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ checkHtml5Validity, focus: setFocus, value: vmodel });
</script>

<template>
    <div data-oruga="checkbox" :class="rootClasses">
        <input
            v-bind="inputBind"
            :id="id"
            ref="inputElement"
            v-model="vmodel"
            type="checkbox"
            data-oruga-input="checkbox"
            :class="inputClasses"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue ?? true"
            :false-value="falseValue ?? false"
            :required="required"
            :indeterminate="indeterminate"
            :disabled="disabled"
            :autocomplete="autocomplete"
            :aria-checked="indeterminate ? 'mixed' : isChecked"
            :aria-labelledby="labelId"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @change="onInput" />

        <label
            v-if="label || $slots.default"
            :id="labelId"
            :for="id"
            :class="labelClasses">
            <!--
                @slot Content slot, default is label prop
            -->
            <slot>{{ label }}</slot>
        </label>
    </div>
</template>
