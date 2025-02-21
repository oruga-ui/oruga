<script setup lang="ts">
import {
    computed,
    watch,
    onBeforeUnmount,
    onMounted,
    ref,
    nextTick,
    readonly,
    toRaw,
    useTemplateRef,
    triggerRef,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { sign, mod, bound, isDefined } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    useProviderParent,
    type ProviderItem,
} from "@/composables";

import type { CarouselComponent } from "./types";
import type { ClassBind } from "@/types";
import type { CarouselProps } from "./props";

/**
 * A Slideshow for cycling images in confined spaces.
 * @displayName Carousel
 * @requires ./CarouselItem.vue
 * @style _carousel.scss
 */
defineOptions({
    isOruga: true,
    name: "OCarousel",
    configField: "carousel",
});

const props = withDefaults(defineProps<CarouselProps>(), {
    override: undefined,
    modelValue: 0,
    dragable: true,
    autoplay: false,
    interval: () => getDefault("carousel.interval", 3500),
    pauseHover: false,
    repeat: false,
    overlay: false,
    indicators: true,
    indicatorInside: false,
    indicatorPosition: () => getDefault("carousel.indicatorPosition", "bottom"),
    indicatorStyle: () => getDefault("carousel.indicatorStyle", "dots"),
    itemsToShow: () => getDefault("carousel.itemsToShow", 1),
    itemsToList: () => getDefault("carousel.itemsToList", 1),
    arrows: () => getDefault("carousel.arrows", true),
    arrowsHover: () => getDefault("carousel.arrowsHover", true),
    iconPack: () => getDefault("carousel.iconPack"),
    iconSize: () => getDefault("carousel.iconSize"),
    iconPrev: () => getDefault("carousel.iconPrev", "chevron-left"),
    iconNext: () => getDefault("carousel.iconNext", "chevron-right"),
    iconAutoplayPause: () => getDefault("carousel.iconAutoplayPause", "pause"),
    iconAutoplayResume: () => getDefault("carousel.iconAutoplayResume", "play"),
    breakpoints: () => ({}),
    ariaAutoplayPauseLabel: () =>
        getDefault(
            "carousel.ariaAutoplayPauseLabel",
            "Stop Automatic Slide Show",
        ),
    ariaAutoplayResumeLabel: () =>
        getDefault(
            "carousel.ariaAutoplayResumeLabel",
            "Start Automatic Slide Show",
        ),
    ariaNextLabel: () => getDefault("carousel.ariaNextLabel", "Next Slide"),
    ariaPreviousLabel: () =>
        getDefault("carousel.ariaPreviousLabel", "Previous Slide"),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {number} updated modelValue prop
     */
    "update:model-value": [value: number];
    /**
     * on carousel slide change event
     * @param value {number} active index
     */
    change: [value: number];
    /**
     * on item click event
     * @param event {event} native event
     */
    click: [event: Event];
}>();

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
const provideData = computed<CarouselComponent>(() => ({
    activeIndex: activeIndex.value,
    indicators: props.indicators,
    total: total.value,
    itemWidth: itemWidth.value,
    onDrag: onDragStart,
    onClick: (event: Event): void => emits("click", event),
    setActive: (index: number): void => switchTo(index),
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent({ rootRef, data: provideData });

/** The real index of the active item */
const activeIndex = defineModel<number>({ default: 0 });

const total = computed(() => childItems.value.length);

const indicatorItems = computed(() =>
    childItems.value.filter(
        (el, i) => mod(i, settings.value.itemsToList) === 0,
    ),
);

let resizeObserver: ResizeObserver | undefined;
if (isClient && window.ResizeObserver) {
    resizeObserver = new window.ResizeObserver(onRefresh);
}

/** watch specific props which need to refresh the component */
watch(
    [
        () => props.itemsToList,
        () => props.itemsToShow,
        () => props.arrowsHover,
        () => props.repeat,
    ],
    () => onRefresh(),
);

const windowWidth = ref(0);

function onRefresh(): void {
    activeIndex.value = 0;
    // set HTML element with
    windowWidth.value = window.innerWidth;
    // trigger re creation of settings based on props
    nextTick(() => triggerRef(settings));
}

onMounted(() => {
    if (isClient) {
        if (window.ResizeObserver && resizeObserver && rootRef.value)
            resizeObserver.observe(rootRef.value);

        // set HTML element with
        windowWidth.value = window.innerWidth;

        // a prefers-reduced-motion user setting must always override autoplay
        const hasReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        if (!hasReducedMotion?.matches) startTimer();
    }
});

onBeforeUnmount(() => {
    if (isClient) {
        if (window.ResizeObserver && resizeObserver)
            resizeObserver.disconnect();

        onDragEnd();
        pauseTimer();
    }
});

const settings = computed<typeof props>(() => {
    const breakpoints = Object.keys(props.breakpoints)
        .map(Number)
        .sort((a, b) => b - a);

    const breakpoint = breakpoints.find(
        (breakpoint) => windowWidth.value >= breakpoint,
    );

    const settings = toRaw(
        breakpoint ? { ...props, ...props.breakpoints[breakpoint] } : props,
    );

    // prevent empty values
    if (!settings.itemsToList) settings.itemsToList = 1;
    if (!settings.itemsToShow) settings.itemsToShow = 1;
    return readonly(settings);
});

const itemWidth = computed(() => {
    // Ensure component is mounted
    if (!windowWidth.value || !rootRef.value) return 0;

    const rect = rootRef.value.getBoundingClientRect();
    return rect.width / settings.value.itemsToShow;
});

// #region --- Switch Events ---

const hasArrows = computed(
    () =>
        (settings.value.arrowsHover && isHovered.value) ||
        !settings.value.arrowsHover,
);

const hasPrev = computed(() => settings.value.repeat || activeIndex.value > 0);

function onPrev(): void {
    switchTo(activeIndex.value - settings.value.itemsToList);
}

const hasNext = computed(
    () =>
        settings.value.repeat ||
        activeIndex.value < total.value - settings.value.itemsToList,
);

function onNext(): void {
    switchTo(activeIndex.value + settings.value.itemsToList);
}

/** Go to the first viable item */
function onHomePressed(): void {
    switchTo(0);
}

/** Go to the last viable item */
function onEndPressed(): void {
    switchTo(total.value - settings.value.itemsToList);
}

/**
 * Show the slide by index
 * @param index the real index of the slide
 */
function switchTo(index: number): void {
    if (settings.value.repeat) index = mod(index, total.value);
    index = bound(index, 0, total.value - 1);

    activeIndex.value = index;
    emits("change", index);
}

/** Set focus on a tab item. */
function onChange(item: ProviderItem): void {
    switchTo(item.index);
}

// #endregion --- Switch Events ---

// #region --- Autoplay Feature ---

const isHovered = ref(false);
let timer: NodeJS.Timeout | undefined;
/** deactive autoplay feature */
const isAutoplayPaused = ref(false);

function onMouseEnter(): void {
    isHovered.value = true;
    if (props.autoplay && props.pauseHover) pauseTimer();
}

function onMouseLeave(): void {
    isHovered.value = false;
    if (props.autoplay && props.pauseHover) startTimer();
}

/** When autoplay is changed, start or pause timer accordingly */
watch(
    () => props.autoplay,
    (status) => {
        if (status) startTimer();
        else pauseTimer();
    },
);

/** Since the timer can get paused at the end, if repeat is changed we need to restart it */
watch(
    () => props.repeat,
    (status) => {
        if (status) startTimer();
    },
);

function onToggleAutoplay(): void {
    if (!isAutoplayPaused.value) {
        isAutoplayPaused.value = true;
        pauseTimer();
    } else {
        isAutoplayPaused.value = false;
        startTimer();
    }
}

function startTimer(): void {
    if (!props.autoplay || timer) return;
    if (isAutoplayPaused.value) return;
    timer = setInterval(() => {
        if (!props.repeat && !hasNext.value) pauseTimer();
        else onNext();
    }, props.interval);
}

function pauseTimer(): void {
    if (timer) {
        clearInterval(timer);
        timer = undefined;
    }
}

// #endregion --- Autoplay Feature ---

// #region --- Drag & Drop Feature ---

const dragX = ref();
const delta = ref(0);

const isDragging = computed(() => isDefined(dragX.value));

const translation = computed(
    () =>
        -bound(
            delta.value + activeIndex.value * itemWidth.value,
            0,
            (childItems.value.length - settings.value.itemsToShow) *
                itemWidth.value,
        ),
);

/** handle drag event */
function onDragStart(event: TouchEvent | MouseEvent): void {
    if (
        isDragging.value ||
        !settings.value.dragable ||
        ((event as MouseEvent).button !== 0 && event.type !== "touchstart")
    )
        return;

    delta.value = 0;
    // get dragging start x value
    dragX.value = !!(event as TouchEvent).touches
        ? (event as TouchEvent).touches[0].clientX
        : (event as MouseEvent).clientX;

    // stop timer when dragging starts
    pauseTimer();
}

function onDragOver(event: TouchEvent | MouseEvent): void {
    if (!isDragging.value) return;

    const dragEndX = !!(event as TouchEvent).touches
        ? (
              (event as TouchEvent).changedTouches[0] ||
              (event as TouchEvent).touches[0]
          ).clientX
        : (event as MouseEvent).clientX;
    // calc transition delta value
    delta.value = dragX.value - dragEndX;
}

function onDragEnd(): void {
    if (!isDragging.value) return;
    // switch slide
    const signCheck = sign(delta.value);
    const results = Math.round(Math.abs(delta.value / itemWidth.value) + 0.15); // Hack
    switchTo(activeIndex.value + signCheck * results);

    // cleanup
    delta.value = 0;
    dragX.value = undefined;

    // atart timer after dragging ends
    startTimer();
}

// #endregion --- Drag & Drop Feature ---

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-car"],
    ["overlayClass", "o-car__overlay", null, computed(() => props.overlay)],
);

const wrapperClasses = defineClasses(["wrapperClass", "o-car__wrapper"]);

const itemsClasses = defineClasses(
    ["itemsClass", "o-car__items"],
    ["itemsDraggingClass", "o-car__items--dragging", null, isDragging],
);

const prevIconClasses = defineClasses(
    ["iconClass", "o-car__icon"],
    ["iconPrevClass", "o-car__icon-prev"],
);

const nextIconClasses = defineClasses(
    ["iconClass", "o-car__icon"],
    ["iconNextClass", "o-car__icon-next"],
);

const autoplayIconClasses = defineClasses(
    ["iconClass", "o-car__icon"],
    ["iconAutoplayClass", "o-car__icon-autoplay"],
);

const indicatorsClasses = defineClasses(
    ["indicatorsClass", "o-car__indicators"],
    [
        "indicatorsInsideClass",
        "o-car__indicators--inside",
        null,
        computed(() => !!props.indicatorInside),
    ],
    [
        "indicatorsInsidePositionClass",
        "o-car__indicators--inside--",
        computed(() => props.indicatorPosition),
        computed(() => props.indicatorInside && !!props.indicatorPosition),
    ],
);

const indicatorClasses = defineClasses(["indicatorClass", "o-car__indicator"]);

const indicatorItemClasses = defineClasses(
    ["indicatorItemClass", "o-car__indicator__item"],
    [
        "indicatorItemStyleClass",
        "o-car__indicator__item--",
        props.indicatorStyle,
        computed(() => !!props.indicatorStyle),
    ],
);

const indicatorItemActiveClasses = defineClasses([
    "indicatorItemActiveClass",
    "o-car__indicator__item--active",
]);

function indicatorItemAppliedClasses(item: ProviderItem): ClassBind[] {
    const activeClasses =
        activeIndex.value === item.index
            ? indicatorItemActiveClasses.value
            : [];

    return [...indicatorItemClasses.value, ...activeClasses];
}
</script>

<template>
    <div
        ref="rootElement"
        :class="rootClasses"
        data-oruga="carousel"
        role="region"
        aria-roledescription="carousel"
        @mouseover="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focusin="onMouseEnter"
        @focusout="onMouseLeave"
        @keydown.left="onPrev"
        @keydown.right="onNext"
        @keydown.home.prevent="onHomePressed"
        @keydown.end.prevent="onEndPressed">
        <div :class="wrapperClasses">
            <!--
                @slot Override the pause/resume button
                @binding {boolean} autoplay if autoplay is active
                @binding {(): void} toggle toggle autoplay
            -->
            <slot
                name="pause"
                :autoplay="!isAutoplayPaused"
                :toggle="onToggleAutoplay">
                <template v-if="autoplay">
                    <o-icon
                        :class="autoplayIconClasses"
                        :pack="iconPack"
                        :icon="
                            !isAutoplayPaused
                                ? iconAutoplayPause
                                : iconAutoplayResume
                        "
                        :size="iconSize"
                        both
                        role="button"
                        tabindex="0"
                        :aria-label="
                            !isAutoplayPaused
                                ? ariaAutoplayPauseLabel
                                : ariaAutoplayResumeLabel
                        "
                        @click="onToggleAutoplay"
                        @keydown.enter.prevent="onToggleAutoplay"
                        @keydown.space.prevent="onToggleAutoplay" />
                </template>
            </slot>

            <!--
                @slot Override the arrows
                @binding {boolean} has-prev has prev arrow button 
                @binding {boolean} has-next has next arrow button 
                @binding {(): void} prev switch to prev item function
                @binding {(): void} next switch to next item function
            -->
            <slot
                name="arrow"
                :has-prev="hasPrev"
                :prev="onPrev"
                :has-next="hasNext"
                :next="onNext">
                <template v-if="arrows">
                    <o-icon
                        v-show="hasArrows && hasPrev"
                        :class="prevIconClasses"
                        :pack="iconPack"
                        :icon="iconPrev"
                        :size="iconSize"
                        both
                        role="button"
                        tabindex="0"
                        :aria-label="ariaPreviousLabel"
                        @click="onPrev"
                        @keydown.enter.prevent="onPrev"
                        @keydown.space.prevent="onPrev" />
                    <o-icon
                        v-show="hasArrows && hasNext"
                        :class="nextIconClasses"
                        :pack="iconPack"
                        :icon="iconNext"
                        :size="iconSize"
                        both
                        role="button"
                        tabindex="0"
                        :aria-label="ariaNextLabel"
                        @click="onNext"
                        @keydown.enter.prevent="onNext"
                        @keydown.space.prevent="onNext" />
                </template>
            </slot>

            <div
                :class="itemsClasses"
                :style="'transform:translateX(' + translation + 'px)'"
                aria-roledescription="carousel-slide"
                aria-atomic="false"
                :aria-live="autoplay ? 'off' : 'polite'"
                @dragend="onDragEnd"
                @dragover="onDragOver"
                @touchmove="onDragOver"
                @touchend="onDragEnd">
                <!--
                    @slot Display carousel item
                -->
                <slot />
            </div>
        </div>

        <!--
            @slot Override the indicators
            @binding {number} active active index 
            @binding {(idx: number): void} switch-to switch to item function
        -->
        <slot name="indicators" :active="activeIndex" :switch-to="switchTo">
            <div
                v-if="indicators"
                :class="indicatorsClasses"
                role="tablist"
                aria-label="Slides">
                <div
                    v-for="item in indicatorItems"
                    :id="`carousel-${item.identifier}`"
                    :key="item.index"
                    :class="indicatorClasses"
                    role="tab"
                    :tabindex="modelValue === item.index ? '0' : '-1'"
                    :aria-label="`Slide ${item.identifier}`"
                    :aria-controls="`carouselpanel-${item.identifier}`"
                    :aria-selected="modelValue === item.index"
                    @click="onChange(item)"
                    @keypress.enter="onChange(item)">
                    <!--
                            @slot Override the indicator elements
                            @binding {index} index indicator index 
                        -->
                    <slot :index="item.index" name="indicator">
                        <span :class="indicatorItemAppliedClasses(item)" />
                    </slot>
                </div>
            </div>
        </slot>

        <template v-if="overlay">
            <!-- @slot Overlay element -->
            <slot name="overlay" />
        </template>
    </div>
</template>
