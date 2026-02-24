<script setup lang="ts">
import { ref } from "vue";
import type { ListboxOptions } from "@oruga-ui/oruga-next";

const options: ListboxOptions<string> = [
    "Tyrion Lannister",
    "Jamie Lannister",
    "Daenerys Targaryen",
    "Jon Snow",
];

const selected = ref<string>();
</script>

<template>
    <section>
        <o-listbox v-model="selected" :options="options" />

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
