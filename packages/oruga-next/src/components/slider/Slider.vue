<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";

import OSliderThumb from "./SliderThumb.vue";
import OSliderTick from "./SliderTick.vue";

import { getOption } from "@/utils/config";
import {
    type ComputedClass,
    defineClasses,
    useProviderParent,
} from "@/composables";

import type { SliderComponent } from "./types";
import type { ComponentClass } from "@/types";

/**
 * A slider to select a value or range from a given range
 * @displayName Slider
 * @requires ./SliderTick.vue
 * @style _slider.scss
 */
defineOptions({
    isOruga: true,
    name: "OSlider",
    configField: "slider",
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** @model */
    modelValue: {
        type: [Number, Array] as PropType<number | number[]>,
        default: 0,
    },
    /** Minimum value */
    min: { type: Number, default: 0 },
    /** Maximum  value */
    max: { type: Number, default: 100 },
    /** Step interval of ticks */
    step: { type: Number, default: 1 },
    /**
     * Color of the slider
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("slider.variant"),
    },
    /**
     * Vertical size of slider
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("slider.size"),
    },
    /** Show tick marks */
    ticks: { type: Boolean, default: false },
    /** Show tooltip when thumb is being dragged */
    tooltip: {
        type: Boolean,
        default: () => getOption("slider.tooltip", true),
    },
    /**
     * Color of the tooltip
     * @values primary, info, success, warning, danger, and any other custom color
     */
    tooltipVariant: {
        type: String,
        default: () => getOption("slider.tooltipVariant"),
    },
    /** Tooltip displays always */
    tooltipAlways: { type: Boolean, default: false },
    /** Rounded thumb */
    rounded: {
        type: Boolean,
        default: () => getOption("slider.rounded", false),
    },
    /** Slider will be disabled */
    disabled: { type: Boolean, default: false },
    /** Update v-model only when dragging is finished */
    lazy: { type: Boolean, default: false },
    /** Function to format the tooltip label for display */
    customFormatter: { type: Function, default: undefined },
    /** Increases slider size on focus */
    biggerSliderFocus: { type: Boolean, default: false },
    /** Show indicators */
    indicator: { type: Boolean, default: false },
    /**
     * Define v-model format
     * @values row, percent
     */
    format: {
        type: String,
        default: () => getOption("slider.format", "raw"),
        validator: (value: string) => ["raw", "percent"].indexOf(value) >= 0,
    },
    /** Date format locale */
    locale: {
        type: [String, Array] as PropType<string | string[]>,
        default: () => getOption("locale"),
    },
    /** Accessibility aria-label to to be passed to the slider thumb element. */
    ariaLabel: {
        type: [String, Array] as PropType<string | string[]>,
        default: () => getOption("slider.ariaLabel"),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the vertical slider size */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the slider track */
    trackClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the filled part of the slider */
    fillClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when the slider is rounded */
    thumbRoundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when the thumb gets dragged */
    thumbDraggingClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when slider is disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the thumb wrapper */
    thumbWrapperClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the thumb */
    thumbClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the slider variant */
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of slider tick */
    tickClass: {
        type: [String, Function, Array] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when slider tick is hidden */
    tickHiddenClass: {
        type: [String, Function, Array] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of tick label */
    tickLabelClass: {
        type: [String, Function, Array] as PropType<ComponentClass>,
        default: undefined,
    },
    draggingClassOnWrapper: {
        type: Boolean,
        default: () => getOption("slider.draggingClassOnWrapper", false),
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {number | number[]} updated modelValue prop
     */
    (e: "update:modelValue", value: number | number[]): void;
    /**
     * on value change event
     * @param value {number | number[]} updated modelValue prop
     */
    (e: "change", value: number | number[]): void;
    /**
     * on dragging event
     * @param value {number | number[]} updated modelValue prop
     * */
    (e: "dragging", value: number | number[]): void;
    /** on drag start event */
    (e: "dragstart"): void;
    /** on drag end event */
    (e: "dragend"): void;
}>();

function emitValue(event: any): void {
    const val = isRange.value
        ? [minValue.value, maxValue.value]
        : valueStart.value || 0;
    emits(event, val);
}

// Provided data is a computed ref to enjure reactivity.
const provideData = computed<SliderComponent>(() => ({
    max: props.max,
    min: props.min,
}));

/** Provide functionalities and data to child item components */
useProviderParent(undefined, { data: provideData });

const sliderRef = ref();
const thumbStartRef = ref();
const thumbEndRef = ref();

const valueStart = ref<number>(null);
const valueEnd = ref<number>(null);
const dragging = ref(false);
const isRange = ref(false);

const isThumbReversed = ref();
const isTrackClickDisabled = ref();

setValues(props.modelValue);

watch([valueStart, valueEnd], () => onInternalValueUpdate());

/** When min, max or v-model is changed set the new active step. */
watch([() => props.min, () => props.max, () => props.modelValue], () =>
    setValues(props.modelValue),
);

const tickValues = computed(() => {
    if (!props.ticks || props.min > props.max || props.step === 0) return [];
    const result = [];
    for (let i = props.min + props.step; i < props.max; i = i + props.step) {
        result.push(i);
    }
    return result;
});

const minValue = computed(() => Math.min(valueStart.value, valueEnd.value));

const maxValue = computed(() => Math.max(valueStart.value, valueEnd.value));

const barSize = computed(() =>
    isRange.value
        ? `${
              (100 * (maxValue.value - minValue.value)) /
              (props.max - props.min)
          }%`
        : `${
              (100 * (valueStart.value - props.min)) / (props.max - props.min)
          }%`,
);

const barStart = computed(() =>
    isRange.value
        ? `${(100 * (minValue.value - props.min)) / (props.max - props.min)}%`
        : "0%",
);

const barStyle = computed(() => ({
    width: barSize.value,
    left: barStart.value,
}));

function setValues(newValue: number | number[]): void {
    if (props.min > props.max) return;

    if (Array.isArray(newValue)) {
        isRange.value = true;
        const smallValue =
            typeof newValue[0] !== "number" || isNaN(newValue[0])
                ? props.min
                : Math.min(Math.max(props.min, newValue[0]), props.max);
        const largeValue =
            typeof newValue[1] !== "number" || isNaN(newValue[1])
                ? props.max
                : Math.max(Math.min(props.max, newValue[1]), props.min);
        valueStart.value = isThumbReversed.value ? largeValue : smallValue;
        valueEnd.value = isThumbReversed.value ? smallValue : largeValue;
    } else {
        isRange.value = false;
        valueStart.value = isNaN(newValue)
            ? props.min
            : Math.min(props.max, Math.max(props.min, newValue));
        valueEnd.value = null;
    }
}

function onInternalValueUpdate(): void {
    if (isRange.value)
        isThumbReversed.value = valueStart.value > valueEnd.value;
    if (!props.lazy || !dragging.value) emitValue("update:modelValue");
    if (dragging.value) emitValue("dragging");
}

function sliderSize(): number {
    return sliderRef.value.getBoundingClientRect().width;
}

function onSliderClick(event: MouseEvent): void {
    if (props.disabled || isTrackClickDisabled.value) return;
    const sliderOffsetLeft = sliderRef.value.getBoundingClientRect().left;
    const percent = ((event.clientX - sliderOffsetLeft) / sliderSize()) * 100;
    const targetValue = props.min + (percent * (props.max - props.min)) / 100;
    const diffFirst = Math.abs(targetValue - valueStart.value);
    if (!isRange.value) {
        if (diffFirst < props.step / 2) return;
        thumbStartRef.value.setPosition(percent);
    } else {
        const diffSecond = Math.abs(targetValue - valueEnd.value);
        if (diffFirst <= diffSecond) {
            if (diffFirst < props.step / 2) return;
            thumbStartRef.value.setPosition(percent);
        } else {
            if (diffSecond < props.step / 2) return;
            thumbEndRef.value.setPosition(percent);
        }
    }
    emitValue("change");
}

function onDragStart(): void {
    dragging.value = true;
    emits("dragstart");
}

function onDragEnd(): void {
    isTrackClickDisabled.value = true;
    // avoid triggering onSliderClick after dragend
    setTimeout(() => (isTrackClickDisabled.value = false));
    dragging.value = false;
    emits("dragend");
    if (props.lazy) emitValue("update:modelValue");
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-slide"],
    [
        "sizeClass",
        "o-slide--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "disabledClass",
        "o-slide--disabled",
        null,
        computed(() => props.disabled),
    ],
);

const trackClasses = defineClasses(["trackClass", "o-slide__track"]);

const fillClasses = defineClasses(
    ["fillClass", "o-slide__fill"],
    [
        "variantClass",
        "o-slide__fill--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

const draggingComputedClass: ComputedClass = [
    "thumbDraggingClass",
    "o-slide__thumb--dragging",
    null,
    dragging,
];

const thumbClasses = defineClasses(
    ["thumbClass", "o-slide__thumb"],
    props.draggingClassOnWrapper ? undefined : draggingComputedClass,
    [
        "thumbRoundedClass",
        "o-slide__thumb--rounded",
        null,
        computed(() => props.rounded),
    ],
);

const thumbWrapperClasses = defineClasses(
    ["thumbWrapperClass", "o-slide__thumb-wrapper"],
    props.draggingClassOnWrapper ? draggingComputedClass : undefined,
);
</script>

<template>
    <div :class="rootClasses" data-oruga="slider" @click="onSliderClick">
        <div ref="sliderRef" :class="trackClasses">
            <div :class="fillClasses" :style="barStyle" />
            <template v-if="ticks">
                <o-slider-tick
                    v-for="(val, key) in tickValues"
                    :key="key"
                    :value="val"
                    :tick-class="tickClass"
                    :tick-hidden-class="tickHiddenClass"
                    :tick-label-class="tickLabelClass" />
            </template>

            <!--
                @slot Define additional slider ticks here
             -->
            <slot />

            <o-slider-thumb
                ref="thumbStartRef"
                v-model="valueStart"
                :slider-props="props"
                :slider-size="sliderSize"
                :thumb-classes="thumbClasses"
                :thumb-wrapper-classes="thumbWrapperClasses"
                @change="emitValue('change')"
                @dragstart="onDragStart"
                @dragend="onDragEnd" />

            <o-slider-thumb
                v-if="isRange"
                ref="thumbEndRef"
                v-model="valueEnd"
                :slider-props="props"
                :slider-size="sliderSize"
                :thumb-classes="thumbClasses"
                :thumb-wrapper-classes="thumbWrapperClasses"
                @change="emitValue('change')"
                @dragstart="onDragStart"
                @dragend="onDragEnd" />
        </div>
    </div>
</template>
