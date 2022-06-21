<template>
  <o-field label="Select timepicker">
    <o-timepicker
      placeholder="Click to select"
      icon="clock"
      :incrementMinutes="minutesGranularity"
      :incrementHours="hoursGranularity"
    >
    </o-timepicker>
  </o-field>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const minutesGranularity = ref(5)
        const hoursGranularity = ref(2)
        return { minutesGranularity, hoursGranularity }
    }
})
</script>
