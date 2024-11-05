<script setup lang="ts">
import { ref } from "vue";

const data = ref([
    {
        name: "Board Games",
        sold: 131,
        available: 301,
        items: [
            {
                name: "Monopoly",
                sold: 57,
                available: 100,
            },
            {
                name: "Scrabble",
                sold: 23,
                available: 84,
            },
            {
                name: "Chess",
                sold: 37,
                available: 61,
            },
            {
                name: "Battleships",
                sold: 14,
                available: 56,
            },
        ],
    },
    {
        name: "Jigsaws & Puzzles",
        sold: 88,
        available: 167,
        items: [
            {
                name: "World Map",
                sold: 31,
                available: 38,
            },
            {
                name: "London",
                sold: 23,
                available: 29,
            },
            {
                name: "Sharks",
                sold: 20,
                available: 44,
            },
            {
                name: "Disney",
                sold: 14,
                available: 56,
            },
        ],
    },
    {
        name: "Books",
        sold: 434,
        available: 721,
        items: [
            {
                name: "Hamlet",
                sold: 101,
                available: 187,
            },
            {
                name: "The Lord Of The Rings",
                sold: 85,
                available: 156,
            },
            {
                name: "To Kill a Mockingbird",
                sold: 78,
                available: 131,
            },
            {
                name: "Catch-22",
                sold: 73,
                available: 98,
            },
            {
                name: "Frankenstein",
                sold: 51,
                available: 81,
            },
            {
                name: "Alice's Adventures In Wonderland",
                sold: 46,
                available: 68,
            },
        ],
    },
]);

const columnsVisible = ref({
    name: { title: "Name", display: true },
    sold: { title: "Stock Sold", display: true },
    available: { title: "Stock Available", display: true },
    cleared: { title: "Stock Cleared", display: true },
});
const showDetailIcon = ref(true);
const showDefaultDetail = ref(true);
const detailedRows = ref([data.value[0]]);
</script>

<template>
    <section>
        <o-field grouped group-multiline>
            <o-checkbox v-model="showDetailIcon" label="Show detail chevron" />
            <o-checkbox
                v-model="showDefaultDetail"
                label="Custom detail column" />
            <div v-for="(column, index) in columnsVisible" :key="index">
                <o-checkbox
                    v-model="column.display"
                    :label="`Show column '${column.title}'`" />
            </div>
        </o-field>

        <o-table
            :data="data"
            detailed
            hoverable
            row-key="name"
            :detailed-rows="detailedRows"
            :default-sort="['name', 'asc']"
            :custom-detail-row="!showDefaultDetail"
            :show-detail-icon="showDetailIcon">
            <o-table-column
                v-slot="{ row, toggleDetails }"
                field="name"
                :visible="columnsVisible['name'].display"
                :label="columnsVisible['name'].title"
                width="300"
                sortable>
                <template v-if="showDetailIcon">
                    {{ row.name }}
                </template>

                <button v-else @click="toggleDetails()">
                    {{ row.name }}
                </button>
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                field="sold"
                :visible="columnsVisible['sold'].display"
                :label="columnsVisible['sold'].title"
                sortable
                position="centered">
                {{ row.sold }}
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                field="available"
                :visible="columnsVisible['available'].display"
                :label="columnsVisible['available'].title"
                sortable
                position="centered">
                {{ row.available }}
            </o-table-column>

            <o-table-column
                v-slot="{ row }"
                :visible="columnsVisible['cleared'].display"
                :label="columnsVisible['cleared'].title"
                position="centered">
                <span>
                    {{ Math.round((row.sold / row.available) * 100) }}%
                </span>
            </o-table-column>

            <template #detail="{ row }">
                <tr
                    v-for="item in (row as (typeof data)[number]).items"
                    :key="item.name">
                    <td v-if="showDetailIcon"></td>
                    <td v-show="columnsVisible['name'].display">
                        {{ item.name }}
                    </td>
                    <td v-show="columnsVisible['sold'].display">
                        {{ item.sold }}
                    </td>
                    <td v-show="columnsVisible['available'].display">
                        {{ item.available }}
                    </td>
                    <td v-show="columnsVisible['cleared'].display">
                        <span>
                            {{
                                Math.round((item.sold / item.available) * 100)
                            }}%
                        </span>
                    </td>
                </tr>
            </template>
        </o-table>
    </section>
</template>
