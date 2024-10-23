<script setup lang="ts">
import { computed, ref, watch } from "vue";

import OSelect from "../select/Select.vue";
import OPickerWrapper from "../utils/PickerWrapper.vue";

import { getOption } from "@/utils/config";
import { isDate, isDefined, pad } from "@/utils/helpers";
import { defineClasses, useMatchMedia, getActiveClasses } from "@/composables";

import { useTimepickerMixins } from "./useTimepickerMixins";

import type { OptionsItem } from "@/types";
import type { TimepickerProps } from "./props";

/**
 * An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile
 * @displayName Timepicker
 * @style _timepicker.scss
 */
defineOptions({
    isOruga: true,
    name: "OTimepicker",
    configField: "timepicker",
});

const props = withDefaults(defineProps<TimepickerProps>(), {
    override: undefined,
    modelValue: undefined,
    active: false,
    minTime: undefined,
    maxTime: undefined,
    inline: false,
    placeholder: undefined,
    expanded: false,
    rounded: false,
    readonly: false,
    disabled: false,
    size: () => getOption("timepicker.size"),
    hourFormat: undefined,
    incrementHours: 1,
    incrementMinutes: 1,
    incrementSeconds: 1,
    openOnFocus: () => getOption("timepicker.openOnFocus", true),
    closeOnClick: () => getOption("timepicker.closeOnClick", true),
    enableSeconds: false,
    defaultMinutes: undefined,
    defaultSeconds: undefined,
    locale: () => getOption("locale"),
    formatter: getOption("timepicker.formatter"),
    parser: getOption("timepicker.parser"),
    creator: getOption("timepicker.creator"),
    unselectableTimes: undefined,
    resetOnMeridianChange: false,
    trapFocus: () => getOption("timepicker.trapFocus", true),
    position: undefined,
    mobileModal: () => getOption("timepicker.mobileModal", true),
    mobileNative: () => getOption("timepicker.mobileNative", true),
    iconPack: () => getOption("timepicker.iconPack"),
    icon: () => getOption("timepicker.icon"),
    iconRight: () => getOption("timepicker.iconRight"),
    iconRightClickable: false,
    mobileBreakpoint: () => getOption("timepicker.mobileBreakpoint"),
    teleport: () => getOption("timepicker.teleport", false),
    useHtml5Validation: () => getOption("useHtml5Validation", true),
    customValidity: "",
    inputClasses: () => getOption("timepicker.inputClasses"),
    dropdownClasses: () => getOption("timepicker.dropdownClasses"),
    selectClasses: () => getOption("timepicker.selectClasses"),
});

defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {Date} updated modelValue prop
     */
    (e: "update:modelValue", value: Date): void;
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
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

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const {
    dtf,
    timeCreator,
    timeFormatter,
    timeParser,
    pmString,
    amString,
    meridiens,
    isHourFormat24,
    hourLiteral,
    minuteLiteral,
    secondLiteral,
} = useTimepickerMixins(props);

const pickerRef = ref<InstanceType<typeof OPickerWrapper>>();

/** modelvalue of selected date */
const vmodel = defineModel<typeof props.modelValue>({ default: undefined });

/** Dropdown active state */
const isActive = defineModel<boolean>("active", { default: false });

const hoursSelected = ref<number>();
const minutesSelected = ref<number>();
const secondsSelected = ref<number>();
const meridienSelected = ref<string>();

watch(
    () => props.modelValue,
    (value) => updateValue(value),
    { immediate: true },
);

/** Update internal value. */
function updateValue(value: Date | undefined): void {
    if (Array.isArray(value)) return updateValue(value[0]);
    if (vmodel.value !== value) vmodel.value = value as Date;
    if (value) {
        hoursSelected.value = value.getHours();
        minutesSelected.value = value.getMinutes();
        secondsSelected.value = value.getSeconds();
        meridienSelected.value =
            value.getHours() >= 12 ? pmString.value : amString.value;
    } else {
        hoursSelected.value = undefined;
        minutesSelected.value = undefined;
        secondsSelected.value = undefined;
        meridienSelected.value = amString.value;
    }
}

const step = computed(() => (props.enableSeconds ? "1" : undefined));

watch(
    () => props.hourFormat,
    () => {
        if (isDefined(hoursSelected.value))
            meridienSelected.value =
                (hoursSelected.value || 0) >= 12
                    ? pmString.value
                    : amString.value;
    },
);

watch(
    () => props.locale,
    (value) => {
        // see updateInternalState default
        if (!value) meridienSelected.value = amString.value;
    },
);

function formatNumber(value: number, prependZero: boolean): string {
    return isHourFormat24.value || prependZero ? pad(value) : String(value);
}

const hours = computed<OptionsItem<number>[]>(() => {
    if (!props.incrementHours || props.incrementHours < 1)
        throw new Error("Hour increment cannot be null or less than 1.");
    const hours: OptionsItem<number>[] = [];
    const numberOfHours = isHourFormat24.value ? 24 : 12;
    for (let i = 0; i < numberOfHours; i += props.incrementHours) {
        let value = i;
        let label = value;
        if (!isHourFormat24.value) {
            value = i + 1;
            label = value;
            if (meridienSelected.value === amString.value) {
                if (value === 12) value = 0;
            } else if (meridienSelected.value === pmString.value) {
                if (value !== 12) value += 12;
            }
        }
        hours.push({
            label: formatNumber(label, false),
            value: value,
        });
    }
    return hours;
});

const minutes = computed<OptionsItem<number>[]>(() => {
    if (!props.incrementMinutes || props.incrementMinutes < 1)
        throw new Error("Minute increment cannot be null or less than 1.");
    const minutes: OptionsItem<number>[] = [];
    for (let i = 0; i < 60; i += props.incrementMinutes) {
        minutes.push({
            label: formatNumber(i, true),
            value: i,
        });
    }
    return minutes;
});

const seconds = computed<OptionsItem<number>[]>(() => {
    if (!props.incrementSeconds || props.incrementSeconds < 1)
        throw new Error("Second increment cannot be null or less than 1.");
    const seconds: OptionsItem<number>[] = [];
    for (let i = 0; i < 60; i += props.incrementSeconds) {
        seconds.push({
            label: formatNumber(i, true),
            value: i,
        });
    }
    return seconds;
});

function isHourDisabled(hour: number): boolean {
    let disabled = false;
    if (props.minTime) {
        const minHours = props.minTime.getHours();
        const noMinutesAvailable = minutes.value.every((minute) => {
            return isMinuteDisabledForHour(hour, minute.value);
        });
        disabled = hour < minHours || noMinutesAvailable;
    }
    if (props.maxTime) {
        if (!disabled) {
            const maxHours = props.maxTime.getHours();
            disabled = hour > maxHours;
        }
    }

    if (props.unselectableTimes && !disabled) {
        if (typeof props.unselectableTimes === "function") {
            const date = new Date();
            date.setHours(hour);
            date.setMinutes(minutesSelected.value || 0);
            date.setSeconds(secondsSelected.value || 0);
            return props.unselectableTimes(date);
        } else {
            const unselectable = props.unselectableTimes.filter((time) => {
                if (props.enableSeconds && isDefined(secondsSelected.value)) {
                    return (
                        time.getHours() === hour &&
                        time.getMinutes() === minutesSelected.value &&
                        time.getSeconds() === secondsSelected.value
                    );
                } else if (isDefined(minutesSelected.value)) {
                    return (
                        time.getHours() === hour &&
                        time.getMinutes() === minutesSelected.value
                    );
                }
                return false;
            });
            if (unselectable.length > 0) {
                disabled = true;
            } else {
                disabled = minutes.value.every((minute) => {
                    return (
                        (props.unselectableTimes as Date[]).filter((time) => {
                            return (
                                time.getHours() === hour &&
                                time.getMinutes() === minute.value
                            );
                        }).length > 0
                    );
                });
            }
        }
    }
    return disabled;
}

function isMinuteDisabledForHour(hour: number, minute: number): boolean {
    let disabled = false;
    if (props.minTime) {
        const minHours = props.minTime.getHours();
        const minMinutes = props.minTime.getMinutes();
        disabled = hour === minHours && minute < minMinutes;
    }
    if (props.maxTime) {
        if (!disabled) {
            const maxHours = props.maxTime.getHours();
            const maxMinutes = props.maxTime.getMinutes();
            disabled = hour === maxHours && minute > maxMinutes;
        }
    }
    return disabled;
}

function isMinuteDisabled(minute: number): boolean {
    if (hoursSelected.value === undefined) return false;

    let disabled =
        isHourDisabled(hoursSelected.value) ||
        isMinuteDisabledForHour(hoursSelected.value, minute);

    if (props.unselectableTimes && !disabled) {
        if (typeof props.unselectableTimes === "function") {
            const date = new Date();
            date.setHours(hoursSelected.value);
            date.setMinutes(minute);
            date.setSeconds(secondsSelected.value || 0);
            return props.unselectableTimes(date);
        } else {
            const unselectable = props.unselectableTimes.filter((time) => {
                if (props.enableSeconds && isDefined(secondsSelected.value)) {
                    return (
                        time.getHours() === hoursSelected.value &&
                        time.getMinutes() === minute &&
                        time.getSeconds() === secondsSelected.value
                    );
                } else {
                    return (
                        time.getHours() === hoursSelected.value &&
                        time.getMinutes() === minute
                    );
                }
            });
            disabled = unselectable.length > 0;
        }
    }
    return disabled;
}

function isSecondDisabled(second: number): boolean {
    if (!isDefined(minutesSelected.value)) return false;
    let disabled = false;

    if (isMinuteDisabled(minutesSelected.value)) {
        disabled = true;
    } else {
        if (props.minTime) {
            const minHours = props.minTime.getHours();
            const minMinutes = props.minTime.getMinutes();
            const minSeconds = props.minTime.getSeconds();
            disabled =
                hoursSelected.value === minHours &&
                minutesSelected.value === minMinutes &&
                second < minSeconds;
        }
        if (props.maxTime) {
            if (!disabled) {
                const maxHours = props.maxTime.getHours();
                const maxMinutes = props.maxTime.getMinutes();
                const maxSeconds = props.maxTime.getSeconds();
                disabled =
                    hoursSelected.value === maxHours &&
                    minutesSelected.value === maxMinutes &&
                    second > maxSeconds;
            }
        }
    }
    if (props.unselectableTimes && !disabled) {
        if (typeof props.unselectableTimes === "function") {
            const date = new Date();
            date.setHours(hoursSelected.value || 0);
            date.setMinutes(minutesSelected.value);
            date.setSeconds(second);
            return props.unselectableTimes(date);
        } else {
            const unselectable = props.unselectableTimes.filter((time) => {
                return (
                    time.getHours() === hoursSelected.value &&
                    time.getMinutes() === minutesSelected.value &&
                    time.getSeconds() === second
                );
            });
            disabled = unselectable.length > 0;
        }
    }
    return disabled;
}

function isMeridienDisabled(meridienString: string): boolean {
    const offset = meridienString == "AM" ? 0 : 12;
    for (let i = 0; i < 12; i++) {
        if (!isHourDisabled(i + offset)) return false;
    }
    return true;
}

function updateDateSelected(
    hours: number,
    minutes: number,
    seconds: number,
    meridiens,
): void {
    if (
        isDefined(hours) &&
        isDefined(minutes) &&
        ((!isDefined(isHourFormat24.value) && isDefined(meridiens)) ||
            isDefined(isHourFormat24.value))
    ) {
        let time: Date;
        if (vmodel.value) {
            time = new Date(vmodel.value);
        } else {
            time = timeCreator();
            time.setMilliseconds(0);
        }
        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(seconds);
        if (!isNaN(time.getTime())) {
            vmodel.value = new Date(time.getTime());
        }
    }
}

// --- Formatter / Parser ---

/** Format date into string */
function format(value: Date | Date[] | undefined, isNative: boolean): string {
    if (Array.isArray(value)) return format(value[0], isNative);
    if (isNative) return formatNative(value);

    return timeFormatter(value);
}

/** Format date into string 'HH-MM-SS'*/
function formatNative(value: Date | Date[] | undefined): string {
    if (Array.isArray(value)) return formatNative(value[0]);

    // return empty string if no value is given or value can't parse to proper date
    if (!value) return "";
    const date = new Date(value);
    if (!isDate(date)) return "";

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return (
        formatNumber(hours, true) +
        ":" +
        formatNumber(minutes, true) +
        ":" +
        formatNumber(seconds, true)
    );
}

/** Parse string into date */
function parse(value: string, isNative: boolean): Date | undefined {
    if (isNative) return parseNative(value);

    const date = timeParser(value);
    return isDate(date) ? date : undefined;
}

/** Parse time from string */
function parseNative(date: string): Date | undefined {
    if (!date) return undefined;

    let time: Date;
    if (vmodel.value) {
        time = new Date(vmodel.value);
    } else {
        time = timeCreator();
        time.setMilliseconds(0);
    }
    const t = date.split(":");
    time.setHours(parseInt(t[0], 10));
    time.setMinutes(parseInt(t[1], 10));
    time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
    return new Date(time.getTime());
}

// --- Event Handler ---

function onMeridienChange(value: string): void {
    if (isDefined(hoursSelected.value) && props.resetOnMeridianChange) {
        hoursSelected.value = undefined;
        minutesSelected.value = undefined;
        secondsSelected.value = undefined;
        vmodel.value = undefined;
    } else if (isDefined(hoursSelected.value)) {
        if (value === pmString.value) hoursSelected.value += 12;
        else if (value === amString.value) hoursSelected.value -= 12;
    }
    updateDateSelected(
        hoursSelected.value || 0,
        minutesSelected.value || 0,
        props.enableSeconds ? secondsSelected.value || 0 : 0,
        value,
    );
}

function onHoursChange(value: string): void {
    if (!minutesSelected.value && typeof props.defaultMinutes !== "undefined")
        minutesSelected.value = props.defaultMinutes;
    if (!secondsSelected.value && typeof props.defaultSeconds !== "undefined")
        secondsSelected.value = props.defaultSeconds;

    updateDateSelected(
        parseInt(value, 10),
        minutesSelected.value || 0,
        props.enableSeconds ? secondsSelected.value || 0 : 0,
        meridienSelected.value,
    );
}

function onMinutesChange(value: string): void {
    if (!secondsSelected.value && props.defaultSeconds)
        secondsSelected.value = props.defaultSeconds;

    updateDateSelected(
        hoursSelected.value || 0,
        parseInt(value, 10),
        props.enableSeconds ? secondsSelected.value || 0 : 0,
        meridienSelected.value,
    );
}

function onSecondsChange(value: string): void {
    updateDateSelected(
        hoursSelected.value || 0,
        minutesSelected.value || 0,
        parseInt(value, 10),
        meridienSelected.value,
    );
}

// --- Computed Component Classes ---

const selectSelectClasses = defineClasses([
    "selectClasses.selectClass",
    "o-tpck__select",
]);

const selectPlaceholderClasses = defineClasses([
    "selectClasses.placeholderClass",
    "o-tpck__select-placeholder",
]);

const selectBind = computed(() => ({
    "select-class": getActiveClasses(selectSelectClasses),
    "placeholder-class": getActiveClasses(selectPlaceholderClasses),
    ...props.selectClasses,
}));

const rootClasses = defineClasses(
    ["rootClass", "o-tpck"],
    [
        "sizeClass",
        "o-tpck--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    ["mobileClass", "o-tpck--mobile", null, isMobile],
);

const separatorClasses = defineClasses(["separatorClass", "o-tpck__separtor"]);

const footerClasses = defineClasses(["footerClass", "o-tpck__footer"]);

const pickerDropdownClasses = defineClasses([
    "dropdownClass",
    "o-tpck__dropdown",
]);

const boxClasses = defineClasses(["boxClass", "o-tpck__box"]);
const boxClassBind = computed(() => getActiveClasses(boxClasses));

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: () => pickerRef.value?.focus(), value: vmodel });
</script>

<template>
    <OPickerWrapper
        ref="pickerRef"
        v-model:active="isActive"
        :value="vmodel"
        data-oruga="timepicker"
        :picker-props="props"
        :formatter="format"
        :parser="parse"
        type="time"
        :max="maxTime"
        :min="minTime"
        :step="step"
        :root-classes="rootClasses"
        :dropdown-classes="pickerDropdownClasses"
        :box-class="boxClassBind"
        :dtf="dtf"
        @update:value="updateValue"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @invalid="$emit('invalid', $event)"
        @icon-click="$emit('icon-click', $event)"
        @icon-right-click="$emit('icon-right-click', $event)">
        <template v-if="$slots.trigger" #trigger>
            <!--
                @slot Override the trigger
            -->
            <slot name="trigger" />
        </template>

        <o-select
            v-bind="selectBind"
            v-model="hoursSelected"
            :options="hours"
            override
            :disabled="disabled"
            placeholder="00"
            :use-html5-validation="false"
            @change="onHoursChange($event.target.value)" />

        <span :class="separatorClasses">{{ hourLiteral }}</span>

        <o-select
            v-bind="selectBind"
            v-model="minutesSelected"
            override
            :disabled="disabled"
            placeholder="00"
            :use-html5-validation="false"
            @change="onMinutesChange($event.target.value)">
            <option
                v-for="minute in minutes"
                :key="minute.value"
                :value="minute.value"
                :disabled="isMinuteDisabled(minute.value)">
                {{ minute.label }}
            </option>
        </o-select>

        <template v-if="enableSeconds">
            <span :class="separatorClasses">{{ minuteLiteral }}</span>

            <o-select
                v-bind="selectBind"
                v-model="secondsSelected"
                override
                :disabled="disabled"
                placeholder="00"
                :use-html5-validation="false"
                @change="onSecondsChange($event.target.value)">
                <option
                    v-for="second in seconds"
                    :key="second.value"
                    :value="second.value"
                    :disabled="isSecondDisabled(second.value)">
                    {{ second.label }}
                </option>
            </o-select>

            <span :class="separatorClasses">{{ secondLiteral }}</span>
        </template>

        <o-select
            v-if="!isHourFormat24"
            v-bind="selectBind"
            v-model="meridienSelected"
            override
            :disabled="disabled"
            :use-html5-validation="false"
            @change="onMeridienChange($event.target.value)">
            <option
                v-for="meridien in meridiens"
                :key="meridien"
                :value="meridien"
                :disabled="isMeridienDisabled(meridien)">
                {{ meridien }}
            </option>
        </o-select>

        <footer v-if="$slots.default" :class="footerClasses">
            <!--
                @slot Define an additional content on footer
            -->
            <slot />
        </footer>
    </OPickerWrapper>
</template>
