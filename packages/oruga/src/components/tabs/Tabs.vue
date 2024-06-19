<script setup lang="ts" generic="T extends string | number | object">
import { computed, ref, watch, toValue, nextTick, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";
import OSlotComponent from "../utils/SlotComponent";

import { getOption } from "@/utils/config";
import { mod, isDefined } from "@/utils/helpers";
import {
    defineClasses,
    getActiveClasses,
    useProviderParent,
} from "@/composables";

import type { TabsComponent, TabItem, TabItemComponent } from "./types";
import type { ComponentClass, ClassBind } from "@/types";

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
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * @model
     * @type string|number|object
     */
    modelValue: {
        type: [String, Number, Object] as PropType<T>,
        default: 0,
    },
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
    /** Destroy tabItem on hide */
    destroyOnHide: { type: Boolean, default: false },
    /** Tab will have an animation */
    animated: {
        type: Boolean,
        default: () => getOption("tabs.animated", true),
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
        default: () => getOption("tabs.animateInitially", false),
    },
    /** Show tab items multiline when there is no space */
    multiline: { type: Boolean, default: false },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of Tabs component when when is vertical and its position changes */
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of Tabs component when expanded */
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of Tabs component when vertical */
    verticalClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of Tabs component when multiline */
    multilineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Tabs component nav tabs */
    navTabsClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Size of the navigation */
    navSizeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the Tabs component nav position */
    navPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Type of the navigation */
    navTypeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab content */
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab content when transitioning */
    transitioningClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item wrapper */
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
    (e: "update:modelValue", value: T): void;
    /**
     * on tab change event
     * @param value {string | number} new tab value
     * @param value {string | number} old tab value
     */
    (e: "change", newValue: T, oldValue: T): void;
}>();

const rootRef = ref();

// Provided data is a computed ref to enjure reactivity.
const provideData = computed<TabsComponent<T>>(() => ({
    activeValue: vmodel.value,
    type: props.type,
    vertical: props.vertical,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
    destroyOnHide: props.destroyOnHide,
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

const vmodel = defineModel<T>({ default: undefined });

/**  When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) performAction(value as T);
    },
);

const activeItem = computed(() =>
    isDefined(vmodel.value)
        ? items.value.find((item) => item.value === vmodel.value) ||
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
    itemClick(items.value[newIndex]);
}

/** Activate next child and deactivate prev child */
function performAction(newId: T): void {
    const oldId = vmodel.value;
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
    ["rootClass", "o-tabs"],
    [
        "positionClass",
        "o-tabs--",
        computed(() => props.position),
        computed(() => props.position && props.vertical),
    ],
    [
        "expandedClass",
        "o-tabs--fullwidth",
        null,
        computed(() => props.expanded),
    ],
    ["verticalClass", "o-tabs--vertical", null, computed(() => props.vertical)],
    [
        "multilineClass",
        "o-tabs--multiline",
        null,
        computed(() => props.multiline),
    ],
);

const itemWrapperClasses = defineClasses([
    "itemWrapperClass",
    "o-tabs__nav-item-wrapper",
]);

const navClasses = defineClasses(
    ["navTabsClass", "o-tabs__nav"],
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
        computed(() => props.position && !props.vertical),
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

function itemHeaderClasses(
    childItem: (typeof items.value)[number],
): ClassBind[] {
    const classes = defineClasses(
        ["itemHeaderClass", "o-tabs__nav-item"],
        ["itemHeaderTypeClass", "o-tabs__nav-item-", props.type, !!props.type],
        [
            "itemHeaderActiveClass",
            "o-tabs__nav-item-{*}--active",
            props.type,
            isActive(childItem),
        ],
        [
            "itemHeaderDisabledClass",
            "o-tabs__nav-item-{*}--disabled",
            props.type,
            childItem.disabled,
        ],
    );
    const headerClass = { [childItem.headerClass || ""]: true };

    return [headerClass, ...classes.value];
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
                :key="childItem.identifier"
                :class="itemWrapperClasses"
                role="tab"
                :aria-controls="`${childItem.value}-content`"
                :aria-selected="isActive(childItem) ? 'true' : 'false'">
                <o-slot-component
                    v-if="childItem.$slots.header"
                    :component="childItem"
                    :tag="childItem.tag"
                    name="header"
                    :class="itemHeaderClasses(childItem)"
                    @click="itemClick(childItem)"
                    @keydown.enter="itemClick(childItem)"
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
                    :class="itemHeaderClasses(childItem)"
                    @click="itemClick(childItem)"
                    @keydown.enter="itemClick(childItem)"
                    @keydown.left.prevent="prev"
                    @keydown.right.prevent="next"
                    @keydown.up.prevent="prev"
                    @keydown.down.prevent="next"
                    @keydown.home.prevent="homePressed"
                    @keydown.end.prevent="endPressed">
                    <o-icon
                        v-if="childItem.icon"
                        :root-class="
                            getActiveClasses(childItem.headerIconClasses)
                        "
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
