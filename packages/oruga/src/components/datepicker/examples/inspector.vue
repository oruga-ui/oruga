<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { DatepickerClasses } from "../props";

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

const inspectData: InspectData<DatepickerClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when on expanded.",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    boxClass: {
        class: "boxClass",
        description:
            "Class of the box container element where you choose the date.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    headerClass: {
        class: "headerClass",
        description: "Class of the header inside the box.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    headerButtonsClass: {
        class: "headerButtonsClass",
        description: "Class of the buttons inside the box.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    headerButtonsSizeClass: {
        class: "headerButtonsSizeClass",
        description:
            "Class of the buttons inside the box when a size is choosen.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
            data.inline = true;
            data.active = true;
        },
    },
    prevButtonClass: {
        class: "prevButtonClass",
        description: "Class of the prev button inside the box.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    nextButtonClass: {
        class: "nextButtonClass",
        description: "Class of the next button inside the box.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    listsClass: {
        class: "listsClass",
        description:
            "Class of the month and year selects container inside the box.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    footerClass: {
        class: "footerClass",
        description: "Class of the footer element.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableClass: {
        class: "tableClass",
        description: "Class of the dates table inside the box",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableHeadClass: {
        class: "tableHeadClass",
        description: "Class of dates table header with days of the week.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableHeadCellClass: {
        class: "tableHeadCellClass",
        description: "Class of the cell inside the table header.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableBodyClass: {
        class: "tableBodyClass",
        description: "Class of the table body inside the box.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableRowClass: {
        class: "tableRowClass",
        description: "Class of the table row.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellClass: {
        class: "tableCellClass",
        description: "Class of the table cell.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellInvisibleClass: {
        class: "tableCellInvisibleClass",
        description:
            "Class of the table cell when nearby month days are hidden.",
        properties: ["nearbyMonthDays"],
        action: (cmp, data): void => {
            data.nearbyMonthDays = false;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellSelectedClass: {
        class: "tableCellSelectedClass",
        description: "Class of table cell when it is selected.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellFirstSelectedClass: {
        class: "tableCellFirstSelectedClass",
        description: "Class of the first selected table cell when in range.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (cmp, data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellWithinSelectedClass: {
        class: "tableCellWithinSelectedClass",
        description:
            "Class of the table cells within the range when the range is selected.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (cmp, data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellLastSelectedClass: {
        class: "tableCellLastSelectedClass",
        description:
            "Class of the last selected table cell during range selection.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (cmp, data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellFirstHoveredClass: {
        class: "tableCellFirstHoveredClass",
        description:
            "Class of the first hovered table cell during range selection.",
        info: "See it in action selecting a date range.",
        properties: ["range"],
        action: (cmp, data): void => {
            data.type = "";
            data.range = true;
            data.inline = true;
            data.tableClass = "datepicker__table";
            data.active = true;
        },
    },
    tableCellWithinHoveredClass: {
        class: "tableCellWithinHoveredClass",
        description:
            "Class of the table cell when hovered during range selection.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellLastHoveredClass: {
        class: "tableCellLastHoveredClass",
        description:
            "Class of the last table cell hovered during range selection.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.range = true;
            data.inline = true;
            data.active = true;
        },
    },
    tableCellTodayClass: {
        class: "tableCellTodayClass",
        description: "Class of the table cell of the current day.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellSelectableClass: {
        class: "tableCellSelectableClass",
        description: "Class of the table cell when is selectable.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellUnselectableClass: {
        class: "tableCellUnselectableClass",
        description: "Class of the table cell when is unselectable.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableCellNearbyClass: {
        class: "tableCellNearbyClass",
        description:
            "Class of the table cell when nearby days (prev/next month) are selectable.",
        properties: ["nearbySelectableMonthDays"],
        action: (cmp, data): void => {
            data.inline = true;
            data.nearbySelectableMonthDays = true;
            data.active = true;
        },
    },
    tableCellEventsClass: {
        class: "tableCellEventsClass",
        description:
            "Class of the cell of a row when at least one event is present.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventsClass: {
        class: "tableEventsClass",
        description: "Class of the events container.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventClass: {
        class: "tableEventClass",
        description: "Class of the event.",
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventVariantClass: {
        class: "tableEventVariantClass",
        description:
            "Class of the event indicator when a `variant` is specified.",
        properties: ["variant in event"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    tableEventIndicatorsClass: {
        class: "tableEventIndicatorsClass",
        description: "Class of the event indicator.",
        properties: ["indicator"],
        suffixes: ["bars", "dots", "*"],
        action: (cmp, data): void => {
            data.inline = true;
            data.indicators = "bars";
            data.active = true;
        },
    },
    monthClass: {
        class: "monthClass",
        description:
            "Class of the month table inside the box when type is `month`.",
        properties: ["type"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthBodyClass: {
        class: "monthBodyClass",
        description:
            "Class of the table body inside the box when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthTableClass: {
        class: "monthTableClass",
        description: "Class of the table container when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellClass: {
        class: "monthCellClass",
        description: "Class of the table cell when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellSelectedClass: {
        class: "monthCellSelectedClass",
        description:
            "Class of table cell when it's selected when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellFirstSelectedClass: {
        class: "monthCellFirstSelectedClass",
        description:
            "Class of the first selected table cell when in range when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellWithinSelectedClass: {
        class: "monthCellWithinSelectedClass",
        description:
            "Class of the table cells within the range when the range is selected when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellLastSelectedClass: {
        class: "monthCellLastSelectedClass",
        description:
            "Class of the last selected table cell during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellFirstHoveredClass: {
        class: "monthCellFirstHoveredClass",
        description:
            "Class of the first hovered table cell during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellWithinHoveredClass: {
        class: "monthCellWithinHoveredClass",
        description:
            "Class of the table cell when hovered during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellWithinHoveredRangeClass: {
        class: "monthCellWithinHoveredRangeClass",
        description:
            "Class of the table cell when hovered during range selection and cell is in range when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellLastHoveredClass: {
        class: "monthCellLastHoveredClass",
        description:
            "Class of the last table cell hovered during range selection when type is `month`.",
        info: "See it in action selecting a date range",
        properties: ["range"],
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.range = true;
            data.active = true;
        },
    },
    monthCellTodayClass: {
        class: "monthCellTodayClass",
        description:
            "Class of the table cell of the current day when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellSelectableClass: {
        class: "monthCellSelectableClass",
        description:
            "Class of the table cell that is selectable when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellUnselectableClass: {
        class: "monthCellUnselectableClass",
        description:
            "Class of the table cell that is unselectable when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    monthCellEventsClass: {
        class: "monthCellEventsClass",
        description: "Class of the events container when type is `month`.",
        action: (cmp, data): void => {
            data.inline = true;
            data.type = "month";
            data.active = true;
        },
    },
    inputClass: {
        class: "inputClass",
        relatedClass: "inputClasses.rootClass",
        description: "Classes to apply on the input element.",
        relatedComponent: "Input",
    },
    inputClasses: {
        class: "inputClasses",
        description: "Classes to apply on internal input component.",
        relatedComponent: "Input",
    },
    dropdownClass: {
        class: "dropdownClass",
        relatedClass: "dropdownClasses.rootClass",
        description: "Classes to apply on the dropdown element.",
        relatedComponent: "Dropdown",
        action: (cmp, data): void => {
            data.active = true;
        },
    },
    dropdownClasses: {
        class: "dropdownClasses",
        description: "Classes to apply on the internal dropdown component.",
        relatedComponent: "Dropdown",
        action: (cmp, data): void => {
            data.active = true;
        },
    },
    selectClasses: {
        class: "selectClasses",
        description:
            "Classes to apply on internal select component (month and year list).",
        relatedComponent: "Select",
        action: (cmp, data): void => {
            data.active = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-datepicker
            v-bind="props"
            :events="events"
            locale="en-GB"
            placeholder="Click to select a date..."
            icon="calendar">
            <template #footer> Footer </template>
        </o-datepicker>
    </inspector-wrapper>
</template>

<style>
.datepicker__table {
    border-collapse: collapse;
}
</style>
