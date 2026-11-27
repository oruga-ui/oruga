<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import { defineClasses, useProviderChild } from "@/composables";

import type { SliderComponent } from "./types";
import type { ComponentClass } from "@/types";

/**
 * @displayName Slider Tick
 */
defineOptions({
    isOruga: true,
    name: "OSliderTick",
    configField: "slider",
});

const props = withDefaults(
    defineProps<{
        /** Override existing theme classes completely */
        override?: boolean;
        /** Value of single tick */
        value: number;
        /** Tick label */
        label?: string | number;
        /** Class of the tick */
        tickClass?: ComponentClass;
        /** Class when slider tick is hidden */
        tickHiddenClass?: ComponentClass;
        /** Class of tick label */
        tickLabelClass?: ComponentClass;
    }>(),
    {
        // keep `undefined` so the config fallback applies instead of boolean casting to false
        override: undefined,
        label: undefined,
        tickClass: undefined,
        tickHiddenClass: undefined,
        tickLabelClass: undefined,
    },
);

defineSlots<{
    /** Override tick content, default is label prop */
    default?(): void;
}>();

const rootRef = useTemplateRef("rootElement");

/** inject functionalities and data from the parent component */
const { parent } = useProviderChild<SliderComponent>(rootRef, {
    register: false,
});

const position = computed(() => {
    const pos =
        ((props.value - parent.value.min) /
            (parent.value.max - parent.value.min)) *
        100;
    return pos >= 0 && pos <= 100 ? pos : 0;
});

const hidden = computed(
    () => props.value === parent.value.min || props.value === parent.value.max,
);

const tickStyle = computed(() => ({ left: position.value + "%" }));

const isBefore = computed(() => parent.value.valueStart > props.value);
const isAfter = computed(() => parent.value.valueEnd < props.value);

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["tickClass", "o-slider__tick"],
    ["tickHiddenClass", "o-slider__tick--hidden", null, hidden],
    ["tickBeforeClass", "o-slider__tick--before", null, isBefore],
    ["tickAfterClass", "o-slider__tick--after", null, isAfter],
);

const tickLabelClasses = defineClasses([
    "tickLabelClass",
    "o-slider__tick-label",
]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div
        ref="rootElement"
        data-oruga="slider-tick"
        :class="rootClasses"
        :style="tickStyle"
        :data-value="value"
        aria-hidden="true">
        <span v-if="$slots.default || label" :class="tickLabelClasses">
            <!--
                @slot Override tick content, default is label prop
             -->
            <slot> {{ label }} </slot>
        </span>
    </div>
</template>
