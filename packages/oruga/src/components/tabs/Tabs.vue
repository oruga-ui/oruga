<script setup lang="ts" generic="T">
import {
    computed,
    ref,
    watch,
    watchEffect,
    toValue,
    nextTick,
    onMounted,
    useTemplateRef,
} from "vue";

import OTabItem from "../tabs/TabItem.vue";
import OIcon from "../icon/Icon.vue";
import OSlotComponent from "../utils/SlotComponent";

import { getDefault } from "@/utils/config";
import { mod, isDefined } from "@/utils/helpers";
import {
    defineClasses,
    normalizeOptions,
    useProviderParent,
    useSequentialId,
} from "@/composables";

import type { TabsComponent, TabItem, TabItemComponent } from "./types";
import type { TabsProps } from "./props";

/**
 * Responsive horizontal navigation tabs, switch between contents with ease
 * @displayName Tabs
 * @requires ./TabItem.vue
 * @style _tabs.scss
 */
defineOptions({
    isOruga: true,
    name: "OTabs",
    configField: "tabs",
});

type ModelValue = TabsProps<T>["modelValue"];

const props = withDefaults(defineProps<TabsProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    options: undefined,
    variant: () => getDefault("tabs.variant"),
    size: () => getDefault("tabs.size"),
    vertical: () => getDefault("tabs.vertical", false),
    position: undefined,
    type: () => getDefault("tabs.type", "default"),
    expanded: false,
    destroyOnHide: false,
    animated: () => getDefault("tabs.animated", true),
    animation: () =>
        getDefault("tabs.animation", [
            "slide-next",
            "slide-prev",
            "slide-down",
            "slide-up",
        ]),
    animateInitially: () => getDefault("tabs.animateInitially", false),
    multiline: false,
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on tab change event
     * @param value {T} new tab value
     * @param value {T} old tab value
     */
    change: [newValue: ModelValue, oldValue: ModelValue];
}>();

const rootRef = useTemplateRef("rootElement");

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

// Provided data is a computed ref to enjure reactivity.
const provideData = computed<TabsComponent>(() => ({
    activeIndex: activeItem.value?.index || 0,
    type: props.type,
    vertical: props.vertical,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
    destroyOnHide: props.destroyOnHide,
}));

/** Provide functionalities and data to child item components */
const { sortedItems } = useProviderParent<TabItemComponent<T>>(rootRef, {
    data: provideData,
});

const items = computed<TabItem<T>[]>(() =>
    sortedItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data!),
    })),
);

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const groupedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

/**  When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) performAction(value as T);
    },
);

const activeItem = ref<TabItem<T>>(
    items.value.find((item) => item.value === props.modelValue) ||
        items.value[0],
);

watchEffect(() => {
    activeItem.value = isDefined(vmodel.value)
        ? items.value.find((item) => item.value === vmodel.value) ||
          items.value[0]
        : items.value[0];
});

const activeIndex = computed(() => activeItem.value.index);

const isTransitioning = computed(() =>
    items.value.some((item) => item.isTransitioning),
);

onMounted(() => {
    // set first tab as default if not defined
    if (!vmodel.value) vmodel.value = items.value[0]?.value as T;
});

// --- EVENT HANDLER ---

/** Tab item click listener, emit input event and change active child. */
function tabClick(item: TabItem<T>): void {
    if (vmodel.value !== item.value) performAction(item.value as T);
}

/** Go to the next item or wrap around */
function next(): void {
    const newIndex = mod(activeIndex.value + 1, items.value.length);
    clickFirstViableChild(newIndex, true);
}

/** Go to the previous item or wrap around */
function prev(): void {
    const newIndex = mod(activeIndex.value - 1, items.value.length);
    clickFirstViableChild(newIndex, false);
}

/** Go to the first viable item */
function homePressed(): void {
    if (items.value.length < 1) return;
    clickFirstViableChild(0, true);
}

/** Go to the last viable item */
function endPressed(): void {
    if (items.value.length < 1) return;
    clickFirstViableChild(items.value.length - 1, false);
}

/**
 * Select the first 'viable' child, starting at startingIndex and in the direction specified
 * by the boolean parameter forward. In other words, first try to select the child at index
 * startingIndex, and if it is not visible or it is disabled, then go to the index in the
 * specified direction until either returning to startIndex or finding a viable child item.
 */
function clickFirstViableChild(startingIndex: number, forward: boolean): void {
    const direction = forward ? 1 : -1;
    let newIndex = startingIndex;
    for (
        ;
        newIndex !== activeIndex.value;
        newIndex = mod(newIndex + direction, items.value.length)
    ) {
        // Break if the item at this index is viable (not disabled and is visible)
        if (items.value[newIndex].visible && !items.value[newIndex].disabled)
            break;
    }
    tabClick(items.value[newIndex]);
}

/** Activate next child and deactivate prev child */
function performAction(newValue: T): void {
    const oldValue = vmodel.value;
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
    ["rootClass", "o-tabs"],
    [
        "positionClass",
        "o-tabs--",
        computed(() => props.position),
        computed(() => !!props.position && props.vertical),
    ],
    ["expandedClass", "o-tabs--expanded", null, computed(() => props.expanded)],
    ["verticalClass", "o-tabs--vertical", null, computed(() => props.vertical)],
    [
        "multilineClass",
        "o-tabs--multiline",
        null,
        computed(() => props.multiline),
    ],
);

const navClasses = defineClasses(
    ["navClass", "o-tabs__nav"],
    [
        "navSizeClass",
        "o-tabs__nav--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "navPositionClass",
        "o-tabs__nav--",
        computed(() => props.position),
        computed(() => !!props.position && !props.vertical),
    ],
    [
        "navTypeClass",
        "o-tabs__nav--",
        computed(() => props.type),
        computed(() => !!props.type),
    ],
);

const contentClasses = defineClasses(
    ["contentClass", "o-tabs__content"],
    [
        "transitioningClass",
        "o-tabs__content--transitioning",
        null,
        isTransitioning,
    ],
);
</script>

<template>
    <div ref="rootElement" :class="rootClasses" data-oruga="tabs">
        <nav
            :class="navClasses"
            role="tablist"
            :aria-orientation="vertical ? 'vertical' : 'horizontal'">
            <!--
                @slot Additional slot before tabs
            -->
            <slot name="start" />

            <div
                v-for="childItem in items"
                v-show="childItem.visible"
                :id="`tab-${childItem.identifier}`"
                :key="childItem.identifier"
                :class="childItem.navClasses"
                role="tab"
                :aria-controls="`tabpanel-${childItem.identifier}`"
                :aria-selected="childItem.value === activeItem.value">
                <o-slot-component
                    v-if="childItem.$slots.header"
                    :component="childItem"
                    :tag="childItem.tag"
                    name="header"
                    :class="childItem.classes"
                    @click="tabClick(childItem)"
                    @keydown.enter="tabClick(childItem)"
                    @keydown.left.prevent="prev"
                    @keydown.right.prevent="next"
                    @keydown.up.prevent="prev"
                    @keydown.down.prevent="next"
                    @keydown.home.prevent="homePressed"
                    @keydown.end.prevent="endPressed" />

                <component
                    :is="childItem.tag"
                    v-else
                    role="button"
                    :tabindex="0"
                    :class="childItem.classes"
                    @click="tabClick(childItem)"
                    @keydown.enter="tabClick(childItem)"
                    @keydown.left.prevent="prev"
                    @keydown.right.prevent="next"
                    @keydown.up.prevent="prev"
                    @keydown.down.prevent="next"
                    @keydown.home.prevent="homePressed"
                    @keydown.end.prevent="endPressed">
                    <o-icon
                        v-if="childItem.icon"
                        :class="childItem.iconClasses"
                        :icon="childItem.icon"
                        :pack="childItem.iconPack"
                        :size="size" />
                    <span :class="childItem.labelClasses">
                        {{ childItem.label }}
                    </span>
                </component>
            </div>

            <!--
                @slot Additional slot after tabs
            -->
            <slot name="end" />
        </nav>

        <section :class="contentClasses">
            <!--
                @slot Place tab items here
            -->
            <slot>
                <o-tab-item
                    v-for="option in groupedOptions"
                    v-show="!option.hidden"
                    v-bind="option.attrs"
                    :key="option.key"
                    :value="option.value"
                    :label="option.label" />
            </slot>
        </section>
    </div>
</template>
