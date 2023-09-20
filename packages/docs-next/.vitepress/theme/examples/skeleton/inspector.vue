<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "animationClass",
        description: "Class of the skeleton animation",

        action: (cmp, data) => {
            data.animated = true;
        },
    },
    {
        class: "positionClass",
        description: "Class of the skeleton position",
        properties: ["position"],
        suffixes: ["left", "centered", "right"],
        action: (cmp, data) => {
            data.position = "centered";
        },
    },
    {
        class: "itemClass",
        description: "Class of the skeleton item",
    },
    {
        class: "itemRoundedClass",
        description: "Class of the skeleton item rounded",
        properties: ["rounded"],
        action: (cmp, data) => {
            data.rounded = true;
        },
    },
    {
        class: "sizeClass",
        description: "Class of the skeleton size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-skeleton v-bind="props" width="264px" :count="2" />
    </inspector-wrapper>
</template>
