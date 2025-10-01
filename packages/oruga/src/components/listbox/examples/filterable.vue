<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp } from "@/composables";

const selectedValue = ref();

const options: OptionsProp = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
];
</script>

<template>
    <section class="odocs-spaced">
        <o-listbox v-model="selectedValue" :options="options" filterable />

        <p><b>Selected:</b> {{ selectedValue }}</p>
    </section>
</template>
