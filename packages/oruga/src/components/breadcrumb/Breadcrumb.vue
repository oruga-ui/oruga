<script setup lang="ts">
import { computed } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { BreadcrumbProps } from "./props";

/**
 * The classic breadcrumb, in different colors, sizes, and states
 * @displayName Breadcrumb
 * @style _breadcrumb.scss
 */
defineOptions({
    isOruga: true,
    name: "OBreadcrumb",
    configField: "breadcrumb",
});

const props = withDefaults(defineProps<BreadcrumbProps>(), {
    override: undefined,
    size: () => getDefault("breadcrumb.size", "small"),
    align: () => getDefault("breadcrumb.align", "left"),
    separator: () => getDefault("breadcrumb.separator", "has-slash-separator"),
    tag: () => getDefault("breadcrumb.tag", "section"),
});

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-breadcrumb"],
    [
        "sizeClass",
        "o-breadcrumb__",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "separatorClass",
        "o-breadcrumb__",
        computed(() => props.separator),
        computed(() => !!props.separator),
    ],
    [
        "alignClass",
        "o-breadcrumb__",
        computed(() => props.align),
        computed(() => !!props.align),
    ],
);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <component :is="tag" :class="rootClasses" data-oruga="breadcrumb">
        <!-- BreadcrumbItems -->
        <slot></slot>
    </component>
</template>
