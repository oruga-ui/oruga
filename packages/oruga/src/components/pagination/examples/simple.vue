<script setup lang="ts">
import { ref } from "vue";

const current = ref(10);
</script>

<template>
  <section>
    <o-pagination
      v-model:current="current"
      :total="100"
      :per-page="10"
      simple />

    <p><b>Current:</b> {{ current }}</p>
  </section>
</template>
