<script setup lang="ts">
import { computed, type PropType } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { toCssDimension } from "@/utils/helpers";
import { defineClasses } from "@/composables";

import type { ComponentClass } from "@/types";

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
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    animationClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemRoundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const itemStyle = computed(() => ({
    height: toCssDimension(props.height),
    width: toCssDimension(props.width),
    borderRadius: props.circle ? "50%" : null,
}));

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-sklt"],
    [
        "positionClass",
        "o-sklt--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
);

const itemClasses = defineClasses(
    ["itemClass", "o-sklt__item"],
    [
        "itemRoundedClass",
        "o-sklt__item--rounded",
        null,
        computed(() => props.rounded),
    ],
    [
        "animationClass",
        "o-sklt__item--animated",
        null,
        computed(() => props.animated),
    ],
    [
        "sizeClass",
        "o-sklt__item--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
);
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
