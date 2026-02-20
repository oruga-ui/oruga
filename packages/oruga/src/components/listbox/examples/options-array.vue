<script setup lang="ts">
import { ref } from "vue";
import type { ListboxOptions } from "@oruga-ui/oruga-next";

const options: ListboxOptions<string> = [
    { label: "Flint", value: "flint" },
    { label: "Silver", value: "silver" },
    { label: "Vane", value: "vane" },
    { label: "Billy", value: "billy" },
];

const selected = ref<string>();
</script>

<template>
    <section>
        <o-listbox v-model="selected" :options="options" />

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
