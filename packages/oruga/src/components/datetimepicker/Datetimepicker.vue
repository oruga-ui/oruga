<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from "vue";

import ODatepicker from "../datepicker/Datepicker.vue";
import OTimepicker from "../timepicker/Timepicker.vue";
import OInput from "../input/Input.vue";

import { getDefault } from "@/utils/config";
import { isDate, isMobileAgent, pad } from "@/utils/helpers";
import { defineClasses, useInputHandler } from "@/composables";

import { useDateimepickerMixins } from "./useDatetimepickerMixin";

import type { DatepickerProps } from "../datepicker/props";
import type { TimepickerProps } from "../timepicker/props";
import type { DatetimepickerProps } from "./props";

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

const props = withDefaults(defineProps<DatetimepickerProps>(), {
    override: undefined,
    modelValue: undefined,
    active: false,
    datepicker: undefined,
    timepicker: undefined,
    minDatetime: undefined,
    maxDatetime: undefined,
    size: () => getDefault("datetimepicker.size"),
    expanded: false,
    rounded: false,
    placeholder: undefined,
    readonly: false,
    disabled: false,
    inline: false,
    openOnFocus: () => getDefault("datetimepicker.openOnFocus", true),
    locale: () => getDefault("locale"),
    formatter: getDefault("datetimepicker.dateFormatter"),
    parser: getDefault("datetimepicker.dateParser"),
    creator: getDefault("datetimepicker.datetimeCreator"),
    position: undefined,
    mobileNative: () => getDefault("datetimepicker.mobileNative", true),
    iconPack: () => getDefault("datetimepicker.iconPack"),
    icon: () => getDefault("datetimepicker.icon"),
    iconRight: () => getDefault("datetimepicker.iconRight"),
    iconRightClickable: false,
    teleport: () => getDefault("datetimepicker.teleport", false),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidity: "",
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {Date} updated modelValue prop
     */
    "update:modelValue": [value: Date];
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

const datepickerRef = useTemplateRef("datepickerComponent");
const nativeInputRef = useTemplateRef("nativeInputComponent");

const timepickerProps = ref<TimepickerProps | undefined>(props.timepicker);
watch(
    () => props.timepicker,
    (value) => (timepickerProps.value = value),
    { deep: true },
);
const datepickerProps = ref<DatepickerProps | undefined>(props.datepicker);
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

const { datetimeFormatter, datetimeParser } = useDateimepickerMixins(props);

/** Dropdown active state */
const isActive = defineModel<boolean>("active", { default: false });

const vmodel = defineModel<typeof props.modelValue>({ default: undefined });

function updateVModel(value: Date | Date[] | undefined): void {
    if (!value) {
        vmodel.value = undefined;
        return;
    }
    if (Array.isArray(value)) return updateVModel(value[0]);

    let date = new Date(value.getTime());
    if (props.modelValue) {
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
    if (!props.minDatetime) return datepickerProps.value?.minDate;
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
    if (!props.maxDatetime) return datepickerProps.value?.maxDate;
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
        return timepickerProps.value?.minTime;
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
        return timepickerProps.value?.maxTime;
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
    return datetimeFormatter(value);
}

/** Parse string into date */
function parse(value: string): Date | undefined {
    const date = datetimeParser(value);

    return isDate(date) ? date : undefined;
}

function formatNative(value: typeof props.modelValue): string {
    const date = value ? new Date(value) : undefined;
    if (date && isDate(date)) {
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
        updateVModel(undefined);
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
        ref="datepickerComponent"
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
        :formatter="format"
        :parser="parse"
        :min-date="minDate"
        :max-date="maxDate"
        :icon="icon"
        :icon-right="iconRight"
        :icon-right-clickable="iconRightClickable"
        :icon-pack="iconPack"
        :size="datepickerSize"
        :placeholder="placeholder"
        :range="false"
        :multiple="false"
        :disabled="disabled"
        :mobile-native="isMobileNative"
        :locale="locale"
        :teleport="teleport"
        :use-html5-validation="false"
        @update:model-value="updateVModel"
        @focus="onFocus"
        @blur="onBlur"
        @invalid="onInvalid"
        @change-month="$emit('change-month', $event)"
        @change-year="$emit('change-year', $event)"
        @icon-click="$emit('icon-click', $event)"
        @icon-right-click="$emit('icon-right-click', $event)">
        <template #footer>
            <div :class="timepickerWrapperClasses">
                <o-timepicker
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
        ref="nativeInputComponent"
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
