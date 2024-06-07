<script setup>
import { ref } from "vue";

const selected = ref(null);

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
];

const columns = [
    {
        field: "id",
        label: "ID",
        width: "40",
        numeric: true,
    },
    {
        field: "first_name",
        label: "First Name",
        searchable: true,
        sortable: true,
    },
    {
        field: "last_name",
        label: "Last Name",
        searchable: true,
    },
    {
        field: "date",
        label: "Date",
        sticky: true,
        position: "centered",
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
];

const inspectData = [
    {
        class: "rootClass",
        description: "Class of Table root element",
    },
    {
        class: "tableClass",
        description: "Class of the Table",
    },
    {
        class: "wrapperClass",
        description: "Class of the Table wrapper",
    },
    {
        class: "emptyClass",
        description: "Class of the Table when it is empty",
        action: (cmp, data) => {
            data.isEmpty = true;
        },
    },
    {
        class: "footerClass",
        description: "Class of the Table footer",
        action: (cmp, data) => {
            data.tableClass = "inspector_table";
        },
    },
    {
        class: "borderedClass",
        properties: ["bordered"],
        description: "Class of the Table when is bordered",
        action: (cmp, data) => {
            data.bordered = true;
        },
    },
    {
        class: "stripedClass",
        properties: ["striped"],
        description: "Class of the Table when rows are striped",
        action: (cmp, data) => {
            data.striped = true;
        },
    },
    {
        class: "detailedClass",
        description: "Class of the Table row detail",
        properties: ["detailed"],
        warning: "Expand details to see it in action!",
        action: (cmp, data) => {
            data.tableClass = "inspector_table";
            data.mobileCards = true;
        },
    },
    {
        class: "narrowedClass",
        properties: ["narrowed"],
        description: "Class of the Table when rows are narrowed",
        action: (cmp, data) => {
            data.narrowed = true;
        },
    },
    {
        class: "hoverableClass",
        properties: ["hoverable or focusable"],
        description: "Class of the Table when is hoverable",
        action: (cmp, data) => {
            data.hoverable = true;
        },
    },
    {
        class: "stickyHeaderClass",
        properties: ["sticky-header"],
        description: "Class of the Table wrapper when header is sticky",
        action: (cmp, data) => {
            data.stickyHeader = true;
        },
    },
    {
        class: "scrollableClass",
        properties: ["scrollable"],
        description:
            "Class of the Table wrapper when its content is scrollable",
        action: (cmp, data) => {
            data.scrollable = true;
        },
    },
    {
        class: "trSelectedClass",
        description: "Class of the Table row when selected",
        warning: "Select a row of the table to see it in action!",
        action: (cmp, data) => {
            data.tableClass = "inspector_table";
        },
    },
    {
        class: "trCheckedClass",
        description: "Class of the Table row when checkable and checked",
        warning: "Select a row of the table to see it in action!",
        properties: ["checkable"],
        action: (cmp, data) => {
            data.checkable = true;
        },
    },
    {
        class: "thClass",
        description: "Class of the Table `th` element",
    },
    {
        class: "thCheckboxClass",
        description: "Class of the Table `th` element when is checkable",
        properties: ["checkable"],
        action: (cmp, data) => {
            data.checkable = true;
        },
    },
    {
        class: "thDetailedClass",
        description:
            "Class of the Table `th` element of the detail column of triggers",
        properties: ["detailed"],
        action: (cmp, data) => {
            data.detailed = true;
        },
    },
    {
        class: "thCurrentSortClass",
        description: "Class of the Table `th` element currently sorted",
        warning:
            "Click on 'First Name' header to sort elements and see it in action!",
    },
    {
        class: "thSortableClass",
        description: "Class of the sortable Table `th` element",
        properties: ["sortable"],
    },
    {
        class: "thUnselectableClass",
        description: "Class of the Table `th` element that is unsortable",
        properties: ["!headerSelectable and sortable"],
    },
    {
        class: "thPositionClass",
        description:
            "Class of the Table `th` element when component is positioned",
        suffixes: ["left", "centered", "right"],
        properties: ["position"],
    },
    {
        class: "thStickyClass",
        description: "Class of the Table `th` element when component is sticky",
        properties: ["sticky"],
    },
    {
        class: "thSortIconClass",
        description: "Class of the Table sort icon in the header",
        warning:
            "Click on 'First Name' header to sort elements and see it in action!",
    },
    {
        class: "thSubheadingClass",
        description: "Class of the Table `th` subheading element",
        properties: ["subheading"],
    },
    {
        class: "tdClass",
        description: "Class of the Table `td` element",
    },
    {
        class: "tdCheckboxClass",
        description: "Class of the Table `td` element when is checkable",
        properties: ["checkable"],
        action: (cmp, data) => {
            data.checkable = true;
        },
    },
    {
        class: "tdDetailedChevronClass",
        properties: ["detailed"],
        description:
            "Class of the Table `td` element that contains the chevron to trigger details",
        action: (cmp, data) => {
            data.mobileCards = true;
        },
    },
    {
        class: "tdPositionClass",
        description:
            "Class of the Table `td` element when component is positioned",
        suffixes: ["left", "centered", "right"],
        properties: ["position"],
    },
    {
        class: "tdStickyClass",
        description: "Class of the Table `td` element when component is sticky",
        properties: ["sticky"],
    },
    {
        class: "mobileSortClass",
        description: "Class of the sortable form wrapper on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "mobileClass",
        description: "Class of the Table component when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "paginationWrapperClass",
        description: "Class of the Table pagination wrapper",
        properties: ["paginated"],
        action: (cmp, data) => {
            data.paginated = true;
            data.paginationSimple = true;
            data.perPage = 2;
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-table
            v-bind="props"
            v-model:selected="selected"
            :data="props.isEmpty ? [] : data"
            :columns="columns"
            detailed>
            <template #footer> This is the footer </template>
            <template #detail> DETAILS </template>
        </o-table>
    </inspector-wrapper>
</template>

<style lang="scss">
.inspector_table {
    border-collapse: collapse;
}
</style>
