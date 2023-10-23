<script setup lang="ts">
import { computed, ref, watch, toValue } from "vue";

import OIcon from "../components/icon/Icon.vue";
import OSlotComponent from "@/utils/SlotComponent";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useClassProps,
    useComputedClass,
    useProviderParent,
    useVModelBinding,
} from "@/composables";
import { mod, isDefined } from "@/utils/helpers";
import type { TabItemComponent } from "./types";
import { nextTick } from "process";

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
     * Color of the control, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("tabs.variant"),
    },
    /**
     * Tab size, optional
     * @values small, medium, large
     */
    size: {
        type: String,
        default: () => getOption("tabs.size"),
    },
    /** Show tab in vertical layout */
    vertical: { type: Boolean, default: false },
    /**
     * Position of the tab, optional
     * @values left, centered, right
     */
    position: {
        type: String,
        default: undefined,
        validator: (value: string) =>
            ["left", "centered", "right"].indexOf(value) >= 0,
    },
    /** Destroy tab on hide */
    destroyOnHide: { type: Boolean, default: false },
    /**
     * Tab type
     * @values boxed, toggle
     */
    type: { type: String, default: "default" },
    /** Tabs will be expanded (full-width) */
    expanded: { type: Boolean, default: false },
    /** Tab will have an animation */
    animated: {
        type: Boolean,
        default: () => getOption("tabs.animated", true),
    },
    /** Show tab items multiline when there is no space */
    multiline: { type: Boolean, default: false },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "positionClass",
        "expandedClass",
        "verticalClass",
        "multilineClass",
        "navTabsClass",
        "navSizeClass",
        "navPositionClass",
        "navTypeClass",
        "contentClass",
        "transitioningClass",
        "tabItemWrapperClass",
    ]),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number} updated modelValue prop
     */
    (e: "update:modelValue", value: string | number): void;
}>();

const rootRef = ref();

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    activeId: activeId.value,
    type: props.type,
    vertical: props.vertical,
}));

/** Provide functionalities and data to child item components */
const { childItems, sortedItems } = useProviderParent<
    typeof provideData,
    TabItemComponent
>(rootRef, provideData);

const items = computed(() =>
    sortedItems.value.map((column) => ({
        index: column.index,
        identifier: column.identifier,
        ...toValue(column.data),
    })),
);

const activeId = useVModelBinding(props, emits);

/**  When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (activeId.value !== value) {
            performAction(value);
        }
    },
);

const activeItem = computed(() =>
    isDefined(activeId)
        ? items.value.find((item) => item.value === activeId.value)
        : items.value[0],
);

const activeIndex = computed(() =>
    items.value.findIndex((item) => item.value === activeId.value),
);

const isTransitioning = computed(() =>
    items.value.some((item) => item.isTransitioning),
);

/** Child click listener, emit input event and change active child. */
function childClick(child): void {
    if (activeId.value !== child.value) performAction(child.newValue);
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
    childClick(this.childItems[newIndex]);
}

/** Go to the next item or wrap around */
function next(): void {
    const newIndex = mod(activeIndex.value + 1, childItems.value.length);
    clickFirstViableChild(newIndex, true);
}

/** Go to the previous item or wrap around */
function prev(): void {
    const newIndex = mod(activeIndex.value - 1, childItems.value.length);
    clickFirstViableChild(newIndex, false);
}

/** Go to the first viable item */
function homePressed(): void {
    if (childItems.value.length < 1) return;
    clickFirstViableChild(0, true);
}

/** Go to the last viable item */
function endPressed(): void {
    if (childItems.value.length < 1) return;
    clickFirstViableChild(childItems.value.length - 1, false);
}

/** Activate next child and deactivate prev child */
function performAction(newId: number | string): void {
    const oldValue = activeId.value;
    const oldTab = isDefined(oldValue)
        ? items.value.find((item) => item.value === oldValue)[0]
        : items.value[0];
    activeId.value = newId;
    nextTick(() => {
        if (oldTab && activeItem.value) {
            oldTab.deactivate(activeItem.value.index);
            activeItem.value.activate(oldTab.index);
        }
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
    useComputedClass("tabItemWrapperClass", "o-tabs__nav-item-wrapper"),
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
</script>

<template>
    <div ref="rootRef" :class="rootClasses">
        <nav
            :class="navClasses"
            role="tablist"
            :aria-orientation="vertical ? 'vertical' : 'horizontal'">
            <slot name="start" />
            <div
                v-for="childItem in items"
                v-show="childItem.visible"
                :key="childItem.value"
                :class="itemWrapperClasses"
                role="tab"
                :aria-controls="`${childItem.value}-content`"
                :aria-selected="childItem.isActive ? 'true' : 'false'"
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
                    :class="childItem.headerClasses"
                    @click="childClick(childItem)"
                    @keydown.left.prevent="prev"
                    @keydown.right.prevent="next"
                    @keydown.up.prevent="prev"
                    @keydown.down.prevent="next"
                    @keydown.home.prevent="homePressed"
                    @keydown.end.prevent="endPressed" />
                <component
                    :is="childItem.tag"
                    v-else
                    :class="childItem.headerClasses"
                    @click="childClick(childItem)">
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
            <slot name="end" />
        </nav>

        <section :class="contentClasses">
            <slot />
        </section>
    </div>
</template>
