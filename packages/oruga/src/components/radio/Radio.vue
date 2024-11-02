<script setup lang="ts" generic="T">
import { computed, useAttrs, useId, useTemplateRef } from "vue";

import { getOption } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { RadioProps } from "./props";

/**
 * Select an option from a set
 * @displayName Radio
 * @style _radio.scss
 */
defineOptions({
    isOruga: true,
    name: "ORadio",
    configField: "radio",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<RadioProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    variant: () => getOption("radio.variant"),
    size: () => getOption("radio.size"),
    label: undefined,
    nativeValue: undefined,
    disabled: false,
    required: false,
    name: undefined,
    autocomplete: () => getOption("radio.autocomplete", "off"),
    id: () => useId(),
    useHtml5Validation: () => getOption("useHtml5Validation", true),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | boolean | object} updated modelValue prop
     */
    (e: "update:modelValue", value: T): void;
    /**
     * on input change event
     * @param value {string | number | boolean | object} input value
     * @param event {Event} native event
     */
    (e: "input", value: T, event: Event): void;
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

const vmodel = defineModel<T>({ default: undefined });

// if not `label` is given and `id` is given set as `for` property on o-field wrapper
if (!props.label && props.id) parentField?.value?.setInputId(props.id);

const isChecked = computed(() => vmodel.value === props.nativeValue);

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
    ["rootClass", "o-radio"],
    ["checkedClass", "o-radio--checked", null, isChecked],
    [
        "sizeClass",
        "o-radio--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "disabledClass",
        "o-radio--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "variantClass",
        "o-radio--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

const inputClasses = defineClasses(
    ["inputClass", "o-radio__input"],
    ["inputCheckedClass", "o-radio__input--checked", null, isChecked],
);

const labelClasses = defineClasses(["labelClass", "o-radio__label"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <label
        ref="label"
        :class="rootClasses"
        data-oruga="radio"
        role="radio"
        :aria-checked="isChecked"
        @click.stop="setFocus"
        @keydown.prevent.enter="setFocus">
        <input
            v-bind="inputBind"
            :id="id"
            ref="inputElement"
            v-model="vmodel"
            type="radio"
            data-oruga-input="radio"
            :class="inputClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :autocomplete="autocomplete"
            :value="nativeValue"
            @click.stop
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />

        <span v-if="label || $slots.default" :class="labelClasses">
            <!--
                @slot Override the label, default is label prop 
            -->
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
