<template>
  <o-field label="Select time">
    <o-timepicker
      placeholder="Click to select..."
      :min-time="minTime"
      :max-time="maxTime"
    >
    </o-timepicker>
  </o-field>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const min = new Date();
        min.setHours(9);
        min.setMinutes(0);
        const max = new Date();
        max.setHours(18);
        max.setMinutes(0);

        const minTime = ref(min)
        const maxTime = ref(max)
        return { minTime, maxTime }
    }
})
</script>
