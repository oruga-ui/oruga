<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { CarouselClasses, CarouselItemClasses } from "../props";

const carousels = [
    { text: "Slide 1", color: "#445e00" },
    { text: "Slide 2", color: "#006724" },
    { text: "Slide 3", color: "#b60000" },
    { text: "Slide 4", color: "#f4c300" },
    { text: "Slide 5", color: "#005c98" },
];

const inspectData: InspectData<CarouselClasses & CarouselItemClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    overlayClass: {
        class: "overlayClass",
        properties: ["overlay"],
        description: "Class of the root element when overlay.",
        action: (cmp, data): void => {
            data.overlay = true;
        },
    },
    wrapperClass: {
        class: "wrapperClass",
        description: "Class of the carousel items wrapper element.",
    },
    itemsClass: {
        class: "itemsClass",
        description: "Class of slider items container.",
    },
    itemsDraggingClass: {
        class: "itemsDraggingClass",
        properties: ["dragable"],
        description: "Class of slider items container when dragging.",
    },
    iconClass: {
        class: "iconClass",
        description: "Class of icon button elements.",
    },
    iconPrevClass: {
        class: "iconPrevClass",
        description: "Class of prev icon button element.",
        action: (cmp, data): void => {
            data.modelValue = 1;
        },
    },
    iconNextClass: {
        class: "iconNextClass",
        description: "Class of next icon button element.",
    },
    iconAutoplayClass: {
        class: "iconAutoplayClass",
        description: "Class of autoplay icon button element.",
    },
    indicatorsClass: {
        class: "indicatorsClass",
        description: "Class of indicators tablist element.",
    },
    indicatorsInsideClass: {
        class: "indicatorsInsideClass",
        properties: ["indicatorInside"],
        description: "Class of indicators tablist element when inside.",
        action: (cmp, data): void => {
            data.indicatorInside = true;
        },
    },
    indicatorsInsidePositionClass: {
        class: "indicatorsInsidePositionClass",
        properties: ["indicatorInside", "indicatorPosition"],
        description:
            "Class of indicators tablist element when inside and position.",
        action: (cmp, data): void => {
            data.indicatorInside = true;
            data.indicatorPosition = "top";
        },
    },
    indicatorClass: {
        class: "indicatorClass",
        description: "Class of indicator tab element",
    },
    indicatorItemClass: {
        class: "indicatorItemClass",
        description: "Class of indicator item element.",
    },
    indicatorItemActiveClass: {
        class: "indicatorItemActiveClass",
        description: "Class of indicator item element when is active.",
    },
    indicatorItemStyleClass: {
        class: "indicatorItemStyleClass",
        properties: ["indicatorStyle"],
        description:
            "Class of indicator item element to separate different styles.",
        action: (cmp, data): void => {
            data.indicatorStyle = "lines";
        },
    },
    itemClass: {
        class: "itemClass",
        subitem: "carousel-item",
        description: "Class of carousel item.",
    },
    itemActiveClass: {
        class: "itemActiveClass",
        subitem: "carousel-item",
        description: "Class of carousel item when is active.",
    },
    itemClickableClass: {
        class: "itemClickableClass",
        subitem: "carousel-item",
        properties: ["clickable"],
        description: "Class of carousel item when is clickable.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
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
