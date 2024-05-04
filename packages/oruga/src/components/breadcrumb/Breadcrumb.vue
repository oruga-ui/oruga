<script setup lang="ts">
import { computed, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { ComponentClass, DynamicComponent } from "@/types";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * Color variant of the breadcrumb
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("breadcrumb.variant"),
    },
    /**
     * Size of the breadcrumb
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("breadcrumb.size"),
    },
    /**
     * Position of the breadcrumb
     * @values left, center, right
     */
    align: {
        type: String,
        default: getOption("breadcrumb.align"),
    },
    /**
     * The breadcrumb separator between breadcrumb items
     * @values
     *  has-arrow-separator, has-dot-separator, has-slash-separator, has-bullet-separator, has-succeeds-separator, has-chevron-separator
     */
    separator: {
        type: String,
        default: () => getOption("breadcrumb.separator"),
    },
    /**
     * Tag of the breadcrumb
     * @values div, section ...
     */
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption<DynamicComponent>("breadcrumb.tag", "section"),
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
    // variantClass: {
    //     type: [String, Array, Function] as PropType<ComponentClass>,
    //     default: undefined,
    // },
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

const rootClasses = defineClasses(
    ["rootClass", "o-breadcrumb"],
    [
        "sizeClass",
        "o-breadcrumb__",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    // [
    //     "variantClass",
    //     "o-breadcrumb__",
    //     computed(() => props.variant),
    //     computed(() => !!props.variant),
    // ],
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
</script>

<template>
    <component :is="tag" :class="rootClasses" data-oruga="breadcrumb">
        <!-- BreadcrumbItems -->
        <slot></slot>
    </component>
</template>
