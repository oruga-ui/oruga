<script setup lang="ts">
import type { InspectData } from "@docs";
import type { TagClasses, TagProps } from "../props";

const inspectData: InspectData<TagClasses, TagProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
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
    variantClass: {
        class: "variantClass",
        description: "Class of the root element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.variant = "warning";
        },
    },
    badgeClass: {
        class: "badgeClass",
        description: "Class of the root element when badge style.",
        properties: ["badge"],
        action: (data): void => {
            data.badge = true;
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
    hoverableClass: {
        class: "hoverableClass",
        description: "Class of the root element when hoverable.",
        properties: ["hoverable"],
        action: (data): void => {
            data.hoverable = true;
        },
    },
    labelClass: {
        class: "labelClass",
        description: "Class of the label element.",
    },
    iconClass: {
        class: "iconClass",
        description: "Class of the item icon element",
        properties: ["icon"],
        action: (data) => {
            data.icon = "home";
        },
    },
    closeClass: {
        class: "closeClass",
        description: "Class of the tag item close button element.",
        properties: ["closable"],
        action: (data): void => {
            data.closable = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-tag v-bind="props"> Tag label </o-tag>
    </inspector-wrapper>
</template>
