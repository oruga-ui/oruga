<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Root class of the element",
    },
    {
        class: "contentClass",
        description: "Class of the tooltip content",
    },
    {
        class: "triggerClass",
        description: "Class of the tooltip trigger",
    },
    {
        class: "multilineClass",
        description: "Class of the tooltip content when is multiline",
        action: (cmp, data) => {
            data.multiline = true;
        },
    },
    {
        class: "arrowClass",
        description: "Class of the tooltip arrow",
    },
    {
        class: "arrowOrderClass",
        description: "Class of the tooltip arrow when its position changes",
        properties: ["position"],
        suffixes: ["top", "bottom", "left", "right"],
        action: (cmp, data) => {
            data.position = "right";
        },
    },
    {
        class: "orderClass",
        description: "Class of the tooltip trigger when its position changes",
        properties: ["position"],
        suffixes: ["top", "bottom", "left", "right"],
        action: (cmp, data) => {
            data.position = "right";
        },
    },
    {
        class: "alwaysClass",
        description: "Class of the tooltip trigger when is always visible",
    },
    {
        class: "variantClass",
        description: "Class of the tooltip variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.variant = "warning";
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-tooltip v-bind="props" label="Tooltip!" always>
            <o-button label="Delayed" />
        </o-tooltip>
    </inspector-wrapper>
</template>
