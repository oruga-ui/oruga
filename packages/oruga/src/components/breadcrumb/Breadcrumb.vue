<script setup lang="ts">
import { computed, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { ComponentClass, DynamicComponent } from "@/types";

/**
 * The classic button, in different colors, sizes, and states
 * @displayName Breadcrumb
 * @style _breadcrumb.scss
 */
defineOptions({
    isOruga: true,
    name: "OBreadcrumb",
    configField: "breadcrumb",
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
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
    align: {
        type: String,
        default: getOption("button.size"),
    },
    // separator
    separator: {
        type: String,
        default: () => getOption("button.size"),
    },
    tag: {
        type: String,
        default: () => getOption("button.tag"),
    },
    // -----------------------------------------------------------------
    /**
     * This is used internally
     * @ignore
     */
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button elements wrapper */
    wrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button separator */
    separatorClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the button align */
    alignClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const computedTag = computed(() => {
    return props.tag ? props.tag : "ul";
});

// --- Computed Component Classes ---
// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-breadcrumb"],
    [
        "sizeClass",
        "o-breadcrumb--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-breadcrumb--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "separatorClass",
        "o-breadcrumb--",
        computed(() => props.separator),
        computed(() => !!props.separator),
    ],
    [
        "alignClass",
        "o-breadcrumb--",
        computed(() => props.align),
        computed(() => !!props.align),
    ],
);
</script>

<template>
    <!-- <h2>It works!!!</h2>
    <h1>Hello world</h1> -->

    <!-- <slot></slot> -->
    <component :is="computedTag" :class="rootClasses" data-oruga="breadcrumb">
        <!-- BreadcrumbItems -->
        <slot></slot>
    </component>
</template>
