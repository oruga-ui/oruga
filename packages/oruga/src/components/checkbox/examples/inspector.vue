<script setup lang="ts">
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
        class: "checkedClass",
        description: "Class of the root element when checked",
        action: (cmp, data): void => {
            data.checkbox = true;
        },
    },
    {
        class: "inputClass",
        description: "Class of the checkbox input",
    },
    {
        class: "inputCheckedClass",
        description: "Class of the checkbox input when checked",
        action: (cmp, data): void => {
            data.checkbox = true;
        },
    },
    {
        class: "indeterminateClass",
        description: "Class when checkbox is indeterminate",
        properties: ["indeterminate"],
        action: (cmp, data): void => {
            data.indeterminate = true;
        },
    },
    {
        class: "sizeClass",
        description: "Class of the checkbox size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    {
        class: "disabledClass",
        description: "Class when checkbox is disabled",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    {
        class: "variantClass",
        description: "Class of the checkbox variant",
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
        <o-checkbox v-model="props.checkbox" v-bind="props"
            >Checkbox</o-checkbox
        >
    </inspector-wrapper>
</template>
