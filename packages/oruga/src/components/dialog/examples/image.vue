<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Image Dialog"
            size="medium"
            variant="primary"
            @click="isActive = true" />

        <o-dialog
            v-model:active="isActive"
            aria-label="Oruga logo"
            image-alt="Oruga Logo"
            image-src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
    </section>
</template>
