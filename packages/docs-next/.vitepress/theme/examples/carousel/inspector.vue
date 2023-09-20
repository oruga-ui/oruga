<script setup>
const carousels = [
    { text: "Slide 1", color: "#445e00" },
    { text: "Slide 2", color: "#006724" },
    { text: "Slide 3", color: "#b60000" },
    { text: "Slide 4", color: "#f4c300" },
    { text: "Slide 5", color: "#005c98" },
];

const subitem = "carousel-item";

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "overlayClass",
        properties: ["overlay"],
        description: "Class of the root element in overlay",
        action: (cmp, data) => {
            data.overlay = true;
        },
    },
    {
        class: "sceneClass",
        description: "Class of the wrapper element of carousel items",
    },
    {
        class: "itemsClass",
        description: "Class of slider element",
    },
    {
        class: "itemsDraggingClass",
        description: "Class of slider element on drag",
    },
    {
        class: "arrowIconClass",
        description: "Class of arrow elements",
    },
    {
        class: "arrowIconPrevClass",
        description: "Class of prev arrow element",
    },
    {
        class: "arrowIconNextClass",
        description: "Class of next arrow element",
    },
    {
        class: "indicatorsClass",
        description: "Class of indicators element",
    },
    {
        class: "indicatorsInsideClass",
        properties: ["indicatorInside"],
        description: "Class of indicators element when inside",
        action: (cmp, data) => {
            data.indicatorInside = true;
        },
    },
    {
        class: "indicatorsInsidePositionClass",
        properties: ["indicatorInside", "indicatorPosition"],
        description: "Class of indicators element when inside and position",
        action: (cmp, data) => {
            data.indicatorInside = true;
            data.indicatorPosition = "top";
        },
    },
    {
        class: "indicatorItemClass",
        description: "Class of indicator item element",
    },
    {
        class: "indicatorItemActiveClass",
        description: "Class of indicator element when is active",
    },
    {
        class: "indicatorItemStyleClass",
        properties: ["indicatorStyle"],
        description: "Class of indicator element to separate different styles",
        action: (cmp, data) => {
            data.indicatorStyle = "lines";
        },
    },
    {
        class: "itemClass",
        description: "Class of carousel item",
    },
    {
        class: "itemActiveClass",
        description: "Class of carousel item when is active",
    },
];
</script>

<template>
    <inspector-wrapper
        v-slot="props"
        :inspect-data="inspectData"
        :subitem="subitem">
        <o-carousel v-bind="props">
            <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section
                    class="ex-slide"
                    :style="{ 'background-color': carousel.color }">
                    <h1>{{ carousel.text }}</h1>
                </section>
            </o-carousel-item>
        </o-carousel>
    </inspector-wrapper>
</template>
