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

// provided data is a computed ref to ensure reactivity
const provideData = computed<TabsComponent>(() => ({
    activeIndex: activeItem.value?.index ?? 0,
    type: props.type,
    vertical: props.vertical,
    animated: props.animated,
    animation: props.animation,
    animateInitially: props.animateInitially,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<TabItemComponent<T>>({
    rootRef,
    data: provideData,
});

const items = computed<TabItem<T>[]>(() => {
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
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

/**  When v-model is changed set the new active tab. */
watch(
    () => props.modelValue,
    (value) => {
        if (vmodel.value !== value) performAction(value as T);
    },
);

/** the active item */
const activeItem = ref<TabItem<T>>();

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

onMounted(() => {
    // set first tab as default if not defined
    if (!vmodel.value) vmodel.value = items.value[0]?.value;
});

// --- EVENT HANDLER ---

/** Tab item click listener, emit input event and change active child. */
function itemClick(item: TabItem<T>): void {
    if (vmodel.value !== item.value) performAction(item.value);
}

/** Focus the next item or wrap around. */
function onNext(event: KeyboardEvent, index: number): void {
    if (
        (props.vertical && event.key == "ArrowDown") ||
        (!props.vertical && event.key == "ArrowRight")
    ) {
        const newIndex = mod(index + 1, items.value.length);
        const item = getFirstViableItem(newIndex, true);
        moveFocus(item);
    }
}

/** Focus the previous item or wrap around. */
function onPrev(event: KeyboardEvent, index: number): void {
    if (
        (props.vertical && event.key == "ArrowUp") ||
        (!props.vertical && event.key == "ArrowLeft")
    ) {
        const newIndex = mod(index - 1, items.value.length);
        const item = getFirstViableItem(newIndex, false);
        moveFocus(item);
    }
}

/** Focus to the first viable item. */
function onHomePressed(): void {
    if (items.value.length < 1) return;
    const item = getFirstViableItem(0, true);
    moveFocus(item);
}

/** Focus to the last viable item. */
function onEndPressed(): void {
    if (items.value.length < 1) return;
    const item = getFirstViableItem(items.value.length - 1, false);
    moveFocus(item);
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
        newIndex = mod(newIndex + direction, items.value.length)
    ) {
        // Break if the item at this index is viable (not disabled and is visible)
        if (items.value[newIndex].visible && !items.value[newIndex].disabled)
            break;
    }

    return items.value[newIndex];
}

/** Activate next child and deactivate prev child. */
function performAction(newValue: ModelValue): void {
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

const tablistClasses = defineClasses(["tablistClass", "o-tabs__tablist"]);

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
                v-for="childItem in items"
                v-show="childItem.visible"
                :id="`tab-${childItem.identifier}`"
                :key="childItem.identifier"
                :component="childItem"
                :tag="childItem.tag"
                name="header"
                :class="childItem.tabClasses"
                role="tab"
                :tabindex="childItem.value === activeItem?.value ? 0 : -1"
                :aria-current="
                    childItem.value === activeItem?.value ? 'true' : undefined
                "
                :aria-controls="`tabpanel-${childItem.identifier}`"
                :aria-selected="childItem.value === activeItem?.value"
                @click="itemClick(childItem)"
                @keydown.enter.prevent="itemClick(childItem)"
                @keydown.space.prevent="itemClick(childItem)"
                @keydown.left.prevent="onPrev($event, childItem.index)"
                @keydown.right.prevent="onNext($event, childItem.index)"
                @keydown.up.prevent="onPrev($event, childItem.index)"
                @keydown.down.prevent="onNext($event, childItem.index)"
                @keydown.home.prevent="onHomePressed"
                @keydown.end.prevent="onEndPressed">
                <o-icon
                    v-if="childItem.icon"
                    :class="childItem.iconClasses"
                    :icon="childItem.icon"
                    :pack="childItem.iconPack"
                    :size="size" />
                <span :class="childItem.labelClasses">
                    {{ childItem.label }}
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
