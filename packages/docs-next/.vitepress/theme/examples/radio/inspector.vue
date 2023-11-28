<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "labelClass",
        description: "Class of the radio label",
    },
    {
        class: "checkedClass",
        description: "Class of the root element when checked",
        action: (cmp, data) => {
            data.checkbox = "default";
        },
    },
    {
        class: "inputClass",
        description: "Class of the native input element",
    },
    {
        class: "inputCheckedClass",
        description: "Class of the native input element when checked",
        action: (cmp, data) => {
            data.checkbox = "default";
        },
    },
    {
        class: "sizeClass",
        description: "Class of the radio size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "disabledClass",
        description: "Class when radio is disabled",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "variantClass",
        description: "Class of the radio variant",
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
        <o-radio v-model="props.checkbox" native-value="default" v-bind="props">
            Radio
        </o-radio>
    </inspector-wrapper>
</template>
