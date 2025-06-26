<script setup lang="ts">
import { ref } from "vue";

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
</script>

<template>
    <section>
        <o-table :data="data">
            <o-table-column field="id" label="Id" width="40" numeric sortable />
            <o-table-column field="first_name" label="First Name" sortable />
            <o-table-column field="last_name" label="Last Name" sortable />
            <o-table-column
                field="date"
                label="Date"
                position="centered"
                sortable />
            <o-table-column field="gender" label="Gender" sortable />
        </o-table>
    </section>
</template>
