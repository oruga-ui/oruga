<script setup lang="ts" generic="T, IsMultiple extends boolean = false">
import {
    computed,
    nextTick,
    ref,
    watch,
    onUnmounted,
    type Component,
} from "vue";

import ODropdownItem from "../dropdown/DropdownItem.vue";
import PositionWrapper from "../utils/PositionWrapper.vue";

import { getOption } from "@/utils/config";
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
} from "@/composables";

import type { DynamicComponent } from "@/types";
import type { DropdownComponent } from "./types";
import type { DropdownProps } from "./props";

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
    maxHeight: () => getOption("dropdown.maxHeight", 200),
    position: () => getOption("dropdown.position", "bottom-left"),
    animation: () => getOption("dropdown.animation", "fade"),
    trapFocus: () => getOption("dropdown.trapFocus", true),
    checkScroll: () => getOption("dropdown.checkScroll", false),
    expanded: false,
    menuId: undefined,
    menuTabindex: undefined,
    menuTag: () => getOption<DynamicComponent>("dropdown.menuTag", "div"),
    triggerTag: () => getOption<DynamicComponent>("dropdown.triggerTag", "div"),
    triggers: () => getOption("dropdown.triggers", ["click"]),
    delay: undefined,
    closeable: () =>
        getOption("dropdown.closeable", ["escape", "outside", "content"]),
    tabindex: 0,
    ariaRole: () => getOption("dropdown.ariaRole", "list"),
    desktopModal: () => getOption("dropdown.desktopModal", false),
    mobileModal: () => getOption("dropdown.mobileModal", true),
    mobileBreakpoint: () => getOption("dropdown.mobileBreakpoint"),
    teleport: () => getOption("dropdown.teleport", false),
});

const emits = defineEmits<{
    /**
     * modelValue prop two-way binding
     * @param value {string | number | object | array} updated modelValue prop
     */
    (e: "update:modelValue", value: ModelValue): void;
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on change event - fired after update:modelValue
     * @param value {string | number | object | array} selected value
     */
    (e: "change", value: ModelValue): void;
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

const contentRef = ref<HTMLElement | Component>();
const triggerRef = ref<HTMLElement>();

/** The selected item value, use v-model to make it two-way binding */
const vmodel = defineModel<ModelValue>({ default: undefined });

/** The active state of the dropdown, use v-model:active to make it two-way binding */
const isActive = defineModel<boolean>("active", { default: false });

/** normalized programamtic options */
const groupedOptions = computed(() => {
    const normalizedOptions = normalizeOptions<T>(props.options);
    const groupedOptions = toOptionsGroup(normalizedOptions);
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

// --- Event Handler ---

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

            if (cancelOptions.value.includes("escape")) {
                // set keyup handler
                eventCleanups.push(
                    useEventListener("keyup", onKeyPress, document, {
                        immediate: true,
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
    emits("close", "outside");
    isActive.value = false;
}

/** Keypress event that is bound to the document */
function onKeyPress(event: KeyboardEvent): void {
    if (isActive.value && (event.key === "Escape" || event.key === "Esc")) {
        if (!cancelOptions.value.includes("escape")) return;
        emits("close", "escape");
        isActive.value = false;
    }
}

function onClick(): void {
    // check if is mobile native and hoverable together
    if (isMobileNative && hoverable.value) toggle();
    // check normal click conditions
    if (!props.triggers.includes("click")) return;
    toggle();
}

function onContextMenu(event: MouseEvent): void {
    if (!props.triggers.includes("contextmenu")) return;
    event.preventDefault();
    open();
}

function onFocus(): void {
    if (!props.triggers.includes("focus")) return;
    open();
}

const isHovered = ref(false);
function onHover(): void {
    if (isMobileNative) return;
    if (!props.triggers.includes("hover")) return;
    isHovered.value = true;
    open();
}
function onHoverLeave(): void {
    if (isMobileNative) return;
    if (!isHovered.value) return;
    isHovered.value = false;
    onClose();
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
        timer = setTimeout(() => {
            isActive.value = true;
            timer = undefined;
        }, props.delay);
    } else {
        isActive.value = true;
    }
}

function onClose(): void {
    if (!cancelOptions.value.includes("content")) return;
    emits("close", "content");
    isActive.value = !props.closeable;
    if (timer && props.closeable) clearTimeout(timer);
}

// --- InfitiveScroll Feature ---

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

// --- Dependency Injection Feature ---

/**
 * Click listener from DropdownItem.
 *   1. Set new selected item.
 *   2. Emit input event to update the user v-model.
 *   3. Close the dropdown.
 */
function selectItem(value: T): void {
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
    if (!props.multiple) {
        if (cancelOptions.value.indexOf("content") < 0) return;
        emits("close", "content");
        isActive.value = false;
        isHovered.value = false;
    }
}

// Provided data is a computed ref to enjure reactivity.
const provideData = computed<DropdownComponent<T>>(() => ({
    disabled: props.disabled,
    multiple: isTrueish(props.multiple),
    selected: vmodel.value,
    selectItem,
}));

/** Provide functionalities and data to child item components */
useProviderParent(contentRef, { data: provideData });

// --- Computed Component Classes ---

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

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ $trigger: triggerRef, $content: contentRef, value: vmodel });
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
