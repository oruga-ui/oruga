<script setup lang="ts">
import {
    computed,
    ref,
    useSlots,
    watch,
    type PropType,
    type VNodeArrayChildren,
} from "vue";

import { getOption } from "@/utils/config";
import { isVNodeEmpty, uuid } from "@/utils/helpers";
import { defineClasses, useMatchMedia } from "@/composables";

import { injectField, provideField } from "./fieldInjection";

import type { ComponentClass, DynamicComponent } from "@/types";

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
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
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
    /** Same as native `for` set on the label */
    labelFor: { type: String, default: undefined },
    /** Help message text */
    message: { type: String, default: undefined },
    messageTag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption<DynamicComponent>("field.messageTag", "p"),
    },
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
    addons: { type: Boolean, default: false },
    /** Mobile breakpoint as `max-width` value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("field.mobileBreakpoint"),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class to align label and control in horizontal forms */
    horizontalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when fields are grouped together */
    groupedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when fields fill up multiple lines */
    groupMultilineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for field label */
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for field label size */
    labelSizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for field label when horizontal */
    labelHorizontalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for field body */
    bodyClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** "Class for field body when horizontal */
    bodyHorizontalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for components automatically attached together when inside a field */
    addonsClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for the field message */
    messageClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the message field variant */
    variantMessageClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the label field variant */
    variantLabelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of file component when on mobile */
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for the focused field */
    focusedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for the filled field */
    filledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const inputId = ref(props.labelFor);
watch(
    () => props.labelFor,
    (v) => (inputId.value = v),
);

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

/** Set parent message if we use Field in Field. */
watch(
    () => fieldMessage.value,
    (value) => {
        if (parentField?.value?.hasInnerField) {
            if (!parentField.value.variant)
                parentField.value.setVariant(fieldVariant.value);
            if (!parentField.value.message) parentField.value.setMessage(value);
        }
    },
);

/** a uniqe id for the message slot to associate an input to the field message */
const messageId = uuid();

/** this can be set from outside to update the focus state */
const isFocused = ref(false);
/** this can be set from outside to update the filled state */
const isFilled = ref(false);
/** this can be set from sub fields to update the has inner field state */
const hasInnerField = ref<boolean>(false);

// inject parent field component if used inside one
const { parentField } = injectField();
// tell parent field it has an inner field
if (parentField?.value) parentField.value.addInnerField();

const slots = useSlots();

const hasLabel = computed(() => props.label || !!slots.label);

const hasMessage = computed(() => !!fieldMessage.value || !!slots.message);

const isGrouped = computed(
    () =>
        props.grouped ||
        props.groupMultiline ||
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

const rootRef = ref();

function addInnerField(): void {
    hasInnerField.value = true;
}
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
function setInputId(value: string): void {
    inputId.value = value;
}

const inputAttrs = computed(() =>
    fieldVariant.value === "error"
        ? { "aria-errormessage": messageId }
        : { "aria-describedby": messageId },
);

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    $el: rootRef.value,
    props,
    hasInnerField: hasInnerField.value,
    hasMessage: hasMessage.value,
    variant: fieldVariant.value,
    message: fieldMessage.value,
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
        computed(() => !props.grouped && hasAddons.value),
    ],
);
</script>

<template>
    <div ref="rootRef" data-oruga="field" :class="rootClasses">
        <div v-if="horizontal" :class="labelHorizontalClasses">
            <label v-if="hasLabel" :for="inputId" :class="labelClasses">
                <!--
                    @slot Override the label
                    @binding {string} label - label property 
                -->
                <slot name="label" :label="label">{{ label }}</slot>
            </label>
        </div>
        <template v-else>
            <label v-if="hasLabel" :for="inputId" :class="labelClasses">
                <!--
                    @slot Override the label
                    @binding {string} label - label property 
                -->
                <slot name="label" :label="label">{{ label }}</slot>
            </label>
        </template>

        <div v-if="horizontal" :class="bodyHorizontalClasses">
            <template
                v-for="(element, index) in getInnerContent($slots.default)"
                :key="index">
                <component :is="element" v-if="isVNodeEmpty(element)" />

                <OField
                    v-else
                    :variant="fieldVariant"
                    :addons="false"
                    :message-tag="messageTag"
                    :message-class="messageClass">
                    <!-- render inner default slot element -->
                    <component :is="element" />
                    <!-- show field message here -->
                    <template v-if="index === 0" #message>
                        <slot name="message" :message="fieldMessage">
                            {{ fieldMessage }}
                        </slot>
                    </template>
                </OField>
            </template>
        </div>

        <div v-else-if="isGrouped" :class="bodyClasses">
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
                {{ fieldMessage }}
            </slot>
        </component>
    </div>
</template>
