<script setup lang="ts">
import { ref } from "vue";

const gallery = ref(false);

const indicators = ref(false);
const itemsToShow = ref(2);
const breakpoints = ref({
    768: {
        itemsToShow: 4,
    },
    960: {
        itemsToShow: 6,
    },
});

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

function switchGallery(value): void {
    gallery.value = value;

    if (value) document.documentElement.classList.add("o-clipped");
    else document.documentElement.classList.remove("o-clipped");
}
</script>

<template>
    <section>
        <o-carousel
            :autoplay="false"
            :overlay="gallery"
            :arrows="false"
            @click="switchGallery(true)">
            <o-carousel-item v-for="(item, i) in items" :key="i" clickable>
                <div class="image">
                    <img :src="item.image" />
                </div>
            </o-carousel-item>

            <template #indicators="{ active, switchTo }">
                <o-carousel
                    :model-value="active"
                    :indicators="indicators"
                    :items-to-show="itemsToShow"
                    :breakpoints="breakpoints"
                    @update:model-value="switchTo($event)">
                    <o-carousel-item
                        v-for="(item, i) in items"
                        :key="i"
                        clickable
                        item-class="img-indicator"
                        item-active-class="img-indicator-active">
                        <img :src="item.image" />
                    </o-carousel-item>
                </o-carousel>
            </template>

            <template #overlay>
                <o-icon
                    v-if="gallery"
                    icon="times"
                    root-class="ex-close-icon"
                    clickable
                    @click="switchGallery(false)" />
                <div style="color: #ffffff; text-align: center">
                    Hello, I'm an overlay!
                </div>
            </template>
        </o-carousel>
    </section>
</template>

<style scoped>
.image img {
    display: block;
    height: auto;
    width: 100%;
}
.img-indicator {
    filter: grayscale(100%);
}
.img-indicator-active {
    filter: grayscale(0%);
}
.ex-close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ffffff;
    z-index: 99;
}
</style>
