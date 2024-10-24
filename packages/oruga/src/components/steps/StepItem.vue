<script
    setup
    lang="ts"
    generic="T extends string | number | object, C extends Component">
import { computed, ref, useSlots, useId, type Component } from "vue";

import { getOption } from "@/utils/config";
import { isEqual } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

import type { DynamicComponent } from "@/types";
import type { StepsComponent, StepItemComponent } from "./types";
import type { StepItemProps } from "./props";

/**
 * @displayName Step Item
 */
defineOptions({
    isOruga: true,
    name: "OStepItem",
    configField: "steps",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<StepItemProps<T, C>>(), {
    override: undefined,
    value: undefined,
    label: undefined,
    step: undefined,
    variant: undefined,
    clickable: undefined,
    visible: true,
    icon: () => getOption("steps.icon"),
    iconPack: () => getOption("steps.iconPack"),
    tag: () => getOption<DynamicComponent>("steps.itemTag", "button"),
    ariaRole: () => getOption("steps.ariaRole", "tab"),
    content: undefined,
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /** on step item activate event */
    (e: "activate"): void;
    /** on step item deactivate event */
    (e: "deactivate"): void;
}>();

const itemValue = props.value || useId();

const slots = useSlots();

const providedData = computed<StepItemComponent<T>>(() => ({
    ...props,
    value: itemValue,
    $slots: slots,
    classes: itemClasses.value,
    isTransitioning: isTransitioning.value,
    activate,
    deactivate,
}));

// inject functionalities and data from the parent carousel component
const { parent, item } = useProviderChild<StepsComponent<T>>({
    data: providedData,
});

const transitionName = ref();

const isActive = computed(() => isEqual(itemValue, parent.value.activeValue));

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

const elementClasses = defineClasses(["itemClass", "o-steps__item"]);

const itemClasses = defineClasses(
    ["itemHeaderClass", "o-steps__nav-item"],
    [
        "itemHeaderVariantClass",
        "o-steps__nav-item--",
        computed(() => parent.value?.variant || props.variant),
        computed(() => !!parent.value?.variant || !!props.variant),
    ],
    ["itemHeaderActiveClass", "o-steps__nav-item-active", null, isActive],
    [
        "itemHeaderPreviousClass",
        "o-steps__nav-item-previous",
        null,
        computed(() => item.value.index < parent.value?.activeIndex),
    ],
);
</script>

<template>
    <Transition
        v-if="parent"
        :css="parent.animated"
        :name="transitionName"
        :appear="parent.animateInitially"
        @after-enter="afterEnter"
        @before-leave="beforeLeave">
        <template v-if="!parent.destroyOnHide || (isActive && visible)">
            <div
                v-show="isActive && visible"
                ref="rootRef"
                v-bind="$attrs"
                :class="elementClasses"
                :data-id="`steps-${item.identifier}`"
                data-oruga="steps-item"
                :tabindex="isActive ? 0 : -1"
                :role="ariaRole"
                aria-roledescription="item">
                <!-- 
                    @slot Step item content
                -->
                <slot>
                    <!-- injected component -->
                    <component
                        :is="component"
                        v-if="component"
                        v-bind="$props.props"
                        v-on="$props.events || {}" />

                    <!-- default content prop -->
                    <template v-else>{{ content }}</template>
                </slot>
            </div>
        </template>
    </Transition>
</template>
