<script setup lang="ts">
import { computed, ref, type PropType } from "vue";

import OTooltip from "../tooltip/Tooltip.vue";

import { isClient } from "@/utils/ssr";

import type { SliderProps } from "./types";
import type { PropBind } from "@/types";

/**
 * @displayName Slider Thumb
 */
defineOptions({
    isOruga: true,
    name: "OSliderThumb",
    configField: "slider",
    inheritAttrs: false,
});

const props = defineProps({
    /** parent slider component props  */
    sliderProps: { type: Object as PropType<SliderProps>, required: true },
    modelValue: { type: Number, required: true },
    sliderSize: { type: Function as PropType<() => number>, required: true },
    thumbWrapperClasses: {
        type: [String, Object] as PropType<PropBind>,
        required: true,
    },
    thumbClasses: {
        type: [String, Object] as PropType<PropBind>,
        required: true,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {number | number[]} updated modelValue prop
     */
    (e: "update:modelValue", value: number | number[]): void;
    /** on value change event */
    (e: "change"): void;
    /** on drag start event */
    (e: "dragstart"): void;
    /** on drag end event */
    (e: "dragend"): void;
}>();

/** the computed picker contains all chared props from the datepicker and the timepicker  */
const slider = computed<SliderProps>(() => props.sliderProps);

const isFocused = ref(false);
const dragging = ref(false);
const startX = ref(0);
const startPosition = ref(0);
const newPosition = ref(null);
const oldValue = ref(props.modelValue);

const tooltip = computed(() => slider.value.tooltip);
const tooltipAlways = computed(() => slider.value.tooltipAlways);
const disabled = computed(() => slider.value.disabled);
const max = computed(() => slider.value.max);
const min = computed(() => slider.value.min);
const step = computed(() => slider.value.step);
const indicator = computed(() => slider.value.indicator);

const ariaLabel = computed(() =>
    Array.isArray(slider.value.ariaLabel)
        ? slider.value.ariaLabel[0]
        : slider.value.ariaLabel,
);

const precision = computed(() => {
    const precisions = [min.value, max.value, step.value].map((item) => {
        const decimal = ("" + item).split(".")[1];
        return decimal ? decimal.length : 0;
    });
    return Math.max(...precisions);
});

const computedTooltipVariant = computed(() =>
    slider.value.tooltipVariant
        ? slider.value.tooltipVariant
        : slider.value.variant,
);

const currentPosition = computed(
    () =>
        `${((props.modelValue - min.value) / (max.value - min.value)) * 100}%`,
);

const wrapperStyle = computed(() => ({ left: currentPosition.value }));

const formattedValue = computed(() => {
    if (typeof slider.value.customFormatter !== "undefined")
        return slider.value.customFormatter(props.modelValue);

    if (slider.value.format === "percent")
        return new Intl.NumberFormat(slider.value.locale, {
            style: "percent",
        }).format((props.modelValue - min.value) / (max.value - min.value));

    return new Intl.NumberFormat(slider.value.locale).format(props.modelValue);
});

function onFocus(): void {
    isFocused.value = true;
}

function onBlur(): void {
    isFocused.value = false;
}

function onButtonDown(event): void {
    if (disabled.value) return;
    event.preventDefault();
    onDragStart(event);

    if (isClient) {
        document.addEventListener("mousemove", onDragging);
        document.addEventListener("touchmove", onDragging);
        document.addEventListener("mouseup", onDragEnd);
        document.addEventListener("touchend", onDragEnd);
        document.addEventListener("contextmenu", onDragEnd);
    }
}

function onLeftKeyDown(): void {
    if (disabled.value || props.modelValue === min.value) return;
    newPosition.value =
        parseFloat(currentPosition.value) -
        (step.value / (max.value - min.value)) * 100;
    setPosition(newPosition.value);
    emits("change");
}

function onRightKeyDown(): void {
    if (disabled.value || props.modelValue === max.value) return;
    newPosition.value =
        parseFloat(currentPosition.value) +
        (step.value / (max.value - min.value)) * 100;
    setPosition(newPosition.value);
    emits("change");
}

function onHomeKeyDown(): void {
    if (disabled.value || props.modelValue === min.value) return;
    newPosition.value = 0;
    setPosition(newPosition.value);
    emits("change");
}

function onEndKeyDown(): void {
    if (disabled.value || props.modelValue === max.value) return;
    newPosition.value = 100;
    setPosition(newPosition.value);
    emits("change");
}

function onDragStart(event): void {
    dragging.value = true;
    emits("dragstart");
    if (event.type === "touchstart") event.clientX = event.touches[0].clientX;

    startX.value = event.clientX;
    startPosition.value = parseFloat(currentPosition.value);
    newPosition.value = startPosition.value;
}

function onDragging(event): void {
    if (dragging.value) {
        if (event.type === "touchmove")
            event.clientX = event.touches[0].clientX;

        const diff =
            ((event.clientX - startX.value) / props.sliderSize()) * 100;
        newPosition.value = startPosition.value + diff;
        setPosition(newPosition.value);
    }
}

function onDragEnd(): void {
    dragging.value = false;
    emits("dragend");
    if (props.modelValue !== oldValue.value) emits("change");

    setPosition(newPosition.value);
    if (isClient) {
        document.removeEventListener("mousemove", onDragging);
        document.removeEventListener("touchmove", onDragging);
        document.removeEventListener("mouseup", onDragEnd);
        document.removeEventListener("touchend", onDragEnd);
        document.removeEventListener("contextmenu", onDragEnd);
    }
}

function setPosition(percent: number): void {
    if (percent === null || isNaN(percent)) return;
    if (percent < 0) percent = 0;
    else if (percent > 100) percent = 100;

    const stepLength = 100 / ((max.value - min.value) / step.value);
    const steps = Math.round(percent / stepLength);
    let value =
        ((steps * stepLength) / 100) * (max.value - min.value) + min.value;
    value = parseFloat(value.toFixed(precision.value));
    emits("update:modelValue", value);

    if (!dragging.value && value !== oldValue.value) oldValue.value = value;
}

defineExpose({ setPosition });
</script>

<template>
    <div
        :class="thumbWrapperClasses"
        :style="wrapperStyle"
        data-oruga="slider-thumb">
        <o-tooltip
            :label="formattedValue"
            :variant="computedTooltipVariant"
            :disabled="disabled || !tooltip"
            :always="tooltipAlways || dragging || isFocused">
            <div
                v-bind="$attrs"
                :class="thumbClasses"
                :tabindex="disabled ? null : 0"
                role="slider"
                :aria-label="ariaLabel"
                :aria-valuenow="modelValue"
                :aria-valuemin="min"
                :aria-valuemax="max"
                :aria-disabled="disabled"
                aria-orientation="horizontal"
                @mousedown="onButtonDown"
                @touchstart="onButtonDown"
                @focus="onFocus"
                @blur="onBlur"
                @keydown.left.prevent="onLeftKeyDown"
                @keydown.right.prevent="onRightKeyDown"
                @keydown.down.prevent="onLeftKeyDown"
                @keydown.up.prevent="onRightKeyDown"
                @keydown.home.prevent="onHomeKeyDown"
                @keydown.end.prevent="onEndKeyDown">
                <span v-if="indicator">{{ formattedValue }}</span>
            </div>
        </o-tooltip>
    </div>
</template>
