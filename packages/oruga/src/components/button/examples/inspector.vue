<script setup lang="ts">
import type { InspectData } from "@docs";
import type { ButtonClasses, ButtonProps } from "../props";

const inspectData: InspectData<ButtonClasses, ButtonProps> = {
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
    outlinedClass: {
        class: "outlinedClass",
        description: "Class of the root element when outlined.",
        properties: ["outlined"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.variant = "primary";
            data.outlined = true;
        },
    },
    invertedClass: {
        class: "invertedClass",
        description: "Class of the root element when inverted.",
        properties: ["inverted"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.variant = "primary";
            data.inverted = true;
        },
    },
    loadingClass: {
        class: "loadingClass",
        description: "Class of the root element when loading.",
        properties: ["loading"],
        action: (data): void => {
            data.loading = true;
        },
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (data): void => {
            data.expanded = true;
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
    disabledClass: {
        class: "disabledClass",
        description: "Class of the button when disabled.",
        properties: ["disabled"],
        action: (data): void => {
            data.disabled = true;
        },
    },
    wrapperClass: {
        class: "wrapperClass",
        description: "Class of the inner wrapper element.",
    },
    iconClass: {
        class: "iconClass",
        description: "Class of the icon element.",
        properties: ["iconLeft", "iconRight"],
        action: (data): void => {
            data["icon-left"] = "plus";
        },
    },
    iconLeftClass: {
        class: "iconLeftClass",
        description: "Class of the icon element on the left.",
        properties: ["iconLeft"],
        action: (data): void => {
            data["icon-left"] = "plus";
        },
    },
    iconRightClass: {
        class: "iconRightClass",
        description: "Class of the icon element on the right.",
        properties: ["iconRight"],
        action: (data): void => {
            data["icon-right"] = "plus";
        },
    },
    labelClass: {
        class: "labelClass",
        description: "Class of the label element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-button v-bind="props">Button</o-button>
    </inspector-wrapper>
</template>
