<template>
  <section>
    <o-field label="Select a date" grouped>
      <o-datepicker #trigger>
        <o-button icon-left="calendar" type="primary" />
      </o-datepicker>
      <o-input readonly :value="selectedString" />
    </o-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    selectedString() {
      return this.selected ? this.selected.toDateString() : '';
    },
  },
};
</script>
