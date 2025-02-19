<script setup lang="ts">
import { computed } from "vue";

import { getDefault } from "@/utils/config";
import { toCssDimension } from "@/utils/helpers";
import { defineClasses } from "@/composables";

import type { SkeletonProps } from "./props";

/**
 * A placeholder for content to load.
 * @displayName Skeleton
 * @style _skeleton.scss
 */
defineOptions({
    isOruga: true,
    name: "OSkeleton",
    configField: "skeleton",
});

const props = withDefaults(defineProps<SkeletonProps>(), {
    override: undefined,
    active: true,
    animated: () => getDefault("skeleton.animated", true),
    width: undefined,
    height: undefined,
    circle: false,
    rounded: () => getDefault("skeleton.rounded", true),
    count: 1,
    size: undefined,
    position: "left",
});

const itemStyle = computed(() => ({
    height: toCssDimension(props.height),
    width: toCssDimension(props.width),
    borderRadius: props.circle ? "50%" : undefined,
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
        "roundedClass",
        "o-sklt__item--rounded",
        null,
        computed(() => props.rounded),
    ],
    [
        "animatedClass",
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
