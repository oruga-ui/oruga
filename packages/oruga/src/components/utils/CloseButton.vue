<script setup lang="ts">
import type { PropType } from "vue";
import type { ClassBinding } from "@/types";

import OIcon from "@/components/icon/Icon.vue";

defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  size: { type: String, default: undefined },
  pack: { type: String, default: undefined },
  classes: { type: Array as PropType<ClassBinding[]>, required: true },
});
</script>

<template>
  <button
    type="button"
    data-oruga="close"
    :class="classes"
    :aria-label="label">
    <slot>
      <o-icon
        :pack="pack"
        :icon="icon"
        :size="size" />
    </slot>
  </button>
</template>
