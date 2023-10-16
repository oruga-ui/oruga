<script setup lang="ts">
import { ref, computed, toRaw } from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useProviderParent,
    type ProviderItem,
} from "@/composables";

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
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
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
        default: getOption("menu.ariaRole", "menu"),
        validator: (value: string) =>
            ["menu", "list", "dialog"].indexOf(value) > -1,
    },
    /** Icon name to be shown */
    icon: { type: String, default: undefined },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("menu.iconPack", undefined),
    },
    /**
     * Icon size, optional
     * @values small, medium, large
     */
    iconSize: {
        type: String,
        default: () => getOption("menu.iconSize"),
    },
    // add class props (will not be displayed in the docs)
    ...useClassProps(["rootClass", "listClass", "listLabelClass"]),
});

const rootRef = ref();

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    activable: props.activable,
    accordion: props.accordion,
    resetMenu,
}));

/** Provide functionalities and data to child item components */
const { childItems } = useProviderParent(rootRef, provideData);

function resetMenu(excludedItems: ProviderItem[] = []): void {
    childItems.value.forEach((item) => {
        if (!excludedItems.includes(toRaw(item))) {
            console.log(item);
            item.data.reset();
        }
    });
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [useComputedClass("rootClass", "o-menu")]);

const listClasses = computed(() => [
    useComputedClass("listClass", "o-menu-list"),
]);

const labelClasses = computed(() => [
    useComputedClass("listLabelClass", "o-menu-label"),
]);
</script>

<template>
    <div ref="rootRef" :class="rootClasses">
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
