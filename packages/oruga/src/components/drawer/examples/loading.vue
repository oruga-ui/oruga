<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
const loading = ref(false);

/** simulate an async request, which closes the drawer when it is finished */
function save(): void {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        isActive.value = false;
    }, 2000);
}
</script>

<template>
    <section>
        <o-button
            label="Open Drawer"
            variant="primary"
            aria-haspopup="dialog"
            @click="isActive = true" />

        <o-drawer
            v-model:active="isActive"
            backdrop
            title="Save changes"
            content="Your changes will be saved to the server."
            confirm-button="Save"
            confirm-variant="primary"
            cancel-button="Cancel"
            :loading="loading"
            loading-label="Saving..."
            :disable-cancel="loading"
            :close-on-escape="!loading"
            :close-on-backdrop="!loading"
            @confirm="save" />
    </section>
</template>
