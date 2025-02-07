<script setup lang="ts">
import { ref } from "vue";

const isImageModalActive = ref(false);
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
        action: (): void => {
            isImageModalActive.value = true;
        },
    },
    {
        class: "mobileClass",
        description: "Class of modal component when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "activeClass",
        description: "Class of modal component when its active",
        properties: ["active"],
        action: (): void => {
            isImageModalActive.value = true;
        },
    },
    {
        class: "overlayClass",
        description: "Class of the modal overlay",
        action: (): void => {
            isImageModalActive.value = true;
        },
    },
    {
        class: "contentClass",
        description: "Class of the modal content",
        specificity: "when <b>mobileClass</b> is applied",
        action: (): void => {
            isImageModalActive.value = true;
        },
    },
    {
        class: "closeClass",
        description: "Class of the close button",
        action: (): void => {
            isImageModalActive.value = true;
        },
    },
    {
        class: "fullScreenClass",
        description: "Class of the modal when fullscreen",
        properties: ["fullScreen"],
        action: (cmp): void => {
            isImageModalActive.value = true;
            cmp.data.fullScreen = true;
        },
    },
    {
        class: "scrollClipClass",
        description: "Class of the modal when scroll is clip",
        properties: ["scroll"],
        action: (cmp, data): void => {
            isImageModalActive.value = true;
            data.scroll = "clip";
        },
    },
    {
        class: "noScrollClass",
        description: "Class of the modal when scroll is not clip",
        properties: ["scroll"],
        action: (cmp, data): void => {
            isImageModalActive.value = true;
            data.scroll = "";
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-modal v-bind="props" v-model:active="isImageModalActive">
            <p style="text-align: center">
                <img
                    src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
            </p>
        </o-modal>
        <b>Click on "Inspect" button to open the modal</b>
    </inspector-wrapper>
</template>
