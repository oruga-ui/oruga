<script setup lang="ts">
import { ref } from "vue";

const currentSlide = ref(1);

const indicators = ref(true);
const indicatorInside = ref(true);
const indicatorPosition = ref<string>("top");
const indicatorStyle = ref<string>("dots");

const slides = [
  {
    title: "Slide 1",
    value: 1,
    image: "https://picsum.photos/id/1/1230/500",
  },
  {
    title: "Slide 2",
    value: 2,
    image: "https://picsum.photos/id/2/1230/500",
  },
  {
    title: "Slide 3",
    value: 3,
    image: "https://picsum.photos/id/3/1230/500",
  },
  {
    title: "Slide 4",
    value: 4,
    image: "https://picsum.photos/id/4/1230/500",
  },
  {
    title: "Slide 5",
    value: 5,
    image: "https://picsum.photos/id/5/1230/500",
  },
  {
    title: "Slide 6",
    value: 6,
    image: "https://picsum.photos/id/6/1230/500",
  },
  {
    title: "Slide 7",
    value: 7,
    image: "https://picsum.photos/id/7/1230/500",
  },
];
</script>

<template>
  <section>
    <o-field grouped>
      <o-field>
        <o-switch
          v-model="indicators"
          label="Show indicators" />
      </o-field>
      <o-field>
        <o-switch
          v-model="indicatorInside"
          label="Show indicators inside" />
      </o-field>
      <o-field label="Select indicators position">
        <o-select v-model="indicatorPosition">
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </o-select>
      </o-field>
      <o-field label="Select indicators style">
        <o-select v-model="indicatorStyle">
          <option value="dots">Dots</option>
          <option value="lines">Lines</option>
        </o-select>
      </o-field>
    </o-field>

    <o-carousel
      v-model="currentSlide"
      :indicators="indicators"
      :indicator-inside="indicatorInside"
      :indicator-position="indicatorPosition"
      :indicator-style="indicatorStyle">
      <o-carousel-item
        v-for="slide in slides"
        :key="slide.title"
        :value="slide.value"
        :image="slide.image"
        :image-alt="slide.title" />
    </o-carousel>

    <p><b>Current slide index:</b> {{ currentSlide }}</p>
  </section>
</template>
