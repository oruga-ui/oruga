<script setup lang="ts" generic="T extends string | number | object">
import { computed, toValue, nextTick, ref, watch, watchEffect } from "vue";

import OStepItem from "../steps/StepItem.vue";
import OButton from "../button/Button.vue";
import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { isDefined } from "@/utils/helpers";
import {
    defineClasses,
    normalizeOptions,
    useProviderParent,
    useMatchMedia,
} from "@/composables";

import type { ClassBind } from "@/types";
import type { StepItem, StepItemComponent, StepsComponent } from "./types";
import type { StepsProps } from "./props";

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

type ModelValue = StepsProps<T>["modelValue"];

const props = withDefaults(defineProps<StepsProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    options: undefined,
    variant: () => getOption("steps.variant"),
    size: () => getOption("steps.size"),
    vertical: false,
    position: undefined,
    iconPack: () => getOption("steps.iconPack"),
    iconPrev: () => getOption("steps.iconPrev", "chevron-left"),
    iconNext: () => getOption("steps.iconNext", "chevron-right"),
    hasNavigation: true,
    destroyOnHide: false,
    animated: () => getOption("steps.animated", true),
    animation: () =>
        getOption("steps.animation", [
            "slide-next",
            "slide-prev",
            "slide-down",
            "slide-up",
        ]),
    animateInitially: () => getOption("steps.animateInitially", false),
    labelPosition: () => getOption("steps.labelPosition", "bottom"),
    rounded: true,
    mobileBreakpoint: () => getOption("steps.mobileBreakpoint"),
    ariaNextLabel: () => getOption("steps.ariaNextLabel", "Next"),
    ariaPreviousLabel: () => getOption("steps.ariaPreviousLabel", "Previous"),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | object} updated modelValue prop
     */
    (e: "update:modelValue", value: ModelValue): void;
    /**
     * on step change event
     * @param value {string | number | object} new step value
     * @param value {string | number | object} old step value
     */
    (e: "change", newValue: ModelValue, oldValue: ModelValue): void;
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const rootRef = ref();

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

// Provided data is a computed ref to enjure reactivity.
const provideData = computed<StepsComponent<ModelValue>>(() => ({
    activeValue: vmodel.value,
    activeIndex: activeItem.value?.index || 0,
    vertical: props.vertical,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
    destroyOnHide: props.destroyOnHide,
    variant: props.variant,
}));

/** Provide functionalities and data to child item components */
const { sortedItems } = useProviderParent<StepItemComponent<T>>(rootRef, {
    data: provideData,
});

const items = computed<StepItem<T>[]>(() =>
    sortedItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data!),
    })),
);

/** normalized programamtic options */
const groupedOptions = computed(() => normalizeOptions<T>(props.options));

/** When v-model is changed set the new active step. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) performAction(value as T);
    },
);

const activeItem = ref(items.value[0]);

watchEffect(() => {
    activeItem.value = isDefined(vmodel.value)
        ? items.value.find((item) => item.value === vmodel.value) ||
          items.value[0]
        : items.value[0];
});

const isTransitioning = computed(() =>
    items.value.some((item) => item.isTransitioning),
);

/** Check if previous button is available. */
const hasPrev = computed(() => !!prevItem.value);

/** Check if next button is available. */
const hasNext = computed(() => !!nextItem.value);

/** Retrieves the previous visible item */
const prevItem = computed(() => {
    if (!activeItem.value) return undefined;

    let prevItem: StepItem<T> | undefined;
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
    let nextItem: StepItem<T> | undefined;
    let idx = activeItem.value ? items.value.indexOf(activeItem.value) + 1 : 0;
    for (; idx < items.value.length; idx++) {
        if (items.value[idx].visible) {
            nextItem = items.value[idx];
            break;
        }
    }
    return nextItem;
});

/** Return if the step should be clickable or not. */
function isItemClickable(item: StepItem<T>): boolean {
    if (item.clickable === undefined)
        return item.index < activeItem.value?.index;
    return item.clickable;
}

/** Previous button click listener. */
function prev(): void {
    if (hasPrev.value && prevItem.value) itemClick(prevItem.value);
}

/** Previous button click listener. */
function next(): void {
    if (hasNext.value && nextItem.value) itemClick(nextItem.value);
}

/** Item click listener, emit input event and change active child. */
function itemClick(item: StepItem<T>): void {
    if (vmodel.value !== item.value) performAction(item.value as T);
}

/** Activate next child and deactivate prev child */
function performAction(newId: T): void {
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
        emits("change", newId, oldId as T);
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
        "variantClass",
        "o-steps--",
        computed(() => props.variant),
        computed(() => !!props.variant),
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
        computed(() => !!props.position && props.vertical),
    ],
    ["mobileClass", "o-steps--mobile", null, isMobile],
);

const listClasses = defineClasses(
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

const stepLinkClasses = defineClasses(
    ["stepLinkClass", "o-steps__link"],
    [
        "stepLinkLabelPositionClass",
        "o-steps__link-label-",
        computed(() => props.labelPosition),
        computed(() => !!props.labelPosition),
    ],
);

const stepLinkClickableClasses = defineClasses([
    "stepLinkClickableClass",
    "o-steps__link-clickable",
]);

function stepLinkAppliedClasses(childItem: StepItem<T>): ClassBind[] {
    const activeClasses = isItemClickable(childItem)
        ? stepLinkClickableClasses.value
        : [];

    return [...stepLinkClasses.value, ...activeClasses];
}
</script>

<template>
    <div :class="rootClasses" data-oruga="steps">
        <ol :class="listClasses">
            <li
                v-for="(childItem, index) in items"
                v-show="childItem.visible"
                :key="childItem.identifier"
                :aria-current="
                    childItem.value === activeItem.value ? 'step' : undefined
                "
                :class="childItem.classes">
                <span v-if="index > 0" :class="stepDividerClasses"> </span>

                <component
                    :is="childItem.tag"
                    role="button"
                    :tabindex="isItemClickable(childItem) ? 0 : null"
                    :class="stepLinkAppliedClasses(childItem)"
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
            <slot>
                <o-step-item
                    v-for="option in groupedOptions"
                    v-show="!option.hidden"
                    v-bind="option.attrs"
                    :key="option.key"
                    :value="option.value"
                    :label="option.label" />
            </slot>
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
