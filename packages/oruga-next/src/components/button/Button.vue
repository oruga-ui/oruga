<script setup lang="ts">
import { computed, type Component, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { ComponentClass } from "@/types";

/**
 * The classic button, in different colors, sizes, and states
 * @displayName Button
 * @style _button.scss
 */
defineOptions({
    isOruga: true,
    name: "OButton",
    configField: "button",
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("button.tag", "button"),
    },
    /**
     * Color variant of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("button.variant"),
    },
    /**
     * Size of the control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("button.size"),
    },
    /** Button label, unnecessary when default slot is used */
    label: { type: String, default: undefined },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */

    iconPack: {
        type: String,
        default: () => getOption("button.iconPack", undefined),
    },
    /** Icon name to show on the left */
    iconLeft: { type: String, default: undefined },
    /** Icon name to show on the right */
    iconRight: { type: String, default: undefined },
    /** Enable rounded style */
    rounded: {
        type: Boolean,
        default: () => getOption("button.rounded", false),
    },
    /** Button will be expanded (full-width) */
    expanded: { type: Boolean, default: false },
    /** Button will be disabled */
    disabled: { type: Boolean, default: false },
    /** Enable outlined style */
    outlined: { type: Boolean, default: false },
    /** Enable loading style */
    loading: { type: Boolean, default: false },
    /** Enable inverted style */
    inverted: { type: Boolean, default: false },
    /** Button type, like native */
    nativeType: {
        type: String,
        default: "button",
        validator: (value: string) =>
            ["button", "submit", "reset"].indexOf(value) >= 0,
    },
    /** Accessibility Role attribute to be passed to the button. */
    role: {
        type: String,
        default: () => getOption("button.role", "button"),
    },
    /**
     * This is used internally
     * @ignore
     */
    iconBoth: { type: Boolean, default: false },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button elements wrapper */
    wrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button when outlined */
    outlinedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button with loading */
    loadingClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button when inverted */
    invertedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button when expanded */
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button when rounded */
    roundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button when disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button icon */
    iconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button icon on the left */
    iconLeftClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button icon on the right */
    iconRightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button label */
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const computedTag = computed(() =>
    typeof props.disabled !== "undefined" && props.disabled !== false
        ? "button"
        : props.tag,
);

const computedNativeType = computed(() =>
    props.tag === "button" || props.tag === "input" ? props.nativeType : null,
);

const computedDisabled = computed(() => (props.disabled ? true : null));

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-btn"],
    [
        "sizeClass",
        "o-btn--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-btn--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "outlinedClass",
        "o-btn--outlined",
        null,
        computed(() => props.outlined && !props.variant),
    ],
    [
        "invertedClass",
        "o-btn--inverted",
        null,
        computed(() => props.inverted && !props.variant),
    ],
    [
        "outlinedClass",
        "o-btn--outlined-",
        computed(() => props.variant),
        computed(() => props.outlined && !!props.variant),
    ],
    [
        "invertedClass",
        "o-btn--inverted-",
        computed(() => props.variant),
        computed(() => props.inverted && !!props.variant),
    ],
    ["expandedClass", "o-btn--expanded", null, computed(() => props.expanded)],
    ["loadingClass", "o-btn--loading", null, computed(() => props.loading)],
    ["roundedClass", "o-btn--rounded", null, computed(() => props.rounded)],
    ["disabledClass", "o-btn--disabled", null, computed(() => props.disabled)],
);

const labelClasses = defineClasses(["labelClass", "o-btn__label"]);

const iconClasses = defineClasses(["iconClass", "o-btn__icon"]);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-btn__icon-left"]);

const iconRightClasses = defineClasses(["iconRightClass", "o-btn__icon-right"]);

const wrapperClasses = defineClasses(["wrapperClass", "o-btn__wrapper"]);
</script>

<template>
    <component
        :is="computedTag"
        :disabled="computedDisabled"
        :type="computedNativeType"
        :class="rootClasses"
        :role="role"
        data-oruga="button">
        <span :class="wrapperClasses">
            <o-icon
                v-if="iconLeft"
                :pack="iconPack"
                :icon="iconLeft"
                :size="size"
                :both="iconBoth"
                :class="[...iconClasses, ...iconLeftClasses]" />
            <span v-if="label || $slots.default" :class="labelClasses">
                <!--
                    @slot Override the label, default is label prop 
                -->
                <slot>{{ label }}</slot>
            </span>
            <o-icon
                v-if="iconRight"
                :pack="iconPack"
                :icon="iconRight"
                :size="size"
                :both="iconBoth"
                :class="[...iconClasses, ...iconRightClasses]" />
        </span>
    </component>
</template>
