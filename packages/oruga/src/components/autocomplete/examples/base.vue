<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp } from "@oruga-ui/oruga-next";

const options: OptionsProp<string> = [
    "Angular",
    "Angular 2",
    "Aurelia",
    "Backbone",
    "Ember",
    "jQuery",
    "Meteor",
    "Node.js",
    "Polymer",
    "React",
    "RxJS",
    "Vue.js",
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
