<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { InputClasses } from "../props";

const inspectData: InspectData<InputClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    hasIconRightClass: {
        class: "hasIconRightClass",
        description: "Class to the root element when a right icon is used.",
        properties: ["iconRight"],
        action: (cmp, data): void => {
            data.clearable = true;
        },
    },
    inputClass: {
        class: "inputClass",
        description: "Class of the native input element.",
    },
    textareaClass: {
        class: "textareaClass",
        description: "Class of the native input element when type textarea.",
        properties: ["type"],
        action: (cmp, data): void => {
            data.type = "textarea";
        },
    },
    roundedClass: {
        class: "roundedClass",
        description: "Class of the native input element when rounded.",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.rounded = true;
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the native input element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the native input element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the native input element with variant",
        info: "Variant property should be applied to the wrapping field.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.fieldvariant = "warning";
        },
    },
    iconLeftSpaceClass: {
        class: "iconLeftSpaceClass",
        description: "Class of the native input element with left icon space.",
        properties: ["icon"],
        action: (cmp, data): void => {
            data.icon = "envelope";
        },
    },
    iconRightSpaceClass: {
        class: "iconRightSpaceClass",
        description: "Class of the native input element with right icon space.",
        properties: ["iconRight"],
        action: (cmp, data): void => {
            data.iconRight = "times-circle";
        },
    },
    iconLeftClass: {
        class: "iconLeftClass",
        description: "Class of the left icon element.",
        properties: ["icon"],
        action: (cmp, data): void => {
            data.icon = "envelope";
        },
    },
    iconRightClass: {
        class: "iconRightClass",
        description: "Class of the right icon element.",
        properties: ["iconRight"],
        action: (cmp, data): void => {
            data.iconRight = "times-circle";
        },
    },
    counterClass: {
        class: "counterClass",
        description: "Class of the counter element.",
        properties: ["counter", "maxlength"],
        action: (cmp, data): void => {
            data.counter = true;
            data.maxlength = 10;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field :variant="props.fieldvariant">
            <o-input placeholder="Input" v-bind="props" />
        </o-field>
    </inspector-wrapper>
</template>
