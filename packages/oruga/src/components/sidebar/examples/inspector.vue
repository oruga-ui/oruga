<script setup lang="ts">
import type { InspectData } from "@docs";
import type { SidebarClasses, SidebarProps } from "../props";

const inspectData: InspectData<SidebarClasses, SidebarProps> = {
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
    inlineClass: {
        class: "inlineClass",
        description: "Class of the root element when inlined.",
        properties: ["inline"],
        action: (data): void => {
            data.inline = true;
            data.active = true;
            data.overlay = true;
            data.fullheight = true;
        },
    },
    overlayClass: {
        class: "overlayClass",
        description: "Class of the overlay element.",
        action: (data): void => {
            data.active = true;
            data.overlay = true;
            data.fullheight = true;
        },
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
    },
    visibleClass: {
        class: "visibleClass",
        description: "Class of the content element when visible.",
        properties: ["active"],
    },
    hiddenClass: {
        class: "hiddenClass",
        description: "Class of the content element when hidden.",
        properties: ["active"],
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the content element with position.",
        properties: ["position"],
        action: (data): void => {
            data.position = "right";
        },
    },
    fullheightClass: {
        class: "fullheightClass",
        description: "Class of the content element when fullheight.",
        properties: ["fullheight"],
        action: (data): void => {
            data.fullheight = true;
        },
    },
    fullwidthClass: {
        class: "fullwidthClass",
        description: "Class of the content element when fullwidth.",
        properties: ["fullwidth"],
        action: (data): void => {
            data.fullwidth = true;
        },
    },
    reduceClass: {
        class: "reduceClass",
        description: "Class of the content element when reduced.",
        properties: ["reduce"],
        action: (data): void => {
            data.reduce = true;
        },
    },
    expandOnHoverClass: {
        class: "expandOnHoverClass",
        description: "Class of the content element when expanded on hover.",
        properties: ["expandOnHover"],
        action: (data): void => {
            data.expandOnHover = true;
        },
    },
    scrollClipClass: {
        class: "scrollClipClass",
        description: "Class of the body when is visible and scroll is clip.",
        properties: ["clipScroll"],
        action: (data): void => {
            data.clipScroll = true;
        },
    },
    scrollKeepClass: {
        class: "scrollKeepClass",
        description:
            "Class of the body when is visible and scroll is not clip.",
        properties: ["clipScroll"],
        action: (data): void => {
            data.clipScroll = false;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-sidebar v-bind="props">
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
        </o-sidebar>
    </inspector-wrapper>
</template>
