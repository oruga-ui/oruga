<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    useId,
    useTemplateRef,
    type Component,
} from "vue";

import PositionWrapper from "../utils/PositionWrapper.vue";

import { getDefault } from "@/utils/config";
import { toCssDimension } from "@/utils/helpers";
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
    id: () => useId(),
    variant: () => getDefault("tooltip.variant"),
    position: () => getDefault("tooltip.position", "auto"),
    always: false,
    disabled: false,
    animation: () => getDefault("tooltip.animation", "fade"),
    multiline: false,
    maxWidth: () => getDefault("tooltip.maxWidth"),
    triggerTag: () => getDefault("tooltip.triggerTag", "div"),
    openOnHover: () => getDefault("tooltip.openOnHover", true),
    openOnFocus: () => getDefault("tooltip.openOnFocus", false),
    openOnClick: () => getDefault("tooltip.openOnClick", false),
    openOnContextmenu: () => getDefault("tooltip.openOnContextmenu", false),
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

defineSlots<{
    /**
     * Tooltip trigger slot
     * @param active {boolean} - tooltip active state
     */
    default?(props: { active: boolean }): void;
    /** Override the Tooltip content, default is label prop */
    content?(): void;
}>();

const isActive = defineModel<boolean>("active", { default: false });

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

const rootRef = useTemplateRef<HTMLElement>("rootElement");
const triggerRef = useTemplateRef<HTMLElement | Component>("triggerRef");
const contentRef = ref<HTMLElement>();

const contentStyle = computed(() => ({
    maxWidth: props.maxWidth ? toCssDimension(props.maxWidth) : undefined,
    whiteSpace: props.maxWidth ? "wrap" : undefined,
}));

// #region --- Event Handler ---

if (isClient) {
    // register onKeyup event listener when is active
    useEventListener(rootRef, "keyup", onKeyup, {
        trigger: isActive,
        passive: true,
    });

    // set click outside handler
    useClickOutside([contentRef, triggerRef], onClickedOutside, {
        trigger: isActive,
        passive: true,
    });
}

/** Keyup event listener that is bound to the root element. */
function onKeyup(event: KeyboardEvent): void {
    if (!props.closeOnEscape) return;
    if (event.key === "Escape" || event.key === "Esc") close(event);
}

/** Close tooltip if clicked outside. */
function onClickedOutside(event: Event): void {
    if (!props.closeOnOutside) return;
    close(event);
}

/** Close tooltip if content lost focus. */
function onHoverLeave(event: Event): void {
    if (!props.closeable && !props.closeOnOutside) return;
    close(event);
}

function onClick(event: Event): void {
    if (!props.openOnClick) return;
    open(event);
}

/** Open content when trigger is right clicked. */
function onContextMenu(event: Event): void {
    if (!props.openOnContextmenu) return;
    event.preventDefault();
    open(event);
}

/** Open content when trigger receives focus. */
function onFocus(event: Event): void {
    if (!props.openOnFocus) return;
    open(event);
}

/** Open content when trigger is hovered. */
function onHover(event: Event): void {
    if (!props.openOnHover || props.openOnClick || props.openOnContextmenu)
        return;
    open(event);
}

let timeout: ReturnType<typeof setTimeout> | undefined;

function open(event: Event): void {
    if (isActive.value || props.disabled) return;

    // always open on the next JS loop after all events have been handled
    timeout = setTimeout(() => {
        isActive.value = true;
        timeout = undefined;
        emits("open", event);
    }, props.delay);
}

function close(event: Event): void {
    if (!isActive.value) return;
    if (timeout) clearTimeout(timeout);
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
    // @deprecated `multiline` will be removed later
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
            :aria-describedby="id"
            @click="onClick"
            @contextmenu="onContextMenu"
            @pointerenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="onHoverLeave"
            @pointerleave="onHoverLeave">
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
                    :id="id"
                    :ref="(el) => (contentRef = setContent(el as HTMLElement))"
                    :class="contentClasses"
                    :style="contentStyle"
                    role="tooltip">
                    <span :class="arrowClasses"></span>
                    <slot name="content">{{ label }}</slot>
                </div>
            </transition>
        </PositionWrapper>
    </div>
</template>
