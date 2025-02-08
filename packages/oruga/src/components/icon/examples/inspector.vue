<script setup lang="ts">
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "clickableClass",
        description: "Class of the icon when clickable",
        properties: ["clickable"],
        action: (cmp, data): void => {
            data.clickable = true;
        },
    },
    {
        class: "spinClass",
        description: "Class of the element when spin",
        properties: ["spin"],
        action: (cmp, data): void => {
            data.spin = true;
        },
    },
    {
        class: "sizeClass",
        description: "Class of the icon size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    {
        class: "variantClass",
        description: "Class of the icon variant",
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
        <o-icon v-bind="props" pack="ionicons" icon="home" size="large" />
    </inspector-wrapper>
</template>
