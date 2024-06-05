<script setup lang="ts">
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "expandedClass",
        description: "Class of input when expanded",
        properties: ["expanded"],
        action: (cmp, data) => {
            data.expanded = true;
        },
    },
    {
        class: "iconLeftSpaceClass",
        description: "Class of the left icon space inside the input",
        properties: ["icon"],
        action: (cmp, data) => {
            data.icon = "envelope";
        },
    },
    {
        class: "iconRightSpaceClass",
        description: "Class of the right icon space inside the input",
        properties: ["iconRight"],
        action: (cmp, data) => {
            data.iconRight = "times-circle";
        },
    },
    {
        class: "inputClass",
        description: "Class of the native input element",
    },
    {
        class: "textareaClass",
        description: "Class of input when type textarea ",
        properties: ["type"],
        action: (cmp, data) => {
            data.type = "textarea";
        },
    },
    {
        class: "roundedClass",
        description: "Class of input when rounded",
        properties: ["rounded"],
        action: (cmp, data) => {
            data.rounded = true;
        },
    },
    {
        class: "disabledClass",
        description: "Class of input when disabled ",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "iconLeftClass",
        description: "Class of the left icon",
        properties: ["icon"],
        action: (cmp, data) => {
            data.icon = "envelope";
        },
    },
    {
        class: "iconRightClass",
        description: "Class of the right icon",
        properties: ["iconRight"],
        action: (cmp, data) => {
            data.iconRight = "times-circle";
        },
    },
    {
        class: "counterClass",
        description: "Class of the counter element",
        properties: ["counter", "maxlength"],
        action: (cmp, data) => {
            data.counter = true;
            data.maxlength = 10;
            const el = cmp.querySelector("input");
            el.dispatchEvent(new Event("focus"));
        },
    },
    {
        class: "sizeClass",
        description: "Class of the input size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "variantClass",
        description: "Class of the input variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        warning: "Variant property should be applied to the wrapping field",
        action: (cmp, data) => {
            data.fieldvariant = "warning";
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field :variant="props.fieldvariant">
            <o-input v-bind="props" placeholder="Input"></o-input>
        </o-field>
    </inspector-wrapper>
</template>
