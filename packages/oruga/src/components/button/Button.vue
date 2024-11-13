<script setup lang="ts">
import { computed } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { ButtonProps } from "./props";

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

const props = withDefaults(defineProps<ButtonProps>(), {
    override: undefined,
    tag: () => getDefault("button.tag", "button"),
    variant: () => getDefault("button.variant"),
    size: () => getDefault("button.size"),
    label: undefined,
    iconPack: () => getDefault("button.iconPack"),
    iconLeft: undefined,
    iconRight: undefined,
    rounded: () => getDefault("button.rounded", false),
    expanded: false,
    disabled: false,
    outlined: false,
    loading: false,
    inverted: false,
    type: "button",
    ariaRole: () => getDefault("button.ariaRole", "button"),
    iconBoth: false,
});

const computedTag = computed(() =>
    typeof props.disabled !== "undefined" && props.disabled !== false
        ? "button"
        : props.tag,
);

const computedNativeType = computed(() =>
    props.tag === "button" || props.tag === "input" ? props.type : null,
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
        computed(() => !!props.variant && !props.outlined && !props.inverted),
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
        :role="ariaRole"
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
