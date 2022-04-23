<template>
  <section>
    <o-field label="Select a date" grouped>
      <o-datepicker v-model="selected" :mobile-native="false">
        <template v-slot:trigger>
          <o-button icon-left="calendar" type="primary" />
        </template>
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
