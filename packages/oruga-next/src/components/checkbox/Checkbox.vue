<script setup lang="ts">
import { computed, ref, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import {
    defineClasses,
    usePropBinding,
    useVModelBinding,
    useInputHandler,
} from "@/composables";

import type { ComponentClass } from "@/types";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** @model */
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("checkbox.variant"),
    },
    /**
     * Size of the control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("checkbox.size"),
    },
    /** Input label, unnecessary when default slot is used */
    label: { type: String, default: undefined },
    /** Same as native indeterminate */
    indeterminate: { type: Boolean, default: false },
    /** Same as native value */
    nativeValue: { type: [String, Number, Boolean], default: undefined },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Same as native required */
    required: { type: Boolean, default: false },
    /** Same as native name */
    name: { type: String, default: undefined },
    /** Overrides the returned value when it's checked */
    trueValue: { type: [String, Number, Boolean], default: true },
    /** Overrides the returned value when it's not checked */
    falseValue: { type: [String, Number, Boolean], default: false },
    /** Accessibility label to establish relationship between the checkbox and control label */
    ariaLabelledby: { type: String, default: () => uuid() },
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("checkbox.autocomplete", "off"),
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
    checkedClass: {
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
    indeterminateClass: {
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
     * @param value {string, number, boolean, array} updated modelValue prop
     */
    (
        e: "update:modelValue",
        value: string | number | boolean | Array<string | number | boolean>,
    ): void;
    /**
     * on input change event
     * @param value {string, number, boolean, array} input value
     * @param event {Event} native event
     */
    (
        e: "input",
        value: string | number | boolean | Array<string | number | boolean>,
        event: Event,
    ): void;
    /**
     * indeterminate prop two-way binding
     * @param value {boolean} updated indeterminate prop
     */
    (e: "update:indeterminate", value: boolean): void;
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

const vmodel = useVModelBinding<
    string | number | boolean | Array<string | number | boolean>
>(props, emits, { passive: true });

const isIndeterminate = usePropBinding<boolean>("indeterminate", props, emits);

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
            v-bind="$attrs"
            ref="inputRef"
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
            :true-value="trueValue"
            :false-value="falseValue"
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
                @slot Content slot, default is label prop
            -->
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
