<script setup lang="ts">
import { ref } from "vue";
import type { TreeOptions } from "@oruga-ui/oruga-next";

const options: TreeOptions<string> = {
    heisenberg: "Heisenberg",
    jesse: "Jesse",
    saul: "Saul",
    mike: "Mike",
    jack: "Jack",
};

const selected = ref<string>();
</script>

<template>
    <section>
        <o-tree v-model="selected" :options="options" selectable />

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
