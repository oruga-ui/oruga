<script setup lang="ts">
import { computed, ref, watch, toValue, nextTick, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";
import OSlotComponent from "@/utils/SlotComponent";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { mod, isDefined } from "@/utils/helpers";
import {
    useComputedClass,
    useProviderParent,
    useVModelBinding,
} from "@/composables";

import type { TabItem, TabItemComponent } from "./types";
import type { ComponentClass, PropBind } from "@/types";

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

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** @model */
    modelValue: { type: [String, Number], default: 0 },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("tabs.variant"),
    },
    /**
     * Tab size
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("tabs.size"),
    },
    /** Show tab in vertical layout */
    vertical: {
        type: Boolean,
        default: () => getOption("tabs.vertical", false),
    },
    /**
     * Position of the tabs
     * @values left, centered, right
     */
    position: {
        type: String,
        default: undefined,
        validator: (value: string) =>
            ["left", "centered", "right"].indexOf(value) >= 0,
    },
    /**
     * Tab type
     * @values boxed, toggle
     */
    type: { type: String, default: () => getOption("tabs.type", "default") },
    /** Tabs will be expanded (full-width) */
    expanded: { type: Boolean, default: false },
    /** Tab will have an animation */
    animated: {
        type: Boolean,
        default: () => getOption("tabs.animated", true),
    },
    /** Show tab items multiline when there is no space */
    multiline: { type: Boolean, default: false },
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    verticalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    multilineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    navTabsClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    navSizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    navPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    navTypeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    transitioningClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemWrapperClass: {
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

const rootRef = ref();

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    activeId: activeId.value,
    type: props.type,
    vertical: props.vertical,
}));

/** Provide functionalities and data to child item components */
const { sortedItems } = useProviderParent<TabItemComponent>(rootRef, {
    data: provideData,
});

const items = computed<TabItem[]>(() =>
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

const activeIndex = computed(() => activeItem.value.index);

function isActive(item: TabItem): boolean {
    return item.value === activeItem.value.value;
}

const isTransitioning = computed(() =>
    items.value.some((item) => item.isTransitioning),
);

/** Item click listener, emit input event and change active child. */
function itemClick(item: TabItem): void {
    if (activeId.value !== item.value) performAction(item.value);
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
    itemClick(items.value[newIndex]);
}

/** Activate next child and deactivate prev child */
function performAction(newId: number | string): void {
    const oldValue = activeId.value;
    const oldTab = isDefined(oldValue)
        ? items.value.find((item) => item.value === oldValue)
        : items.value[0];
    activeId.value = newId;
    nextTick(() => {
        if (oldTab && activeItem.value) {
            oldTab.deactivate(activeItem.value.index);
            activeItem.value.activate(oldTab.index);
        }
        emits("change", newId, oldValue);
    });
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-tabs"),
    {
        [useComputedClass("positionClass", "o-tabs--", props.position)]:
            props.position && props.vertical,
    },
    {
        [useComputedClass("expandedClass", "o-tabs--fullwidth")]:
            props.expanded,
    },
    {
        [useComputedClass("verticalClass", "o-tabs--vertical")]: props.vertical,
    },
    {
        [useComputedClass("multilineClass", "o-tabs--multiline")]:
            props.multiline,
    },
]);

const itemWrapperClasses = computed(() => [
    useComputedClass("itemWrapperClass", "o-tabs__nav-item-wrapper"),
]);

const navClasses = computed(() => [
    useComputedClass("navTabsClass", "o-tabs__nav"),
    {
        [useComputedClass("navSizeClass", "o-tabs__nav--", props.size)]:
            props.size,
    },
    {
        [useComputedClass("navPositionClass", "o-tabs__nav--", props.position)]:
            props.position && !props.vertical,
    },
    {
        [useComputedClass("navTypeClass", "o-tabs__nav--", props.type)]:
            props.type,
    },
]);

const contentClasses = computed(() => [
    useComputedClass("contentClass", "o-tabs__content"),
    {
        [useComputedClass(
            "transitioningClass",
            "o-tabs__content--transitioning",
        )]: isTransitioning.value,
    },
]);

function itemHeaderClasses(childItem): PropBind {
    return [
        childItem.headerClass,
        useComputedClass("itemHeaderClass", "o-tabs__nav-item"),
        {
            [useComputedClass(
                "itemHeaderTypeClass",
                "o-tabs__nav-item-",
                props.type,
            )]: props.type,
        },
        {
            [useComputedClass(
                "itemHeaderActiveClass",
                "o-tabs__nav-item-{*}--active",
                props.type,
            )]: isActive(childItem),
        },
        {
            [useComputedClass(
                "itemHeaderDisabledClass",
                "o-tabs__nav-item-{*}--disabled",
                props.type,
            )]: childItem.disabled,
        },
    ];
}
</script>

<template>
    <div ref="rootRef" :class="rootClasses" data-oruga="tabs">
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
                :key="childItem.value"
                :class="itemWrapperClasses"
                role="tab"
                :aria-controls="`${childItem.value}-content`"
                :aria-selected="isActive(childItem) ? 'true' : 'false'"
                @keydown.left.prevent="prev"
                @keydown.right.prevent="next"
                @keydown.up.prevent="prev"
                @keydown.down.prevent="next"
                @keydown.home.prevent="homePressed"
                @keydown.end.prevent="endPressed">
                <o-slot-component
                    v-if="childItem.$slots.header"
                    :component="childItem"
                    :tag="childItem.tag"
                    name="header"
                    :class="itemHeaderClasses(childItem)"
                    @click="itemClick(childItem)"
                    @keydown.left.prevent="prev"
                    @keydown.right.prevent="next"
                    @keydown.up.prevent="prev"
                    @keydown.down.prevent="next"
                    @keydown.home.prevent="homePressed"
                    @keydown.end.prevent="endPressed" />
                <component
                    :is="childItem.tag"
                    v-else
                    :class="itemHeaderClasses(childItem)"
                    @click="itemClick(childItem)">
                    <o-icon
                        v-if="childItem.icon"
                        :root-class="childItem.headerIconClasses"
                        :icon="childItem.icon"
                        :pack="childItem.iconPack"
                        :size="size" />
                    <span :class="childItem.headerTextClasses">
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
            <slot />
        </section>
    </div>
</template>
