<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";

import Selection from "./selection.vue";
import SelectionCode from "./selection.vue?raw";

import Scroll from "./scroll.vue";
import ScrollCode from "./scroll.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="selection">Selection</h3>
    <ExampleViewer :component="Selection" :code="SelectionCode" />

    <h3 id="options">Options</h3>
    <ExampleViewer :component="Options" :code="OptionsCode" />

    <h3 id="scroll">Infinite Scroll</h3>
    <ExampleViewer :component="Scroll" :code="ScrollCode" />
</template>
