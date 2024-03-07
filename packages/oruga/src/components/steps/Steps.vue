<script setup lang="ts">
import { computed, toValue, nextTick, ref, watch, type PropType } from "vue";

import OButton from "../button/Button.vue";
import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { isDefined } from "@/utils/helpers";
import { defineClasses, useProviderParent, useMatchMedia } from "@/composables";

import type { StepItem, StepItemComponent, StepsComponent } from "./types";
import type { ComponentClass, ClassBind } from "@/types";

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
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
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
     * Transition animation name
     * @values [next, prev], [right, left, down, up]
     */
    animation: {
        type: Array as PropType<Array<string>>,
        default: () =>
            getOption("tabs.animation", [
                "slide-next",
                "slide-prev",
                "slide-down",
                "slide-up",
            ]),
        validator: (value: Array<string>) =>
            value.length === 2 || value.length === 4,
    },
    /** Apply animation on the initial render */
    animateInitially: {
        type: Boolean,
        default: () => getOption("steps.animateInitially", false),
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
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Size of the steps */
    sizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tooltip trigger */
    verticalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component when is vertical and its position changes */
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the steps container */
    stepsClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of Steps component when animation gets triggered */
    animatedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps markers trigger when are rounded */
    stepMarkerRoundedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component dividers */
    stepDividerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component marker */
    stepMarkerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component content */
    stepContentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component content when transition is happening */
    stepContentTransitioningClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component navigation element */
    stepNavigationClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component link */
    stepLinkClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Steps component link when clickable */
    stepLinkClickableClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Step component link label */
    stepLinkLabelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Step component link label when positioned */
    stepLinkLabelPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of steps component when on mobile */
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
const provideData = computed<StepsComponent>(() => ({
    activeValue: vmodel.value,
    vertical: props.vertical,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
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

const vmodel = defineModel<string | number>();

/** When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) performAction(value);
    },
);

const activeItem = computed(() =>
    isDefined(vmodel.value)
        ? items.value.find((item) => item.value === vmodel.value) ||
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
    if (vmodel.value !== item.value) performAction(item.value);
}

/** Activate next child and deactivate prev child */
function performAction(newId: number | string): void {
    const oldId = activeItem.value.value;
    const oldItem = activeItem.value;
    const newItem =
        items.value.find((item) => item.value === newId) || items.value[0];

    if (oldItem && newItem) {
        oldItem.deactivate(newItem.index);
        newItem.activate(oldItem.index);
    }

    nextTick(() => {
        vmodel.value = newId;
        emits("change", newId, oldId);
    });
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-steps__wrapper"],
    [
        "sizeClass",
        "o-steps--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "verticalClass",
        "o-steps__wrapper-vertical",
        null,
        computed(() => props.vertical),
    ],
    [
        "positionClass",
        "o-steps__wrapper-position-",
        computed(() => props.position),
        computed(() => props.position && props.vertical),
    ],
    ["mobileClass", "o-steps--mobile", null, isMobile],
);

const wrapperClasses = defineClasses(
    ["stepsClass", "o-steps"],
    [
        "animatedClass",
        "o-steps--animated",
        null,
        computed(() => props.animated),
    ],
);

const stepDividerClasses = defineClasses([
    "stepDividerClass",
    "o-steps__divider",
]);

const stepMarkerClasses = defineClasses(
    ["stepMarkerClass", "o-steps__marker"],
    [
        "stepMarkerRoundedClass",
        "o-steps__marker--rounded",
        null,
        computed(() => props.rounded),
    ],
);

const stepContentClasses = defineClasses(
    ["stepContentClass", "o-steps__content"],
    [
        "stepContentTransitioningClass",
        "o-steps__content-transitioning",
        null,
        isTransitioning,
    ],
);

const stepNavigationClasses = defineClasses([
    "stepNavigationClass",
    "o-steps__navigation",
]);

const stepLinkLabelClasses = defineClasses([
    "stepLinkLabelClass",
    "o-steps__title",
]);

function stepLinkClasses(childItem: StepItem): ClassBind[] {
    const classes = defineClasses(
        ["stepLinkClass", "o-steps__link"],
        [
            "stepLinkLabelPositionClass",
            "o-steps__link-label-",
            props.labelPosition,
            !!props.labelPosition,
        ],
        [
            "stepLinkClickableClass",
            "o-steps__link-clickable",
            null,
            isItemClickable(childItem),
        ],
    );

    return classes.value;
}

function itemClasses(childItem: (typeof items.value)[number]): ClassBind[] {
    const classes = defineClasses(
        ["itemHeaderClass", "o-steps__nav-item"],
        [
            "itemHeaderVariantClass",
            "o-steps__nav-item--",
            childItem.variant || props.variant,
            !!childItem.variant || !!props.variant,
        ],
        [
            "itemHeaderActiveClass",
            "o-steps__nav-item-active",
            null,
            childItem.value === activeItem.value.value,
        ],
        [
            "itemHeaderPreviousClass",
            "o-steps__nav-item-previous",
            null,
            activeItem.value.index > childItem.index,
        ],
    );

    const headerClass = { [childItem.headerClass || ""]: true };
    return [headerClass, ...classes.value];
}
</script>

<template>
    <div :class="rootClasses" data-oruga="steps">
        <ol :class="wrapperClasses">
            <li
                v-for="(childItem, index) in items"
                v-show="childItem.visible"
                :key="childItem.value"
                :aria-current="
                    childItem.value === activeItem.value ? 'step' : undefined
                "
                :class="itemClasses(childItem)"
                :aria-selected="childItem.value === activeItem.value">
                <span v-if="index > 0" :class="stepDividerClasses"> </span>

                <component
                    :is="childItem.tag"
                    role="button"
                    :tabindex="isItemClickable(childItem) ? 0 : null"
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
            </li>
        </ol>

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
