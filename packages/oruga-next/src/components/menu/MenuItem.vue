<script setup lang="ts">
import {
    ref,
    computed,
    toRaw,
    type Component,
    type PropType,
    type Ref,
} from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    usePropBinding,
    useProviderChild,
    useProviderParent,
    type ProviderItem,
} from "@/composables";

/**
 * A menu list item
 * @displayName Menu Item
 */
defineOptions({
    isOruga: true,
    name: "OMenuItem",
    configField: "menu",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** The active state of the menu item, use v-model:active to make it two-way binding. */
    active: { type: Boolean, default: false },
    /** Menu item label */
    label: { type: String, default: undefined },
    /** Menu item will be expanded */
    expanded: { type: Boolean, default: false },
    /** Menu item will be disabled */
    disabled: { type: Boolean, default: false },
    /** Icon name to be shown */
    icon: { type: String, default: undefined },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("menu.iconPack"),
    },
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    iconSize: {
        type: String,
        default: () => getOption("menu.iconSize"),
    },
    /** Transition name to apply on menu list */
    animation: {
        type: String,
        default: () => getOption("menu.animation", "slide"),
    },
    /** Menu item tag name */
    tag: {
        type: [String, Object, Function] as PropType<string | Component>,
        default: () => getOption("menu.menuTag", "a"),
    },
    /**
     * Role attribute to be passed to the list item for better accessibility.
     * @values listitem, menuitem
     */
    ariaRole: {
        type: String,
        default: getOption("menu.itemAriaRole", "menuitem"),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "itemClass",
        "itemActiveClass",
        "itemDisabledClass",
        "itemIconTextClass",
        "itemSubmenuClass",
        "itemWrapperClass",
    ]),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {boolean} updated modelValue prop
     */
    (e: "update:modelValue", value: boolean): void;
    /**
     * expanded prop two-way binding
     * @param value {boolean} updated expanded prop
     */
    (e: "update:expanded", value: boolean): void;
}>();

const providedData = computed(() => ({
    reset,
}));

// Inject functionalities and data from the parent menu component
const { parent, item } = useProviderChild<Ref<any>>({
    data: providedData,
});

// Inject functionalities and data from the parent menu-item component
const providedItem = useProviderChild<
    Ref<{ triggerReset: typeof triggerReset } | undefined>
>({
    key: "menu-item",
    needParent: false,
});

const itemParent = computed(() => providedItem.parent?.value);

const isActive = usePropBinding("active", props, emits, { passive: true });

const isExpanded = usePropBinding("expanded", props, emits, { passive: true });

/** template identifier */
const identifier = computed(() =>
    itemParent.value
        ? `menu-item-${providedItem.item.value.identifier}`
        : `menu-${item.value.identifier}`,
);

function onClick(): void {
    if (props.disabled) return;
    triggerReset();
    isExpanded.value = props.expanded || !isExpanded.value;
    if (parent.value.activable) isActive.value = true;
}

function triggerReset(child?: ProviderItem): void {
    // The point of this method is to collect references to the clicked item and any parent,
    // this way we can skip resetting those elements.
    if (itemParent.value?.triggerReset) {
        itemParent.value.triggerReset(toRaw(item.value));
    }
    // else if not a sub item reset parent menu
    else if (parent.value.resetMenu) {
        parent.value.resetMenu([toRaw(item.value), child]);
    }
}

function reset(): void {
    if (parent.value.accordion) isExpanded.value = false;
    if (parent.value.activable) isActive.value = false;
}

const rootRef = ref();

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    triggerReset,
}));

/** Provide functionalities and data to child item components */
useProviderParent(rootRef, provideData, { key: "menu-item" });

// --- Computed Component Classes ---

const itemClasses = computed(() => [
    useComputedClass("itemClass", "o-menu-item"),
    {
        [useComputedClass("itemActiveClass", "o-menu-item--active")]:
            isActive.value,
    },
    {
        [useComputedClass("itemDisabledClass", "o-menu-item--disabled")]:
            props.disabled,
    },
    {
        [useComputedClass("itemIconTextClass", "o-menu-item--icon-text")]:
            props.icon,
    },
]);

const submenuClasses = computed(() => [
    useComputedClass("itemSubmenuClass", "o-menu-item__submenu"),
]);

const wrapperClasses = computed(() => [
    useComputedClass("itemWrapperClass", "o-menu-item__wrapper"),
]);
</script>

<template>
    <li
        ref="rootRef"
        :role="ariaRole"
        :class="wrapperClasses"
        :data-id="identifier">
        <component
            :is="tag"
            v-bind="$attrs"
            :class="itemClasses"
            @click="onClick()">
            <o-icon
                v-if="icon"
                :icon="icon"
                :pack="iconPack"
                :size="iconSize" />
            <!-- 
                @slot Override label
            -->
            <slot name="label" :expanded="isExpanded" :active="isActive">
                <span>{{ label }}</span>
            </slot>
        </component>

        <!-- sub menu items -->
        <template v-if="$slots.default">
            <transition :name="animation">
                <ul v-show="isExpanded" :class="submenuClasses">
                    <!--
                        @slot Place menu items here 
                    -->
                    <slot />
                </ul>
            </transition>
        </template>
    </li>
</template>
