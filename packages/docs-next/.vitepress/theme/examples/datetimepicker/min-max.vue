<template>
  <section>
    <o-field grouped group-multiline>
      <o-field label="Min Datetime">
        <o-datetimepicker
          rounded
          placeholder="Click to select..."
          icon="calendar"
          v-model="minDatetime"
          editable
        >
        </o-datetimepicker>
      </o-field>
      <o-field label="Max Datetime">
        <o-datetimepicker
          rounded
          placeholder="Click to select..."
          icon="calendar"
          v-model="maxDatetime"
          editable
        >
        </o-datetimepicker>
      </o-field>
    </o-field>
    <o-field label="Select datetime">
      <o-datetimepicker
        rounded
        placeholder="Click to select..."
        icon="calendar"
        :minDatetime="minDatetime"
        :maxDatetime="maxDatetime"
      >
      </o-datetimepicker>
    </o-field>
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const minDatetime = ref(null)
    const maxDatetime = ref(null)

    return {
      minDatetime,
      maxDatetime
    };
  },
});
</script>
