<script setup lang="ts">
import { ref, computed, watch, nextTick, useId, type Component } from "vue";

import PositionWrapper from "../utils/PositionWrapper.vue";

import { getDefault } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import { defineClasses, useClickOutside } from "@/composables";

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
    triggers: () => getDefault("tooltip.triggers", ["hover", "focus"]),
    delay: undefined,
    closeable: () =>
        getDefault("tooltip.closeable", ["escape", "outside", "content"]),
    teleport: () => getDefault("dropdown.teleport", false),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /** on active change to false event */
    close: [];
    /** on active change to true event */
    open: [];
}>();

const isActive = defineModel<boolean>("active", { default: false });

watch(isActive, (value) => {
    if (value) emits("open");
    else emits("close");
});

const tooltipId = useId();

const timer = ref();

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

// --- Event Handler ---

const contentRef = ref<HTMLElement | Component>();
const triggerRef = ref<HTMLElement>();

const cancelOptions = computed<string[]>(() =>
    typeof props.closeable === "boolean"
        ? props.closeable
            ? ["escape", "outside", "content"]
            : []
        : props.closeable,
);

// set click outside handler
if (isClient && cancelOptions.value.includes("outside")) {
    useClickOutside([contentRef, triggerRef], onClickedOutside, {
        trigger: isActive,
        passive: true,
    });
}

/** Close tooltip if clicked outside. */
function onClickedOutside(): void {
    if (!isActive.value || props.always) return;
    if (!cancelOptions.value.includes("outside")) return;
    isActive.value = false;
}

/** Escape keydown event that is bound to the trigger */
function onEscape(): void {
    if (!isActive.value) return;
    if (!cancelOptions.value.includes("escape")) return;
    isActive.value = false;
}

function onClick(): void {
    if (!props.triggers.includes("click")) return;
    // if not active, toggle after clickOutside event
    // this fixes toggling programmatic
    nextTick(() => setTimeout(() => open()));
}

function onContextMenu(event: Event): void {
    if (!props.triggers.includes("contextmenu")) return;
    event.preventDefault();
    open();
}

function onFocus(): void {
    if (!props.triggers.includes("focus")) return;
    open();
}

function onHover(): void {
    if (!props.triggers.includes("hover")) return;
    open();
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
    if (!cancelOptions.value.includes("content")) return;
    isActive.value = !props.closeable;
    if (timer.value && props.closeable) clearTimeout(timer.value);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-tip"],
    [
        "teleportClass",
        "o-tip--teleport",
        null,
        computed(() => !!props.teleport),
    ],
);

const triggerClasses = defineClasses(["triggerClass", "o-tip__trigger"]);

const contentClasses = defineClasses(
    ["contentClass", "o-tip__content"],
    [
        "positionClass",
        "o-tip__content--",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "variantClass",
        "o-tip__content--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "multilineClass",
        "o-tip__content--multiline",
        null,
        computed(() => props.multiline),
    ],
    [
        "alwaysClass",
        "o-tip__content--always",
        null,
        computed(() => props.always),
    ],
);

const arrowClasses = defineClasses(
    ["arrowClass", "o-tip__arrow"],
    [
        "arrowPositionClass",
        "o-tip__arrow--",
        autoPosition,
        computed(() => !!autoPosition.value),
    ],
    [
        "variantArrowClass",
        "o-tip__arrow--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);
</script>

<template>
    <div :class="rootClasses" data-oruga="tooltip">
        <component
            :is="triggerTag"
            ref="triggerRef"
            :class="triggerClasses"
            aria-haspopup="true"
            :aria-describedby="tooltipId"
            @keydown.escape="onEscape"
            @click="onClick"
            @contextmenu="onContextMenu"
            @mouseenter="onHover"
            @focus.capture="onFocus"
            @blur.capture="onClose"
            @mouseleave="onClose">
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
