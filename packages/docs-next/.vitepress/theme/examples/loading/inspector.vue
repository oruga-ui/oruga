<script setup>
import { ref } from "vue";

const loading = ref(false);
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
        action: (cmp, data) => {
            data.cancelable = true;
            data.fullPage = false;
            loading.value = true;
        },
    },
    {
        class: "overlayClass",
        description: "Class of the loading overlay",
        action: (cmp, data) => {
            data.cancelable = true;
            data.fullPage = false;
            loading.value = true;
        },
    },
    {
        class: "iconClass",
        description: "Class for the loading icon",
        action: (cmp, data) => {
            data.cancelable = true;
            data.fullPage = false;
            loading.value = true;
        },
    },
    {
        class: "fullPageClass",
        description: "Class for the root element when fullpage",
        properties: ["fullPage"],
        action: (cmp, data) => {
            data.fullPage = true;
            data.cancelable = true;
            loading.value = true;
        },
    },
];
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
                :icon-spin="true">
            </o-loading>
        </p>
        <b>Click on "Inspect" button to open the loading</b>
    </inspector-wrapper>
</template>
