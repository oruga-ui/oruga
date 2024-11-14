<script setup lang="ts">
import { ref } from "vue";
import type { TableColumn } from "@oruga-ui/oruga-next";

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

const columns = ref<TableColumn<(typeof data.value)[number]>[]>([
    {
        field: "id",
        label: "ID",
        width: "40",
        numeric: true,
        sortable: true,
    },
    {
        field: "first_name",
        label: "First Name",
        sortable: true,
    },
    {
        field: "last_name",
        label: "Last Name",
        sortable: true,
    },
    {
        field: "date",
        label: "Date",
        position: "centered",
        sortable: true,
        formatter: (v): string => new Date(String(v)).toLocaleDateString(),
    },
    {
        field: "gender",
        label: "Gender",
        sortable: true,
    },
]);
</script>

<template>
    <section>
        <o-table :data="data" :columns="columns" />
    </section>
</template>
