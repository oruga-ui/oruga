<script setup lang="ts">
import { defineClasses } from "@/composables";

import { getOption } from "@/utils/config";

import { computed, type PropType } from "vue";
import OIcon from "../icon/Icon.vue";

import type { ComponentClass } from "@/types";

const props = defineProps({
    active: {
        type: String,
        default: () => getOption("button.variant"),
    },
    tag: {
        type: String,
        default: () => getOption("button.variant"),
    },
    /**
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    //  tag: {
    //     type: [String, Object, Function] as PropType<DynamicComponent>,
    //     default: () => getOption<DynamicComponent>("button.tag", "button"),
    // },
    disabled: {
        type: String,
        default: () => getOption("button.variant"),
    },

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
    /**
     * This is used internally
     * @ignore
     */
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
});

// --- Computed Component Classes ---
const computedTag = computed(() =>
    typeof props.disabled !== "undefined" && props.disabled !== false
        ? "a"
        : props.tag,
);
// const computedDisabled = computed(() => (props.disabled ? true : null));
// --- Computed Component Classes ---

const labelClasses = defineClasses(["labelClass", "o-breadcrumb__label"]);

const iconClasses = defineClasses(["iconClass", "o-breadcrumb__icon"]);

const iconLeftClasses = defineClasses([
    "iconLeftClass",
    "o-breadcrumb__icon-left",
]);

const iconRightClasses = defineClasses([
    "iconRightClass",
    "o-breadcrumb__icon-right",
]);

const wrapperClasses = defineClasses(["wrapperClass", "o-breadcrumb__wrapper"]);

// const separatorClasses = defineClasses([
//     "iconLeftClass",
//     "o-breadcrumb--",computed(() => props.separator),
// ]);
const rootClasses = defineClasses(
    ["disabledClass", "o-breadcrumb--disabled", null, computed(() => props.disabled)],
    ["activeClass", "o-breadcrumb--active", null, computed(() => props.active)],
)
</script>

<template>
    <component :is="computedTag" :class="rootClasses" data-oruga="breadcrumb">
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
