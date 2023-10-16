<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Static from "./static.vue";
import StaticCode from "./static.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="static">Static</h3>
    <ExampleViewer :component="Static" :code="StaticCode" />

    <h3 id="programmatically">Programmatically</h3>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
</template>
