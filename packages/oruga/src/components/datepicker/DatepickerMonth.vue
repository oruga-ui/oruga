<script
    setup
    lang="ts"
    generic="IsRange extends boolean, IsMultiple extends boolean">
import {
    computed,
    ref,
    nextTick,
    watch,
    effectScope,
    onUnmounted,
    type PropType,
    type ComponentPublicInstance,
} from "vue";

import { isDefined, isTrueish } from "@/utils/helpers";
import { defineClasses } from "@/composables";

import { useDatepickerMixins } from "./useDatepickerMixins";

import type { DatepickerEvent, FocusedDate } from "./types";
import type { DatepickerProps } from "./props";
import type { ClassBinding } from "@/types";

defineOptions({
    name: "ODatepickerMonth",
    configField: "datepicker",
    inheritAttrs: false,
});

const props = defineProps({
    modelValue: {
        type: [Date, Array] as PropType<Date | Date[]>,
        default: undefined,
    },
    monthNames: { type: Array as PropType<string[]>, required: true },
    focusedDate: { type: Object as PropType<FocusedDate>, required: true },
    pickerProps: {
        type: Object as PropType<DatepickerProps<IsRange, IsMultiple>>,
        required: true,
    },
});

const emits = defineEmits<{
    /** modelValue prop two-way binding */
    "update:model-value": [value: Date | Date[]];
    /** focusedDate prop two-way binding */
    "update:focusedDate": [value: FocusedDate];
    "range-start": [value: Date];
    "range-end": [value: Date];
}>();

const { dateCreator } = useDatepickerMixins(props.pickerProps);

const selectedBeginDate = ref<Date>();
const selectedEndDate = ref<Date>();
const hoveredEndDate = ref<Date>();

const hasEvents = computed(() => !!props.pickerProps.events?.length);

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
    if (!props.pickerProps.events) return [];

    return props.pickerProps.events
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
    if (!isTrueish(props.pickerProps.range) || !selectedEndDate.value)
        return [];

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

function isDateSelectable(date: Date): boolean {
    const validity: boolean[] = [];

    if (props.pickerProps.minDate)
        validity.push(date >= props.pickerProps.minDate);
    if (props.pickerProps.maxDate)
        validity.push(date <= props.pickerProps.maxDate);

    validity.push(date.getFullYear() === props.focusedDate.year);

    if (props.pickerProps.selectableDates) {
        if (typeof props.pickerProps.selectableDates === "function") {
            if (props.pickerProps.selectableDates(date)) return true;
            else validity.push(false);
        } else {
            for (let i = 0; i < props.pickerProps.selectableDates.length; i++) {
                const enabledDate = props.pickerProps.selectableDates[i];
                if (
                    date.getFullYear() === enabledDate.getFullYear() &&
                    date.getMonth() === enabledDate.getMonth()
                )
                    return true;
                else validity.push(false);
            }
        }
    }

    if (props.pickerProps.unselectableDates) {
        if (typeof props.pickerProps.unselectableDates === "function") {
            validity.push(!props.pickerProps.unselectableDates(date));
        } else {
            for (
                let i = 0;
                i < props.pickerProps.unselectableDates.length;
                i++
            ) {
                const disabledDate = props.pickerProps.unselectableDates[i];
                validity.push(
                    date.getFullYear() !== disabledDate.getFullYear() ||
                        date.getMonth() !== disabledDate.getMonth(),
                );
            }
        }
    }

    if (props.pickerProps.unselectableDaysOfWeek) {
        for (
            let i = 0;
            i < props.pickerProps.unselectableDaysOfWeek.length;
            i++
        ) {
            const dayOfWeek = props.pickerProps.unselectableDaysOfWeek[i];
            validity.push(date.getDay() !== dayOfWeek);
        }
    }

    return validity.indexOf(false) < 0;
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
    if (props.pickerProps.disabled || props.pickerProps.readonly) return;
    if (!isDateSelectable(date)) return;

    if (isTrueish(props.pickerProps.range)) handleSelectRangeDate(date);
    else if (isTrueish(props.pickerProps.multiple))
        handleSelectMultipleDates(date);
    else emits("update:model-value", date);
}

/*
 * If both begin and end dates are set, reset the end date and set the begin date.
 * If only begin date is selected, emit an array of the begin date and the new date.
 * If not set, only set the begin date.
 */
function handleSelectRangeDate(date: Date): void {
    if (selectedBeginDate.value && selectedEndDate.value) {
        selectedBeginDate.value = date;
        selectedEndDate.value = undefined;
        emits("range-start", date);
    } else if (selectedBeginDate.value && !selectedEndDate.value) {
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

const multipleSelectedDates = computed(() =>
    isTrueish(props.pickerProps.multiple) && props.modelValue
        ? props.modelValue
        : [],
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
    if (isTrueish(props.pickerProps.range)) hoveredEndDate.value = day;
}

// --- Computed Component Classes ---

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
    { props: props.pickerProps },
);

const monthTableClasses = defineClasses(
    ["monthTableClass", "o-datepicker__month__table"],
    // passing the picker props will add reactivity to property changes
    { props: props.pickerProps },
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
    { props: props.pickerProps },
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
            dateMatch(
                day,
                props.modelValue,
                isTrueish(props.pickerProps.multiple),
            ) ||
                dateWithin(
                    day,
                    props.modelValue,
                    isTrueish(props.pickerProps.multiple),
                ) ||
                dateMultipleSelected(
                    day,
                    multipleSelectedDates.value,
                    isTrueish(props.pickerProps.multiple),
                ),
        ],
        [
            "monthCellFirstSelectedClass",
            "o-datepicker__month__cell--first-selected",
            null,
            dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[0],
                isTrueish(props.pickerProps.multiple),
            ),
        ],
        [
            "monthCellWithinSelectedClass",
            "o-datepicker__month__cell--within-selected",
            null,
            dateWithin(
                day,
                props.modelValue,
                isTrueish(props.pickerProps.multiple),
            ),
        ],
        [
            "monthCellLastSelectedClass",
            "o-datepicker__month__cell--last-selected",
            null,
            dateMatch(
                day,
                Array.isArray(props.modelValue) && props.modelValue[1],
                isTrueish(props.pickerProps.multiple),
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
            dateMatch(day, dateCreator()),
        ],
        [
            "monthCellSelectableclass",
            "o-datepicker__month__cell--selectable",
            null,
            isDateSelectable(day) &&
                !props.pickerProps.disabled &&
                !props.pickerProps.readonly,
        ],
        [
            "monthCellUnselectableClass",
            "o-datepicker__month__cell--unselectable",
            null,
            !isDateSelectable(day) || props.pickerProps.disabled,
        ],
        // pass effect scope for rectivity binding
        { scope },
    );
    return [...monthCellClasses.value, ...classes.value];
}

const monthEventsClasses = defineClasses(
    ["monthEventsClass", "o-datepicker__month__events"],
    // passing the picker props will add reactivity to property changes
    { props: props.pickerProps },
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
            props.pickerProps.indicators,
            !!props.pickerProps.indicators,
        ],
        // pass effect scope for rectivity binding
        { scope },
    );
    return classes.value;
}
</script>

<template>
    <section :class="monthClasses">
        <div :class="monthTableClasses">
            <template v-for="(date, idx) in monthDates" :key="idx">
                <div
                    v-if="
                        !pickerProps.disabled &&
                        !pickerProps.readonly &&
                        isDateSelectable(date)
                    "
                    :ref="(el) => setMonthRef(date, el)"
                    :class="cellClasses(date)"
                    role="button"
                    :tabindex="
                        focusedDate.month === date.getMonth() ? undefined : 0
                    "
                    @click.prevent="selectDate(date)"
                    @mouseenter="onRangeHoverEndDate(date)"
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
