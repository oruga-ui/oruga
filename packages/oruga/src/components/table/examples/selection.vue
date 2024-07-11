<script setup lang="ts">
import { ref } from "vue";
import type { TableColumn } from "@oruga-ui/oruga-next";

const columns = ref<TableColumn[]>([
    {
        field: "id",
        label: "ID",
        width: "40",
        numeric: true,
    },
    {
        field: "first_name",
        label: "First Name",
    },
    {
        field: "last_name",
        label: "Last Name",
    },
    {
        field: "date",
        label: "Date",
        position: "centered",
    },
    {
        field: "gender",
        label: "Gender",
    },
]);

const data = ref([
    {
        id: 1,
        first_name: "Jesse",
        last_name: "Simmons",
        date: "2016-10-15 13:43:27",
        gender: "Male",
    },
    {
        id: 2,
        first_name: "John",
        last_name: "Jacobs",
        date: "2016-12-15 06:00:53",
        gender: "Male",
    },
    {
        id: 3,
        first_name: "Tina",
        last_name: "Gilbert",
        date: "2016-04-26 06:26:28",
        gender: "Female",
    },
    {
        id: 4,
        first_name: "Clarence",
        last_name: "Flores",
        date: "2016-04-10 10:28:46",
        gender: "Male",
    },
    {
        id: 5,
        first_name: "Anne",
        last_name: "Lee",
        date: "2016-12-06 14:38:38",
        gender: "Female",
    },
]);

const selected = ref(data.value[2]);
</script>

<template>
    <section>
        <o-button
            variant="danger"
            :disabled="!selected"
            icon-left="times"
            label="Clear selected"
            @click="selected = null" />

        <p><b>Selection:</b> {{ selected }}</p>

        <o-table
            v-model:selected="selected"
            :data="data"
            :columns="columns"
            selectable />
    </section>
</template>
