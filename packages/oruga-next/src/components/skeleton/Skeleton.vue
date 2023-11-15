<script setup lang="ts">
import { computed, type PropType } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { useComputedClass, useClassProps } from "@/composables";
import { toCssDimension } from "../../utils/helpers";

/**
 * A placeholder for content to load
 * @displayName Skeleton
 * @style _skeleton.scss
 */
defineOptions({
    isOruga: true,
    name: "OSkeleton",
    configField: "skeleton",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Show or hide loader	 */
    active: { type: Boolean, default: true },
    /** Show a loading animation */
    animated: {
        type: Boolean,
        default: () => getOption("skeleton.animated", true),
    },
    /** Custom width */
    width: { type: [Number, String], default: undefined },
    /** Custom height */
    height: { type: [Number, String], default: undefined },
    /** Show a circle shape */
    circle: { type: Boolean, default: false },
    /** Enable rounded style */
    rounded: {
        type: Boolean,
        default: () => getOption("skeleton.rounded", true),
    },
    /** Number of shapes to display */
    count: { type: Number, default: 1 },
    /**
     * Size of skeleton
     * @values small, medium, large
     */
    size: { type: String, default: undefined },
    /**
     * Skeleton position in relation to the element
     * @values left, centered, right
     */
    position: {
        type: String as PropType<"left" | "centered" | "right">,
        default: "left",
        validator: (value: string) =>
            ["left", "centered", "right"].indexOf(value) > -1,
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "animationClass",
        "positionClass",
        "itemClass",
        "itemRoundedClass",
        "sizeClass",
    ]),
});

const itemStyle = computed(() => ({
    height: toCssDimension(props.height),
    width: toCssDimension(props.width),
    borderRadius: props.circle ? "50%" : null,
}));

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-sklt"),
    {
        [useComputedClass("positionClass", "o-sklt--", props.position)]:
            props.position,
    },
]);

const itemClasses = computed(() => [
    useComputedClass("itemClass", "o-sklt__item"),
    {
        [useComputedClass("itemRoundedClass", "o-sklt__item--rounded")]:
            props.rounded,
    },
    {
        [useComputedClass("animationClass", "o-sklt__item--animated")]:
            props.animated,
    },
    {
        [useComputedClass("sizeClass", "o-sklt__item--", props.size)]:
            props.size,
    },
]);
</script>

<template>
    <div v-if="active" data-oruga="skeleton" :class="rootClasses">
        <div
            v-for="i in count"
            :key="i"
            :class="itemClasses"
            :style="itemStyle" />
    </div>
</template>
