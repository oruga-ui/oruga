<script setup>
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Autocomplete from "./autocomplete.vue";
import AutocompleteCode from "./autocomplete.vue?raw";

import CustomSelected from "./custom-selected.vue";
import CustomSelectedCode from "./custom-selected.vue?raw";

import Limits from "./limits.vue";
import LimitsCode from "./limits.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="autocomplete">Autocomplete</h3>
    <ExampleViewer :component="Autocomplete" :code="AutocompleteCode" />

    <h3 id="custom">Custom selected</h3>
    <ExampleViewer :component="CustomSelected" :code="CustomSelectedCode" />

    <h3 id="limits">Limits</h3>
    <ExampleViewer :component="Limits" :code="LimitsCode" />
</template>
