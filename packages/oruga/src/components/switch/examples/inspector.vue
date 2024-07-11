<script setup lang="ts">
import { ref } from "vue";

const checkValue = ref(true);
const inspectData = [
    {
        class: "rootClass",
        description: "Root class of the element",
    },
    {
        class: "inputClass",
        description: "Root class of the native input checkbox",
    },
    {
        class: "inputCheckedClass",
        description: "Class of the native input element when checked",
        action: (cmp, data) => {
            data.checkValue.value = true;
        },
    },
    {
        class: "switchClass",
        description: "Class of the outer switch check",
    },
    {
        class: "switchCheckedClass",
        description: "Class of the outer switch check when checked",
        action: (cmp, data) => {
            data.checkValue.value = true;
        },
    },
    {
        class: "switchCheckClass",
        description: "Class of the inner switch check",
    },
    {
        class: "roundedClass",
        description: "Class of the switch when rounded",
        properties: ["rounded"],
        action: (cmp, data) => {
            data.rounded = true;
        },
    },
    {
        class: "disabledClass",
        description: "Class when switch is disabled",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "labelClass",
        description: "Class of the switch label",
    },
    {
        class: "positionClass",
        description: "Class of switch label position",
        properties: ["position"],
        action: (cmp, data) => {
            data.position = "left";
        },
    },
    {
        class: "sizeClass",
        description: "Class of the switch size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "variantClass",
        description: "Class of the switch variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.variant = "warning";
            data.checkValue.value = true;
        },
    },
    {
        class: "passiveVariantClass",
        description: "Class of the switch passive variant",
        properties: ["passiveVariant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.passiveVariant = "danger";
            data.checkValue.value = false;
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-switch v-bind="props" v-model="checkValue">Switch</o-switch>
    </inspector-wrapper>
</template>
