<script setup lang="ts">
import { ref } from "vue";

const inline = ref(false);
const active = ref(false);
const teleport = ref(false);
const position = ref<"left" | "top" | "bottom" | "right">("left");

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "mobileClass",
        description: "Class of sidebar component when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "activeClass",
        properties: ["active"],
        description: "Class of sidebar component when its active",
        action: (): void => {
            active.value = true;
        },
    },
    {
        class: "teleportClass",
        properties: ["teleport"],
        description: "Class of sidebar when teleported",
        action: (): void => {
            teleport.value = true;
        },
    },
    {
        class: "overlayClass",
        description: "Class of the sidebar overlay",
        action: (cmp, data): void => {
            setTimeout((): void => {
                active.value = true;
                data.overlay = true;
                data.fullheight = true;
            }, 400);
        },
    },
    {
        class: "contentClass",
        description: "Class of the sidebar content",
    },
    {
        class: "inlineClass",
        description: "Class of the sidebar when its inlined",
        action: (cmp, data): void => {
            inline.value = true;
            setTimeout((): void => {
                active.value = true;
                data.overlay = true;
                data.fullheight = true;
            }, 400);
        },
    },
    {
        class: "fullheightClass",
        description: "Class of the sidebar when is fullheight",
        properties: ["fullheight"],
        action: (cmp, data): void => {
            data.fullheight = true;
        },
    },
    {
        class: "fullwidthClass",
        description: "Class of the sidebar when is fullwidth",
        properties: ["fullwidth"],
        action: (cmp, data): void => {
            data.fullwidth = true;
        },
    },
    {
        class: "positionClass",
        description: "Class of the sidebar position",
        properties: ["position"],
        action: (cmp, data): void => {
            position.value = "right";
            data.right = true;
        },
    },
    {
        class: "reduceClass",
        description: "Class of the sidebar when reduced",
        properties: ["reduce"],
        action: (cmp, data): void => {
            data.reduce = true;
        },
    },
    {
        class: "expandOnHoverClass",
        description: "Class of the sidebar when expanded on hover",
        properties: ["expandOnHover"],
        action: (cmp, data): void => {
            data.expandOnHover = true;
        },
    },
    {
        class: "variantClass",
        description: "Class of the sidebar variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
    {
        class: "visibleClass",
        properties: ["active"],
        description: "Class of the sidebar content when sidebar is visible",
    },
    {
        class: "hiddenClass",
        properties: ["active"],
        description: "Class of the sidebar content when sidebar is hidden",
    },
    {
        class: "scrollClipClass",
        description: "Class of the body when sidebar clipped",
    },
    {
        class: "noScrollClass",
        description: "Class of the body when sidebar is not clipped",
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-sidebar
            v-bind="props"
            v-model:active="active"
            :inline
            :teleport
            :position
            variant="primary">
            <img
                width="128"
                src="https://avatars2.githubusercontent.com/u/66300512?s=200&v=4"
                alt="Lightweight UI components for Vue.js" />
            <section style="padding: 1em">
                <h5>Example 1</h5>
                <h5>Example 2</h5>
                <h5>Example 3</h5>
                <h5>Example 4</h5>
                <h5>Example 5</h5>
            </section>
        </o-sidebar>
    </inspector-wrapper>
</template>
