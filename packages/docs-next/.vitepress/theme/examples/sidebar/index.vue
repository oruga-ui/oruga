<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Static from "./static.vue";
import StaticCode from "./static.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="static">Static</h3>
    <ExampleViewer :component="Static" :code="StaticCode" />
</template>
