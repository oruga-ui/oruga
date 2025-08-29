<script setup lang="ts">
import type { PropType } from "vue";
import type { ClassBind } from "@/types";

import OIcon from "@/components/icon/Icon.vue";

defineProps({
    label: { type: String, required: true },
    icon: { type: String, required: true },
    size: { type: String, default: undefined },
    pack: { type: String, default: undefined },
    classes: { type: Array as PropType<ClassBind[]>, required: true },
});
</script>

<template>
    <button
        type="button"
        :class="classes"
        :aria-label="label"
        data-oruga="close">
        <o-icon :pack="pack" :icon="icon" :size="size" />
    </button>
</template>
