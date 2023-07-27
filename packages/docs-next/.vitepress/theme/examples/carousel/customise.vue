<script setup>
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
    hasDrag: false,
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
                <o-switch v-model="settings.autoplay">Autoplay</o-switch>
            </o-field>
            <o-field>
                <o-switch
                    v-model="settings.pauseHover"
                    :disabled="!settings.autoplay">
                    Pause on hover
                </o-switch>
            </o-field>
            <o-field>
                <o-switch v-model="settings.hasDrag">Drag event</o-switch>
            </o-field>
            <o-field>
                <o-switch
                    v-model="settings.repeat"
                    :disabled="!settings.autoplay">
                    Repeat
                </o-switch>
            </o-field>
        </o-field>
        <o-field grouped>
            <o-field label="Value">
                <o-input
                    v-model.number="carousel"
                    type="number"
                    min="0"
                    :max="carousels.length - 1" />
            </o-field>
            <o-field label="Interval">
                <o-input
                    v-model.number="settings.interval"
                    type="number"
                    min="0"
                    step="1000"
                    :disabled="!settings.autoplay" />
            </o-field>
        </o-field>

        <o-carousel v-model="carousel" v-bind="settings">
            <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section
                    class="ex-slide"
                    :style="{ 'background-color': carousel.color }">
                    <h1>{{ carousel.title }}</h1>
                    <o-input :placeholder="carousel.title"></o-input>
                    <p>A link that <a href="#arrow">goes to arrow</a></p>
                </section>
            </o-carousel-item>
        </o-carousel>
    </section>
</template>
