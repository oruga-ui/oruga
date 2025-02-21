<script setup lang="ts">
import type { InspectData } from "@/docs";
import type {
    CarouselClasses,
    CarouselItemClasses,
    CarouselProps,
    CarouselItemProps,
} from "../props";

const carousels = [
    { text: "Slide 1", color: "#445e00" },
    { text: "Slide 2", color: "#006724" },
    { text: "Slide 3", color: "#b60000" },
    { text: "Slide 4", color: "#f4c300" },
    { text: "Slide 5", color: "#005c98" },
];

const inspectData: InspectData<
    CarouselClasses & CarouselItemClasses,
    CarouselProps & CarouselItemProps
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    overlayClass: {
        class: "overlayClass",
        description: "Class of the root element when overlay.",
        properties: ["overlay"],
        action: (cmp, data): void => {
            data.overlay = true;
        },
    },
    wrapperClass: {
        class: "wrapperClass",
        description: "Class of the inner wrapper element.",
    },
    itemsClass: {
        class: "itemsClass",
        description: "Class of items container element.",
    },
    itemsDraggingClass: {
        class: "itemsDraggingClass",
        description: "Class of items container element when dragging.",
        properties: ["dragable"],
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
        description: "Class of indicators tablist element when inside.",
        properties: ["indicatorInside"],
        action: (cmp, data): void => {
            data.indicatorInside = true;
        },
    },
    indicatorsInsidePositionClass: {
        class: "indicatorsInsidePositionClass",
        description:
            "Class of indicators tablist element when inside and position.",
        properties: ["indicatorInside", "indicatorPosition"],
        action: (cmp, data): void => {
            data.indicatorInside = true;
            data.indicatorPosition = "top";
        },
    },
    indicatorClass: {
        class: "indicatorClass",
        description: "Class of indicator tab element.",
    },
    indicatorItemClass: {
        class: "indicatorItemClass",
        description: "Class of indicator item element.",
    },
    indicatorItemActiveClass: {
        class: "indicatorItemActiveClass",
        description: "Class of indicator item element when active.",
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
        subitem: "carouselitem",
        description: "Class of item element.",
    },
    itemActiveClass: {
        class: "itemActiveClass",
        subitem: "carouselitem",
        description: "Class of item element when active.",
    },
    itemClickableClass: {
        class: "itemClickableClass",
        subitem: "carouselitem",
        description: "Class of item element when clickable.",
        properties: ["clickable"],
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
