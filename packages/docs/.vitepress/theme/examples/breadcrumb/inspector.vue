<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "wrapperClass",
        description: "Class of the button elements wrapper",
        action: (cmp, data) => {
            data.expanded = true;
        },
    },
    {
        class: "outlinedClass",
        description: "Class of the button when outlined",
        properties: ["outlined"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.variant = "primary";
            data.outlined = true;
        },
    },
    {
        class: "loadingClass",
        description: "Class of the button with loading",
        properties: ["loading"],
        action: (cmp, data) => {
            data.loading = true;
        },
    },
    {
        class: "invertedClass",
        description: "Class of the button when inverted",
        properties: ["inverted"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.variant = "primary";
            data.inverted = true;
        },
    },
    {
        class: "expandedClass",
        description: "Class of the button when expanded",
        properties: ["expanded"],
        action: (cmp, data) => {
            data.expanded = true;
        },
    },
    {
        class: "roundedClass",
        description: "Class of the button when rounded",
        properties: ["rounded"],
        action: (cmp, data) => {
            data.rounded = true;
        },
    },
    {
        class: "disabledClass",
        description: "Class of the button when disabled",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "labelClass",
        description: "Class of the button label",
    },
    {
        class: "iconClass",
        description: "Class of the button icon",
        properties: ["iconLeft", "iconRight"],
        action: (cmp, data) => {
            data["icon-left"] = "plus";
        },
    },
    {
        class: "iconLeftClass",
        description: "Class of the button icon on the left",
        properties: ["iconLeft"],
        action: (cmp, data) => {
            data["icon-left"] = "plus";
        },
    },
    {
        class: "iconRightClass",
        description: "Class of the button icon on the right",
        properties: ["iconRight"],
        action: (cmp, data) => {
            data["icon-right"] = "plus";
        },
    },
    {
        class: "sizeClass",
        description: "Class of the button size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "variantClass",
        description: "Class of the button variant",
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
        <o-breadcrumb v-bind="props">
            <o-breadcrumb-item tag="a" href="/" active="true" >Home</o-breadcrumb-item>
            <o-breadcrumb-item tag="a" href="/documentation/" disabled="true">Docs</o-breadcrumb-item>
            <o-breadcrumb-item tag="a" href="/components/Breadcrumb.html">Breadcrumb</o-breadcrumb-item>
        </o-breadcrumb>
    </inspector-wrapper>
</template>
