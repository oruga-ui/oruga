<script setup lang="ts">
import {
    computed,
    ref,
    nextTick,
    watch,
    effectScope,
    onUnmounted,
    type ComponentPublicInstance,
} from "vue";

import { isDefined, isTrueish } from "@/utils/helpers";
import { defineClasses } from "@/composables";

import { isDateSelectable } from "./useDatepicker";
import { injectDatepickerProps } from "./datepickerInjection";

import type { DatepickerEvent, FocusedDate } from "./types";
import type { ClassBinding } from "@/types";

defineOptions({
    name: "ODatepickerMonth",
    configField: "datepicker",
    inheritAttrs: false,
});

const props = defineProps<{
    /** the selected date or dates */
    modelValue?: Date | Date[];
    /** localized names of the months */
    monthNames: string[];
    /** the date which currently has the focus */
    focusedDate: FocusedDate;
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
}>();

const pickerProps = injectDatepickerProps();

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

const hasEvents = computed(() => !!pickerProps.events?.length);

const monthRefs = ref(new Map());

function setMonthRef(
    date: Date,
    el: Element | ComponentPublicInstance | null,
): void {
    const refKey = `month-${date.getMonth()}`;
    if (el) monthRefs.value.set(refKey, el);
}

watch(
    () => props.focusedDate.month,
    (month) => {
        const refKey = `month-${month}`;
        nextTick(() => {
            // $nextTick is needed when month is changed
            const ref = monthRefs.value.get(refKey);
            if (ref?.length > 0 && ref[0]) {
                ref[0].focus();
            }
        });
    },
);

/** Return array of all events in the specified month */
const eventsInThisYear = computed(() => {
    if (!pickerProps.events) return [];

    return pickerProps.events
        .map((event) => {
            if (!event.date && event instanceof Date) event = { date: event };
            if (!event.type) event.type = "is-primary";
            return event;
        })
        .filter((event) => event.date.getFullYear() === props.focusedDate.year);
});

const monthDates = computed(() => {
    const year = props.focusedDate.year;
    const months: Date[] = [];
    for (let i = 0; i < 12; i++) {
        const d = new Date(year, i, 1);
        d.setHours(0, 0, 0, 0);
        months.push(d);
    }
    return months;
});

const hoveredDateRange = computed(() => {
    if (!isTrueish(pickerProps.range) || !selectedEndDate.value) return [];

    return (
        hoveredEndDate.value &&
        selectedBeginDate.value &&
        hoveredEndDate.value < selectedBeginDate.value
            ? [hoveredEndDate.value, selectedBeginDate.value]
            : [selectedBeginDate.value, hoveredEndDate.value]
    ).filter(isDefined);
});

function eventsDateMatch(day): DatepickerEvent[] {
    if (!eventsInThisYear.value.length) return [];
    return eventsInThisYear.value.filter(
        (event) => event.date.getMonth() === day.getMonth(),
    );
}

// --- Event Handlers ---

function onKeydown(event: KeyboardEvent, weekDay: Date): void {
    let preventDefault = true;
    switch (event.key) {
        case "Tab": {
            preventDefault = false;
            break;
        }
        case " ":
        case "Space":
        case "Spacebar":
        case "Enter": {
            selectDate(weekDay);
            break;
        }

        case "ArrowLeft":
        case "Left": {
            changeFocus(weekDay, -1);
            break;
        }
        case "ArrowRight":
        case "Right": {
            changeFocus(weekDay, 1);
            break;
        }
        case "ArrowUp":
        case "Up": {
            changeFocus(weekDay, -7);
            break;
        }
        case "ArrowDown":
        case "Down": {
            changeFocus(weekDay, 7);
            break;
        }
    }
    if (preventDefault) event.preventDefault();
}

/*
 * Emit update:modelValue event with selected date as payload for v-model in parent
 */
function selectDate(date: Date): void {
    if (pickerProps.disabled || pickerProps.readonly) return;
    if (
        !isDateSelectable(
            pickerProps,
            date,
            date.getMonth(),
            props.focusedDate.year,
        )
    )
        return;

    if (isTrueish(pickerProps.range)) selectRangeDate(date);
    else if (isTrueish(pickerProps.multiple)) handleSelectMultipleDates(date);
    else emits("update:model-value", date);
}

const multipleSelectedDates = computed(() =>
    isTrueish(pickerProps.multiple) && props.modelValue ? props.modelValue : [],
);

function handleSelectMultipleDates(date: Date): void {
    if (!Array.isArray(props.modelValue)) return;
    let multipleSelectedDates = props.modelValue;

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
        multipleSelectedDates.push(date);
    }
    emits("update:model-value", multipleSelectedDates);
}

function changeFocus(month: Date, inc: number): void {
    month.setMonth(month.getMonth() + inc);
    const focused = {
        day: month.getDate(),
        month: month.getMonth(),
        year: month.getFullYear(),
    };
    emits("update:focusedDate", focused);
}

function onRangeHoverEndDate(day: Date): void {
    if (isTrueish(pickerProps.range)) hoveredEndDate.value = day;
}

// #region --- Computed Component Classes ---

function dateMatch(dateOne, dateTwo, multiple = false): boolean {
    // if either date is null or undefined, return false
    if (!dateOne || !dateTwo || multiple) return false;
    if (Array.isArray(dateTwo))
        return dateTwo.some(
            (date) =>
                dateOne.getFullYear() === date.getFullYear() &&
                dateOne.getMonth() === date.getMonth(),
        );
    return (
        dateOne.getFullYear() === dateTwo.getFullYear() &&
        dateOne.getMonth() === dateTwo.getMonth()
    );
}

function dateWithin(dateOne, dates, multiple = false): boolean {
    if (!Array.isArray(dates) || multiple) return false;
    return dateOne > dates[0] && dateOne < dates[1];
}

function dateMultipleSelected(dateOne, dates, multiple = false): boolean {
    if (!Array.isArray(dates) || !multiple) return false;
    return dates.some(
        (date) =>
            dateOne.getDate() === date.getDate() &&
            dateOne.getFullYear() === date.getFullYear() &&
            dateOne.getMonth() === date.getMonth(),
    );
}

const monthClasses = defineClasses(
    ["monthClass", "o-datepicker__month"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

const monthTableClasses = defineClasses(
    ["monthTableClass", "o-datepicker__month__table"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

const monthCellClasses = defineClasses(
    ["monthCellClass", "o-datepicker__month__cell"],
    [
        "monthCellEventsClass",
        "o-datepicker__month__cell--events",
        null,
        hasEvents,
    ],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

// Registers a dispose callback on the current active effect scope.
const scope = effectScope();

// stop all scope effects
onUnmounted(() => scope.stop());

/**
 * Build classes for cell using validations
 */
function cellClasses(day: Date): ClassBinding[] {
    const classes = defineClasses(
        [
            "monthCellSelectedClass",
            "o-datepicker__month__cell--selected",
            null,
            dateMatch(day, props.modelValue, isTrueish(pickerProps.multiple)) ||
                dateWithin(
                    day,
                    props.modelValue,
                    isTrueish(pickerProps.multiple),
                ) ||
                dateMultipleSelected(
                    day,
                    multipleSelectedDates.value,
                    isTrueish(pickerProps.multiple),
                ),
        ],
        [
            "monthCellFirstSelectedClass",
            "o-datepicker__month__cell--first-selected",
            null,
            dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[0],
                isTrueish(pickerProps.multiple),
            ),
        ],
        [
            "monthCellWithinSelectedClass",
            "o-datepicker__month__cell--within-selected",
            null,
            dateWithin(day, props.modelValue, isTrueish(pickerProps.multiple)),
        ],
        [
            "monthCellLastSelectedClass",
            "o-datepicker__month__cell--last-selected",
            null,
            dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[1],
                isTrueish(pickerProps.multiple),
            ),
        ],
        [
            "monthCellWithinHoveredRangeClass",
            "o-datepicker__month__cell--within-hovered-range",
            null,
            hoveredDateRange.value &&
                hoveredDateRange.value.length === 2 &&
                (dateMatch(day, hoveredDateRange.value) ||
                    dateWithin(day, hoveredDateRange.value)),
        ],
        [
            "monthCellFirstHoveredClass",
            "o-datepicker__month__cell--first-hovered",
            null,
            dateMatch(
                day,
                Array.isArray(hoveredDateRange.value) &&
                    hoveredDateRange.value[0],
            ),
        ],
        [
            "monthCellWithinHoveredClass",
            "o-datepicker__month__cell--within-hovered",
            null,
            dateWithin(day, hoveredDateRange.value),
        ],
        [
            "monthCellLastHoveredClass",
            "o-datepicker__month__cell--last-hovered",
            null,
            dateMatch(
                day,
                Array.isArray(hoveredDateRange.value) &&
                    hoveredDateRange.value[1],
            ),
        ],
        [
            "monthCellTodayClass",
            "o-datepicker__month__cell--today",
            null,
            dateMatch(day, props.today),
        ],
        [
            "monthCellSelectableclass",
            "o-datepicker__month__cell--selectable",
            null,
            isDateSelectable(
                pickerProps,
                day,
                day.getMonth(),
                props.focusedDate.year,
            ) &&
                !pickerProps.disabled &&
                !pickerProps.readonly,
        ],
        [
            "monthCellUnselectableClass",
            "o-datepicker__month__cell--unselectable",
            null,
            !isDateSelectable(
                pickerProps,
                day,
                day.getMonth(),
                props.focusedDate.year,
            ) || pickerProps.disabled,
        ],
        // pass effect scope for rectivity binding
        { scope },
    );
    return [...monthCellClasses.value, ...classes.value];
}

const monthEventsClasses = defineClasses(
    ["monthEventsClass", "o-datepicker__month__events"],
    // passing the picker props will add reactivity to property changes
    { props: pickerProps },
);

/**
 * Build classes for event
 */
function eventClasses(event: DatepickerEvent): ClassBinding[] {
    const classes = defineClasses(
        ["monthEventClass", "o-datepicker__month__event"],
        [
            "monthEventTypeClass",
            "o-datepicker__month__event--",
            event.type,
            !!event.type,
        ],
        [
            "monthEventIndicatorClass",
            "o-datepicker__month__event--",
            pickerProps.indicators,
            !!pickerProps.indicators,
        ],
        // pass effect scope for rectivity binding
        { scope },
    );
    return classes.value;
}

// #endregion --- Computed Component Classes ---
</script>

<template>
    <section :class="monthClasses">
        <div :class="monthTableClasses">
            <template v-for="(date, idx) in monthDates" :key="idx">
                <div
                    v-if="
                        !pickerProps.disabled &&
                        !pickerProps.readonly &&
                        isDateSelectable(
                            pickerProps,
                            date,
                            date.getMonth(),
                            props.focusedDate.year,
                        )
                    "
                    :ref="(el) => setMonthRef(date, el)"
                    :class="cellClasses(date)"
                    role="button"
                    :tabindex="
                        focusedDate.month === date.getMonth() ? undefined : 0
                    "
                    @click.prevent="selectDate(date)"
                    @pointerenter="onRangeHoverEndDate(date)"
                    @focus="onRangeHoverEndDate(date)"
                    @keydown.prevent="onKeydown($event, date)">
                    {{ monthNames[date.getMonth()] }}
                    <div
                        v-if="eventsDateMatch(date).length"
                        :class="monthEventsClasses">
                        <div
                            v-for="(event, index) in eventsDateMatch(date)"
                            :key="index"
                            :class="eventClasses(event)" />
                    </div>
                </div>

                <div v-else :class="cellClasses(date)">
                    {{ monthNames[date.getMonth()] }}
                    <div
                        v-if="eventsDateMatch(date).length"
                        :class="monthEventsClasses">
                        <div
                            v-for="(event, index) in eventsDateMatch(date)"
                            :key="index"
                            :class="eventClasses(event)" />
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>
