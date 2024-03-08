<script setup lang="ts">
import { computed, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

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
     * Button tag name
     * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
     */
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption<DynamicComponent>("button.tag", "button"),
    },
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
    align : {
        type : String,
        default : getOption("button.size"),
    }
    // separator
    separator: {
        type: String,
        default: () => getOption("button.size"),
    },

    /** Button label, unnecessary when default slot is used */
    label: { type: String, default: undefined }, // -----------------------------------------------------------------
    /**
     * This is used internally
     * @ignore
     */
    iconBoth: { type: Boolean, default: false },
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

// const computedTag = computed(() => 
//     // typeof props.disabled !== "undefined" && props.disabled !== false
//     //     ? "button"
//     //     : props.tag,
// );

const computedNativeType = computed(() =>
    props.tag === "button" || props.tag === "input" ? props.nativeType : null,
);

// const computedDisabled = computed(() => (props.disabled ? true : null));

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
    // ["disabledClass", "o-breadcrumb--disabled", null, computed(() => props.disabled)],
);
</script>

<template>
    <h2>It works!</h2>
    <component
        :is="computedTag"
        :type="computedNativeType"
        :class="rootClasses"
        data-oruga="breadcrumb">
        <!-- BreadcrumbItems -->
        <slot></slot>
    </component>
</template>
