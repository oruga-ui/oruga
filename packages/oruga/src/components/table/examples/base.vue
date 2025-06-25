<script setup lang="ts">
/****************************************
 * THIS CHANGE IS ONLY FOR TEST PURPOSE
 ******************************************/
import { OButton, OTable, OTableColumn } from "@oruga-ui/oruga-next";
import { ref } from "vue";

const data = ref([]);

const random_words = [
    "apple",
    "beach",
    "cloud",
    "dance",
    "eagle",
    "flame",
    "grace",
    "heart",
    "image",
    "jolly",
    "knife",
    "light",
    "music",
    "noble",
    "ocean",
    "peace",
    "quick",
    "river",
    "storm",
    "table",
    "under",
    "voice",
    "water",
    "youth",
    "zebra",
    "amber",
    "blend",
    "craft",
    "dream",
    "earth",
    "frost",
    "green",
];

let lastId = 1;

function add(): void {
    // @ts-ignore
    data.value.push({
        id: lastId,
        name: random_words[Math.floor(Math.random() * random_words.length)],
    });
    lastId++;
}

function replace(): void {
    const data_copy = data.value.slice();
    data.value = data_copy;
}
</script>

<template>
    <OButton @click="add">Add record</OButton>
    <OButton @click="replace">Replace recordset</OButton>

    <OTable :data="data" paginated :per-page="5" default-sort="name">
        <OTableColumn label="Name" field="name" sortable />
    </OTable>
</template>
