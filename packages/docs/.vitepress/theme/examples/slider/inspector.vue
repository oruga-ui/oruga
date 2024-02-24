<script setup>
const subitem = "slidertick";

const inspectData = [
    {
        class: "rootClass",
        description: "Root class of the element",
    },
    {
        class: "trackClass",
        description: "Class of the slider track",
    },
    {
        class: "fillClass",
        description: "Class of the filled part of the slider",
    },
    {
        class: "sizeClass",
        description: "Class of the vertical slider size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "thumbRoundedClass",
        description: "Class when the slider is rounded",
        properties: ["rounded"],
        action: (cmp, data) => {
            data.rounded = true;
        },
    },
    {
        class: "thumbDraggingClass",
        description: "Class when the thumb gets dragged",
        warning: "Drag the thumb to see it in action!",
    },
    {
        class: "disabledClass",
        description: "Class when slider is disabled",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "thumbWrapperClass",
        description: "Class of the thumb wrapper",
        action: (cmp, data) => {
            data.fullScreen = true;
        },
    },
    {
        class: "thumbClass",
        description: "Class of the thumb",
        action: (cmp, data) => {
            data.fullScreen = true;
        },
    },
    {
        class: "variantClass",
        description: "Class of the slider variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.position = "static";
            data.variant = "warning";
        },
    },
    {
        class: "tickClass",
        description: "Class of slider tick",
        properties: ["ticks"],
        subitem: true,
    },
    {
        class: "tickHiddenClass",
        description: "Class when slider tick is hidden",
        properties: ["ticks"],
        subitem: true,
    },
    {
        class: "tickLabelClass",
        description: "Class of tick label",
        properties: ["ticks"],
        subitem: true,
    },
];
</script>

<template>
    <inspector-wrapper
        v-slot="props"
        :inspect-data="inspectData"
        :subitem="subitem">
        <o-slider v-bind="props" :min="1" :max="10" :value="4">
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
