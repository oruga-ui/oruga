<template>
  <section>
    <div class="example-component">
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="settings.autoplay">Autoplay</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="settings.pauseHover" :disabled="!settings.autoplay"
            >Pause on hover</o-switch
          >
        </div>
        <div class="control">
          <o-switch v-model="settings.hasDrag">Drag event</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="settings.repeat" :disabled="!settings.autoplay">Repeat</o-switch>
        </div>
      </o-field>
      <o-field grouped group-multiline>
        <o-field label="Value">
          <o-input
            type="number"
            v-model.number="carousel"
            min="0"
            :max="carousels.length - 1"
          />
        </o-field>
        <o-field label="Interval">
          <o-input
            type="number"
            v-model.number="settings.interval"
            min="0"
            step="1000"
            :disabled="!settings.autoplay"
          />
        </o-field>
      </o-field>
    </div>

    <o-carousel
      v-model="carousel"
      v-bind="settings"
    >
      <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section
          class="ex-slide"
          :style="{ 'background-color': carousel.color }"
        >
          <h1>{{ carousel.title }}</h1>
          <o-input :placeholder="carousel.title"></o-input>
          <p>A link that <a href="#arrow">goes to arrow</a></p>
        </section>
      </o-carousel-item>
    </o-carousel>
  </section>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';

const carousels = [
  { text: "Slide 1", color: "#445e00" },
  { text: "Slide 2", color: "#006724" },
  { text: "Slide 3", color: "#b60000" },
  { text: "Slide 4", color: "#f4c300" },
  { text: "Slide 5", color: "#005c98" },
];

export default defineComponent({

  setup() {
    const carousel = ref(0);
    const settings = reactive({
      hasDrag: false,
      autoplay: false,
      pauseHover: false,
      interval: 3000,
      repeat: false,
    });

    return {
      carousel,
      settings,
      carousels,
    };
  },
});
</script>