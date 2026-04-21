<script setup lang="ts">
import type { InspectData } from "@docs";
import type { PopoverClasses, PopoverProps } from "../props";

const inspectData: InspectData<PopoverClasses, PopoverProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    teleportClass: {
        class: "teleportClass",
        description: "Class of the root element when teleported.",
        properties: ["teleport"],
        action: (data): void => {
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
    // positionClass: {
    //     class: "positionClass",
    //     description: "Class of the content element with position.",
    //     properties: ["position"],
    //     suffixes: ["top", "bottom", "left", "right"],
    //     action: (data): void => {
    //         data.position = "right";
    //     },
    // },
    variantClass: {
        class: "variantClass",
        description: "Class of the content element with variant.",
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
            <o-button label="Delayed" />
        </o-tooltip>
    </inspector-wrapper>
</template>
