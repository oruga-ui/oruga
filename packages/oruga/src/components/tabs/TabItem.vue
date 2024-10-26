<script
    setup
    lang="ts"
    generic="T extends string | number | object, C extends Component">
import { computed, ref, useSlots, useId, type Component } from "vue";

import { getOption } from "@/utils/config";
import { isEqual } from "@/utils/helpers";
import { defineClasses, useProviderChild } from "@/composables";

import type { TabsComponent, TabItemComponent } from "./types";
import type { TabItemProps } from "./props";

/**
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
    icon: () => getOption("tabs.icon"),
    iconPack: () => getOption("tabs.iconPack"),
    tag: () => getOption("tabs.itemTag", "button"),
    ariaRole: () => getOption("tabs.ariaRole", "tabpanel"),
    content: undefined,
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /** on tab item activate event */
    (e: "activate"): void;
    /** on tab item deactivate event */
    (e: "deactivate"): void;
}>();

const itemValue = props.value || useId();

const slots = useSlots();

const providedData = computed<TabItemComponent<T>>(() => ({
    ...props,
    value: itemValue,
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

const tabLabelClasses = defineClasses(["tabLabelClass", "o-tabs__tab-label"]);

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
                :role="ariaRole"
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
                        @slot Override header label
                    -->
                    <slot name="header" />
                </template>
            </div>
        </template>
    </Transition>
</template>
