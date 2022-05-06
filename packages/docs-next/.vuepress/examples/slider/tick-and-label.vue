<template>
  <section>
    <o-field label="Show ticks">
      <o-slider :min="1" :max="10" ticks></o-slider>
    </o-field>

    <o-field label="Custom tick and label">
      <o-slider size="medium" :min="0" :max="10">
        <template v-for="val in [3, 5, 8]" :key="val">
          <o-slider-tick :value="val">{{ val }}</o-slider-tick>
        </template>
      </o-slider>
    </o-field>

    <o-field label="Fan">
      <o-slider :min="0" :max="3" aria-label="Fan" :tooltip="false">
        <o-slider-tick :value="0">Off</o-slider-tick>
        <o-slider-tick :value="1">Low</o-slider-tick>
        <o-slider-tick :value="2">High</o-slider-tick>
        <o-slider-tick :value="3">Auto</o-slider-tick>
      </o-slider>
    </o-field>
  </section>
</template>
