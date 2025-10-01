<script setup lang="ts" generic="T">
import {
    computed,
    ref,
    watch,
    watchEffect,
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
 * Responsive horizontal navigation tabs, switch between contents with ease.
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
    tag: () => getDefault("tabs.tag", "div"),
    expanded: false,
    activateOnFocus: false,
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
    ariaLabel: () => getDefault("tabs.ariaLabel"),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {unknown} - updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on tab change event
     * @param value {unknown} - new tab value
     * @param value {unknown} - old tab value
     */
    change: [newValue: ModelValue, oldValue: ModelValue];
}>();

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to ensure reactivity
const provideData = computed<TabsComponent>(() => ({
    activeIndex: activeItem.value?.index ?? 0,
    type: props.type,
    vertical: props.vertical,
    variant: props.variant,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
}));

/** provide functionalities and data to child item components */
const { childItems, itemsCount } = useProviderParent<TabItemComponent<T>>({
    rootRef,
    data: provideData,
});

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

// #region --- Active Item Feature ---

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

onMounted(() => {
    // set first tab as default if not defined
    if (!vmodel.value) vmodel.value = childItems.value[0]?.data.value;
});

/** When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) activateItem(value);
    },
);

/** the active item */
const activeItem = ref<TabItem<T>>();

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

    if (oldItem?.data && newItem?.data) {
        oldItem.data.deactivate(newItem.index);
        newItem.data.activate(oldItem.index);
    }

    nextTick(() => {
        vmodel.value = newValue;
        emits("change", newValue, oldValue);
    });
}

// #endregion --- Active Item Feature ---

// #region --- Event Handler ---

/** Item click listener, emit input event and change active child. */
function itemClick(item: TabItem<T>): void {
    if (!item.data || vmodel.value === item.data.value) return;
    activateItem(item.data.value);
}

/** Focus the next item or wrap around. */
function onNext(event: KeyboardEvent, index: number): void {
    if (
        (props.vertical && event.key == "ArrowDown") ||
        (!props.vertical && event.key == "ArrowRight")
    ) {
        const newIndex = mod(index + 1, itemsCount.value);
        const item = getFirstViableItem(newIndex, true);
        if (isDefined(item)) moveFocus(item);
    }
}

/** Focus the previous item or wrap around. */
function onPrev(event: KeyboardEvent, index: number): void {
    if (
        (props.vertical && event.key == "ArrowUp") ||
        (!props.vertical && event.key == "ArrowLeft")
    ) {
        const newIndex = mod(index - 1, itemsCount.value);
        const item = getFirstViableItem(newIndex, false);
        if (isDefined(item)) moveFocus(item);
    }
}

/** Focus to the first viable item. */
function onHomePressed(): void {
    if (itemsCount.value < 1) return;
    const item = getFirstViableItem(0, true);
    if (isDefined(item)) moveFocus(item);
}

/** Focus to the last viable item. */
function onEndPressed(): void {
    if (itemsCount.value < 1) return;
    const item = getFirstViableItem(itemsCount.value - 1, false);
    if (isDefined(item)) moveFocus(item);
}

/** Set focus on a tab item or click it if `activateOnFocus`. */
function moveFocus(item: TabItem<T>): void {
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
): TabItem<T> {
    const direction = forward ? 1 : -1;
    let newIndex = startingIndex;
    for (
        ;
        newIndex !== activeItem.value?.index;
        newIndex = mod(newIndex + direction, itemsCount.value)
    ) {
        const item = childItems.value[newIndex];
        // Break if the item at this index is viable (not disabled and is visible)
        if (item.data.visible && !item.data.disabled) break;
    }

    return childItems.value[newIndex];
}

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-tabs"],
    [
        "positionClass",
        "o-tabs--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
    [
        "sizeClass",
        "o-tabs--",
        computed(() => props.size),
        computed(() => !!props.size),
    ],
    [
        "typeClass",
        "o-tabs--",
        computed(() => props.type),
        computed(() => !!props.type),
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

const tablistClasses = defineClasses(["listClass", "o-tabs__list"]);

const contentClasses = defineClasses(
    ["contentClass", "o-tabs__content"],
    [
        "transitioningClass",
        "o-tabs__content--transitioning",
        null,
        isTransitioning,
    ],
);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div ref="rootElement" data-oruga="tabs" :class="rootClasses">
        <component
            :is="props.tag"
            :class="tablistClasses"
            role="tablist"
            :aria-label="ariaLabel"
            :aria-orientation="vertical ? 'vertical' : 'horizontal'">
            <!--
                @slot Additional slot before tabs
            -->
            <slot name="before" />

            <o-slot-component
                v-for="item in childItems"
                v-show="item.data.visible"
                :id="`tab-${item.identifier}`"
                :key="item.identifier"
                :component="item.data"
                :tag="item.data.tag"
                name="header"
                :class="item.data.tabClasses"
                role="tab"
                :tabindex="item.data.value === activeItem?.data.value ? 0 : -1"
                :aria-current="
                    item.data.value === activeItem?.data.value
                        ? 'true'
                        : undefined
                "
                :aria-controls="`tabpanel-${item.identifier}`"
                :aria-selected="item.data.value === activeItem?.data.value"
                @click="itemClick(item)"
                @keydown.enter.prevent="itemClick(item)"
                @keydown.space.prevent="itemClick(item)"
                @keydown.left.prevent="onPrev($event, item.index)"
                @keydown.right.prevent="onNext($event, item.index)"
                @keydown.up.prevent="onPrev($event, item.index)"
                @keydown.down.prevent="onNext($event, item.index)"
                @keydown.home.prevent="onHomePressed"
                @keydown.end.prevent="onEndPressed">
                <o-icon
                    v-if="item.data.icon"
                    :class="item.data.iconClasses"
                    :icon="item.data.icon"
                    :pack="item.data.iconPack"
                    :size="size" />
                <span :class="item.data.labelClasses">
                    {{ item.data.label }}
                </span>
            </o-slot-component>

            <!--
                @slot Additional slot after tabs
            -->
            <slot name="after" />
        </component>

        <section :class="contentClasses">
            <!--
                @slot Place tab items here
            -->
            <slot>
                <o-tab-item
                    v-for="option in normalizedOptions"
                    v-show="!option.hidden"
                    v-bind="option.attrs"
                    :key="option.key"
                    :value="option.value"
                    :label="option.label" />
            </slot>
        </section>
    </div>
</template>
