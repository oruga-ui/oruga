<script setup lang="ts">
import type { InspectData } from "@docs";
import type { UploadClasses, UploadProps } from "../props";

const inspectData: InspectData<UploadClasses, UploadProps<File>> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    draggableClass: {
        class: "draggableClass",
        description: "Class of the dragable container element.",
        properties: ["dragDrop"],
        action: (cmp, data): void => {
            data.dragDrop = true;
        },
    },
    hoveredClass: {
        class: "hoveredClass",
        description: "Class of the dragable container element when hovered.",
        info: "Drag & drop a file to see it in action!",
        properties: ["dragDrop"],
        action: (cmp, data): void => {
            data.dragDrop = true;
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the dragable container element with variant.",
        info: "Drag & drop a file to see it in action!",
        properties: ["variant", "dragDrop"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
            data.dragDrop = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <section>
            <o-field>
                <o-upload v-bind="props">
                    <section class="ex-center">
                        <p>
                            <o-icon icon="upload" size="is-large" />
                        </p>
                        <p v-if="props.dragDrop">
                            Drop your files here or click to upload
                        </p>
                        <p v-if="!props.dragDrop">Click to upload</p>
                    </section>
                </o-upload>
            </o-field>
        </section>
    </inspector-wrapper>
</template>
