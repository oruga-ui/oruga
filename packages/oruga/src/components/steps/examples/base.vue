<script setup lang="ts">
import { ref } from "vue";

const selected = ref<string>("1");
</script>

<template>
  <section>
    <o-steps
      v-model="selected"
      rounded>
      <o-step-item
        value="1"
        step="1"
        label="Account">
        <h1 :style="{ 'text-align': 'center' }">
          Account
        </h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item
        value="2"
        step="2"
        label="Profile">
        <h1 :style="{ 'text-align': 'center' }">
          Profile
        </h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item
        value="3"
        step="3"
        label="Social"
        disabled>
        <h1 :style="{ 'text-align': 'center' }">
          Social
        </h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>

      <o-step-item
        value="4"
        step="4"
        label="Finish">
        <h1 :style="{ 'text-align': 'center' }">
          Finish
        </h1>
        Lorem ipsum dolor sit amet.
      </o-step-item>
    </o-steps>

    <p><b>Selected:</b> {{ selected }}</p>
  </section>
</template>
