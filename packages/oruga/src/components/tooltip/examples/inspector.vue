<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { TooltipClasses } from "../props";

const inspectData: InspectData<TooltipClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    teleportClass: {
        class: "teleportClass",
        description: "Class of the root element when teleported.",
        properties: ["teleport"],
        action: (cmp, data): void => {
            data.teleport = true;
        },
    },
    triggerClass: {
        class: "triggerClass",
        description: "Class of the trigger element.",
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the content element with position.",
        properties: ["position"],
        suffixes: ["top", "bottom", "left", "right"],
        action: (cmp, data): void => {
            data.position = "right";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the content element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
    multilineClass: {
        class: "multilineClass",
        description: "Class of the content element when is multiline.",
        properties: ["multiline"],
        action: (cmp, data): void => {
            data.multiline = true;
        },
    },
    alwaysClass: {
        class: "alwaysClass",
        description: "Class of the content element when is always visible.",
        properties: ["always"],
        action: (cmp, data): void => {
            data.always = true;
        },
    },
    arrowClass: {
        class: "arrowClass",
        description: "Class of the arrow element.",
    },
    arrowPositionClass: {
        class: "arrowPositionClass",
        description: "Class of the arrow element with position.",
        properties: ["position"],
        suffixes: ["top", "bottom", "left", "right"],
        action: (cmp, data): void => {
            data.position = "right";
        },
    },
    arrowVariantClass: {
        class: "arrowVariantClass",
        description: "Class of the arrow element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-tooltip v-bind="props" label="Tooltip!" always>
            <o-button label="Delayed" />
        </o-tooltip>
    </inspector-wrapper>
</template>
