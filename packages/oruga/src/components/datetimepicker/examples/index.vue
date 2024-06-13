<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import FooterSlot from "./footer-slot.vue";
import FooterSlotCode from "./footer-slot.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";

import MinMax from "./min-max.vue";
import MinMaxCode from "./min-max.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="inline">Inline</h3>
    <ExampleViewer :component="Inline" :code="InlineCode" />

    <h3 id="footer">Footer slot</h3>
    <ExampleViewer :component="FooterSlot" :code="FooterSlotCode" />

    <h3 id="min_max">Min/Max Datetime</h3>
    <ExampleViewer :component="MinMax" :code="MinMaxCode" />
</template>
