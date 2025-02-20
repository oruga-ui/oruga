<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { CheckboxClasses } from "../props";

const inspectData: InspectData<CheckboxClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the root element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
    checkedClass: {
        class: "checkedClass",
        description: "Class of the root element when checked.",
        action: (cmp, data): void => {
            data.checkbox = true;
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    inputClass: {
        class: "inputClass",
        description: "Class of the native input element.",
    },
    inputCheckedClass: {
        class: "inputCheckedClass",
        description: "Class of the native input element when checked.",
        action: (cmp, data): void => {
            data.checkbox = true;
        },
    },
    indeterminateClass: {
        class: "indeterminateClass",
        description: "Class of the native input element when indeterminate.",
        properties: ["indeterminate"],
        action: (cmp, data): void => {
            data.indeterminate = true;
        },
    },
    labelClass: {
        class: "labelClass",
        description: "Class of the label element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-checkbox v-model="props.checkbox" v-bind="props">
            Checkbox
        </o-checkbox>
    </inspector-wrapper>
</template>
