<script setup lang="ts">
import { computed } from "vue";

import { defineClasses, useProviderChild } from "@/composables";

import type { CarouselComponent } from "./types";
import type { CarouselItemProps } from "./props";

/**
 * A Slideshow item used by the carousel.
 * @displayName Carousel Item
 */
defineOptions({
    isOruga: true,
    name: "OCarouselItem",
    configField: "carousel",
});

const props = withDefaults(defineProps<CarouselItemProps>(), {
    override: undefined,
    clickable: false,
});

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<CarouselComponent>();

const isActive = computed(() => parent.value.activeIndex === item.value.index);

const itemStyle = computed(() => ({ width: `${parent.value.itemWidth}px` }));

function onClick(event: Event): void {
    if (isActive.value) parent.value.onClick(event);
    if (props.clickable) parent.value.setActive(item.value.index);
}

// --- Computed Component Classes ---

const itemClasses = defineClasses(
    ["itemClass", "o-carousel__item"],
    ["itemActiveClass", "o-carousel__item--active", null, isActive],
    [
        "itemClickableClass",
        "o-carousel__item--clickable",
        null,
        computed(() => props.clickable),
    ],
);
</script>

<template>
    <div
        :id="`carouselpanel-${item.identifier}`"
        data-oruga="carousel-item"
        :data-id="`carousel-${item.identifier}`"
        :class="itemClasses"
        :style="itemStyle"
        :role="parent.indicators ? 'tabpanel' : 'group'"
        :aria-labelledby="`carousel-${item.identifier}`"
        aria-roledescription="slide"
        :aria-label="`${item.index + 1} of ${parent.total}`"
        draggable="true"
        @click="onClick"
        @keydown.enter="onClick"
        @keydown.space="onClick"
        @dragstart="parent.onDrag"
        @touchstart="parent.onDrag">
        <!--
            @slot Default content
        -->
        <slot />
    </div>
</template>
