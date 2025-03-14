<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import { computed, nextTick, ref, watch, useId, type Component } from "vue";

import ODropdownItem from "../dropdown/DropdownItem.vue";
import PositionWrapper from "../utils/PositionWrapper.vue";

import { getDefault } from "@/utils/config";
import { toCssDimension, isMobileAgent, isTrueish, mod } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    unrefElement,
    defineClasses,
    toOptionsGroup,
    normalizeOptions,
    useProviderParent,
    useMatchMedia,
    useClickOutside,
    usePreventScrolling,
    useSequentialId,
    useEventListener,
    type OptionsGroupItem,
} from "@/composables";

import type {
    DropdownChildItem,
    DropdownComponent,
    DropdownItemComponent,
} from "./types";
import type { DropdownProps } from "./props";
import { injectField } from "../field/fieldInjection";
import { maintainScrollVisibility } from "@/composables/useScrollHelper";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";

/**
 * Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content.
 * @displayName Dropdown
 * @requires ./DropdownItem.vue
 * @style _dropdown.scss
 */
defineOptions({
    isOruga: true,
    name: "ODropdown",
    configField: "dropdown",
});

type ModelValue = DropdownProps<T, IsMultiple>["modelValue"];

const props = withDefaults(defineProps<DropdownProps<T, IsMultiple>>(), {
    override: undefined,
    modelValue: undefined,
    // multiple: false,
    options: undefined,
    active: false,
    label: undefined,
    disabled: false,
    inline: false,
    selectable: false,
    keepOpen: () => getDefault("dropdown.keepOpen", false),
    keepFirst: () => getDefault("dropdown.keepFirst", false),
    closeOnOutside: () => getDefault("dropdown.closeOnOutside", true),
    closeOnScroll: () => getDefault("dropdown.closeOnScroll", false),
    selectOnFocus: () => getDefault("dropdown.selectOnFocus", false),
    selectOnClose: () => getDefault("dropdown.selectOnClose", false),
    expanded: false,
    position: () => getDefault("dropdown.position", "bottom-left"),
    scrollable: false,
    maxHeight: () => getDefault("dropdown.maxHeight", 200),
    checkScroll: () => getDefault("dropdown.checkScroll", false),
    menuId: () => useId(),
    menuTag: () => getDefault("dropdown.menuTag", "div"),
    triggerTag: () => getDefault("dropdown.triggerTag", "div"),
    triggers: () => getDefault("dropdown.triggers", ["click"]),
    delay: undefined,
    desktopModal: () => getDefault("dropdown.desktopModal", false),
    mobileModal: () => getDefault("dropdown.mobileModal", true),
    mobileBreakpoint: () => getDefault("dropdown.mobileBreakpoint"),
    animation: () => getDefault("dropdown.animation", "fade"),
    teleport: () => getDefault("dropdown.teleport", false),
    clipScroll: () => getDefault("dropdown.clipScroll", false),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {T | T[]} updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on select event - fired before update:modelValue
     * @param value {T} selected value
     */
    select: [value: T];
    /**
     * @deprecated use update:model-value instead
     * on change event - fired after update:modelValue
     * @param value {T | T[]} selected value
     */
    change: [value: ModelValue];
    /**
     * on open event
     * @param method {string} open method
     * @param event {Event} native event
     */
    open: [method: string, event: Event];
    /**
     * on close event
     * @param method {string} close method
     * @param event {Event} native event
     */
    close: [method: string, event: Event];
    /** the list inside the dropdown reached the start */
    "scroll-start": [];
    /** the list inside the dropdown reached it's end */
    "scroll-end": [];
}>();

const triggerRef = ref<HTMLElement>();
const menuRef = ref<HTMLElement | Component>();

// provided data is a computed ref to ensure reactivity
const provideData = computed<DropdownComponent<T>>(() => ({
    disabled: props.disabled,
    multiple: isTrueish(props.multiple),
    selectable: props.selectable,
    menuId: props.menuId,
    selected: vmodel.value,
    focsuedIdentifier: focusedItem.value?.identifier,
    selectItem,
    focusItem,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent<
    DropdownItemComponent<T>,
    DropdownComponent<T>
>({
    rootRef: menuRef,
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

/** is any option visible */
const isNotEmpty = computed(() => childItems.value.some(isItemViable));

// inject parent field component if used inside one
const { parentField } = injectField();

// the selected item value, use v-model to make it two-way binding
const vmodel = defineModel<ModelValue>({ default: undefined });

// the active state of the dropdown, use v-model:active to make it two-way binding
const isActive = defineModel<boolean>("active", { default: false });

// set field labelId or create a unique label id if a label is given
const labelId = props.labelledby ?? parentField.value?.labelId;

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

// check if client is mobile native
const isMobileNative = isClient && isMobileAgent.any();

// check if should be shown as modal
const isModal = computed(
    () =>
        !props.inline &&
        ((isMobile.value && props.mobileModal) ||
            (!isMobile.value && props.desktopModal)),
);

const menuStyle = computed(() => ({
    maxHeight: props.scrollable ? toCssDimension(props.maxHeight) : null,
    overflow: props.scrollable ? "auto" : null,
}));

const hoverable = computed(() => props.triggers.includes("hover"));

const toggleScroll = usePreventScrolling(props.clipScroll);

// set infinite scroll handler
if (isClient && props.scrollable && props.checkScroll)
    useInfiniteScroll(
        menuRef,
        () => emits("scroll-end"),
        () => emits("scroll-start"),
    );

// set click outside handler
if (isClient && props.closeOnOutside)
    useClickOutside([menuRef, triggerRef], onClickedOutside, {
        trigger: isActive,
        passive: true,
    });

// set scroll page event
if (isClient && props.closeOnScroll)
    useEventListener(window, "scroll", onPageScroll, { passive: true });

watch(
    isActive,
    (value) => {
        // on active set event handler if not open as modal
        if (value) {
            // keep first option always pre-selected
            if (!props.inline && props.keepFirst && !focusedItem.value)
                moveFocus(1);
        }
        if (isModal.value) toggleScroll(value);
    },
    { flush: "post" },
);

// #region --- Trigger Handler ---

/** Close dropdown if clicked outside. */
function onClickedOutside(event: Event): void {
    if (!isActive.value || props.inline) return;
    if (!props.closeOnOutside) return;
    close("outside", event);
}

/** Close dropdown if page get scrolled. */
function onPageScroll(event: Event): void {
    if (!isActive.value || props.inline) return;
    if (!props.closeOnScroll) return;
    close("scroll", event);
}

function onTriggerClick(event: Event): void {
    // check if is mobile native and hoverable together
    if (isMobileNative && hoverable.value) toggle("click", event);
    // check normal click conditions
    if (!props.triggers.includes("click")) return;
    toggle("click", event);
}

function onTriggerContextMenu(event: MouseEvent): void {
    if (!props.triggers.includes("contextmenu")) return;
    event.preventDefault();
    open("contextmenu", event);
}

function onTriggerFocus(event: Event): void {
    if (!props.triggers.includes("focus")) return;
    open("focus", event);
}

function onTriggerHover(event: Event): void {
    if (isMobileNative) return;
    if (!props.triggers.includes("hover")) return;
    open("hover", event);
}

function onTriggerHoverLeave(event: Event): void {
    if (isMobileNative) return;
    if (!props.triggers.includes("hover")) return;
    close("outside", event);
}

/** Toggle dropdown if it's not disabled. */
function toggle(method: string, event: Event): void {
    if (props.disabled) return;
    if (!isActive.value) open(method, event);
    else close(method, event);
}

let timer: NodeJS.Timeout | undefined;

function open(method: string, event: Event): void {
    if (props.disabled) return;
    if (isActive.value) return;
    if (props.delay) {
        timer = setTimeout(() => {
            isActive.value = true;
            emits("open", method, event);
            timer = undefined;
        }, props.delay);
    } else {
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        nextTick(() => (isActive.value = true));
        emits("open", method, event);
    }
}

function close(method: string, event: Event): void {
    if (!isActive.value) return;
    emits("close", method, event);

    // select item when dropdown closed
    if (props.selectOnClose && focusedItem.value?.data?.value)
        selectItem(focusedItem.value);

    isActive.value = false;
    focusedItem.value = undefined;
    if (timer) clearTimeout(timer);
}

// #endregion --- Trigger Handler ---

// #region --- Select Feature ---

/**
 * Click listener from DropdownItem.
 *   1. Set new selected item.
 *   2. Update v-model.
 *   3. Close the dropdown.
 */
function selectItem(item: DropdownChildItem<T>, event?: Event): void {
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
            // emit change after vmodel has changed
            nextTick(() => emits("change", vmodel.value));
        } else {
            if (vmodel.value !== value) {
                // update a single value
                vmodel.value = value as ModelValue;
                // emit change after vmodel has changed
                nextTick(() => emits("change", vmodel.value));
            }
        }
    }

    triggerRef.value?.focus();
    if (props.keepOpen || !isActive.value || !event) return;
    close("content", event);
}

// #endregion --- Select Feature ---

// #region --- Focus Feature ---

const focusedItem = ref<DropdownChildItem<T>>();

/** Hover listener from DropdownItem. */
function focusItem(value: DropdownChildItem<T>): void {
    focusedItem.value = value;
}

/** Set focus on a tab item. */
function moveFocus(delta: 1 | -1): void {
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(focusedItem.value?.index || 0, delta);
    setFocus(item);
}

/** Set focus on a dropdown item. */
function setFocus(item: DropdownChildItem<T>): void {
    if (props.selectOnFocus && item.data?.value)
        selectItem(item, new Event("focus"));

    const dropdownMenu = unrefElement(menuRef);
    const element = unrefElement(item.data?.$el);
    if (!dropdownMenu || !element) return;

    // set item as focused
    focusedItem.value = item;

    // scroll item into view
    maintainScrollVisibility(element, dropdownMenu);
}

function onUpPressed(event: Event): void {
    if (!isActive.value) return open("keydown", event);
    moveFocus(-1);
}

function onDownPressed(event: Event): void {
    if (!isActive.value) return open("keydown", event);
    moveFocus(1);
}

function onEnter(event: Event): void {
    if (!isActive.value) return;
    if (focusedItem.value) {
        setFocus(focusedItem.value);
        focusedItem.value.data?.selectItem(event);
    }
}

/** Go to the first viable item */
function onHomePressed(event: Event): void {
    open("keydown", event);
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(0, 1);
    setFocus(item);
}

/** Go to the last viable item */
function onEndPressed(event: Event): void {
    open("keydown", event);
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(childItems.value.length - 1, -1);
    setFocus(item);
}

function onEscape(event: Event): void {
    close("escape", event);
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
): DropdownChildItem<T> {
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

function isItemViable(item: DropdownChildItem<T>): boolean {
    return !item.data?.disabled && !item.data?.hidden && !!item.data?.clickable;
}

// #endregion --- Focus Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-dropdown"],
    [
        "disabledClass",
        "o-dropdown--disabled",
        null,
        computed(() => props.disabled),
    ],
    [
        "expandedClass",
        "o-dropdown--expanded",
        null,
        computed(() => props.expanded),
    ],
    ["inlineClass", "o-dropdown--inline", null, computed(() => props.inline)],
    ["mobileClass", "o-dropdown--mobile", null, isMobile],
    ["modalClass", "o-dropdown--modal", null, isModal],
    ["hoverableClass", "o-dropdown--hoverable", null, hoverable],
    [
        "positionClass",
        "o-dropdown--position-",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "activeClass",
        "o-dropdown--active",
        null,
        computed(() => isActive.value || props.inline),
    ],
);

const triggerClasses = defineClasses(["triggerClass", "o-dropdown__trigger"]);

const teleportClasses = defineClasses([
    "teleportClass",
    "o-dropdown--teleport",
    null,
    computed(() => !!props.teleport),
]);

const overlayClasses = defineClasses(["overlayClass", "o-dropdown__overlay"]);

const menuClasses = defineClasses(
    ["menuClass", "o-dropdown__menu"],
    [
        "menuPositionClass",
        "o-dropdown__menu--",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "menuActiveClass",
        "o-dropdown__menu--active",
        null,
        computed(() => isActive.value || props.inline),
    ],
);

// #endregion --- Computed Component Classes ---

/** expose functionalities for programmatic usage */
defineExpose({ $trigger: triggerRef, $content: menuRef, value: vmodel });
</script>

<template>
    <div
        data-oruga="dropdown"
        :class="rootClasses"
        @mouseleave="onTriggerHoverLeave"
        @focusout="onTriggerHoverLeave">
        <component
            :is="triggerTag"
            v-if="!inline"
            ref="triggerRef"
            :class="triggerClasses"
            :role="selectable ? 'combobox' : undefined"
            :tabindex="disabled ? -1 : null"
            :aria-haspopup="selectable ? 'listbox' : 'menu'"
            :aria-expanded="selectable ? isActive : undefined"
            :aria-activedescendant="
                focusedItem ? `${menuId}-${focusedItem.identifier}` : undefined
            "
            :aria-disabled="disabled"
            :aria-controls="menuId"
            :aria-labelledby="selectable ? labelId : undefined"
            :aria-label="selectable ? ariaLabel : undefined"
            @click="onTriggerClick"
            @contextmenu="onTriggerContextMenu"
            @mouseenter="onTriggerHover"
            @focus.capture="onTriggerFocus"
            @keydown.tab="onEscape"
            @keydown.escape="onEscape"
            @keydown.enter="onEnter"
            @keydown.space="onEnter"
            @keydown.up.prevent="onUpPressed"
            @keydown.down.prevent="onDownPressed"
            @keydown.home.prevent="onHomePressed"
            @keydown.end.prevent="onEndPressed">
            <!--
                @slot Override the trigger element, default is label prop
                @binding {boolean} active - dropdown active state
                @binding {T | T[]} value - the selected value
                @binding {() => void} toggle - toggle dropdown active state
            -->
            <slot
                name="trigger"
                :active="isActive"
                :value="modelValue"
                :toggle="onTriggerClick">
                {{ label }}
            </slot>
        </component>

        <PositionWrapper
            v-slot="{ setContent }"
            v-model:position="autoPosition"
            :teleport="teleport"
            :class="[...rootClasses, ...teleportClasses]"
            :trigger="triggerRef"
            :disabled="!isActive"
            default-position="bottom"
            :disable-positioning="!isModal">
            <transition v-if="isModal" :name="animation">
                <div
                    v-show="isActive"
                    :class="overlayClasses"
                    tabindex="-1"
                    @click="onClickedOutside" />
            </transition>

            <transition :name="animation">
                <component
                    :is="menuTag"
                    v-show="(!disabled && isActive) || inline"
                    :id="menuId"
                    :ref="(el) => (menuRef = setContent(el))"
                    :tabindex="inline ? 0 : -1"
                    :class="menuClasses"
                    :style="menuStyle"
                    :role="selectable ? 'listbox' : 'menu'"
                    :aria-labelledby="labelId"
                    :aria-label="ariaLabel"
                    :aria-hidden="!inline && (disabled || !isActive)"
                    :aria-multiselectable="
                        selectable ? isTrueish(multiple) : undefined
                    "
                    @keydown.enter.prevent="inline && onEnter($event)"
                    @keydown.space.prevent="inline && onEnter($event)"
                    @keydown.up.prevent="inline && onUpPressed($event)"
                    @keydown.down.prevent="inline && onDownPressed($event)"
                    @keydown.home.prevent="inline && onHomePressed($event)"
                    @keydown.end.prevent="inline && onEndPressed($event)">
                    <!--
                        @slot Place dropdown items here
                        @binding {boolean} active - dropdown active state
                        @binding {number} focusedIndex - index of the focused element
                        @binding {() => void} toggle - toggle dropdown active state
                    -->
                    <slot
                        :active="isActive"
                        :focused-index="focusedItem?.index"
                        :toggle="toggle">
                        <!--
                            @slot Place extra `o-dropdown-item` components here, even if you have some options defined by prop
                        -->
                        <slot name="before" />

                        <template v-for="(group, groupIndex) in groupedOptions">
                            <o-dropdown-item
                                v-if="group.label"
                                v-show="!group.hidden"
                                v-bind="group.attrs"
                                :key="group.key"
                                :value="group.value"
                                :hidden="group.hidden"
                                role="presentation"
                                :clickable="false">
                                <!--
                                    @slot Override the option group
                                    @binding {object} group - options group
                                    @binding {number} index - option index
                                -->
                                <slot
                                    v-if="$slots.group"
                                    name="group"
                                    :group="group.label"
                                    :index="groupIndex" />
                                <span v-else>
                                    {{ group.label }}
                                </span>
                            </o-dropdown-item>

                            <o-dropdown-item
                                v-for="option in group.options"
                                v-show="!option.hidden"
                                v-bind="option.attrs"
                                :key="option.key"
                                :value="option.value"
                                :hidden="option.hidden">
                                {{ option.label }}
                            </o-dropdown-item>
                        </template>

                        <!--
                            @slot Place extra `o-dropdown-item` components here, even if you have some options defined by prop
                        -->
                        <slot name="after" />
                    </slot>
                </component>
            </transition>
        </PositionWrapper>
    </div>
</template>
