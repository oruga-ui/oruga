<script setup lang="ts" generic="T">
import {
    computed,
    nextTick,
    ref,
    watch,
    watchEffect,
    useTemplateRef,
    onMounted,
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
     * @param value {unknown} - updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on step change event
     * @param value {unknown} - new step value
     * @param value {unknown} - old step value
     */
    change: [newValue: ModelValue, oldValue: ModelValue];
}>();

defineSlots<{
    /** Define the step items here */
    default?(): void;
    /**
     * Overrinextde step navigation
     * @param previous {{disabled: boolean, action: (): void }} - previous button configs
     * @param next {{disabled: boolean, action: (): void }} - next button configs
     */
    navigation?(props: {
        previous: { disabled: boolean; action: () => void };
        next: { disabled: boolean; action: () => void };
    }): void;
}>();

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
const provideData = computed<StepsComponent>(() => ({
    activeIndex: activeItem.value?.index ?? 0,
    labelPosition: props.labelPosition,
    vertical: props.vertical,
    variant: props.variant,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
}));

/** provide functionalities and data to child item components */
const { childItems, itemsCount } = useProviderParent<StepItemComponent<T>>({
    rootRef,
    data: provideData,
});

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

// #region --- Selected Item Feature ---

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

/** the active item */
const activeItem = ref<StepItem<T>>();

onMounted(() => {
    // set first step as default if not defined
    if (!vmodel.value) vmodel.value = childItems.value[0]?.data.value;
});

/** When v-model is changed set the new active step. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) activateItem(value);
    },
);

// set the active item immediate and every time the vmodel changes
watchEffect(() => {
    activeItem.value = isDefined(vmodel.value)
        ? childItems.value.find((item) => item.data.value === vmodel.value) ||
          childItems.value[0]
        : childItems.value[0];
});

const isTransitioning = computed(() =>
    childItems.value.some((item) => item.data.isTransitioning),
);

/** Activate a specific child item by value and deactivate the previous child item. */
function activateItem(newValue: ModelValue): void {
    const oldValue = activeItem.value?.data.value;
    const oldItem = activeItem.value;
    const newItem =
        childItems.value.find((item) => item.data.value === newValue) ||
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

/** Activate the item after or before the current active item. */
function moveActiveItem(fowardIndex: 1 | -1): void {
    const index = (activeItem.value?.index ?? 0) + fowardIndex;
    if (index < 0 || index >= itemsCount.value) return;
    const item = childItems.value[index];
    if (vmodel.value !== item.data.value) activateItem(item.data.value);
}

/** Item click listener, emit input event and change active child. */
function itemClick(item: StepItem<T>): void {
    if (!item.data || vmodel.value === item.data.value) return;
    if (!item.data.isClickable) return;
    activateItem(item.data.value);
}

/** Check if previous button is available. */
const hasPrev = computed(() =>
    isDefined(getFirstViableItem((activeItem.value?.index ?? 0) - 1, false)),
);

/** Check if next button is available. */
const hasNext = computed(() =>
    isDefined(getFirstViableItem((activeItem.value?.index ?? 0) + 1, true)),
);

/** Focus the next item if possible. */
function onNext(index: number): void {
    const item = getFirstViableItem(index + 1, true);
    if (isDefined(item)) moveFocus(item);
}

/** Focus the previous item if possible. */
function onPrev(index: number): void {
    const item = getFirstViableItem(index - 1, false);
    if (isDefined(item)) moveFocus(item);
}

/** Focus the first viable item. */
function onHomePressed(): void {
    if (itemsCount.value < 1) return;
    const item = getFirstViableItem(0, true);
    if (isDefined(item)) moveFocus(item);
}

/** Focus the last viable item. */
function onEndPressed(): void {
    if (itemsCount.value < 1) return;
    const item = getFirstViableItem(itemsCount.value - 1, false);
    if (isDefined(item)) moveFocus(item);
}

/** Set focus on a step item or click it if `activateOnFocus`. */
function moveFocus(item: StepItem<T>): void {
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
function getFirstViableItem(
    startingIndex: number,
    forward: boolean,
): StepItem<T> | undefined {
    const direction = forward ? 1 : -1;
    let newIndex = startingIndex;
    for (; newIndex > 0 && newIndex < itemsCount.value; newIndex += direction) {
        const item = childItems.value[newIndex];
        // Break if the item at this index is viable (not disabled and is visible)
        if (item.data.visible && !item.data.disabled) break;
    }

    if (newIndex < 0 || newIndex >= itemsCount.value) return undefined;
    return childItems.value[newIndex];
}

// #endregion --- Switch Item Events ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-steps"],
    [
        "sizeClass",
        "o-steps--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "verticalClass",
        "o-steps--vertical",
        null,
        computed(() => props.vertical),
    ],
    [
        "positionClass",
        "o-steps--position-",
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
        "o-steps__content--transitioning",
        null,
        isTransitioning,
    ],
);

const navigationClasses = defineClasses([
    "navigationClass",
    "o-steps__navigation",
]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div ref="rootElement" data-oruga="steps" :class="rootClasses">
        <ol
            :class="tablistClasses"
            role="tablist"
            :aria-label="ariaLabel"
            :aria-orientation="vertical ? 'vertical' : 'horizontal'">
            <li
                v-for="(item, index) in childItems"
                v-show="item.data.visible"
                :id="`tab-${item.identifier}`"
                :key="item.identifier"
                :class="item.data.stepClasses"
                role="tab"
                :tabindex="item.data.value === activeItem?.data.value ? 0 : -1"
                :aria-current="
                    item.data.value === activeItem?.data.value
                        ? 'step'
                        : undefined
                "
                :aria-controls="`tabpanel-${item.identifier}`"
                :aria-selected="item.data.value === activeItem?.data.value"
                @click="itemClick(item)"
                @keydown.enter.prevent="itemClick(item)"
                @keydown.space.prevent="itemClick(item)"
                @keydown.left.prevent="onPrev(item.index)"
                @keydown.right.prevent="onNext(item.index)"
                @keydown.home.prevent="onHomePressed"
                @keydown.end.prevent="onEndPressed">
                <span v-if="index > 0" :class="dividerClasses" />

                <div :class="markerClasses">
                    <o-icon
                        v-if="item.data.icon"
                        :class="item.data.iconClasses"
                        :icon="item.data.icon"
                        :pack="item.data.iconPack"
                        :size="size" />
                    <span v-else-if="item.data.step">
                        {{ item.data.step }}
                    </span>
                </div>

                <div :class="item.data.labelClasses">
                    {{ item.data.label }}
                </div>
            </li>
        </ol>

        <section :class="contentClasses">
            <slot>
                <o-step-item
                    v-for="option in normalizedOptions"
                    v-show="!option.hidden"
                    v-bind="option.attrs"
                    :key="option.key"
                    :value="option.value"
                    :label="option.label" />
            </slot>
        </section>

        <slot
            name="navigation"
            :previous="{
                disabled: !hasPrev,
                action: () => moveActiveItem(-1),
            }"
            :next="{ disabled: !hasNext, action: () => moveActiveItem(1) }">
            <nav v-if="hasNavigation" :class="navigationClasses">
                <o-button
                    role="button"
                    :icon-left="iconPrev"
                    :icon-pack="iconPack"
                    :disabled="!hasPrev"
                    :aria-label="ariaPreviousLabel"
                    @click.prevent="moveActiveItem(-1)" />

                <o-button
                    role="button"
                    :icon-left="iconNext"
                    :icon-pack="iconPack"
                    :disabled="!hasNext"
                    :aria-label="ariaNextLabel"
                    @click.prevent="moveActiveItem(1)" />
            </nav>
        </slot>
    </div>
</template>
