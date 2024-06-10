<script setup lang="ts">
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
        properties: ["multiline"],
        action: (cmp, data) => {
            data.multiline = true;
        },
    },
    {
        class: "arrowClass",
        description: "Class of the tooltip arrow",
    },
    {
        class: "arrowPositionClass",
        description: "Class of the tooltip arrow position",
        properties: ["position"],
        suffixes: ["top", "bottom", "left", "right"],
        action: (cmp, data) => {
            data.position = "right";
        },
    },
    {
        class: "positionClass",
        description: "Class of the tooltip trigger position",
        properties: ["position"],
        suffixes: ["top", "bottom", "left", "right"],
        action: (cmp, data) => {
            data.position = "right";
        },
    },
    {
        class: "alwaysClass",
        description: "Class of the tooltip trigger when is always visible",
        properties: ["always"], 
        action: (cmp, data) => {
            data.always = true;
        },
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
    {
        class: "teleportClass",
        description: "Class when the dropdown is teleported",
        properties: ["teleport"],
        action: (cmp, data) => {
            data.teleport = true;
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
