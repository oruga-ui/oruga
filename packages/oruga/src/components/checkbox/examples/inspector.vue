<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { CheckboxClasses, CheckboxProps } from "../props";

const inspectData: InspectData<CheckboxClasses, CheckboxProps<unknown>> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    checkedClass: {
        class: "checkedClass",
        description: "Class of the root element when checked.",
        properties: ["modelValue"],
        action: (cmp, data): void => {
            data.modelValue = true;
        },
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
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    indeterminateClass: {
        class: "indeterminateClass",
        description: "Class of the root element when indeterminate.",
        properties: ["indeterminate"],
        action: (cmp, data): void => {
            data.indeterminate = true;
        },
    },
    inputClass: {
        class: "inputClass",
        description: "Class of the native input element.",
    },
    labelClass: {
        class: "labelClass",
        description: "Class of the label element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-checkbox v-bind="props"> Checkbox </o-checkbox>
    </inspector-wrapper>
</template>
