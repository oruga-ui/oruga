<script setup lang="ts">
import { ref } from "vue";

const currentSlide = ref(0);

const dragable = ref(false);
const autoplay = ref(false);
const pauseHover = ref(false);
const interval = ref(3000);
const repeat = ref(false);

const slides = [
  { text: "Slide 1", color: "#445e00" },
  { text: "Slide 2", color: "#006724" },
  { text: "Slide 3", color: "#b60000" },
  { text: "Slide 4", color: "#f4c300" },
  { text: "Slide 5", color: "#005c98" },
];
</script>

<template>
  <section>
    <o-field grouped>
      <o-field>
        <o-switch
          v-model="autoplay"
          label="Autoplay" />
      </o-field>
      <o-field>
        <o-switch
          v-model="pauseHover"
          :disabled="!autoplay"
          label="Pause on hover" />
      </o-field>
      <o-field>
        <o-switch
          v-model="dragable"
          label="Drag event" />
      </o-field>
      <o-field>
        <o-switch
          v-model="repeat"
          :disabled="!autoplay"
          label="Repeat" />
      </o-field>
    </o-field>

    <o-field grouped>
      <o-field label="Value">
        <o-input
          v-model="currentSlide"
          type="number"
          number
          min="0"
          :max="slides.length - 1" />
      </o-field>
      <o-field label="Interval">
        <o-input
          v-model="interval"
          type="number"
          number
          min="0"
          step="1000"
          :disabled="!autoplay" />
      </o-field>
    </o-field>

    <o-carousel
      v-model="currentSlide"
      :dragable="dragable"
      :autoplay="autoplay"
      :pause-hover="pauseHover"
      :interval="interval"
      :repeat="repeat"
      :arrows-hover="false">
      <o-carousel-item
        v-for="slide in slides"
        :key="slide.text">
        <article
          :style="{
            'background-color': slide.color,
            padding: '9rem 4.5rem',
            color: '#ffffff',
            'text-align': 'center',
          }">
          <h1>{{ slide.text }}</h1>
          <o-input :placeholder="slide.text" />
          <p>A link that <a href="#arrow">goes to arrow</a></p>
        </article>
      </o-carousel-item>
    </o-carousel>
  </section>
</template>
