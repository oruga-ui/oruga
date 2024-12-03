<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    nextTick,
    ref,
    watch,
    onUnmounted,
    type Component,
    useId,
} from "vue";

import ODropdownItem from "../dropdown/DropdownItem.vue";
import PositionWrapper from "../utils/PositionWrapper.vue";

import { getDefault } from "@/utils/config";
import { vTrapFocus } from "@/directives/trapFocus";
import { toCssDimension, isMobileAgent, isTrueish } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    unrefElement,
    defineClasses,
    toOptionsGroup,
    normalizeOptions,
    useProviderParent,
    useMatchMedia,
    useEventListener,
    useClickOutside,
    usePreventScrolling,
    useSequentialId,
    type ProviderItem,
} from "@/composables";

import type { DropdownComponent, DropdownItemComponent } from "./types";
import type { DropdownProps } from "./props";
import { injectField } from "../field/fieldInjection";

/**
 * Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
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
    scrollable: false,
    maxHeight: () => getDefault("dropdown.maxHeight", 200),
    position: () => getDefault("dropdown.position", "bottom-left"),
    animation: () => getDefault("dropdown.animation", "fade"),
    trapFocus: () => getDefault("dropdown.trapFocus", true),
    checkScroll: () => getDefault("dropdown.checkScroll", false),
    expanded: false,
    menuId: () => useId(),
    menuTabindex: -1,
    menuTag: () => getDefault("dropdown.menuTag", "div"),
    triggerTag: () => getDefault("dropdown.triggerTag", "div"),
    triggers: () => getDefault("dropdown.triggers", ["click"]),
    delay: undefined,
    closeable: () =>
        getDefault("dropdown.closeable", ["escape", "outside", "content"]),
    tabindex: 0,
    ariaRole: () => getDefault("dropdown.ariaRole", "listbox"),
    desktopModal: () => getDefault("dropdown.desktopModal", false),
    mobileModal: () => getDefault("dropdown.mobileModal", true),
    mobileBreakpoint: () => getDefault("dropdown.mobileBreakpoint"),
    teleport: () => getDefault("dropdown.teleport", false),
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
     * on change event - fired after update:modelValue
     * @param value {T | T[]} selected value
     */
    change: [value: ModelValue];
    /**
     * on close event
     * @param method {string} close method
     */
    close: [method: string];
    /** the list inside the dropdown reached the start */
    "scroll-start": [];
    /** the list inside the dropdown reached it's end */
    "scroll-end": [];
}>();

const contentRef = ref<HTMLElement | Component>();
const triggerRef = ref<HTMLElement>();

// #region --- Dependency Injection Feature ---

// provided data is a computed ref to enjure reactivity
const provideData = computed<DropdownComponent<T>>(() => ({
    disabled: props.disabled,
    multiple: isTrueish(props.multiple),
    menuId: props.menuId,
    selected: vmodel.value,
    selectItem,
}));

/** provide functionalities and data to child item components */
const { childItems } = useProviderParent({
    rootRef: contentRef,
    data: provideData,
});

// #endregion --- Dependency Injection Feature ---

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

/** The active state of the dropdown, use v-model:active to make it two-way binding */
const isActive = defineModel<boolean>("active", { default: false });

// inject parent field component if used inside one
const { parentField } = injectField();

// create a unique id sequence
const { nextSequence } = useSequentialId();

/** normalized programamtic options */
const groupedOptions = computed(() => {
    const normalizedOptions = normalizeOptions<T>(props.options, nextSequence);
    const groupedOptions = toOptionsGroup(normalizedOptions, nextSequence());
    return groupedOptions;
});

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

// check if should be shown as modal
const isModal = computed(
    () =>
        !props.inline &&
        ((isMobile.value && props.mobileModal) ||
            (!isMobile.value && props.desktopModal)),
);

// check if client is mobile native
const isMobileNative = isClient && isMobileAgent.any();

const menuStyle = computed(() => ({
    maxHeight: props.scrollable ? toCssDimension(props.maxHeight) : null,
    overflow: props.scrollable ? "auto" : null,
}));

const hoverable = computed(() => props.triggers.includes("hover"));

const toggleScroll = usePreventScrolling();

// #region --- Event Handler ---

const eventCleanups: (() => void)[] = [];
let timer: NodeJS.Timeout | undefined;

const cancelOptions = computed(() =>
    typeof props.closeable === "boolean"
        ? props.closeable
            ? ["escape", "outside", "content"]
            : []
        : props.closeable,
);

watch(
    isActive,
    (value) => {
        // on active set event handler if not open as modal
        if (value && isClient && !isModal.value) {
            if (cancelOptions.value.includes("outside")) {
                // set outside handler
                eventCleanups.push(
                    useClickOutside(contentRef, onClickedOutside, {
                        ignore: [triggerRef],
                        immediate: true,
                        passive: true,
                    }),
                );
            }
        } else if (!value) {
            // on close cleanup event handler
            eventCleanups.forEach((fn) => fn());
            eventCleanups.length = 0;
        }
        if (isMobile.value) toggleScroll(value);
    },
    { immediate: true, flush: "post" },
);

onUnmounted(() => {
    // on close cleanup event handler
    eventCleanups.forEach((fn) => fn());
    eventCleanups.length = 0;
});

/** Close dropdown if clicked outside. */
function onClickedOutside(): void {
    if (!isActive.value || props.inline) return;
    if (!cancelOptions.value.includes("outside")) return;
    close("outside");
}

function onClick(): void {
    // check if is mobile native and hoverable together
    if (isMobileNative && hoverable.value) toggle("click");
    // check normal click conditions
    if (!props.triggers.includes("click")) return;
    toggle("click");
}

function onContextMenu(event: MouseEvent): void {
    if (!props.triggers.includes("contextmenu")) return;
    event.preventDefault();
    open("contextmenu");
}

function onFocus(): void {
    if (!props.triggers.includes("focus")) return;
    open("focus");
}

const isHovered = ref(false);
function onHover(): void {
    if (isMobileNative) return;
    if (!props.triggers.includes("hover")) return;
    isHovered.value = true;
    open("hover");
}
function onHoverLeave(): void {
    if (isMobileNative) return;
    if (!isHovered.value) return;
    if (!cancelOptions.value.includes("content")) return;
    isHovered.value = false;
    close("content");
}

/** Toggle dropdown if it's not disabled. */
function toggle(method: string): void {
    if (props.disabled) return;
    if (isActive.value) open(method);
    else close(method);
}

function open(method: string): void {
    if (props.disabled) return;
    if (props.delay) {
        timer = setTimeout(() => {
            isActive.value = true;
            emits("open", method);
            timer = undefined;
        }, props.delay);
    } else {
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        nextTick(() => (isActive.value = true));
        emits("open", method);
    }
}

function close(method: string): void {
    emits("close", method);
    isActive.value = false;
    if (timer && props.closeable) clearTimeout(timer);
}

// --------------------------------

/** Keypress event that is bound to the document */
function onKeyPress(event: KeyboardEvent): void {
    const { key, altKey, ctrlKey, metaKey } = event;

    // home and end move the selected option when open or closed
    if (key === "Home") return navigateItem(0);

    if (key === "End") return navigateItem(childItems.length);

    if (!isActive.value) {
        const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "]; // all keys that will do the default open action
        // handle opening when closed
        if (openKeys.includes(key)) {
            onFocus();
            isActive.value = true;
        }
    }
    // handle keys when open
    else if (isActive.value) {
        if (key === "Escape" || key === "Esc") {
            if (!cancelOptions.value.includes("escape")) return;
            emits("close", "escape");
            isActive.value = false;
        }

        if (key === "ArrowUp" && altKey) {
            return SelectActions.CloseSelect;
        } else if (key === "ArrowDown" && !altKey) {
            return SelectActions.Next;
        } else if (key === "ArrowUp") {
            return SelectActions.Previous;
        } else if (key === "PageUp") {
            return SelectActions.PageUp;
        } else if (key === "PageDown") {
            return SelectActions.PageDown;
        } else if (key === "Escape") {
            return SelectActions.Close;
        } else if (key === "Enter" || key === " ") {
            return SelectActions.CloseSelect;
        }
    }

    switch (action) {
        case SelectActions.Last:
        case SelectActions.First:
            this.updateMenuState(true);
        // intentional fallthrough
        case SelectActions.Next:
        case SelectActions.Previous:
        case SelectActions.PageUp:
        case SelectActions.PageDown:
            event.preventDefault();
            return this.onOptionChange(
                getUpdatedIndex(this.activeIndex, max, action),
            );
        case SelectActions.CloseSelect:
            event.preventDefault();
            this.selectOption(this.activeIndex);
        // intentional fallthrough
        case SelectActions.Close:
            event.preventDefault();
            return this.updateMenuState(false);
        case SelectActions.Type:
            return this.onComboType(key);
        case SelectActions.Open:
            event.preventDefault();
            return this.updateMenuState(true);
    }
}

// return the index of an option from an array of options, based on a search string
// if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
function getIndexByLetter(options, filter, startIndex = 0) {
    const orderedOptions = [
        ...options.slice(startIndex),
        ...options.slice(0, startIndex),
    ];
    const firstMatch = filterOptions(orderedOptions, filter)[0];
    const allSameLetter = (array) =>
        array.every((letter) => letter === array[0]);

    // first check if there is an exact match for the typed string
    if (firstMatch) {
        return options.indexOf(firstMatch);
    }

    // if the same letter is being repeated, cycle through first-letter matches
    else if (allSameLetter(filter.split(""))) {
        const matches = filterOptions(orderedOptions, filter[0]);
        return options.indexOf(matches[0]);
    }

    // if no matches, return -1
    else {
        return -1;
    }
}

// get an updated option index after performing an action
function getUpdatedIndex(currentIndex, maxIndex, action) {
    const pageSize = 10; // used for pageup/pagedown

    switch (action) {
        case SelectActions.First:
            return 0;
        case SelectActions.Last:
            return maxIndex;
        case SelectActions.Previous:
            return Math.max(0, currentIndex - 1);
        case SelectActions.Next:
            return Math.min(maxIndex, currentIndex + 1);
        case SelectActions.PageUp:
            return Math.max(0, currentIndex - pageSize);
        case SelectActions.PageDown:
            return Math.min(maxIndex, currentIndex + pageSize);
        default:
            return currentIndex;
    }
}

// check if element is visible in browser view port
function isElementInView(element) {
    const bounding = element.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

// check if an element is currently scrollable
function isScrollable(element) {
    return element && element.clientHeight < element.scrollHeight;
}

// ensure a given child element is within the parent's visible scroll area
// if the child is not visible, scroll the parent
function maintainScrollVisibility(activeElement, scrollParent) {
    const { offsetHeight, offsetTop } = activeElement;
    const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    if (isAbove) {
        scrollParent.scrollTo(0, offsetTop);
    } else if (isBelow) {
        scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
}

function onComboBlur(event) {
    // do nothing if relatedTarget is contained within listboxEl
    if (this.listboxEl.contains(event.relatedTarget)) {
        return;
    }

    // select current option and close
    if (this.open) {
        this.selectOption(this.activeIndex);
        this.updateMenuState(false, false);
    }
}

// #endregion --- Event Handler ---

// #region --- InfitiveScroll Feature ---

if (isClient && props.checkScroll)
    useEventListener("scroll", checkDropdownScroll, contentRef);

/** Check if the scroll list inside the dropdown reached the top or it's end. */
function checkDropdownScroll(): void {
    const dropdown = unrefElement(contentRef);
    if (!dropdown) return;
    if (dropdown.clientHeight !== dropdown.scrollHeight) {
        if (
            dropdown.scrollTop + dropdown.clientHeight >=
            dropdown.scrollHeight
        ) {
            emits("scroll-end");
        } else if (dropdown.scrollTop <= 0) {
            emits("scroll-start");
        }
    }
}

// #endregion --- InfitiveScroll Feature ---

// #region --- Select Feature ---

const selectedValue = ref<ProviderItem<DropdownItemComponent<T>>>();

/**
 * Arrows keys listener.
 * If dropdown is active, set hovered option, or else just open.
 */
function navigateItem(identifier: string): void {
    if (!isActive.value) {
        isActive.value = true;
        return;
    }

    // define current available options index
    const item = childItems.value.find((o) => o.identifier === identifier);

    // get option element
    const option = availableOptions[index];

    // set hover state
    setHovered(option);

    // get real option index
    index =
        option === SpecialOption.Header
            ? -1
            : option === SpecialOption.Footer
              ? options.length
              : options.findIndex((o) => o.key === option.key);

    if (headerRef.value && props.selectableHeader) index++;

    const dropdownMenu = unrefElement(dropdownRef.value.$content);
    const element = unrefElement(items[index]);
    if (!element) return;

    // define scroll position
    const visMin = dropdownMenu.scrollTop;
    const visMax =
        dropdownMenu.scrollTop +
        dropdownMenu.clientHeight -
        element.clientHeight;

    if (element.offsetTop < visMin) {
        // is scolled top
        dropdownMenu.scrollTop = element.offsetTop;
    } else if (element.offsetTop >= visMax) {
        // is scolled bottom
        dropdownMenu.scrollTop =
            element.offsetTop -
            dropdownMenu.clientHeight +
            element.clientHeight;
    }

    // trigger scroll events
    if (props.checkScroll) checkDropdownScroll();
}

/**
 * Click listener from DropdownItem.
 *   1. Set new selected item.
 *   2. Emit input event to update the user v-model.
 *   3. Close the dropdown.
 */
function selectItem(index: number): void {
    // update state
    activeItem.value = value;

    // ensure the new option is in view
    if (isScrollable(this.listboxEl)) {
        maintainScrollVisibility(options[index], this.listboxEl);
    }

    // ensure the new option is visible on screen
    // ensure the new option is in view
    if (!isElementInView(options[index])) {
        options[index].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

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
        selectedValue.value = item;

        if (vmodel.value !== item.data?.value) {
            // update a single value
            vmodel.value = item.data?.value as ModelValue;
            // emit change after vmodel has changed
            nextTick(() => emits("change", vmodel.value));
        }
    }

    if (activeID === "" && !isElementInView(this.comboEl)) {
        this.comboEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // move focus back to the combobox, if needed
    callFocus && this.comboEl.focus();

    if (!isTrueish(props.multiple)) {
        if (cancelOptions.value.indexOf("content") < 0) return;
        emits("close", "content");
        isActive.value = false;
        isHovered.value = false;
    }
}

// #endregion --- Select Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-drop"],
    ["disabledClass", "o-drop--disabled", null, computed(() => props.disabled)],
    ["expandedClass", "o-drop--expanded", null, computed(() => props.expanded)],
    ["inlineClass", "o-drop--inline", null, computed(() => props.inline)],
    ["mobileClass", "o-drop--mobile", null, isMobile],
    ["modalClass", "o-drop--modal", null, isModal],
    ["hoverableClass", "o-drop--hoverable", null, hoverable],
    [
        "positionClass",
        "o-drop--position-",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "activeClass",
        "o-drop--active",
        null,
        computed(() => isActive.value || props.inline),
    ],
);

const triggerClasses = defineClasses(["triggerClass", "o-drop__trigger"]);

const teleportClasses = defineClasses([
    "teleportClass",
    "o-drop--teleport",
    null,
    computed(() => !!props.teleport),
]);

const overlayClasses = defineClasses(["overlayClass", "o-drop__overlay"]);

const menuClasses = defineClasses(
    ["menuClass", "o-drop__menu"],
    [
        "menuPositionClass",
        "o-drop__menu--",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "menuActiveClass",
        "o-drop__menu--active",
        null,
        computed(() => isActive.value || props.inline),
    ],
);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ $trigger: triggerRef, $content: contentRef, value: vmodel });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <div
        data-oruga="dropdown"
        :class="rootClasses"
        @mouseleave="onHoverLeave"
        @focusout="onHoverLeave">
        <component
            :is="triggerTag"
            v-if="!inline"
            ref="triggerRef"
            :tabindex="disabled ? null : tabindex"
            :class="triggerClasses"
            role="combobox"
            :aria-haspopup="ariaRole === 'list' ? true : ariaRole"
            :aria-expanded="isActive"
            :aria-activedescendant="
                selectedValue ? `${menuId}-${selectedValue?.identifier}` : ''
            "
            :aria-controls="menuId"
            :aria-labelledby="parentField?.labelId"
            .aria-multiselectable="multiple"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur="onBlur"
            @keypress="onKeyPress">
            <!--
                @slot Override the trigger element, default is label prop
                @binding {boolean} active - dropdown active state
                @binding {() => void} toggle - toggle dropdown active state
            -->
            <slot name="trigger" :active="isActive" :toggle="onClick">
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
                    v-show="(!disabled && (isActive || isHovered)) || inline"
                    :id="menuId"
                    :ref="(el) => (contentRef = setContent(el))"
                    v-trap-focus="trapFocus"
                    :tabindex="menuTabindex"
                    :class="menuClasses"
                    :style="menuStyle"
                    :role="ariaRole"
                    :aria-labelledby="parentField?.labelId"
                    :aria-hidden="!inline && (disabled || !isActive)"
                    :aria-modal="!inline && trapFocus">
                    <!--
                        @slot Place dropdown items here
                        @binding {boolean} active - dropdown active state
                        @binding {() => void} toggle - toggle dropdown active state
                    -->
                    <slot :active="isActive" :toggle="toggle">
                        <template v-for="group in groupedOptions">
                            <o-dropdown-item
                                v-if="group.group"
                                v-show="!group.hidden"
                                :key="group.key"
                                v-bind="group.attrs"
                                tabindex="-1">
                                {{ group.group }}
                            </o-dropdown-item>

                            <o-dropdown-item
                                v-for="option in group.options"
                                v-show="!option.hidden"
                                :key="option.key"
                                :value="option.value"
                                v-bind="option.attrs">
                                {{ option.label }}
                            </o-dropdown-item>
                        </template>
                    </slot>
                </component>
            </transition>
        </PositionWrapper>
    </div>
</template>
