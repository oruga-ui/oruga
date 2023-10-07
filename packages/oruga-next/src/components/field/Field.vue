<script setup lang="ts">
import { computed, ref, useSlots, watch } from "vue";

import OFieldBody from "./FieldBody.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { useComputedClass, useClassProps, useMatchMedia } from "@/composables";

import { injectField, provideField } from "../field/useFieldShare";

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
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("field.mobileBreakpoint"),
    },
    /**
     * Color of the field and help message, also adds a matching icon, optional.
     * Used by Input, Select and Autocomplete.
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: { type: String, default: undefined },
    /** Field label */
    label: { type: String, default: undefined },
    /**
     * Vertical size of input, optional
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
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "horizontalClass",
        "groupedClass",
        "groupMultilineClass",
        "labelClass",
        "labelSizeClass",
        "labelHorizontalClass",
        "bodyClass",
        "bodyHorizontalClass",
        "addonsClass",
        "messageClass",
        "variantMessageClass",
        "variantLabelClass",
        "mobileClass",
        "focusedClass",
        "filledClass",
    ]),
});

const { isMobile } = useMatchMedia();

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

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-field"),
    {
        [useComputedClass("horizontalClass", "o-field--horizontal")]:
            props.horizontal,
    },
    {
        [useComputedClass("mobileClass", "o-field--mobile")]: isMobile.value,
    },
    {
        [useComputedClass("focusedClass", "o-field--focused")]: isFocused.value,
    },
    {
        [useComputedClass("filledClass", "o-field--filled")]: isFilled.value,
    },
]);

const messageClasses = computed(() => [
    useComputedClass("messageClass", "o-field__message"),
    {
        [useComputedClass(
            "variantMessageClass",
            "o-field__message-",
            fieldVariant.value,
        )]: fieldVariant.value,
    },
]);

const labelClasses = computed(() => [
    useComputedClass("labelClass", "o-field__label"),
    {
        [useComputedClass(
            "labelSizeClass",
            "o-field__label-",
            props.labelSize,
        )]: props.labelSize,
    },
    {
        [useComputedClass(
            "variantLabelClass",
            "o-field__label-",
            fieldVariant.value,
        )]: fieldVariant.value,
    },
]);

const labelHorizontalClasses = computed(() => [
    useComputedClass("labelHorizontalClass", "o-field__horizontal-label"),
]);

const bodyClasses = computed(() => [
    useComputedClass("bodyClass", "o-field__body"),
]);

const bodyHorizontalClasses = computed(() => [
    useComputedClass("bodyHorizontalClass", "o-field__horizontal-body"),
]);

const innerFieldClasses = computed(() => [
    useComputedClass("rootClass", "o-field"),
    {
        [useComputedClass("groupMultilineClass", "o-field--grouped-multiline")]:
            props.groupMultiline,
    },
    {
        [useComputedClass("groupedClass", "o-field--grouped")]: props.grouped,
    },
    {
        [useComputedClass("addonsClass", "o-field--addons")]:
            !props.grouped && hasAddons(),
    },
]);
</script>

<template>
    <div ref="rootRef" :class="rootClasses">
        <div v-if="horizontal" :class="labelHorizontalClasses">
            <label v-if="hasLabel" :for="labelFor" :class="labelClasses">
                <slot name="label">{{ label }}</slot>
            </label>
        </div>
        <template v-else>
            <label v-if="hasLabel" :for="labelFor" :class="labelClasses">
                <slot name="label">{{ label }}</slot>
            </label>
        </template>

        <o-field-body v-if="horizontal" :classes="bodyHorizontalClasses">
            <slot />
        </o-field-body>

        <div v-else-if="hasInnerField" :class="bodyClasses">
            <div :class="innerFieldClasses">
                <slot />
            </div>
        </div>

        <template v-else>
            <slot />
        </template>

        <p v-if="hasMessage && !horizontal" :class="messageClasses">
            <slot name="message"> {{ fieldMessage }} </slot>
        </p>
    </div>
</template>
