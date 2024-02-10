<script setup lang="ts">
import { computed, ref, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import {
    defineClasses,
    useVModelBinding,
    useInputHandler,
} from "@/composables";

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
    /** @model */
    modelValue: { type: [String, Number, Boolean], default: undefined },
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
    /** Same as native value */
    nativeValue: { type: [String, Number, Boolean], default: undefined },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native required */
    required: { type: Boolean, default: false },
    /** Name attribute on native checkbox */
    name: { type: String, default: undefined },
    /** Overrides the returned value when it's checked */
    trueValue: { type: [String, Number, Boolean], default: true },
    /** Overrides the returned value when it's not checked */
    falseValue: { type: [String, Number, Boolean], default: false },
    /** Rounded style */
    rounded: { type: Boolean, default: true },
    /** Label position */
    position: { type: String, default: "right" },
    /** Accessibility label to establish relationship between the switch and control label' */
    ariaLabelledby: { type: String, default: () => uuid() },
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
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    switchClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    switchCheckedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    switchCheckClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    roundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    passiveVariantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    inputClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    inputCheckedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,

        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | boolean} updated modelValue prop
     */
    (e: "update:modelValue", value: string | number | boolean): void;
    /**
     * on input change event
     * @param value {string, number, boolean} input value
     * @param event {Event} native event
     */
    (e: "input", value: string | number | boolean, event: Event): void;
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

const vmodel = useVModelBinding<string | number | boolean>(props, emits, {
    passive: true,
});

const isChecked = computed(
    () =>
        vmodel.value === props.trueValue ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.indexOf(props.nativeValue) !== -1),
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
            :aria-labelledby="ariaLabelledby"
            @click.stop
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />

        <span :class="switchClasses">
            <span :class="switchCheckClasses"></span>
        </span>

        <span
            v-if="label || $slots.default"
            :id="ariaLabelledby"
            :class="labelClasses">
            <!--
                @slot Override the label, default is label prop 
            -->
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
