<script setup>
import { ref } from "vue";

const events = ref([
    {
        date: new Date(),
        type: "info",
    },
    {
        date: new Date(),
        type: "warning",
    },
]);

function openDatePicker() {
    setTimeout(() => {
        this.$refs.datepicker.$el
            .getElementsByClassName("o-input-iconspace-left")[0]
            .click();
    }, 500);
}

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "sizeClass",
        description: "Class of the Datepicker size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "boxClass",
        description: "Class of the Datepicker box where you choose the date",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "headerClass",
        description: "Class of the Datepicker header inside the box",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "headerButtonsClass",
        description: "Class of the Datepicker buttons inside the box",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "headerButtonsSizeClass",
        description:
            "Class of the Datepicker buttons inside the box when a size is choosen",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.type = "";
            data.size = "large";
            openDatePicker();
        },
    },
    {
        class: "prevBtnClass",
        description: "Class of the prev. button inside the Datepicker box",
        specificity: "when <b>mobileClass</b> is applied",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "nextBtnClass",
        description: "Class of the next button inside the Datepicker box",
        specificity: "when <b>mobileClass</b> is applied",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "listsClass",
        description:
            "Class of the month and year selects container inside the Datepicker box",
        specificity: "when <b>mobileClass</b> is applied",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "footerClass",
        description: "Class of the Datepicker footer",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "tableClass",
        description: "Class of the Datepicker table inside the box",
        action: (cmp, data) => {
            data.type = "";
            openDatePicker();
        },
    },
    {
        class: "tableHeadClass",
        description:
            "Class of Datepicker header with days of the week inside the table",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableHeadCellClass",
        description: "Class of the cell inside the table header",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableBodyClass",
        description: "Class of the table body inside the box",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableRowClass",
        description: "Class of the table row",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellClass",
        description: "Class of the table cell",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellInvisibleClass",
        description:
            "Class of the table cell when nearby month days are hidden",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            data.nearbyMonthDays = false;
            openDatePicker();
        },
    },
    {
        class: "tableCellSelectedClass",
        description: "Class of table cell when it's selected",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellFirstSelectedClass",
        description: "Class of the first selected table cell when in range",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            data.range = true;
            data.inline = true;
            openDatePicker();
        },
    },
    {
        class: "tableCellWithinSelectedClass",
        description:
            "Class of the table cells within the range when the range is selected",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            data.range = true;
            data.inline = true;
            openDatePicker();
        },
    },
    {
        class: "tableCellLastSelectedClass",
        description:
            "Class of the last selected table cell during range selection",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "";
            data.range = true;
            data.inline = true;
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellFirstHoveredClass",
        description:
            "Class of the first hovered table cell during range selection",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "";
            data.range = true;
            data.inline = true;
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellWithinHoveredClass",
        description:
            "Class of the table cell when hovered during range selection",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "";
            data.range = true;
            data.inline = true;
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellLastHoveredClass",
        description:
            "Class of the last table cell hovered during range selection",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "";
            data.range = true;
            data.inline = true;
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellTodayClass",
        description: "Class of the table cell of the current day",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellSelectableClass",
        description: "Class of the table cell that is selectable",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellUnselectableClass",
        description: "Class of the table cell that is unselectable",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableCellNearbyClass",
        description:
            "Class of the table cell when nearby days (prev/next month) are selectable",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            data.nearbySelectableMonthDays = true;
            openDatePicker();
        },
    },
    {
        class: "tableCellEventsClass",
        description:
            "Class of the cell of a row when at least one event is present",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableEventClass",
        description: "Class of the event",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableEventsClass",
        description: "Class of the events container",
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableEventVariantClass",
        description:
            "Class of the event indicator when a `variant` is specified",
        properties: ["variant in event"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "tableEventIndicatorsClass",
        description: "Class of the event indicator",
        properties: ["indicator"],
        suffixes: ["bars", "dots", "*"],
        action: (cmp, data) => {
            data.type = "";
            data.tableClass = "datepicker__table";
            data.indicators = "bars";
            openDatePicker();
        },
    },
    {
        class: "monthClass",
        description:
            "Class of the Datepicker table inside the box when type is month",
        action: (cmp, data) => {
            data.type = "month";
            openDatePicker();
        },
    },
    {
        class: "monthBodyClass",
        description:
            "Class of the table body inside the box when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellClass",
        description: "Class of the table cell when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellSelectedClass",
        description:
            "Class of table cell when it's selected when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellFirstSelectedClass",
        description:
            "Class of the first selected table cell when in range when type is month",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            data.range = true;
            data.inline = true;
            openDatePicker();
        },
    },
    {
        class: "monthCellWithinSelectedClass",
        description:
            "Class of the table cells within the range when the range is selected when type is month",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            data.range = true;
            data.inline = true;
            openDatePicker();
        },
    },
    {
        class: "monthCellLastSelectedClass",
        description:
            "Class of the last selected table cell during range selection when type is month",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.range = true;
            data.inline = true;
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellFirstHoveredClass",
        description:
            "Class of the first hovered table cell during range selection when type is month",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.range = true;
            data.inline = true;
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellWithinHoveredClass",
        description:
            "Class of the table cell when hovered during range selection when type is month",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.range = true;
            data.inline = true;
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellLastHoveredClass",
        description:
            "Class of the last table cell hovered during range selection when type is month",
        warning: "See it in action selecting a date range",
        action: (cmp, data) => {
            data.range = true;
            data.inline = true;
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellTodayClass",
        description:
            "Class of the table cell of the current day when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellSelectableClass",
        description:
            "Class of the table cell that is selectable when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellUnselectableClass",
        description:
            "Class of the table cell that is unselectable when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "monthCellNearbyClass",
        description:
            "Class of the table cell when nearby days (prev/next month) are selectable when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            data.nearbySelectableMonthDays = true;
            openDatePicker();
        },
    },
    {
        class: "monthEventsClass",
        description: "Class of the events container when type is month",
        action: (cmp, data) => {
            data.type = "month";
            data.monthClass = "datepicker__,table__month";
            openDatePicker();
        },
    },
    {
        class: "mobileClass",
        description: "Class of the Datepicker when on mobile",
        warning: "Switch to mobile view to see it in action!",
        action: (cmp, data) => {
            data.tableClass = "datepicker__table";
            openDatePicker();
        },
    },
    {
        class: "inputClasses",
        realClass: "inputClasses.rootClass",
        description: "Classes to apply on internal input.",
        componentRef: "Input",
    },
    {
        class: "dropdownClasses",
        realClass: "dropdownClasses.rootClass",
        description: "Classes to apply on dropdown.",
        componentRef: "Dropdown",
        action: () => {
            openDatePicker();
        },
    },
    {
        class: "selectListClasses",
        description: "Classes to apply on select list (month and year).",
        componentRef: "Select",
        action: () => {
            openDatePicker();
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field label="Select a date">
            <o-datepicker
                v-bind="props"
                ref="datepicker"
                :events="events"
                locale="en-GB"
                placeholder="Click to select a date..."
                icon="calendar">
                Footer
            </o-datepicker>
        </o-field>
    </inspector-wrapper>
</template>

<style lang="scss">
.datepicker__table {
    border-collapse: collapse;
}
</style>
