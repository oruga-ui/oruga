<script setup lang="ts">
import type { InspectData } from "@docs";
import type { CollapseClasses, CollapseProps } from "../props";

const inspectData: InspectData<CollapseClasses, CollapseProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element with position.",
        properties: ["position"],
        action: (data): void => {
            data.position = "top";
        },
    },
    triggerClass: {
        class: "triggerClass",
        description: "Class of the trigger element.",
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the trigger element when expanded.",
        properties: ["expanded"],
        action: (data): void => {
            data.expanded = true;
        },
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-collapse open expanded v-bind="props">
            <template #trigger="{ open }">
                <p>
                    <o-icon :icon="open ? 'chevron-down' : 'chevron-right'" />
                    {{ open ? "Close" : "Open" }} Collapse!
                </p>
            </template>

            <div>Collapse Content</div>
        </o-collapse>
    </inspector-wrapper>
</template>
