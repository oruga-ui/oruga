<script setup lang="ts">
import { computed } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";

import type { TagProps } from "./props";
import { defineClasses } from "@/composables";

/**
 * Small tag labels to insert anywhere.
 * @displayName Tag
 * @style _tag.scss
 */
defineOptions({
    isOruga: true,
    name: "OTag",
    configField: "tag",
});

const props = withDefaults(defineProps<TagProps>(), {
    override: undefined,
    label: undefined,
    variant: () => getDefault("tag.variant"),
    size: () => getDefault("tag.size"),
    rounded: () => getDefault("tag.rounded", false),
    hoverable: () => getDefault("tag.hoverable", false),
    closable: false,
    icon: undefined,
    iconPack: () => getDefault("tag.iconPack"),
    closeIcon: () => getDefault("tag.closeIcon"),
    closeIconPack: () => getDefault("tag.closeIconPack"),
    ariaCloseLabel: () => getDefault("tag.ariaCloseLabel", "Close"),
});

const emits = defineEmits<{
    /**
     * on close icon click event
     * @param event {Event} native event
     */
    close: [event: Event];
}>();

/*
 * Emit close event when delete button is clicked
 * or delete key is pressed.
 */
function close(event: Event): void {
    emits("close", event);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-tag"],
    [
        "variantClass",
        "o-tag--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "sizeClass",
        "o-tag--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    ["roundedClass", "o-tag--rounded", null, computed(() => !!props.rounded)],
    [
        "hoverableClass",
        "o-tag--hoverable",
        null,
        computed(() => !!props.hoverable),
    ],
    ["badgeClass", "o-tag--badge", null, computed(() => !!props.badge)],
);

const iconClasses = defineClasses(["iconClass", "o-tag__icon"]);

const labelClasses = defineClasses(["labelClass", "o-tag__label"]);

const closeClasses = defineClasses(["closeClass", "o-tag_close_icon"]);
</script>

<template>
    <div data-oruga="tag" :class="rootClasses">
        <o-icon
            v-if="icon"
            :class="iconClasses"
            :pack="iconPack"
            :icon="icon"
            :size="size"
            both />

        <span :class="labelClasses">
            <!--
                @slot Override the tag label
            -->
            <slot>{{ label }}</slot>
        </span>

        <!--
            @slot Override the close icon
            @binding {close()} close - close function
        -->
        <slot name="close" :close="close">
            <o-icon
                v-if="closable"
                :class="closeClasses"
                :pack="closeIconPack"
                :icon="closeIcon"
                :size="size"
                clickable
                :aria-label="ariaCloseLabel"
                both
                @click="close" />
        </slot>
    </div>
</template>
