<script setup lang="ts">
import { ref } from "vue";

const total = ref(200);
const current = ref(10);
const perPage = ref(10);
const rangeBefore = ref(3);
const rangeAfter = ref(1);

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "mobileClass",
        description: "Class of pagination component when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "buttonClass",
        description: "Class of the link button",
        specificity: "when <b>mobileClass</b> is applied",
    },
    {
        class: "buttonCurrentClass",
        description: "Class of the current link",
    },
    {
        class: "buttonPrevClass",
        description: "Class of the prev button",
        specificity: "when <b>mobileClass</b> is applied",
    },
    {
        class: "buttonNextClass",
        description: "Class of the next button",
        specificity: "when <b>mobileClass</b> is applied",
    },
    {
        class: "buttonDisabledClass",
        description: "Class of the disabled link",
        action: (): void => {
            current.value = 20;
        },
    },
    {
        class: "listClass",
        description: "Class of the pagination list",
        specificity: "when <b>mobileClass</b> is applied",
    },
    {
        class: "listItemClass",
        description: "Class of the pagination list items",
    },
    {
        class: "ellipsisClass",
        description: "Class of the pagination ellipsis",
        specificity: "when <b>mobileClass</b> is applied",
    },
    {
        class: "infoClass",
        description: "Class of the info in `simple` mode",
        properties: ["simple"],
        action: (cmp, data): void => {
            data.simple = true;
        },
    },
    {
        class: "orderClass",
        description: "Class of the pagination order",
        properties: ["order"],
        suffixes: ["centered", "right", "left"],
        action: (cmp, data): void => {
            data.order = "centered";
        },
    },
    {
        class: "simpleClass",
        description: "Class of the pagination in `simple` mode",
        properties: ["simple"],
        action: (cmp, data): void => {
            data.simple = true;
        },
    },
    {
        class: "roundedClass",
        description: "Class of the pagination when rounded",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.rounded = true;
        },
    },
    {
        class: "sizeClass",
        description: "Class for the pagination size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "small";
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-pagination
            v-bind="props"
            v-model:current="current"
            :total="total"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :per-page="perPage" />
    </inspector-wrapper>
</template>
