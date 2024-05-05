<script setup lang="ts">
import { defineClasses } from "@/composables";

import { getOption } from "@/utils/config";

import { computed, type PropType } from "vue";
import OIcon from "../icon/Icon.vue";

import type { ComponentClass, DynamicComponent } from "@/types";

/**
 * The classic breadrcumb item, in different colors, sizes, and states
 * @displayName Breadcrumb Item
 */
defineOptions({
    isOruga: true,
    name: "OBreadcrumbItem",
    configField: "breadcrumb",
    inheritAttrs: true,
});

const props = defineProps({
    /**
     * breadcrumb item is active, works only when tag provided is a
     * @values true, false
     */
    active: {
        type: Boolean,
        default: () => getOption("breadcrumb.active"),
    },
    activeVariant: {
        type: String,
        default: () => getOption("breadcrumb.activeVariant"),
    },
    /**
     * breadcrumb item tag name
     * @values li, a, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption<DynamicComponent>("breadcrumb.tag", "a"),
    },
    /**
     * breadcrumb item is disabled
     * @values true, false
     */
    disabled: {
        type: Boolean,
        default: () => getOption("breadcrumb.disabled"),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("breadcrumb.iconPack", undefined),
    },
    /** Icon name to show on the left */
    iconLeft: { type: String, default: undefined },
    /** Icon name to show on the right */
    iconRight: { type: String, default: undefined },
    /** Show the icon in both sides, left - right */
    iconBoth: { type: Boolean, default: false },
    /**
     * This is used internally
     * @ignore
     */
    /* class props (will not be displayed in the docs) */
    /** Class of the breadcrumb elements wrapper */
    wrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the breadcrumb icon */
    iconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the breadcrumb icon on the left */
    iconLeftClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the breadcrumb icon on the right */
    iconRightClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

// --- Computed Component Classes ---
const computedDisabled = computed(() =>
    props.disabled ? "o-breadcrumb-item__disabled" : null,
);
const computedActive = computed(() => {
    if (props.active && props.tag !== "router-link")
        return `o-breadcrumb-item__${props.activeVariant} active`;
    if (props.tag == "router-link")
        return `o-breadcrumb-item__${props.activeVariant}`;
    return null;
});
// --- Computed Component Classes ---

const iconClasses = defineClasses(["iconClass", "o-breadcrumb-item__icon"]);

const iconLeftClasses = defineClasses([
    "iconLeftClass",
    "o-breadcrumb-item__icon-left",
]);

const iconRightClasses = defineClasses([
    "iconRightClass",
    "o-breadcrumb-item__icon-right",
]);

const wrapperClasses = defineClasses([
    "wrapperClass",
    "o-breadcrumb-item__wrapper",
]);

const rootClasses = defineClasses(["rootClass", "o-breadcrumb-item"]);
</script>

<template>
    <component
        :is="tag"
        :class="[rootClasses, computedActive, computedDisabled]"
        data-oruga="breadcrumb-item">
        <span :class="wrapperClasses">
            <o-icon
                v-if="iconLeft"
                :pack="iconPack"
                :icon="iconLeft"
                :both="iconBoth"
                :class="[...iconClasses, ...iconLeftClasses]" />
            <slot></slot>
            <o-icon
                v-if="iconRight"
                :pack="iconPack"
                :icon="iconRight"
                :both="iconBoth"
                :class="[...iconClasses, ...iconRightClasses]" />
        </span>
    </component>
</template>
