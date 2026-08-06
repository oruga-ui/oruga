<script setup lang="ts">
import { ref } from "vue";
import type { ListboxOptions } from "@oruga-ui/oruga-next";

const options: ListboxOptions<string> = [
    {
        label: "Black Sails",
        disabled: true,
        options: [
            { label: "Flint", value: "flint", icon: "user" },
            { label: "Silver", value: "silver", icon: "user" },
            { label: "Vane", value: "vane", icon: "user" },
            { label: "Billy", value: "billy", icon: "user" },
            { label: "Jack", value: "jack", disabled: true, icon: "user" },
        ],
    },
    {
        label: "Breaking Bad",
        disabled: true,
        options: {
            heisenberg: "Heisenberg",
            jesse: "Jesse",
            saul: "Saul",
            mike: "Mike",
        },
    },
    {
        label: "Game of Thrones",
        disabled: true,
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
        <o-listbox v-model="selected" :options="options" />

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
