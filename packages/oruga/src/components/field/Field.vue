<script setup lang="ts">
import {
    computed,
    ref,
    useSlots,
    watch,
    useId,
    useTemplateRef,
    type VNodeArrayChildren,
} from "vue";

import { getDefault } from "@/utils/config";
import { isVNodeEmpty } from "@/utils/helpers";
import { defineClasses, useMatchMedia } from "@/composables";

import { injectField, provideField, type FieldData } from "./fieldInjection";

import type { FieldProps } from "./props";

/**
 * Fields are used to add functionality to controls and to attach/group components and elements together.
 * @displayName Field
 * @style _field.scss
 */
defineOptions({
    isOruga: true,
    name: "OField",
    configField: "field",
});

const props = withDefaults(defineProps<FieldProps>(), {
    override: undefined,
    variant: undefined,
    label: undefined,
    labelSize: () => getDefault("field.labelsize"),
    labelFor: undefined,
    labelId: () => useId(),
    message: undefined,
    messageTag: () => getDefault("field.messageTag", "p"),
    messageId: () => useId(),
    grouped: false,
    addons: false,
    multiline: false,
    horizontal: false,
    mobileBreakpoint: () => getDefault("field.mobileBreakpoint"),
});

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

/** the unique id for the input to associate the label with */
const inputId = ref(props.labelFor);
watch(
    () => props.labelFor,
    (v) => (inputId.value = v),
);

/** set internal variant when prop change */
const fieldVariant = ref(props.variant);
watch(
    () => props.variant,
    (v) => (fieldVariant.value = v),
);

/** set internal message when prop change */
const fieldMessage = ref(props.message);
watch(
    () => props.message,
    (v) => (fieldMessage.value = v),
);

/** set parent message if we use Field in Field */
watch(fieldMessage, (value) => {
    if (parentField.value && parentField.value.hasInnerField) {
        if (!parentField.value.variant)
            parentField.value.setVariant(fieldVariant.value);
        if (!parentField.value.message) parentField.value.setMessage(value);
    }
});

/** this can be set from inputs to update the focus state */
const isFocused = ref(false);
/** this can be set from inputs to update the filled state */
const isFilled = ref(false);
/** this can be set from sub fields to update the has inner field state */
const hasInnerField = ref(false);

// inject parent field component if used inside one
const { parentField } = injectField();
// tell parent field it has an inner field
if (parentField.value) parentField.value.addInnerField();

const slots = useSlots();

const hasLabel = computed(() => props.label || !!slots.label);

const hasMessage = computed(
    () =>
        (Array.isArray(fieldMessage.value) && fieldMessage.value.length) ||
        (!Array.isArray(fieldMessage.value) && !!fieldMessage.value) ||
        !!slots.message,
);

const hasBody = computed(
    () =>
        props.grouped ||
        props.multiline ||
        hasInnerField.value ||
        hasAddons.value,
);

const hasAddons = computed(
    () => props.addons && !props.horizontal && !!slots.default,
);

function getInnerContent(vnode): VNodeArrayChildren {
    const slot = vnode();
    return slot.length === 1 && Array.isArray(slot[0].children)
        ? slot[0].children
        : slot;
}

// --- Field Dependency Injection Feature ---

const rootRef = useTemplateRef("rootElement");

function addInnerField(): void {
    hasInnerField.value = true;
}
function setFocus(value: boolean): void {
    isFocused.value = value;
}
function setFilled(value: boolean): void {
    isFilled.value = value;
}
function setVariant(value?: string): void {
    fieldVariant.value = value;
}
function setMessage(value?: string | string[]): void {
    fieldMessage.value = value;
}
function setInputId(value: string): void {
    inputId.value = value;
}

const inputAttrs = computed(() => ({
    "aria-labelledby": props.labelId,
    ...(fieldVariant.value === "error"
        ? { "aria-errormessage": props.messageId }
        : { "aria-describedby": props.messageId }),
}));

// Provided data is a computed ref to ensure reactivity.
const provideData = computed<FieldData>(() => ({
    $el: rootRef.value,
    props,
    hasInnerField: hasInnerField.value,
    variant: fieldVariant.value,
    message: fieldMessage.value,
    labelId: props.labelId,
    inputAttrs: inputAttrs.value,
    addInnerField,
    setInputId,
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

const labelClasses = defineClasses(
    ["labelClass", "o-field__label"],
    [
        "labelSizeClass",
        "o-field__label-",
        computed(() => props.labelSize),
        computed(() => !!props.labelSize),
    ],
    [
        "labelVariantClass",
        "o-field__label-",
        fieldVariant,
        computed(() => !!fieldVariant.value),
    ],
);

const horizontalLabelClasses = defineClasses([
    "horizontalLabelClass",
    "o-field__horizontal-label",
]);

const horizontalBodyClasses = defineClasses([
    "horizontalBodyClass",
    "o-field__horizontal-body",
]);

const bodyClasses = defineClasses(["bodyClass", "o-field__body"]);

const innerBodyClasses = defineClasses(
    ["rootClass", "o-field"],
    ["groupedClass", "o-field--grouped", null, computed(() => props.grouped)],
    [
        "addonsClass",
        "o-field--addons",
        null,
        computed(() => !props.grouped && hasAddons.value),
    ],
    [
        "multilineClass",
        "o-field--multiline",
        null,
        computed(() => props.multiline),
    ],
);

const messageClasses = defineClasses(
    ["messageClass", "o-field__message"],
    [
        "messageVariantClass",
        "o-field__message-",
        fieldVariant,
        computed(() => !!fieldVariant.value),
    ],
);
</script>

<template>
    <div ref="rootElement" data-oruga="field" :class="rootClasses">
        <div v-if="horizontal" :class="horizontalLabelClasses">
            <label
                v-if="hasLabel"
                :id="labelId"
                :for="inputId"
                :class="labelClasses">
                <!--
                    @slot Override the label
                    @binding {string} label - label property 
                -->
                <slot name="label" :label="label">{{ label }}</slot>
            </label>
        </div>

        <template v-else>
            <label
                v-if="hasLabel"
                :id="labelId"
                :for="inputId"
                :class="labelClasses">
                <!--
                    @slot Override the label
                    @binding {string} label - label property 
                -->
                <slot name="label" :label="label">{{ label }}</slot>
            </label>
        </template>

        <div v-if="horizontal" :class="horizontalBodyClasses">
            <template
                v-for="(element, index) in getInnerContent($slots.default)"
                :key="index">
                <component :is="element" v-if="isVNodeEmpty(element)" />

                <OField
                    v-else
                    :variant="fieldVariant"
                    :addons="false"
                    :label-id="labelId"
                    :message-id="messageId"
                    :message-tag="messageTag"
                    :message-class="messageClass"
                    :message="index === 0 ? fieldMessage : undefined">
                    <!-- render inner default slot element -->
                    <component :is="element" />
                </OField>
            </template>
        </div>

        <div v-else-if="hasBody" :class="bodyClasses">
            <div :class="innerBodyClasses">
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

        <component
            :is="messageTag"
            v-if="hasMessage && !horizontal"
            :id="messageId"
            :class="messageClasses">
            <!--
                @slot Override the message
                @binding {string} message - field message 
            -->
            <slot name="message" :message="fieldMessage">
                <template v-if="Array.isArray(fieldMessage)">
                    <div v-for="message in fieldMessage" :key="message">
                        {{ message }}
                    </div>
                </template>

                <template v-else>
                    {{ fieldMessage }}
                </template>
            </slot>
        </component>
    </div>
</template>
