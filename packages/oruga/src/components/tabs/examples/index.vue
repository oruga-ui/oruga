<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import CustomHeader from "./custom-header.vue";
import CustomHeaderCode from "./custom-header.vue?raw";

import LongHeader from "./long-header.vue";
import LongHeaderCode from "./long-header.vue?raw";

import Vertical from "./vertical.vue";
import VerticalCode from "./vertical.vue?raw";

import Expanded from "./expanded.vue";
import ExpandedCode from "./expanded.vue?raw";

import Types from "./types.vue";
import TypesCode from "./types.vue?raw";

import Position from "./position.vue";
import PositionCode from "./position.vue?raw";

import Sizes from "./sizes.vue";
import SizesCode from "./sizes.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="types">Types</h3>
    <ExampleViewer :component="Types" :code="TypesCode" />

    <h3 id="position">Position</h3>
    <ExampleViewer :component="Position" :code="PositionCode" />

    <h3 id="expanded">Expanded</h3>
    <ExampleViewer :component="Expanded" :code="ExpandedCode" />

    <h3 id="sizes">Sizes</h3>
    <ExampleViewer :component="Sizes" :code="SizesCode" />

    <h3 id="vertical">Vertical</h3>
    <ExampleViewer :component="Vertical" :code="VerticalCode" />

    <h3 id="custom">Custom header</h3>
    <ExampleViewer :component="CustomHeader" :code="CustomHeaderCode" />

    <h3 id="long">Long header</h3>
    <ExampleViewer :component="LongHeader" :code="LongHeaderCode" />
</template>
