<script setup lang="ts">
import { computed } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { useComputedClass, useClassProps } from "@/composables";
import getIcons from "../../utils/icons";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Icon component name */
    component: {
        type: String,
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
     * 	Color of the icon, optional
     *  @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("icon.variant"),
    },
    /** Icon name */
    icon: { type: String, default: undefined },
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("icon.size"),
    },
    /**
     * Overrides icon font size, optional
     * @values Depends on library: null (smallest), fa-sm, fa-lg, fa-xl, mdi-18px, mdi-24px, mdi-36px, mdi-48px
     */
    customSize: { type: String, default: undefined },
    /** Add class to icon font, optional. See here for MDI, here for FontAwesome 4 and here for FontAwesome 5 custom classes */
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
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "clickableClass",
        "spinClass",
        "sizeClass",
        "variantClass",
    ]),
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

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-icon"),
    {
        [useComputedClass("clickableClass", "o-icon--clickable")]:
            props.clickable,
    },
    {
        [useComputedClass("spinClass", "o-icon--spin")]: props.spin,
    },
    {
        [useComputedClass("sizeClass", "o-icon--", props.size)]: props.size,
    },
    {
        [useComputedClass("variantClass", "o-icon--", computedVariant.value)]:
            computedVariant.value,
    },
]);
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
