<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    nextTick,
    useId,
    useTemplateRef,
    type Component,
} from "vue";

import PositionWrapper from "../utils/PositionWrapper.vue";

import { getDefault } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    useClickOutside,
    useEventListener,
} from "@/composables";

import type { TooltipProps } from "./props";

/**
 * Display a brief helper text to your user.
 * @displayName Tooltip
 * @style _tooltip.scss
 */
defineOptions({
    isOruga: true,
    name: "OTooltip",
    configField: "tooltip",
});

const props = withDefaults(defineProps<TooltipProps>(), {
    override: undefined,
    active: false,
    label: undefined,
    variant: () => getDefault("tooltip.variant"),
    position: () => getDefault("tooltip.position", "auto"),
    always: false,
    disabled: false,
    animation: () => getDefault("tooltip.animation", "fade"),
    multiline: false,
    triggerTag: () => getDefault("tooltip.triggerTag", "div"),
    triggers: () => getDefault("tooltip.triggers", []),
    openOnClick: () => getDefault("tooltip.openOnClick", false),
    openOnContextmenu: () => getDefault("tooltip.openOnContextmenu", false),
    openOnHover: () => getDefault("tooltip.openOnHover", true),
    openOnFocus: () => getDefault("tooltip.openOnFocus", false),
    delay: undefined,
    closeable: () => getDefault("tooltip.closeable", true),
    closeOnEscape: () => getDefault("tooltip.closeOnEscape", false),
    closeOnOutside: () => getDefault("tooltip.closeOnOutside", false),
    teleport: () => getDefault("dropdown.teleport", false),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on active state changes to false
     * @param event {Event} - native event
     */
    close: [event: Event];
    /**
     * on active state changes to true
     * @param event {Event} - native event
     */
    open: [event: Event];
}>();

const isActive = defineModel<boolean>("active", { default: false });

const tooltipId = useId();

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

const rootRef = useTemplateRef<HTMLElement>("rootElement");
const triggerRef = useTemplateRef<HTMLElement | Component>("triggerRef");
const contentRef = ref<HTMLElement>();

// #region --- Event Handler ---

// set click outside handler
if (isClient) {
    // register onKeyup event listener when is active
    useEventListener(rootRef, "keyup", onKeyup, {
        trigger: isActive,
        passive: true,
    });

    useClickOutside([contentRef, triggerRef], onClickedOutside, {
        trigger: isActive,
        passive: true,
    });
}

/** Keyup event listener that is bound to the root element. */
function onKeyup(event: KeyboardEvent): void {
    if (!props.closeOnEscape && checkNotCloseable("escape")) return;
    if (event.key === "Escape" || event.key === "Esc") close(event);
}

/** Close tooltip if clicked outside. */
function onClickedOutside(event: Event): void {
    if (!props.closeOnOutside && checkNotCloseable("outside")) return;
    close(event);
}

function onHoverLeave(event: Event): void {
    if (props.closeOnOutside && checkNotCloseable("content")) return;
    close(event);
}

function onClick(event: Event): void {
    if (!props.openOnClick && !props.triggers.includes("click")) return;
    // if not active, toggle after clickOutside event
    // this fixes toggling programmatic
    nextTick(() => setTimeout(() => open(event)));
}

function onContextMenu(event: Event): void {
    if (!props.openOnContextmenu && !props.triggers.includes("contextmenu"))
        return;
    event.preventDefault();
    open(event);
}

function onFocus(event: Event): void {
    if (!props.openOnFocus && !props.triggers.includes("focus")) return;
    open(event);
}

function onHover(event: Event): void {
    if (
        (!props.openOnHover || props.openOnClick || props.openOnContextmenu) &&
        !props.triggers.includes("hover")
    )
        return;
    open(event);
}

let timer: ReturnType<typeof setTimeout> | undefined;

function open(event: Event): void {
    if (props.disabled) return;
    if (props.delay) {
        timer = setTimeout(() => {
            isActive.value = true;
            timer = undefined;
            emits("open", event);
        }, props.delay);
    } else {
        nextTick(() => (isActive.value = true));
        emits("open", event);
    }
}

/** check if method is cancelable (for deprecreated check) */
function checkNotCloseable(
    method: Exclude<typeof props.closeable, boolean>[number],
): boolean {
    return !Array.isArray(props.closeable) || !props.closeable.includes(method);
}

function close(event: Event): void {
    if (!isActive.value || !props.closeable) return;
    if (timer) clearTimeout(timer);
    isActive.value = false;
    emits("close", event);
}

// #endregion --- Event Handler ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-tooltip"],
    [
        "teleportClass",
        "o-tooltip--teleport",
        null,
        computed(() => !!props.teleport),
    ],
);

const triggerClasses = defineClasses(["triggerClass", "o-tooltip__trigger"]);

const contentClasses = defineClasses(
    ["contentClass", "o-tooltip__content"],
    [
        "positionClass",
        "o-tooltip__content--",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "variantClass",
        "o-tooltip__content--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "multilineClass",
        "o-tooltip__content--multiline",
        null,
        computed(() => props.multiline),
    ],
    [
        "alwaysClass",
        "o-tooltip__content--always",
        null,
        computed(() => props.always),
    ],
);

const arrowClasses = defineClasses(
    ["arrowClass", "o-tooltip__arrow"],
    [
        "arrowPositionClass",
        "o-tooltip__arrow--",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "arrowVariantClass",
        "o-tooltip__arrow--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <div ref="rootElement" data-oruga="tooltip" :class="rootClasses">
        <component
            :is="triggerTag"
            ref="triggerRef"
            :class="triggerClasses"
            aria-haspopup="true"
            :aria-describedby="tooltipId"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="onHoverLeave"
            @mouseleave="onHoverLeave">
            <!--
                @slot Tooltip trigger slot
                @binding {boolean} active - tooltip active state
            -->
            <slot :active="isActive" />
        </component>

        <PositionWrapper
            v-slot="{ setContent }"
            v-model:position="autoPosition"
            :teleport="teleport"
            :class="rootClasses"
            :trigger="triggerRef"
            default-position="top"
            :disabled="!isActive">
            <transition :name="animation">
                <div
                    v-show="isActive || (always && !disabled)"
                    :id="tooltipId"
                    :ref="(el) => (contentRef = setContent(el as HTMLElement))"
                    :class="contentClasses"
                    role="tooltip">
                    <span :class="arrowClasses"></span>

                    <!--
                        @slot Tooltip content, default is label prop
                    -->
                    <slot name="content">{{ label }}</slot>
                </div>
            </transition>
        </PositionWrapper>
    </div>
</template>
