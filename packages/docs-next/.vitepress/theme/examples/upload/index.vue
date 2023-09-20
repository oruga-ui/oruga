<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import DragDrop from "./drag-drop.vue";
import DragDropCode from "./drag-drop.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="drag">Drag&Drop</h3>
    <ExampleViewer :component="DragDrop" :code="DragDropCode" />
</template>
