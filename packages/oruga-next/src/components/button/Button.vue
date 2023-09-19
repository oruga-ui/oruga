<script lang="ts">
import type { Component, PropType } from "vue";
import { defineComponent } from "vue";

import Icon from "../icon/Icon.vue";

import { getOptions } from "../../utils/config";
import BaseComponentMixin from "../../utils/BaseComponentMixin";
import { getValueByPath } from "../../utils/helpers";

/**
 * The classic button, in different colors, sizes, and states
 * @displayName Button
 * @style _button.scss
 */
export default defineComponent({
    name: "OButton",
    components: {
        [Icon.name]: Icon,
    },
    configField: "button",
    mixins: [BaseComponentMixin],
    inheritAttrs: false,
    props: {
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
         * Button label, unnecessary when default slot is used
         */
        label: {
            type: String,
            default: undefined,
        },
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
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass("rootClass", "o-btn"),
                {
                    [this.computedClass("sizeClass", "o-btn--", this.size)]:
                        this.size,
                },
                {
                    [this.computedClass(
                        "variantClass",
                        "o-btn--",
                        this.variant,
                    )]: this.variant,
                },
                {
                    [this.computedClass("outlinedClass", "o-btn--outlined")]:
                        this.outlined && !this.variant,
                },
                {
                    [this.computedClass("invertedClass", "o-btn--inverted")]:
                        this.inverted && !this.variant,
                },
                {
                    [this.computedClass(
                        "outlinedClass",
                        "o-btn--outlined-",
                        this.variant,
                    )]: this.outlined && this.variant,
                },
                {
                    [this.computedClass(
                        "invertedClass",
                        "o-btn--inverted-",
                        this.variant,
                    )]: this.inverted && this.variant,
                },
                {
                    [this.computedClass("expandedClass", "o-btn--expanded")]:
                        this.expanded,
                },
                {
                    [this.computedClass("loadingClass", "o-btn--loading")]:
                        this.loading,
                },
                {
                    [this.computedClass("roundedClass", "o-btn--rounded")]:
                        this.rounded,
                },
                {
                    [this.computedClass("disabledClass", "o-btn--disabled")]:
                        this.disabled,
                },
            ];
        },
        labelClasses() {
            return [this.computedClass("labelClass", "o-btn__label")];
        },
        iconClasses() {
            return [this.computedClass("iconClass", "o-btn__icon")];
        },
        iconLeftClasses() {
            return [
                ...this.iconClasses,
                this.computedClass("iconLeftClass", "o-btn__icon-left"),
            ];
        },
        iconRightClasses() {
            return [
                ...this.iconClasses,
                this.computedClass("iconRightClass", "o-btn__icon-right"),
            ];
        },
        elementsWrapperClasses() {
            return [
                this.computedClass("elementsWrapperClass", "o-btn__wrapper"),
            ];
        },
        computedTag() {
            if (
                typeof this.disabled !== "undefined" &&
                this.disabled !== false
            ) {
                return "button";
            }
            return this.tag;
        },
        computedNativeType() {
            if (this.tag === "button" || this.tag === "input") {
                return this.nativeType;
            }
            return null;
        },
        computedDisabled() {
            if (this.disabled) return true;
            return null;
        },
    },
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
