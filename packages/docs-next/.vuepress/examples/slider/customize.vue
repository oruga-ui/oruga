<template>
  <section>
    <o-field label="Tooltip type">
      <o-slider v-model="sliderValue" :tooltip-variant="sliderType"></o-slider>
    </o-field>

    <o-field label="Hide tooltip">
      <o-slider :tooltip="false"></o-slider>
    </o-field>

    <o-field label="Custom tooltip label">
      <o-slider :custom-formatter="(val) => val + '%'"></o-slider>
    </o-field>

    <o-field label="Rounded thumb">
      <o-slider rounded></o-slider>
    </o-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      sliderValue: 0,
    };
  },
  computed: {
    sliderType() {
      if (this.sliderValue > 25 && this.sliderValue < 75) {
        return 'warning';
      } else if (this.sliderValue >= 75) {
        return 'success';
      }
      return 'danger';
    },
  },
};
</script>
