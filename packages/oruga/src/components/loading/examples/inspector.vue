<script setup lang="ts">
import type { InspectData } from "@docs";
import type { LoadingClasses, LoadingProps } from "../props";

const inspectData: InspectData<LoadingClasses, LoadingProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
        action: (data): void => {
            data.cancelable = true;
            data.fullPage = false;
            data.active = true;
        },
    },
    fullPageClass: {
        class: "fullPageClass",
        description: "Class for the root element when fullpage.",
        properties: ["fullPage"],
        action: (data): void => {
            data.fullPage = true;
            data.cancelable = true;
            data.active = true;
        },
    },
    overlayClass: {
        class: "overlayClass",
        description: "Class of the overlay element.",
        action: (data): void => {
            data.cancelable = true;
            data.fullPage = false;
            data.active = true;
        },
    },
    iconClass: {
        class: "iconClass",
        description: "Class for the icon element.",
        action: (data): void => {
            data.cancelable = true;
            data.fullPage = false;
            data.icon = "loading";
            data.active = true;
        },
    },
    labelClass: {
        class: "labelClass",
        description: "Class for the label element.",
        action: (data): void => {
            data.cancelable = true;
            data.fullPage = false;
            data.label = "Loading...";
            data.active = true;
        },
    },
    scrollClipClass: {
        class: "scrollClipClass",
        description: "Class of the body when fullpage and scroll is clip",
        properties: ["scroll"],
        action: (data): void => {
            data.fullPage = true;
            data.scroll = "clip";
            data.active = true;
        },
    },
    noScrollClass: {
        class: "noScrollClass",
        description: "Class of the body when fullpage and scroll is not clip",
        properties: ["scroll"],
        action: (data): void => {
            data.fullPage = true;
            data.active = true;
            data.scroll = "keep";
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <p style="position: relative">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit
            <o-loading
                icon="sync-alt"
                :icon-spin="true"
                label="Loading..."
                v-bind="props">
            </o-loading>
        </p>
        <b>Click on "Inspect" button to open the loading</b>
    </inspector-wrapper>
</template>
