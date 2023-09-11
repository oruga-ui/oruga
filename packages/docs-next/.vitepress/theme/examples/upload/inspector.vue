<script setup>
const inspectData = [
    {
        class: "rootClass",
        description: "Root class of the element",
    },
    {
        class: "draggableClass",
        description: "Upload class when draggable",
        properties: ["dragDrop"],
        action: (cmp, data) => {
            data.dragDrop = true;
        },
    },
    {
        class: "expandedClass",
        description: "Upload class when expanded",
        properties: ["expanded"],
        action: (cmp, data) => {
            data.expanded = true;
        },
    },
    {
        class: "disabledClass",
        description: "Upload class when disabled",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "hoveredClass",
        description: "Upload class on dragging",
        properties: ["dragDrop"],
        warning: "Drag & drop a file to see it in action!",
        action: (cmp, data) => {
            data.dragDrop = true;
        },
    },
    {
        class: "variantClass",
        description: "Class of the upload variant",
        properties: ["variant", "dragDrop"],
        suffixes: ["primary", "info", "warning", "danger"],
        warning: "Drag & drop a file to see it in action!",
        action: (cmp, data) => {
            data.variant = "warning";
            data.dragDrop = true;
        },
    },
];
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
