<script setup lang="ts">
import { computed, nextTick, ref, watch, type PropType, type Ref } from "vue";

import PositionWrapper from "../utils/PositionWrapper.vue";

import { getOption } from "@/utils/config";
import { vTrapFocus } from "@/directives/trapFocus";
import { toCssDimension, isMobileAgent } from "@/utils/helpers";
import { isClient } from "@/utils/ssr";
import {
    unrefElement,
    defineClasses,
    useVModelBinding,
    useMatchMedia,
    useEventListener,
    usePropBinding,
    useClickOutside,
} from "@/composables";

import { provideDropdown } from "./useDropdownShare";

import type { ComponentClass, DynamicComponent } from "@/types";

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

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** @model */
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        default: undefined,
    },
    /** The active state of the dropdown, use v-model:active to make it two-way binding. */
    active: { type: Boolean, default: false },
    /** Trigger label, unnecessary when trgger slot is used */
    label: { type: String, default: undefined },
    /** Dropdown is disabled */
    disabled: { type: Boolean, default: false },
    /** Dropdown content (items) are shown inline, trigger is removed */
    inline: { type: Boolean, default: false },
    /** Dropdown content will be scrollable */
    scrollable: { type: Boolean, default: false },
    /** Max height of dropdown content */
    maxHeight: {
        type: [String, Number],
        default: () => getOption("dropdown.maxHeight", 200),
    },
    /**
     * Position of the dropdown relative to the trigger
     * @values auto, top, bottom, left, right, top-right, top-left, bottom-left, bottom-right
     */
    position: {
        type: String,
        default: () => getOption("dropdown.position", "bottom-left"),
        validator: (value: string) =>
            [
                "auto",
                "top",
                "bottom",
                "left",
                "right",
                "top-right",
                "top-left",
                "bottom-left",
                "bottom-right",
            ].indexOf(value) > -1,
    },
    /** Dropdown content (items) are shown into a modal on mobile */
    mobileModal: {
        type: Boolean,
        default: () => getOption("dropdown.mobileModal", true),
    },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("dropdown.animation", "fade"),
    },
    /** Allows multiple selections */
    multiple: { type: Boolean, default: false },
    /** Trap focus inside the dropdown. */
    trapFocus: {
        type: Boolean,
        default: () => getOption("dropdown.trapFocus", true),
    },
    /** Makes the component check if menu reached scroll start or end and emit scroll events. */
    checkScroll: {
        type: Boolean,
        default: () => getOption("dropdown.checkScroll", false),
    },
    /** Dropdown will be expanded (full-width) */
    expanded: { type: Boolean, default: false },
    /** HTML element ID of the dropdown menu element */
    menuId: { type: String, default: null },
    /** Tabindex of the dropdown menu element */
    menuTabindex: { type: Number, default: null },
    /** Dropdown menu tag name */
    menuTag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () => getOption<DynamicComponent>("dropdown.menuTag", "div"),
    },
    /** Dropdown trigger tag name */
    triggerTag: {
        type: [String, Object, Function] as PropType<DynamicComponent>,
        default: () =>
            getOption<DynamicComponent>("dropdown.triggerTag", "div"),
    },
    /**
     * Dropdown will be triggered by any events
     * @values click, hover, contextmenu, focus
     */
    triggers: {
        type: Array as PropType<string[]>,
        default: () => getOption("dropdown.triggers", ["click"]),
        validator: (values: string[]) =>
            values.filter(
                (value) =>
                    ["click", "hover", "contextmenu", "focus"].indexOf(value) >
                    -1,
            ).length === values.length,
    },
    /** Dropdown delay before it appears (number in ms) */
    delay: { type: Number, default: undefined },
    /**
     * Dropdown close options (pressing escape, clicking the content or outside)
     * @values true, false, escape, outside, content
     */
    closeable: {
        type: [Array, Boolean] as PropType<string[] | boolean>,
        default: () =>
            getOption("dropdown.closeable", ["escape", "outside", "content"]),
    },
    /** Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key) */
    tabindex: { type: Number, default: 0 },
    /**
     * Role attribute to be passed to the list container for better accessibility.
     * Use menu only in situations where your dropdown is related to a navigation menu.
     * @values list, listbox, menu, dialog
     */
    ariaRole: {
        type: String,
        default: getOption("dropdown.ariaRole", "list"),
        validator: (value: string) =>
            ["list", "listbox", "menu", "dialog"].indexOf(value) > -1,
    },
    /** Mobile breakpoint as max-width value */
    mobileBreakpoint: {
        type: String,
        default: () => getOption("dropdown.mobileBreakpoint"),
    },
    /**
     * Append the component to another part of the DOM.
     * Set `true` to append the component to the body.
     * In addition, any CSS selector string or an actual DOM node can be used.
     */
    teleport: {
        type: [Boolean, String, Object],
        default: () => getOption("dropdown.teleport", false),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class when the dropdown is teleported */
    teleportClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the trigger element */
    triggerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of dropdown menu when inline */
    inlineClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the overlay when on mobile */
    menuMobileOverlayClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the dropdown menu */
    menuClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of dropdown menu position */
    menuPositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of dropdown menu when active */
    menuActiveClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of dropdown when on mobile */
    mobileClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of dropdown when disabled */
    disabledClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of dropdown when expanded */
    expandedClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {[String, Number, Boolean, Object, Array]} updated modelValue prop
     */
    (
        e: "update:modelValue",
        value: [string, number, boolean, object, Array<any>],
    ): void;
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on change event
     * @param value {any} selected value
     */
    (e: "change", value: any): void;
    /**
     * on close event
     * @param method {string} close method
     */
    (e: "close", method: string): void;
    /** the list inside the dropdown reached the start */
    (e: "scroll-start"): void;
    /** the list inside the dropdown reached it's end */
    (e: "scroll-end"): void;
}>();

const vmodel = useVModelBinding<[string, number, boolean, object, Array<any>]>(
    props,
    emits,
    { passive: true },
) as Ref<any>;

const isActive = usePropBinding<boolean>("active", props, emits, {
    passive: true,
});

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

/** toggle isActive value when prop is changed */
watch(
    () => props.active,
    (value) => {
        if (!value) isActive.value = value;
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        else setTimeout(() => (isActive.value = value));
    },
);

const { isMobile } = useMatchMedia(props.mobileBreakpoint);

// check if mobile modal should be shown
const isMobileModal = computed(
    () => isMobile.value && props.mobileModal && !props.inline,
);

// check if client is mobile native
const isMobileNative = computed(() => props.mobileModal && isMobileAgent.any());

const menuStyle = computed(() => ({
    maxHeight: props.scrollable ? toCssDimension(props.maxHeight) : null,
    overflow: props.scrollable ? "auto" : null,
}));

const hoverable = computed(() => props.triggers.indexOf("hover") >= 0);

// --- Event Handler ---

const contentRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();

const eventCleanups = ref([]);
const timer = ref();

watch(isActive, (value) => {
    // on active set event handler
    if (value && isClient) {
        setTimeout(() => {
            if (cancelOptions.value.indexOf("outside") >= 0) {
                // set outside handler
                eventCleanups.value.push(
                    useClickOutside(contentRef, onClickedOutside, [triggerRef]),
                );
            }

            if (cancelOptions.value.indexOf("escape") >= 0) {
                // set keyup handler
                eventCleanups.value.push(
                    useEventListener("keyup", onKeyPress, document, {
                        immediate: true,
                    }),
                );
            }
        });
    } else if (!value) {
        // on close cleanup event handler
        eventCleanups.value.forEach((fn) => fn());
        eventCleanups.value.length = 0;
    }
});

const cancelOptions = computed(() =>
    typeof props.closeable === "boolean"
        ? props.closeable
            ? ["escape", "outside", "content"]
            : []
        : props.closeable,
);

/** Close dropdown if clicked outside. */
function onClickedOutside(): void {
    if (!isActive.value || props.inline) return;
    if (cancelOptions.value.indexOf("outside") < 0) return;
    emits("close", "outside");
    isActive.value = false;
}

/** Keypress event that is bound to the document */
function onKeyPress(event: KeyboardEvent): void {
    if (isActive.value && (event.key === "Escape" || event.key === "Esc")) {
        if (cancelOptions.value.indexOf("escape") < 0) return;
        emits("close", "escape");
        isActive.value = false;
    }
}

function onClick(): void {
    if (props.triggers.indexOf("click") < 0) return;
    toggle();
}

function onContextMenu(event: MouseEvent): void {
    if (props.triggers.indexOf("contextmenu") < 0) return;
    event.preventDefault();
    open();
}

function onFocus(): void {
    if (props.triggers.indexOf("focus") < 0) return;
    open();
}

const isHovered = ref(false);
function onHover(): void {
    if (!isMobileNative.value && props.triggers.indexOf("hover") >= 0) {
        isHovered.value = true;
        open();
    }
}
function onHoverLeave(): void {
    if (!isMobileNative.value && isHovered.value) {
        isHovered.value = false;
        onClose();
    }
}

/** Toggle dropdown if it's not disabled. */
function toggle(): void {
    if (props.disabled) return;
    if (isActive.value) isActive.value = !isActive.value;
    // if not active, toggle after clickOutside event
    // this fixes toggling programmatic
    else nextTick(() => (isActive.value = !isActive.value));
}

function open(): void {
    if (props.disabled) return;
    if (props.delay) {
        timer.value = setTimeout(() => {
            isActive.value = true;
            timer.value = null;
        }, props.delay);
    } else {
        isActive.value = true;
    }
}

function onClose(): void {
    if (cancelOptions.value.indexOf("content") < 0) return;
    emits("close", "content");
    isActive.value = !props.closeable;
    if (timer.value && props.closeable) clearTimeout(timer.value);
}

// --- InfitiveScroll Feature ---

if (isClient && props.checkScroll)
    useEventListener("scroll", checkDropdownScroll, contentRef);

/** Check if the scroll list inside the dropdown reached the top or it's end. */
function checkDropdownScroll(): void {
    const dropdown = unrefElement(contentRef.value);
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

// --- Field Dependency Injection Feature ---

/**
 * Click listener from DropdownItem.
 *   1. Set new selected item.
 *   2. Emit input event to update the user v-model.
 *   3. Close the dropdown.
 */
function selectItem(value: any): void {
    if (props.multiple) {
        if (vmodel.value && Array.isArray(vmodel.value)) {
            if (vmodel.value.indexOf(value) === -1) {
                // Add value
                vmodel.value = [...vmodel.value, value];
            } else {
                // Remove value
                vmodel.value = vmodel.value.filter((val) => val !== value);
            }
        } else {
            // Init value array
            vmodel.value = [value];
        }
        emits("change", vmodel.value);
    } else {
        if (vmodel.value !== value) {
            // Upodate value
            vmodel.value = value;
            emits("change", vmodel.value);
        }
    }
    if (!props.multiple) {
        if (cancelOptions.value.indexOf("content") < 0) return;
        emits("close", "content");
        isActive.value = false;
        isHovered.value = false;
    }
}

// Provided data is a computed ref to enjure reactivity.
const provideData = computed(() => ({
    props,
    selected: vmodel.value,
    selectItem,
}));

// Provide field component data via dependency injection.
provideDropdown(provideData);

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-drop"],
    ["disabledClass", "o-drop--disabled", null, computed(() => props.disabled)],
    ["expandedClass", "o-drop--expanded", null, computed(() => props.expanded)],
    ["inlineClass", "o-drop--inline", null, computed(() => props.inline)],
    [
        "mobileClass",
        "o-drop--mobile",
        null,
        computed(() => isMobileModal.value && !hoverable.value),
    ],
);

const triggerClasses = defineClasses(["triggerClass", "o-drop__trigger"]);

const positionWrapperClasses = defineClasses([
    "teleportClass",
    "o-drop--teleport",
    null,
    computed(() => !!props.teleport),
]);

const menuMobileOverlayClasses = defineClasses([
    "menuMobileOverlayClass",
    "o-drop__overlay",
]);

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

// --- Expose Public Functionality ---

/** expose functionalities for programmatic usage */
defineExpose({ $trigger: triggerRef, $content: contentRef });
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
            :aria-haspopup="ariaRole === 'list' ? true : ariaRole"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus">
            <!--
                @slot Override the trigger element, default is label prop 
                @binding {boolean} active - dropdown active state
            -->
            <slot name="trigger" :active="isActive">
                {{ label }}
            </slot>
        </component>

        <PositionWrapper
            v-model:position="autoPosition"
            :teleport="teleport"
            :class="[...rootClasses, ...positionWrapperClasses]"
            :trigger="triggerRef"
            :content="contentRef"
            :disabled="!isActive"
            default-position="bottom"
            :disable-positioning="!isMobileModal">
            <transition :name="animation">
                <div
                    v-if="isMobileModal"
                    v-show="isActive"
                    :class="menuMobileOverlayClasses"
                    :aria-hidden="!isActive" />
            </transition>

            <transition :name="animation">
                <component
                    :is="menuTag"
                    v-show="(!disabled && (isActive || isHovered)) || inline"
                    :id="menuId"
                    ref="contentRef"
                    v-trap-focus="trapFocus"
                    :tabindex="menuTabindex"
                    :class="menuClasses"
                    :aria-hidden="!isActive"
                    :role="ariaRole"
                    :aria-modal="!inline && trapFocus"
                    :style="menuStyle">
                    <!--
                        @slot Place dropdown items here 
                        @binding {boolean} active - dropdown active state
                        @binding {boolean} toggle - toggle active state function
                    -->
                    <slot :active="isActive" :toggle="toggle" />
                </component>
            </transition>
        </PositionWrapper>
    </div>
</template>
