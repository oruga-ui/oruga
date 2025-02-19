<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { SliderClasses } from "../props";

const inspectData: InspectData<SliderClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root elment with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    trackClass: {
        class: "trackClass",
        description: "Class of the slider track element.",
    },
    fillClass: {
        class: "fillClass",
        description: "Class of the filled part of the slider.",
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the filled part of the slider with variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.position = "static";
            data.variant = "warning";
        },
    },
    thumbWrapperClass: {
        class: "thumbWrapperClass",
        description: "Class of the thumb wrapper element.",
        action: (cmp, data): void => {
            data.fullScreen = true;
        },
    },
    thumbWrapperDraggingClass: {
        class: "thumbWrapperDraggingClass",
        description:
            "Class to the thumb wrapper element when the slider is dragged .",
        info: "Drag the thumb to see it in action!",
    },
    thumbClass: {
        class: "thumbClass",
        description: "Class of the thumb element.",
        action: (cmp, data): void => {
            data.fullScreen = true;
        },
    },
    thumbRoundedClass: {
        class: "thumbRoundedClass",
        description: "Class of the thumb element when rounded.",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.rounded = true;
        },
    },
    thumbDraggingClass: {
        class: "thumbDraggingClass",
        description: "Class of the thumb element when is dragged.",
        info: "Drag the thumb to see it in action!",
    },
    tickClass: {
        class: "tickClass",
        subitem: "slidertick",
        description: "Class of slider tick element.",
        properties: ["ticks"],
    },
    tickHiddenClass: {
        class: "tickHiddenClass",
        subitem: "slidertick",
        description: "Class of slider tick element when is hidden",
        properties: ["ticks"],
    },
    tickLabelClass: {
        class: "tickLabelClass",
        subitem: "slidertick",
        description: "Class of slider tick label element",
        properties: ["ticks"],
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-slider
            v-bind="props"
            :min="1"
            :max="10"
            :value="4"
            aria-label="inspector-demo">
            <o-slider-tick
                v-for="val in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
                :key="val"
                v-bind="props"
                :value="val">
                {{ val }}
            </o-slider-tick>
        </o-slider>
    </inspector-wrapper>
</template>
