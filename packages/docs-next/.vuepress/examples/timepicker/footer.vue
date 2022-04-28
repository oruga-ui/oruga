<template>
  <o-field label="Select time">
    <o-timepicker v-model="time" placeholder="Click to select...">
      <o-button
        label="Now"
        variant="primary"
        icon-left="clock"
        @click="time = new Date()"
      />
      <o-button
        label="Clear"
        variant="danger"
        icon-left="times"
        outlined
        @click="time = null"
      />
    </o-timepicker>
  </o-field>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const time = ref(new Date())
        return { time }
    }
})
</script>
