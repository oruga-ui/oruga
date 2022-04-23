<template>
  <o-field label="Select a month">
    <o-datepicker
      placeholder="Click to select..."
      icon="calendar"
      type="month"
      v-model="dates"
    >
    </o-datepicker>
  </o-field>
</template>

<script>
export default {
  data() {
    return {
      dates: undefined,
    };
  },
};
</script>
