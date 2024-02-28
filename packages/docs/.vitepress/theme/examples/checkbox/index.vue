<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Array from "./array.vue";
import ArrayCode from "./array.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="sizes">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="array">Array</h3>
    <ExampleViewer :component="Array" :code="ArrayCode" />
</template>
