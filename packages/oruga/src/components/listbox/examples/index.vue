<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";
import Multiple from "./multiple.vue";
import MultipleCode from "./multiple.vue?raw";
import Filterable from "./filterable.vue";
import FilterableCode from "./filterable.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>Listbox is used to select one or more values from a list of items.</p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="options">Options</h3>
    <p>
        Listbox is used with the <code>v-model</code> property for two-way value
        binding along with the options collection. Label and value of an option
        are defined with the optionLabel and optionValue properties
        respectively. Note that, when options are simple primitive values such
        as a string array, no optionLabel and optionValue would be necessary.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />

    <h3 id="multiple">Multiple</h3>
    <p>Listbox is used to select one or more values from a list of items.</p>
    <ExampleViewer :component="Multiple" :code="MultipleCode" />

    <h3 id="filterable">Filterable</h3>
    <p>
        Listbox provides built-in filtering that is enabled by adding the
        <code>filterable</code> property.
    </p>
    <ExampleViewer :component="Filterable" :code="FilterableCode" />

    <h3 id="scroll">Scroll</h3>
    <p>Listbox is used to select one or more values from a list of items.</p>
    <ExampleViewer :component="Base" :code="BaseCode" />
</template>
