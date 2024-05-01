<script setup>
import Programmatic from "./programmatic.vue";
import ProgrammaticCode from "./programmatic.vue?raw";

import Base from "./base.vue";
import BaseCode from "./base.vue?raw";

import Variants from "./variants.vue";
import VariantsCode from "./variants.vue?raw";

import UseTypes from "./use-types.vue";
import UseTypesCode from "./use-types.vue?raw";

import AddCustomButtons from "./add-custom-buttons.vue";
import AddCustomButtonsCode from "./add-custom-buttons.vue?raw";

import Programmatically from "./programmatically.vue";
import ProgrammaticallyCode from "./programmatically.vue?raw";
</script>

<template>
    <h3 id="programmatic">programmatic use</h3>
    <ExampleViewer :component="Programmatic" :code="ProgrammaticCode" />

    <h3 id="base">Base</h3>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="variants">Variants</h3>
    <ExampleViewer :component="Variants" :code="VariantsCode" />

    <h3 id="types">Use types</h3>
    <ExampleViewer :component="UseTypes" :code="UseTypesCode" />

    <h3 id="custom">Add custom buttons</h3>
    <ExampleViewer :component="AddCustomButtons" :code="AddCustomButtonsCode" />

    <h3 id="programmatically">Programmatically opening</h3>
    <ExampleViewer :component="Programmatically" :code="ProgrammaticallyCode" />
</template>
