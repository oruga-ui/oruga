<script setup lang="ts">
import { computed, ref, useAttrs, useTemplateRef, watch } from "vue";

import OSelect from "../select/Select.vue";
import OPickerInput from "../utils/PickerInput.vue";

import { getDefault, getDefaultFunction } from "@/utils/config";
import {
    isDate,
    isDefined,
    isRootAttr,
    pad,
    splitObject,
} from "@/utils/helpers";
import { defineClasses, useMatchMedia } from "@/composables";

import { useTimepicker } from "./useTimepicker";

import type { TimepickerProps } from "./props";
import type { SelectOption } from "../select";

type ModelValue = TimepickerProps["modelValue"];

/**
 * An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile.
 * @displayName Timepicker
 * @style _timepicker.scss
 */
defineOptions({
    isOruga: true,
    name: "OTimepicker",
    configField: "timepicker",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<TimepickerProps>(), {
    override: undefined,
    modelValue: undefined,
    active: false,
    stayOpen: false,
    openOnFocus: true,
    minTime: undefined,
    maxTime: undefined,
    inline: false,
    placeholder: undefined,
    expanded: () => getDefault("timepicker.expanded", false),
    rounded: false,
    readonly: false,
    disabled: false,
    size: () => getDefault("timepicker.size"),
    hourFormat: undefined,
    incrementHours: 1,
    incrementMinutes: 1,
    incrementSeconds: 1,
    enableSeconds: false,
    defaultMinutes: undefined,
    defaultSeconds: undefined,
    locale: () => getDefault("locale"),
    formatter: getDefaultFunction("timepicker.formatter"),
    parser: getDefaultFunction("timepicker.parser"),
    creator: getDefaultFunction("timepicker.creator"),
    unselectableTimes: undefined,
    resetOnMeridianChange: false,
    position: () => getDefault("timepicker.position", "bottom"),
    iconPack: () => getDefault("timepicker.iconPack"),
    icon: () => getDefault("timepicker.icon"),
    iconSize: () => getDefault("timepicker.iconSize"),
    iconRight: () => getDefault("timepicker.iconRight"),
    iconRightClickable: false,
    iconRightVariant: () => getDefault("timepicker.iconRightVariant"),
    desktopModal: () => getDefault("timepicker.desktopModal", false),
    mobileModal: () => getDefault("timepicker.mobileModal", true),
    mobileNative: () => getDefault("timepicker.mobileNative", true),
    mobileBreakpoint: () => getDefault("timepicker.mobileBreakpoint"),
    teleport: () => getDefault("timepicker.teleport", false),
    useHtml5Validation: () => getDefault("useHtml5Validation", true),
    customValidity: "",
    ariaSelectSecondsLabel: () =>
        getDefault("timepicker.ariaSelectSecondsLabel", "Select Second"),
    ariaSelectMinutesLabel: () =>
        getDefault("timepicker.ariaSelectMinutesLabel", "Select Minute"),
    ariaSelectHoursLabel: () =>
        getDefault("timepicker.ariaSelectHoursLabel", "Select Hour"),
    inputAttrs: () => getDefault("timepicker.inputAttrs"),
    selectAttrs: () => getDefault("timepicker.selectAttrs"),
});

defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {Date} - updated modelValue prop
     */
    // eslint-disable-next-line vue/no-unused-emit-declarations -- emitted by defineModel
    "update:model-value": [value: Date];
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on input focus event
     * @param event {Event} - native event
     */
    focus: [event: Event];
    /**
     * on input blur event
     * @param event {Event} - native event
     */
    blur: [event: Event];
    /**
     * on input invalid event
     * @param event {Event} - native event
     */
    invalid: [event: Event];
    /**
     * on icon click event
     * @param event {Event} - native event
     */
    "icon-click": [event: Event];
    /**
     * on icon right click event
     * @param event {Event} - native event
     */
    "icon-right-click": [event: Event];
}>();

defineSlots<{
    /** Override the trigger input element */
    trigger?(): void;
    /** Define an additional content before the body */
    header?(): void;
    /** Override the content body */
    body?(): void;
    /** Define an additional content after the body */
    footer?(): void;
}>();

const pickerRef = useTemplateRef("pickerComponent");

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const isModal = computed(() =>
    props.inline
        ? false
        : isMobile.value
          ? props.mobileModal
          : props.desktopModal,
);

const attrs = useAttrs();

/**
 * Split the fallthrough attributes between the root element and the input.
 * An inline picker has no input, so all attributes stay on the root.
 */
const pickerAttrs = computed(() => {
    const [root, input] = splitObject(
        attrs,
        (key) => props.inline || isRootAttr(key),
    );
    return { root, input };
});

// the modelvalue of selected date, use v-model to make it two-way binding
const vmodel = defineModel<ModelValue>({ default: undefined });

// the active state of the dropdown, use v-model:active to make it two-way binding
const isActive = defineModel<boolean>("active", { default: false });

watch(vmodel, () => {
    if (!props.inline && isActive.value && !props.stayOpen)
        isActive.value = false;
});

const {
    dtf,
    pmString,
    amString,
    meridiens,
    isHourFormat24,
    hourLiteral,
    minuteLiteral,
    secondLiteral,
    timeCreator,
    timeFormatter,
    timeParser,
} = useTimepicker(props);

const hoursSelected = ref<number>();
const minutesSelected = ref<number>();
const secondsSelected = ref<number>();
const meridienSelected = ref<string>();

/** Update internal value. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) vmodel.value = value;
        if (value) {
            // update internal state
            hoursSelected.value = value.getHours();
            minutesSelected.value = value.getMinutes();
            secondsSelected.value = value.getSeconds();
            meridienSelected.value =
                value.getHours() >= 12 ? pmString.value : amString.value;
        } else {
            // reset internal state
            hoursSelected.value = undefined;
            minutesSelected.value = undefined;
            secondsSelected.value = undefined;
            meridienSelected.value = amString.value;
        }
    },
    { immediate: true },
);

const step = computed(() => (props.enableSeconds ? "1" : undefined));

watch(
    () => props.hourFormat,
    () => {
        if (isDefined(hoursSelected.value)) {
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

const hours = computed<(SelectOption<number> & { value: number })[]>(() => {
    if (!props.incrementHours || props.incrementHours < 1)
        throw new Error("Hour increment cannot be null or less than 1.");
    const options: (SelectOption<number> & { value: number })[] = [];
    const numberOfHours = isHourFormat24.value ? 24 : 12;
    for (let i = 0; i < numberOfHours; i += props.incrementHours) {
        let value = i;
        let label = value;
        if (!isHourFormat24.value) {
            value = i + 1;
            label = value;
            if (meridienSelected.value === amString.value) {
                if (value === 12) value = 0;
            } else if (
                meridienSelected.value === pmString.value &&
                value !== 12
            ) {
                value += 12;
            }
        }
        options.push({
            label: formatNumber(label, false),
            value,
        });
    }
    return options;
});

const minutes = computed<(SelectOption<number> & { value: number })[]>(() => {
    if (!props.incrementMinutes || props.incrementMinutes < 1)
        throw new Error("Minute increment cannot be null or less than 1.");
    const options: (SelectOption<number> & { value: number })[] = [];
    for (let i = 0; i < 60; i += props.incrementMinutes) {
        options.push({
            label: formatNumber(i, true),
            value: i,
        });
    }
    return options;
});

const seconds = computed<(SelectOption<number> & { value: number })[]>(() => {
    if (!props.incrementSeconds || props.incrementSeconds < 1)
        throw new Error("Second increment cannot be null or less than 1.");
    const options: (SelectOption<number> & { value: number })[] = [];
    for (let i = 0; i < 60; i += props.incrementSeconds) {
        options.push({
            label: formatNumber(i, true),
            value: i,
        });
    }
    return options;
});

function isMinuteDisabledForHour(hour: number, minute: number): boolean {
    if (
        props.minTime &&
        hour === props.minTime.getHours() &&
        minute < props.minTime.getMinutes()
    ) {
        return true;
    }
    return !!(
        props.maxTime &&
        hour === props.maxTime.getHours() &&
        minute > props.maxTime.getMinutes()
    );
}

function isHourDisabled(hour: number): boolean {
    let disabled = false;
    if (props.minTime) {
        const noMinutesAvailable = minutes.value.every((minute) =>
            isMinuteDisabledForHour(hour, minute.value),
        );
        disabled = hour < props.minTime.getHours() || noMinutesAvailable;
    }
    if (props.maxTime && !disabled) {
        disabled = hour > props.maxTime.getHours();
    }

    const unselectableTimes = props.unselectableTimes;
    if (unselectableTimes && !disabled) {
        if (typeof unselectableTimes === "function") {
            const date = new Date();
            date.setHours(
                hour,
                minutesSelected.value || 0,
                secondsSelected.value || 0,
            );
            return unselectableTimes(date);
        }
        const unavailable = unselectableTimes.filter((time) => {
            if (props.enableSeconds && isDefined(secondsSelected.value)) {
                return (
                    time.getHours() === hour &&
                    time.getMinutes() === minutesSelected.value &&
                    time.getSeconds() === secondsSelected.value
                );
            }
            if (isDefined(minutesSelected.value)) {
                return (
                    time.getHours() === hour &&
                    time.getMinutes() === minutesSelected.value
                );
            }
            return false;
        });
        if (unavailable.length > 0) {
            disabled = true;
        } else {
            disabled = minutes.value.every((minute) =>
                unselectableTimes.some(
                    (time) =>
                        time.getHours() === hour &&
                        time.getMinutes() === minute.value,
                ),
            );
        }
    }
    return disabled;
}

function isMinuteDisabled(minute: number): boolean {
    if (hoursSelected.value === undefined) return false;

    let disabled =
        isHourDisabled(hoursSelected.value) ||
        isMinuteDisabledForHour(hoursSelected.value, minute);
    const unselectableTimes = props.unselectableTimes;
    if (unselectableTimes && !disabled) {
        if (typeof unselectableTimes === "function") {
            const date = new Date();
            date.setHours(
                hoursSelected.value,
                minute,
                secondsSelected.value || 0,
            );
            return unselectableTimes(date);
        }
        disabled = unselectableTimes.some((time) => {
            if (props.enableSeconds && isDefined(secondsSelected.value)) {
                return (
                    time.getHours() === hoursSelected.value &&
                    time.getMinutes() === minute &&
                    time.getSeconds() === secondsSelected.value
                );
            }
            return (
                time.getHours() === hoursSelected.value &&
                time.getMinutes() === minute
            );
        });
    }
    return disabled;
}

function isSecondDisabled(second: number): boolean {
    if (!isDefined(minutesSelected.value)) return false;
    let disabled = isMinuteDisabled(minutesSelected.value);

    if (!disabled && props.minTime) {
        disabled =
            hoursSelected.value === props.minTime.getHours() &&
            minutesSelected.value === props.minTime.getMinutes() &&
            second < props.minTime.getSeconds();
    }
    if (!disabled && props.maxTime) {
        disabled =
            hoursSelected.value === props.maxTime.getHours() &&
            minutesSelected.value === props.maxTime.getMinutes() &&
            second > props.maxTime.getSeconds();
    }

    const unselectableTimes = props.unselectableTimes;
    if (unselectableTimes && !disabled) {
        if (typeof unselectableTimes === "function") {
            const date = new Date();
            date.setHours(
                hoursSelected.value || 0,
                minutesSelected.value,
                second,
            );
            return unselectableTimes(date);
        }
        disabled = unselectableTimes.some(
            (time) =>
                time.getHours() === hoursSelected.value &&
                time.getMinutes() === minutesSelected.value &&
                time.getSeconds() === second,
        );
    }
    return disabled;
}

function isMeridienDisabled(meridienString: string): boolean {
    const offset = meridienString === pmString.value ? 12 : 0;
    for (let hour = 0; hour < 12; hour++) {
        if (!isHourDisabled(hour + offset)) return false;
    }
    return true;
}

function updateDateSelected(
    hours: number,
    minutes: number,
    seconds: number,
): void {
    if (!isDefined(hours) || !isDefined(minutes)) return;

    const time = vmodel.value ? new Date(vmodel.value) : timeCreator();
    if (!vmodel.value) time.setMilliseconds(0);
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(seconds);
    if (!Number.isNaN(time.getTime())) vmodel.value = new Date(time.getTime());
}

// #region --- Formatter / Parser ---

/** Format date into string */
function format(value: Date | Date[] | undefined, isNative: boolean): string {
    if (Array.isArray(value)) return format(value[0], isNative);
    if (isNative) return formatNative(value);
    return timeFormatter(value);
}

/** Format date into string 'HH-MM-SS'*/

function formatNative(value: Date | undefined): string {
    if (!value) return "";
    const date = new Date(value);
    if (!isDate(date)) return "";

    return (
        formatNumber(date.getHours(), true) +
        ":" +
        formatNumber(date.getMinutes(), true) +
        ":" +
        formatNumber(date.getSeconds(), true)
    );
}

/** Parse string into date */
function parse(value: string, isNative: boolean): Date | undefined {
    if (isNative) return parseNative(value);
    const date = timeParser(value);
    return isDate(date) ? date : undefined;
}

/** Parse time from string */

function parseNative(value: string): Date | undefined {
    if (!value) return undefined;

    const time = vmodel.value ? new Date(vmodel.value) : timeCreator();
    if (!vmodel.value) time.setMilliseconds(0);
    const parts = value.split(":");
    time.setHours(Number.parseInt(parts[0], 10));
    time.setMinutes(Number.parseInt(parts[1], 10));
    time.setSeconds(parts[2] ? Number.parseInt(parts[2], 10) : 0);
    return new Date(time.getTime());
}

// #endregion --- Formatter / Parser ---

// #region --- Event Handler ---

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
    );
}

function onHoursChange(value: string): void {
    if (!minutesSelected.value && props.defaultMinutes !== undefined)
        minutesSelected.value = props.defaultMinutes;
    if (!secondsSelected.value && props.defaultSeconds !== undefined)
        secondsSelected.value = props.defaultSeconds;

    updateDateSelected(
        parseInt(value, 10),
        minutesSelected.value || 0,
        props.enableSeconds ? secondsSelected.value || 0 : 0,
    );
}

function onMinutesChange(value: string): void {
    if (!secondsSelected.value && props.defaultSeconds)
        secondsSelected.value = props.defaultSeconds;

    updateDateSelected(
        hoursSelected.value || 0,
        parseInt(value, 10),
        props.enableSeconds ? secondsSelected.value || 0 : 0,
    );
}

function onSecondsChange(value: string): void {
    updateDateSelected(
        hoursSelected.value || 0,
        minutesSelected.value || 0,
        parseInt(value, 10),
    );
}

// #endregion --- Event Handler ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-timepicker"],
    [
        "sizeClass",
        "o-timepicker--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "disabledClass",
        "o-timepicker--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "expandedClass",
        "o-timepicker--expanded",
        null,
        computed(() => props.expanded),
    ],
    ["inlineClass", "o-timepicker--inline", null, computed(() => props.inline)],
    ["mobileClass", "o-timepicker--mobile", null, isMobile],
    ["activeClass", "o-timepicker--active", null, isActive],
    [
        "teleportClass",
        "o-timepicker--teleport",
        null,
        computed(() => !!props.teleport),
    ],
);

const triggerClasses = defineClasses(["triggerClass", "o-timepicker__trigger"]);
const contentClasses = defineClasses(
    ["contentClass", "o-timepicker__content"],
    ["contentActiveClass", "o-timepicker__content--active", null, isActive],
    ["contentModalClass", "o-timepicker__content--modal", null, isModal],
    ["contentBackdropClass", "o-timepicker__content--backdrop", null, isModal],
);

const bodyClasses = defineClasses(["bodyClass", "o-timepicker__body"]);

const inputClasses = defineClasses(["inputClass", "o-timepicker__input"]);

const selectClasses = defineClasses(["selectClass", "o-timepicker__select"]);

const separatorClasses = defineClasses([
    "separatorClass",
    "o-timepicker__separtor",
]);

const headerClasses = defineClasses(["headerClass", "o-timepicker__header"]);

const footerClasses = defineClasses(["footerClass", "o-timepicker__footer"]);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ focus: () => pickerRef.value?.focus(), value: vmodel });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <div data-oruga="timepicker" :class="rootClasses" v-bind="pickerAttrs.root">
        <OPickerInput
            ref="pickerComponent"
            v-bind="pickerAttrs.input"
            v-model:active="isActive"
            v-model:value="vmodel"
            :formatter="format"
            :parser="parse"
            :position="position"
            :modal="isModal"
            :inline="inline"
            :open-on-focus="openOnFocus"
            :dtf="dtf"
            :placeholder="placeholder"
            type="time"
            :max="maxTime"
            :min="minTime"
            :step="step"
            :size="size"
            :icon-pack="iconPack"
            :icon="icon"
            :icon-size="iconSize"
            :icon-right="iconRight"
            :icon-right-clickable="iconRightClickable"
            :icon-right-variant="iconRightVariant"
            :expanded="expanded"
            :rounded="rounded"
            :disabled="disabled"
            :readonly="readonly"
            :use-html5-validation="useHtml5Validation"
            :custom-validity="customValidity"
            :input-class="inputClasses"
            :trigger-class="triggerClasses"
            :content-class="contentClasses"
            :input-attrs="inputAttrs"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
            @invalid="$emit('invalid', $event)"
            @icon-click="$emit('icon-click', $event)"
            @icon-right-click="$emit('icon-right-click', $event)">
            <template v-if="$slots.trigger" #trigger>
                <slot name="trigger" />
            </template>

            <header v-if="$slots.header" :class="headerClasses">
                <slot name="header" />
            </header>

            <div :class="bodyClasses">
                <slot name="body">
                    <o-select
                        v-bind="selectAttrs"
                        v-model="hoursSelected"
                        :class="selectClasses"
                        override
                        :disabled="disabled"
                        placeholder="00"
                        :aria-label="ariaSelectHoursLabel"
                        :use-html5-validation="false"
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
                        v-bind="selectAttrs"
                        v-model="minutesSelected"
                        :class="selectClasses"
                        override
                        :disabled="disabled"
                        placeholder="00"
                        :aria-label="ariaSelectMinutesLabel"
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
                        <span :class="separatorClasses">{{
                            minuteLiteral
                        }}</span>

                        <o-select
                            v-bind="selectAttrs"
                            v-model="secondsSelected"
                            :class="selectClasses"
                            override
                            :disabled="disabled"
                            placeholder="00"
                            :aria-label="ariaSelectSecondsLabel"
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

                        <span :class="separatorClasses">{{
                            secondLiteral
                        }}</span>
                    </template>

                    <o-select
                        v-if="!isHourFormat24"
                        v-bind="selectAttrs"
                        v-model="meridienSelected"
                        :class="selectClasses"
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
                </slot>
            </div>

            <footer v-if="$slots.footer" :class="footerClasses">
                <slot name="footer" />
            </footer>
        </OPickerInput>
    </div>
</template>
