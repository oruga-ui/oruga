<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Separators from "./separators.vue";
import SeparatorsCode from "./separators.vue?raw";

import Icons from "./icons.vue";
import IconsCode from "./icons.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";

import Positions from "./positions.vue";
import PositionsCode from "./positions.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="styles">Separators</h3>
    <ExampleViewer :component="Separators" :code="SeparatorsCode" />

    <h3 id="icons">Icons</h3>
    <ExampleViewer :component="Icons" :code="IconsCode" />

    <h3 id="sizes">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="positions">Positions</h3>
    <ExampleViewer :component="Positions" :code="PositionsCode" />
</template>
