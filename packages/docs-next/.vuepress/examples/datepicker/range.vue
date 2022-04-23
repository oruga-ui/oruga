<template>
  <o-field label="Select a date">
    <o-datepicker
      placeholder="Click to select..."
      icon="calendar"
      v-model="dates"
      range
    >
    </o-datepicker>
  </o-field>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
    };
  },
};
</script>
