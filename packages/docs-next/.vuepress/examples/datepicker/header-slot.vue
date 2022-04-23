<template>
  <o-field label="Select a date">
    <o-datepicker
      :focused-date="date"
      :first-day-of-week="1"
      placeholder="Click to select..."
    >
      <template slot="header">
        <o-field>
          <o-autocomplete
            open-on-focus
            readonly
            v-model="month"
            :data="months"
            field="name"
            @select="selectMonth"
          >
          </o-autocomplete>
          <o-button disabled>{{ date.getFullYear() }}</o-button>
        </o-field>
      </template>
    </o-datepicker>
  </o-field>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      month: null,
      months: [
        { name: 'January', value: 0 },
        { name: 'February', value: 1 },
        { name: 'March', value: 2 },
        { name: 'April', value: 3 },
        { name: 'May', value: 4 },
        { name: 'June', value: 5 },
        { name: 'July', value: 6 },
        { name: 'August', value: 7 },
        { name: 'September', value: 8 },
        { name: 'October', value: 9 },
        { name: 'November', value: 10 },
        { name: 'December', value: 11 },
      ],
    };
  },
  methods: {
    selectMonth(option) {
      if (option) {
        this.date = new Date(this.date);
        this.date.setMonth(option.value);
      }
    },
  },
  mounted() {
    this.month = this.months.filter(
      (item) => item.value == this.date.getMonth(),
    )[0].name;
  },
};
</script>
