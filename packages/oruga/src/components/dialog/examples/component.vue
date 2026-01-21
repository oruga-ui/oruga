<script setup lang="ts">
import { h, ref } from "vue";

const isActive = ref(false);

const myComponent = h("div", [
  "Some quick example text to build on the dialog title and make up the bulk of the dialog's content.",
]);
</script>

<template>
  <section class="odocs-spaced">
    <o-button
      label="Open component modal"
      size="medium"
      variant="primary"
      @click="isActive = true" />

    <o-dialog
      v-model:active="isActive"
      title="Advanced Dialog"
      image-alt="Oruga Logo"
      image-src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
      :component="myComponent"
      cancel-button="Finish" />
  </section>
</template>
