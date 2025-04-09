<script setup lang="ts">
import { defineClasses } from "@/composables";
// /
import { getDefault } from "@/utils/config";

import { computed } from "vue";
import OIcon from "../icon/Icon.vue";

import type { BreadcrumbItemProps } from "./props";

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

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
    override: undefined,
    active: () => getDefault("breadcrumb.active", false),
    activeVariant: () => getDefault("breadcrumb.activeVariant", "primary"),
    tag: () => getDefault("breadcrumb.tag", "a"),
    disabled: () => getDefault("breadcrumb.disabled", false),
    iconPack: () => getDefault("breadcrumb.iconPack"),
    iconLeft: undefined,
    iconRight: undefined,
    iconBoth: false,
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
