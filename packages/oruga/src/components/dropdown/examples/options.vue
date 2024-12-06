<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp, OptionsPropWithGroups } from "@oruga-ui/oruga-next";

const options: OptionsProp<string> = [
    { label: "Flint", value: "flint" },
    { label: "Silver", value: "silver" },
    { label: "Vane", value: "vane" },
    { label: "Billy", value: "billy" },
];

const selected = ref<string>();

const groupOptions: OptionsPropWithGroups<string> = [
    {
        group: "Black Sails",
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
        group: "Breaking Bad",
        attrs: { disabled: true },
        options: {
            heisenberg: "Heisenberg",
            jesse: "Jesse",
            saul: "Saul",
            mike: "Mike",
        },
    },
    {
        group: "Game of Thrones",
        attrs: { disabled: true },
        options: [
            "Tyrion Lannister",
            "Jamie Lannister",
            "Daenerys Targaryen",
            "Jon Snow",
        ],
    },
];

const groupSelected = ref<string>();
</script>

<template>
    <section class="odocs-spaced">
        <o-field grouped>
            <o-field label="Options">
                <o-dropdown
                    v-model="selected"
                    :options="options"
                    selectable
                    aria-label="options example">
                    <template #trigger="{ active }">
                        <o-button
                            variant="primary"
                            label="Click me!"
                            :icon-right="active ? 'caret-up' : 'caret-down'" />
                    </template>
                </o-dropdown>

                <p><b>Selected:</b> {{ selected }}</p>
            </o-field>

            <o-field label="Grouped Options">
                <o-dropdown
                    v-model="groupSelected"
                    :options="groupOptions"
                    selectable
                    scrollable
                    aria-label="group example">
                    <template #trigger="{ active }">
                        <o-button
                            variant="primary"
                            label="Click me!"
                            :icon-right="active ? 'caret-up' : 'caret-down'" />
                    </template>
                </o-dropdown>

                <p><b>Selected:</b> {{ groupSelected }}</p>
            </o-field>
        </o-field>
    </section>
</template>
