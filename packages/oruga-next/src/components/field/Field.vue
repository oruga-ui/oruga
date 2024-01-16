<script setup lang="ts">
import { computed, ref, useSlots, watch, type PropType } from "vue";

import OFieldBody from "./FieldBody.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { defineClasses, useMatchMedia } from "@/composables";

import { injectField, provideField } from "../field/useFieldShare";

import type { ComponentClass } from "@/types";

/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @style _field.scss
 */
defineOptions({
    isOruga: true,
    name: "OField",
    configField: "field",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /**
     * Color of the field and help message, also adds a matching icon.
     * Used by Input, Select and Autocomplete.
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: { type: String, default: undefined },
    /** Field label */
    label: { type: String, default: undefined },
    /**
     * Vertical size of input
     * @values small, medium, large
     */
    labelSize: {
        type: String,
        default: () => getOption("field.labelsize"),
    },
    /** Same as native for set on the label */
    labelFor: { type: String, default: undefined },
    /** Help message text */
    message: { type: String, default: undefined },
    /**
     * Direct child components/elements of Field will be grouped horizontally
     * (see which ones at the top of the page).
     */
    grouped: { type: Boolean, default: false },
    /** Allow controls to fill up multiple lines, making it responsive */
    groupMultiline: { type: Boolean, default: false },
    /** Group label and control on the same line for horizontal forms */
    horizontal: { type: Boolean, default: false },
    /** Field automatically attach controls together */
    addons: { type: Boolean, default: true },
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("field.mobileBreakpoint"),
    },
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    horizontalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    groupedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    groupMultilineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    labelSizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    labelHorizontalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    bodyClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    bodyHorizontalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    addonsClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    messageClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    variantMessageClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    variantLabelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    focusedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    filledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

/** Set internal variant when prop change. */
const fieldVariant = ref(props.variant);
watch(
    () => props.variant,
    (v) => (fieldVariant.value = v),
);

/** Set internal message when prop change. */
const fieldMessage = ref(props.message);
watch(
    () => props.message,
    (v) => (fieldMessage.value = v),
);

/** this can be set from outside to update the focus state. */
const isFocused = ref(false);
/** this can be set from outside to update the filled state. */
const isFilled = ref(false);

// inject parent field component if used inside one
const { parentField } = injectField();

/** Set parent message if we use Field in Field. */
watch(
    () => fieldMessage.value,
    (value) => {
        if (parentField?.value?.hasInnerField) {
            if (!parentField.value.fieldVariant)
                parentField.value.setVariant(fieldVariant.value);
            if (!parentField.value.fieldMessage)
                parentField.value.setMessage(value);
        }
    },
);

const slots = useSlots();

const hasLabel = computed(() => props.label || !!slots.label);

const hasMessage = computed(
    () =>
        !!(!parentField?.value?.hasInnerField && fieldMessage.value) ||
        !!slots.message,
);

const hasInnerField = computed(
    () => props.grouped || props.groupMultiline || hasAddons(),
);

function hasAddons(): boolean {
    if (!props.addons || props.horizontal) return false;

    let renderedNode = 0;
    // [Vue warn]: Slot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.
    const slot = slots.default();
    if (slot) {
        const children =
            slot.length === 1 && Array.isArray(slot[0].children)
                ? slot[0].children
                : slot;
        renderedNode = children.filter((n) => !!n).length;
    }
    return renderedNode > 1 && props.addons && !props.horizontal;
}

// --- Field Dependency Injection Feature ---

const rootRef = ref();

function setFocus(value: boolean): void {
    isFocused.value = value;
}
function setFilled(value: boolean): void {
    isFilled.value = value;
}
function setVariant(value: string): void {
    fieldVariant.value = value;
}
function setMessage(value: string): void {
    fieldMessage.value = value;
}

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    $el: rootRef.value,
    props,
    hasInnerField: hasInnerField.value,
    hasMessage: hasMessage.value,
    fieldVariant: fieldVariant.value,
    fieldMessage: fieldMessage.value,
    setFocus,
    setFilled,
    setVariant,
    setMessage,
}));

// Provide field component data via dependency injection.
provideField(provideData);

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-field"],
    [
        "horizontalClass",
        "o-field--horizontal",
        null,
        computed(() => !!props.horizontal),
    ],
    ["mobileClass", "o-field--mobile", null, isMobile],
    ["focusedClass", "o-field--focused", null, isFocused],
    ["filledClass", "o-field--filled", null, isFilled],
);

const messageClasses = defineClasses(
    ["messageClass", "o-field__message"],
    [
        "variantMessageClass",
        "o-field__message-",
        fieldVariant,
        computed(() => !!fieldVariant.value),
    ],
);

const labelClasses = defineClasses(
    ["labelClass", "o-field__label"],
    [
        "labelSizeClass",
        "o-field__label-",
        computed(() => props.labelSize),
        computed(() => !!props.labelSize),
    ],
    [
        "variantLabelClass",
        "o-field__label-",
        fieldVariant,
        computed(() => !!fieldVariant.value),
    ],
);

const labelHorizontalClasses = defineClasses([
    "labelHorizontalClass",
    "o-field__horizontal-label",
]);

const bodyClasses = defineClasses(["bodyClass", "o-field__body"]);

const bodyHorizontalClasses = defineClasses([
    "bodyHorizontalClass",
    "o-field__horizontal-body",
]);

const innerFieldClasses = defineClasses(
    ["rootClass", "o-field"],
    [
        "groupMultilineClass",
        "o-field--grouped-multiline",
        null,
        computed(() => props.groupMultiline),
    ],

    ["groupedClass", "o-field--grouped", null, computed(() => props.grouped)],
    [
        "addonsClass",
        "o-field--addons",
        null,
        computed(() => !props.grouped && hasAddons()),
    ],
);
</script>

<template>
    <div ref="rootRef" data-oruga="field" :class="rootClasses">
        <div v-if="horizontal" :class="labelHorizontalClasses">
            <label v-if="hasLabel" :for="labelFor" :class="labelClasses">
                <!--
                    @slot Override the label
                -->
                <slot name="label">{{ label }}</slot>
            </label>
        </div>
        <template v-else>
            <label v-if="hasLabel" :for="labelFor" :class="labelClasses">
                <!--
                    @slot Override the label
                -->
                <slot name="label">{{ label }}</slot>
            </label>
        </template>

        <o-field-body v-if="horizontal" :classes="bodyHorizontalClasses">
            <!--
                @slot Default content
            -->
            <slot />
        </o-field-body>

        <div v-else-if="hasInnerField" :class="bodyClasses">
            <div :class="innerFieldClasses">
                <!--
                   @slot Default content
                -->
                <slot />
            </div>
        </div>

        <template v-else>
            <!--
                @slot Default content
            -->
            <slot />
        </template>

        <p v-if="hasMessage && !horizontal" :class="messageClasses">
            <!--
                @slot Override the message
            -->
            <slot name="message"> {{ fieldMessage }} </slot>
        </p>
    </div>
</template>
