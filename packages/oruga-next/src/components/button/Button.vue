<script setup lang="ts">
import { computed, type Component, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOptions } from "@/utils/config";
import { getValueByPath } from "@/utils/helpers";
import { useComputedClass, useClassProps } from "@/composables";
import { baseComponentProps } from "@/mixins/SharedProps";

/**
 * The classic button, in different colors, sizes, and states
 * @displayName Button
 * @style _button.scss
 */
defineOptions({
    isOruga: true,
    name: "OButton",
    configField: "button",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props
    ...baseComponentProps,
    /**
     * Html tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: "button",
    },
    /**
     * Button label, optional when default slot
     */
    label: { type: String, default: undefined },
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getValueByPath(getOptions(), "button.variant"),
    },
    /**
     * Invert the variant
     */
    inverted: {
        type: Boolean,
        default: () => getValueByPath(getOptions(), "button.inverted"),
    },
    /**
     * Size of the button
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getValueByPath(getOptions(), "button.size"),
    },
    /**
     * Enable rounded style
     */
    rounded: {
        type: Boolean,
        default: () => getValueByPath(getOptions(), "button.rounded", false),
    },
    /**
     * Enable outlined style
     */
    outlined: {
        type: Boolean,
        default: () => getValueByPath(getOptions(), "button.outlined", false),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getValueByPath(getOptions(), "button.iconPack"),
    },
    /**
     * Icon name to show on the left side
     */
    iconLeft: { type: String, default: undefined },
    /**
     * Icon name to show on the right side
     */
    iconRight: { type: String, default: undefined },
    /**
     * This is used internally
     * @ignore
     */
    iconBoth: { type: Boolean, default: false },
    /**
     * Enable loading state
     */
    loading: { type: Boolean, default: false },
    /**
     * Enable disabled state
     */
    disabled: { type: Boolean, default: false },
    /**
     * Button will be expanded (full-width)
     */
    expanded: { type: Boolean, default: false },
    /**
     * Native html type, like native
     */
    nativeType: {
        type: String,
        default: "button",
        validator: (value: string) => {
            return ["button", "submit", "reset"].indexOf(value) >= 0;
        },
    },
    // add class props
    ...useClassProps([
        "rootClass",
        "elementsWrapperClass",
        "outlinedClass",
        "loadingClass",
        "invertedClass",
        "expandedClass",
        "roundedClass",
        "disabledClass",
        "iconClass",
        "iconLeftClass",
        "iconRightClass",
        "labelClass",
        "sizeClass",
        "variantClass",
    ]),
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
        [useComputedClass("outlinedClass", "o-btn--outlined-", props.variant)]:
            props.outlined && props.variant,
    },
    {
        [useComputedClass("invertedClass", "o-btn--inverted")]:
            props.inverted && !props.variant,
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

const elementsWrapperClasses = computed(() => [
    useComputedClass("elementsWrapperClass", "o-btn__wrapper"),
]);
</script>

<template>
    <component
        v-bind="$attrs"
        :is="computedTag"
        :disabled="computedDisabled"
        :type="computedNativeType"
        :class="rootClasses">
        <span :class="elementsWrapperClasses">
            <o-icon
                v-if="iconLeft"
                :pack="iconPack"
                :icon="iconLeft"
                :size="size"
                :both="iconBoth"
                :class="iconLeftClasses" />
            <span v-if="label || $slots.default" :class="labelClasses">
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
