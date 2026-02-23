<script setup lang="ts">
import { ref } from "vue";
import type { ListboxOptions } from "@oruga-ui/oruga-next";

const options: ListboxOptions<string> = [
    { label: "New York", value: "NY" },
    { label: "Rome", value: "RM" },
    { label: "London", value: "LDN" },
    { label: "Istanbul", value: "IST" },
    { label: "Paris", value: "PRS" },
];

const selected = ref<string>();
</script>

<template>
    <section class="odocs-spaced">
        <o-listbox
            v-model="selected"
            :options="options"
            filterable
            filter-placeholder="Search..."
            empty-label="No Results." />

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
