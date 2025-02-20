<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { IconClasses } from "../props";

const inspectData: InspectData<IconClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    clickableClass: {
        class: "clickableClass",
        description: "Class of the root element when clickable.",
        properties: ["clickable"],
        action: (cmp, data): void => {
            data.clickable = true;
        },
    },
    spinClass: {
        class: "spinClass",
        description: "Class of the root element when spin.",
        properties: ["spin"],
        action: (cmp, data): void => {
            data.spin = true;
        },
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the root element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-icon pack="ionicons" icon="home" size="large" v-bind="props" />
    </inspector-wrapper>
</template>
