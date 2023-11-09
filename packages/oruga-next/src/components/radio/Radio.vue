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
    /** Same as native value */
    nativeValue: { type: [String, Number, Boolean], default: undefined },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native required */
    required: { type: Boolean, default: false },
    /** Same as native name */
    name: { type: String, default: undefined },
    /** Accessibility label to establish relationship between the checkbox and control label */
    ariaLabelledby: { type: String, default: () => uuid() },
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("radio.autocomplete", "off"),
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
        "checkedClass",
        "checkCheckedClass",
        "labelClass",
        "sizeClass",
        "variantClass",
    ]),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string, number, boolean} updated modelValue prop
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

const vmodel = useVModelBinding<string | number | boolean>(props, emits);

const isChecked = computed(() => vmodel.value === props.nativeValue);

function onInput(event: Event): void {
    emits("input", vmodel.value, event);
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-radio"),
    {
        [useComputedClass("checkedClass", "o-radio--checked")]: isChecked.value,
    },
    {
        [useComputedClass("sizeClass", "o-radio--", props.size)]: props.size,
    },
    {
        [useComputedClass("disabledClass", "o-radio--disabled")]:
            props.disabled,
    },
    {
        [useComputedClass("variantClass", "o-radio--", props.variant)]:
            props.variant,
    },
]);

const checkClasses = computed(() => [
    useComputedClass("checkClass", "o-radio__check"),
    {
        [useComputedClass("checkCheckedClass", "o-radio__check--checked")]:
            isChecked.value,
    },
]);

const labelClasses = computed(() => [
    useComputedClass("labelClass", "o-radio__label"),
]);
</script>

<template>
    <label
        ref="label"
        :class="rootClasses"
        data-oruga="radio"
        @click.stop="setFocus"
        @keydown.prevent.enter="setFocus">
        <input
            v-bind="$attrs"
            ref="inputRef"
            v-model="vmodel"
            type="radio"
            data-oruga-input="radio"
            :class="checkClasses"
            :disabled="disabled"
            :required="required"
            :name="name"
            :autocomplete="autocomplete"
            :value="nativeValue"
            :aria-labelledby="ariaLabelledby"
            @click.stop
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />
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
