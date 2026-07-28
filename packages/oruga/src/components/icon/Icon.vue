<script setup lang="ts">
import { computed } from "vue";

import { getDefault } from "@/utils/config";
import getIcons, { type IconConfig } from "@/utils/icons";
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
    ariaLabel: undefined,
});

const emits = defineEmits<{
    /**
     * on item click event
     * @param event {event} - native event
     */
    click: [event: Event];
}>();

const rootStyle = computed(() => {
    const style = {};
    if (props.rotation) style["transform"] = `rotate(${props.rotation}deg)`;
    return style;
});

/** get the compiled icon packs */
const icons = getIcons();

/** icon configuration defined by the corresponding icon pack */
const iconConfig = computed<IconConfig | undefined>(() => icons[props.pack]);

/** icon size defined by the icon configuration or custom */
const iconSize = computed(() => {
    if (props.customSize) return props.customSize;

    if (iconConfig.value?.sizes) {
        if (props.size && iconConfig.value.sizes[props.size] !== undefined)
            return iconConfig.value.sizes[props.size];
        else if (iconConfig.value.sizes.default)
            return iconConfig.value.sizes.default;
    }
    return undefined;
});

/**
 * Internal icon name based on the pack.
 * If pack is 'fa', gets the equivalent FA icon name of the MDI,
 * internal icons are always MDI.
 */
const computedIcon = computed(() => {
    // the icon prefix defined by the icon configuration
    const _iconPrefix = iconConfig.value?.iconPrefix ?? "";

    // the icon name or its equivalent for fantawesome pack
    const _iconName = getEquivalentIconOf(props.icon ?? "");

    const _icon = _iconPrefix + _iconName;
    // replace placeholder in the icon name
    if (_icon.includes("{pack}")) _icon.replace("{pack}", props.pack);
    return _icon;
});

/** Equivalent icon name of the MDI. */
function getEquivalentIconOf(value: string): string {
    // only transform the class if
    if (
        // the pack is part of fontawesome icons
        props.pack.toLocaleLowerCase().startsWith("fa") &&
        // and an internal icon quivalent is available
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

// #region --- Computed Component Classes ---

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

// #endregion --- Computed Component Classes ---
</script>

<template>
    <span
        data-oruga="icon"
        :class="rootClasses"
        :style="rootStyle"
        :tabindex="clickable ? 0 : undefined"
        :role="clickable ? 'button' : undefined"
        :aria-label="ariaLabel"
        @click="onClick"
        @keydown.enter="onClick"
        @keydown.space="onClick">
        <!-- custom icon component -->
        <component
            :is="component"
            v-if="component"
            :pack="pack"
            :icon="computedIcon"
            :size="iconSize"
            :class="customClass" />

        <!-- native css icon -->
        <i v-else :class="[pack, computedIcon, iconSize, customClass]" />
    </span>
</template>
