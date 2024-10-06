<script setup lang="ts">
import { ref } from "vue";
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
const selected = ref<string>();
</script>

<template>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <o-field label="Find a JS framework">
        <o-autocomplete
            v-model="name"
            rounded
            :data="data"
            placeholder="e.g. jQuery"
            icon="search"
            clearable
            @select="selected = $event">
            <template #empty>No results found</template>
        </o-autocomplete>
    </o-field>
</template>
