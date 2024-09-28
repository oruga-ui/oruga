<script setup lang="ts">
import { ref } from "vue";
import type { OptionsItem } from "@oruga-ui/oruga-next";

// const options = [
//     "Angular",
//     "Angular 2",
//     "Aurelia",
//     "Backbone",
//     "Ember",
//     "jQuery",
//     "Meteor",
//     "Node.js",
//     "Polymer",
//     "React",
//     "RxJS",
//     "Vue.js",
// ];

const options: OptionsItem<string>[] = [
    { label: "Flint", value: "flint" },
    { label: "Silver", value: "silver" },
    { label: "Vane", value: "vane" },
    { label: "Billy", value: "billy" },
    { label: "Jack", value: "silver", attrs: { disabled: true } },
];

const selected = ref();
</script>

<template>
    <section>
        <o-field label="Find a JS framework">
            <o-autocomplete
                v-model="selected"
                :options="options"
                rounded
                expanded
                placeholder="e.g. jQuery"
                icon="search"
                clearable
                open-on-focus>
                <template #empty>No results found</template>
            </o-autocomplete>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
