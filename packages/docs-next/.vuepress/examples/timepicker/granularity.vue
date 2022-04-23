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

<script>
export default {
  data() {
    return {
      minutesGranularity: 15,
      hoursGranularity: 2,
    };
  },
};
</script>
