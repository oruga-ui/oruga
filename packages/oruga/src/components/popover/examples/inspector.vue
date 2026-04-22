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
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-popover content="Tooltip!" v-bind="props">
            <o-button label="Open Popover!" />

            <template #content>
                <h4>Heading</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur warning elit. Fusce
                    id fermentum quam
                </p>
                <a href="#">Some Link</a>
            </template>
        </o-popover>
    </inspector-wrapper>
</template>
