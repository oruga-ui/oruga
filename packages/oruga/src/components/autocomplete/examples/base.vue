<script setup lang="ts">
import { ref, computed } from "vue";

const data = [
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

const name = ref("");
const selected = ref();

const filteredDataArray = computed(() =>
    data.filter(
        (option) =>
            option.toString().toLowerCase().indexOf(name.value.toLowerCase()) >=
            0,
    ),
);
</script>

<template>
    <section>
        <o-field label="Find a JS framework">
            <o-autocomplete
                v-model="name"
                rounded
                expanded
                placeholder="e.g. jQuery"
                icon="search"
                clearable
                open-on-focus
                :data="filteredDataArray"
                @select="(option) => (selected = option)">
                <template #empty>No results found</template>
            </o-autocomplete>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
    </section>
</template>
