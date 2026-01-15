<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
  <section>
    <o-button
      label="Open Alert Dialog"
      size="medium"
      variant="primary"
      :aria-expanded="isActive"
      aria-controls="alert-dialog"
      @click="isActive = true" />

    <o-dialog
      id="alert-dialog"
      v-model:active="isActive"
      alert
      title="Delete Dialog"
      content="Are you sure you want to delete this?"
      text-position="center"
      button-position="center"
      cancel-button="Cancel"
      confirm-button="Delete"
      confirm-variant="danger"
      close-on-confirm />
  </section>
</template>
