<script setup lang="ts">
import { computed, type ComputedRef, type PropType } from "vue";
import { useComputedClass, useProviderChild } from "@/composables";

import { baseComponentProps } from "@/utils/SharedProps";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Value of single tick */
    value: { type: Number, required: true },
    /** Tick label */
    label: { type: String, default: undefined },
    tickClass: {
        type: [String, Function, Array] as PropType<ComponentClass>,
        default: undefined,
    },
    tickHiddenClass: {
        type: [String, Function, Array] as PropType<ComponentClass>,
        default: undefined,
    },
    tickLabelClass: {
        type: [String, Function, Array] as PropType<ComponentClass>,
        default: undefined,
    },
});

// Inject functionalities and data from the parent carousel component
const { parent } = useProviderChild<ComputedRef<SliderComponent>>();

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

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("tickClass", "o-slide__tick"),
    {
        [useComputedClass("tickHiddenClass", "o-slide__tick--hidden")]:
            hidden.value,
    },
]);

const tickLabelClasses = computed(() => [
    useComputedClass("tickLabelClass", "o-slide__tick-label"),
]);
</script>

<template>
    <div :class="rootClasses" :style="tickStyle" data-oruga="slider-tick">
        <span v-if="$slots.default" :class="tickLabelClasses">
            <!-- 
                @slot Override tick content, default is label prop
             -->
            <slot> {{ label }} </slot>
        </span>
    </div>
</template>
