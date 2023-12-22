<script setup lang="ts">
import { computed, toValue, nextTick, ref, watch, type PropType } from "vue";

import OButton from "../button/Button.vue";
import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { isDefined } from "@/utils/helpers";
import {
    useComputedClass,
    useProviderParent,
    useVModelBinding,
    useMatchMedia,
} from "@/composables";

import type { StepItem, StepItemComponent } from "./types";
import type { ComponentClass, PropBind } from "@/types";

/**
 * Responsive horizontal process steps
 * @displayName Steps
 * @requires ./StepItem.vue
 * @style _steps.scss
 */
defineOptions({
    isOruga: true,
    name: "OSteps",
    configField: "steps",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: [String, Number], default: undefined },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("steps.variant"),
    },
    /**
     * Tab size
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("steps.size"),
    },
    /** Show tab in vertical layout */
    vertical: { type: Boolean, default: false },
    /**
     * Position of the tab
     * @values left, centered, right
     */
    position: {
        type: String,
        default: undefined,
        validator: (value: string) =>
            ["left", "centered", "right"].indexOf(value) >= 0,
    },
    /**
     * Icon pack to use for the navigation
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("steps.iconPack"),
    },
    /** Icon to use for navigation button */
    iconPrev: {
        type: String,
        default: () => getOption("steps.iconPrev", "chevron-left"),
    },
    /** Icon to use for navigation button */
    iconNext: {
        type: String,
        default: () => getOption("steps.iconNext", "chevron-right"),
    },
    /**
     * Next and previous buttons below the component. You can use this property if you want to use your own custom navigation items.
     */
    hasNavigation: { type: Boolean, default: true },
    /** Step navigation is animated */
    animated: {
        type: Boolean,
        default: () => getOption("steps.animated", true),
    },
    /**
     * Position of the marker label
     * @values bottom, right, left
     */
    labelPosition: {
        type: String,
        default: () => getOption("steps.labelPosition", "bottom"),
        validator: (value: string) =>
            ["bottom", "right", "left"].indexOf(value) > -1,
    },
    /** Rounded step markers */
    rounded: { type: Boolean, default: true },
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("steps.mobileBreakpoint"),
    },
    /** Accessibility next button aria label */
    ariaNextLabel: {
        type: String,
        default: () => getOption("steps.ariaNextLabel"),
    },
    /** Accessibility previous button aria label  */
    ariaPreviousLabel: {
        type: String,
        default: () => getOption("steps.ariaPreviousLabel"),
    },
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    verticalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepsClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    animatedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepMarkerRoundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepDividerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepMarkerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepContentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepContentTransitioningClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepNavigationClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepLinkClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepLinkClickableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepLinkLabelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    stepLinkLabelPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number} updated modelValue prop
     */
    (e: "update:modelValue", value: string | number): void;
    /**
     * on tab change event
     * @param value {string | number} new tab value
     * @param value {string | number} old tab value
     */
    (e: "change", newValue: string | number, oldValue: string | number): void;
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const rootRef = ref();

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    activeId: activeId.value,
    vertical: props.vertical,
}));

/** Provide functionalities and data to child item components */
const { sortedItems } = useProviderParent<StepItemComponent>(rootRef, {
    data: provideData,
});

const items = computed<StepItem[]>(() =>
    sortedItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data),
    })),
);

const activeId = useVModelBinding(props, emits, { passive: true });

/**  When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (activeId.value !== value) performAction(value);
    },
);

const activeItem = computed(() =>
    isDefined(activeId)
        ? items.value.find((item) => item.value === activeId.value) ||
          items.value[0]
        : items.value[0],
);

const isTransitioning = computed(() =>
    items.value.some((item) => item.isTransitioning),
);

/** Check if previous button is available. */
const hasPrev = computed(() => !!prevItem.value);

/** Check if next button is available. */
const hasNext = computed(() => !!nextItem.value);

/** Retrieves the previous visible item */
const prevItem = computed(() => {
    if (!activeItem.value) return null;

    let prevItem = null;
    for (let idx = items.value.indexOf(activeItem.value) - 1; idx >= 0; idx--) {
        if (items.value[idx].visible) {
            prevItem = items.value[idx];
            break;
        }
    }
    return prevItem;
});

/** Retrieves the next visible item */
const nextItem = computed(() => {
    let nextItem = null;
    let idx = activeItem.value ? items.value.indexOf(activeItem.value) + 1 : 0;
    for (; idx < items.value.length; idx++) {
        if (items.value[idx].visible) {
            nextItem = items.value[idx];
            break;
        }
    }
    return nextItem;
});

/**
 * Return if the step should be clickable or not.
 */
function isItemClickable(item: StepItem): boolean {
    if (item.clickable === undefined)
        return item.index < activeItem.value?.index;
    return item.clickable;
}

/** Previous button click listener. */
function prev(): void {
    if (hasPrev.value) itemClick(prevItem.value);
}

/** Previous button click listener. */
function next(): void {
    if (hasNext.value) itemClick(nextItem.value);
}

/** Item click listener, emit input event and change active child. */
function itemClick(item: StepItem): void {
    if (activeId.value !== item.value) performAction(item.value);
}

/** Activate next child and deactivate prev child */
function performAction(newId: number | string): void {
    const oldId = activeItem.value.value;
    const oldItem = items.value.find((item) => item.value === oldId);
    activeId.value = newId;
    nextTick(() => {
        if (oldItem && activeItem.value) {
            oldItem.deactivate(activeItem.value.index);
            activeItem.value.activate(oldItem.index);
        }
        emits("change", newId, oldId);
    });
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-steps__wrapper"),
    {
        [useComputedClass("sizeClass", "o-steps--", props.size)]: props.size,
    },
    {
        [useComputedClass("verticalClass", "o-steps__wrapper-vertical")]:
            props.vertical,
    },
    {
        [useComputedClass(
            "positionClass",
            "o-steps__wrapper-position-",
            props.position,
        )]: props.position && props.vertical,
    },
    {
        [useComputedClass("mobileClass", "o-steps--mobile")]: isMobile.value,
    },
]);

const wrapperClasses = computed(() => [
    useComputedClass("stepsClass", "o-steps"),
    {
        [useComputedClass("animatedClass", "o-steps--animated")]:
            props.animated,
    },
]);

const stepDividerClasses = computed(() => [
    useComputedClass("stepDividerClass", "o-steps__divider"),
]);

const stepMarkerClasses = computed(() => [
    useComputedClass("stepMarkerClass", "o-steps__marker"),
    {
        [useComputedClass(
            "stepMarkerRoundedClass",
            "o-steps__marker--rounded",
        )]: props.rounded,
    },
]);

const stepContentClasses = computed(() => [
    useComputedClass("stepContentClass", "o-steps__content"),
    {
        [useComputedClass(
            "stepContentTransitioningClass",
            "o-steps__content-transitioning",
        )]: isTransitioning.value,
    },
]);

const stepNavigationClasses = computed(() => [
    useComputedClass("stepNavigationClass", "o-steps__navigation"),
]);

const stepLinkLabelClasses = computed(() => [
    useComputedClass("stepLinkLabelClass", "o-steps__title"),
]);

function stepLinkClasses(childItem: StepItem): PropBind {
    return [
        useComputedClass("stepLinkClass", "o-steps__link"),
        {
            [useComputedClass(
                "stepLinkLabelPositionClass",
                "o-steps__link-label-",
                props.labelPosition,
            )]: props.labelPosition,
        },
        {
            [useComputedClass(
                "stepLinkClickableClass",
                "o-steps__link-clickable",
            )]: isItemClickable(childItem),
        },
    ];
}

function itemClasses(childItem): PropBind {
    return [
        childItem.headerClass,
        useComputedClass("itemHeaderClass", "o-steps__nav-item"),
        {
            [useComputedClass(
                "itemHeaderVariantClass",
                "o-steps__nav-item--",
                childItem.variant || props.variant,
            )]: childItem.variant || props.variant,
        },
        {
            [useComputedClass(
                "itemHeaderActiveClass",
                "o-steps__nav-item-active",
            )]: childItem.value === activeItem.value.value,
        },
        {
            [useComputedClass(
                "itemHeaderPreviousClass",
                "o-steps__nav-item-previous",
            )]: activeItem.value.index > childItem.index,
        },
    ];
}
</script>

<template>
    <div :class="rootClasses" data-oruga="steps">
        <nav :class="wrapperClasses">
            <div
                v-for="(childItem, index) in items"
                v-show="childItem.visible"
                :key="childItem.value"
                :class="itemClasses(childItem)">
                <span v-if="index > 0" :class="stepDividerClasses"> </span>

                <component
                    :is="childItem.tag"
                    role="button"
                    :tabindex="isItemClickable(childItem) ? 0 : -1"
                    :class="stepLinkClasses(childItem)"
                    @click="isItemClickable(childItem) && itemClick(childItem)"
                    @keydown.enter="
                        isItemClickable(childItem) && itemClick(childItem)
                    ">
                    <div :class="stepMarkerClasses">
                        <o-icon
                            v-if="childItem.icon"
                            :icon="childItem.icon"
                            :pack="childItem.iconPack"
                            :size="size" />
                        <span v-else-if="childItem.step">
                            {{ childItem.step }}
                        </span>
                    </div>

                    <div :class="stepLinkLabelClasses">
                        {{ childItem.label }}
                    </div>
                </component>
            </div>
        </nav>

        <section :class="stepContentClasses">
            <!--
                @slot Place step items here
            -->
            <slot />
        </section>

        <!--
            @slot Override step navigation
            @binding {{disabled: boolean, action: (): void }} previous - previous button configs
            @binding {{disabled: boolean, action: (): void }} next - next button configs
        -->
        <slot
            name="navigation"
            :previous="{ disabled: !hasPrev, action: prev }"
            :next="{ disabled: !hasNext, action: next }">
            <nav v-if="hasNavigation" :class="stepNavigationClasses">
                <o-button
                    role="button"
                    :icon-left="iconPrev"
                    :icon-pack="iconPack"
                    icon-both
                    :disabled="!hasPrev"
                    :aria-label="ariaPreviousLabel"
                    @click.prevent="prev" />

                <o-button
                    role="button"
                    :icon-left="iconNext"
                    :icon-pack="iconPack"
                    icon-both
                    :disabled="!hasNext"
                    :aria-label="ariaNextLabel"
                    @click.prevent="next" />
            </nav>
        </slot>
    </div>
</template>
