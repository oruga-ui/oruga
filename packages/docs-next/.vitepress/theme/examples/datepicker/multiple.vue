<template>
  <o-field label="Select a date">
    <o-datepicker
      v-model="dates"
      multiple
      placeholder="Click to select..."
    >
    </o-datepicker>
  </o-field>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const dates = ref([]);

    return {
      dates,
    };
  },
});
</script>
