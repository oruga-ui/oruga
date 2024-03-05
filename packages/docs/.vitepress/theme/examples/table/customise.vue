<script setup>
import { ref } from "vue";

const tableData = [
    {
        id: 1,
        first_name: "Jesse",
        last_name: "Simmons",
        date: "2016/10/15 13:43:27",
        gender: "Male",
    },
    {
        id: 2,
        first_name: "John",
        last_name: "Jacobs",
        date: "2016/12/15 06:00:53",
        gender: "Male",
    },
    {
        id: 3,
        first_name: "Tina",
        last_name: "Gilbert",
        date: "2016/04/26 06:26:28",
        gender: "Female",
    },
    {
        id: 4,
        first_name: "Clarence",
        last_name: "Flores",
        date: "2016/04/10 10:28:46",
        gender: "Male",
    },
    {
        id: 5,
        first_name: "Anne",
        last_name: "Lee",
        date: "2016/12/06 14:38:38",
        gender: "Female",
    },
];

const isEmpty = ref(false);
const isBordered = ref(false);
const isStriped = ref(false);
const isNarrowed = ref(false);
const isHoverable = ref(false);
const isFocusable = ref(false);
const isCheckbale = ref(false);
const isLoading = ref(false);
const data = ref(tableData);
const hasMobileCards = ref(true);
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-switch v-model="isBordered" label="Bordered" />
            <o-switch v-model="isStriped" label="Striped" />
            <o-switch v-model="isNarrowed" label="Narrowed" />
            <o-switch v-model="isHoverable" label="Hoverable" />
            <o-switch v-model="isFocusable" label="Focusable" />
            <o-switch v-model="isCheckbale" label="Checkable" />
            <o-switch v-model="isLoading" label="Loading state" />
            <o-switch v-model="isEmpty" label="Empty" />
            <o-switch v-model="hasMobileCards">
                Mobile cards
                <small>(collapsed rows) </small>
            </o-switch>
        </o-field>

        <o-table
            :data="isEmpty ? [] : data"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :checkable="isCheckbale"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards">
            <o-table-column
                v-slot="props"
                field="id"
                label="ID"
                width="40"
                numeric>
                {{ props.row.value.id }}
            </o-table-column>

            <o-table-column
                v-slot="props"
                field="first_name"
                label="First Name">
                {{ props.row.value.first_name }}
            </o-table-column>

            <o-table-column v-slot="props" field="last_name" label="Last Name">
                {{ props.row.value.last_name }}
            </o-table-column>

            <o-table-column
                v-slot="props"
                field="date"
                label="Date"
                position="centered">
                {{ new Date(props.row.value.date).toLocaleDateString() }}
            </o-table-column>

            <o-table-column v-slot="props" label="Gender">
                <o-icon
                    pack="fas"
                    :icon="
                        props.row.value.gender === 'Male' ? 'mars' : 'venus'
                    " />
                {{ props.row.value.gender }}
            </o-table-column>
        </o-table>
    </section>
</template>
