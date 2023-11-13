<script setup>
import { ref } from "vue";

const position = ref("static");

const active = ref(false);
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
        action: () => {
            position.value = "static";
        },
    },
    {
        class: "mobileClass",
        description: "Class of sidebar component when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "activeClass",
        description: "Class of modal component when its active",
        action: () => {
            active.value = true;
        },
    },
    {
        class: "overlayClass",
        description: "Class of the sidebar overlay",
        action: (cmp, data) => {
            position.value = "fixed";
            setTimeout(() => {
                active.value = true;
                data.overlay = true;
                data.fullheight = true;
            }, 400);
        },
    },
    {
        class: "contentClass",
        description: "Class of the sidebar content",
        action: () => {
            position.value = "static";
        },
    },
    {
        class: "fixedClass",
        description: "Class of the sidebar when its position is fixed",
        properties: ["position"],
        action: (cmp, data) => {
            position.value = "fixed";
            setTimeout(() => {
                active.value = true;
                data.overlay = true;
                data.fullheight = true;
            }, 400);
        },
    },
    {
        class: "staticClass",
        description: "Class of the sidebar when its position is static",
        properties: ["position"],
        action: () => {
            position.value = "static";
        },
    },
    {
        class: "absoluteClass",
        description: "Class of the sidebar when its position is absolute",
        properties: ["position"],
        warning: "Scroll to the top of this page to see the sidebar",
        action: (cmp, data) => {
            position.value = "absolute";
            setTimeout(() => {
                data.fullheight = true;
                active.value = true;
            }, 400);
        },
    },
    {
        class: "fullheightClass",
        description: "Class of the sidebar when is fullheight",
        properties: ["fullheight"],
        action: (cmp, data) => {
            position.value = "static";
            data.fullheight = true;
        },
    },
    {
        class: "fullwidthClass",
        description: "Class of the sidebar when is fullwidth",
        properties: ["fullwidth"],
        action: (cmp, data) => {
            position.value = "static";
            data.fullwidth = true;
        },
    },
    {
        class: "rightClass",
        description: "Class of the sidebar when is positioned on the right",
        properties: ["right"],
        action: (cmp, data) => {
            position.value = "static";
            data.right = true;
        },
    },
    {
        class: "reduceClass",
        description: "Class of the sidebar when reduced",
        properties: ["reduce"],
        action: (cmp, data) => {
            position.value = "static";
            data.reduce = true;
        },
    },
    {
        class: "expandOnHoverClass",
        description: "Class of the sidebar when expanded on hover",
        properties: ["expandOnHover"],
        action: (cmp, data) => {
            position.value = "static";
            data.expandOnHover = true;
        },
    },
    {
        class: "expandOnHoverFixedClass",
        description:
            "Class of the sidebar when expanded on hover and its position is fixed",
        properties: ["expandOnHover", "expandOnHoverFixed"],
        action: (cmp, data) => {
            position.value = "fixed";
            setTimeout(() => {
                data.expandOnHover = true;
                data.expandOnHoverFixed = true;
                active.value = true;
            }, 400);
        },
    },
    {
        class: "variantClass",
        description: "Class of the sidebar variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            position.value = "static";
            data.variant = "warning";
        },
    },
    {
        class: "visibleClass",
        description: "Class of the sidebar when sidebar is visible",
    },
    {
        class: "hiddenClass",
        description: "Class of the sidebar when sidebar is hidden",
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-sidebar
            v-if="position === 'static'"
            v-bind="props"
            position="static"
            active>
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
        <o-sidebar
            v-if="position !== 'static'"
            v-bind="props"
            v-model:active="active"
            :position="position"
            variant="primary"
            root-class="fixed">
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
