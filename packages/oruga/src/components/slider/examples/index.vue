<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import TickAndLabel from "./tick-and-label.vue";
import TickAndLabelCode from "./tick-and-label.vue?raw";

import Range from "./range.vue";
import RangeCode from "./range.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="sizes">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="customize">Customise</h3>
    <ExampleViewer :component="Customise" :code="CustomiseCode" />

    <h3 id="tick">Tick and label</h3>
    <ExampleViewer :component="TickAndLabel" :code="TickAndLabelCode" />

    <h3 id="range">Range</h3>
    <ExampleViewer :component="Range" :code="RangeCode" />
</template>
