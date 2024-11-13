<script setup lang="ts" generic="T">
import {
    computed,
    toValue,
    nextTick,
    ref,
    watch,
    watchEffect,
    useTemplateRef,
} from "vue";

import OStepItem from "../steps/StepItem.vue";
import OButton from "../button/Button.vue";
import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { isDefined } from "@/utils/helpers";
import {
    defineClasses,
    normalizeOptions,
    useProviderParent,
    useMatchMedia,
} from "@/composables";

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
    variant: () => getDefault("steps.variant"),
    size: () => getDefault("steps.size"),
    vertical: false,
    position: undefined,
    iconPack: () => getDefault("steps.iconPack"),
    iconPrev: () => getDefault("steps.iconPrev", "chevron-left"),
    iconNext: () => getDefault("steps.iconNext", "chevron-right"),
    hasNavigation: true,
    destroyOnHide: false,
    animated: () => getDefault("steps.animated", true),
    animation: () =>
        getDefault("steps.animation", [
            "slide-next",
            "slide-prev",
            "slide-down",
            "slide-up",
        ]),
    animateInitially: () => getDefault("steps.animateInitially", false),
    labelPosition: () => getDefault("steps.labelPosition", "bottom"),
    rounded: true,
    mobileBreakpoint: () => getDefault("steps.mobileBreakpoint"),
    ariaNextLabel: () => getDefault("steps.ariaNextLabel", "Next"),
    ariaPreviousLabel: () => getDefault("steps.ariaPreviousLabel", "Previous"),
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

const rootRef = useTemplateRef("rootElement");

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

// Provided data is a computed ref to enjure reactivity.
const provideData = computed<StepsComponent>(() => ({
    activeIndex: activeItem.value?.index || 0,
    labelPosition: props.labelPosition,
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

const activeItem = ref<StepItem<T>>(
    items.value.find((item) => item.value === props.modelValue) ||
        items.value[0],
);

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
    let idx =
        items.value.findIndex(
            (item) => item.identifier === activeItem.value.identifier,
        ) - 1;
    for (; idx >= 0; idx--) {
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
    let idx = activeItem.value
        ? items.value.findIndex(
              (item) => item.identifier === activeItem.value.identifier,
          ) + 1
        : 0;
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
function performAction(newValue: T): void {
    const oldValue = activeItem.value.value;
    const oldItem = activeItem.value;
    const newItem =
        items.value.find((item) => item.value === newValue) || items.value[0];

    if (oldItem && newItem) {
        oldItem.deactivate(newItem.index);
        newItem.activate(oldItem.index);
    }

    nextTick(() => {
        vmodel.value = newValue;
        emits("change", newValue, oldValue as T);
    });
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-steps"],
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
        "o-steps--vertical",
        null,
        computed(() => props.vertical),
    ],
    [
        "positionClass",
        "o-steps-position-",
        computed(() => props.position),
        computed(() => !!props.position && props.vertical),
    ],
    ["mobileClass", "o-steps--mobile", null, isMobile],
);

const navClasses = defineClasses(
    ["navClass", "o-steps__nav"],
    [
        "animatedClass",
        "o-steps__nav--animated",
        null,
        computed(() => props.animated),
    ],
);

const dividerClasses = defineClasses(["dividerClass", "o-steps__divider"]);

const markerClasses = defineClasses(
    ["markerClass", "o-steps__marker"],
    [
        "markerRoundedClass",
        "o-steps__marker--rounded",
        null,
        computed(() => props.rounded),
    ],
);

const contentClasses = defineClasses(
    ["contentClass", "o-steps__content"],
    [
        "transitioningClass",
        "o-steps__content-transitioning",
        null,
        isTransitioning,
    ],
);

const navigationClasses = defineClasses([
    "navigationClass",
    "o-steps__navigation",
]);
</script>

<template>
    <div ref="rootElement" :class="rootClasses" data-oruga="steps">
        <ol
            :class="navClasses"
            role="tablist"
            :aria-orientation="vertical ? 'vertical' : 'horizontal'">
            <li
                v-for="(childItem, index) in items"
                v-show="childItem.visible"
                :id="`tab-${childItem.identifier}`"
                :key="childItem.identifier"
                :class="childItem.navClasses"
                :role="childItem.ariaRole"
                :aria-current="
                    childItem.value === activeItem.value ? 'step' : undefined
                "
                :aria-controls="`tabpanel-${childItem.identifier}`"
                :aria-selected="childItem.value === activeItem.value">
                <span v-if="index > 0" :class="dividerClasses" />

                <component
                    :is="childItem.tag"
                    role="button"
                    :tabindex="isItemClickable(childItem) ? 0 : null"
                    :class="childItem.classes"
                    @click="isItemClickable(childItem) && itemClick(childItem)"
                    @keydown.enter="
                        isItemClickable(childItem) && itemClick(childItem)
                    "
                    @keydown.left.prevent="prev"
                    @keydown.right.prevent="next"
                    @keydown.up.prevent="prev"
                    @keydown.down.prevent="next">
                    <div :class="markerClasses">
                        <o-icon
                            v-if="childItem.icon"
                            :class="childItem.iconClasses"
                            :icon="childItem.icon"
                            :pack="childItem.iconPack"
                            :size="size" />
                        <span v-else-if="childItem.step">
                            {{ childItem.step }}
                        </span>
                    </div>

                    <div :class="childItem.labelClasses">
                        {{ childItem.label }}
                    </div>
                </component>
            </li>
        </ol>

        <section :class="contentClasses">
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
            <nav v-if="hasNavigation" :class="navigationClasses">
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
