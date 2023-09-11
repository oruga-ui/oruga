<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Accordion from "./accordion.vue";
import AccordionCode from "./accordion.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="accordion">Accordion</h3>
    <ExampleViewer :component="Accordion" :code="AccordionCode" />
</template>
