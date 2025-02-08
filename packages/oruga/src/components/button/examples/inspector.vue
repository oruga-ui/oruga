<script setup lang="ts">
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "wrapperClass",
        description: "Class of the button elements wrapper",
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    {
        class: "outlinedClass",
        description: "Class of the button when outlined",
        properties: ["outlined"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "primary";
            data.outlined = true;
        },
    },
    {
        class: "loadingClass",
        description: "Class of the button with loading",
        properties: ["loading"],
        action: (cmp, data): void => {
            data.loading = true;
        },
    },
    {
        class: "invertedClass",
        description: "Class of the button when inverted",
        properties: ["inverted"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "primary";
            data.inverted = true;
        },
    },
    {
        class: "expandedClass",
        description: "Class of the button when expanded",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    {
        class: "roundedClass",
        description: "Class of the button when rounded",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.rounded = true;
        },
    },
    {
        class: "disabledClass",
        description: "Class of the button when disabled",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    {
        class: "labelClass",
        description: "Class of the button label",
    },
    {
        class: "iconClass",
        description: "Class of the button icon",
        properties: ["iconLeft", "iconRight"],
        action: (cmp, data): void => {
            data["icon-left"] = "plus";
        },
    },
    {
        class: "iconLeftClass",
        description: "Class of the button icon on the left",
        properties: ["iconLeft"],
        action: (cmp, data): void => {
            data["icon-left"] = "plus";
        },
    },
    {
        class: "iconRightClass",
        description: "Class of the button icon on the right",
        properties: ["iconRight"],
        action: (cmp, data): void => {
            data["icon-right"] = "plus";
        },
    },
    {
        class: "sizeClass",
        description: "Class of the button size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    {
        class: "variantClass",
        description: "Class of the button variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-button v-bind="props">Button</o-button>
    </inspector-wrapper>
</template>
