<script setup lang="ts">
import { defineClasses /*useProviderChild */ } from "@/composables";

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
     * breadcrumb item is active
     * @values true, false
     */
    active: {
        type: Boolean,
        default: () => getOption("breadcrumb.active"),
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
    /**
     * This is used internally
     * @ignore
     */
    /** Class of the button elements wrapper */
    wrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    iconBoth: { type: Boolean, default: false },
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

// Inject functionalities and data from the parent carousel component
// const { parent, item } = useProviderChild<Ref<any>>();

// --- Computed Component Classes ---
const computedTag = computed(() => {
    return props.tag ? props.tag : "li";
});
const computedDisabled = computed(() =>
    props.disabled ? "o-breadcrumb-item__disabled" : null,
);
const computedActive = computed(() =>
    props.active ? "o-breadcrumb-item__active" : null,
);
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

const wrapperClasses = defineClasses(["wrapperClass", "o-breadcrumb__wrapper"]);

const rootClasses = defineClasses(
    ["rootClass", "o-breadcrumb-item"],
    // eslint-disable-next-line prettier/prettier
    // ["disabledClass", "o-breadcrumb-item__disabled", null, computed(() => props.disabled)],
    // eslint-disable-next-line prettier/prettier
    // ["activeClass", "o-breadcrumb-item__active", null, computed(() => props.active)],
);
</script>

<template>
    <component
        :is="computedTag"
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
<!-- :size="size" -->
<!-- :size="size" -->
