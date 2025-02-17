<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { CollapseClasses } from "../props";

const inspectData: InspectData<CollapseClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element with position.",
        properties: ["position"],
        action: (cmp, data): void => {
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
        action: (cmp, data): void => {
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
        <o-collapse
            animation="slide"
            v-bind="props"
            :open="true"
            style="border: 1px solid #dfe2e5">
            <template #trigger="props">
                <div class="card-header" style="width: 100%">
                    <p class="card-header-title">
                        Collapse Title
                        <o-icon
                            :icon="props.open ? 'caret-up' : 'caret-down'" />
                    </p>
                </div>
            </template>
            <div class="card-content">
                <div class="content">Collapse Content</div>
            </div>
        </o-collapse>
    </inspector-wrapper>
</template>
