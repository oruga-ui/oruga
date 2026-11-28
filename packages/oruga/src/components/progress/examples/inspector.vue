<script setup lang="ts">
import type { InspectData } from "@docs";
import type { ProgressClasses, ProgressProps } from "../props";

const inspectData: InspectData<ProgressClasses, ProgressProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the root element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.variant = "warning";
        },
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (data): void => {
            data.size = "large";
        },
    },
    roundedClass: {
        class: "roundedClass",
        description: "Class of the root element when rounded.",
        properties: ["rounded"],
        action: (data): void => {
            data.rounded = true;
        },
    },
    indeterminateClass: {
        class: "indeterminateClass",
        description: "Class of the root element when indeterminate.",
        properties: ["value"],
        action: (data): void => {
            data.value = undefined;
        },
    },
    barClass: {
        class: "barClass",
        description: "Class of the native progress element.",
    },
    labelClass: {
        class: "labelClass",
        description: "Class of the label element.",
        properties: ["showValue"],
        action: (data): void => {
            data.showValue = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-progress :value="60" aria-label="Progress" v-bind="props" />
    </inspector-wrapper>
</template>
