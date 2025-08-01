<script
    setup
    lang="ts"
    generic="
        IsRange extends boolean = false,
        IsMultiple extends boolean = false
    ">
import { computed, ref, watch, useTemplateRef } from "vue";

import OButton from "../button/Button.vue";
import OSelect from "../select/Select.vue";
import OPickerWrapper from "../utils/PickerWrapper.vue";
import ODatepickerTable from "./DatepickerTable.vue";
import ODatepickerMonth from "./DatepickerMonth.vue";

import { getDefault } from "@/utils/config";
import { isDate, pad } from "@/utils/helpers";
import { defineClasses, getActiveClasses, useMatchMedia } from "@/composables";

import { useDatepickerMixins } from "./useDatepickerMixins";
import { getMonthNames, getWeekdayNames } from "./utils";

import type { OptionsPropItem } from "@/types";
import type { FocusedDate } from "./types";
import type { DatepickerProps } from "./props";

/**
 * An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile.
 * @displayName Datepicker
 * @style _datepicker.scss
 */
defineOptions({
    isOruga: true,
    name: "ODatepicker",
    configField: "datepicker",
});

type ModelValue = DatepickerProps<IsRange, IsMultiple>["modelValue"];

const props = withDefaults(
    defineProps<DatepickerProps<IsRange, IsMultiple>>(),
    {
        override: undefined,
        modelValue: undefined,
        // range: false,
        // multiple: false,
        active: false,
        type: "date",
        dayNames: () => getDefault("datepicker.dayNames"),
        monthNames: () => getDefault("datepicker.monthNames"),
        size: () => getDefault("datepicker.size"),
        focusedDate: undefined,
        events: undefined,
        indicators: "dots",
        minDate: undefined,
        maxDate: undefined,
        expanded: () => getDefault("datepicker.expanded", false),
        rounded: false,
        inline: false,
        placeholder: undefined,
        readonly: false,
        disabled: false,
        openOnFocus: () => getDefault("datepicker.openOnFocus", true),
        closeOnClick: () => getDefault("datepicker.closeOnClick", true),
        locale: () => getDefault("locale"),
        formatter: getDefault("datepicker.formatter"),
        parser: getDefault("datepicker.parser"),
        creator: getDefault("datepicker.creator"),
        selectableDates: undefined,
        unselectableDates: undefined,
        unselectableDaysOfWeek: () =>
            getDefault("datepicker.unselectableDaysOfWeek"),
        nearbyMonthDays: () => getDefault("datepicker.nearbyMonthDays", true),
        nearbySelectableMonthDays: () =>
            getDefault("datepicker.nearbySelectableMonthDays", false),
        showWeekNumber: () => getDefault("datepicker.showWeekNumber", false),
        weekNumberClickable: () =>
            getDefault("datepicker.weekNumberClickable", false),
        firstDayOfWeek: () => getDefault("datepicker.firstDayOfWeek", 0),
        rulesForFirstWeek: 4,
        yearsRange: () => getDefault("datepicker.yearsRange", [-100, 10]),
        position: undefined,
        iconPack: () => getDefault("datepicker.iconPack"),
        icon: () => getDefault("datepicker.icon"),
        iconRight: () => getDefault("datepicker.iconRight"),
        iconRightClickable: false,
        iconPrev: () => getDefault("datepicker.iconPrev", "chevron-left"),
        iconNext: () => getDefault("datepicker.iconNext", "chevron-right"),
        desktopModal: () => getDefault("datepicker.desktopModal", false),
        mobileModal: () => getDefault("datepicker.mobileModal", true),
        mobileNative: () => getDefault("datepicker.mobileNative", false),
        mobileBreakpoint: () => getDefault("datepicker.mobileBreakpoint"),
        teleport: () => getDefault("datepicker.teleport", false),
        useHtml5Validation: () => getDefault("useHtml5Validation", true),
        customValidity: "",
        ariaNextLabel: () =>
            getDefault("datepicker.ariaNextLabel", "Next Page"),
        ariaPreviousLabel: () =>
            getDefault("datepicker.ariaNextLabel", "Previous Page"),
        ariaSelectMonthLabel: () =>
            getDefault("datepicker.ariaSelectMonthLabel", "Select Month"),
        ariaSelectYearLabel: () =>
            getDefault("datepicker.ariaSelectYearLabel", "Select Year"),
        inputClasses: () => getDefault("datepicker.inputClasses"),
        dropdownClasses: () => getDefault("datepicker.dropdownClasses"),
        selectClasses: () => getDefault("datepicker.selectClasses"),
    },
);

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {Date | Date[]} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on range start is selected event
     * @param value {Date} range start date
     */
    "range-start": [value: Date];
    /**
     * on range end is selected event
     * @param value {Date} range end date
     */
    "range-end": [value: Date];
    /**
     * on month change event
     * @param value {number} month number
     */
    "change-month": [value: number];
    /**
     * on year change event
     * @param value {number} year number
     */
    "change-year": [value: number];
    /**
     * on input focus event
     * @param event {Event} native event
     */
    focus: [event: Event];
    /**
     * on input blur event
     * @param event {Event} native event
     */
    blur: [event: Event];
    /**
     * on input invalid event
     * @param event {Event} native event
     */
    invalid: [event: Event];
    /**
     * on icon click event
     * @param event {Event} native event
     */
    "icon-click": [event: Event];
    /**
     * on icon right click event
     * @param event {Event} native event
     */
    "icon-right-click": [event: Event];
}>();

const { dtf, dateCreator, dateFormatter, dateParser } =
    useDatepickerMixins(props);

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const pickerRef = useTemplateRef("pickerComponent");

// the modelvalue of selected date, use v-model to make it two-way binding
const vmodel = defineModel<ModelValue>({ default: undefined });

// the active state of the dropdown, use v-model:active to make it two-way binding
const isActive = defineModel<boolean>("active", { default: false });

const isTypeMonth = computed(() => props.type === "month");

/**
 * When v-model is changed:
 *   1. Update internal value.
 */
watch(
    () => props.modelValue,
    (value: ModelValue) => {
        const isArray = Array.isArray(value);
        const currentDate: Date = isArray
            ? value.length
                ? value[value.length - 1]
                : dateCreator()
            : value
              ? value
              : dateCreator();
        if (
            !isArray ||
            (isArray &&
                Array.isArray(vmodel.value) &&
                value.length > vmodel.value.length)
        )
            // update internal state
            focusedDateData.value = {
                day: currentDate.getDate(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
            };
    },
);

watch(
    () => props.focusedDate,
    (value) => {
        if (value) {
            focusedDateData.value = {
                day: value.getDate(),
                month: value.getMonth(),
                year: value.getFullYear(),
            };
        }
    },
);

const _initialDate: Date =
    (Array.isArray(props.modelValue)
        ? props.modelValue[0]
        : props.modelValue) ||
    props.focusedDate ||
    dateCreator();

if (
    !props.modelValue &&
    props.maxDate &&
    props.maxDate.getFullYear() < _initialDate.getFullYear()
) {
    _initialDate.setFullYear(props.maxDate.getFullYear());
}

const focusedDateData = ref<FocusedDate>({
    day: _initialDate.getDate(),
    month: _initialDate.getMonth(),
    year: _initialDate.getFullYear(),
});

/*
 * Emit input event on month and/or year change
 */
watch(
    () => focusedDateData.value.month,
    (value) => emits("change-month", value),
);
watch(
    () => focusedDateData.value.year,
    (value) => emits("change-year", value),
);

const computedMonthNames = computed(() =>
    Array.isArray(props.monthNames)
        ? props.monthNames
        : getMonthNames(props.locale),
);

const listOfMonths = computed<OptionsPropItem<number>[]>(() => {
    let minMonth = 0;
    let maxMonth = 12;
    if (
        props.minDate &&
        focusedDateData.value.year === props.minDate.getFullYear()
    ) {
        minMonth = props.minDate.getMonth();
    }
    if (
        props.maxDate &&
        focusedDateData.value.year === props.maxDate.getFullYear()
    ) {
        maxMonth = props.maxDate.getMonth();
    }
    return computedMonthNames.value.map((name, index) => ({
        label: name,
        value: index,
        attrs: { disabled: index < minMonth || index > maxMonth },
    }));
});

const computedDayNames = computed(() =>
    Array.isArray(props.dayNames)
        ? props.dayNames
        : getWeekdayNames(props.locale),
);

/*
 * Returns an array of years for the year dropdown. If earliest/latest
 * dates are set by props, range of years will fall within those dates.
 */
const listOfYears = computed<OptionsPropItem<number>[]>(() => {
    let latestYear = _initialDate.getFullYear() + props.yearsRange[1];
    if (props.maxDate && props.maxDate.getFullYear() < latestYear) {
        latestYear = Math.max(
            props.maxDate.getFullYear(),
            focusedDateData.value.year,
        );
    }

    let earliestYear = _initialDate.getFullYear() + props.yearsRange[0];
    if (props.minDate && props.minDate.getFullYear() > earliestYear) {
        earliestYear = Math.min(
            props.minDate.getFullYear(),
            focusedDateData.value.year,
        );
    }

    return Array.from(
        { length: latestYear - earliestYear + 1 || 1 },
        (value, index) => earliestYear + index,
    )
        .reverse()
        .map((year) => ({
            label: String(year),
            value: year,
        }));
});

const showPrev = computed<boolean>(() => {
    if (!props.minDate) return true;
    if (isTypeMonth.value)
        return focusedDateData.value.year > props.minDate.getFullYear();

    const dateToCheck = new Date(
        focusedDateData.value.year,
        focusedDateData.value.month,
    );
    const date = new Date(
        props.minDate.getFullYear(),
        props.minDate.getMonth(),
    );
    return dateToCheck > date;
});

/**
 * Either decrement month by 1 if not January or decrement year by 1
 * and set month to 11 (December) or decrement year when 'month'
 */
function prev(): void {
    if (props.disabled) return;

    if (isTypeMonth.value) {
        focusedDateData.value.year -= 1;
    } else {
        if (focusedDateData.value.month > 0) {
            focusedDateData.value.month -= 1;
        } else {
            focusedDateData.value.month = 11;
            focusedDateData.value.year -= 1;
        }
    }
}

const showNext = computed<boolean>(() => {
    if (!props.maxDate) return true;
    if (isTypeMonth.value)
        return focusedDateData.value.year < props.maxDate.getFullYear();

    const dateToCheck = new Date(
        focusedDateData.value.year,
        focusedDateData.value.month,
    );
    const date = new Date(
        props.maxDate.getFullYear(),
        props.maxDate.getMonth(),
    );
    return dateToCheck < date;
});

/**
 * Either increment month by 1 if not December or increment year by 1
 * and set month to 0 (January) or increment year when 'month'
 */
function next(): void {
    if (props.disabled) return;
    if (isTypeMonth.value) {
        focusedDateData.value.year += 1;
    } else {
        if (focusedDateData.value.month < 11) {
            focusedDateData.value.month += 1;
        } else {
            focusedDateData.value.month = 0;
            focusedDateData.value.year += 1;
        }
    }
}

// --- Formatter / Parser ---

/** Format date into string */
function format(value: Date | Date[] | undefined, isNative: boolean): string {
    if (isNative) return formatNative(value);

    // define function prop
    const date = (Array.isArray(value) ? [...value] : value) as ModelValue;

    return dateFormatter(date);
}

function formatNative(value: Date | Date[] | undefined): string {
    if (Array.isArray(value)) value = value[0];

    // return empty string if no value is given or value can't parse to proper date
    if (!value) return "";
    const date = new Date(value);
    if (!isDate(date)) return "";

    if (isTypeMonth.value) {
        // Format date into string 'YYYY-MM'
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year + "-" + pad(month);
    } else {
        // Format date into string 'YYYY-MM-DD'
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + "-" + pad(month) + "-" + pad(day);
    }
}

/** Parse string into date */
function parse(value: string, isNative: boolean): Date | Date[] | undefined {
    if (isNative) return parseNative(value);

    const date = dateParser(value);

    const isValid =
        isDate(date) ||
        (Array.isArray(date) &&
            date.length === 2 &&
            isDate(date[0]) &&
            isDate(date[1]));

    return isValid ? date : undefined;
}

/** Parse date from string */
function parseNative(value: string): Date | undefined {
    const s = value ? value.split("-") : [];
    if (s.length !== 3) return undefined;
    const year = parseInt(s[0], 10);
    const month = parseInt(s[1]) - 1;
    const day = parseInt(s[2]);
    return new Date(year, month, day);
}

// --- Event Handler ---

/** move to the previous focused date */
function prevDate(): void {
    if (props.disabled) return;

    if (isTypeMonth.value) {
        focusedDateData.value.year -= 1;
    } else {
        const date = new Date(
            focusedDateData.value.year,
            focusedDateData.value.month,
            focusedDateData.value.day,
        );
        date.setDate(date.getDate() - 1);
        focusedDateData.value.day = date.getDate();
        focusedDateData.value.month = date.getMonth();
        focusedDateData.value.year = date.getFullYear();

        // todo: show selected hovered date
        // vmodel.value = date as ModelValue;
    }
}

/** move to the next focused date */
function nextDate(): void {
    if (props.disabled) return;

    if (isTypeMonth.value) {
        focusedDateData.value.year += 1;
    } else {
        const date = new Date(
            focusedDateData.value.year,
            focusedDateData.value.month,
            focusedDateData.value.day,
        );
        date.setDate(date.getDate() + 1);
        focusedDateData.value.day = date.getDate();
        focusedDateData.value.month = date.getMonth();
        focusedDateData.value.year = date.getFullYear();

        // todo: show selected hovered date
        // vmodel.value = date as ModelValue;
    }
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-datepicker"],
    [
        "sizeClass",
        "o-datepicker--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    ["mobileClass", "o-datepicker--mobile", null, isMobile],
    [
        "expandedClass",
        "o-datepicker--expanded",
        null,
        computed(() => props.expanded),
    ],
);

const boxClasses = defineClasses(["boxClass", "o-datepicker__box"]);
const boxClassBind = computed(() => getActiveClasses(boxClasses));

const headerClasses = defineClasses(["headerClass", "o-datepicker__header"]);

const prevButtonClasses = defineClasses([
    "prevButtonClass",
    "o-datepicker__header__previous",
]);

const nextButtonClasses = defineClasses([
    "nextButtonClass",
    "o-datepicker__header__next",
]);

const listsClasses = defineClasses([
    "listsClass",
    "o-datepicker__header__list",
]);

const footerClasses = defineClasses(["footerClass", "o-datepicker__footer"]);

const pickerDropdownClasses = defineClasses([
    "dropdownClass",
    "o-datepicker__dropdown",
]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: () => pickerRef.value?.focus(), value: vmodel });
</script>

<template>
    <OPickerWrapper
        ref="pickerComponent"
        v-model:active="isActive"
        v-model:value="vmodel"
        data-oruga="datepicker"
        :picker-props="props"
        :formatter="format"
        :parser="parse"
        :type="!isTypeMonth ? 'date' : 'month'"
        :max="maxDate"
        :min="minDate"
        :stay-open="props.multiple"
        :root-classes="rootClasses"
        :dropdown-classes="pickerDropdownClasses"
        :box-class="boxClassBind"
        :dtf="dtf"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @invalid="$emit('invalid', $event)"
        @left="prevDate"
        @right="nextDate"
        @icon-click="$emit('icon-click', $event)"
        @icon-right-click="$emit('icon-right-click', $event)">
        <template v-if="$slots.trigger" #trigger>
            <!--
                @slot Override the trigger
            -->
            <slot name="trigger" />
        </template>

        <header :class="headerClasses">
            <!--
                @slot Override the header
            -->
            <slot name="header">
                <OButton
                    v-if="!disabled"
                    :class="prevButtonClasses"
                    :disabled="!showPrev"
                    :icon-pack="iconPack"
                    :icon-left="iconPrev"
                    :size="size"
                    :aria-label="ariaPreviousLabel"
                    @click.prevent="prev"
                    @keydown.enter.prevent="prev"
                    @keydown.space.prevent="prev" />

                <OButton
                    v-if="!disabled"
                    :class="nextButtonClasses"
                    :disabled="!showNext"
                    :icon-pack="iconPack"
                    :icon-left="iconNext"
                    :size="size"
                    :aria-label="ariaNextLabel"
                    @click.prevent="next"
                    @keydown.enter.prevent="next"
                    @keydown.space.prevent="next" />

                <div :class="listsClasses">
                    <o-select
                        v-if="!isTypeMonth"
                        v-bind="selectClasses"
                        v-model="focusedDateData.month"
                        :disabled="disabled"
                        :size="size"
                        :options="listOfMonths"
                        :aria-label="ariaSelectMonthLabel"
                        :use-html5-validation="false"
                        @keydown.left.stop.prevent="prev"
                        @keydown.right.stop.prevent="next" />

                    <o-select
                        v-bind="selectClasses"
                        v-model="focusedDateData.year"
                        :disabled="disabled"
                        :size="size"
                        :options="listOfYears"
                        :aria-label="ariaSelectYearLabel"
                        :use-html5-validation="false"
                        @keydown.left.stop.prevent="prev"
                        @keydown.right.stop.prevent="next"
                        @keydown.up.stop.prevent="focusedDateData.year += 1"
                        @keydown.down.stop.prevent="
                            focusedDateData.year -= 1
                        " />
                </div>
            </slot>
        </header>

        <!--
            @slot Override the body
        -->
        <slot name="body">
            <o-datepicker-month
                v-if="isTypeMonth"
                v-model="vmodel"
                v-model:focused-date="focusedDateData"
                :month-names="computedMonthNames"
                :picker-props="props"
                @range-start="(date) => $emit('range-start', date)"
                @range-end="(date) => $emit('range-end', date)" />

            <o-datepicker-table
                v-else
                v-model="vmodel"
                v-model:focused-date="focusedDateData"
                :day-names="computedDayNames"
                :month-names="computedMonthNames"
                :picker-props="props"
                @range-start="(date) => $emit('range-start', date)"
                @range-end="(date) => $emit('range-end', date)" />
        </slot>

        <footer v-if="$slots.footer" :class="footerClasses">
            <!--
                @slot Define an additional footer
            -->
            <slot name="footer" />
        </footer>
    </OPickerWrapper>
</template>
