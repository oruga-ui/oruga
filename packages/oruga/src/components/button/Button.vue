<script setup lang="ts">
import { computed } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { ButtonProps } from "./props";

/**
 * The classic button, in different colors, sizes, and states.
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
    rounded: () => getDefault("button.rounded", false),
    expanded: false,
    disabled: false,
    outlined: false,
    loading: false,
    inverted: false,
    type: "button",
    iconPack: () => getDefault("button.iconPack"),
    iconLeft: undefined,
    iconRight: undefined,
});

defineEmits<{
    /**
     * button click event
     * @param event {Event} native event
     */
    click: [event: Event];
}>();

const computedTag = computed(() =>
    typeof props.disabled !== "undefined" && props.disabled !== false
        ? "button"
        : props.tag,
);

const computedNativeType = computed(() =>
    props.tag === "button" || props.tag === "input" ? props.type : null,
);

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-button"],
    [
        "sizeClass",
        "o-button--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-button--",
        computed(() => props.variant),
        computed(() => !!props.variant && !props.outlined && !props.inverted),
    ],
    [
        "outlinedClass",
        "o-button--outlined",
        null,
        computed(() => props.outlined && !props.variant),
    ],
    [
        "invertedClass",
        "o-button--inverted",
        null,
        computed(() => props.inverted && !props.variant),
    ],
    [
        "outlinedClass",
        "o-button--outlined-",
        computed(() => props.variant),
        computed(() => props.outlined && !!props.variant),
    ],
    [
        "invertedClass",
        "o-button--inverted-",
        computed(() => props.variant),
        computed(() => props.inverted && !!props.variant),
    ],
    [
        "expandedClass",
        "o-button--expanded",
        null,
        computed(() => props.expanded),
    ],
    ["loadingClass", "o-button--loading", null, computed(() => props.loading)],
    ["roundedClass", "o-button--rounded", null, computed(() => props.rounded)],
    [
        "disabledClass",
        "o-button--disabled",
        null,
        computed(() => props.disabled),
    ],
);

const wrapperClasses = defineClasses(["wrapperClass", "o-button__wrapper"]);

const labelClasses = defineClasses(["labelClass", "o-button__label"]);

const iconClasses = defineClasses(["iconClass", "o-button__icon"]);

const iconLeftClasses = defineClasses(["iconLeftClass", "o-button__icon-left"]);

const iconRightClasses = defineClasses([
    "iconRightClass",
    "o-button__icon-right",
]);
</script>

<template>
    <component
        :is="computedTag"
        data-oruga="button"
        :type="computedNativeType"
        role="button"
        tabindex="0"
        :class="rootClasses"
        :disabled="disabled ? true : null"
        @click="$emit('click', $event)"
        @keydown.enter="$emit('click', $event)"
        @keydown.space="$emit('click', $event)">
        <span :class="wrapperClasses">
            <o-icon
                v-if="iconLeft"
                :pack="iconPack"
                :icon="iconLeft"
                :size="size"
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
                :class="[...iconClasses, ...iconRightClasses]" />
        </span>
    </component>
</template>
