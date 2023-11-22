<script setup lang="ts">
import { computed, ref } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useInputHandler,
} from "@/composables";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: [String, Number, Boolean], default: undefined },
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("switch.variant"),
    },
    /**
     * Color of the switch when is passive, optional
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
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "disabledClass",
        "checkClass",
        "checkCheckedClass",
        "checkSwitchClass",
        "roundedClass",
        "passiveVariantClass",
        "positionClass",
        "inputClass",
        "labelClass",
        "sizeClass",
        "variantClass",
    ]),
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

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-switch"),
    {
        [useComputedClass("sizeClass", "o-switch--", props.size)]: props.size,
    },
    {
        [useComputedClass("disabledClass", "o-switch--disabled")]:
            props.disabled,
    },
    {
        [useComputedClass("variantClass", "o-switch--", props.variant)]:
            props.variant,
    },
    {
        [useComputedClass("positionClass", "o-switch--", props.position)]:
            props.position,
    },
    {
        [useComputedClass(
            "passiveVariantClass",
            "o-switch--",
            props.passiveVariant + "-passive",
        )]: props.passiveVariant,
    },
]);

const inputClasses = computed(() => [
    useComputedClass("inputClass", "o-switch__input"),
]);

const checkClasses = computed(() => [
    useComputedClass("checkClass", "o-switch__check"),
    {
        [useComputedClass("checkCheckedClass", "o-switch__check--checked")]:
            isChecked.value,
    },
    {
        [useComputedClass("roundedClass", "o-switch--rounded")]: props.rounded,
    },
]);

const checkSwitchClasses = computed(() => [
    useComputedClass("checkSwitchClass", "o-switch__check-switch"),
    {
        [useComputedClass("roundedClass", "o-switch--rounded")]: props.rounded,
    },
]);

const labelClasses = computed(() => [
    useComputedClass("labelClass", "o-switch__label"),
]);
</script>

<template>
    <label
        ref="label"
        :class="rootClasses"
        data-oruga="switch"
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

        <span :class="checkClasses">
            <span :class="checkSwitchClasses"></span>
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
