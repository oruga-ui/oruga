<script setup lang="ts">
import { markRaw, ref } from "vue";

const props = defineProps({
    component: {
        type: String,
        required: true,
    },
});

const cmp = ref();

import(`../../examples/${props.component}/inspector.vue`).then((val) => {
    cmp.value = markRaw(val.default);
});
</script>

<template>
    <component :is="cmp"></component>
</template>
