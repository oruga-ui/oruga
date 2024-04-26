<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";

import OSelect from "../select/Select.vue";
import OPickerWrapper from "../utils/PickerWrapper.vue";

import { getOption } from "@/utils/config";
import { defineClasses, useMatchMedia, getActiveClasses } from "@/composables";

import { useTimepickerMixins } from "./useTimepickerMixins";

import type { ComponentClass } from "@/types";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** @model */
    modelValue: { type: Date as PropType<Date>, default: undefined },
    /** The active state of the dropdown */
    active: { type: Boolean, default: false },
    /** Min time to select */
    minTime: { type: Date as PropType<Date>, default: undefined },
    /** Max time to select */
    maxTime: { type: Date as PropType<Date>, default: undefined },
    /** Display datepicker inline */
    inline: { type: Boolean, default: false },
    /** Input placeholder */
    placeholder: { type: String, default: undefined },
    /** Makes input full width when inside a grouped or addon field */
    expanded: { type: Boolean, default: false },
    /** Makes the input rounded */
    rounded: { type: Boolean, default: false },
    /** Same as native input readonly */
    readonly: { type: Boolean, default: false },
    /** Same as native disabled */
    disabled: { type: Boolean, default: false },
    /**
     * Size of the button
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("timepicker.size"),
    },
    hourFormat: { type: String, default: undefined },
    incrementHours: { type: Number, default: 1 },
    incrementMinutes: { type: Number, default: 1 },
    incrementSeconds: { type: Number, default: 1 },
    /** Open dropdown on focus */
    openOnFocus: {
        type: Boolean,
        default: () => getOption("timepicker.openOnFocus", true),
    },
    /** Close dropdown on click */
    closeOnClick: {
        type: Boolean,
        default: () => getOption("timepicker.closeOnClick", true),
    },
    enableSeconds: { type: Boolean, default: false },
    defaultMinutes: { type: Number, default: undefined },
    defaultSeconds: { type: Number, default: undefined },
    /** Date format locale */
    locale: {
        type: String,
        default: () => getOption("locale"),
    },
    /** Custom function to format a date into a string */
    timeFormatter: {
        type: Function as PropType<(date: Date) => string>,
        default: (
            date: Date | Date[],
            defaultFunction: (date: Date | Date[]) => string,
        ) => getOption("timepicker.timeFormatter", defaultFunction)(date),
    },
    /** Custom function to parse a string into a date */
    timeParser: {
        type: Function as PropType<(date: string) => Date>,
        default: (date: string, defaultFunction: (date: string) => Date) =>
            getOption("timepicker.timeParser", defaultFunction)(date),
    },
    /** time creator function, default is `new Date()` */
    timeCreator: {
        type: Function as PropType<() => Date>,
        default: () => getOption("timepicker.timeCreator", () => new Date())(),
    },
    /** Define a list of times which can not be selected */
    unselectableTimes: {
        type: [Array, Function] as PropType<Date[] | ((date: Date) => boolean)>,
        default: () => [],
    },
    /** Reset the time inputs when meridian changes */
    resetOnMeridianChange: {
        type: Boolean,
        default: false,
    },
    /** Dropdown trapFocus */
    trapFocus: {
        type: Boolean,
        default: () => getOption("timepicker.trapFocus", true),
    },
    /** Dropdown position */
    position: { type: String, default: undefined },
    /** Enable dropdown mobile modal */
    mobileModal: {
        type: Boolean,
        default: () => getOption("timepicker.mobileModal", true),
    },
    /** Enable mobile native input if mobile agent */
    mobileNative: {
        type: Boolean,
        default: () => getOption("timepicker.mobileNative", true),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("timepicker.iconPack", undefined),
    },
    /** Icon to be shown */
    icon: {
        type: String,
        default: () => getOption("timepicker.icon", undefined),
    },
    /** Icon to be added on the right side */
    iconRight: {
        type: String,
        default: () => getOption("timepicker.iconRight", undefined),
    },
    /** Make the icon right clickable */
    iconRightClickable: { type: Boolean, default: false },
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("timepicker.mobileBreakpoint"),
    },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("timepicker.teleport", false),
    },
    /** Enable html 5 native validation */
    useHtml5Validation: {
        type: Boolean,
        default: () => getOption("useHtml5Validation", true),
    },
    /** The message which is shown when a validation error occurs */
    validationMessage: { type: String, default: undefined },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Timepicker component size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Timepicker component box where you choose the date */
    boxClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Timepicker separator */
    separatorClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Timepicker footer */
    footerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /**
     * Class configuration for the internal input component
     * @ignore
     */
    inputClasses: {
        type: Object,
        default: () => getOption("timepicker.inputClasses", {}),
    },
    /**
     * Class configuration for the internal dropdown component
     * @ignore
     */
    dropdownClasses: {
        type: Object,
        default: () => getOption("timepicker.dropdownClasses", {}),
    },
    /**
     * Class configuration for the internal select component
     * @ignore
     */
    selectClasses: {
        type: Object,
        default: () => getOption("timepicker.selectClasses", {}),
    },
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
    defaultTimeFormatter,
    defaultTimeParser,
    pmString,
    amString,
    meridiens,
    isHourFormat24,
    hourLiteral,
    minuteLiteral,
    secondLiteral,
} = useTimepickerMixins(props);

const pickerRef = ref<InstanceType<typeof OPickerWrapper>>();

const vmodel = defineModel<Date>();

/** Dropdown active state */
const isActive = defineModel<boolean>("active", { default: false });

const hoursSelected = ref();
const minutesSelected = ref();
const secondsSelected = ref();
const meridienSelected = ref();

/**
 * When v-model is changed:
 *   1. Update internal value.
 *   2. If it's invalid, validate again.
 */
watch(
    () => props.modelValue,
    (value) => {
        if (value) {
            hoursSelected.value = value.getHours();
            minutesSelected.value = value.getMinutes();
            secondsSelected.value = value.getSeconds();
            meridienSelected.value =
                value.getHours() >= 12 ? pmString.value : amString.value;
        } else {
            hoursSelected.value = null;
            minutesSelected.value = null;
            secondsSelected.value = null;
            meridienSelected.value = amString.value;
        }
    },
    { immediate: true },
);

/** Format date into string */
const formattedValue = computed(() =>
    (props.timeFormatter as any)(props.modelValue, defaultTimeFormatter),
);

const nativeStep = computed(() => (props.enableSeconds ? "1" : null));

watch(
    () => props.hourFormat,
    () => {
        if (hoursSelected.value !== null) {
            meridienSelected.value =
                hoursSelected.value >= 12 ? pmString.value : amString.value;
        }
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

function pad(value: number): string {
    return (value < 10 ? "0" : "") + value;
}

const hours = computed(() => {
    if (!props.incrementHours || props.incrementHours < 1)
        throw new Error("Hour increment cannot be null or less than 1.");
    const hours = [];
    const numberOfHours = isHourFormat24.value ? 24 : 12;
    for (let i = 0; i < numberOfHours; i += props.incrementHours) {
        let value = i;
        let label = value;
        if (!isHourFormat24.value) {
            value = i + 1;
            label = value;
            if (meridienSelected.value === amString.value) {
                if (value === 12) {
                    value = 0;
                }
            } else if (meridienSelected.value === pmString.value) {
                if (value !== 12) {
                    value += 12;
                }
            }
        }
        hours.push({
            label: formatNumber(label, false),
            value: value,
        });
    }
    return hours;
});

const minutes = computed(() => {
    if (!props.incrementMinutes || props.incrementMinutes < 1)
        throw new Error("Minute increment cannot be null or less than 1.");
    const minutes = [];
    for (let i = 0; i < 60; i += props.incrementMinutes) {
        minutes.push({
            label: formatNumber(i, true),
            value: i,
        });
    }
    return minutes;
});

const seconds = computed(() => {
    if (!props.incrementSeconds || props.incrementSeconds < 1)
        throw new Error("Second increment cannot be null or less than 1.");
    const seconds = [];
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
    if (props.unselectableTimes) {
        if (!disabled) {
            if (typeof props.unselectableTimes === "function") {
                const date = new Date();
                date.setHours(hour);
                date.setMinutes(minutesSelected.value);
                date.setSeconds(secondsSelected.value);
                return props.unselectableTimes(date);
            } else {
                const unselectable = props.unselectableTimes.filter((time) => {
                    if (props.enableSeconds && secondsSelected.value !== null) {
                        return (
                            time.getHours() === hour &&
                            time.getMinutes() === minutesSelected.value &&
                            time.getSeconds() === secondsSelected.value
                        );
                    } else if (minutesSelected.value !== null) {
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
                            (props.unselectableTimes as Date[]).filter(
                                (time) => {
                                    return (
                                        time.getHours() === hour &&
                                        time.getMinutes() === minute.value
                                    );
                                },
                            ).length > 0
                        );
                    });
                }
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
    if (hoursSelected.value === null) return false;

    let disabled = false;
    if (isHourDisabled(hoursSelected.value)) {
        disabled = true;
    } else {
        disabled = isMinuteDisabledForHour(hoursSelected.value, minute);
    }
    if (props.unselectableTimes) {
        if (!disabled) {
            if (typeof props.unselectableTimes === "function") {
                const date = new Date();
                date.setHours(hoursSelected.value);
                date.setMinutes(minute);
                date.setSeconds(secondsSelected.value);
                return props.unselectableTimes(date);
            } else {
                const unselectable = props.unselectableTimes.filter((time) => {
                    if (props.enableSeconds && secondsSelected.value !== null) {
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
    }
}

function isSecondDisabled(second: number): boolean {
    if (minutesSelected.value == null) return false;
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
    if (props.unselectableTimes) {
        if (!disabled) {
            if (typeof props.unselectableTimes === "function") {
                const date = new Date();
                date.setHours(hoursSelected.value);
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
    }
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
        hours != null &&
        minutes != null &&
        ((!isHourFormat24.value && meridiens !== null) || isHourFormat24.value)
    ) {
        let time: Date = null;
        if (vmodel.value) {
            time = new Date(vmodel.value);
        } else {
            time = props.timeCreator();
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

/** Format date into string 'HH-MM-SS'*/
function formatNative(value: Date): string {
    const date = new Date(value);
    if (value && !isNaN(date.getTime())) {
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
    return "";
}

// --- Event Handler ---

function onMeridienChange(value: string): void {
    if (hoursSelected.value !== null && props.resetOnMeridianChange) {
        hoursSelected.value = null;
        minutesSelected.value = null;
        secondsSelected.value = null;
        vmodel.value = null;
    } else if (hoursSelected.value !== null) {
        if (value === pmString.value) hoursSelected.value += 12;
        else if (value === amString.value) hoursSelected.value -= 12;
    }
    updateDateSelected(
        hoursSelected.value,
        minutesSelected.value,
        props.enableSeconds ? secondsSelected.value : 0,
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
        minutesSelected.value,
        props.enableSeconds ? secondsSelected.value : 0,
        meridienSelected.value,
    );
}

function onMinutesChange(value: string): void {
    if (!secondsSelected.value && props.defaultSeconds)
        secondsSelected.value = props.defaultSeconds;

    updateDateSelected(
        hoursSelected.value,
        parseInt(value, 10),
        props.enableSeconds ? secondsSelected.value : 0,
        meridienSelected.value,
    );
}

function onSecondsChange(value: string): void {
    updateDateSelected(
        hoursSelected.value,
        minutesSelected.value,
        parseInt(value, 10),
        meridienSelected.value,
    );
}

/** Parse string into date */
function onChange(value: string): void {
    const date = (props.timeParser as any)(value, defaultTimeParser);
    vmodel.value = date ? date : null;
}

/** Parse time from string */
function onChangeNativePicker(date: string): void {
    if (date) {
        let time = null;
        if (vmodel.value) {
            time = new Date(vmodel.value);
        } else {
            time = props.timeCreator();
            time.setMilliseconds(0);
        }
        const t = date.split(":");
        time.setHours(parseInt(t[0], 10));
        time.setMinutes(parseInt(t[1], 10));
        time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
        vmodel.value = new Date(time.getTime());
    } else {
        vmodel.value = null;
    }
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
    "select-class": getActiveClasses(selectSelectClasses.value),
    "placeholder-class": getActiveClasses(selectPlaceholderClasses.value),
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

const dropdownClass = defineClasses([
    "dropdownClasses.rootClass",
    "o-tpck__dropdown",
]);

const boxClasses = defineClasses(["boxClass", "o-tpck__box"]);
const boxClassBind = computed(() => getActiveClasses(boxClasses.value));

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: () => pickerRef.value?.focus() });
</script>

<template>
    <OPickerWrapper
        ref="pickerRef"
        v-model:active="isActive"
        data-oruga="timepicker"
        :value="vmodel"
        :picker-props="props"
        :formatted-value="formattedValue"
        native-type="time"
        :native-value="formatNative(vmodel)"
        :native-max="formatNative(maxTime)"
        :native-min="formatNative(minTime)"
        :native-step="nativeStep"
        :dropdown-classes="dropdownClass"
        :root-classes="rootClasses"
        :box-class="boxClassBind"
        @change="onChange"
        @native-change="onChangeNativePicker"
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
            override
            :disabled="disabled"
            placeholder="00"
            @change="onHoursChange($event.target.value)">
            <option
                v-for="hour in hours"
                :key="hour.value"
                :value="hour.value"
                :disabled="isHourDisabled(hour.value)">
                {{ hour.label }}
            </option>
        </o-select>
        <span :class="separatorClasses">{{ hourLiteral }}</span>
        <o-select
            v-bind="selectBind"
            v-model="minutesSelected"
            override
            :disabled="disabled"
            placeholder="00"
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
