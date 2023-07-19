<script setup>
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
        <p class="content"><b>Selected:</b> {{ selected }}</p>
        <o-field label="Find a JS framework">
            <o-autocomplete
                v-model="name"
                rounded
                expanded
                placeholder="e.g. jQuery"
                icon="search"
                clearable
                :data="filteredDataArray"
                @select="(option) => (selected = option)">
                <template #empty>No results found</template>
            </o-autocomplete>
        </o-field>
    </section>
</template>
