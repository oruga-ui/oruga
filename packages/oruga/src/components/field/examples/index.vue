<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Addons from "./addons.vue";
import AddonsCode from "./addons.vue?raw";

import Grouped from "./grouped.vue";
import GroupedCode from "./grouped.vue?raw";

import Horizontal from "./horizontal.vue";
import HorizontalCode from "./horizontal.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="addons">Addons</h3>
    <ExampleViewer :component="Addons" :code="AddonsCode" />

    <h3 id="grouped">Grouped</h3>
    <ExampleViewer :component="Grouped" :code="GroupedCode" />

    <h3 id="horizontal">Horizontal</h3>
    <ExampleViewer :component="Horizontal" :code="HorizontalCode" />

    <h3 id="field-slots">Slots</h3>
    <ExampleViewer :component="Slots" :code="SlotsCode" />
</template>
