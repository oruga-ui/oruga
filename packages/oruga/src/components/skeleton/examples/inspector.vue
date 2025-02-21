<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { SkeletonClasses, SkeletonProps } from "../props";

const inspectData: InspectData<SkeletonClasses, SkeletonProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element with position.",
        properties: ["position"],
        suffixes: ["left", "centered", "right"],
        action: (cmp, data): void => {
            data.position = "centered";
        },
    },
    itemClass: {
        class: "itemClass",
        description: "Class of the item element.",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the item element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    animatedClass: {
        class: "animatedClass",
        description: "Class of the item element when animated.",
        action: (cmp, data): void => {
            data.animated = true;
        },
    },
    roundedClass: {
        class: "roundedClass",
        description: "Class of the item element when rounded.",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.rounded = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-skeleton width="264px" :count="2" v-bind="props" />
    </inspector-wrapper>
</template>
