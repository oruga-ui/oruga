<template>
  <span>
    <o-field>
      <o-switch v-model="bars">Bars</o-switch>
    </o-field>
    <o-datepicker
      inline
      v-model="date"
      :events="events"
      :indicators="indicators"
    >
    </o-datepicker>
  </span>
</template>

<script>
const thisMonth = new Date().getMonth();

export default {
  computed: {
    indicators() {
      return this.bars ? 'bars' : 'dots';
    },
  },
  data() {
    return {
      date: new Date(2017, thisMonth, 1),
      events: [
        new Date(2017, thisMonth, 2),
        new Date(2017, thisMonth, 6),
        {
          date: new Date(2017, thisMonth, 6),
          type: 'info',
        },
        {
          date: new Date(2017, thisMonth, 8),
          type: 'danger',
        },
        {
          date: new Date(2017, thisMonth, 10),
          type: 'success',
        },
        {
          date: new Date(2017, thisMonth, 10),
          type: 'link',
        },
        new Date(2017, thisMonth, 12),
        {
          date: new Date(2017, thisMonth, 12),
          type: 'warning',
        },
        {
          date: new Date(2017, thisMonth, 16),
          type: 'danger',
        },
        new Date(2017, thisMonth, 20),
        {
          date: new Date(2017, thisMonth, 29),
          type: 'success',
        },
        {
          date: new Date(2017, thisMonth, 29),
          type: 'warning',
        },
        {
          date: new Date(2017, thisMonth, 29),
          type: 'info',
        },
      ],
      bars: false,
    };
  },
};
</script>
