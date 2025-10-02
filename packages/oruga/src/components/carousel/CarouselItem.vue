<script setup lang="ts" generic="T">
import { computed, useTemplateRef } from "vue";

import { defineClasses, useProviderChild } from "@/composables";

import type { CarouselComponent, CarouselItemComponent } from "./types";
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

const props = withDefaults(defineProps<CarouselItemProps<T>>(), {
    override: undefined,
    value: undefined,
    clickable: false,
    title: undefined,
    subtitle: undefined,
    image: undefined,
    imageAlt: undefined,
});

const emits = defineEmits<{
    /**
     * onclick event
     * @param value {unknown} - value prop data
     * @param event {event} - native event
     */
    click: [value: T, event: Event];
    /** on tab item activate event */
    activate: [];
    /** on tab item deactivate event */
    deactivate: [];
}>();

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
const providedData = computed<CarouselItemComponent<T>>(() => ({
    getValue,
    activate,
    deactivate,
}));

/** inject functionalities and data from the parent component */
const { parent, item, itemsCount } = useProviderChild<
    CarouselComponent<T>,
    CarouselItemComponent<T>
>(rootRef, { data: providedData });

const isActive = computed(() => item.value.index === parent.value.activeIndex);

const itemStyle = computed(() => ({ width: `${parent.value.itemWidth}px` }));

/** Return the item value or the item index if no value is set. */
function getValue(): T {
    return (props.value ?? item.value.index) as T;
}

/** Click listener, select the item. */
function onClick(event: Event): void {
    if (!props.clickable) return;
    if (isActive.value) parent.value.onClick(event);
    const value = getValue();
    parent.value.setActive(value);
    emits("click", value, event);
}

/** Activate element. */
function activate(): void {
    emits("activate");
}

/** Deactivate element. */
function deactivate(): void {
    emits("deactivate");
}

// #region --- Computed Component Classes ---

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

const titleClasses = defineClasses([
    "itemTitleClass",
    "o-carousel__item-title",
]);

const subtitleClasses = defineClasses([
    "itemSubtitleClass",
    "o-carousel__item-subtitle",
]);
const imageClasses = defineClasses([
    "itemImageClass",
    "o-carousel__item-image",
]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <!-- TODO: Add native vue transition animation like steps/tabs -->
    <div
        :id="`carouselpanel-${item.identifier}`"
        ref="rootElement"
        data-oruga="carousel-item"
        :data-id="`carousel-${item.identifier}`"
        :class="itemClasses"
        :style="itemStyle"
        :role="parent.indicators ? 'tabpanel' : 'group'"
        :aria-labelledby="`carousel-${item.identifier}`"
        aria-roledescription="slide"
        :aria-label="`${item.index + 1} of ${itemsCount}`"
        draggable="true"
        @click="onClick"
        @keydown.enter="onClick"
        @keydown.space="onClick"
        @dragstart="parent.onDrag"
        @touchstart="parent.onDrag">
        <!--
            @slot Default content
        -->
        <slot>
            <div :class="imageClasses">
                <img :src="image" :alt="imageAlt" />
            </div>
            <div v-if="title" :class="titleClasses">
                {{ title }}
            </div>
            <div v-if="subtitle" :class="subtitleClasses">
                {{ subtitle }}
            </div>
        </slot>
    </div>
</template>
