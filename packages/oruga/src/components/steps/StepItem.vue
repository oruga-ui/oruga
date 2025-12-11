<script setup lang="ts" generic="T, C extends Component">
import {
    computed,
    ref,
    useSlots,
    useId,
    useTemplateRef,
    type Component,
    type Ref,
    type ComputedRef,
    type VNode,
} from "vue";

import { getDefault } from "@/utils/config";
import { defineClasses, useProviderChild } from "@/composables";

import type { ClassBinding } from "@/types";
import type { StepsComponent, StepItemComponent } from "./types";
import type { StepItemProps } from "./props";

/**
 * An step item used by the steps component.
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
    content: undefined,
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /** on step item activate event */
    activate: [];
    /** on step item deactivate event */
    deactivate: [];
}>();

defineSlots<{
    /**
     * Define the step item content here
     * @param active {boolean} - if item is shown
     */
    default?(props: { active: boolean }): VNode[];
}>();

const itemValue = props.value ?? useId();

const rootRef = useTemplateRef("rootElement");

const slots = useSlots();

// provided data is a computed ref to ensure reactivity
const providedData = computed<StepItemComponent<T>>(() => ({
    value: itemValue as T,
    label: props.label,
    step: props.step,
    disabled: props.disabled,
    visible: props.visible,
    icon: props.icon,
    iconPack: props.iconPack,
    $slots: slots,
    stepClasses: stepClasses.value,
    iconClasses: stepIconClasses.value,
    labelClasses: stepLabelClasses.value,
    isClickable: isClickable.value,
    isTransitioning: isTransitioning.value,
    activate,
    deactivate,
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<StepsComponent, StepItemComponent<T>>(
    rootRef,
    { data: providedData },
);

const isActive = computed(() => item.value.index === parent.value.activeIndex);

const transitionName = ref<string>();
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

const itemVariant = computed(() => parent.value.variant ?? props.variant);

/** Shows if the item is clickable or not. */
// strongly type this variable to prevent circular type dependency
// because `parent` is used inside and the variable is used by the parent
const isClickable: ComputedRef<boolean> = computed(
    () =>
        !props.disabled &&
        (props.clickable || item.value.index < parent.value.activeIndex),
);

/** Activate element, alter animation name based on the index. */
function activate(oldIndex: number): void {
    transitionName.value =
        item.value.index < oldIndex ? nextAnimation.value : prevAnimation.value;
    emits("activate");
}

/** Deactivate element, alter animation name based on the index. */
function deactivate(newIndex: number): void {
    transitionName.value =
        newIndex < item.value.index ? nextAnimation.value : prevAnimation.value;
    emits("deactivate");
}

/** Transition start hook. */
function onTransitionStart(): void {
    isTransitioning.value = true;
}

/** Transition end hook. */
function onTransitionEnd(): void {
    isTransitioning.value = false;
}

// #region --- Computed Component Classes ---

// strongly type this variable to prevent circular type dependency
// because `parent` is used in the definition of any class
// and the variable is used by the parent
const stepClasses: Ref<ClassBinding[]> = defineClasses(
    ["stepClass", "o-steps__step"],
    [
        "stepVariantClass",
        "o-steps__step--",
        itemVariant,
        computed(() => !!itemVariant.value),
    ],
    [
        "stepPositionClass",
        "o-steps__step--",
        computed(() => parent.value?.labelPosition),
        computed(() => !!parent.value?.labelPosition),
    ],
    ["stepClickableClass", "o-steps__step--clickable", null, isClickable],
    ["stepActiveClass", "o-steps__step--active", null, isActive],
    [
        "stepDisabledClass",
        "o-steps__step--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "stepPreviousClass",
        "o-steps__step--previous",
        null,
        computed(() => item.value.index < parent.value?.activeIndex),
    ],
    [
        "stepNextClass",
        "o-steps__step--next",
        null,
        computed(() => item.value.index > parent.value?.activeIndex),
    ],
);

const stepLabelClasses = defineClasses([
    "stepLabelClass",
    "o-steps__step-label",
]);

const stepIconClasses = defineClasses(["stepIconClass", "o-steps__step-icon"]);

const panelClasses = defineClasses(["stepPanelClass", "o-steps__panel"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <Transition
        v-if="parent"
        :css="parent.animated"
        :name="transitionName"
        :appear="parent.animateInitially"
        @before-enter="onTransitionStart"
        @after-enter="onTransitionEnd"
        @before-leave="onTransitionStart"
        @after-leave="onTransitionEnd">
        <div
            v-show="isActive && visible"
            v-bind="$attrs"
            :id="`tabpanel-${item.identifier}`"
            ref="rootElement"
            data-oruga="steps-item"
            :data-id="`steps-${item.identifier}`"
            :class="panelClasses"
            role="tabpanel"
            :hidden="!isActive"
            :aria-labelledby="`tab-${item.identifier}`"
            aria-roledescription="item">
            <slot :active="isActive && visible">
                <!-- injected component -->
                <component
                    :is="$props.component"
                    v-if="$props.component"
                    v-bind="$props.props"
                    v-on="$props.events || {}" />

                <!-- default content prop -->
                <template v-else>{{ content }}</template>
            </slot>
        </div>
    </Transition>
</template>
