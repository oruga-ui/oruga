<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Grouped from "./grouped.vue";
import GroupedCode from "./grouped.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import WithIcons from "./with-icons.vue";
import WithIconsCode from "./with-icons.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="variants">Grouped</h3>
    <ExampleViewer :component="Grouped" :code="GroupedCode" />

    <h3 id="variants">Multiple</h3>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="variants">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="icons">With Icons</h3>
    <ExampleViewer :component="WithIcons" :code="WithIconsCode" />
</template>
