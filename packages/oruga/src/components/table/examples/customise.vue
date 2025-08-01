<script setup lang="ts">
import { ref } from "vue";

const data = ref([
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
]);

const isEmpty = ref(false);
const isBordered = ref(false);
const isStriped = ref(false);
const isNarrowed = ref(false);
const isHoverable = ref(false);
const isSelectable = ref(false);
const isCheckbale = ref(false);
const isLoading = ref(false);
const hasMobileCards = ref(true);
</script>

<template>
    <section>
        <o-field grouped multiline>
            <o-switch v-model="isBordered" label="Bordered" />
            <o-switch v-model="isStriped" label="Striped" />
            <o-switch v-model="isNarrowed" label="Narrowed" />
            <o-switch v-model="isHoverable" label="Hoverable" />
            <o-switch v-model="isSelectable" label="Selectable" />
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
            :selectable="isSelectable"
            :mobile-cards="hasMobileCards"
            empty-label="Table is empty"
            empty-icon="frown">
            <template #before>
                <o-table-column
                    v-slot="{ row }"
                    field="id"
                    label="ID"
                    width="40"
                    numeric
                    sortable
                    :th-attrs="{ style: { color: 'red' } }">
                    {{ row.id }}
                </o-table-column>
            </template>

            <o-table-column
                v-slot="{ row }"
                field="first_name"
                label="First Name"
                sortable>
                {{ row.first_name }}
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                field="last_name"
                label="Last Name"
                sortable
                :th-attrs="{ style: { 'min-width': '120px' } }"
                :td-attrs="{ class: '...' }">
                {{ row.last_name }}
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                field="date"
                label="Date"
                subheading="local formatted"
                position="centered"
                sortable
                :th-attrs="{ style: { 'font-style': 'italic' } }">
                {{ new Date(row.date).toLocaleDateString() }}
            </o-table-column>

            <o-table-column label="Gender" sortable>
                <template #default="{ row }">
                    <o-icon
                        pack="fas"
                        :icon="row.gender === 'Male' ? 'mars' : 'venus'" />
                    {{ row.gender }}
                </template>

                <template #header="{ column }">
                    {{ column.label }}
                    <o-icon pack="fas" icon="mars" />
                    <o-icon pack="fas" icon="venus" />
                </template>

                <template #subheading> Male/Female </template>
            </o-table-column>

            <template #footer>
                <td colspan="5">Custom Footer</td>
            </template>
        </o-table>
    </section>
</template>
