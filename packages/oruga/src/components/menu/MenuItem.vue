<script setup lang="ts" generic="T">
import { computed, ref, useId } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    normalizeOptions,
    useProviderChild,
    useProviderParent,
    type OptionsItem,
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

const props = withDefaults(defineProps<MenuItemProps<T>>(), {
    override: undefined,
    active: false,
    options: undefined,
    label: undefined,
    expanded: false,
    disabled: false,
    hidden: false,
    submenuId: () => useId(),
    icon: undefined,
    iconPack: () => getDefault("menu.iconPack"),
    iconSize: () => getDefault("menu.iconSize"),
    animation: () => getDefault("menu.animation", "slide"),
    tag: () => getDefault("menu.itemTag", "button"),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    "update:active": [value: boolean];
    /**
     * onclick event
     * @param value {string | number | object} value prop data
     * @param event {event} Native Event
     */
    click: [value: T, event: Event];
}>();

const itemValue = props.value ?? useId();

// provided data is a computed ref to enjure reactivity
const provideData = computed<MenuItemProvider<T>>(() => ({
    expanded: isExpanded.value,
    setExpand,
    triggerReset,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent({
    key: "menu-item",
    data: provideData,
});

/** inject functionalities and data from the parent menu-item component */
const menuItem = useProviderChild<MenuItemProvider<T>>({
    key: "menu-item",
    needParent: false,
});

// provided data is a computed ref to enjure reactivity
const providedData = computed<MenuItemComponent<T>>(() => ({
    ...props,
    value: itemValue,
    parent: menuItem.parent.value,
    hasChildren: hasChildren.value,
    expanded: isExpanded.value,
    setExpand,
    reset,
    selectItem,
}));

/** inject functionalities and data from the parent menu component */
const { parent, item } = useProviderChild<
    MenuComponent<T>,
    MenuItemComponent<T>
>({ data: providedData });

const nextSequence = parent.value.nextSequence;

/** normalized programamtic options */
const normalizedOptions = computed<OptionsItem<T>[]>(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

const isActive = defineModel<boolean>("active", { default: false });

const hasChildren = computed(() => !!childItems.value.length);

const isFocused = computed(
    () => item.value.identifier === parent.value.focsuedIdentifier,
);

function selectItem(event: Event): void {
    if (props.disabled || parent.value.disabled) return;
    triggerReset();
    isActive.value = !isActive.value;
    if (parent.value.accordion) isExpanded.value = isActive.value;
    parent.value.selectItem(isActive.value ? item.value : undefined);
    emits("click", itemValue as T, event);
}

function triggerReset(childs?: ProviderItem<MenuItemComponent<T>>[]): void {
    // The point of this method is to collect references to the clicked item and any parent,
    // this way we can skip resetting those elements.
    if (typeof menuItem.parent.value?.triggerReset === "function") {
        menuItem.parent.value.triggerReset(
            childs ? [item.value, ...childs] : [item.value],
        );
    }
    // else if not a sub item reset parent menu
    else if (typeof parent.value.resetMenu === "function") {
        parent.value.resetMenu(childs ? [item.value, ...childs] : [item.value]);
    }
}

const isExpanded = ref(props.expanded);
// always expand if not accordion feature
if (!parent.value.accordion) isExpanded.value = true;

function setExpand(state: boolean): void {
    if (!parent.value.accordion) return;
    isExpanded.value = state;

    if (typeof menuItem.parent.value?.setExpand === "function")
        menuItem.parent.value.setExpand(state);
}

function reset(): void {
    if (parent.value.accordion) isExpanded.value = false;
    isActive.value = false;
}

// #region --- Computed Component Classes ---

const itemClasses = defineClasses(
    ["itemClass", "o-menu__item"],
    ["itemActiveClass", "o-menu__item--active", null, isActive],
    ["itemFocusedClass", "o-menu__item--focused", null, isFocused],
    [
        "itemDisabledClass",
        "o-menu__item--disabled",
        null,
        computed(() => props.disabled || parent.value.disabled),
    ],
);

const buttonClasses = defineClasses(
    ["itemButtonClass", "o-menu__item__button"],
    ["itemButtonActiveClass", "o-menu__item__button--active", null, isActive],
    [
        "itemButtonFocusedClass",
        "o-menu__item__button--focused",
        null,
        isFocused,
    ],
    [
        "itemButtonDisabledClass",
        "o-menu__item__button--disabled",
        null,
        computed(() => props.disabled || parent.value.disabled),
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

// #endregion --- Computed Component Classes ---
</script>

<template>
    <li
        v-show="!hidden"
        :id="`${parent.menuId}-${item.identifier}`"
        data-oruga="menu-item"
        :data-id="`menu-${item.identifier}`"
        :class="itemClasses"
        role="none">
        <component
            :is="tag"
            v-bind="$attrs"
            :class="buttonClasses"
            :role="parent.role + 'item'"
            :disabled="disabled || parent.disabled"
            tabindex="-1"
            :aria-selected="parent.role == 'tree' ? isActive : undefined"
            :aria-disabled="disabled || parent.disabled"
            :aria-expanded="hasChildren ? isExpanded : undefined"
            :aria-owns="hasChildren ? submenuId : undefined"
            @keyup.enter="selectItem"
            @click="selectItem">
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
        <transition v-if="$slots.default || options" :name="animation">
            <ul
                v-show="isExpanded"
                :id="submenuId"
                :class="submenuClasses"
                tabindex="-1"
                role="group">
                <!--
                        @slot Place menu items here 
                    -->
                <slot>
                    <OMenuItem
                        v-for="option in normalizedOptions"
                        :key="option.key"
                        v-bind="option.attrs"
                        :value="option.value"
                        :label="option.label"
                        :hidden="option.hidden" />
                </slot>
            </ul>
        </transition>
    </li>
</template>
