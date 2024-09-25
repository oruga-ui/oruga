<script setup lang="ts" generic="T extends string | number | boolean | object">
import { computed, ref, useAttrs, useId, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { defineClasses, useInputHandler } from "@/composables";

import { injectField } from "../field/fieldInjection";

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
    /**
     * The input value state
     * @type string|number|boolean|object|array
     */
    modelValue: {
        type: [String, Number, Boolean, Object, Array] as PropType<T | T[]>,
        default: undefined,
    },
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
    /** Same as native autocomplete options to use in HTML5 validation */
    autocomplete: {
        type: String,
        default: () => getOption("checkbox.autocomplete", "off"),
    },
    /** Same as native id. Also set the for label for o-field wrapper - default is an uuid. */
    id: { type: String, default: () => useId() },
    /** Enable HTML 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** Custom HTML 5 validation error to set on the form control */
    customValidity: {
        type: [String, Function] as PropType<
            | string
            | ((
                  currentValue: boolean | null | undefined,
                  state: ValidityState,
              ) => string)
        >,
        default: "",
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when checkbox is disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the root element when checked */
    checkedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the checkbox input */
    inputClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the checkbox input when checked */
    inputCheckedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when checkbox is indeterminate */
    indeterminateClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the checkbox labe */
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the checkbox size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the checkbox variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | boolean | object | array} updated modelValue prop
     */
    (e: "update:modelValue", value: T | T[]): void;
    /**
     * on input change event
     * @param value {string | number | boolean | object | array} input value
     * @param event {Event} native event
     */
    (e: "input", value: T | T[], event: Event): void;
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

const inputRef = ref<HTMLInputElement>();

// use form input functionalities
const { onBlur, onFocus, onInvalid, setFocus } = useInputHandler(
    inputRef,
    emits,
    props,
);

// inject parent field component if used inside one
const { parentField } = injectField();

const vmodel = defineModel<T | T[]>({ default: undefined });

// if not `label` is given and `id` is given set as `for` property on o-field wrapper
if (!props.label && props.id) parentField?.value?.setInputId(props.id);

const isIndeterminate = defineModel<boolean>("indeterminate", {
    default: false,
});

const isChecked = computed(
    () =>
        vmodel.value === props.trueValue ||
        (Array.isArray(vmodel.value) &&
            vmodel.value.includes(props.nativeValue as T)),
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

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
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
            v-bind="inputBind"
            :id="id"
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
            @click.stop
            @blur="onBlur"
            @focus="onFocus"
            @invalid="onInvalid"
            @input="onInput" />

        <span v-if="label || $slots.default" :class="labelClasses">
            <!--
                @slot Content slot, default is label prop
            -->
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>
