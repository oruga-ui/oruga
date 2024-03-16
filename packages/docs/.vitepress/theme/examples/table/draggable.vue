<script setup>
import { ref } from "vue";
import { useOruga } from "../../../../../oruga/dist/oruga";

const oruga = useOruga();

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
        centered: true,
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

const draggingRow = ref(null);
const draggingRowIndex = ref(null);
const draggingColumnIndex = ref(null);
const draggingColumn = ref(null);

function dragstart(row, index, event) {
    draggingRow.value = row;
    draggingRowIndex.value = index;
    event.dataTransfer.effectAllowed = "copy";
}

function dragover(row, index, event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    event.target.closest("tr").classList.add("is-selected");
}

function dragleave(row, index, event) {
    event.preventDefault();
    event.target.closest("tr").classList.remove("is-selected");
}

function drop(row, index, event) {
    event.target.closest("tr").classList.remove("is-selected");
    const droppedOnRowIndex = index;
    oruga.notification.open(
        `Moved ${draggingRow.value.value.first_name} from row ${
            draggingRowIndex.value + 1
        } to ${droppedOnRowIndex + 1}`,
    );
}

function columndragstart(column, index, event) {
    draggingColumn.value = column;
    draggingColumnIndex.value = index;
    event.dataTransfer.effectAllowed = "copy";
}

function columndragover(column, index, event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    event.target.closest("th").classList.add("is-selected");
}

function columndragleave(column, index, event) {
    event.preventDefault();
    event.target.closest("th").classList.remove("is-selected");
}

function columndrop(column, index, event) {
    event.target.closest("th").classList.remove("is-selected");
    const droppedOnColumnIndex = index;
    oruga.notification.open(
        `Moved ${draggingColumn.value.field} from column ${
            draggingColumnIndex.value + 1
        } to ${droppedOnColumnIndex + 1}`,
    );
}
</script>

<template>
    <section>
        <p>
            Use <code>draggable</code>/<code>draggable-column</code> prop to
            allow rows and columns to be draggable. Manage dragging using
            <code>dragstart</code>/<code>columndragstart</code>,
            <code>dragover</code>/<code>columndragover </code> and
            <code>drop</code>/<code>columndrop</code> events
        </p>

        <o-table
            :data="data"
            :columns="columns"
            draggable
            draggable-column
            @dragstart="dragstart"
            @drop="drop"
            @dragover="dragover"
            @dragleave="dragleave"
            @columndragstart="columndragstart"
            @columndrop="columndrop"
            @columndragover="columndragover"
            @columndragleave="columndragleave" />
    </section>
</template>

<style lang="scss" scoped>
:deep(.is-selected) {
    background-color: lightblue;
}
</style>
