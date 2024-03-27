<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "wrapperClass",
        description: "Class of the breadcrumb elements wrapper",
        action: (cmp, data) => {
            data.expanded = true;
        },
    },
    {
        class: "disabledClass",
        description: "Class of the breadcrumb when disabled",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "sizeClass",
        description: "Class of the breadcrumb size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "variantClass",
        description: "Class of the breadcrumb variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.variant = "warning";
        },
    },
    {
        class: "separatorClass",
        description: "Class of the breadcrumb separator",
        properties: ["separator"],
        suffixes: [
            "has-arrow-separator",
            "has-dot-separator",
            "has-slash-separator",
            "has-bullet-separator",
            "has-succeeds-separator",
            "has-chevron-separator",
        ],
        action: (cmp, data) => {
            data.variant = "has-slash-separator";
        },
    },
    {
        class: "alignClass",
        description: "Class of the breadcrumb align",
        properties: ["align"],
        suffixes: ["left", "center", "right"],
        action: (cmp, data) => {
            data.variant = "left";
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
