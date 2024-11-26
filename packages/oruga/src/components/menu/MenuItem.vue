<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    useProviderChild,
    useProviderParent,
    type ProviderItem,
} from "@/composables";

import type {
    MenuComponent,
    MenuItemComponent,
    MenuItemProvider,
} from "./types";
import type { MenuItemProps } from "./props";

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

const props = withDefaults(defineProps<MenuItemProps>(), {
    override: undefined,
    active: false,
    label: undefined,
    expanded: false,
    disabled: false,
    icon: undefined,
    iconPack: () => getDefault("menu.iconPack"),
    iconSize: () => getDefault("menu.iconSize"),
    animation: () => getDefault("menu.animation", "slide"),
    tag: () => getDefault("menu.menuTag", "button"),
    ariaRole: () => getDefault("menu.itemAriaRole", "menuitem"),
});

defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    "update:active": [value: boolean];
    /**
     * expanded prop two-way binding
     * @param value {boolean} updated expanded prop
     */
    "update:expanded": [value: boolean];
}>();

const providedData = computed<MenuItemComponent>(() => ({
    reset,
}));

/** inject functionalities and data from the parent menu component */
const { parent, item } = useProviderChild<MenuComponent, MenuItemComponent>({
    data: providedData,
});

/** inject functionalities and data from the parent menu-item component */
const providedItem = useProviderChild<MenuItemProvider>({
    key: "menu-item",
    needParent: false,
});

const isActive = defineModel<boolean>("active", { default: false });

const isExpanded = defineModel<boolean>("expanded", { default: false });

/** template identifier */
const identifier = computed(() =>
    providedItem.parent.value
        ? `menu-item-${providedItem.item.value?.identifier}`
        : `menu-${item.value.identifier}`,
);

function onClick(): void {
    if (props.disabled) return;
    triggerReset();
    if (parent.value.accordion) isExpanded.value = !isExpanded.value;
    if (parent.value.activable) isActive.value = !isActive.value;
}

function triggerReset(child?: ProviderItem<MenuItemComponent>): void {
    // The point of this method is to collect references to the clicked item and any parent,
    // this way we can skip resetting those elements.
    if (typeof providedItem.parent.value?.triggerReset === "function") {
        providedItem.parent.value.triggerReset(item.value);
    }
    // else if not a sub item reset parent menu
    else if (typeof parent.value.resetMenu === "function") {
        parent.value.resetMenu(child ? [item.value, child] : [item.value]);
    }
}

function reset(): void {
    if (parent.value.accordion) isExpanded.value = false;
    if (parent.value.activable) isActive.value = false;
}

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to enjure reactivity
const provideData = computed<MenuItemProvider>(() => ({
    triggerReset,
}));

/** provide functionalities and data to child item components */
useProviderParent({ rootRef, key: "menu-item", data: provideData });

// --- Computed Component Classes ---

const itemClasses = defineClasses(["itemClass", "o-menu__item"]);

const buttonClasses = defineClasses(
    ["itemButtonClass", "o-menu__item__button"],
    ["itemButtonActiveClass", "o-menu__item__button--active", null, isActive],
    [
        "itemButtonDisabledClass",
        "o-menu__item__button--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "itemButtonIconClass",
        "o-menu__item__button--icon",
        null,
        computed(() => !!props.icon),
    ],
);

const submenuClasses = defineClasses([
    "itemSubmenuClass",
    "o-menu__item__submenu",
]);
</script>

<template>
    <li
        ref="rootElement"
        :role="ariaRole"
        :class="itemClasses"
        data-oruga="menu-item"
        :data-id="identifier"
        aria-roledescription="item">
        <component
            :is="tag"
            v-bind="$attrs"
            :class="buttonClasses"
            role="button"
            :disabled="disabled"
            @keyup.enter="onClick()"
            @click="onClick()">
            <o-icon
                v-if="icon"
                :icon="icon"
                :pack="iconPack"
                :size="iconSize" />
            <!-- 
                @slot Override label
                @binding {boolean} expanded - item expanded state
                @binding {boolean} active - item active state
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
