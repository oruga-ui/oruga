<script setup lang="ts">
import { computed, type Component, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { useComputedClass } from "@/composables";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
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
    rootclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    wrapperclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    outlinedclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    loadingclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    invertedclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    expandedclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    roundedclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    disabledclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    iconclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    iconLeftclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    iconRightclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    labelclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    sizeclass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    variantclass: {
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

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-btn"),
    {
        [useComputedClass("sizeClass", "o-btn--", props.size)]: props.size,
    },
    {
        [useComputedClass("variantClass", "o-btn--", props.variant)]:
            props.variant,
    },
    {
        [useComputedClass("outlinedClass", "o-btn--outlined")]:
            props.outlined && !props.variant,
    },
    {
        [useComputedClass("invertedClass", "o-btn--inverted")]:
            props.inverted && !props.variant,
    },
    {
        [useComputedClass("outlinedClass", "o-btn--outlined-", props.variant)]:
            props.outlined && props.variant,
    },
    {
        [useComputedClass("invertedClass", "o-btn--inverted-", props.variant)]:
            props.inverted && props.variant,
    },
    {
        [useComputedClass("expandedClass", "o-btn--expanded")]: props.expanded,
    },
    {
        [useComputedClass("loadingClass", "o-btn--loading")]: props.loading,
    },
    {
        [useComputedClass("roundedClass", "o-btn--rounded")]: props.rounded,
    },
    {
        [useComputedClass("disabledClass", "o-btn--disabled")]: props.disabled,
    },
]);

const labelClasses = computed(() => [
    useComputedClass("labelClass", "o-btn__label"),
]);

const iconClasses = computed(() => [
    useComputedClass("iconClass", "o-btn__icon"),
]);

const iconLeftClasses = computed(() => [
    ...iconClasses.value,
    useComputedClass("iconLeftClass", "o-btn__icon-left"),
]);

const iconRightClasses = computed(() => [
    ...iconClasses.value,
    useComputedClass("iconRightClass", "o-btn__icon-right"),
]);

const wrapperClasses = computed(() => [
    useComputedClass("wrapperClass", "o-btn__wrapper"),
]);
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
                :class="iconLeftClasses" />
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
                :class="iconRightClasses" />
        </span>
    </component>
</template>
