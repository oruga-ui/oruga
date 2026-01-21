<script setup lang="ts">
import { computed } from "vue";

import OIcon from "../icon/Icon.vue";
import CloseButton from "../utils/CloseButton.vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { TagProps } from "./props";

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
  closeIconSize: () => getDefault("tag.closeIconSize"),
  ariaCloseLabel: () => getDefault("tag.ariaCloseLabel", "Close"),
});

const emits = defineEmits<{
  /**
   * on close icon click event
   * @param event {Event} - native event
   */
  close: [event: Event];
}>();

defineSlots<{
  /** Override the tag label */
  default?(): void;
  /** Define a custom close icon */
  close?(): void;
}>();
/*
 * Emit close event when delete button is clicked
 * or delete key is pressed.
 */
function onClose(event: Event): void {
  emits("close", event);
}

// #region --- Computed Component Classes ---

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

// #endregion --- Computed Component Classes ---
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
      <slot>{{ label }}</slot>
    </span>

    <CloseButton
      v-if="closeable"
      :pack="iconPack"
      :icon="closeIcon"
      :size="closeIconSize"
      :label="ariaCloseLabel"
      :classes="closeClasses"
      @click="onClose">
      <slot v-if="$slots['close']" name="close" />
    </CloseButton>
  </span>
</template>
