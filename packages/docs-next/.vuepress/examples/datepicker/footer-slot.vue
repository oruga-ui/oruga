<template>
  <o-field label="Select a date">
    <o-datepicker
      v-model="date"
      :first-day-of-week="1"
      placeholder="Click to select..."
    >
      <o-button variant="primary" @click="date = new Date()">
        <o-icon icon="calendar"></o-icon>
        <span>Today</span>
      </o-button>

      <o-button variant="danger" @click="date = null">
        <o-icon icon="times"></o-icon>
        <span>Clear</span>
      </o-button>
    </o-datepicker>
  </o-field>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const date = ref(new Date());

    return {
      date,
    };
  },
});
</script>
