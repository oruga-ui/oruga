<script setup lang="ts" generic="T">
import { computed, useAttrs, useId, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { SwitchProps } from "./props";

/**
 * Switch between two opposing states
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
    variant: () => getDefault("switch.variant"),
    passiveVariant: () => getDefault("switch.passiveVariant"),
    size: () => getDefault("switch.size"),
    label: undefined,
    nativeValue: undefined,
    disabled: false,
    required: false,
    name: undefined,
    trueValue: undefined,
    falseValue: undefined,
    rounded: true,
    position: "right",
    autocomplete: () => getDefault("switch.autocomplete", "off"),
    id: () => useId(),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | boolean | object} updated modelValue prop
     */
    "update:modelValue": [value: T];
    /**
     * on input change event
     * @param value {string | number | boolean | object} input value
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

const _trueValue =
    typeof props.trueValue === "undefined" ? true : props.trueValue;
const _falseValue =
    typeof props.falseValue === "undefined" ? false : props.falseValue;

const isChecked = computed(
    () =>
        vmodel.value === _trueValue ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.includes(props.nativeValue)),
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
    ["rootClass", "o-switch"],
    [
        "sizeClass",
        "o-switch--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "disabledClass",
        "o-switch--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "variantClass",
        "o-switch--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "positionClass",
        "o-switch--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
    [
        "passiveVariantClass",
        "o-switch--",
        computed(() => props.passiveVariant + "-passive"),
        computed(() => !!props.passiveVariant),
    ],
);

const inputClasses = defineClasses(
    ["inputClass", "o-switch__input"],
    ["inputCheckedClass", "o-switch__input--checked", null, isChecked],
);

const switchClasses = defineClasses(
    ["switchClass", "o-switch__check"],
    ["switchCheckedClass", "o-switch__check--checked", null, isChecked],
    ["roundedClass", "o-switch--rounded", null, computed(() => props.rounded)],
);

const switchCheckClasses = defineClasses(
    ["switchCheckClass", "o-switch__check-switch"],
    ["roundedClass", "o-switch--rounded", null, computed(() => props.rounded)],
);

const labelClasses = defineClasses(["labelClass", "o-switch__label"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <label
        ref="label"
        :class="rootClasses"
        data-oruga="switch"
        role="switch"
        :aria-checked="isChecked"
        @click="setFocus"
        @keydown.prevent.enter="setFocus">
        <input
            v-bind="inputBind"
            :id="id"
            ref="inputElement"
            v-model="vmodel"
            type="checkbox"
            role="switch"
            data-oruga-input="switch"
            :class="inputClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :autocomplete="autocomplete"
            :value="nativeValue"
            :true-value="_trueValue"
            :false-value="_falseValue"
            @click.stop
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />

        <span :class="switchClasses">
            <span :class="switchCheckClasses"></span>
        </span>

        <span v-if="label || $slots.default" :class="labelClasses">
            <!--
                @slot Override the label, default is label prop 
            -->
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
