<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Drawer"
            variant="primary"
            @click="isActive = true" />

        <o-drawer
            v-model:active="isActive"
            backdrop
            closeable
            close-on-confirm
            title="Notifications"
            subtitle="You have 3 unread messages"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales leo nec convallis rutrum."
            cancel-button="Dismiss"
            confirm-button="Mark all as read"
            confirm-variant="primary"
            button-position="right" />
    </section>
</template>
