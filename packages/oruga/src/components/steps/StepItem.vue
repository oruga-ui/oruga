<script setup lang="ts" generic="T, C extends Component">
import { computed, ref, useSlots, useId, type Component } from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses, useProviderChild } from "@/composables";

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
    disabled: false,
    visible: true,
    icon: () => getDefault("steps.icon"),
    iconPack: () => getDefault("steps.iconPack"),
    tag: () => getDefault("steps.itemTag", "button"),
    ariaRole: () => getDefault("steps.ariaRole", "tab"),
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
    navClasses: navItemClasses.value,
    classes: stepClasses.value,
    labelClasses: stepLabelClasses.value,
    iconClasses: stepIconClasses.value,
    isTransitioning: isTransitioning.value,
    activate,
    deactivate,
}));

// inject functionalities and data from the parent carousel component
const { parent, item } = useProviderChild<StepsComponent>({
    data: providedData,
});

const transitionName = ref();

const isActive = computed(() => item.value.index === parent.value.activeIndex);

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

/** shows if the step is clickable or not */
const isClickable = computed(
    () => props.clickable || item.value.index < parent.value.activeIndex,
);

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

const navItemClasses = defineClasses(
    ["navItemClass", "o-steps__nav-item"],
    [
        "navItemVariantClass",
        "o-steps__nav-item--",
        computed(() => parent.value?.variant || props.variant),
        computed(() => !!parent.value?.variant || !!props.variant),
    ],
    ["navItemActiveClass", "o-steps__nav-item--active", null, isActive],
    [
        "navItemPreviousClass",
        "o-steps__nav-item--previous",
        null,
        computed(() => item.value.index < parent.value?.activeIndex),
    ],
    [
        "navItemNextClass",
        "o-steps__nav-item--next",
        null,
        computed(() => item.value.index > parent.value?.activeIndex),
    ],
);

const stepClasses = defineClasses(
    ["stepClass", "o-steps__step"],
    [
        "stepLabelPositionClass",
        "o-steps__step-label-",
        computed(() => parent.value?.labelPosition),
        computed(() => !!parent.value?.labelPosition),
    ],
    ["stepActiveClass", "o-steps__step--active", null, isActive],
    ["stepClickableClass", "o-steps__step--clickable", null, isClickable],
    [
        "stepDisabledClass",
        "o-steps__step--disabled",
        null,
        computed(() => props.disabled),
    ],
);

const stepLabelClasses = defineClasses([
    "stepLabelClass",
    "o-steps__step-label",
]);

const stepIconClasses = defineClasses(["stepIconClass", "o-steps__step-icon"]);

const panelClasses = defineClasses(["stepPanelClass", "o-steps__panel"]);
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
                v-bind="$attrs"
                :id="`tabpanel-${item.identifier}`"
                :class="panelClasses"
                :data-id="`steps-${item.identifier}`"
                data-oruga="steps-item"
                :aria-labelledby="`tab-${item.identifier}`"
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
