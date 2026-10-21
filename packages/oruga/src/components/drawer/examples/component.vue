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
            aria-haspopup="dialog"
            @click="isDrawerActive = true" />

        <o-drawer
            v-model:active="isDrawerActive"
            title="Login"
            closeable
            backdrop
            :component="Form" />
    </section>
</template>
