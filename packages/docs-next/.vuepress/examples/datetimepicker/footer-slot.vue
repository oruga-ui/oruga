<template>
  <o-field label="Select datetime">
    <o-datetimepicker v-model="datetime" placeholder="Click to select...">
      <div class="buttons-footer">
        <o-button variant="primary" @click="datetime = new Date()">
          <o-icon icon="calendar"></o-icon>
          <span>Today</span>
        </o-button>
        <o-button variant="danger" @click="datetime = null">
          <o-icon icon="times"></o-icon>
          <span>Clear</span>
        </o-button>
      </div>
    </o-datetimepicker>
  </o-field>
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

<style>
.buttons-footer {
  margin-top: 1rem;
}
</style>
