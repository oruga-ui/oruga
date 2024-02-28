<script setup lang="ts">
import { computed, ref, useSlots, type ComputedRef, type PropType } from "vue";

import { getOption } from "@/utils/config";
import { isEqual, uuid } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

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
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
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
        default: () => getOption<DynamicComponent>("tabs.itemTag", "button"),
    },
    /** Role attribute to be passed to the div wrapper for better accessibility. */
    ariaRole: {
        type: String,
        default: () => getOption("tabs.ariaRole", "tab"),
    },
    /** Sets a class to the item header */
    headerClass: { type: String, default: undefined },
    // class props (will not be displayed in the docs)
    /** Class of the tab item */
    itemClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item header */
    itemHeaderClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item header when active */
    itemHeaderActiveClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item header when disabled */
    itemHeaderDisabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item header type */
    itemHeaderTypeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item header icon */
    itemHeaderIconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item header text */
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

// Inject functionalities and data from the parent component
const { parent, item } = useProviderChild<ComputedRef<TabsComponent>>({
    data: providedData,
});

const transitionName = ref();

const isActive = computed(() => isEqual(props.value, parent.value.activeValue));

const isTransitioning = ref(false);

const nextAnimation = computed(() => {
    const idx =
        parent.value.vertical && parent.value.animation.length === 4 ? 2 : 0;
    return parent.value.animation[idx];
});

const prevAnimation = computed(() => {
    const idx =
        parent.value.vertical && parent.value.animation.length === 4 ? 3 : 1;
    return parent.value.animation[idx];
});

/** Activate element, alter animation name based on the index. */
function activate(oldIndex: number): void {
    transitionName.value =
        item.value.index < oldIndex ? nextAnimation.value : prevAnimation.value;

    // emit event
    emits("activate");
}

/** Deactivate element, alter animation name based on the index. */
function deactivate(newIndex: number): void {
    transitionName.value =
        newIndex < item.value.index ? nextAnimation.value : prevAnimation.value;

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

const elementClasses = defineClasses(["itemClass", "o-tab-item__content"]);

const headerIconClasses = defineClasses([
    "itemHeaderIconClass",
    "o-tabs__nav-item-icon",
]);

const headerTextClasses = defineClasses([
    "itemHeaderTextClass",
    "o-tabs__nav-item-text",
]);
</script>

<template>
    <Transition
        :disabled="!parent.animated"
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
            :role="ariaRole"
            aria-roledescription="item">
            <!-- 
                @slot Tab item content
            -->
            <slot />
        </div>
    </Transition>
</template>
