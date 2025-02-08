<script setup lang="ts" generic="T">
import { computed, ref, useId, useTemplateRef } from "vue";

import OIcon from "../icon/Icon.vue";
import OMenuItem from "../menu/MenuItem.vue";

import { getDefault } from "@/utils/config";
import { mod } from "@/utils/helpers";
import {
    defineClasses,
    isGroupOption,
    normalizeOptions,
    useProviderParent,
    useSequentialId,
    type ProviderItem,
} from "@/composables";

import type { MenuChildItem, MenuComponent, MenuItemComponent } from "./types";
import type { MenuProps } from "./props";

/**
 * A simple menu, for any type of vertical navigation.
 * @displayName Menu
 * @requires ./MenuItem.vue
 * @style _menu.scss
 */
defineOptions({
    isOruga: true,
    name: "OMenu",
    configField: "menu",
});

type ModelValue = MenuProps<T>["modelValue"];

const props = withDefaults(defineProps<MenuProps<T>>(), {
    override: undefined,
    modelValue: undefined,
    options: undefined,
    label: undefined,
    accordion: true,
    disabled: false,
    menuId: () => useId(),
    labelId: () => useId(),
    role: () => getDefault("menu.ariaRole", "tree"),
    icon: undefined,
    iconPack: () => getDefault("menu.iconPack"),
    iconSize: () => getDefault("menu.iconSize"),
});

defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
}>();

const rootRef = useTemplateRef("rootElement");

// provided data is a computed ref to enjure reactivity
const provideData = computed<MenuComponent<T>>(() => ({
    focsuedIdentifier: focusedItem.value?.identifier,
    menuId: props.menuId,
    accordion: props.accordion,
    disabled: props.disabled,
    role: props.role,
    nextSequence,
    resetMenu,
    selectItem,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<
    MenuItemComponent<T>,
    MenuComponent<T>
>({ rootRef, data: provideData });

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const normalizedOptions = computed(() =>
    normalizeOptions<T>(props.options, nextSequence),
);

/** call reset for every menu item excluding the given one */
function resetMenu(
    excludedItems: ProviderItem<MenuItemComponent<T>>[] = [],
): void {
    childItems.value.forEach((item) => {
        if (!excludedItems.map((i) => i?.identifier).includes(item.identifier))
            item.data?.reset();
    });
}

// #region --- Select Feature ---

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

const selectedItem = ref<MenuChildItem<T>>();

function selectItem(
    item: ProviderItem<MenuItemComponent<T>> | undefined,
): void {
    const value = item?.data?.value;
    if (vmodel.value == value) return;
    vmodel.value = value;
    selectedItem.value = item;
}

// #endregion --- Select Feature ---

// #region --- Focus Feature ---

const focusedItem = ref<MenuChildItem<T>>();

/** is any option visible */
const isNotEmpty = computed(() => childItems.value.some(isItemViable));

function onCollapse(): void {
    if (!focusedItem.value) return;

    // collapse the item if already expanded
    if (focusedItem.value.data?.expanded)
        focusedItem.value.data?.setExpand(false);
    // else move focus to the previus item
    else moveFocus(-1);
}

function onExpend(): void {
    if (!focusedItem.value) return;

    // expand the item if not already expanded
    if (
        focusedItem.value.data?.hasChildren &&
        !focusedItem.value.data?.expanded
    )
        focusedItem.value.data?.setExpand(true);
    // else move focus to the next item
    else moveFocus(1);
}

/** Set focus on a dropdown item. */
function setFocus(item: MenuChildItem<T>): void {
    focusedItem.value = item;
}

/** Set focus on a tab item. */
function moveFocus(delta: 1 | -1): void {
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(focusedItem.value?.index || 0, delta);
    setFocus(item);
}

function onUpPressed(): void {
    moveFocus(-1);
}

function onDownPressed(): void {
    moveFocus(1);
}

function onEnter(event: Event): void {
    if (!focusedItem.value) return;
    setFocus(focusedItem.value);
    focusedItem.value.data?.selectItem(event);
}

/** Go to the first viable item */
function onHomePressed(): void {
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(0, 1);
    setFocus(item);
}

/** Go to the last viable item */
function onEndPressed(): void {
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(childItems.value.length - 1, -1);
    setFocus(item);
}

/**
 * Get the first 'viable' child, starting at startingIndex and in the direction specified
 * by the boolean parameter forward. In other words, first try to select the child at index
 * startingIndex, and if it is not visible or it is disabled, then go to the index in the
 * specified direction until either returning to startIndex or finding a viable child item.
 */
function getFirstViableItem(
    startingIndex: number,
    delta: 1 | -1,
): MenuChildItem<T> {
    let newIndex = mod(
        focusedItem.value?.index == startingIndex
            ? startingIndex + delta
            : startingIndex,
        childItems.value.length,
    );
    for (
        ;
        newIndex !== focusedItem.value?.index;
        newIndex = mod(newIndex + delta, childItems.value.length)
    ) {
        // Break if the item at this index is viable (not disabled)
        if (isItemViable(childItems.value[newIndex])) break;
    }

    return childItems.value[newIndex];
}

function isItemViable(item: MenuChildItem<T>): boolean {
    return (
        !item.data?.disabled &&
        !item.data?.hidden &&
        (item.data?.parent?.expanded ?? true)
    );
}

// #endregion --- Focus Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(["rootClass", "o-menu"]);

const listClasses = defineClasses(["listClass", "o-menu__list"]);

const labelClasses = defineClasses(["labelClass", "o-menu__label"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <nav ref="rootElement" data-oruga="menu" :class="rootClasses">
        <div v-if="label || $slots.label" :id="labelId" :class="labelClasses">
            <!-- 
                @slot Override icon and label
                @binding {T} focused - the focused item value
                @binding {number} focusedIndex - index of the focused item
                @binding {T} selected - the selected item value
                @binding {number} selectedIndex - index of the selected item
            -->
            <slot
                name="label"
                :focused="focusedItem?.data"
                :focused-index="focusedItem?.index"
                :selected="selectedItem?.data"
                :selected-index="selectedItem?.index">
                <o-icon
                    v-if="icon"
                    :icon="icon"
                    :pack="iconPack"
                    :size="iconSize" />
                <span>{{ label }}</span>
            </slot>
        </div>

        <ul
            :id="menuId"
            :class="listClasses"
            :role="role"
            :tabindex="0"
            :aria-labelledby="labelId"
            @keydown.left="onCollapse"
            @keydown.right="onExpend"
            @keydown.enter="onEnter"
            @keydown.space="onEnter"
            @keydown.up.prevent="onUpPressed"
            @keydown.down.prevent="onDownPressed"
            @keydown.home.prevent="onHomePressed"
            @keydown.end.prevent="onEndPressed">
            <!--
                @slot Place menu items here 
                @binding {T} focused - the focused item value
                @binding {number} focusedIndex - index of the focused item
                @binding {T} selected - the selected item value
                @binding {number} selectedIndex - index of the selected item
            -->
            <slot
                :focused="focusedItem?.data"
                :focused-index="focusedItem?.index"
                :selected="selectedItem?.data"
                :selected-index="selectedItem?.index">
                <template v-for="option in normalizedOptions" :key="option.key">
                    <OMenuItem
                        v-if="isGroupOption(option)"
                        v-bind="option.attrs"
                        :label="option.label"
                        :hidden="option.hidden">
                        <OMenuItem
                            v-for="_option in option.options"
                            v-bind="_option.attrs"
                            :key="_option.key"
                            :value="_option.value"
                            :label="_option.label"
                            :hidden="_option.hidden" />
                    </OMenuItem>

                    <OMenuItem
                        v-else
                        v-bind="option.attrs"
                        :value="option.value"
                        :label="option.label"
                        :hidden="option.hidden" />
                </template>
            </slot>
        </ul>
    </nav>
</template>
