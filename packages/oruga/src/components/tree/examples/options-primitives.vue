<script setup lang="ts">
import type { TreeOptions } from "@oruga-ui/oruga-next";

const options: TreeOptions<string> = [
    "Tyrion Lannister",
    "Jamie Lannister",
    "Daenerys Targaryen",
    "Jon Snow",
];
</script>

<template>
    <section>
        <o-tree :options="options" />
    </section>
</template>
