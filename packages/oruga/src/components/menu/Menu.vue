<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    useProviderParent,
    type ProviderItem,
} from "@/composables";

import type { MenuComponent, MenuItemComponent } from "./types";
import type { MenuProps } from "./props";

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

const props = withDefaults(defineProps<MenuProps>(), {
    override: undefined,
    label: undefined,
    accordion: true,
    activable: true,
    ariaRole: () => getDefault("menu.ariaRole", "menu"),
    icon: undefined,
    iconPack: () => getDefault("menu.iconPack"),
    iconSize: () => getDefault("menu.iconSize"),
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
