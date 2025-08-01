<script setup lang="ts">
import { computed, useTemplateRef, type PropType } from "vue";
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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Value of single tick */
    value: { type: Number, required: true },
    /** Tick label */
    label: { type: [String, Number], default: undefined },
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
});

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

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["tickClass", "o-slider__tick"],
    ["tickHiddenClass", "o-slider__tick--hidden", null, hidden],
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
        :style="tickStyle">
        <span v-if="$slots.default || label" :class="tickLabelClasses">
            <!-- 
                @slot Override tick content, default is label prop
             -->
            <slot> {{ label }} </slot>
        </span>
    </div>
</template>
