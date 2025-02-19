<script setup lang="ts">
import { ref } from "vue";
import type { InspectData } from "@/docs";
import type { LoadingClasses } from "../props";

const loading = ref(false);

const inspectData: InspectData<LoadingClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
        action: (cmp, data): void => {
            data.cancelable = true;
            data.fullPage = false;
            loading.value = true;
        },
    },
    fullPageClass: {
        class: "fullPageClass",
        description: "Class for the root element when fullpage.",
        properties: ["fullPage"],
        action: (cmp, data): void => {
            data.fullPage = true;
            data.cancelable = true;
            loading.value = true;
        },
    },
    overlayClass: {
        class: "overlayClass",
        description: "Class of the loading overlay element.",
        action: (cmp, data): void => {
            data.cancelable = true;
            data.fullPage = false;
            loading.value = true;
        },
    },
    iconClass: {
        class: "iconClass",
        description: "Class for the loading icon element.",
        action: (cmp, data): void => {
            data.cancelable = true;
            data.fullPage = false;
            data.icon = "loading";
            loading.value = true;
        },
    },
    labelClass: {
        class: "labelClass",
        description: "Class for the loading label element.",
        action: (cmp, data): void => {
            data.cancelable = true;
            data.fullPage = false;
            data.label = "Loading...";
            loading.value = true;
        },
    },
    scrollClipClass: {
        class: "scrollClipClass",
        description: "Class of the body when fullpage and scroll is clip",
        properties: ["scroll"],
        action: (cmp, data): void => {
            data.fullPage = true;
            data.scroll = "clip";
            loading.value = true;
        },
    },
    noScrollClass: {
        class: "noScrollClass",
        description: "Class of body when fullpage and scroll is not clip",
        properties: ["scroll"],
        action: (cmp, data): void => {
            data.fullPage = true;
            data.scroll = "";
            loading.value = true;
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
                v-bind="props"
                v-model:active="loading"
                icon="sync-alt"
                :icon-spin="true"
                label="Loading...">
            </o-loading>
        </p>
        <b>Click on "Inspect" button to open the loading</b>
    </inspector-wrapper>
</template>
