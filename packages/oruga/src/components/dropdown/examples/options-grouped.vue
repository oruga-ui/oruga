<script setup lang="ts">
import { ref } from "vue";
import type { DropdownOptions } from "@oruga-ui/oruga-next";

const options: DropdownOptions<string> = [
    {
        label: "Black Sails",
        attrs: { disabled: true },
        options: [
            { label: "Flint", value: "flint" },
            { label: "Silver", value: "silver" },
            { label: "Vane", value: "vane" },
            { label: "Billy", value: "billy" },
            { label: "Jack", value: "jack", disabled: true },
        ],
    },
    {
        label: "Breaking Bad",
        attrs: { disabled: true },
        options: {
            heisenberg: "Heisenberg",
            jesse: "Jesse",
            saul: "Saul",
            mike: "Mike",
        },
    },
    {
        label: "Game of Thrones",
        attrs: { disabled: true },
        options: [
            "Tyrion Lannister",
            "Jamie Lannister",
            "Daenerys Targaryen",
            "Jon Snow",
        ],
    },
];

const selected = ref<string>();
</script>

<template>
    <section>
        <o-dropdown
            v-model="selected"
            :options="options"
            selectable
            scrollable
            aria-label="group example">
            <template #trigger="{ active }">
                <o-button
                    variant="primary"
                    label="Open Dropdown!"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>
        </o-dropdown>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
