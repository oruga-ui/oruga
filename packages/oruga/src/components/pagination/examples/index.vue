<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Customise from "./customise.vue";
import CustomiseCode from "./customise.vue?raw";

import Slots from "./slots.vue";
import SlotsCode from "./slots.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="customise">Customise</h3>
    <ExampleViewer :component="Customise" :code="CustomiseCode" />

    <h3 id="slots">Slots</h3>
    <p>Use slots to override the specific buttons.</p>
    <ExampleViewer :component="Slots" :code="SlotsCode" />
</template>
