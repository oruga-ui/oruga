<template>
  <o-field label="Select a date">
    <o-datepicker placeholder="Click to select..." v-model="dates" multiple>
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
