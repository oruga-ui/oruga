<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);

const title = "Dialog Title";
const subtitle = "Dialog Subtitle";
const content = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Inventore sed consequuntur error repudiandae numquam
deserunt quisquam repellat libero asperiores earum nam nobis,
culpa ratione quam perferendis esse, cupiditate neque quas!`;
</script>

<template>
    <section>
        <o-button
            label="Open Modal Dialog"
            variant="primary"
            aria-haspopup="dialog"
            @click="isActive = true" />

        <o-dialog
            v-model:active="isActive"
            backdrop
            :title="title"
            :subtitle="subtitle"
            :content="content"
            closeable />
    </section>
</template>
