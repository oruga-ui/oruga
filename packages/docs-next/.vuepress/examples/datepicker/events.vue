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
import { defineComponent, ref, computed } from 'vue';

const thisMonth = new Date().getMonth();


export default defineComponent({
  setup() {
    const bars = ref(false);
    const date = ref(new Date(2017, thisMonth, 1));
    const indicators = computed(() => bars ? 'bars' : 'dots'); 

    return {
      bars,
      date,
      indicators,
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
    };
  },
});
</script>
