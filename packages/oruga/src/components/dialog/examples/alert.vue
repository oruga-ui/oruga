<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
    <section>
        <o-button
            label="Open Alert Dialog"
            variant="primary"
            aria-haspopup="dialog"
            @click="isActive = true" />

        <o-dialog
            v-model:active="isActive"
            alert
            title="Delete Dialog"
            aria-describedby="alert-dialog-message"
            text-position="center"
            button-position="center"
            cancel-button="Cancel"
            confirm-button="Delete"
            confirm-variant="danger"
            close-on-confirm>
            <p id="alert-dialog-message">
                Are you sure you want to delete this? This action cannot be
                undone.
            </p>
        </o-dialog>
    </section>
</template>
