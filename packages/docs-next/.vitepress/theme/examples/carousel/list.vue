<script setup>
import { reactive, ref } from "vue";

const carousel = ref(1);

const settings = reactive({
    arrow: true,
    arrowHover: true,
    hasDrag: true,
    itemsToShow: 4,
    itemsToList: 1,
    repeat: false,
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
</script>

<template>
    <section>
        <div class="example-component">
            <o-field grouped group-multiline>
                <o-field>
                    <o-switch v-model="settings.arrow">Arrow</o-switch>
                </o-field>
                <o-field>
                    <o-switch
                        v-model="settings.arrowHover"
                        :disabled="!settings.arrow">
                        Arrow on hover
                    </o-switch>
                </o-field>
                <o-field>
                    <o-switch v-model="settings.hasDrag">Drag event</o-switch>
                </o-field>
                <o-field>
                    <o-switch v-model="settings.repeat">Repeat</o-switch>
                </o-field>
            </o-field>
            <o-field grouped>
                <o-field label="Items to Show">
                    <o-input
                        v-model.number="settings.itemsToShow"
                        type="number"
                        min="1"
                        :max="items.length" />
                </o-field>
                <o-field label="Items to List">
                    <o-input
                        v-model.number="settings.itemsToList"
                        type="number"
                        min="1"
                        :max="items.length - 1" />
                </o-field>
            </o-field>
        </div>
        <o-carousel v-model="carousel" v-bind="settings">
            <o-carousel-item v-for="(item, i) in items" :key="i">
                <img :src="item.image" />
            </o-carousel-item>
        </o-carousel>
    </section>
</template>
