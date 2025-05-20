<script setup lang="ts">
import { computed } from "vue";

import { getDefault } from "@/utils/config";
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
    both: false,
});

const emits = defineEmits<{
    /**
     * on item click event
     * @param event {event} native event
     */
    click: [event: Event];
}>();

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

function onClick(event: Event): void {
    if (!props.clickable) return;
    event.preventDefault();
    emits("click", event);
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
    <span
        data-oruga="icon"
        :class="rootClasses"
        :style="rootStyle"
        :tabindex="clickable ? 0 : undefined"
        :role="clickable ? 'button' : undefined"
        @click="onClick"
        @keydown.enter="onClick"
        @keydown.space="onClick">
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
