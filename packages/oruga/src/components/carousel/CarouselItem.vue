<script setup lang="ts">
import { computed, type PropType, type Ref } from "vue";

import { getOption } from "@/utils/config";
import { defineClasses, useProviderChild } from "@/composables";

import type { ComponentClass } from "@/types";

/**
 * A Slideshow item used by the carousel
 * @displayName Carousel Item
 */
defineOptions({
    isOruga: true,
    name: "OCarouselItem",
    configField: "carousel",
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Make item clickable */
    clickable: { type: Boolean, default: false },
    /** Role attribute to be passed to the div wrapper for better accessibility */
    ariaRole: {
        type: String,
        default: () => getOption("carousel.ariaRole", "option"),
    },
    // class props (will not be displayed in the docs)
    /** Class of carousel item */
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of carousel item when is active */
    itemActiveClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of carousel item when is clickable */
    itemClickableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

// Inject functionalities and data from the parent carousel component
const { parent, item } = useProviderChild<Ref<any>>();

const isActive = computed(() => parent.value.activeIndex === item.value.index);

const itemStyle = computed(() => ({ width: `${parent.value.itemWidth}px` }));

function onClick(event: Event): void {
    if (isActive.value) parent.value.onClick(event);
    if (props.clickable) parent.value.setActive(item.value.index);
}

// --- Computed Component Classes ---

const itemClasses = defineClasses(
    ["itemClass", "o-car__item"],
    ["itemActiveClass", "o-car__item--active", null, isActive],
    [
        "itemClickableClass",
        "o-car__item--clickable",
        null,
        computed(() => props.clickable),
    ],
);
</script>

<template>
    <div
        :class="itemClasses"
        :style="itemStyle"
        :data-id="`carousel-${item.identifier}`"
        data-oruga="carousel-item"
        :role="ariaRole"
        aria-roledescription="item"
        :aria-selected="isActive"
        @click="onClick"
        @keypress.enter="onClick">
        <!--
            @slot Default content
        -->
        <slot />
    </div>
</template>
