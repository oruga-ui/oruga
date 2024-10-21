<script setup lang="ts" generic="T extends string | number | object">
import {
    computed,
    ref,
    useSlots,
    useId,
    type PropType,
    type Component,
} from "vue";

import { getOption } from "@/utils/config";
import { isEqual } from "@/utils/helpers";
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
    inheritAttrs: false,
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * Item value (it will be used as v-model of wrapper component) - default is an uuid
     * @type string|number|object
     */
    value: {
        type: [String, Number, Object] as PropType<T>,
        default: () => useId(),
    },
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
    /** Text content, unnecessary when default slot is used */
    content: { type: String, default: undefined },
    /** Component to be injected. */
    component: {
        type: [Object, Function] as PropType<Component>,
        default: undefined,
    },
    /** Props to be binded to the injected component */
    props: { type: Object, default: () => ({}) }, // todo: type this right
    /** Events to be binded to the injected component */
    events: { type: Object, default: () => ({}) }, // todo: type this right
    // class props (will not be displayed in the docs)
    /** Class of the tab item */
    tabPanelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item */
    tabClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item when active */
    tabActiveClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item when disabled */
    tabDisabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item type */
    tabTypeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item icon */
    tabIconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the tab item label */
    tabLabelClass: {
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
    classes: tabClasses.value,
    iconClasses: tabIconClasses.value,
    labelClasses: tabLabelClasses.value,
    isTransitioning: isTransitioning.value,
    activate,
    deactivate,
}));

// Inject functionalities and data from the parent component
const { parent, item } = useProviderChild<TabsComponent<T>>({
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

const tabClasses = defineClasses(
    ["tabClass", "o-tabs__tab"],
    ["tabTypeClass", "o-tabs__tab--", parent.value.type, !!parent.value.type],
    ["tabActiveClass", "o-tabs__tab--active", null, isActive],
    [
        "tabDisabledClass",
        "o-tabs__tab--disabled",
        null,
        computed(() => props.disabled),
    ],
);

const tabIconClasses = defineClasses(["tabIconClass", "o-tabs__tab-icon"]);

const tabLabelClasses = defineClasses(["tabTextClass", "o-tabs__tab-text"]);

const panelClasses = defineClasses(["tabPanelClass", "o-tabs__panel"]);
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
                :data-id="`tabs-${item.identifier}`"
                data-oruga="tabs-item"
                role="tabpanel"
                :aria-labelledby="`tab-${item.identifier}`"
                :tabindex="isActive ? 0 : -1"
                aria-roledescription="item">
                <!-- 
                    @slot Tab item content
                -->
                <slot>
                    <!-- injected component -->
                    <component
                        :is="component"
                        v-if="component"
                        v-bind="$props.props"
                        v-on="$props.events" />

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
                        @slot Override header label
                    -->
                    <slot name="header" />
                </template>
            </div>
        </template>
    </Transition>
</template>
