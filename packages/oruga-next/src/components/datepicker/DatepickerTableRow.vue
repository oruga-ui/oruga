<script setup lang="ts">
import {
    computed,
    watch,
    nextTick,
    ref,
    type PropType,
    type ComponentPublicInstance,
} from "vue";
import { useComputedClass } from "@/composables";
import {
    useDatepickerMixins,
    type DatepickerProps,
    type DatepickerEvent,
} from "./useDatepickerShare";
import { weeksInYear, firstWeekOffset } from "./datepickerUtils";
import type { BindProp } from "@/types";

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

const { isDateSelectable } = useDatepickerMixins(props);

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
        const refKey = `day-${props.month}-${day}`;
        nextTick(() => {
            // $nextTick is needed when month is changed
            const ref = dayRefs.value.get(refKey);
            if (ref?.length > 0 && ref[0]) {
                ref[0].focus();
            }
        });
    },
);

function clickWeekNumber(week: number): void {
    if (datepicker.value.weekNumberClickable) emits("week-number-click", week);
}

function getSetDayOfYear(input): number {
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
    const week = Math.floor((getSetDayOfYear(mom) - weekOffset - 1) / 7) + 1;
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

// --- Events ---

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
 * Emit select event with chosen date as payload
 */
function selectDate(date: Date): void {
    if (datepicker.value.disabled) return;
    if (isDateSelectable(date, props.month)) emits("select", date);
}

function changeFocus(day, inc): void {
    const nextDay = new Date(day.getTime());
    nextDay.setDate(day.getDate() + inc);
    while (
        (!datepicker.value.minDate || nextDay > datepicker.value.minDate) &&
        (!datepicker.value.maxDate || nextDay < datepicker.value.maxDate) &&
        !isDateSelectable(nextDay, props.month)
    ) {
        nextDay.setDate(day.getDate() + Math.sign(inc));
    }
    setRangeHoverEndDate(nextDay);
    emits("change-focus", nextDay);
}

function setRangeHoverEndDate(day): void {
    if (datepicker.value.range) emits("hover-enddate", day);
}

// --- Computed Component Classes ---

/** Build cellClasses for cell using validations */
function cellClasses(day: Date): BindProp {
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

    return [
        ...tableCellClasses.value,
        {
            [useComputedClass(
                "tableCellSelectedClass",
                "o-dpck__table__cell--selected",
            )]:
                dateMatch(day, props.selectedDate) ||
                dateWithin(day, props.selectedDate, datepicker.value.multiple),
        },
        {
            [useComputedClass(
                "tableCellFirstSelectedClass",
                "o-dpck__table__cell--first-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.selectedDate) && props.selectedDate[0],
                datepicker.value.multiple,
            ),
        },
        {
            [useComputedClass(
                "tableCellWithinSelectedClass",
                "o-dpck__table__cell--within-selected",
            )]: dateWithin(day, props.selectedDate, datepicker.value.multiple),
        },
        {
            [useComputedClass(
                "tableCellLastSelectedClass",
                "o-dpck__table__cell--last-selected",
            )]: dateMatch(
                day,
                Array.isArray(props.selectedDate) && props.selectedDate[1],
                datepicker.value.multiple,
            ),
        },
        {
            [useComputedClass(
                "tableCellFirstHoveredClass",
                "o-dpck__table__cell--first-hovered",
            )]: dateMatch(
                day,
                Array.isArray(props.hoveredDateRange) &&
                    props.hoveredDateRange[0],
            ),
        },
        {
            [useComputedClass(
                "tableCellWithinHoveredClass",
                "o-dpck__table__cell--within-hovered",
            )]: dateWithin(day, props.hoveredDateRange),
        },
        {
            [useComputedClass(
                "tableCellLastHoveredClass",
                "o-dpck__table__cell--last-hovered",
            )]: dateMatch(
                day,
                Array.isArray(props.hoveredDateRange) &&
                    props.hoveredDateRange[1],
            ),
        },
        {
            [useComputedClass(
                "tableCellTodayClass",
                "o-dpck__table__cell--today",
            )]: dateMatch(day, datepicker.value.dateCreator()),
        },
        {
            [useComputedClass(
                "tableCellSelectableClass",
                "o-dpck__table__cell--selectable",
            )]:
                isDateSelectable(day, props.month) &&
                !datepicker.value.disabled,
        },
        {
            [useComputedClass(
                "tableCellUnselectableClass",
                "o-dpck__table__cell--unselectable",
            )]:
                !isDateSelectable(day, props.month) ||
                datepicker.value.disabled,
        },
        {
            [useComputedClass(
                "tableCellInvisibleClass",
                "o-dpck__table__cell--invisible",
            )]:
                !datepicker.value.nearbyMonthDays &&
                day.getMonth() !== props.month,
        },
        {
            [useComputedClass(
                "tableCellNearbyClass",
                "o-dpck__table__cell--nearby",
            )]:
                datepicker.value.nearbySelectableMonthDays &&
                day.getMonth() !== props.month,
        },
        {
            [useComputedClass(
                "tableCellEventsClass",
                "o-dpck__table__cell--events",
            )]: hasEvents.value,
        },
        {
            [useComputedClass(
                "tableCellTodayClass",
                "o-dpck__table__cell--today",
            )]: dateMatch(day, datepicker.value.dateCreator()),
        },
    ];
}

function eventClasses(event: DatepickerEvent): BindProp {
    return [
        useComputedClass("tableEventClass", "o-dpck__table__event"),
        {
            [useComputedClass(
                "tableEventVariantClass",
                "o-dpck__table__event--",
                event.type,
            )]: event.type,
        },
        {
            [useComputedClass(
                "tableEventIndicatorsClass",
                "o-dpck__table__event--",
                datepicker.value.indicators,
            )]: datepicker.value.indicators,
        },
    ];
}

const tableRowClasses = computed(() => [
    useComputedClass("tableRowClass", "o-dpck__table__row"),
]);

const tableCellClasses = computed(() => [
    useComputedClass("tableCellClass", "o-dpck__table__cell"),
]);

const tableEventsClasses = computed(() => [
    useComputedClass("tableEventsClass", "o-dpck__table__events"),
]);
</script>

<template>
    <div :class="tableRowClasses">
        <a
            v-if="datepicker.showWeekNumber"
            :class="tableCellClasses"
            :style="{
                cursor: datepicker.weekNumberClickable ? 'pointer' : 'auto',
            }"
            @click.prevent="clickWeekNumber(getWeekNumber(week[6]))">
            <span>{{ getWeekNumber(week[6]) }}</span>
        </a>
        <template v-for="(weekDay, idx) in week" :key="idx">
            <a
                v-if="!datepicker.disabled && isDateSelectable(weekDay, month)"
                :ref="(el) => setDayRef(weekDay, el)"
                :class="cellClasses(weekDay)"
                role="button"
                href="#"
                :tabindex="
                    day === weekDay.getDate() && month === weekDay.getMonth()
                        ? null
                        : -1
                "
                @click.prevent="selectDate(weekDay)"
                @mouseenter="setRangeHoverEndDate(weekDay)"
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
            </a>
            <div v-else :key="idx" :class="cellClasses(weekDay)">
                <span>{{ weekDay.getDate() }}</span>
            </div>
        </template>
    </div>
</template>
