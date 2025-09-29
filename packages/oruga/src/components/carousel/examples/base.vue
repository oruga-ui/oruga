<script setup lang="ts">
const slides = [
    { title: "Slide 1", color: "#445e00" },
    { title: "Slide 2", color: "#006724" },
    { title: "Slide 3", color: "#b60000" },
    { title: "Slide 4", color: "#f4c300" },
    { title: "Slide 5", color: "#005c98" },
];
</script>

<template>
    <section>
        <o-carousel indicator-inside>
            <o-carousel-item v-for="slide in slides" :key="slide.title">
                <article
                    :style="{
                        'background-color': slide.color,
                        padding: '9rem 4.5rem',
                        color: '#ffffff',
                        'text-align': 'center',
                    }">
                    <h1>{{ slide.title }}</h1>
                </article>
            </o-carousel-item>
        </o-carousel>
    </section>
</template>
