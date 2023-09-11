<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";

import Scrollable from "./scrollable.vue";
import ScrollableCode from "./scrollable.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="multiple">Multiple</h3>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="scrollable">Scrollable</h3>
    <ExampleViewer :component="Scrollable" :code="ScrollableCode" />

    <h3 id="position">Position</h3>
    <ExampleViewer :component="Position" :code="PositionCode" />
</template>
