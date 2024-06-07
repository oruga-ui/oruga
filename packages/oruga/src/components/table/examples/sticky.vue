<script setup lang="ts">
import { ref } from "vue";
// @ts-expect-error Examples are loaded differently.
import type { TableColumn } from "../../../../dist/oruga";

const columns = ref<TableColumn[]>([
    {
        field: "id",
        label: "ID",
        width: "40",
        numeric: true,
        sticky: true,
        thAttrs: () => ({ class: "is-sticky-column-one" }),
        tdAttrs: () => ({ class: "is-sticky-column-one" }),
    },
    {
        field: "user.first_name",
        label: "First Name",
    },
    {
        field: "user.last_name",
        label: "Last Name",
    },
    {
        field: "date",
        label: "Date",
        position: "centered",
        sticky: true,
        thAttrs: () => ({ class: "is-sticky-column-two" }),
        tdAttrs: () => ({ class: "is-sticky-column-two" }),
    },
    {
        field: "gender",
        label: "Gender",
    },
    {
        field: "id",
        label: "Column A",
    },
    {
        field: "id",
        label: "Column B",
    },
    {
        field: "id",
        label: "Column C",
    },
    {
        field: "id",
        label: "Column D",
    },
    {
        field: "id",
        label: "Column E",
    },
    {
        field: "id",
        label: "Column F",
    },
    {
        field: "id",
        label: "Column G",
    },
    {
        field: "id",
        label: "Column H",
    },
    {
        field: "id",
        label: "Column I",
    },
    {
        field: "id",
        label: "Column L",
    },
    {
        field: "id",
        label: "Column M",
    },
    {
        field: "id",
        label: "Column N",
    },
    {
        field: "id",
        label: "Column O",
    },
]);

const data = ref([
    {
        id: 1,
        user: { first_name: "Jesse", last_name: "Simmons" },
        date: "2016/10/15 13:43:27",
        gender: "Male",
    },
    {
        id: 2,
        user: { first_name: "John", last_name: "Jacobs" },
        date: "2016/12/15 06:00:53",
        gender: "Male",
    },
    {
        id: 3,
        user: { first_name: "Tina", last_name: "Gilbert" },
        date: "2016/04/26 06:26:28",
        gender: "Female",
    },
    {
        id: 4,
        user: { first_name: "Clarence", last_name: "Flores" },
        date: "2016/04/10 10:28:46",
        gender: "Male",
    },
    {
        id: 5,
        user: { first_name: "Anne", last_name: "Lee" },
        date: "2016/12/06 14:38:38",
        gender: "Female",
    },
]);

const stickyHeaders = ref(true);
</script>

<template>
    <section>
        <o-field grouped>
            <o-switch v-model="stickyHeaders" label="Sticky Headers" />
        </o-field>

        <o-table
            :data="data"
            :columns="columns"
            :sticky-header="stickyHeaders" />
    </section>
</template>

<style lang="scss">
.is-sticky-column-one {
    background: #006724 !important;
    color: white !important;
}
.is-sticky-column-two {
    background: #167df0 !important;
    color: white !important;
}
</style>
