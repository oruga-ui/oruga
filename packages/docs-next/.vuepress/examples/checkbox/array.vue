<template>
  <section>
    <div class="block">
      <o-checkbox v-model="checkboxGroup" native-value="Silver">
        Silver
      </o-checkbox>
      <o-checkbox v-model="checkboxGroup" native-value="Flint">
        Flint
      </o-checkbox>
      <o-checkbox v-model="checkboxGroup" native-value="Vane">
        Vane
      </o-checkbox>
      <o-checkbox v-model="checkboxGroup" native-value="Billy" disabled>
        Billy
      </o-checkbox>
    </div>
    <p class="content">
      <b>Selection:</b>
      {{ checkboxGroup }}
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checkboxGroup: ['Flint'],
    };
  },
};
</script>
