<template>
  <o-field label="Select a date">
    <o-datepicker
      placeholder="Click to select..."
      icon="calendar"
      :min-date="minDate"
      :max-date="maxDate"
    >
    </o-datepicker>
  </o-field>
</template>

<script>
export default {
  data() {
    const today = new Date();

    return {
      date: new Date(),
      minDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7,
      ),
      maxDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7,
      ),
    };
  },
};
</script>
