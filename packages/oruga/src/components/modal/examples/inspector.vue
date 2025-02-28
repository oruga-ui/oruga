<script setup lang="ts">
import type { InspectData } from "@docs";
import type { ModalClasses, ModalProps } from "../props";

const inspectData: InspectData<ModalClasses, ModalProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
        action: (data): void => {
            data.active = true;
        },
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
        action: (data): void => {
            data.active = true;
        },
    },
    activeClass: {
        class: "activeClass",
        description: "Class of the root element when active.",
        properties: ["active"],
        action: (data): void => {
            data.active = true;
        },
    },
    overlayClass: {
        class: "overlayClass",
        description: "Class of the overlay element.",
        action: (data): void => {
            data.active = true;
        },
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
        action: (data): void => {
            data.active = true;
        },
    },
    fullScreenClass: {
        class: "fullScreenClass",
        description: "Class of the content element when fullscreen.",
        properties: ["fullScreen"],
        action: (data): void => {
            data.active = true;
            data.fullScreen = true;
        },
    },
    closeClass: {
        class: "closeClass",
        description: "Class of the close button element.",
        action: (data): void => {
            data.active = true;
        },
    },
    scrollClipClass: {
        class: "scrollClipClass",
        description: "Class of the body when modal is open and scroll is clip.",
        properties: ["clipScroll"],
        action: (data): void => {
            data.active = true;
            data.clipScroll = true;
        },
    },
    scrollKeepClass: {
        class: "scrollKeepClass",
        description:
            "Class of the body when modal is open and scroll is not clip.",
        properties: ["clipScroll"],
        action: (data): void => {
            data.active = true;
            data.clipScroll = false;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-modal v-bind="props">
            <p style="text-align: center">
                <img
                    src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4" />
            </p>
        </o-modal>
        <b>Click on "Inspect" button to open the modal</b>
    </inspector-wrapper>
</template>
