<script setup lang="ts">
import { ref } from "vue";
import type { TableColumn } from "@oruga-ui/oruga-next";

const data = [
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
    {
        id: 6,
        first_name: "Bonita",
        last_name: "Cortez",
        date: "2016-03-03 10:28:46",
        gender: "Female",
    },
    {
        id: 7,
        first_name: "Randolf",
        last_name: "Mayor",
        date: "2016-07-04 14:38:39",
        gender: "Male",
    },
];

const columns: TableColumn<(typeof data)[number]>[] = [
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
];

const checkboxPosition = ref<"left" | "right">("left");
const checkedRows = ref([data[1], data[3]]);
const keepChecked = ref(false);
</script>

<template>
    <section>
        <o-field grouped multiline>
            <o-button
                variant="danger"
                :disabled="!checkedRows.length"
                icon-left="times"
                label="Clear checked"
                @click="checkedRows = []" />
            <o-select v-model="checkboxPosition" aria-label="Checkbox position">
                <option value="left">Checkbox at left</option>
                <option value="right">Checkbox at right</option>
            </o-select>
            <o-switch v-model="keepChecked" label="Keep Checked" />
        </o-field>

        <o-table
            v-model:checked-rows="checkedRows"
            :data="data"
            :columns="columns"
            row-key="id"
            checkable
            paginated
            :keep-checked="keepChecked"
            :per-page="5"
            :is-row-checkable="(row) => row.id !== 3 && row.id !== 4"
            :checkbox-position="checkboxPosition">
            <template #bottomLeft>
                <b>Total checked</b>: {{ checkedRows.length }}
            </template>
        </o-table>
    </section>
</template>
