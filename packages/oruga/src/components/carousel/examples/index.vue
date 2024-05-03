<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import List from "./list.vue";
import ListCode from "./list.vue?raw";

import CustomIndicators from "./custom-indicators.vue";
import CustomIndicatorsCode from "./custom-indicators.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="list">Carousel List</h3>
    <ExampleViewer :component="List" :code="ListCode" />

    <h3 id="indicatios">Custom Indicators</h3>
    <ExampleViewer :component="CustomIndicators" :code="CustomIndicatorsCode" />

    <h3 id="custom">Customise</h3>
    <ExampleViewer :component="Customise" :code="CustomiseCode" />
</template>

<style>
.ex-slide {
    padding: 9rem 4.5rem;
    color: #ffffff;
    text-align: center;
}
</style>
