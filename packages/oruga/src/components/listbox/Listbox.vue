<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    ref,
    toValue,
    triggerRef,
    useId,
    useTemplateRef,
    watchEffect,
    type MaybeRefOrGetter,
} from "vue";

import OListboxItem from "../listbox/ListboxItem.vue";
import OInput from "@/components/input/Input.vue";

import { getDefault } from "@/utils/config";
import {
    checkOptionsEmpty,
    defineClasses,
    filterOptionsItems,
    isOptionViable,
    normalizeOptions,
    scrollElementInView,
    toOptionsGroup,
    toOptionsList,
    useProviderParent,
    useScrollEvents,
    useSequentialId,
    type OptionsGroupItem,
    type OptionsItem,
} from "@/composables";

import type { ListboxProps } from "./props";
import type {
    ListboxChildItem,
    ListboxComponent,
    ListboxItemComponent,
} from "./types";
import { isTrueish, mod, toCssDimension } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";

/**
 * Listbox is used to select one or more values from a list of items.
 * @displayName Listbox
 * @style _listbox.scss
 */
defineOptions({
    isOruga: true,
    name: "OListbox",
    configField: "listbox",
});

type ModelValue = ListboxProps<T, IsMultiple>["modelValue"];

const props = withDefaults(defineProps<ListboxProps<T, IsMultiple>>(), {
    override: undefined,
    modelValue: undefined,
    // multiple: false,
    options: undefined,
    selectable: false,
    selectOnFocus: false,
    scrollHeight: () => getDefault("listbox.scrollHeight", "225"),
    listTag: () => getDefault("listbox.listTag", "ul"),
    itemTag: () => getDefault("listbox.itemTag", "li"),
    animation: () => getDefault("listbox.animation", "fade"),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T | T[]} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * on select event - fired before update:modelValue
     * @param value {T} selected value
     */
    select: [value: T];
    /**
     * on filter change event
     * @param event {Event} native event
     */
    filter: [event: Event];
    /**
     * on list focus event
     * @param event {Event} native event
     */
    focus: [event: Event];
    /**
     * on list blur event
     * @param event {Event} native event
     */
    blur: [event: Event];
    /** scrolling the list reached the start */
    "scroll-start": [];
    /** scrolling the list inside reached it's end */
    "scroll-end": [];
}>();

const containerRef = useTemplateRef("containerElement");

const $id = useId();

// the selected item value, use v-model to make it two-way binding
const vmodel = defineModel<ModelValue>({ default: undefined });

// provided data is a computed ref to ensure reactivity
const provideData = computed<ListboxComponent<T>>(() => ({
    id: $id,
    disabled: props.disabled,
    multiple: isTrueish(props.multiple),
    selectable: props.selectable,
    selected: vmodel.value,
    focsuedIdentifier: focusedItem.value?.identifier,
    selectItem,
    focusItem,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<
    ListboxItemComponent<T>,
    ListboxComponent<T>
>({
    rootRef: containerRef,
    data: provideData,
});

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const groupedOptions = computed<OptionsGroupItem<T>[]>(() => {
    const normalizedOptions = normalizeOptions<T>(props.options, nextSequence);
    const groupedOptions = toOptionsGroup<T>(normalizedOptions, nextSequence());
    return groupedOptions;
});

function getOptionIndex(option: OptionsItem<T>): number {
    return childItems.value.findIndex(
        (child) => child.data?.value == option.value,
    );
}

/** is no option visible */
const isEmpty = computed(() => checkOptionsEmpty(groupedOptions));

const availableOptions = computed(() =>
    toOptionsList(groupedOptions).filter(isOptionViable),
);

const containerStyle = computed(() => ({
    "max-height": toCssDimension(props.scrollHeight),
}));

// #region --- Scroll Feature ---

// set infinite scroll handler
if (isClient && props.scrollHeight)
    useScrollEvents(containerRef, {
        onScrollEnd: () => emits("scroll-end"),
        onScrollStart: () => emits("scroll-start"),
    });

// #endregion --- Scroll Handler ---

// #region --- Filter Feature ---

const filterValue = ref<string>("");

// if not backend filtered
if (!props.backendFiltering)
    /**
     * Applies an reactive filter for the options based on the input value.
     * Options are filtered by setting the hidden attribute.
     */
    watchEffect(() => {
        // filter options by input value
        filterOptionsItems<T>(groupedOptions, (o) =>
            filterItems(o, filterValue),
        );
        // trigger reactive update of groupedOptions
        triggerRef(groupedOptions);
    });

function filterItems(
    option: OptionsItem<T>,
    value: MaybeRefOrGetter<string>,
): boolean {
    if (typeof props.filter === "function")
        return props.filter(option.value, toValue(value));
    else
        return !String(option.label)
            .toLowerCase()
            .includes(toValue(value)?.toLowerCase());
}

function onFilterChange(_: string, event: Event): void {
    emits("filter", event);
    focusedItem.value = undefined;
}

// #endregion --- Filter Handler ---

// #region --- Select Feature ---

/** Click listener for the item component. */
function selectItem(item: ListboxChildItem<T>): void {
    const value = item.data!.value!;
    emits("select", value);

    if (props.selectable) {
        // set selected option
        if (isTrueish(props.multiple)) {
            if (vmodel.value && Array.isArray(vmodel.value)) {
                if (!vmodel.value.includes(value)) {
                    // add a value
                    vmodel.value = [...vmodel.value, value] as ModelValue;
                } else {
                    // remove a value
                    vmodel.value = vmodel.value.filter(
                        (val) => val !== value,
                    ) as ModelValue;
                }
            } else {
                // init new value array
                vmodel.value = [value] as ModelValue;
            }
        } else {
            if (vmodel.value !== value) {
                // update a single value
                vmodel.value = value as ModelValue;
            }
        }
    }
}

// #endregion --- Select Feature ---

// #region --- Focus Feature ---

const isFocused = ref(false);
const focusedItem = ref<ListboxChildItem<T>>();

/** Select the current focused item. */
function selectFocusedItem(event: Event): void {
    if (!focusedItem.value) return;
    setFocus(focusedItem.value);
    focusedItem.value.data?.selectItem(event);
}

/** Hover listener for the item component. */
function focusItem(value: ListboxChildItem<T>): void {
    focusedItem.value = value;
}

/** Set focus on an item. */
function setFocus(item: ListboxChildItem<T>): void {
    if (props.selectOnFocus && item.data?.value) selectItem(item);

    // set item as focused
    focusedItem.value = item;

    // scroll item into view
    scrollElementInView(containerRef, item.el);
}

/** Set focus on a tab item. */
function moveFocus(delta: 1 | -1): void {
    if (isEmpty.value) return;
    const item = getFirstViableItem(focusedItem.value?.index || 0, delta);
    setFocus(item);
}

/** Move the focus one element up the list. */
function moveFocusUp(): void {
    moveFocus(-1);
}

/** Move the focus one element down the list. */
function moveFocusDown(): void {
    moveFocus(1);
}

/** Go to the first viable item. */
function focusFirstItem(): void {
    if (!isEmpty.value) return;
    const item = getFirstViableItem(0, 1);
    setFocus(item);
}

/** Go to the last viable item. */
function focusLastItem(): void {
    if (!isEmpty.value) return;
    const item = getFirstViableItem(childItems.value.length - 1, -1);
    setFocus(item);
}

function onFocus(event: Event): void {
    isFocused.value = true;
    focusFirstItem();
    emits("focus", event);
}

function onBlur(event: Event): void {
    isFocused.value = false;
    focusedItem.value = undefined;
    filterValue.value = "";
    emits("blur", event);
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
): ListboxChildItem<T> {
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
        const item = childItems.value[newIndex];
        // Break if the item at this index is viable (not disabled or hidden)
        if (!item.data?.disabled && !item.data?.hidden) break;
    }

    return childItems.value[newIndex];
}

// #endregion --- Focus Handler ---

// --- Computed Component Classes ---

const rootClasses = defineClasses(["rootClass", "o-listbox"]);

const headerClasses = defineClasses(["headerClass", "o-listbox__header"]);

const footerClasses = defineClasses(["footerClass", "o-listbox__footer"]);

const filterClasses = defineClasses(["filterClass", "o-listbox__filter"]);

const containerClasses = defineClasses([
    "containerClass",
    "o-listbox__container",
]);

const listClasses = defineClasses(["listClass", "o-listbox__list"]);

const itemEmptyClasses = defineClasses([
    "itemEmptyClass",
    "o-listbox__list__item--empty",
]);
</script>

<template>
    <div data-oruga="listbox" :class="rootClasses">
        <div v-if="$slots.header" :class="headerClasses">
            <!--
                @slot Define an additional header
            -->
            <slot name="header" />
        </div>

        <div v-if="filterable" :class="filterClasses">
            <slot name="searchable" :value="filterValue">
                <o-input
                    v-model="filterValue"
                    name="search"
                    type="search"
                    role="searchbox"
                    autocomplete="off"
                    :placeholder="filtersPlaceholder"
                    :disabled="disabled"
                    :icon="filtersIcon"
                    :pack="iconPack"
                    size="small"
                    aria-label="listbox search input"
                    :aria-owns="$id + '_list'"
                    :aria-activedescendant="
                        focusedItem
                            ? `${$id}-${focusedItem.identifier}`
                            : undefined
                    "
                    :tabindex="!disabled && !isFocused ? 0 : -1"
                    @input="onFilterChange"
                    @blur="onBlur"
                    @keydown.up.prevent="moveFocusUp"
                    @keydown.down.prevent="moveFocusDown"
                    @keydown.home.prevent="focusFirstItem"
                    @keydown.enter.prevent="selectFocusedItem" />
            </slot>
        </div>

        <div
            ref="containerElement"
            :class="containerClasses"
            :style="containerStyle">
            <component
                :is="listTag"
                :id="$id + '_list'"
                role="listbox"
                :tabindex="-1"
                :class="listClasses"
                :aria-multiselectable="multiple"
                :aria-activedescendant="
                    focusedItem ? `${$id}-${focusedItem.identifier}` : undefined
                "
                :aria-label="ariaLabel"
                :aria-labelledby="ariaLabelledby"
                :aria-disabled="disabled"
                @focus="onFocus"
                @blur="onBlur"
                @keydown.enter.prevent="selectFocusedItem"
                @keydown.space.prevent="selectFocusedItem"
                @keydown.up.prevent="moveFocusUp"
                @keydown.down.prevent="moveFocusDown"
                @keydown.home.prevent="focusFirstItem"
                @keydown.page-up.prevent="focusFirstItem"
                @keydown.end.prevent="focusLastItem"
                @keydown.page-down.prevent="focusLastItem">
                <transition-group :name="animation">
                    <!--
                        @slot Place items here
                        @binding {number} focusedIndex - index of the focused element
                    -->
                    <slot :focused-index="focusedItem?.index">
                        <template v-for="(group, groupIndex) in groupedOptions">
                            <o-listbox-item
                                v-if="group.label"
                                v-show="!group.hidden"
                                v-bind="group.attrs"
                                :key="group.key"
                                :value="group.value"
                                :hidden="group.hidden"
                                disabled
                                role="presentation">
                                <!--
                                    @slot Override the option group
                                    @binding {object} group - options group item
                                    @binding {number} index - option index
                                -->
                                <slot
                                    name="group"
                                    :group="group.label"
                                    :index="groupIndex">
                                    <span> {{ group.label }} </span>
                                </slot>
                            </o-listbox-item>

                            <o-listbox-item
                                v-for="option in group.options"
                                v-show="!option.hidden"
                                v-bind="option.attrs"
                                :key="option.key"
                                v-slot="{ selected, disabled }"
                                :value="option.value"
                                :hidden="option.hidden"
                                :aria-setsize="availableOptions.length"
                                :aria-posinset="getOptionIndex(option) + 1">
                                <!--
                                    @slot Override the label, default is label prop
                                    @binding {object} option - option item
                                    @binding {boolean} selected - item is selected
                                    @binding {boolean} disabled - item is disabled
                                -->
                                <slot
                                    name="option"
                                    :option="option"
                                    :selected="selected"
                                    :disabled="disabled">
                                    <span> {{ option.label }} </span>
                                </slot>
                            </o-listbox-item>
                        </template>
                    </slot>
                </transition-group>
            </component>
        </div>

        <transition :name="animation">
            <div v-if="isEmpty && $slots.empty" :class="itemEmptyClasses">
                <!--
                    @slot Define content for empty state
                -->
                <slot name="empty" />
            </div>
        </transition>

        <div v-if="$slots.footer" :class="footerClasses">
            <!--
                @slot Define an additional footer
            -->
            <slot name="footer" />
        </div>
    </div>
</template>
