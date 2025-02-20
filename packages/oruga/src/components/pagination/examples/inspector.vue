<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { PaginationClasses, PaginationProps } from "../props";

const inspectData: InspectData<PaginationClasses, PaginationProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    orderClass: {
        class: "orderClass",
        description: "Class of the root element with order",
        properties: ["order"],
        suffixes: ["centered", "right", "left"],
        action: (cmp, data): void => {
            data.order = "centered";
        },
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class for the root elemnt with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "small";
        },
    },
    simpleClass: {
        class: "simpleClass",
        description: "Class of the root element when in `simple` mode",
        properties: ["simple"],
        action: (cmp, data): void => {
            data.simple = true;
        },
    },
    infoClass: {
        class: "infoClass",
        description: "Class of the page info in `simple` mode.",
        properties: ["simple"],
        action: (cmp, data): void => {
            data.simple = true;
        },
    },
    listClass: {
        class: "listClass",
        description: "Class of the items list element.",
    },
    listItemClass: {
        class: "listItemClass",
        description: "Class of an list item element.",
    },
    ellipsisClass: {
        class: "ellipsisClass",
        description: "Class of the ellipsis element.",
    },
    buttonClass: {
        class: "buttonClass",
        description: "Class of the button element.",
    },
    roundedClass: {
        class: "roundedClass",
        description: "Class of the button element when rounded.",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.rounded = true;
        },
    },
    buttonCurrentClass: {
        class: "buttonCurrentClass",
        description: "Class of the current button element.",
    },
    buttonPrevClass: {
        class: "buttonPrevClass",
        description: "Class of the prev button element.",
    },
    buttonNextClass: {
        class: "buttonNextClass",
        description: "Class of the next button element.",
    },
    buttonDisabledClass: {
        class: "buttonDisabledClass",
        description: "Class of the prev or next button when disabled.",
        action: (cmp, data): void => {
            data.current = 20;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-pagination
            :total="200"
            :per-page="10"
            :current="10"
            :range-before="3"
            :range-after="1"
            v-bind="props" />
    </inspector-wrapper>
</template>
