<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import MinMaxDate from "./min-max-date.vue";
import MinMaxDateCode from "./min-max-date.vue?raw";

import Slot from "./Slot.vue";
import SlotCode from "./Slot.vue?raw";

import Granularity from "./granularity.vue";
import GranularityCode from "./granularity.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="inline">Inline</h3>
    <ExampleViewer :component="Inline" :code="InlineCode" />

    <h3 id="min_max">Min/Max date</h3>
    <ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

    <h3 id="slot">Slot</h3>
    <ExampleViewer :component="Slot" :code="SlotCode" />

    <h3 id="granularity">Granularity</h3>
    <ExampleViewer :component="Granularity" :code="GranularityCode" />
</template>
