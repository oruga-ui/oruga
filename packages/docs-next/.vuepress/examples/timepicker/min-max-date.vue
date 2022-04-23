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

<script>
export default {
  data() {
    const min = new Date();
    min.setHours(9);
    min.setMinutes(0);
    const max = new Date();
    max.setHours(18);
    max.setMinutes(0);
    return {
      minTime: min,
      maxTime: max,
    };
  },
};
</script>
