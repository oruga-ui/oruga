<template>
  <o-timepicker v-model="time" inline></o-timepicker>
</template>

<script>
export default {
  data() {
    return {
      time: new Date(),
    };
  },
};
</script>
