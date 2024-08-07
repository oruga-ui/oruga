<script setup lang="ts">
import { computed, type PropType } from "vue";

import { getOption } from "@/utils/config";
import getIcons from "@/utils/icons";
import { defineClasses } from "@/composables";

import type { ComponentClass, DynamicComponent } from "@/types";

/**
 * Icons take an important role of any application
 * @displayName Icon
 * @style _icon.scss
 */
defineOptions({
    isOruga: true,
    name: "OIcon",
    configField: "icon",
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Icon component name */
    component: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption("iconComponent"),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    pack: {
        type: String,
        default: () => getOption("iconPack", "mdi"),
    },
    /**
     * 	Color of the icon
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("icon.variant"),
    },
    /** Icon name */
    icon: { type: String, default: undefined },
    /**
     * Icon size
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("icon.size"),
    },
    /**
     * Overrides icon font size
     * @values Depends on library: null (smallest), fa-sm, fa-lg, fa-xl, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize: { type: String, default: undefined },
    /**
     * Add class to icon font.
     * See icon library documentation for custom classes.
     */
    customClass: { type: String, default: undefined },
    /** When true makes icon clickable */
    clickable: { type: Boolean, default: false },
    /** Enable spin effect on icon */
    spin: { type: Boolean, default: false },
    /** Rotation 0-360 */
    rotation: { type: [Number, String], default: undefined },
    /**
     * This is used internally
     * @ignore
     */
    both: { type: Boolean, default: false },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the icon when clickable */
    clickableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the element when spin */
    spinClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the icon size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the icon variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const rootStyle = computed(() => {
    const style = {};
    if (props.rotation) {
        style["transform"] = `rotate(${props.rotation}deg)`;
    }
    return style;
});

const iconConfig = computed(() => getIcons()[props.pack]);

const iconPrefix = computed(() =>
    iconConfig.value?.iconPrefix ? iconConfig.value.iconPrefix : "",
);

const customSizeByPack = computed(() => {
    if (iconConfig.value?.sizes) {
        if (props.size && iconConfig.value.sizes[props.size] !== undefined) {
            return iconConfig.value.sizes[props.size];
        } else if (iconConfig.value.sizes.default) {
            return iconConfig.value.sizes.default;
        }
    }
    return null;
});

/**
 * Internal icon name based on the pack.
 * If pack is 'fa', gets the equivalent FA icon name of the MDI,
 * internal icons are always MDI.
 */
const computedIcon = computed(
    () => `${iconPrefix.value}${getEquivalentIconOf(props.icon)}`,
);

const computedSize = computed(() => props.customSize || customSizeByPack.value);

const computedVariant = computed(() => {
    if (!props.variant) return;
    let newVariant = "";
    if (typeof props.variant === "string") {
        newVariant = props.variant;
    } else {
        newVariant = Object.keys(props.variant).filter(
            (key) => props.variant[key],
        )[0];
    }
    return newVariant;
});

/** Equivalent icon name of the MDI. */
function getEquivalentIconOf(value): string {
    // Only transform the class if the both prop is set to true
    if (!props.both) return value;
    if (
        iconConfig.value?.internalIcons &&
        iconConfig.value?.internalIcons[value]
    )
        return iconConfig.value.internalIcons[value];
    return value;
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-icon"],
    [
        "clickableClass",
        "o-icon--clickable",
        null,
        computed(() => props.clickable),
    ],
    ["spinClass", "o-icon--spin", null, computed(() => props.spin)],
    [
        "sizeClass",
        "o-icon--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "variantClass",
        "o-icon--",
        computedVariant,
        computed(() => !!computedVariant.value),
    ],
);
</script>

<template>
    <span :class="rootClasses" data-oruga="icon" :style="rootStyle">
        <!-- custom icon component -->
        <component
            :is="component"
            v-if="component"
            :icon="[pack, computedIcon]"
            :size="computedSize"
            :class="[customClass]" />

        <!-- native css icon -->
        <i v-else :class="[pack, computedIcon, computedSize, customClass]" />
    </span>
</template>
