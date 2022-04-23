<template>
  <o-datetimepicker v-model="datetime" inline></o-datetimepicker>
</template>

<script>
export default {
  data() {
    return {
      datetime: new Date(),
    };
  },
};
</script>
