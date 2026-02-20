<script setup lang="ts">
import type { TreeOptions } from "@oruga-ui/oruga-next";

const options: TreeOptions<string> = [
    { label: "Flint", value: "flint" },
    { label: "Silver", value: "silver" },
    { label: "Vane", value: "vane" },
    { label: "Billy", value: "billy" },
];
</script>

<template>
    <section>
        <o-tree :options="options" />
    </section>
</template>
