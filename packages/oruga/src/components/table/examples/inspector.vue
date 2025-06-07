<script setup lang="ts">
import type { InspectData } from "@docs";
import type { TableClasses, TableProps, TableColumnProps } from "../props";
import type { TableColumn } from "../types";

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

const columns: TableColumn[] = [
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

const inspectData: InspectData<
    TableClasses,
    TableProps<unknown> & TableColumnProps<unknown, string>
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root and wrapper element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    mobileSortClass: {
        class: "mobileSortClass",
        description: "Class of the sortable form wrapper on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    wrapperClass: {
        class: "wrapperClass",
        description: "Class of the table wrapper element.",
    },
    stickyHeaderClass: {
        class: "stickyHeaderClass",
        description:
            "Class of the table wrapper element when header is sticky.",
        properties: ["stickyHeader"],
        action: (data): void => {
            data.stickyHeader = true;
        },
    },
    scrollableClass: {
        class: "scrollableClass",
        description:
            "Class of the table wrapper element when its content is scrollable.",
        properties: ["scrollable"],
        action: (data): void => {
            data.scrollable = true;
        },
    },
    tableClass: {
        class: "tableClass",
        description: "Class of the table element.",
    },
    borderedClass: {
        class: "borderedClass",
        description: "Class of the table element when bordered.",
        properties: ["bordered"],
        action: (data): void => {
            data.bordered = true;
        },
    },
    stripedClass: {
        class: "stripedClass",
        properties: ["striped"],
        description: "Class of the table element when striped.",
        action: (data): void => {
            data.striped = true;
        },
    },
    narrowedClass: {
        class: "narrowedClass",
        description: "Class of the table element when narrowed.",
        properties: ["narrowed"],
        action: (data): void => {
            data.narrowed = true;
        },
    },
    hoverableClass: {
        class: "hoverableClass",
        description: "Class of the table element when hoverable.",
        properties: ["hoverable"],
        action: (data): void => {
            data.hoverable = true;
        },
    },
    emptyClass: {
        class: "emptyClass",
        description: "Class of the table element when it is empty.",
        action: (data): void => {
            data.data = [];
        },
    },
    thClass: {
        class: "thClass",
        description: "Class of the table `th` element",
    },
    thPositionClass: {
        class: "thPositionClass",
        description: "Class of the table `th` element with position.",
        suffixes: ["left", "centered", "right"],
        properties: ["position"],
    },
    thCheckboxClass: {
        class: "thCheckboxClass",
        description: "Class of the table `th` element when checkable.",
        properties: ["checkable"],
        action: (data): void => {
            data.checkable = true;
        },
    },
    thStickyClass: {
        class: "thStickyClass",
        description: "Class of the table `th` element when checkbox is sticky.",
        properties: ["stickyCheckbox"],
        action: (data): void => {
            data.checkable = true;
            data.stickyCheckbox = true;
        },
    },
    thDetailedClass: {
        class: "thDetailedClass",
        description:
            "Class of the table `th` element of the detail column of triggers.",
        properties: ["detailed"],
        action: (data): void => {
            data.detailed = true;
        },
    },
    thSortableClass: {
        class: "thSortableClass",
        description: "Class of the table `th` element when sortable.",
        properties: ["sortable"],
    },
    thSortIconClass: {
        class: "thSortIconClass",
        description: "Class of the table header sort icon element.",
        info: "Click on 'First Name' header to sort elements and see it in action!",
    },
    thCurrentSortClass: {
        class: "thCurrentSortClass",
        description:
            "Class of the table `th` element that is currently sorted.",
        info: "Click on 'First Name' header to sort elements and see it in action!",
    },
    thUnselectableClass: {
        class: "thUnselectableClass",
        description: "Class of the Table `th` element that is unsortable.",
        properties: ["headerSelectable", "sortable"],
    },
    thSubheadingClass: {
        class: "thSubheadingClass",
        description: "Class of the table `th` subheading element",
        properties: ["subheading"],
    },
    trSelectedClass: {
        class: "trSelectedClass",
        description: "Class of the table `tr` element when selected.",
        info: "Select a row of the table to see it in action!",
        action: (data): void => {
            data.tableClass = "inspector_table";
        },
    },
    trDetailedClass: {
        class: "trDetailedClass",
        description: "Class of the table `tr` element when detailed. ",
        info: "Expand details to see it in action!",
        properties: ["detailed"],
        action: (data): void => {
            data.tableClass = "inspector_table";
            data.mobileCards = true;
            data.detailed = true;
        },
    },
    trCheckedClass: {
        class: "trCheckedClass",
        description:
            "Class of the table `tr` element when checkable and checked.",
        info: "Select a row of the table to see it in action!",
        properties: ["checkable"],
        action: (data): void => {
            data.checkable = true;
        },
    },
    trEmptyClass: {
        class: "trEmptyClass",
        description: "Class of the table `tr` element when table is empty.",
        action: (data): void => {
            data.data = [];
        },
    },
    tdClass: {
        class: "tdClass",
        description: "Class of the Table `td` element.",
    },
    tdPositionClass: {
        class: "tdPositionClass",
        description: "Class of the table `td` element with position.",
        suffixes: ["left", "centered", "right"],
        properties: ["position"],
    },
    tdStickyClass: {
        class: "tdStickyClass",
        description: "Class of the table `td` element when column is sticky.",
        properties: ["sticky"],
    },
    tdCheckboxClass: {
        class: "tdCheckboxClass",
        description: "Class of the table `td` element when row is checkable.",
        properties: ["checkable"],
        action: (data): void => {
            data.checkable = true;
        },
    },
    tdDetailedChevronClass: {
        class: "tdDetailedChevronClass",
        description:
            "Class of the table `td` element that contains the chevron to trigger details.",
        properties: ["detailed"],
        action: (data): void => {
            data.mobileCards = true;
            data.detailed = true;
        },
    },
    paginationWrapperClass: {
        class: "paginationWrapperClass",
        description: "Class of the table pagination wrapper element.",
        properties: ["paginated"],
        action: (data): void => {
            data.paginated = true;
            data.paginationSimple = true;
            data.perPage = 2;
        },
    },
    footerClass: {
        class: "footerClass",
        description: "Class of the table footer element.",
        action: (data): void => {
            data.tableClass = "inspector_table";
        },
    },
    loadingClasses: {
        class: "loadingClasses",
        description: "Classes to apply on the internal loading component.",
        relatedComponent: "Loading",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-table :data="data" :columns="columns" v-bind="props">
            <template #footer> This is the footer </template>
            <template #detail> DETAILS </template>
        </o-table>
    </inspector-wrapper>
</template>
