<script setup lang="ts">
import { ref } from "vue";
import type { TreeOptions } from "@oruga-ui/oruga-next";

const options: TreeOptions<string> = [
    "Tyrion Lannister",
    "Jamie Lannister",
    "Daenerys Targaryen",
    "Jon Snow",
];

const selected = ref<string>();
</script>

<template>
    <section>
        <o-tree :options="options" selectable />

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
