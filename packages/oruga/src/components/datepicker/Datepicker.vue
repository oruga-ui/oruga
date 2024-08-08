<script
    setup
    lang="ts"
    generic="
        IsRange extends boolean = false,
        IsMultiple extends boolean = false
    ">
import { computed, ref, watch } from "vue";

import OButton from "../button/Button.vue";
import OSelect from "../select/Select.vue";
import OPickerWrapper from "../utils/PickerWrapper.vue";
import ODatepickerTable from "./DatepickerTable.vue";
import ODatepickerMonth from "./DatepickerMonth.vue";

import { getOption } from "@/utils/config";
import { isDate, pad } from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useMatchMedia,
    useVModel,
} from "@/composables";

import { useDatepickerMixins } from "./useDatepickerMixins";
import { getMonthNames, getWeekdayNames } from "./utils";

import type { FocusedDate } from "./types";
import type { DatepickerProps } from "./props";
import type { OptionsItem } from "../select";

/**
 * An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile
 * @displayName Datepicker
 * @style _datepicker.scss
 */
defineOptions({
    isOruga: true,
    name: "ODatepicker",
    configField: "datepicker",
});

const props = withDefaults(
    defineProps<DatepickerProps<IsRange, IsMultiple>>(),
    {
        override: undefined,
        modelValue: null,
        // range: false,
        // multiple: false,
        active: false,
        type: "date",
        dayNames: () => getOption("datepicker.dayNames", undefined),
        monthNames: () => getOption("datepicker.monthNames", undefined),
        size: () => getOption("datepicker.size"),
        focusedDate: undefined,
        events: undefined,
        indicators: "dots",
        minDate: undefined,
        maxDate: undefined,
        expanded: false,
        rounded: false,
        inline: false,
        placeholder: undefined,
        readonly: false,
        disabled: false,
        openOnFocus: () => getOption("datepicker.openOnFocus", true),
        closeOnClick: () => getOption("datepicker.closeOnClick", true),
        locale: () => getOption("locale"),
        dateFormatter: (date) =>
            getOption<(date) => string>(
                "datepicker.dateFormatter",
                () => undefined,
            )(date),
        dateParser: (date: string) =>
            getOption<(date: string) => any>(
                "datepicker.dateParser",
                () => undefined,
            )(date),
        dateCreator: () =>
            getOption("datepicker.dateCreator", () => new Date())(),
        selectableDates: undefined,
        unselectableDates: undefined,
        unselectableDaysOfWeek: () =>
            getOption("datepicker.unselectableDaysOfWeek", undefined),
        nearbyMonthDays: () => getOption("datepicker.nearbyMonthDays", true),
        nearbySelectableMonthDays: () =>
            getOption("datepicker.nearbySelectableMonthDays", false),
        showWeekNumber: () => getOption("datepicker.showWeekNumber", false),
        weekNumberClickable: () =>
            getOption("datepicker.weekNumberClickable", false),
        firstDayOfWeek: () => getOption("datepicker.firstDayOfWeek", 0),
        rulesForFirstWeek: 4,
        yearsRange: () => getOption("datepicker.yearsRange", [-100, 10]),
        trapFocus: () => getOption("datepicker.trapFocus", true),
        position: undefined,
        mobileModal: () => getOption("datepicker.mobileModal", true),
        mobileNative: () => getOption("datepicker.mobileNative", false),
        iconPack: () => getOption("datepicker.iconPack", undefined),
        icon: () => getOption("datepicker.icon", undefined),
        iconRight: () => getOption("datepicker.iconRight", undefined),
        iconRightClickable: false,
        iconPrev: () => getOption("datepicker.iconPrev", "chevron-left"),
        iconNext: () => getOption("datepicker.iconNext", "chevron-right"),
        mobileBreakpoint: () => getOption("datepicker.mobileBreakpoint"),
        teleport: () => getOption("datepicker.teleport", false),
        useHtml5Validation: () => getOption("useHtml5Validation", true),
        customValidity: "",
        ariaNextLabel: () => getOption("datepicker.ariaNextLabel", "Next Page"),
        ariaPreviousLabel: () =>
            getOption("datepicker.ariaNextLabel", "Previous Page"),
        inputClasses: () => getOption("datepicker.inputClasses", {}),
        dropdownClasses: () => getOption("datepicker.dropdownClasses", {}),
        selectClasses: () => getOption("datepicker.selectClasses", {}),
    },
);

type ModelValue = typeof props.modelValue;

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {Date | Date[]} updated modelValue prop
     */
    (e: "update:modelValue", value: ModelValue): void;
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on range start is selected event
     * @param value {Date} range start date
     */
    (e: "range-start", value: Date): void;
    /**
     * on range end is selected event
     * @param value {Date} range end date
     */
    (e: "range-end", value: Date): void;
    /**
     * on month change event
     * @param value {number} month number
     */
    (e: "change-month", value: number): void;
    /**
     * on year change event
     * @param value {number} year number
     */
    (e: "change-year", value: number): void;
    /**
     * on input focus event
     * @param event {Event} native event
     */
    (e: "focus", event: Event): void;
    /**
     * on input blur event
     * @param event {Event} native event
     */
    (e: "blur", event: Event): void;
    /**
     * on input invalid event
     * @param event {Event} native event
     */
    (e: "invalid", event: Event): void;
    /**
     * on icon click event
     * @param event {Event} native event
     */
    (e: "icon-click", event: Event): void;
    /**
     * on icon right click event
     * @param event {Event} native event
     */
    (e: "icon-right-click", event: Event): void;
}>();

const { dtf, defaultDateFormatter, defaultDateParser } =
    useDatepickerMixins(props);

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const pickerRef = ref<InstanceType<typeof OPickerWrapper>>();

/** modelvalue of selected date */
// const vmodel = defineModel<ModelValue>({ default: null });
const vmodel = useVModel<ModelValue>();

/** Dropdown active state */
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
                : props.dateCreator()
            : value
              ? value
              : props.dateCreator();
        if (
            !isArray ||
            (isArray &&
                Array.isArray(vmodel.value) &&
                value.length > vmodel.value.length)
        )
            // updateInternalState
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
    props.dateCreator();

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

const listOfMonths = computed<OptionsItem<number>[]>(() => {
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
const listOfYears = computed<OptionsItem<number>[]>(() => {
    let latestYear = focusedDateData.value.year + props.yearsRange[1];
    if (props.maxDate && props.maxDate.getFullYear() < latestYear) {
        latestYear = Math.max(
            props.maxDate.getFullYear(),
            focusedDateData.value.year,
        );
    }

    let earliestYear = focusedDateData.value.year + props.yearsRange[0];
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
function format(value: Date | Date[], isNative: boolean): string {
    if (isNative) return formatNative(value);

    // define function prop
    const date = (Array.isArray(value) ? [...value] : value) as ModelValue;
    // call prop function
    const formatted = props.dateFormatter(date);
    // call default if prop function is not given
    if (typeof formatted === "undefined") return defaultDateFormatter(date);
    else return formatted;
}

function formatNative(value: Date | Date[]): string {
    if (Array.isArray(value)) value = value[0];
    const date = new Date(value);
    // return null if no value is given or value can't parse to proper date
    if (!value || !date || isNaN(date.getTime())) return null;

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
function parse(value: string, isNative: boolean): ModelValue {
    if (isNative) return parseNative(value);

    // call prop function
    let date = props.dateParser(value);
    // call default if prop function is not given
    if (typeof date === "undefined") date = defaultDateParser(value);

    const isValid =
        isDate(date) ||
        (Array.isArray(date) &&
            date.length === 2 &&
            isDate(date[0]) &&
            isDate(date[1]));

    return (isValid ? date : null) as ModelValue;
}

/** Parse date from string */
function parseNative(value: string): ModelValue {
    const s = value ? value.split("-") : [];
    if (s.length === 3) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1]) - 1;
        const day = parseInt(s[2]);
        return new Date(year, month, day) as ModelValue;
    } else {
        return null;
    }
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
    ["rootClass", "o-dpck"],
    [
        "sizeClass",
        "o-dpck--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    ["mobileClass", "o-dpck--mobile", null, isMobile],
    ["expandedClass", "o-dpck--expanded", null, computed(() => props.expanded)],
);

const headerClasses = defineClasses(["headerClass", "o-dpck__header"]);

const headerButtonsClasses = defineClasses(
    ["headerButtonsClass", "o-dpck__header__buttons"],
    [
        "headerButtonsSizeClass",
        "o-dpck__header__buttons--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
);

const prevButtonClasses = defineClasses([
    "prevButtonClass",
    "o-dpck__header__previous",
]);

const nextButtonClasses = defineClasses([
    "nextButtonClass",
    "o-dpck__header__next",
]);

const listsClasses = defineClasses(["listsClass", "o-dpck__header__list"]);

const footerClasses = defineClasses(["footerClass", "o-dpck__footer"]);

const dropdownClass = defineClasses([
    "dropdownClasses.rootClass",
    "o-tpck__dropdown",
]);

const boxClasses = defineClasses(["boxClass", "o-dpck__box"]);
const boxClassBind = computed(() => getActiveClasses(boxClasses.value));

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: () => pickerRef.value?.focus(), value: vmodel });
</script>

<template>
    <OPickerWrapper
        ref="pickerRef"
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
        :dropdown-classes="dropdownClass"
        :root-classes="rootClasses"
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
                <div :class="headerButtonsClasses">
                    <OButton
                        v-if="!disabled"
                        :class="prevButtonClasses"
                        :disabled="!showPrev"
                        :aria-label="ariaPreviousLabel"
                        :icon-pack="iconPack"
                        :icon-left="iconPrev"
                        outlined
                        @click.prevent="prev"
                        @keydown.enter.prevent="prev"
                        @keydown.space.prevent="prev" />

                    <OButton
                        v-if="!disabled"
                        :class="nextButtonClasses"
                        :disabled="!showNext"
                        :aria-label="ariaNextLabel"
                        :icon-pack="iconPack"
                        :icon-left="iconNext"
                        outlined
                        @click.prevent="next"
                        @keydown.enter.prevent="next"
                        @keydown.space.prevent="next" />

                    <div :class="listsClasses">
                        <o-select
                            v-if="!isTypeMonth"
                            v-model="focusedDateData.month"
                            v-bind="selectClasses"
                            :disabled="disabled"
                            :size="size"
                            :options="listOfMonths"
                            :use-html5-validation="false"
                            @keydown.left.stop.prevent="prev"
                            @keydown.right.stop.prevent="next" />

                        <o-select
                            v-model="focusedDateData.year"
                            v-bind="selectClasses"
                            :disabled="disabled"
                            :size="size"
                            :options="listOfYears"
                            :use-html5-validation="false"
                            @keydown.left.stop.prevent="prev"
                            @keydown.right.stop.prevent="next"
                            @keydown.up.stop.prevent="focusedDateData.year += 1"
                            @keydown.down.stop.prevent="
                                focusedDateData.year -= 1
                            " />
                    </div>
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
