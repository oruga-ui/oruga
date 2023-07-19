<script setup>
import { ref } from "vue";

const tableData = [
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
];

const data = ref(tableData);
const checkboxPosition = ref("left");
const checkedRows = ref([tableData[1], tableData[3]]);

const columns = ref([
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
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-button
                variant="danger"
                :disabled="!checkedRows.length"
                icon-left="times"
                @click="checkedRows = []">
                <span>Clear checked</span>
            </o-button>
            <o-select v-model="checkboxPosition">
                <option value="left">Checkbox at left</option>
                <option value="right">Checkbox at right</option>
            </o-select>
        </o-field>

        <o-table
            v-model:checked-rows="checkedRows"
            :data="data"
            :is-row-checkable="(row) => row.id !== 3 && row.id !== 4"
            checkable
            :checkbox-position="checkboxPosition">
            <o-table-column
                v-for="(column, idx) in columns"
                :key="idx"
                v-slot="{ row }"
                v-bind="column">
                {{ row[column.field] }}
            </o-table-column>
            <template #bottom-left>
                <b>Total checked</b>: {{ checkedRows.length }}
            </template>
        </o-table>
    </section>
</template>
