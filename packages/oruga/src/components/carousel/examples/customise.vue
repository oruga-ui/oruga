<script setup lang="ts">
import { ref, reactive } from "vue";

const carousels = [
    { text: "Slide 1", color: "#445e00" },
    { text: "Slide 2", color: "#006724" },
    { text: "Slide 3", color: "#b60000" },
    { text: "Slide 4", color: "#f4c300" },
    { text: "Slide 5", color: "#005c98" },
];

const carousel = ref(0);

const settings = reactive({
    dragable: false,
    autoplay: false,
    pauseHover: false,
    interval: 3000,
    repeat: false,
});
</script>

<template>
    <section>
        <o-field grouped>
            <o-field>
                <o-switch v-model="settings.autoplay" label="Autoplay" />
            </o-field>
            <o-field>
                <o-switch
                    v-model="settings.pauseHover"
                    :disabled="!settings.autoplay"
                    label="Pause on hover" />
            </o-field>
            <o-field>
                <o-switch v-model="settings.dragable" label="Drag event" />
            </o-field>
            <o-field>
                <o-switch
                    v-model="settings.repeat"
                    :disabled="!settings.autoplay"
                    label="Repeat" />
            </o-field>
        </o-field>
        <o-field grouped>
            <o-field label="Value">
                <o-input
                    v-model="carousel"
                    type="number"
                    min="0"
                    :max="carousels.length - 1" />
            </o-field>
            <o-field label="Interval">
                <o-input
                    v-model="settings.interval"
                    type="number"
                    min="0"
                    step="1000"
                    :disabled="!settings.autoplay" />
            </o-field>
        </o-field>

        <o-carousel v-model="carousel" v-bind="settings">
            <o-carousel-item v-for="(slide, i) in carousels" :key="i">
                <section
                    class="ex-slide"
                    :style="{ 'background-color': slide.color }">
                    <h1>{{ slide.text }}</h1>
                    <o-input :placeholder="slide.text" />
                    <p>A link that <a href="#arrow">goes to arrow</a></p>
                </section>
            </o-carousel-item>
        </o-carousel>
    </section>
</template>
