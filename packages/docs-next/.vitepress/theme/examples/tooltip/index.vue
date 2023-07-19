<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Multiline from "./multiline.vue";
import MultilineCode from "./multiline.vue?raw";

import Slot from "./slot.vue";
import SlotCode from "./slot.vue?raw";

import Toggle from "./toggle.vue";
import ToggleCode from "./toggle.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="multiline">Multiline</h3>
    <ExampleViewer :component="Multiline" :code="MultilineCode" />

    <h3 id="slot">Slot</h3>
    <ExampleViewer :component="Slot" :code="SlotCode" />

    <h3 id="toggle">Toggle</h3>
    <ExampleViewer :component="Toggle" :code="ToggleCode" />
</template>
