<script setup lang="ts">
import type { InspectData } from "@docs";
import type { CardClasses, CardProps } from "../props";

const inspectData: InspectData<CardClasses, CardProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    headerClass: {
        class: "headerClass",
        description: "Class of the header element.",
    },
    titleClass: {
        class: "titleClass",
        description: "Class of the header title element.",
    },
    subtitle: {
        class: "subtitle",
        description: "Class of the header subtitle element.",
    },
    closeClass: {
        class: "closeClass",
        description: "Class of the header close element.",
    },
    imageClass: {
        class: "imageClass",
        description: " Class of the image container.",
    },
    figureClass: {
        class: "figureClass",
        description: "Class of the image figure element.",
    },
    bodyClass: {
        class: "bodyClass",
        description: " Class of the body element.",
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the body content element.",
    },
    footerClass: {
        class: "footerClass",
        description: "Class of the footer element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-card
            closeable
            title="Card title"
            subtitle="Card subtitle"
            image-alt="Oruga Logo"
            image-src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
            content="With supporting text below as a natural lead-in to additional content."
            footer="Footer content"
            v-bind="props" />
    </inspector-wrapper>
</template>
