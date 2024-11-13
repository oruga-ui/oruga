<script setup lang="ts">
import { computed, useTemplateRef, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    useProviderParent,
    type ProviderItem,
} from "@/composables";

import type { MenuComponent, MenuItemComponent } from "./types";
import type { ComponentClass } from "@/types";

/**
 * A simple menu
 * @displayName Menu
 * @requires ./MenuItem.vue
 * @style _menu.scss
 */
defineOptions({
    isOruga: true,
    name: "OMenu",
    configField: "menu",
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Menu label */
    label: { type: String, default: undefined },
    /** If sub menu items are collapsible */
    accordion: { type: Boolean, default: true },
    /** If the menu items are clickable */
    activable: { type: Boolean, default: true },
    /**
     * Role attribute to be passed to the list container for better accessibility.
     * Use menu only in situations where your dropdown is related to a navigation menu.
     * @values list, menu, dialog
     */
    ariaRole: {
        type: String,
        default: () => getDefault("menu.ariaRole", "menu"),
        validator: (value: string) =>
            ["menu", "list", "dialog"].indexOf(value) > -1,
    },
    /** Icon to be shown */
    icon: { type: String, default: undefined },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getDefault("menu.iconPack"),
    },
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize: {
        type: String,
        default: () => getDefault("menu.iconSize"),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu list */
    listClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the menu list label */
    listLabelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to enjure reactivity
const provideData = computed<MenuComponent>(() => ({
    activable: props.activable,
    accordion: props.accordion,
    resetMenu,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<MenuItemComponent>(rootRef, {
    data: provideData,
});

function resetMenu(
    excludedItems: ProviderItem<MenuItemComponent>[] = [],
): void {
    childItems.value.forEach((item) => {
        if (!excludedItems.map((i) => i?.identifier).includes(item.identifier))
            item.data?.reset();
    });
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(["rootClass", "o-menu"]);

const listClasses = defineClasses(["listClass", "o-menu__list"]);

const labelClasses = defineClasses(["listLabelClass", "o-menu__label"]);
</script>

<template>
    <div ref="rootElement" data-oruga="menu" :class="rootClasses">
        <div v-if="label || $slots.label" :class="labelClasses">
            <!-- 
                @slot Override icon and label
            -->
            <slot name="label">
                <o-icon
                    v-if="icon"
                    :icon="icon"
                    :pack="iconPack"
                    :size="iconSize" />
                <span>{{ label }}</span>
            </slot>
        </div>

        <ul :class="listClasses" :role="ariaRole">
            <!--
                @slot Place menu items here 
            -->
            <slot />
        </ul>
    </div>
</template>
