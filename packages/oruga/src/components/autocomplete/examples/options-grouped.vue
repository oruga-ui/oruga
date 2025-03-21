<script setup lang="ts">
import { ref } from "vue";
import type { OptionsPropWithGroups } from "@oruga-ui/oruga-next";

const groupOptions: OptionsPropWithGroups<string> = [
    {
        label: "Black Sails",
        attrs: { disabled: true },
        options: [
            { label: "Flint", value: "flint" },
            { label: "Silver", value: "silver" },
            { label: "Vane", value: "vane" },
            { label: "Billy", value: "billy" },
            { label: "Jack", value: "silver", attrs: { disabled: true } },
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

const groupSelected = ref();
</script>

<template>
    <section>
        <o-field label="Grouped Options">
            <o-autocomplete
                v-model="groupSelected"
                :options="groupOptions"
                placeholder="Find a name grouped by film..."
                open-on-focus>
                <template #header>Film Character Groups</template>
            </o-autocomplete>

            <p><b>Selected:</b> {{ groupSelected }}</p>
        </o-field>
    </section>
</template>
