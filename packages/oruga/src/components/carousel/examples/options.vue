<script setup lang="ts">
import { ref } from "vue";

const currentSlide = ref<number>();

const slides = [
    {
        title: "Slide 1",
        image: "https://picsum.photos/id/1/1230/500",
    },
    {
        title: "Slide 2",
        image: "https://picsum.photos/id/2/1230/500",
    },
    {
        title: "Slide 3",
        image: "https://picsum.photos/id/3/1230/500",
    },
    {
        title: "Slide 4",
        image: "https://picsum.photos/id/4/1230/500",
    },
    {
        title: "Slide 5",
        image: "https://picsum.photos/id/5/1230/500",
    },
    {
        title: "Slide 6",
        image: "https://picsum.photos/id/6/1230/500",
    },
    {
        title: "Slide 7",
        image: "https://picsum.photos/id/7/1230/500",
    },
];
</script>

<template>
    <section>
        <o-carousel v-model="currentSlide" :options="slides" />

        <p><b>Current slide index:</b> {{ currentSlide }}</p>
    </section>
</template>
