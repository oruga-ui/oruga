<template>
  <section>
    <div class="block">
      <o-radio v-model="radio" name="name" native-value="Flint">
        Flint
      </o-radio>
      <o-radio v-model="radio" name="name" native-value="Silver">
        Silver
      </o-radio>
      <o-radio v-model="radio" name="name" native-value="Jack"> Jack </o-radio>
      <o-radio v-model="radio" name="name" native-value="Vane" disabled>
        Vane
      </o-radio>
    </div>
    <p class="content">
      <b>Selection:</b>
      {{ radio }}
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      radio: 'Jack',
    };
  },
};
</script>
