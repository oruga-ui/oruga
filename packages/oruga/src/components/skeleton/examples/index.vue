<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Circle from "./circle.vue";
import CircleCode from "./circle.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="circle">Circle</h3>
    <ExampleViewer :component="Circle" :code="CircleCode" />

    <h3 id="sizes">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="position">Position</h3>
    <ExampleViewer :component="Position" :code="PositionCode" />
</template>
