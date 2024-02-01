<script setup lang="ts">
import {
    computed,
    watch,
    nextTick,
    ref,
    type PropType,
    type ComponentPublicInstance,
} from "vue";

import { defineClasses } from "@/composables";

import { weeksInYear, firstWeekOffset } from "./utils";
import {
    useDatepickerShare,
    type DatepickerProps,
    type DatepickerEvent,
} from "./useDatepickerShare";

import type { ClassBind } from "@/types";

defineOptions({
    name: "ODatepickerTableRow",
    configField: "datepicker",
});

const props = defineProps({
    day: { type: Number, required: true },
    week: { type: Array as PropType<Date[]>, required: true },
    month: { type: Number, required: true },
    selectedDate: {
        type: [Date, Array] as PropType<Date | Date[]>,
        default: undefined,
    },
    events: { type: Array as PropType<DatepickerEvent[]>, default: undefined },
    hoveredDateRange: { type: Array as PropType<Date[]>, default: () => [] },
    pickerProps: {
        type: Object as PropType<DatepickerProps>,
        required: true,
    },
});

const emits = defineEmits<{
    (e: "select", value: Date): void;
    (e: "hover-enddate", value: Date): void;
    (e: "change-focus", value: Date): void;
    (e: "week-number-click", value: number): void;
}>();

const { isDateSelectable } = useDatepickerShare(props.pickerProps);

const datepicker = computed<DatepickerProps>(() => props.pickerProps);

const hasEvents = computed(() => !!props.events?.length);

const dayRefs = ref(new Map());

function setDayRef(date: Date, el: Element | ComponentPublicInstance): void {
    const refKey = `day-${date.getMonth()}-${date.getDate()}`;
    if (el) dayRefs.value.set(refKey, el);
}

watch(
    () => props.day,
    (day) => {
        // if day is in week
        if (props.week.map((d) => d.getDate()).includes(day))
            nextTick(() => {
                // $nextTick is needed when month is changed
                const refKey = `day-${props.month}-${day}`;
                const ref = dayRefs.value.get(refKey);
                if (ref) ref.focus();
            });
    },
);

function clickWeekNumber(week: number): void {
    if (datepicker.value.weekNumberClickable) emits("week-number-click", week);
}

function getDayOfYear(input): number {
    return (
        Math.round(
            (input.getTime() - new Date(input.getFullYear(), 0, 1).getTime()) /
                864e5,
        ) + 1
    );
}

function getWeekNumber(mom): number {
    const dow = datepicker.value.firstDayOfWeek; // first day of week
    // Rules for the first week : 1 for the 1st January, 4 for the 4th January
    const doy = datepicker.value.rulesForFirstWeek;
    const weekOffset = firstWeekOffset(mom.getFullYear(), dow, doy);
    const week = Math.floor((getDayOfYear(mom) - weekOffset - 1) / 7) + 1;
    let resWeek;
    let resYear;
    if (week < 1) {
        resYear = mom.getFullYear() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.getFullYear(), dow, doy)) {
        resWeek = week - weeksInYear(mom.getFullYear(), dow, doy);
        resYear = mom.getFullYear() + 1;
    } else {
        resYear = mom.getFullYear();
        resWeek = week;
    }
    return resWeek;
}

function eventsDateMatch(day: Date): DatepickerEvent[] {
    if (!props.events?.length) return [];
    return props.events.filter((event) => event.date.getDay() === day.getDay());
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

/** Emit select event with chosen date as payload */
function selectDate(date: Date): void {
    if (datepicker.value.disabled) return;
    if (isDateSelectable(date, props.month)) emits("select", date);
}

function changeFocus(day, inc): void {
    const nextDay = new Date(day.getTime());
    nextDay.setDate(day.getDate() + inc);
    // if next day is out of range or not selectable, move to next selectable date
    while (
        (datepicker.value.minDate && nextDay < datepicker.value.minDate) ||
        (datepicker.value.maxDate && nextDay > datepicker.value.maxDate) ||
        !isDateSelectable(nextDay, nextDay.getMonth())
    ) {
        // revert day selection until selectable day is reached
        nextDay.setDate(nextDay.getDate() - Math.sign(inc));
    }
    setRangeHoverEndDate(nextDay);
    emits("change-focus", nextDay);
}

function setRangeHoverEndDate(day): void {
    if (datepicker.value.range) emits("hover-enddate", day);
}

// --- Computed Component Classes ---

function dateMatch(dateOne, dateTwo, multiple = false): boolean {
    // if either date is null or undefined, return false
    // if using multiple flag, return false
    if (!dateOne || !dateTwo || multiple) return false;

    if (Array.isArray(dateTwo)) {
        return dateTwo.some(
            (date) =>
                dateOne.getDate() === date.getDate() &&
                dateOne.getFullYear() === date.getFullYear() &&
                dateOne.getMonth() === date.getMonth(),
        );
    }
    return (
        dateOne.getDate() === dateTwo.getDate() &&
        dateOne.getFullYear() === dateTwo.getFullYear() &&
        dateOne.getMonth() === dateTwo.getMonth()
    );
}

function dateWithin(dateOne, dates, multiple = false): boolean {
    if (!Array.isArray(dates) || multiple) return false;
    return dateOne > dates[0] && dateOne < dates[1];
}

/** Build cellClasses for cell using validations */
function cellClasses(day: Date): ClassBind[] {
    const classes = defineClasses(
        [
            "tableCellSelectedClass",
            "o-dpck__table__cell--selected",
            null,
            dateMatch(day, props.selectedDate) ||
                dateWithin(day, props.selectedDate, datepicker.value.multiple),
        ],
        [
            "tableCellFirstSelectedClass",
            "o-dpck__table__cell--first-selected",
            null,
            dateMatch(
                day,
                Array.isArray(props.selectedDate) && props.selectedDate[0],
                datepicker.value.multiple,
            ),
        ],
        [
            "tableCellWithinSelectedClass",
            "o-dpck__table__cell--within-selected",
            null,
            dateWithin(day, props.selectedDate, datepicker.value.multiple),
        ],
        [
            "tableCellLastSelectedClass",
            "o-dpck__table__cell--last-selected",
            null,
            dateMatch(
                day,
                Array.isArray(props.selectedDate) && props.selectedDate[1],
                datepicker.value.multiple,
            ),
        ],
        [
            "tableCellFirstHoveredClass",
            "o-dpck__table__cell--first-hovered",
            null,
            dateMatch(
                day,
                Array.isArray(props.hoveredDateRange) &&
                    props.hoveredDateRange[0],
            ),
        ],
        [
            "tableCellWithinHoveredClass",
            "o-dpck__table__cell--within-hovered",
            null,
            dateWithin(day, props.hoveredDateRange),
        ],
        [
            "tableCellLastHoveredClass",
            "o-dpck__table__cell--last-hovered",
            null,
            dateMatch(
                day,
                Array.isArray(props.hoveredDateRange) &&
                    props.hoveredDateRange[1],
            ),
        ],
        [
            "tableCellTodayClass",
            "o-dpck__table__cell--today",
            null,
            dateMatch(day, datepicker.value.dateCreator()),
        ],
        [
            "tableCellSelectableClass",
            "o-dpck__table__cell--selectable",
            null,
            isDateSelectable(day, props.month) && !datepicker.value.disabled,
        ],
        [
            "tableCellUnselectableClass",
            "o-dpck__table__cell--unselectable",
            null,
            !isDateSelectable(day, props.month) || datepicker.value.disabled,
        ],

        [
            "tableCellInvisibleClass",
            "o-dpck__table__cell--invisible",
            null,
            !datepicker.value.nearbyMonthDays && day.getMonth() !== props.month,
        ],

        [
            "tableCellNearbyClass",
            "o-dpck__table__cell--nearby",
            null,
            datepicker.value.nearbySelectableMonthDays &&
                day.getMonth() !== props.month,
        ],
        [
            "tableCellTodayClass",
            "o-dpck__table__cell--today",
            null,
            dateMatch(day, datepicker.value.dateCreator()),
        ],
    );

    return [
        ...tableCellClasses.value,
        ...cellEventsClass.value,
        ...classes.value,
    ];
}

function eventClasses(event: DatepickerEvent): ClassBind[] {
    const classes = defineClasses(
        ["tableEventClass", "o-dpck__table__event"],
        [
            "tableEventVariantClass",
            "o-dpck__table__event--",
            event.type,
            !!event.type,
        ],
        [
            "tableEventIndicatorsClass",
            "o-dpck__table__event--",
            datepicker.value.indicators,
            !!datepicker.value.indicators,
        ],
    );
    return classes.value;
}

const tableRowClasses = defineClasses(["tableRowClass", "o-dpck__table__row"]);

const tableCellClasses = defineClasses([
    "tableCellClass",
    "o-dpck__table__cell",
]);

const tableEventsClasses = defineClasses([
    "tableEventsClass",
    "o-dpck__table__events",
]);

const cellEventsClass = defineClasses([
    "tableCellEventsClass",
    "o-dpck__table__cell--events",
    null,
    hasEvents,
]);
</script>

<template>
    <div :class="tableRowClasses">
        <button
            v-if="datepicker.showWeekNumber"
            :class="tableCellClasses"
            :style="{
                cursor: datepicker.weekNumberClickable ? 'pointer' : 'auto',
            }"
            :tabindex="datepicker.weekNumberClickable ? '0' : null"
            @click.prevent="clickWeekNumber(getWeekNumber(week[6]))"
            @keydown.enter.prevent="clickWeekNumber(getWeekNumber(week[6]))">
            <span>{{ getWeekNumber(week[6]) }}</span>
        </button>
        <template v-for="(weekDay, idx) in week" :key="idx">
            <button
                v-if="!datepicker.disabled && isDateSelectable(weekDay, month)"
                :ref="(el) => setDayRef(weekDay, el)"
                :class="cellClasses(weekDay)"
                :tabindex="
                    day === weekDay.getDate() && month === weekDay.getMonth()
                        ? null
                        : 0
                "
                @click.prevent="selectDate(weekDay)"
                @mouseenter="setRangeHoverEndDate(weekDay)"
                @focus="setRangeHoverEndDate(weekDay)"
                @keydown="onKeydown($event, weekDay)">
                <span>{{ weekDay.getDate() }}</span>
                <div
                    v-if="eventsDateMatch(weekDay).length"
                    :class="tableEventsClasses">
                    <div
                        v-for="(event, index) in eventsDateMatch(weekDay)"
                        :key="index"
                        :class="eventClasses(event)" />
                </div>
            </button>
            <div v-else :key="idx" :class="cellClasses(weekDay)">
                <span>{{ weekDay.getDate() }}</span>
            </div>
        </template>
    </div>
</template>
