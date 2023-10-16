<script setup lang="ts">
import {
    computed,
    watch,
    onBeforeUnmount,
    onMounted,
    ref,
    nextTick,
    type PropType,
    readonly,
    toRaw,
} from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "../../utils/config";
import { sign, mod, bound, isDefined } from "../../utils/helpers";
import {
    useComputedClass,
    useClassProps,
    useVModelBinding,
    useEventListener,
    useProviderParent,
} from "@/composables";
import type { BindProp } from "@/types";
import { isClient } from "@/utils/ssr";

/**
 * A Slideshow for cycling images in confined spaces
 * @displayName Carousel
 * @requires ./CarouselItem.vue
 * @style _carousel.scss
 */
defineOptions({
    isOruga: true,
    name: "OCarousel",
    configField: "carousel",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: Number, default: 0 },
    /** Enable drag mode */
    dragable: { type: Boolean, default: true },
    /** Timer interval for `autoplay` */
    interval: {
        type: Number,
        default: () => getOption("carousel.interval", 3500),
    },
    /** Move item automaticalls after `interval` */
    autoplay: { type: Boolean, default: false },
    /** Pause autoplay on hover */
    pauseHover: { type: Boolean, default: false },
    /** Repeat from the beginning after reaching the end */
    repeat: { type: Boolean, default: false },
    /** Show an overlay */
    overlay: { type: Boolean, default: false },
    /** Enable indicators */
    indicators: { type: Boolean, default: true },
    /** Place indicators inside the carousel */
    indicatorInside: { type: Boolean, default: false },
    /**
     * Indicator interaction mode
     * @values click, hover
     */
    indicatorMode: {
        type: String,
        default: "click",
        validator: (value: string) => ["click", "hover"].indexOf(value) >= 0,
    },
    /** Position of the indicator - depends on used theme */
    indicatorPosition: {
        type: String,
        default: () => getOption("carousel.indicatorPosition", "bottom"),
    },
    /** Style of the indicator - depends on used theme */
    indicatorStyle: {
        type: String,
        default: () => getOption("carousel.indicatorStyle", "dots"),
    },
    /** Number of items to show at once*/
    itemsToShow: {
        type: Number,
        default: () => getOption("carousel.itemsToShow", 1),
    },
    /** Number of items to switch at once */
    itemsToList: {
        type: Number,
        default: () => getOption("carousel.itemsToList", 1),
    },
    /** Show next / prev arrows */
    arrows: {
        type: Boolean,
        default: () => getOption("carousel.arrows", true),
    },
    /** Show next / prev arrows only on hover */
    arrowsHover: {
        type: Boolean,
        default: () => getOption("carousel.arrowHover", true),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("carousel.iconPack", undefined),
    },
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize: {
        type: String,
        default: () => getOption("carousel.iconSize", undefined),
    },
    /** Icon name for previous icon */
    iconPrev: {
        type: String,
        default: () => getOption("carousel.iconPrev", "chevron-left"),
    },
    /** Icon name for next icon */
    iconNext: {
        type: String,
        default: () => getOption("carousel.iconNext", "chevron-right"),
    },
    /** Define these props for different screen sizes */
    breakpoints: {
        type: Object as PropType<Record<number, any>>,
        default: () => ({}),
    },
    ...useClassProps([
        "rootClass",
        "overlayClass",
        "sceneClass",
        "itemsClass",
        "itemsDraggingClass",
        "arrowIconClass",
        "arrowIconPrevClass",
        "arrowIconNextClass",
        "indicatorsClass",
        "indicatorsInsideClass",
        "indicatorsInsidePositionClass",
        "indicatorItemClass",
        "indicatorItemActiveClass",
        "indicatorItemStyleClass",
    ]),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {number} updated modelValue prop
     */
    (e: "update:modelValue", value: number): void;
    /**
     * on carousel scroll event
     * @param value {number} scroll index
     */
    (e: "scroll", value: number): void;
    /**
     * on item click event
     * @param event {event} native event
     */
    (e: "click", event: Event): void;
}>();

const rootRef = ref();

function restartTimer(): void {
    pauseTimer();
    startTimer();
}

const provideData = computed(() => ({
    restartTimer,
    itemWidth: itemWidth.value,
    activeIndex: scrollIndex.value,
    onClick: (event: MouseEvent): void => emits("click", event),
    setActive: (index: number): void => switchTo(index),
}));

/** Provide functionalities and data to child item components */
const { childItems } = useProviderParent(rootRef, provideData);

const activeIndex = useVModelBinding<number>(props, emits);
const scrollIndex = ref(props.modelValue);

const observer = ref(null);
const windowWidth = ref(0);

const refresh_ = ref(0);

/** When v-model is changed switch to the new active item. */
watch(
    () => props.modelValue,
    (value) => {
        if (value <= childItems.value.length - 1)
            switchTo(value * settings.value.itemsToList, true);
    },
);

watch([() => props.itemsToList, () => props.itemsToShow], () => onRefresh());

onMounted(() => {
    if (isClient) {
        if (window.ResizeObserver) {
            observer.value = new window.ResizeObserver(onRefresh);
            observer.value.observe(rootRef.value);
        }
        onResized();
        startTimer();
    }
});

onBeforeUnmount(() => {
    if (isClient) {
        if (window.ResizeObserver) observer.value.disconnect();
        dragEnd();
        pauseTimer();
    }
});

// add dom event handler
if (isClient) {
    useEventListener("resize", onResized, window);
    useEventListener("animationend", onRefresh);
    useEventListener("transitionend", onRefresh);
    useEventListener("transitionstart", onRefresh);
}

function onResized(): void {
    windowWidth.value = window.innerWidth;
}

function onRefresh(): void {
    nextTick(() => refresh_.value++);
}

const settings = computed<typeof props>(() => {
    const breakpoints = Object.keys(props.breakpoints)
        .map(Number)
        .sort((a, b) => b - a);

    const breakpoint = breakpoints.filter(
        (breakpoint) => windowWidth.value >= breakpoint,
    )[0];

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
    if (!windowWidth.value) return 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const r = refresh_.value; // We force the computed property to refresh if this ref is changed

    const rect = rootRef.value.getBoundingClientRect();
    return rect.width / settings.value.itemsToShow;
});

const translation = computed(
    () =>
        -bound(
            delta.value + scrollIndex.value * itemWidth.value,
            0,
            (childItems.value.length - settings.value.itemsToShow) *
                itemWidth.value,
        ),
);

const total = computed(() => childItems.value.length);

const indicatorCount = computed(
    () => Math.ceil(total.value / settings.value.itemsToList) + 1,
);

const indicatorIndex = computed(() =>
    Math.ceil(scrollIndex.value / settings.value.itemsToList),
);

const hasArrows = computed(
    () =>
        (settings.value.arrowsHover && isHovered.value) ||
        !settings.value.arrowsHover,
);

const hasPrev = computed(
    () => (settings.value.repeat || scrollIndex.value > 0) && hasArrows.value,
);

function onPrev(): void {
    switchTo(scrollIndex.value - settings.value.itemsToList);
}

const hasNext = computed(
    () =>
        (settings.value.repeat || scrollIndex.value < total.value) &&
        hasArrows.value,
);

function onNext(): void {
    switchTo(scrollIndex.value + settings.value.itemsToList);
}

function switchTo(index: number, onlyMove?: boolean): void {
    if (settings.value.repeat) index = mod(index, total.value + 1);

    index = bound(index, 0, total.value);
    scrollIndex.value = index;
    emits("scroll", indicatorIndex.value);

    if (!onlyMove)
        activeIndex.value = Math.ceil(index / settings.value.itemsToList);
}

function onModeChange(trigger: string, index: number): void {
    if (props.indicatorMode === trigger)
        switchTo(index * settings.value.itemsToList);
}

// --- Autoplay Feature ---

const isHovered = ref(false);
const isPaused = ref(false);
const timer = ref(null);

function onMouseEnter(): void {
    isHovered.value = true;
    checkPause();
}

function onMouseLeave(): void {
    isHovered.value = false;
    startTimer();
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

function startTimer(): void {
    if (!props.autoplay || timer.value) return;
    isPaused.value = false;
    timer.value = setInterval(() => {
        if (!props.repeat && activeIndex.value >= childItems.value.length - 1)
            pauseTimer();
        else onNext();
    }, props.interval);
}

function pauseTimer(): void {
    isPaused.value = true;
    if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
    }
}

function checkPause(): void {
    if (props.pauseHover && props.autoplay) pauseTimer();
}

// --- Drag & Drop Feature ---

const isTouch = ref(false);
const dragX = ref();
const hold = ref(0);
const delta = ref(0);

const isDragging = computed(() => isDefined(dragX.value));

/** handle drag event */
function onDragStart(event: TouchEvent | MouseEvent): void {
    if (
        isDragging.value ||
        !settings.value.dragable ||
        ((event as MouseEvent).button !== 0 && event.type !== "touchstart")
    )
        return;
    hold.value = Date.now();
    isTouch.value = !!(event as TouchEvent).touches;
    dragX.value = isTouch.value
        ? (event as TouchEvent).touches[0].clientX
        : (event as MouseEvent).clientX;
    if (isTouch.value) {
        pauseTimer();
    }
    window.addEventListener(
        isTouch.value ? "touchmove" : "mousemove",
        dragMove,
    );
    window.addEventListener(isTouch.value ? "touchend" : "mouseup", dragEnd);
}

function dragMove(event: TouchEvent | MouseEvent): void {
    if (!isDragging.value) return;
    const dragEndX = (event as TouchEvent).touches
        ? (
              (event as TouchEvent).changedTouches[0] ||
              (event as TouchEvent).touches[0]
          ).clientX
        : (event as MouseEvent).clientX;
    delta.value = dragX.value - dragEndX;
    // prevent event if not touch event
    if (!(event as TouchEvent).touches) event.preventDefault();
}

function dragEnd(event?: TouchEvent | MouseEvent): void {
    if (!isDragging.value && !hold.value) return;
    if (hold.value) {
        const signCheck = sign(delta.value);
        const results = Math.round(
            Math.abs(delta.value / itemWidth.value) + 0.15,
        ); // Hack
        switchTo(scrollIndex.value + signCheck * results);
    }
    delta.value = 0;
    dragX.value = undefined;
    if ((event as TouchEvent)?.touches) startTimer();

    window.removeEventListener(
        isTouch.value ? "touchmove" : "mousemove",
        dragMove,
    );
    window.removeEventListener(isTouch.value ? "touchend" : "mouseup", dragEnd);
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-car"),
    {
        [useComputedClass("overlayClass", "o-car__overlay")]: props.overlay,
    },
]);

const sceneClasses = computed(() => [
    useComputedClass("sceneClass", "o-car__scene"),
]);

const itemsClasses = computed(() => [
    useComputedClass("itemsClass", "o-car__items"),
    {
        [useComputedClass("itemsDraggingClass", "o-car__items--dragging")]:
            isDragging.value,
    },
]);

const arrowIconClasses = computed(() => [
    useComputedClass("arrowIconClass", "o-car__arrow__icon"),
]);

const arrowIconPrevClasses = computed(() => [
    ...arrowIconClasses.value,
    useComputedClass("arrowIconPrevClass", "o-car__arrow__icon-prev"),
]);

const arrowIconNextClasses = computed(() => [
    ...arrowIconClasses.value,
    useComputedClass("arrowIconNextClass", "o-car__arrow__icon-next"),
]);

function indicatorItemClasses(index): BindProp {
    return [
        useComputedClass("indicatorItemClass", "o-car__indicator__item"),
        {
            [useComputedClass(
                "indicatorItemActiveClass",
                "o-car__indicator__item--active",
            )]: indicatorIndex.value === index,
        },
        {
            [useComputedClass(
                "indicatorItemStyleClass",
                "o-car__indicator__item--",
                props.indicatorStyle,
            )]: props.indicatorStyle,
        },
    ];
}

const indicatorsClasses = computed(() => [
    useComputedClass("indicatorsClass", "o-car__indicators"),
    {
        [useComputedClass(
            "indicatorsInsideClass",
            "o-car__indicators--inside",
        )]: props.indicatorInside,
    },
    {
        [useComputedClass(
            "indicatorsInsidePositionClass",
            "o-car__indicators--inside--",
            props.indicatorPosition,
        )]: props.indicatorInside && props.indicatorPosition,
    },
]);

const indicatorClasses = computed(() => [
    useComputedClass("indicatorClass", "o-car__indicator"),
]);
</script>

<template>
    <div
        ref="rootRef"
        :class="rootClasses"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <div :class="sceneClasses">
            <div
                :class="itemsClasses"
                :style="'transform:translateX(' + translation + 'px)'"
                @mousedown="onDragStart"
                @touchstart="onDragStart">
                <!--
                    @slot display carousel item
                -->
                <slot />
            </div>
            <!--
                @slot Arrows section
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
                        v-show="hasPrev"
                        :class="arrowIconPrevClasses"
                        :pack="iconPack"
                        :icon="iconPrev"
                        :size="iconSize"
                        both
                        @click="onPrev" />
                    <o-icon
                        v-show="hasNext"
                        :class="arrowIconNextClasses"
                        :pack="iconPack"
                        :icon="iconNext"
                        :size="iconSize"
                        both
                        @click="onNext" />
                </template>
            </slot>
        </div>

        <!--
            @slot Indicators section
            @binding {number} active active index 
            @binding {(idx: number): void} switch-to switch to item function
            @binding {number} indicator-index current indicator index
        -->
        <slot
            :active="activeIndex"
            :switch-to="switchTo"
            :indicator-index="indicatorIndex"
            name="indicators">
            <template v-if="childItems.length">
                <div v-if="indicators" :class="indicatorsClasses">
                    <a
                        v-for="(_, index) in indicatorCount"
                        :key="index"
                        :class="indicatorClasses"
                        @mouseover="onModeChange('hover', index)"
                        @click="onModeChange('click', index)">
                        <!--
                            @slot Indicator element
                            @binding {index} index indicator index 
                        -->
                        <slot :index="index" name="indicator">
                            <span :class="indicatorItemClasses(index)" />
                        </slot>
                    </a>
                </div>
            </template>
        </slot>
        <template v-if="overlay">
            <!-- @slot Overlay element -->
            <slot name="overlay" />
        </template>
    </div>
</template>
