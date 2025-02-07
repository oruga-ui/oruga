<script setup lang="ts">
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
        warning: "You have to declare a class when override mode",
    },
    {
        class: "noticeClass",
        description: "Root class of the notice",
        nospec: true,
    },
    {
        class: "noticePositionClass",
        description: "Class of the notice when positioned",
        properties: ["position"],
        suffixes: [
            "top-right",
            "top",
            "top-left",
            "bottom-right",
            "bottom",
            "bottom-left",
        ],
        action: (cmp, data): void => {
            data.position = "top-right";
        },
        nospec: true,
    },
    {
        class: "noticeContainerClass",
        description: "Class of the custom container element",
    },
    {
        class: "closeClass",
        description: "Class of the close button container",
        properties: ["closable"],
        action: (cmp, data): void => {
            data.closable = true;
        },
    },
    {
        class: "contentClass",
        description: "Class of the content element",
    },
    {
        class: "iconClass",
        description: "Class of the icon on the left",
        properties: ["type"],
        action: (cmp, data): void => {
            data.type = "info";
        },
    },
    {
        class: "positionClass",
        description: "Class of the element when positioned",
        properties: ["position"],
        suffixes: [
            "top-right",
            "top",
            "top-left",
            "bottom-right",
            "bottom",
            "bottom-left",
        ],
        warning:
            "You have to declare a class for top and bottom position when override mode",
        action: (cmp, data): void => {
            data.position = "top-right";
        },
    },
    {
        class: "wrapperClass",
        description: "Class of the wrapper element",
    },
    {
        class: "variantClass",
        description: "Class of the notification variant",
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
        <o-notification v-bind="props">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit
        </o-notification>
    </inspector-wrapper>
</template>
