<script setup lang="ts" generic="T extends string | number | boolean | object">
import { computed, ref, useAttrs, useId, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

import type { ComponentClass } from "@/types";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * The input value state
     * @type string|number|boolean|object
     */
    modelValue: {
        type: [String, Number, Boolean, Object] as PropType<T>,
        default: undefined,
    },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("radio.variant"),
    },
    /**
     * Size of the control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("radio.size"),
    },
    /** Input label, unnecessary when default slot is used */
    label: { type: String, default: undefined },
    /**
     * Same as native value
     * @type string|number|boolean|object
     */
    nativeValue: {
        type: [String, Number, Boolean, Object] as PropType<T>,
        default: undefined,
    },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native required */
    required: { type: Boolean, default: false },
    /** Same as native name */
    name: { type: String, default: undefined },
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("radio.autocomplete", "off"),
    },
    /** Same as native id. Also set the for label for o-field wrapper - default is an uuid. */
    id: { type: String, default: () => useId() },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when radio is disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the root element when checked */
    checkedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the native input element */
    inputClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the native input element when checked */
    inputCheckedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the radio label */
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the radio size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the radio variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
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

const inputRef = ref<HTMLInputElement>();

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
            ref="inputRef"
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
