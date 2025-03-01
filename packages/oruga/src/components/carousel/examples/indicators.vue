<script setup lang="ts">
import { ref } from "vue";

const carousel = ref(1);

const indicators = ref(true);
const indicatorInside = ref(true);
const indicatorPosition = ref<string>("top");
const indicatorStyle = ref<string>("dots");

const items = [
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
        <o-field grouped>
            <o-field>
                <o-switch v-model="indicators" label="Show indicators" />
            </o-field>
            <o-field>
                <o-switch
                    v-model="indicatorInside"
                    label="Show indicators inside" />
            </o-field>
            <o-field label="Select indicators position">
                <o-select v-model="indicatorPosition">
                    <option value="top">Top</option>
                    <option value="bottom">bottom</option>
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
            v-model="carousel"
            :indicators="indicators"
            :indicator-inside="indicatorInside"
            :indicator-position="indicatorPosition"
            :indicator-style="indicatorStyle">
            <o-carousel-item v-for="(item, i) in items" :key="i">
                <img :src="item.image" :alt="item.title" />
            </o-carousel-item>
        </o-carousel>

        <p><b>Current slide index:</b> {{ carousel }}</p>
    </section>
</template>
