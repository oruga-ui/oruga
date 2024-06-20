<script setup lang="ts" generic="T extends String | Number | Boolean | Object">
import { computed, ref, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import type { ComponentClass } from "@/types";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * @type string|number|boolean|object
     * @model
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
        default: () => getOption("switch.variant"),
    },
    /**
     * Color of the switch when is passive
     * @values primary, info, success, warning, danger, and any other custom color
     */
    passiveVariant: {
        type: String,
        default: () => getOption("switch.passiveVariant"),
    },
    /**
     * Size of the control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("switch.size"),
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
    /** Name attribute on native checkbox */
    name: { type: String, default: undefined },
    /**
     * Overrides the returned value when it's checked
     * @type string|number|boolean|object
     */
    trueValue: {
        type: [String, Number, Boolean, Object] as PropType<T>,
        default: true,
    },
    /**
     * Overrides the returned value when it's not checked
     * @type string|number|boolean|object
     */
    falseValue: {
        type: [String, Number, Boolean, Object] as PropType<T>,
        default: false,
    },
    /** Rounded style */
    rounded: { type: Boolean, default: true },
    /** Label position */
    position: { type: String, default: "right" },
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("switch.autocomplete", "off"),
    },
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
    /** Class when switch is disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the outer switch check */
    switchClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the outer switch check when checked */
    switchCheckedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the inner switch check */
    switchCheckClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the switch when rounded */
    roundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the switch passive variant */
    passiveVariantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of switch label position */
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Root class of the native input checkbox */
    inputClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the native input element when checked */
    inputCheckedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the switch label */
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the switch size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the switch variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string, number, boolean, object} updated modelValue prop
     */
    (e: "update:modelValue", value: T): void;
    /**
     * on input change event
     * @param value {string, number, boolean, object} input value
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

const inputRef = ref();

// use form input functionalities
const { onBlur, onFocus, onInvalid, setFocus } = useInputHandler(
    inputRef,
    emits,
    props,
);

const vmodel = defineModel<T>({ default: undefined });

const isChecked = computed(
    () =>
        vmodel.value === props.trueValue ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.includes(props.nativeValue)),
);

function onInput(event: Event): void {
    emits("input", vmodel.value, event);
}

// --- Computed Component Classes ---

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
            v-bind="$attrs"
            ref="inputRef"
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
            :true-value="trueValue"
            :false-value="falseValue"
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
