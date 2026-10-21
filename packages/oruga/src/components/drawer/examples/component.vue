<script setup lang="ts">
import { ref } from "vue";
import Form from "./_drawer-form.vue";

const isDrawerActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Drawer"
            size="medium"
            variant="primary"
            @click="isDrawerActive = true" />

        <o-drawer
            v-model:active="isDrawerActive"
            aria-label="Login"
            :component="Form"
            :backdrop="true" />
    </section>
</template>
