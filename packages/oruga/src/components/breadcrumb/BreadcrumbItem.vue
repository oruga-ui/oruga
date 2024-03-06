<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    active: {
        type: String,
        default: () => getOption("button.variant"),
    },
    tag: {
        type: String,
        default: () => getOption("button.variant"),
    },
    disabled: {
        type: String,
        default: () => getOption("button.variant"),
    },
});
// const computedTag = computed(()=>{});
</script>

<template>
    <div></div>
    <!-- <component v:bind="d"></component> -->
</template>
