<script setup lang="ts">
import { ref } from "vue";

const carousels = [
    { text: "Slide 1", color: "#445e00" },
    { text: "Slide 2", color: "#006724" },
    { text: "Slide 3", color: "#b60000" },
    { text: "Slide 4", color: "#f4c300" },
    { text: "Slide 5", color: "#005c98" },
];

const carousel = ref(0);

const dragable = ref(false);
const autoplay = ref(false);
const pauseHover = ref(false);
const interval = ref(3000);
const repeat = ref(false);
</script>

<template>
    <section>
        <o-field grouped>
            <o-field>
                <o-switch v-model="autoplay" label="Autoplay" />
            </o-field>
            <o-field>
                <o-switch
                    v-model="pauseHover"
                    :disabled="!autoplay"
                    label="Pause on hover" />
            </o-field>
            <o-field>
                <o-switch v-model="dragable" label="Drag event" />
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
                    v-model="carousel"
                    type="number"
                    number
                    min="0"
                    :max="carousels.length - 1" />
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
            v-model="carousel"
            :dragable="dragable"
            :autoplay="autoplay"
            :pause-hover="pauseHover"
            :interval="interval"
            :repeat="repeat"
            :arrows-hover="false">
            <o-carousel-item v-for="(slide, i) in carousels" :key="i">
                <section
                    class="example-slide"
                    :style="{ 'background-color': slide.color }">
                    <h1>{{ slide.text }}</h1>
                    <o-input :placeholder="slide.text" />
                    <p>A link that <a href="#arrow">goes to arrow</a></p>
                </section>
            </o-carousel-item>
        </o-carousel>
    </section>
</template>

<style>
.example-slide {
    padding: 9rem 4.5rem;
    color: #ffffff;
    text-align: center;
}
</style>
