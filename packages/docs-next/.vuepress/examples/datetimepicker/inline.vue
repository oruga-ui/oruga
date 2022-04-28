<template>
  <o-datetimepicker v-model="datetime" inline></o-datetimepicker>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const datetime = ref(new Date());

    return {
      datetime,
    };
  },
});
</script>
