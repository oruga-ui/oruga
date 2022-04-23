<template>
  <section>
    <o-field>
      <o-datepicker ref="datepicker" expanded placeholder="Select a date">
      </o-datepicker>
      <o-button
        @click="$refs.datepicker.toggle()"
        icon-left="calendar"
        type="primary"
      />
    </o-field>
  </section>
</template>

<script>
export default {};
</script>
