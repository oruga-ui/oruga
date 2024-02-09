<script setup lang="ts">
import { computed, ref, useSlots, type ComputedRef, type PropType } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import { useComputedClass, useProviderChild } from "@/composables";

import type { TabsComponent, TabItemComponent } from "./types";
import type { ComponentClass, DynamicComponent } from "@/types";

/**
 * @displayName Tab Item
 */
defineOptions({
    isOruga: true,
    name: "OTabItem",
    configField: "tabs",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Item value (it will be used as v-model of wrapper component) */
    value: { type: [String, Number], default: () => uuid() },
    /** Item label */
    label: { type: String, default: undefined },
    /** Item will be disabled */
    disabled: { type: Boolean, default: false },
    /** Icon on the left */
    icon: {
        type: String,
        default: () => getOption("tabs.icon"),
    },
    /** Icon pack */
    iconPack: {
        type: String,
        default: () => getOption("tabs.iconPack"),
    },
    /** Show/hide item */
    visible: { type: Boolean, default: true },
    /** Tabs item tag name */
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption("tabs.itemTag", "button"),
    },
    /** Role attribute to be passed to the div wrapper for better accessibility. */
    ariaRole: {
        type: String,
        default: () => getOption("tabs.ariaRole", "tab"),
    },
    /** Sets a class to the item header */
    headerClass: { type: String, default: undefined },
    // class props (will not be displayed in the docs)
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderActiveClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderDisabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderTypeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderIconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderTextClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /** on tab item activate event */
    (e: "activate"): void;
    /** on tab item deactivate event */
    (e: "deactivate"): void;
}>();

const slots = useSlots();

const providedData = computed<TabItemComponent>(() => ({
    ...props,
    $slots: slots,
    headerIconClasses: headerIconClasses.value,
    headerTextClasses: headerTextClasses.value,
    isTransitioning: isTransitioning.value,
    activate,
    deactivate,
}));

// Inject functionalities and data from the parent carousel component
const { parent, item } = useProviderChild<ComputedRef<TabsComponent>>({
    data: providedData,
});

const transitionName = ref();

const isActive = computed(() => parent.value.activeId === props.value);

const isTransitioning = ref(false);

/** Activate element, alter animation name based on the index. */
function activate(oldIndex: number): void {
    transitionName.value =
        parent.value.animation || 
        (item.value.index < oldIndex
            ? parent.value.vertical
                ? "slide-down"
                : "slide-next"
            : parent.value.vertical
              ? "slide-up"
              : "slide-prev");
    // emit event
    emits("activate");
}

/** Deactivate element, alter animation name based on the index. */
function deactivate(newIndex: number): void {
    transitionName.value =
        parent.value.animation || 
        (newIndex < item.value.index
            ? parent.value.vertical
                ? "slide-down"
                : "slide-next"
            : parent.value.vertical
              ? "slide-up"
              : "slide-prev");
    // emit event
    emits("deactivate");
}

/** Transition after-enter hook */
function afterEnter(): void {
    isTransitioning.value = true;
}

/** Transition before-leave hook */
function beforeLeave(): void {
    isTransitioning.value = true;
}

// --- Computed Component Classes ---

const elementClasses = computed(() => [
    useComputedClass("itemClass", "o-tab-item__content"),
]);

const headerIconClasses = computed(() => [
    useComputedClass("itemHeaderIconClass", "o-tabs__nav-item-icon"),
]);

const headerTextClasses = computed(() => [
    useComputedClass("itemHeaderTextClass", "o-tabs__nav-item-text"),
]);
</script>

<template>
    <Transition
        :name="transitionName"
        :appear="parent.animateInitially"
        @after-enter="afterEnter"
        @before-leave="beforeLeave">
        <div
            v-show="isActive && visible"
            ref="rootRef"
            :class="elementClasses"
            :data-id="`tabs-${item.identifier}`"
            data-oruga="tabs-item"
            :tabindex="isActive ? 0 : -1"
            :role="ariaRole">
            <!-- 
                @slot Tab item content
            -->
            <slot />
        </div>
    </Transition>
</template>
