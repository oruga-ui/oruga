<script setup lang="ts">
import type { PropType } from "vue";
import type { ClassBind } from "@/types";

defineProps({
    icon: { type: String, required: true },
    size: { type: String, default: undefined },
    pack: { type: String, required: true },
    label: { type: String, required: true },
    classes: { type: Array as PropType<ClassBind[]>, required: true },
});
</script>

<template>
    <button type="button" :class="classes" :aria-label="label">
        <o-icon :pack="pack" :icon="icon" :size="size" />
    </button>
</template>
