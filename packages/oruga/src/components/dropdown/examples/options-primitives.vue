<script setup lang="ts">
import { ref } from "vue";
import type { DropdownOptions } from "@oruga-ui/oruga-next";

const options: DropdownOptions<string> = [
    "Tyrion Lannister",
    "Jamie Lannister",
    "Daenerys Targaryen",
    "Jon Snow",
];

const selected = ref<string>();
</script>

<template>
    <section>
        <o-dropdown
            v-model="selected"
            :options="options"
            selectable
            aria-label="options example">
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Open Dropdown"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>
        </o-dropdown>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
