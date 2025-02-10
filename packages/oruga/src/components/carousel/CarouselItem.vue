<script setup lang="ts">
import { computed } from "vue";

import { getDefault } from "@/utils/config";
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
    ariaRole: () => getDefault("carousel.ariaRole", "option"),
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
        v-if="parent"
        :class="itemClasses"
        :style="itemStyle"
        data-oruga="carousel-item"
        :data-id="`carousel-${item.identifier}`"
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
