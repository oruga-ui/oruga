<script setup lang="ts">
import type { InspectData } from "@docs";
import type { TooltipClasses, TooltipProps } from "../props";

const inspectData: InspectData<TooltipClasses, TooltipProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (data): void => {
            data.disabled = true;
        },
    },
    activeClass: {
        class: "activeClass",
        description: "Class of the root element when the tooltip is active.",
        properties: ["always"],
        action: (data): void => {
            data.always = true;
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
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
    },
    contentActiveClass: {
        class: "contentActiveClass",
        description: "Class of the content element when the tooltip is active.",
        properties: ["always"],
        action: (data): void => {
            data.always = true;
        },
    },
    contentVariantClass: {
        class: "contentVariantClass",
        description: "Class of the content element with a color variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.variant = "warning";
        },
    },
    arrowClass: {
        class: "arrowClass",
        description: "Class of the arrow element.",
    },
    arrowVariantClass: {
        class: "arrowVariantClass",
        description: "Class of the arrow element with a color variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.variant = "warning";
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-tooltip label="Tooltip!" always v-bind="props">
            <o-button label="Hover me" />
        </o-tooltip>
    </inspector-wrapper>
</template>
