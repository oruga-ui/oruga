<script setup lang="ts">
import { computed, type Component, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOptions } from "@/utils/config";
import { getValueByPath } from "@/utils/helpers";
import { useComputedClass } from "@/composables";

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

// mixins: [BaseComponentMixin],
const props = defineProps({
    override: Boolean,
    /**
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,
    /**
     * Size of button, optional
     * @values small, medium, large
     */
    size: String,
    /**
     * Button label, optional when default slot
     */
    label: String,
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: String,
    /**
     * Icon name to show on the left
     */
    iconLeft: String,
    /**
     * Icon name to show on the right
     */
    iconRight: String,
    /**
     * Rounded style
     */
    rounded: {
        type: Boolean,
        default: () => {
            return getValueByPath(getOptions(), "button.rounded", false);
        },
    },
    /**
     * Outlined style
     */
    outlined: Boolean,
    /**
     * Loading style
     */
    loading: Boolean,
    /**
     * Button will be expanded (full-width)
     */
    expanded: Boolean,
    inverted: Boolean,
    /**
     * Button type, like native
     */
    nativeType: {
        type: String,
        default: "button",
        validator: (value: string) => {
            return ["button", "submit", "reset"].indexOf(value) >= 0;
        },
    },
    /**
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: "button",
    },
    /**
     * Button will be disabled
     */
    disabled: Boolean,
    /**  @ignore */
    iconBoth: Boolean, // This is used internally
    elementsWrapperClass: [String, Function, Array],
    rootClass: [String, Function, Array],
    outlinedClass: [String, Function, Array],
    loadingClass: [String, Function, Array],
    invertedClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
});

const rootClasses = computed(() => {
    return [
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
            [useComputedClass(
                "outlinedClass",
                "o-btn--outlined-",
                props.variant,
            )]: props.outlined && props.variant,
        },
        {
            [useComputedClass(
                "invertedClass",
                "o-btn--inverted-",
                props.variant,
            )]: props.inverted && props.variant,
        },
        {
            [useComputedClass("expandedClass", "o-btn--expanded")]:
                props.expanded,
        },
        {
            [useComputedClass("loadingClass", "o-btn--loading")]: props.loading,
        },
        {
            [useComputedClass("roundedClass", "o-btn--rounded")]: props.rounded,
        },
        {
            [useComputedClass("disabledClass", "o-btn--disabled")]:
                props.disabled,
        },
    ];
});

const labelClasses = computed(() => {
    return [useComputedClass("labelClass", "o-btn__label")];
});

const iconClasses = computed(() => {
    return [useComputedClass("iconClass", "o-btn__icon")];
});

const iconLeftClasses = computed(() => {
    return [
        ...iconClasses.value,
        useComputedClass("iconLeftClass", "o-btn__icon-left"),
    ];
});

const iconRightClasses = computed(() => {
    return [
        ...iconClasses.value,
        useComputedClass("iconRightClass", "o-btn__icon-right"),
    ];
});
const elementsWrapperClasses = computed(() => {
    return [useComputedClass("elementsWrapperClass", "o-btn__wrapper")];
});
const computedTag = computed(() => {
    if (typeof props.disabled !== "undefined" && props.disabled !== false) {
        return "button";
    }
    return props.tag;
});

const computedNativeType = computed(() => {
    if (props.tag === "button" || props.tag === "input") {
        return props.nativeType;
    }
    return null;
});

const computedDisabled = computed(() => {
    if (props.disabled) return true;
    return null;
});
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
