<script setup lang="ts">
import { ref, computed, onMounted, useId, useTemplateRef } from "vue";

import { getDefault } from "@/utils/config";
import { toCssDimension } from "@/utils/helpers";
import {
    defineClasses,
    useEventListener,
    usePopoverAPI,
    useTeleport,
} from "@/composables";

import type { TooltipProps } from "./props";

/**
 * Display a brief helper text on hover to the user.
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
    position: () => getDefault("tooltip.position", "top"),
    always: false,
    disabled: false,
    animation: () => getDefault("tooltip.animation", "fade"),
    maxWidth: () => getDefault("tooltip.maxWidth"),
    delay: undefined,
    teleport: () => getDefault("tooltip.teleport", false),
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
     * Tooltip trigger slot — the first element in this slot becomes the trigger
     * @param active {boolean} - tooltip active state
     */
    default?(props: { active: boolean }): void;
    /** Override the Tooltip content, default is label prop */
    content?(): void;
}>();

const isActive = defineModel<boolean>("active", { default: false });

const rootRef = useTemplateRef<HTMLElement>("rootElement");
const contentRef = useTemplateRef<HTMLElement>("contentElement");
const triggerRef = ref<Element | null>(null);

const _teleport = useTeleport(props.teleport);

// Register onMounted BEFORE usePopoverAPI so our hook runs first,
// setting triggerRef.value before usePopoverAPI's own onMounted resolves it.
onMounted(() => {
    if (!rootRef.value) return;

    const trigger = rootRef.value.firstElementChild;
    if (!trigger)
        throw new Error("OTooltip requires an element in the default slot.");

    triggerRef.value = trigger;

    // wire a11y association
    trigger.setAttribute("aria-describedby", props.id);

    // keep tooltip always visible when `always` is set
    if (props.always && !props.disabled) isActive.value = true;
});

// Wire hover/focus events onto the trigger ref reactively
useEventListener(triggerRef, "pointerenter", onHover, { passive: true });
useEventListener(triggerRef, "pointerleave", onHoverLeave, { passive: true });
useEventListener(triggerRef, "focus", onFocus, { passive: true });
useEventListener(triggerRef, "blur", onBlur, { passive: true });

const { open, close } = usePopoverAPI({
    position: props.position,
    delay: props.delay,
    behavior: "manual",
    trigger: isActive,
    disabled: () => props.disabled,
    targetRef: triggerRef,
    contentRef,
    onToggle,
    onBeforeToggle,
});

// #region --- Event Handler ---

function onBeforeToggle(event: ToggleEvent): void {
    if (event.newState === "open") emits("open", event);
    else emits("close", event);
}

function onToggle(event: ToggleEvent): void {
    isActive.value = event.newState === "open";
}

function onHover(): void {
    open();
}

function onHoverLeave(): void {
    close();
}

function onFocus(): void {
    open();
}

function onBlur(): void {
    close();
}

// #endregion --- Event Handler ---

const contentStyle = computed(() => ({
    maxWidth: props.maxWidth ? toCssDimension(props.maxWidth) : undefined,
    whiteSpace: props.maxWidth ? "wrap" : undefined,
}));

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-tooltip"],
    [
        "disabledClass",
        "o-tooltip--disabled",
        null,
        computed(() => props.disabled),
    ],
    ["activeClass", "o-tooltip--active", null, isActive],
    [
        "teleportClass",
        "o-tooltip--teleport",
        null,
        computed(() => !_teleport.disabled),
    ],
);

const contentClasses = defineClasses(
    ["contentClass", "o-tooltip__content"],
    ["contentActiveClass", "o-popover__content--active", null, isActive],
    [
        "contentVariantClass",
        "o-tooltip__content--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

const arrowClasses = defineClasses(
    ["arrowClass", "o-tooltip__arrow"],
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
        <slot :active="isActive" />

        <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
            <transition :name="animation">
                <!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
                <div
                    :id="id"
                    ref="contentElement"
                    :class="contentClasses"
                    :style="contentStyle"
                    role="tooltip">
                    <span :class="arrowClasses"></span>
                    <slot name="content">{{ label }}</slot>
                </div>
            </transition>
        </Teleport>
    </div>
</template>
