<script setup lang="ts">
import type { InspectData } from "@docs";
import type { DrawerClasses, DrawerProps } from "../props";

const inspectData: InspectData<DrawerClasses, DrawerProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    activeClass: {
        class: "activeClass",
        description: "Class of the root element when active.",
        properties: ["active"],
        action: (data): void => {
            data.active = true;
        },
    },
    teleportClass: {
        class: "teleportClass",
        description: "Class of the root element when teleported.",
        properties: ["teleport"],
        action: (data): void => {
            data.teleport = true;
        },
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element with position.",
        properties: ["position"],
        action: (data): void => {
            data.position = "right";
        },
    },
    fullscreenClass: {
        class: "fullscreenClass",
        description: "Class of the root element when is fullscreen.",
        properties: ["fullscreen"],
        action: (data): void => {
            data.fullscreen = true;
        },
    },
    resizableClass: {
        class: "resizableClass",
        description: "Class of the root element when is resizable.",
        properties: ["resizable"],
        action: (data): void => {
            data.resizable = true;
        },
    },
    resizingClass: {
        class: "resizingClass",
        description: "Class of the root element while the drawer is being resized.",
        info: "Drag the resize handle to see it in action!",
        properties: ["resizable"],
        action: (data): void => {
            data.resizable = true;
        },
    },
    resizeHandleClass: {
        class: "resizeHandleClass",
        description: "Class of the resize handle element.",
        properties: ["resizable"],
        action: (data): void => {
            data.resizable = true;
        },
    },
    headerClass: {
        class: "headerClass",
        description: "Class of the header element.",
        properties: ["title"],
        action: (data): void => {
            data.title = "Title";
        },
    },
    titleClass: {
        class: "titleClass",
        description: "Class of the header title element.",
        properties: ["title"],
        action: (data): void => {
            data.title = "Title";
        },
    },
    subtitleClass: {
        class: "subtitleClass",
        description: "Class of the header subtitle element.",
        properties: ["subtitle"],
        action: (data): void => {
            data.subtitle = "Subtitle";
        },
    },
    closeClass: {
        class: "closeClass",
        description: "Class of the header close element.",
        properties: ["closeable"],
        action: (data): void => {
            data.closeable = true;
        },
    },
    bodyClass: {
        class: "bodyClass",
        description: "Class of the body element.",
    },
    footerClass: {
        class: "footerClass",
        description: "Class of the footer element.",
        properties: ["confirmButton"],
        action: (data): void => {
            data.confirmButton = "Confirm";
        },
    },
    footerPositionClass: {
        class: "footerPositionClass",
        description: "Class of the footer element with position.",
        properties: ["buttonPosition"],
        suffixes: ["left", "center", "right"],
        action: (data): void => {
            data.confirmButton = "Confirm";
            data.buttonPosition = "center";
        },
    },
    confirmButtonClass: {
        class: "confirmButtonClass",
        description: "Class of the footer confirm button element.",
        properties: ["confirmButton"],
        action: (data): void => {
            data.confirmButton = "Confirm";
        },
    },
    cancelButtonClass: {
        class: "cancelButtonClass",
        description: "Class of the footer cancel button element.",
        properties: ["cancelButton"],
        action: (data): void => {
            data.cancelButton = "Cancel";
        },
    },
    scrollClipClass: {
        class: "scrollClipClass",
        description: "Class of the body when is visible and scroll is clipped.",
        properties: ["blockScroll"],
        action: (data): void => {
            data.blockScroll = true;
        },
    },
    scrollKeepClass: {
        class: "scrollKeepClass",
        description: "Class of the body when is visible and scroll is kept.",
        properties: ["blockScroll"],
        action: (data): void => {
            data.blockScroll = false;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-drawer v-bind="props">
            <img
                width="128"
                src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                alt="Lightweight UI components for Vue.js" />
            <section style="padding: 1em">
                <p>Example 1</p>
                <p>Example 2</p>
                <p>Example 3</p>
                <p>Example 4</p>
                <p>Example 5</p>
            </section>
        </o-drawer>
    </inspector-wrapper>
</template>
