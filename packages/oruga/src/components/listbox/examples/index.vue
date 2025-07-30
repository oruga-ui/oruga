<script setup lang="ts">
import Base from "./base.vue";
import BaseCode from "./base.vue?raw";
</script>

<template>
    <h3 id="base">Base</h3>
    <p>
        Listbox is used with the v-model property for two-way value binding
        along with the options collection. Label and value of an option are
        defined with the optionLabel and optionValue properties respectively.
        Note that, when options are simple primitive values such as a string
        array, no optionLabel and optionValue would be necessary.
    </p>
    <ExampleViewer :component="Base" :code="BaseCode" />
</template>
