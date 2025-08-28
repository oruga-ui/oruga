<script setup lang="ts">
import { computed } from "vue";

import OIcon from "../icon/Icon.vue";
import CloseButton from "../utils/CloseButton.vue";

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
    closeable: false,
    icon: undefined,
    iconPack: () => getDefault("tag.iconPack"),
    closeIcon: () => getDefault("tag.closeIcon", "close"),
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
function onClose(event: Event): void {
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
    ["badgeClass", "o-tag--badge", null, computed(() => !!props.badge)],
);

const iconClasses = defineClasses(["iconClass", "o-tag__icon"]);

const labelClasses = defineClasses(["labelClass", "o-tag__label"]);

const closeClasses = defineClasses(["closeClass", "o-tag__close"]);
</script>

<template>
    <span data-oruga="tag" :class="rootClasses">
        <o-icon
            v-if="icon"
            :class="iconClasses"
            :pack="iconPack"
            :icon="icon"
            :size="size" />

        <span v-if="$slots.default || label" :class="labelClasses">
            <!--
                @slot Override the tag label
            -->
            <slot>{{ label }}</slot>
        </span>

        <!--
            @slot Override the close icon
            @binding {close()} close - close function
        -->
        <slot name="close" :close="onClose">
            <CloseButton
                v-if="closeable"
                :pack="iconPack"
                :icon="closeIcon"
                :size="size"
                :label="ariaCloseLabel"
                :classes="closeClasses"
                @click="onClose" />
        </slot>
    </span>
</template>
