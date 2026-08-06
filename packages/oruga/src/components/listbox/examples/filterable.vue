<script setup lang="ts">
import { ref } from "vue";
import type { ListboxOptions } from "@oruga-ui/oruga-next";

const options: ListboxOptions<string> = [
    { label: "New York", value: "NY", icon: "check" },
    { label: "Rome", value: "RM", icon: "check" },
    { label: "London", value: "LDN", icon: "check" },
    { label: "Istanbul", value: "IST", icon: "check" },
    { label: "Paris", value: "PRS", icon: "check" },
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
