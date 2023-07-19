<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import WithIcons from "./with-icons.vue";
import WithIconsCode from "./with-icons.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="icons">With Icons</h3>
    <ExampleViewer :component="WithIcons" :code="WithIconsCode" />
</template>
