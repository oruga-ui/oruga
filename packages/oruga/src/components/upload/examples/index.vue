<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import DragDrop from "./drag-drop.vue";
import DragDropCode from "./drag-drop.vue?raw";

import Disabled from "./disabled.vue";
import DisabledCode from "./disabled.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="drag">Drag&Drop</h3>
    <ExampleViewer :component="DragDrop" :code="DragDropCode" />

    <h3 id="disabled">Disabled</h3>
    <ExampleViewer :component="Disabled" :code="DisabledCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />
</template>
