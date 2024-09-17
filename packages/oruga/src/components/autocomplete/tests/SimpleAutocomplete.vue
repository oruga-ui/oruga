<script setup lang="ts">
import { ref, computed } from "vue";
import OAutocomplete from "../Autocomplete.vue";
import OField from "../../field/Field.vue";

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
const selected = ref(null);

const filteredDataArray = computed((): string[] =>
    data.filter(
        (option: string) =>
            option.toLowerCase().indexOf(name.value.toLowerCase()) >= 0,
    ),
);

function select(option: string): void {
    selected.value = option;
}
</script>

<template>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a JS framework">
        <o-autocomplete
            v-model="name"
            rounded
            :data="filteredDataArray"
            placeholder="e.g. jQuery"
            icon="search"
            clearable
            @select="select">
            <template #empty>No results found</template>
        </o-autocomplete>
    </o-field>
</template>
