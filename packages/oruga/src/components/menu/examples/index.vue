<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />
</template>
