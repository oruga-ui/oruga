<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "labelClass",
        description: "Class of the checkbox label",
    },
    {
        class: "checkClass",
        description: "Class of the checkbox",
    },
    {
        class: "checkedClass",
        description: "Class of the root element when checked",
        action: (cmp, data) => {
            data.checkbox = true;
        },
    },
    {
        class: "checkCheckedClass",
        description: "Class of the checkbox when checked",
        action: (cmp, data) => {
            data.checkbox = true;
        },
    },
    {
        class: "checkIndeterminateClass",
        description: "Class when checkbox is indeterminate",
        properties: ["indeterminate"],
        action: (cmp, data) => {
            data.indeterminate = true;
        },
    },
    {
        class: "sizeClass",
        description: "Class of the checkbox size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "disabledClass",
        description: "Class when checkbox is disabled",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "variantClass",
        description: "Class of the checkbox variant",
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
        <o-checkbox v-model="props.checkbox" v-bind="props"
            >Checkbox</o-checkbox
        >
    </inspector-wrapper>
</template>
