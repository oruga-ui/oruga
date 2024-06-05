<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />
</template>
