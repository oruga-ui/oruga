<script setup lang="ts">
import { ref } from "vue";
import type { OptionsProp } from "@oruga-ui/oruga-next";

const keepFirst = ref(false);
const keepOpen = ref(true);
const openOnFocus = ref(true);
const selectOnClose = ref(false);
const clearOnSelect = ref(false);

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
    <section class="odocs-spaced">
        <o-field grouped multiline>
            <o-switch v-model="keepFirst">Keep first</o-switch>
            <o-switch v-model="keepOpen">Keep open</o-switch>
            <o-switch v-model="openOnFocus">Open on focus</o-switch>
            <o-switch v-model="selectOnClose">Select on close</o-switch>
            <o-switch v-model="selectOnClose">Select on close</o-switch>
            <o-switch v-model="clearOnSelect">Clear on Select</o-switch>
        </o-field>

        <o-field label="Find a name">
            <o-autocomplete
                v-model="selected"
                :options="options"
                placeholder="e.g. Vue"
                icon="search"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                :keep-open="keepOpen"
                :clear-on-select="clearOnSelect"
                :select-on-close="selectOnClose">
                <template #empty> No results found </template>
            </o-autocomplete>

            <p><b>Selected:</b> {{ selected }}</p>
        </o-field>
    </section>
</template>
