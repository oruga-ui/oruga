<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Customize from "./customize.vue";
import CustomizeCode from "./customize.vue?raw";

import TickAndLabel from "./tick-and-label.vue";
import TickAndLabelCode from "./tick-and-label.vue?raw";

import Range from "./range.vue";
import RangeCode from "./range.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="customize">Customize</h3>
    <ExampleViewer :component="Customize" :code="CustomizeCode" />

    <h3 id="tick">Tick and label</h3>
    <ExampleViewer :component="TickAndLabel" :code="TickAndLabelCode" />

    <h3 id="range">Range</h3>
    <ExampleViewer :component="Range" :code="RangeCode" />
</template>
