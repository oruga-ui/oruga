<script setup lang="ts" generic="T">
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
    watchEffect,
} from "vue";

import OIcon from "../icon/Icon.vue";
import OCarouselItem from "./CarouselItem.vue";

import { getDefault } from "@/utils/config";
import { sign, mod, bound, isDefined } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    useKeyedOptions,
    useProviderParent,
    type ProviderItem,
} from "@/composables";

import type { ClassBinding } from "@/types";
import type {
    CarouselItemComponent,
    CarouselComponent,
    CarouselItem,
} from "./types";
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

type ModelValue = CarouselProps<T>["modelValue"];

const props = withDefaults(defineProps<CarouselProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    options: undefined,
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
    breakpoints: undefined,
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
     * @param value {number} - updated modelValue prop
     */
    "update:model-value": [value: number];
    /**
     * on carousel slide change event
     * @param value {unknown} - new tab value
     * @param value {unknown} - old tab value
     */
    change: [newValue: ModelValue, oldValue: ModelValue];
    /**
     * on item click event
     * @param event {event} - native event
     */
    click: [event: Event];
}>();

defineSlots<{
    /** Define the carousel items here */
    default?(): void;
    /**
     * Override the pause/resume button
     * @param autoplay {boolean} - if autoplay is active
     * @param toggle {(): void} - toggle autoplay
     */
    pause?(props: { autoplay: boolean; toggle: () => void }): void;
    /**
     * Override the arrows
     * @param hasPrev {boolean} - has prev arrow button
     * @param hasNext {boolean} - has next arrow button
     * @param prev {(): void} - switch to prev item function
     * @param next {(): void} - switch to next item function
     */
    arrows?(props: {
        hasPrev: boolean;
        hasNext: boolean;
        prev: () => void;
        next: () => void;
    }): void;
    /**
     * Override the indicators
     * @param activeIndex {number} - active item index
     * @param switchTo {(idx?: number): void} - switch to item function
     */
    indicators?(props: {
        activeIndex: number;
        switchTo: (idx?: number) => void;
    }): void;
    /**
     * Override the indicator elements
     * @param index {number} - indicator index
     */
    indicator?(props: { index: number }): void;
    /** Define element to show when overlay is active */
    overlay?(): void;
}>();

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
const provideData = computed<CarouselComponent<T>>(() => ({
    activeIndex: activeItem.value?.index ?? 0,
    indicators: props.indicators,
    itemWidth: itemWidth.value,
    onDrag: onDragStart,
    onClick: (event: Event): void => emits("click", event),
    setActive,
}));

/** provide functionalities and data to child item components */
const { childItems, itemsCount } = useProviderParent<CarouselItemComponent<T>>({
    rootRef,
    data: provideData,
});

/** keyed programamtic options */
const keyedOptions = useKeyedOptions(props.options);

const indicatorItems = computed(() =>
    childItems.value.filter(
        (el, i) => mod(i, settings.value.itemsToList) === 0,
    ),
);

const resizeObserver =
    isClient && window.ResizeObserver
        ? new window.ResizeObserver(onRefresh)
        : undefined;

const windowWidth = ref(0);

onMounted(() => {
    if (!isClient) return;
    // start resize observing
    if (window.ResizeObserver && resizeObserver && rootRef.value)
        resizeObserver.observe(rootRef.value);

    // set HTML element with
    windowWidth.value = window.innerWidth;

    // a prefers-reduced-motion user setting must always override autoplay
    const hasReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    );

    // start timer when autoplay is enabled
    if (!hasReducedMotion?.matches) startTimer();
});

onBeforeUnmount(() => {
    if (!isClient) return;
    // cleanup resize observer
    if (window.ResizeObserver && resizeObserver) resizeObserver.disconnect();

    // cleanup drag event
    onDragEnd();
    // cleanup timer
    pauseTimer();
});

const settings = computed<typeof props>(() => {
    let settings;

    if (!props.breakpoints) settings = toRaw(props);
    else {
        const breakpoints = Object.keys(props.breakpoints)
            .map(Number)
            .sort((a, b) => b - a);

        const breakpoint = breakpoints.find(
            (breakpoint) => windowWidth.value >= breakpoint,
        );

        settings = toRaw(
            breakpoint ? { ...props, ...props.breakpoints[breakpoint] } : props,
        );
    }

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

function onRefresh(): void {
    vmodel.value = childItems.value[0]?.data.getValue();
    // set HTML element with
    windowWidth.value = window.innerWidth;
    // trigger re creation of settings based on props
    nextTick(() => triggerRef(settings));
}

// #region --- Active Item Feature ---

/** The selected item value or index, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

const activeItem = ref<CarouselItem<T>>();

onMounted(() => {
    // set first tab as default if not defined
    if (!vmodel.value) vmodel.value = childItems.value[0]?.data.getValue();
});

/** When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) activateItem(value);
    },
);

// set the active item immediate and every time the vmodel changes
watchEffect(() => {
    activeItem.value = isDefined(vmodel.value)
        ? childItems.value.find(
              (item) => vmodel.value === item.data.getValue(),
          ) || childItems.value[0]
        : childItems.value[0];
});

function setActive(value: T): void {
    if (vmodel.value === value) return;
    activateItem(value);
}

/** Activate a specific child item by value and deactivate the previous child item. */
function activateItem(newValue: ModelValue): void {
    const oldValue = activeItem.value?.data.getValue();
    const oldItem = activeItem.value;
    const newItem =
        childItems.value.find((item) => newValue === item.data.getValue()) ||
        childItems.value[0];

    if (oldItem && newItem) {
        oldItem.data.deactivate(newItem.index);
        newItem.data.activate(oldItem.index);
    }

    nextTick(() => {
        vmodel.value = newValue;
        emits("change", newValue, oldValue);
    });
}

// #endregion --- Active Item Feature ---

// #region --- Switch Item Events ---

/**
 * Show the slide by index.
 * @param index the real index of the slide
 */
function switchTo(index: number = 0): void {
    if (settings.value.repeat) index = mod(index, itemsCount.value);
    index = bound(index, 0, itemsCount.value - 1);

    const item = childItems.value[index];
    activateItem(item?.data.getValue());
}

const hasArrows = computed(
    () =>
        (settings.value.arrowsHover && isHovered.value) ||
        !settings.value.arrowsHover,
);

const hasPrev = computed(
    () => settings.value.repeat || (activeItem.value?.index ?? 0) > 0,
);

function onPrev(): void {
    switchTo((activeItem.value?.index ?? 0) - settings.value.itemsToList);
}

const hasNext = computed(
    () =>
        settings.value.repeat ||
        (activeItem.value?.index ?? 0) <
            itemsCount.value - settings.value.itemsToList,
);

function onNext(): void {
    switchTo((activeItem.value?.index ?? 0) + settings.value.itemsToList);
}

/** Go to the first viable item */
function onHomePressed(): void {
    switchTo(0);
}

/** Go to the last viable item */
function onEndPressed(): void {
    switchTo(itemsCount.value - settings.value.itemsToList);
}

/** Set focus on a tab item. */
function onChange(item: ProviderItem): void {
    switchTo(item.index);
}

// #endregion --- Switch Item Events ---

// #region --- Drag & Drop | Slide Feature ---

const dragX = ref<number>();
const delta = ref<number>(0);

const isDragging = computed(() => isDefined(dragX.value));

/** slide transform:translateX translation */
const translation = computed(
    () =>
        -bound(
            delta.value + (activeItem.value?.index ?? 0) * itemWidth.value,
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
    dragX.value = (event as TouchEvent).touches
        ? (event as TouchEvent).touches[0]?.clientX
        : (event as MouseEvent).clientX;

    // stop timer when dragging starts
    pauseTimer();
}

function onDragOver(event: TouchEvent | MouseEvent): void {
    if (!isDragging.value) return;

    const dragEndX =
        ((event as TouchEvent).touches
            ? (event as TouchEvent).changedTouches[0] ||
              (event as TouchEvent).touches[0]
            : (event as MouseEvent)
        ).clientX ?? 0;
    // calc transition delta value
    delta.value = (dragX.value ?? 0) - dragEndX;
}

function onDragEnd(): void {
    if (!isDragging.value) return;
    // switch slide
    const signCheck = sign(delta.value);
    const results = Math.round(Math.abs(delta.value / itemWidth.value) + 0.15); // Hack
    switchTo((activeItem.value?.index ?? 0) + signCheck * results);

    // cleanup
    delta.value = 0;
    dragX.value = undefined;

    // atart timer after dragging ends
    startTimer();
}

// #endregion --- Drag & Drop | Slide Feature ---

// #region --- Autoplay Feature ---

let timer: ReturnType<typeof setTimeout> | undefined;
/** deactive autoplay feature */
const isAutoplayPaused = ref(false);

const isHovered = ref(false);

function onHoverEnter(): void {
    isHovered.value = true;
}

function onHoverLeave(): void {
    isHovered.value = false;
}

/** Start/Stop timer when carousel get hovered */
watch(isHovered, (value) => {
    if (!props.autoplay || !props.pauseHover) return;
    if (value) pauseTimer();
    else startTimer();
});

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

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-carousel"],
    [
        "overlayClass",
        "o-carousel__overlay",
        null,
        computed(() => props.overlay),
    ],
);

const wrapperClasses = defineClasses(["wrapperClass", "o-carousel__wrapper"]);

const itemsClasses = defineClasses(
    ["itemsClass", "o-carousel__items"],
    ["itemsDraggingClass", "o-carousel__items--dragging", null, isDragging],
);

const prevIconClasses = defineClasses(
    ["iconClass", "o-carousel__icon"],
    ["iconPrevClass", "o-carousel__icon-prev"],
);

const nextIconClasses = defineClasses(
    ["iconClass", "o-carousel__icon"],
    ["iconNextClass", "o-carousel__icon-next"],
);

const autoplayIconClasses = defineClasses(
    ["iconClass", "o-carousel__icon"],
    ["iconAutoplayClass", "o-carousel__icon-autoplay"],
);

const indicatorsClasses = defineClasses(
    ["indicatorsClass", "o-carousel__indicators"],
    [
        "indicatorsInsideClass",
        "o-carousel__indicators--inside",
        null,
        computed(() => !!props.indicatorInside),
    ],
    [
        "indicatorsPositionClass",
        "o-carousel__indicators--",
        computed(() => props.indicatorPosition),
        computed(() => !!props.indicatorPosition),
    ],
);

const indicatorClasses = defineClasses([
    "indicatorClass",
    "o-carousel__indicator",
]);

const indicatorItemClasses = defineClasses(
    ["indicatorItemClass", "o-carousel__indicator__item"],
    [
        "indicatorItemStyleClass",
        "o-carousel__indicator__item--",
        computed(() => props.indicatorStyle),
        computed(() => !!props.indicatorStyle),
    ],
);

const indicatorItemActiveClasses = defineClasses([
    "indicatorItemActiveClass",
    "o-carousel__indicator__item--active",
]);

function indicatorItemAppliedClasses(item: ProviderItem): ClassBinding[] {
    const activeClasses =
        item.identifier === activeItem.value?.identifier
            ? indicatorItemActiveClasses.value
            : [];

    return [...indicatorItemClasses.value, ...activeClasses];
}

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div
        ref="rootElement"
        data-oruga="carousel"
        :class="rootClasses"
        role="region"
        aria-roledescription="carousel"
        @mouseenter="onHoverEnter"
        @mouseleave="onHoverLeave"
        @focusin="onHoverEnter"
        @focusout="onHoverLeave"
        @keydown.left.prevent="onPrev"
        @keydown.right.prevent="onNext"
        @keydown.home.prevent="onHomePressed"
        @keydown.end.prevent="onEndPressed">
        <div :class="wrapperClasses">
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
                        clickable
                        :aria-label="
                            !isAutoplayPaused
                                ? ariaAutoplayPauseLabel
                                : ariaAutoplayResumeLabel
                        "
                        @click="onToggleAutoplay" />
                </template>
            </slot>

            <slot
                name="arrows"
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
                        clickable
                        :aria-label="ariaPreviousLabel"
                        @click="onPrev" />
                    <o-icon
                        v-show="hasArrows && hasNext"
                        :class="nextIconClasses"
                        :pack="iconPack"
                        :icon="iconNext"
                        :size="iconSize"
                        clickable
                        :aria-label="ariaNextLabel"
                        @click="onNext" />
                </template>
            </slot>

            <div
                :class="itemsClasses"
                :style="'transform:translateX(' + translation + 'px)'"
                aria-roledescription="carousel-slide"
                aria-atomic="false"
                :tabindex="indicators ? undefined : 0"
                :aria-live="autoplay ? 'off' : 'polite'"
                @dragend="onDragEnd"
                @dragover="onDragOver"
                @touchmove="onDragOver"
                @touchend="onDragEnd">
                <slot>
                    <OCarouselItem
                        v-for="option in keyedOptions"
                        :key="option.key"
                        v-bind="option.value" />
                </slot>
            </div>
        </div>

        <slot
            name="indicators"
            :active-index="activeItem?.index ?? 0"
            :switch-to="switchTo">
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
                    :tabindex="
                        item.identifier === activeItem?.identifier ? '0' : '-1'
                    "
                    :aria-label="`Slide ${item.identifier}`"
                    :aria-controls="`carouselpanel-${item.identifier}`"
                    :aria-selected="item.identifier === activeItem?.identifier"
                    @click="onChange(item)"
                    @keydown.enter="onChange(item)"
                    @keydown.space="onChange(item)">
                    <slot :index="item.index" name="indicator">
                        <span :class="indicatorItemAppliedClasses(item)" />
                    </slot>
                </div>
            </div>
        </slot>

        <template v-if="overlay">
            <slot name="overlay" />
        </template>
    </div>
</template>
