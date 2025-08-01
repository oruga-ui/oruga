<script setup lang="ts" generic="T, C extends Component">
import {
    computed,
    ref,
    useSlots,
    useId,
    useTemplateRef,
    type Component,
} from "vue";

import PlainButton from "../utils/PlainButton";

import { getDefault } from "@/utils/config";
import { defineClasses, useProviderChild } from "@/composables";

import type { TabsComponent, TabItemComponent } from "./types";
import type { TabItemProps } from "./props";

/**
 * An tab item used by the tabs component.
 * @displayName Tab Item
 */
defineOptions({
    isOruga: true,
    name: "OTabItem",
    configField: "tabs",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<TabItemProps<T, C>>(), {
    override: undefined,
    value: undefined,
    label: undefined,
    disabled: false,
    visible: true,
    icon: () => getDefault("tabs.icon"),
    iconPack: () => getDefault("tabs.iconPack"),
    tag: () => getDefault("tabs.itemTag", PlainButton),
    content: undefined,
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /** on tab item activate event */
    activate: [];
    /** on tab item deactivate event */
    deactivate: [];
}>();

const itemValue = props.value ?? useId();

const rootRef = useTemplateRef("rootElement");

const slots = useSlots();

// provided data is a computed ref to ensure reactivity
const providedData = computed<TabItemComponent<T>>(() => ({
    ...props,
    value: itemValue,
    $slots: slots,
    tabClasses: tabClasses.value,
    iconClasses: tabIconClasses.value,
    labelClasses: tabLabelClasses.value,
    isTransitioning: isTransitioning.value,
    activate,
    deactivate,
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<TabsComponent, TabItemComponent<T>>(
    rootRef,
    { data: providedData },
);

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

// #region --- Computed Component Classes ---

const tabClasses = defineClasses(
    ["tabClass", "o-tabs__tab"],
    ["tabActiveClass", "o-tabs__tab--active", null, isActive],
    [
        "tabDisabledClass",
        "o-tabs__tab--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "tabPreviousClass",
        "o-tabs__tab--previous",
        null,
        computed(() => item.value.index < parent.value?.activeIndex),
    ],
    [
        "tabNextClass",
        "o-tabs__tab--next",
        null,
        computed(() => item.value.index > parent.value?.activeIndex),
    ],
);

const tabIconClasses = defineClasses(["tabIconClass", "o-tabs__tab-icon"]);

const tabLabelClasses = defineClasses(["tabLabelClass", "o-tabs__tab-label"]);

const panelClasses = defineClasses(["tabPanelClass", "o-tabs__panel"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <Transition
        v-if="parent"
        :css="parent.animated"
        :name="transitionName"
        :appear="parent.animateInitially"
        @after-enter="afterEnter"
        @before-leave="beforeLeave">
        <div
            v-show="isActive && visible"
            v-bind="$attrs"
            :id="`tabpanel-${item.identifier}`"
            ref="rootElement"
            data-oruga="tabs-item"
            :data-id="`tabs-${item.identifier}`"
            :class="panelClasses"
            role="tabpanel"
            :hidden="!isActive"
            :aria-labelledby="`tab-${item.identifier}`"
            aria-roledescription="item">
            <!-- 
                @slot Override tab panel content
                @binding {boolean} active - if item is shown 
            -->
            <slot :active="isActive && visible">
                <!-- injected component -->
                <component
                    :is="component"
                    v-if="component"
                    v-bind="$props.props"
                    v-on="$props.events || {}" />

                <!-- default content prop -->
                <template v-else>{{ content }}</template>
            </slot>

            <!--
                Do not render these slots here.
                These are only for documentation purposes.
                Slots are defined in tabs component.
            -->
            <template v-if="false">
                <!--
                    @slot Override tab header label
                    @binding {boolean} active - if item is shown 
                -->
                <slot name="header" :active="isActive && visible" />
            </template>
        </div>
    </Transition>
</template>
