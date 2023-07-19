<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import MinMaxDate from "./min-max-date.vue";
import MinMaxDateCode from "./min-max-date.vue?raw";

import Footer from "./footer.vue";
import FooterCode from "./footer.vue?raw";

import Granularity from "./granularity.vue";
import GranularityCode from "./granularity.vue?raw";

import Inline from "./inline.vue";
import InlineCode from "./inline.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="min_max">Min/Max date</h3>
    <ExampleViewer :component="MinMaxDate" :code="MinMaxDateCode" />

    <h3 id="footer">Footer</h3>
    <ExampleViewer :component="Footer" :code="FooterCode" />

    <h3 id="granularity">Granularity</h3>
    <ExampleViewer :component="Granularity" :code="GranularityCode" />

    <h3 id="inline">Inline</h3>
    <ExampleViewer :component="Inline" :code="InlineCode" />
</template>
