<script setup lang="ts">
import type { InspectData } from "@docs";
import type { DatepickerClasses, DatepickerProps } from "../props";

const events = [
    {
        date: new Date(),
        type: "info",
    },
    {
        date: new Date(),
        type: "warning",
    },
];

const inspectData: InspectData<
    DatepickerClasses,
    DatepickerProps<true | false>
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (data): void => {
            data.size = "large";
        },
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (data): void => {
            data.expanded = true;
        },
    },
    boxClass: {
        class: "boxClass",
        description:
            "Class of the box container element where you choose the date.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    headerClass: {
        class: "headerClass",
        description: "Class of the header element inside the box.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    headerButtonsClass: {
        class: "headerButtonsClass",
        description: "Class of the button elements inside the box.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    headerButtonsSizeClass: {
        class: "headerButtonsSizeClass",
        description: "Class of the button elements inside the box with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (data): void => {
            data.size = "large";
            data.inline = true;
            data.active = true;
        },
    },
    prevButtonClass: {
        class: "prevButtonClass",
        description: "Class of the prev button element inside the box.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    nextButtonClass: {
        class: "nextButtonClass",
        description: "Class of the next button element inside the box.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    listsClass: {
        class: "listsClass",
        description:
            "Class of the month and year selects container inside the box.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    footerClass: {
        class: "footerClass",
        description: "Class of the footer element.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableClass: {
        class: "tableClass",
        description: "Class of the dates table element inside the box",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableHeadClass: {
        class: "tableHeadClass",
        description:
            "Class of dates table header element with days of the week.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableHeadCellClass: {
        class: "tableHeadCellClass",
        description: "Class of the cell element inside the table header.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableBodyClass: {
        class: "tableBodyClass",
        description: "Class of the table body element inside the box.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableRowClass: {
        class: "tableRowClass",
        description: "Class of the table row element.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellClass: {
        class: "tableCellClass",
        description: "Class of the table cell element.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellInvisibleClass: {
        class: "tableCellInvisibleClass",
        description:
            "Class of the table cell element when nearby month days are hidden.",
        properties: ["nearbyMonthDays"],
        action: (data): void => {
            data.nearbyMonthDays = false;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellSelectedClass: {
        class: "tableCellSelectedClass",
        description: "Class of table cell element when it is selected.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellFirstSelectedClass: {
        class: "tableCellFirstSelectedClass",
        description:
            "Class of the first selected table cell element when in range.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellWithinSelectedClass: {
        class: "tableCellWithinSelectedClass",
        description:
            "Class of the table cell elements within the range when the range is selected.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellLastSelectedClass: {
        class: "tableCellLastSelectedClass",
        description:
            "Class of the last selected table cell element during range selection.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellFirstHoveredClass: {
        class: "tableCellFirstHoveredClass",
        description:
            "Class of the first hovered table cell element during range selection.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (data): void => {
            data.type = "date";
            data.range = true;
            data.inline = true;
            data.tableClass = "datepicker__table";
            data.active = true;
        },
    },
    tableCellWithinHoveredClass: {
        class: "tableCellWithinHoveredClass",
        description:
            "Class of the table cell element when hovered during range selection.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellLastHoveredClass: {
        class: "tableCellLastHoveredClass",
        description:
            "Class of the last table cell element hovered during range selection.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellTodayClass: {
        class: "tableCellTodayClass",
        description: "Class of the table cell element of the current day.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellSelectableClass: {
        class: "tableCellSelectableClass",
        description: "Class of the table cell element when selectable.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellUnselectableClass: {
        class: "tableCellUnselectableClass",
        description: "Class of the table cell element when unselectable.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellNearbyClass: {
        class: "tableCellNearbyClass",
        description:
            "Class of the table cell element when nearby days (prev/next month) are selectable.",
        properties: ["nearbySelectableMonthDays"],
        action: (data): void => {
            data.inline = true;
            data.nearbySelectableMonthDays = true;
            data.active = true;
        },
    },
    tableCellEventsClass: {
        class: "tableCellEventsClass",
        description:
            "Class of the cell element of a row when at least one event is present.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventsClass: {
        class: "tableEventsClass",
        description: "Class of the events container element.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventClass: {
        class: "tableEventClass",
        description: "Class of the event element.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventVariantClass: {
        class: "tableEventVariantClass",
        description: "Class of the event indicator element with variant.",
        properties: ["events"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventIndicatorsClass: {
        class: "tableEventIndicatorsClass",
        description: "Class of the event indicator wrapper element.",
        properties: ["indicators"],
        suffixes: ["bars", "dots", "*"],
        action: (data): void => {
            data.inline = true;
            data.indicators = "bars";
            data.active = true;
        },
    },
    monthClass: {
        class: "monthClass",
        description:
            "Class of the month table element inside the box when type is `month`.",
        properties: ["type"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthBodyClass: {
        class: "monthBodyClass",
        description:
            "Class of the table body element inside the box when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthTableClass: {
        class: "monthTableClass",
        description: "Class of the table container when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellClass: {
        class: "monthCellClass",
        description: "Class of the table cell element when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellSelectedClass: {
        class: "monthCellSelectedClass",
        description:
            "Class of table cell element when selected when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellFirstSelectedClass: {
        class: "monthCellFirstSelectedClass",
        description:
            "Class of the first selected table cell element when in range when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellWithinSelectedClass: {
        class: "monthCellWithinSelectedClass",
        description:
            "Class of the table cell elements within the range when the range is selected when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellLastSelectedClass: {
        class: "monthCellLastSelectedClass",
        description:
            "Class of the last selected table cell element during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellFirstHoveredClass: {
        class: "monthCellFirstHoveredClass",
        description:
            "Class of the first hovered table cell element during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellWithinHoveredClass: {
        class: "monthCellWithinHoveredClass",
        description:
            "Class of the table cell element when hovered during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellWithinHoveredRangeClass: {
        class: "monthCellWithinHoveredRangeClass",
        description:
            "Class of the table cell element when hovered during range selection and cell is in range when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellLastHoveredClass: {
        class: "monthCellLastHoveredClass",
        description:
            "Class of the last table cell element when hovered during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellTodayClass: {
        class: "monthCellTodayClass",
        description:
            "Class of the table cell element of the current day when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellSelectableClass: {
        class: "monthCellSelectableClass",
        description:
            "Class of the table cell element when selectable when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellUnselectableClass: {
        class: "monthCellUnselectableClass",
        description:
            "Class of the table cell element when unselectable when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellEventsClass: {
        class: "monthCellEventsClass",
        description: "Class of the events container when type is `month`.",
        action: (data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    inputClass: {
        class: "inputClass",
        description: "Class to apply on the input element.",
        relatedClass: "inputClasses.rootClass",
        relatedComponent: "Input",
    },
    inputClasses: {
        class: "inputClasses",
        description: "Classes to apply on the internal input component.",
        relatedComponent: "Input",
    },
    dropdownClass: {
        class: "dropdownClass",
        description: "Class to apply on the dropdown element.",
        relatedClass: "dropdownClasses.rootClass",
        relatedComponent: "Dropdown",
        action: (data): void => {
            data.active = true;
        },
    },
    dropdownClasses: {
        class: "dropdownClasses",
        description: "Classes to apply on the internal dropdown component.",
        relatedComponent: "Dropdown",
        action: (data): void => {
            data.active = true;
        },
    },
    selectClasses: {
        class: "selectClasses",
        description:
            "Classes to apply on the internal select component (month and year list).",
        relatedComponent: "Select",
        action: (data): void => {
            data.active = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-datepicker
            :events="events"
            locale="en-GB"
            placeholder="Click to select a date..."
            icon="calendar"
            v-bind="props">
            <template #footer> Footer </template>
        </o-datepicker>
    </inspector-wrapper>
</template>

<style>
.datepicker__table {
    border-collapse: collapse;
}
</style>
