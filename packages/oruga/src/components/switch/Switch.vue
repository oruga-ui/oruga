<script setup lang="ts" generic="T">
import { computed, useAttrs, useId, useSlots, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { SwitchProps } from "./props";

/**
 * Switch between two opposing states.
 * @displayName Switch
 * @style _switch.scss
 */
defineOptions({
    isOruga: true,
    name: "OSwitch",
    configField: "switch",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    id: () => useId(),
    label: undefined,
    variant: () => getDefault("switch.variant"),
    passiveVariant: () => getDefault("switch.passiveVariant"),
    size: () => getDefault("switch.size"),
    position: () => getDefault("switch.right", "position"),
    rounded: () => getDefault("switch.rounded", true),
    required: false,
    disabled: false,
    name: undefined,
    nativeValue: undefined,
    trueValue: undefined,
    falseValue: undefined,
    autocomplete: () => getDefault("switch.autocomplete", "off"),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T} updated modelValue prop
     */
    "update:model-value": [value: T];
    /**
     * on input change event
     * @param value {T} input value
     * @param event {Event} native event
     */
    input: [value: T, event: Event];
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
const { onBlur, onFocus, onInvalid, setFocus, doClick } = useInputHandler(
    inputRef,
    emits,
    props,
);

// inject parent field component if used inside one
const { parentField } = injectField();

// set field labelId or create a unique label id if a label is given
const labelId =
    !!parentField.value || !!props.label || !!useSlots().default
        ? parentField.value?.labelId || useId()
        : undefined;

// if no `label` is given and `id` is given set as `for` property on o-field wrapper
if (!props.label && props.id) parentField.value?.setInputId(props.id);

const vmodel = defineModel<T>({ default: undefined });

const isChecked = computed(
    () =>
        vmodel.value === (props.trueValue ?? true) ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.includes(props.nativeValue)),
);

function onInput(event: Event): void {
    emits("input", vmodel.value, event);
}

function clickInput(): void {
    setFocus();
    doClick();
}

// --- Computed Component Classes ---

const attrs = useAttrs();

const inputBind = computed(() => ({
    ...parentField.value?.inputAttrs,
    ...attrs,
}));

const rootClasses = defineClasses(
    ["rootClass", "o-switch"],
    [
        "sizeClass",
        "o-switch--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-switch--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "passiveVariantClass",
        "o-switch--",
        computed(() => props.passiveVariant + "-passive"),
        computed(() => !!props.passiveVariant),
    ],
    [
        "positionClass",
        "o-switch--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
    [
        "disabledClass",
        "o-switch--disabled",
        null,
        computed(() => props.disabled),
    ],
    ["roundedClass", "o-switch--rounded", null, computed(() => props.rounded)],
    ["checkedClass", "o-switch--checked", null, isChecked],
);

const inputClasses = defineClasses(["inputClass", "o-switch__input"]);

const trackClasses = defineClasses(["trackClass", "o-switch__track"]);

const thumbClasses = defineClasses(["thumbClass", "o-switch__thumb"]);

const labelClasses = defineClasses(["labelClass", "o-switch__label"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <div :class="rootClasses" data-oruga="switch">
        <input
            v-bind="inputBind"
            :id="id"
            ref="inputElement"
            v-model="vmodel"
            type="checkbox"
            role="switch"
            data-oruga-input="switch"
            :class="inputClasses"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue ?? true"
            :false-value="falseValue ?? false"
            :required="required"
            :disabled="disabled"
            :autocomplete="autocomplete"
            :aria-checked="isChecked"
            :aria-labelledby="labelId"
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @change="onInput" />

        <span :class="trackClasses" @click.prevent="clickInput">
            <span :class="thumbClasses"></span>
        </span>

        <label
            v-if="label || $slots.default"
            :id="labelId"
            :for="id"
            :class="labelClasses">
            <!--
                @slot Override the label, default is label prop 
            -->
            <slot>{{ label }}</slot>
        </label>
    </div>
</template>
