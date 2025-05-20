<script setup lang="ts">
import { computed } from "vue";

import { getDefault, getOption } from "@/utils/config";
import getIcons from "@/utils/icons";
import { defineClasses } from "@/composables";

import type { IconProps } from "./props";

/**
 * Icons take an important role of any application.
 * @displayName Icon
 * @style _icon.scss
 */
defineOptions({
    isOruga: true,
    name: "OIcon",
    configField: "icon",
});

const props = withDefaults(defineProps<IconProps>(), {
    override: undefined,
    icon: undefined,
    component: () => getDefault("iconComponent"),
    pack: () => getDefault("iconPack", "mdi"),
    variant: () => getDefault("icon.variant"),
    size: () => getDefault("icon.size"),
    customSize: undefined,
    customClass: undefined,
    clickable: false,
    spin: false,
    rotation: undefined,
});

const environment = getOption("environment");

const rootStyle = computed(() => {
    const style = {};
    if (props.rotation) style["transform"] = `rotate(${props.rotation}deg)`;
    return style;
});

const icons = getIcons();

const iconConfig = computed(() => icons[props.pack]);

const iconPrefix = computed(() => iconConfig.value?.iconPrefix ?? "");

const customSizeByPack = computed(() => {
    if (iconConfig.value?.sizes) {
        if (props.size && iconConfig.value.sizes[props.size] !== undefined)
            return iconConfig.value.sizes[props.size];
        else if (iconConfig.value.sizes.default)
            return iconConfig.value.sizes.default;
    }
    return null;
});

const computedSize = computed(() => props.customSize || customSizeByPack.value);

/**
 * Internal icon name based on the pack.
 * If pack is 'fa', gets the equivalent FA icon name of the MDI,
 * internal icons are always MDI.
 */
const computedIcon = computed(
    () => `${iconPrefix.value}${getEquivalentIconOf(props.icon ?? "")}`,
);

/** Equivalent icon name of the MDI. */
function getEquivalentIconOf(value: string): string {
    // Only transform the class if the env is docs prop is set to true
    if (environment != "docs") return value;
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
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);
</script>

<template>
    <span data-oruga="icon" :class="rootClasses" :style="rootStyle">
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
