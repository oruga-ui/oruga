<script setup lang="ts">
import { ref } from "vue";

const carousel = ref(1);

const arrows = ref(true);
const arrowsHover = ref(true);
const dragable = ref(true);
const itemsToShow = ref(4);
const itemsToList = ref(1);
const repeat = ref(false);

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
                <o-switch v-model="arrows" label="Arrow" />
            </o-field>
            <o-field>
                <o-switch
                    v-model="arrowsHover"
                    :disabled="!arrows"
                    label="Arrow on hover" />
            </o-field>
            <o-field>
                <o-switch v-model="dragable" label="Drag event" />
            </o-field>
            <o-field>
                <o-switch v-model="repeat" label="Repeat" />
            </o-field>
        </o-field>
        <o-field grouped>
            <o-field label="Items to Show">
                <o-input
                    v-model="itemsToShow"
                    type="number"
                    number
                    min="1"
                    :max="items.length" />
            </o-field>
            <o-field label="Items to List">
                <o-input
                    v-model="itemsToList"
                    type="number"
                    number
                    min="1"
                    :max="items.length - 1" />
            </o-field>
        </o-field>

        <o-carousel
            :key="itemsToList + itemsToShow"
            v-model="carousel"
            :arrows="arrows"
            :arrows-hover="arrowsHover"
            :dragable="dragable"
            :items-to-show="itemsToShow"
            :items-to-list="itemsToList"
            :repeat="repeat">
            <o-carousel-item v-for="(item, i) in items" :key="i">
                <img :src="item.image" />
            </o-carousel-item>
        </o-carousel>
    </section>
</template>
