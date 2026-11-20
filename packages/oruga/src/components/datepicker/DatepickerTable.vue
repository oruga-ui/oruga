<script setup lang="ts">
import { computed, ref } from "vue";

import ODatepickerTableRow from "./DatepickerTableRow.vue";

import { isTrueish, isDefined } from "@/utils/helpers";
import { weekBuilder } from "@/utils/dateUtils";
import { defineClasses } from "@/composables";

import { injectDatepickerProps } from "./datepickerInjection";

import type { DatepickerEvent, FocusedDate } from "./types";
import { isDateSelectable } from "./useDatepicker.ts";

defineOptions({
    name: "ODatepickerTable",
    configField: "datepicker",
});

const props = defineProps<{
    /** the selected date or dates */
    modelValue?: Date | Date[];
    /** the date which currently has the focus */
    focusedDate: FocusedDate;
    /** localized names of the weekdays */
    dayNames: string[];
    /** localized names of the months */
    monthNames: string[];
    /** the current date */
    today: Date;
}>();

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    "update:model-value": [value: Date | Date[]];
    /** focusedDate prop two-way binding */
    "update:focusedDate": [value: FocusedDate];
    "range-start": [value: Date];
    "range-end": [value: Date];
    "week-number-click": [value: number];
}>();

const pickerProps = injectDatepickerProps();

const focusedDateModel = defineModel<FocusedDate>("focusedDate", {
    required: true,
});

const hoveredEndDate = ref<Date>();
const selectedBeginDate = ref<Date>();
const selectedEndDate = ref<Date>();

/*
 * If both begin and end dates are set, reset the end date and set the begin date.
 * If only begin date is selected, emit an array of the begin date and the new date.
 * If not set, only set the begin date.
 */
function selectRangeDate(date: Date): void {
    if (selectedBeginDate.value && selectedEndDate.value) {
        selectedBeginDate.value = date;
        selectedEndDate.value = undefined;
        emits("range-start", date);
    } else if (selectedBeginDate.value) {
        if (selectedBeginDate.value > date) {
            selectedEndDate.value = selectedBeginDate.value;
            selectedBeginDate.value = date;
        } else {
            selectedEndDate.value = date;
        }
        emits("range-end", date);
        emits("update:model-value", [
            selectedBeginDate.value,
            selectedEndDate.value,
        ]);
    } else {
        selectedBeginDate.value = date;
        emits("range-start", date);
    }
}

const visibleDayNames = computed(() => {
    const visibleDayNames: string[] = [];
    let index = pickerProps.firstDayOfWeek || 0;
    while (visibleDayNames.length < props.dayNames.length) {
        const currentDayName = props.dayNames[index % props.dayNames.length];
        visibleDayNames.push(currentDayName);
        index++;
    }
    if (pickerProps.showWeekNumber) visibleDayNames.unshift("");
    return visibleDayNames;
});

/** Return array of all events */
const eventsList = computed(() => {
    if (!pickerProps.events) return [];
    return pickerProps.events.map((event) =>
        !event.date && event instanceof Date ? { date: event } : event,
    );
});

/** Return array of all weeks in the specified month */
const weeksInThisMonth = computed<Date[][]>(() => {
    validateFocusedDay();
    const month = focusedDateModel.value.month;
    const year = focusedDateModel.value.year;
    const weeksInThisMonth: Date[][] = [];

    let startingDay = 1;

    while (weeksInThisMonth.length < 6) {
        const newWeek = weekBuilder(
            startingDay,
            month,
            year,
            pickerProps.firstDayOfWeek || 0,
        );
        weeksInThisMonth.push(newWeek);
        startingDay += 7;
    }

    return weeksInThisMonth;
});

function eventsInThisWeek(week: Date[]): DatepickerEvent[] {
    if (!pickerProps.events) return [];
    return eventsList.value.filter((event) => {
        const stripped = new Date(event.date);
        stripped.setHours(0, 0, 0, 0);
        const timed = stripped.getTime();
        return week.some((weekDate) => weekDate.getTime() === timed);
    });
}

const hoveredDateRange = computed<Date[]>(() => {
    if (!isTrueish(pickerProps.range) || selectedEndDate.value) return [];

    return (
        (hoveredEndDate.value || 0) < (selectedBeginDate.value || 0)
            ? [hoveredEndDate.value, selectedBeginDate.value]
            : [selectedBeginDate.value, hoveredEndDate.value]
    ).filter(isDefined);
});

function validateFocusedDay(): void {
    const currentDate = new Date(
        focusedDateModel.value.year,
        focusedDateModel.value.month,
        focusedDateModel.value.day,
    );
    if (
        isDateSelectable(pickerProps, currentDate, focusedDateModel.value.month)
    )
        return;

    let day = 0;
    // Number of days in the current month
    const monthDays = new Date(
        focusedDateModel.value.year,
        focusedDateModel.value.month + 1,
        0,
    ).getDate();
    let firstFocusable: Date | undefined;
    while (!firstFocusable && ++day < monthDays) {
        const date = new Date(
            focusedDateModel.value.year,
            focusedDateModel.value.month,
            day,
        );
        if (isDateSelectable(pickerProps, date, focusedDateModel.value.month)) {
            firstFocusable = currentDate;
            focusedDateModel.value = {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
            };
        }
    }
}

// --- Event Handlers ---

/** Emit input event with selected date as payload for v-model in parent */
function onSelectedDate(date: Date): void {
    if (pickerProps.disabled) return;
    else if (isTrueish(pickerProps.range)) selectRangeDate(date);
    else if (isTrueish(pickerProps.multiple)) handleSelectMultipleDates(date);
    else emits("update:model-value", date);
}

/*
 * If selected date already exists list of selected dates, remove it from the list
 * Otherwise, add date to list of selected dates
 */
function handleSelectMultipleDates(date: Date): void {
    let multipleSelectedDates = Array.isArray(props.modelValue)
        ? props.modelValue
        : [];
    const multipleSelect = multipleSelectedDates.filter(
        (selectedDate) =>
            selectedDate.getDate() === date.getDate() &&
            selectedDate.getFullYear() === date.getFullYear() &&
            selectedDate.getMonth() === date.getMonth(),
    );
    if (multipleSelect.length) {
        multipleSelectedDates = multipleSelectedDates.filter(
            (selectedDate) =>
                selectedDate.getDate() !== date.getDate() ||
                selectedDate.getFullYear() !== date.getFullYear() ||
                selectedDate.getMonth() !== date.getMonth(),
        );
    } else {
        multipleSelectedDates = [...multipleSelectedDates, date];
    }
    emits("update:model-value", multipleSelectedDates);
}

function onRangeHoverEndDate(date: Date): void {
    hoveredEndDate.value = date;
}

function onChangeFocus(date: Date): void {
    focusedDateModel.value = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    };
}

// #region --- Computed Component Classes ---

const tableClasses = defineClasses(
    ["tableClass", "o-datepicker__table"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

const tableHeadClasses = defineClasses(
    ["tableHeadClass", "o-datepicker__table__head"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

const tableCellClasses = defineClasses(
    ["tableCellClass", "o-datepicker__table__cell"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

const tableHeadCellClasses = defineClasses(
    ["tableHeadCellClass", "o-datepicker__table__head-cell"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

const tableBodyClasses = defineClasses(
    ["tableBodyClass", "o-datepicker__table__body"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <section :class="tableClasses">
        <header :class="tableHeadClasses">
            <div
                v-for="(day, index) in visibleDayNames"
                :key="index"
                :class="[...tableCellClasses, ...tableHeadCellClasses]">
                <span>{{ day }}</span>
            </div>
        </header>

        <div :class="tableBodyClasses">
            <o-datepicker-table-row
                v-for="(week, index) in weeksInThisMonth"
                :key="index"
                :selected-date="modelValue"
                :today="today"
                :day="focusedDateModel.day"
                :week="week"
                :month="focusedDateModel.month"
                :events="eventsInThisWeek(week)"
                :hovered-date-range="hoveredDateRange"
                @select="onSelectedDate"
                @hover-enddate="onRangeHoverEndDate"
                @change-focus="onChangeFocus"
                @week-number-click="$emit('week-number-click', $event)" />
        </div>
    </section>
</template>
