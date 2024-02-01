<script setup lang="ts">
import { computed, ref, useSlots, type ComputedRef, type PropType } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { uuid } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

import type { StepsComponent } from "./types";
import type { ComponentClass, DynamicComponent } from "@/types";

/**
 * @displayName Step Item
 */
defineOptions({
    isOruga: true,
    name: "OStepItem",
    configField: "steps",
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Item value (it will be used as v-model of wrapper component) */
    value: { type: [String, Number], default: () => uuid() },
    /** Item label */
    label: { type: String, default: undefined },
    /** Step marker content (when there is no icon) */
    step: { type: [String, Number], default: undefined },
    /**
     * Default style for the step.
     * This will override parent type.
     * Could be used to set a completed step to "success" for example
     */
    variant: { type: String, default: undefined },
    /**
     * Item can be used directly to navigate.
     * If undefined, previous steps are clickable while the others are not
     */
    clickable: { type: Boolean, default: undefined },
    /** Show/hide item */
    visible: { type: Boolean, default: true },
    /** Icon on the left */
    icon: {
        type: String,
        default: () => getOption("steps.icon"),
    },
    /** Icon pack */
    iconPack: {
        type: String,
        default: () => getOption("steps.iconPack"),
    },
    /** Step item tag name */
    tag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption("steps.itemTag", "button"),
    },
    /** Role attribute to be passed to the div wrapper for better accessibility */
    role: {
        type: String,
        default: () => getOption("steps.ariaRole", "tab"),
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
    itemHeaderPreviousClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    itemHeaderVariantClass: {
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

const providedData = computed(() => ({
    ...props,
    $slots: slots,
    isTransitioning: isTransitioning.value,
    activate,
    deactivate,
}));

// Inject functionalities and data from the parent carousel component
const { parent, item } = useProviderChild<ComputedRef<StepsComponent>>({
    data: providedData,
});

const transitionName = ref();

const isActive = computed(() => parent.value.activeId === props.value);

const isTransitioning = ref(false);

/** Activate element, alter animation name based on the index. */
function activate(oldIndex: number): void {
    transitionName.value =
        item.value.index < oldIndex
            ? parent.value.vertical
                ? "slide-down"
                : "slide-next"
            : parent.value.vertical
              ? "slide-up"
              : "slide-prev";
    // emit event
    emits("activate");
}

/** Deactivate element, alter animation name based on the index. */
function deactivate(newIndex: number): void {
    transitionName.value =
        newIndex < item.value.index
            ? parent.value.vertical
                ? "slide-down"
                : "slide-next"
            : parent.value.vertical
              ? "slide-up"
              : "slide-prev";
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

const elementClasses = defineClasses(["itemClass", "o-steps__item"]);
</script>

<template>
    <Transition
        :name="transitionName"
        @after-enter="afterEnter"
        @before-leave="beforeLeave">
        <div
            v-show="isActive && visible"
            ref="rootRef"
            :class="elementClasses"
            :data-id="`steps-${item.identifier}`"
            data-oruga="steps-item"
            :role="role"
            aria-roledescription="item">
            <!-- 
                @slot Step item content
            -->
            <slot />
        </div>
    </Transition>
</template>
