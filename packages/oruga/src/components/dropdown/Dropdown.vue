<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    nextTick,
    ref,
    watch,
    useId,
    toValue,
    useTemplateRef,
    type Component,
} from "vue";

import ODropdownItem from "../dropdown/DropdownItem.vue";
import PositionWrapper from "../utils/PositionWrapper.vue";

import { getDefault } from "@/utils/config";
import { toCssDimension, isMobileAgent, isTrueish, mod } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    toOptionsGroup,
    normalizeOptions,
    useProviderParent,
    useMatchMedia,
    useClickOutside,
    usePreventScrolling,
    useSequentialId,
    useEventListener,
    useScrollEvents,
    scrollElementInView,
    type OptionsGroupItem,
} from "@/composables";

import type {
    DropdownChildItem,
    DropdownComponent,
    DropdownItemComponent,
} from "./types";
import type { DropdownProps } from "./props";
import { injectField } from "../field/fieldInjection";

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
    menuId: () => useId(),
    menuTag: () => getDefault("dropdown.menuTag", "div"),
    triggerTag: () => getDefault("dropdown.triggerTag", "div"),
    triggers: () => getDefault("dropdown.triggers", []),
    openOnClick: () => getDefault("tooltip.openOnClick", true),
    openOnContextmenu: () => getDefault("tooltip.openOnContextmenu", false),
    openOnHover: () => getDefault("tooltip.openOnHover", false),
    openOnFocus: () => getDefault("tooltip.openOnFocus", false),
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
     * @param value {unknown | unknown[]} - updated modelValue prop
     */
    "update:model-value": [value: ModelValue];
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on select event - fired before update:modelValue
     * @param value {unknown} - selected value
     */
    select: [value: T];
    /**
     * @deprecated use update:model-value instead
     * on change event - fired after update:modelValue
     * @param value {unknown | unknown[]} - selected value
     */
    change: [value: ModelValue];
    /**
     * on active state changes to true
     * @param event {Event} - native event
     */
    open: [event: Event];
    /**
     * on active state changes to false
     * @param event {Event} - native event
     */
    close: [event: Event];
    /** the list inside the dropdown reached the start */
    "scroll-start": [];
    /** the list inside the dropdown reached it's end */
    "scroll-end": [];
}>();

defineSlots<{
    /**
     * Override the trigger element, default is label prop
     * @param active {boolean} - dropdown active state
     * @param value {unknown | unknown[]} - the selected value
     * @param toggle {(): void} - toggle dropdown active state
     */
    trigger?(): void;
    /**
     * Place dropdown items here
     * @param active {boolean} - dropdown active state
     * @param focusedIndex {number} - index of the focused element
     * @param toggle {(): void} - toggle dropdown active state
     */
    default?(): void;
    /** Place extra `o-dropdown-item` components here, even if you have some options defined by prop */
    before?(): void;
    /**
     * Override the option group
     * @param group {object} - options group item
     * @param index {number} - option index
     */
    group?(): void;
    /**
     * Override the label, default is label prop
     * @param option {object} - option item
     */
    option?(): void;
    /** Place extra `o-dropdown-item` components here, even if you have some options defined by prop */
    after?(): void;
}>();

const triggerRef = useTemplateRef<HTMLElement>("triggerRef");
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

const hoverable = computed(
    () => props.openOnHover || props.triggers.includes("hover"),
);

const toggleScroll = usePreventScrolling(props.clipScroll);

watch(
    isActive,
    (value) => {
        // on active set event handler if not open as modal
        if (value) {
            // keep first option always pre-focused
            if (!props.inline && props.keepFirst && !focusedItem.value)
                moveFocus(1);
        }
        if (isModal.value) toggleScroll(value);
    },
    { flush: "post" },
);

watch(
    childItems,
    () => {
        // change pre-focused element when items change and keepFirst
        if (isActive.value && !props.inline && props.keepFirst) {
            focusedItem.value = undefined;
            moveFocus(1);
        }
    },
    { deep: true, flush: "post" },
);

// #region --- Trigger Handler ---

if (isClient) {
    // set infinite scroll handler
    if (props.scrollable)
        useScrollEvents(
            menuRef,
            {
                onScrollEnd: () => emits("scroll-end"),
                onScrollStart: () => emits("scroll-start"),
            },
            { passive: true },
        );

    // set click outside handler
    if (props.closeOnOutside)
        useClickOutside([menuRef, triggerRef], onClickedOutside, {
            trigger: isActive,
            passive: true,
        });

    // set scroll page event
    if (props.closeOnScroll)
        useEventListener(window, "scroll", onPageScroll, {
            trigger: isActive,
            passive: true,
        });
}

/** Close dropdown if clicked outside. */
function onClickedOutside(event: Event): void {
    if (!props.closeOnOutside) return;
    if (!isActive.value || props.inline) return;
    close(event);
}

/** Close dropdown if page get scrolled. */
function onPageScroll(event: Event): void {
    if (!props.closeOnScroll) return;
    if (!isActive.value || props.inline) return;
    close(event);
}

function onTriggerClick(event: Event): void {
    // check if is mobile native and hoverable together
    if (isMobileNative && hoverable.value) toggle(event);
    // check normal click conditions
    if (!(props.openOnClick || props.triggers.includes("click"))) return;
    toggle(event);
}

function onTriggerContextMenu(event: Event): void {
    if (!(props.openOnContextmenu || props.triggers.includes("contextmenu")))
        return;
    event.preventDefault();
    open(event);
}

function onTriggerFocus(event: Event): void {
    if (!(props.openOnFocus || props.triggers.includes("focus"))) return;
    open(event);
}

function onTriggerHover(event: Event): void {
    if (isMobileNative) return;
    if (!(props.openOnHover || props.triggers.includes("hover"))) return;
    open(event);
}

function onTriggerHoverLeave(event: Event): void {
    if (isMobileNative) return;
    if (!(props.openOnHover || props.triggers.includes("hover"))) return;
    close(event);
}

/** Toggle dropdown if it's not disabled. */
function toggle(event: Event): void {
    if (props.disabled) return;
    if (!isActive.value) open(event);
    else close(event);
}

let timer: ReturnType<typeof setTimeout> | undefined;

function open(event: Event): void {
    if (props.disabled) return;
    if (isActive.value) return;
    if (props.delay) {
        timer = setTimeout(() => {
            isActive.value = true;
            timer = undefined;
            emits("open", event);
        }, props.delay);
    } else {
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        nextTick(() => (isActive.value = true));
        emits("open", event);
    }
}

function close(event: Event): void {
    if (!isActive.value) return;

    // select item when dropdown closed
    if (props.selectOnClose && focusedItem.value?.data.value)
        selectItem(focusedItem.value);

    if (timer) clearTimeout(timer);
    isActive.value = false;
    focusedItem.value = undefined;
    emits("close", event);
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
    close(event);
}

// #endregion --- Select Feature ---

// #region --- Focus Feature ---

const focusedItem = ref<DropdownChildItem<T>>();

/** Hover listener from DropdownItem. */
function focusItem(value: DropdownChildItem<T>): void {
    focusedItem.value = value;
}

/** Menu hover leave event handler. */
function onMenuHoverLeave(): void {
    focusedItem.value = undefined;
}

/** Set focus on a tab item. */
function moveFocus(delta: 1 | -1): void {
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(focusedItem.value?.index || 0, delta);
    setFocus(item);
}

/** Set focus on a dropdown item. */
function setFocus(item: DropdownChildItem<T>): void {
    if (props.selectOnFocus && item.data.value)
        selectItem(
            item,
            new FocusEvent("focus", { relatedTarget: toValue(item.el) }),
        );

    // set item as focused
    focusedItem.value = item;

    // scroll item into view
    scrollElementInView(menuRef, item.el);
}

function onUpPressed(event: Event): void {
    if (!isActive.value) return open(event);
    moveFocus(-1);
}

function onDownPressed(event: Event): void {
    if (!isActive.value) return open(event);
    moveFocus(1);
}

function onEnter(event: Event): void {
    if (!isActive.value) return;
    if (focusedItem.value) {
        setFocus(focusedItem.value);
        focusedItem.value.data.selectItem(event);
    }
}

/** Go to the first viable item */
function onHomePressed(event: Event): void {
    const target = event.target as HTMLElement;
    // do not prevent default for HTMLElements with native keyboard "Home" key event behavior
    if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA")
        event.preventDefault();

    open(event);
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(0, 1);
    setFocus(item);
}

/** Go to the last viable item */
function onEndPressed(event: Event): void {
    const target = event.target as HTMLElement;
    // do not prevent default for HTMLElements with native keyboard "End" key event behavior
    if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA")
        event.preventDefault();

    open(event);
    if (!isNotEmpty.value) return;
    const item = getFirstViableItem(childItems.value.length - 1, -1);
    setFocus(item);
}

function onEscape(event: Event): void {
    close(event);
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
    return !item.data.disabled && !item.data.hidden && !!item.data.clickable;
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

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ $trigger: triggerRef, $content: menuRef, value: vmodel });

// #endregion --- Expose Public Functionalities ---
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
            @keydown.home="onHomePressed"
            @keydown.end="onEndPressed">
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
                    :aria-hidden="
                        !selectable && !inline
                            ? disabled || !isActive
                            : undefined
                    "
                    :aria-multiselectable="
                        selectable ? isTrueish(multiple) : undefined
                    "
                    @mouseleave="onMenuHoverLeave"
                    @keydown.enter.prevent="inline && onEnter($event)"
                    @keydown.space.prevent="inline && onEnter($event)"
                    @keydown.up.prevent="inline && onUpPressed($event)"
                    @keydown.down.prevent="inline && onDownPressed($event)"
                    @keydown.home="inline && onHomePressed($event)"
                    @keydown.end="inline && onEndPressed($event)">
                    <slot
                        :active="isActive"
                        :focused-index="focusedItem?.index"
                        :toggle="toggle">
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
                                <slot
                                    name="group"
                                    :group="group.label"
                                    :index="groupIndex">
                                    <span>
                                        {{ group.label }}
                                    </span>
                                </slot>
                            </o-dropdown-item>

                            <o-dropdown-item
                                v-for="option in group.options"
                                v-show="!option.hidden"
                                v-bind="option.attrs"
                                :key="option.key"
                                :value="option.value"
                                :hidden="option.hidden">
                                <slot name="option" :option="option">
                                    <span> {{ option.label }} </span>
                                </slot>
                            </o-dropdown-item>
                        </template>

                        <slot name="after" />
                    </slot>
                </component>
            </transition>
        </PositionWrapper>
    </div>
</template>
