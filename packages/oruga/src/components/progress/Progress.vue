<script setup lang="ts">
import { computed } from "vue";

import { getDefault } from "@/utils/config";
import { bound } from "@/utils/helpers";
import { defineClasses } from "@/composables";

import type { ProgressProps } from "./props";

/**
 * A bar showing the completion progress of a task.
 * @displayName Progress
 * @style _progress.scss
 */
defineOptions({
    isOruga: true,
    name: "OProgress",
    configField: "progress",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<ProgressProps>(), {
    override: undefined,
    value: undefined,
    min: 0,
    max: 100,
    variant: () => getDefault("progress.variant"),
    size: () => getDefault("progress.size"),
    rounded: () => getDefault("progress.rounded", false),
    showValue: false,
    format: () => getDefault("progress.format", "raw"),
    formatter: undefined,
    locale: () => getDefault("locale"),
});

defineSlots<{
    /**
     * Override the label
     * @param value {number | undefined} - the current progress value, undefined when indeterminate
     * @param label {string} - the formatted progress value
     */
    default?(props: { value: number | undefined; label: string }): void;
}>();

/** the progress value restricted to the range between min and max */
const currentValue = computed(() =>
    typeof props.value === "number" && !Number.isNaN(props.value)
        ? bound(props.value, props.min, props.max)
        : undefined,
);

const isIndeterminate = computed(() => currentValue.value === undefined);

/** the completed fraction of the progress between 0 and 1 */
const ratio = computed(() => {
    if (currentValue.value === undefined || props.max <= props.min) return 0;
    return (currentValue.value - props.min) / (props.max - props.min);
});

/**
 * The native progress element always starts at 0,
 * so its value and maximum are shifted by the minimum.
 * An empty range removes the maximum to fall back to the native default.
 */
const nativeMax = computed(() =>
    props.max > props.min ? props.max - props.min : undefined,
);

/** without a value the native progress element is indeterminate */
const nativeValue = computed(() =>
    currentValue.value !== undefined
        ? currentValue.value - props.min
        : undefined,
);

const formattedValue = computed(() => {
    if (currentValue.value === undefined) return "";

    if (typeof props.formatter === "function")
        return props.formatter(currentValue.value);

    if (props.format === "percent")
        return new Intl.NumberFormat(props.locale, {
            style: "percent",
        }).format(ratio.value);

    return new Intl.NumberFormat(props.locale).format(currentValue.value);
});

/** a custom formatted value is announced instead of the percentage */
const ariaValueText = computed(() =>
    props.formatter && !isIndeterminate.value
        ? formattedValue.value
        : undefined,
);

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-progress"],
    [
        "variantClass",
        "o-progress--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "sizeClass",
        "o-progress--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "roundedClass",
        "o-progress--rounded",
        null,
        computed(() => !!props.rounded),
    ],
    ["indeterminateClass", "o-progress--indeterminate", null, isIndeterminate],
);

const barClasses = defineClasses(["barClass", "o-progress__bar"]);

const labelClasses = defineClasses(["labelClass", "o-progress__label"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div data-oruga="progress" :class="rootClasses">
        <progress
            :class="barClasses"
            :max="nativeMax"
            :value="nativeValue"
            :aria-valuetext="ariaValueText"
            v-bind="$attrs" />

        <span
            v-if="$slots.default || (showValue && !isIndeterminate)"
            :class="labelClasses">
            <slot :value="currentValue" :label="formattedValue">{{
                formattedValue
            }}</slot>
        </span>
    </div>
</template>
