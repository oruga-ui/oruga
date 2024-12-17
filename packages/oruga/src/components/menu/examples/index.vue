<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Links from "./links.vue";
import LinksCode from "./links.vue?raw";

import Options from "./options.vue";
import OptionsCode from "./options.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="links">Links</h3>
    <ExampleViewer :component="Links" :code="LinksCode" />

    <h3 id="options">Options</h3>
    <ExampleViewer :component="Options" :code="OptionsCode" />
</template>
