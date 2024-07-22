<script setup lang="ts">
import {
    computed,
    ref,
    watch,
    type ComponentInstance,
    type PropType,
} from "vue";

import ODatepicker from "../datepicker/Datepicker.vue";
import OTimepicker from "../timepicker/Timepicker.vue";
import OInput from "../input/Input.vue";

import { getOption } from "@/utils/config";
import { isDate, isMobileAgent, pad } from "@/utils/helpers";
import { defineClasses, useInputHandler } from "@/composables";

import { useDateimepickerMixins } from "./useDatetimepickerMixin";

import type { DatepickerProps } from "../datepicker/types";
import type { TimepickerProps } from "../timepicker/types";
import type { ComponentClass } from "@/types";

/**
 * An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile
 * @displayName Datetimepicker
 * @style _datetimepicker.scss
 */
defineOptions({
    isOruga: true,
    name: "ODatetimepicker",
    configField: "datetimepicker",
    inheritAttrs: false,
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** The input value state */
    modelValue: { type: Date, default: null },
    /** The active state of the dropdown, use v-model:active to make it two-way binding */
    active: { type: Boolean, default: false },
    /** Define props for the underlying datepicker component */
    datepicker: {
        type: Object as PropType<DatepickerProps>,
        default: undefined,
    },
    /** Define props for the underlying timepicker component */
    timepicker: {
        type: Object as PropType<TimepickerProps>,
        default: undefined,
    },
    /** Min date to select */
    minDatetime: { type: Date, default: undefined },
    /** Max date to select */
    maxDatetime: { type: Date, default: undefined },
    /**
     * Size of the input control
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("datetimepicker.size"),
    } /** Makes input full width when inside a grouped or addon field */,
    expanded: { type: Boolean, default: false },
    /** Makes the input rounded */
    rounded: { type: Boolean, default: false },
    /** Input placeholder */
    placeholder: { type: String, default: undefined },
    /** Same as native input readonly */
    readonly: { type: Boolean, default: false },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /** Display datetimepicker inline */
    inline: { type: Boolean, default: false },
    /** Open dropdown on focus */
    openOnFocus: {
        type: Boolean,
        default: () => getOption("datetimepicker.openOnFocus", true),
    },
    /** Date format locale */
    locale: {
        type: String,
        default: () => getOption("locale"),
    },
    /** Custom function to format a date into a string */
    datetimeFormatter: {
        type: Function as PropType<(date: Date) => string>,
        default: (date: Date | Date[]) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("datetimepicker.dateFormatter", (_) => undefined)(date),
    },
    /** Custom function to parse a string into a date */
    datetimeParser: {
        type: Function as PropType<(date: string) => Date>,
        default: (date: string) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getOption("datetimepicker.dateParser", (_) => undefined)(date),
    },
    /** Date creator function, default is `new Date()` */
    datetimeCreator: {
        type: Function as PropType<(date: Date) => Date>,
        default: (date: Date) =>
            getOption(
                "datetimepicker.datetimeCreator",
                (d: Date) => new Date(d),
            )(date),
    },
    /** Dropdown position */
    position: { type: String, default: undefined },
    /** Enable mobile native input if mobile agent */
    mobileNative: {
        type: Boolean,
        default: () => getOption("datetimepicker.mobileNative", true),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("datetimepicker.iconPack", undefined),
    },
    /** Icon to be shown */
    icon: {
        type: String,
        default: () => getOption("datetimepicker.icon", undefined),
    },
    /** Icon to be added on the right side */
    iconRight: {
        type: String,
        default: () => getOption("datetimepicker.iconRight", undefined),
    },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("datetimepicker.teleport", false),
    },
    /** Enable HTML 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** Custom HTML 5 validation error to set on the form control */
    customValidity: {
        type: [String, Function] as PropType<
            | string
            | ((
                  currentValue: Date | null | undefined,
                  state: ValidityState,
              ) => string)
        >,
        default: "",
    },
    // class props (will not be displayed in the docs)
    /** Class of the Datepicker wrapper */
    datepickerWrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Timepicker wrapper */
    timepickerWrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {Date | Date[]} updated modelValue prop
     */
    (e: "update:modelValue", value: Date | Date[]): void;
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

const datepickerRef = ref<ComponentInstance<typeof ODatepicker>>();
const timepickerRef = ref<ComponentInstance<typeof OTimepicker>>();
const nativeInputRef = ref<ComponentInstance<typeof OInput>>();

const timepickerProps = ref<TimepickerProps>(props.timepicker);
watch(
    () => props.timepicker,
    (value) => (timepickerProps.value = value),
    { deep: true },
);
const datepickerProps = ref<DatepickerProps>(props.datepicker);
watch(
    () => props.datepicker,
    (value) => (datepickerProps.value = value),
    { deep: true },
);

const isMobileNative = computed(
    () => props.mobileNative && isMobileAgent.any(),
);

const elementRef = computed(() =>
    isMobileNative.value ? nativeInputRef.value : datepickerRef.value,
);

// use form input functionality for native input
const { setFocus, onBlur, onFocus, onInvalid } = useInputHandler(
    elementRef,
    emits,
    props,
);

watch([() => isMobileNative.value, () => props.inline], () => {
    // $refs attached, it's time to refresh datepicker (input)
    if (datepickerRef.value) datepickerRef.value.$forceUpdate();
});

const { defaultDatetimeFormatter, defaultDatetimeParser } =
    useDateimepickerMixins(props);

/** Dropdown active state */
const isActive = defineModel<boolean>("active", { default: false });

const vmodel = defineModel<Date>({ default: null });

function updateVModel(value: Date | Date[]): void {
    if (!value) {
        vmodel.value = null;
        return;
    }
    if (Array.isArray(value)) return updateVModel(value[0]);

    let date = new Date(value.getTime());
    if (!props.modelValue) {
        date = props.datetimeCreator(value);
    } else {
        // restore time part
        if (
            (value.getDate() !== props.modelValue.getDate() ||
                value.getMonth() !== props.modelValue.getMonth() ||
                value.getFullYear() !== props.modelValue.getFullYear()) &&
            value.getHours() === 0 &&
            value.getMinutes() === 0 &&
            value.getSeconds() === 0
        ) {
            date.setHours(
                props.modelValue.getHours(),
                props.modelValue.getMinutes(),
                props.modelValue.getSeconds(),
                0,
            );
        }
    }
    // check min and max range
    if (props.minDatetime && date < props.minDatetime) {
        date = props.minDatetime;
    } else if (props.maxDatetime && date > props.maxDatetime) {
        date = props.maxDatetime;
    }
    vmodel.value = new Date(date.getTime());
}

const minDate = computed(() => {
    if (!props.minDatetime)
        return datepickerProps.value ? datepickerProps.value.minDate : null;
    return new Date(
        props.minDatetime.getFullYear(),
        props.minDatetime.getMonth(),
        props.minDatetime.getDate(),
        0,
        0,
        0,
        0,
    );
});

const maxDate = computed(() => {
    if (!props.maxDatetime)
        return datepickerProps.value ? datepickerProps.value.maxDate : null;
    return new Date(
        props.maxDatetime.getFullYear(),
        props.maxDatetime.getMonth(),
        props.maxDatetime.getDate(),
        0,
        0,
        0,
        0,
    );
});

// Only enable min/max time if local (not necessarily UTC) date portion matches
const minTime = computed(() => {
    if (
        !props.minDatetime ||
        vmodel.value === null ||
        typeof vmodel.value === "undefined" ||
        vmodel.value.getFullYear() != props.minDatetime.getFullYear() ||
        vmodel.value.getMonth() != props.minDatetime.getMonth() ||
        vmodel.value.getDate() != props.minDatetime.getDate()
    ) {
        return timepickerProps.value ? timepickerProps.value.minTime : null;
    }
    return props.minDatetime;
});

const maxTime = computed(() => {
    if (
        !props.maxDatetime ||
        vmodel.value === null ||
        typeof vmodel.value === "undefined" ||
        vmodel.value.getFullYear() != props.maxDatetime.getFullYear() ||
        vmodel.value.getMonth() != props.maxDatetime.getMonth() ||
        vmodel.value.getDate() != props.maxDatetime.getDate()
    ) {
        return timepickerProps.value ? timepickerProps.value.maxTime : null;
    }
    return props.maxDatetime;
});

const datepickerSize = computed(
    () => datepickerProps.value?.size || props.size,
);

const timepickerSize = computed(
    () => timepickerProps.value?.size || props.size,
);

const timepickerDisabled = computed(
    () => timepickerProps.value?.disabled || props.disabled,
);

// --- Formatter / Parser ---

/** Format date into string */
function format(value: Date): string {
    // call prop function
    const date = props.datetimeFormatter(value);
    // call default if prop function is not given
    if (typeof date === "undefined") return defaultDatetimeFormatter(value);
    else return date;
}

/** Parse string into date */
function parse(value: string): Date {
    // call prop function
    let date = props.datetimeParser(value);
    // call default if prop function is not given
    if (typeof date === "undefined") date = defaultDatetimeParser(value);
    return isDate(date) ? date : null;
}

function formatNative(value: Date): string {
    const date = new Date(value);
    if (value && !isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return (
            year +
            "-" +
            pad(month) +
            "-" +
            pad(day) +
            "T" +
            pad(hours) +
            ":" +
            pad(minutes) +
            ":" +
            pad(seconds)
        );
    }
    return "";
}

// --- Event Handler ---

/** Parse date from string */
function onChangeNativePicker(event: Event): void {
    const date = (event.target as HTMLInputElement).value;
    const s = date ? date.split(/\D/) : [];
    if (s.length >= 5) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1], 10) - 1;
        const day = parseInt(s[2], 10);
        const hours = parseInt(s[3], 10);
        const minutes = parseInt(s[4], 10);
        // Seconds are omitted intentionally; they are unsupported by input
        // type=datetime-local and cause the control to fail native validation
        updateVModel(new Date(year, month, day, hours, minutes));
    } else {
        updateVModel(null);
    }
}

// --- Computed Component Classes ---

const datepickerWrapperClasses = defineClasses([
    "datepickerWrapperClass",
    "o-dtpck__date",
]);

const timepickerWrapperClasses = defineClasses([
    "timepickerWrapperClass",
    "o-dtpck__time",
]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: setFocus, value: vmodel });
</script>

<template>
    <o-datepicker
        v-if="!isMobileNative || inline"
        ref="datepickerRef"
        v-bind="{ ...$attrs, ...datepicker }"
        v-model:active="isActive"
        :model-value="vmodel"
        data-oruga="datetimepicker"
        :class="datepickerWrapperClasses"
        :rounded="rounded"
        :open-on-focus="openOnFocus"
        :position="position"
        :inline="inline"
        :readonly="readonly"
        :expanded="expanded"
        :close-on-click="false"
        :date-formatter="format"
        :date-parser="parse"
        :min-date="minDate"
        :max-date="maxDate"
        :icon="icon"
        :icon-right="iconRight"
        :icon-right-clickable="iconRightClickable"
        :icon-pack="iconPack"
        :size="datepickerSize"
        :placeholder="placeholder"
        :range="false"
        :disabled="disabled"
        :mobile-native="isMobileNative"
        :locale="locale"
        :teleport="teleport"
        @update:model-value="updateVModel"
        @focus="onFocus"
        @blur="onBlur"
        @change-month="$emit('change-month', $event)"
        @change-year="$emit('change-year', $event)"
        @icon-click="$emit('icon-click', $event)"
        @icon-right-click="$emit('icon-right-click', $event)">
        <template #footer>
            <div :class="timepickerWrapperClasses">
                <o-timepicker
                    ref="timepickerRef"
                    v-bind="timepicker"
                    v-model="vmodel"
                    inline
                    :readonly="readonly"
                    :min-time="minTime"
                    :max-time="maxTime"
                    :size="timepickerSize"
                    :disabled="timepickerDisabled"
                    :mobile-native="isMobileNative"
                    :locale="locale" />
            </div>

            <template v-if="$slots.footer !== undefined">
                <!--
                    @slot Define an additional footer
                -->
                <slot name="footer" />
            </template>
        </template>
    </o-datepicker>

    <!-- Native Picker -->
    <o-input
        v-else
        v-bind="$attrs"
        ref="nativeInputRef"
        type="datetime-local"
        autocomplete="off"
        :value="formatNative(vmodel)"
        :max="formatNative(maxDate)"
        :min="formatNative(minDate)"
        :placeholder="placeholder"
        :size="datepickerSize"
        :icon-pack="iconPack"
        :icon="icon"
        :rounded="rounded"
        :disabled="disabled"
        :readonly="false"
        :use-html5-validation="false"
        @change="onChangeNativePicker"
        @focus="onFocus"
        @blur="onBlur"
        @invalid="onInvalid" />
</template>
