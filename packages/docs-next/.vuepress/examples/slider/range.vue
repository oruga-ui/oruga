<template>
  <section>
    <o-field>
      <o-slider v-model="numbers" :min="1" :max="15" :step="0.5" ticks>
      </o-slider>
    </o-field>

    <o-field>
      <o-slider
        v-model="numbers2"
        variant="danger"
        :min="-2"
        :max="8"
        :step="2"
      >
      </o-slider>
    </o-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      numbers: [2, 5],
      numbers2: [2, 6],
    };
  },
};
</script>
