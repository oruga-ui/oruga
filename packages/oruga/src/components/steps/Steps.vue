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
    useSequentialId,
} from "@/composables";

import type { StepItem, StepItemComponent, StepsComponent } from "./types";
import type { StepsProps } from "./props";

/**
 * Responsive horizontal process steps.
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
    activateOnFocus: false,
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
    ariaLabel: () => getDefault("steps.ariaLabel"),
    ariaNextLabel: () => getDefault("steps.ariaNextLabel", "Next"),
    ariaPreviousLabel: () => getDefault("steps.ariaPreviousLabel", "Previous"),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on step change event
     * @param value {T} new step value
     * @param value {T} old step value
     */
    change: [newValue: ModelValue, oldValue: ModelValue];
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
const provideData = computed<StepsComponent>(() => ({
    activeIndex: activeItem.value?.index ?? 0,
    labelPosition: props.labelPosition,
    vertical: props.vertical,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
    variant: props.variant,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<StepItemComponent<T>>({
    rootRef,
    data: provideData,
});

const items = computed<StepItem<T>[]>(() => {
    if (!childItems.value) return [];
    return childItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data!),
    }));
});

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const groupedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

/** When v-model is changed set the new active step. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) performAction(value);
    },
);

/** the active item */
const activeItem = ref<StepItem<T>>();

// set the active item immediate and every time the vmodel changes
watchEffect(() => {
    activeItem.value = isDefined(vmodel.value)
        ? items.value.find((item) => item.value === vmodel.value) ||
          items.value[0]
        : items.value[0];
});

const isTransitioning = computed(() =>
    items.value.some((item) => item.isTransitioning),
);

// --- EVENT HANDLER ---

/** Click the item after or before the current active item. */
function activateItem(fowardIndex: 1 | -1): void {
    const index = (activeItem.value?.index ?? 0) + fowardIndex;
    if (index < 0 || index >= items.value.length) return;
    const item = items.value[index];
    itemClick(item);
}

/** Item click listener, emit input event and change active child. */
function itemClick(item: StepItem<T>): void {
    if (!isItemClickable(item)) return;
    if (vmodel.value !== item.value) performAction(item.value);
}
/** Return if the step should be clickable or not. */
function isItemClickable(item: StepItem<T>): boolean {
    if (typeof item.clickable === "undefined")
        return item.index < (activeItem.value?.index ?? 0);
    return item.clickable;
}

/** Check if previous button is available. */
const hasPrev = computed(() =>
    isDefined(getFirstViableIndex((activeItem.value?.index ?? 0) - 1, false)),
);

/** Check if next button is available. */
const hasNext = computed(() =>
    isDefined(getFirstViableIndex((activeItem.value?.index ?? 0) + 1, true)),
);

/** Focus the next item if possible. */
function onNext(index: number): void {
    const viableIndex = getFirstViableIndex(index + 1, true);
    if (isDefined(viableIndex)) moveFocus(viableIndex);
}

/** Focus the previous item if possible. */
function onPrev(index: number): void {
    const viableIndex = getFirstViableIndex(index - 1, false);
    if (isDefined(viableIndex)) moveFocus(viableIndex);
}

/** Focus the first viable item. */
function onHomePressed(): void {
    const viableIndex = getFirstViableIndex(0, true);
    if (isDefined(viableIndex)) moveFocus(viableIndex);
}

/** Focus the last viable item. */
function onEndPressed(): void {
    const viableIndex = getFirstViableIndex(items.value.length - 1, false);
    if (isDefined(viableIndex)) moveFocus(viableIndex);
}

/** Set focus on a step item or click it if `activateOnFocus`. */
function moveFocus(index: number): void {
    if (index < 0 || index >= items.value.length) return;
    const item = items.value[index];

    if (props.activateOnFocus) {
        itemClick(item);
    } else {
        const el = rootRef.value?.querySelector<HTMLElement>(
            `#tab-${item.identifier}`,
        );
        el?.focus();
    }
}

/**
 * Get the first 'viable' child, starting at startingIndex and in the direction specified
 * by the boolean parameter forward. In other words, first try to select the child at index
 * startingIndex, and if it is not visible or it is disabled, then go to the index in the
 * specified direction until either returning to startIndex or finding a viable child item.
 */
function getFirstViableIndex(
    startingIndex: number,
    forward: boolean,
): number | undefined {
    const direction = forward ? 1 : -1;
    let newIndex = startingIndex;
    for (
        ;
        newIndex > 0 && newIndex < items.value.length;
        newIndex += direction
    ) {
        const item = items.value[newIndex];
        // Break if the item at this index is viable (not disabled and is visible)
        if (item.visible && !item.disabled && isItemClickable(item)) break;
    }

    if (newIndex < 0 || newIndex >= items.value.length) return undefined;
    return newIndex;
}

/** Activate next child and deactivate prev child */
function performAction(newValue: ModelValue): void {
    const oldValue = activeItem.value?.value;
    const oldItem = activeItem.value;
    const newItem =
        items.value.find((item) => item.value === newValue) || items.value[0];

    if (oldItem && newItem) {
        oldItem.deactivate(newItem.index);
        newItem.activate(oldItem.index);
    }

    nextTick(() => {
        vmodel.value = newValue;
        emits("change", newValue, oldValue);
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

const tablistClasses = defineClasses(
    ["listClass", "o-steps__list"],
    [
        "animatedClass",
        "o-steps__list--animated",
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
            :class="tablistClasses"
            role="tablist"
            :aria-label="ariaLabel"
            :aria-orientation="vertical ? 'vertical' : 'horizontal'">
            <li
                v-for="(childItem, index) in items"
                v-show="childItem.visible"
                :id="`tab-${childItem.identifier}`"
                :key="childItem.identifier"
                :class="childItem.stepClasses"
                role="tab"
                :tabindex="childItem.value === activeItem?.value ? 0 : -1"
                :aria-current="
                    childItem.value === activeItem?.value ? 'step' : undefined
                "
                :aria-controls="`tabpanel-${childItem.identifier}`"
                :aria-selected="childItem.value === activeItem?.value"
                @click="itemClick(childItem)"
                @keydown.enter.prevent="itemClick(childItem)"
                @keydown.space.prevent="itemClick(childItem)"
                @keydown.left.prevent="onPrev(childItem.index)"
                @keydown.right.prevent="onNext(childItem.index)"
                @keydown.home.prevent="onHomePressed"
                @keydown.end.prevent="onEndPressed">
                <span v-if="index > 0" :class="dividerClasses" />

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
            :previous="{ disabled: !hasPrev, action: () => activateItem(-1) }"
            :next="{ disabled: !hasNext, action: () => activateItem(1) }">
            <nav v-if="hasNavigation" :class="navigationClasses">
                <o-button
                    role="button"
                    :icon-left="iconPrev"
                    :icon-pack="iconPack"
                    icon-both
                    :disabled="!hasPrev"
                    :aria-label="ariaPreviousLabel"
                    @click.prevent="activateItem(-1)" />

                <o-button
                    role="button"
                    :icon-left="iconNext"
                    :icon-pack="iconPack"
                    icon-both
                    :disabled="!hasNext"
                    :aria-label="ariaNextLabel"
                    @click.prevent="activateItem(1)" />
            </nav>
        </slot>
    </div>
</template>
