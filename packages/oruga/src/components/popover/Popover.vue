<script setup lang="ts">
import { ref, computed, watch, useId, useTemplateRef, onMounted } from "vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    getTeleportDefault,
    usePopoverAPI,
} from "@/composables";

import type { PopoverProps } from "./props";

/**
 * A popover is a content container that displays rich content over the top of other content.
 * @displayName Popover
 * @style _popover.scss
 */
defineOptions({
    isOruga: true,
    name: "OPopover",
    configField: "popover",
});

const props = withDefaults(defineProps<PopoverProps>(), {
    override: undefined,
    active: false,
    id: () => useId(),
    content: undefined,
    disabled: false,
    variant: () => getDefault("popover.variant"),
    position: () => getDefault("popover.position", "top"),
    animation: () => getDefault("popover.animation", "fade"),
    delay: undefined,
    // closeOnEscape: () => getDefault("popover.closeOnEscape", false),
    // closeOnOutside: () => getDefault("popover.closeOnOutside", false),
    teleport: () => getDefault("popover.teleport", false),
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
     * Define a trigger here
     * @param active {boolean} - popover active state
     */
    default?(props: { active: boolean }): void;
    /** Override the popover content, default is content prop */
    content?(): void;
}>();

const isActive = defineModel<boolean>("active", { default: false });

const rootRef = useTemplateRef("rootElement");
const contentRef = useTemplateRef("contentElement");
const triggerRef = ref<Element>();

onMounted(() => {
    if (!rootRef.value) return;

    // get the trigger element which should be the first element in the default slot
    const trigger = rootRef.value.firstElementChild;

    if (!trigger || trigger === contentRef.value)
        throw new Error("The popover require an element in the default slot.");

    if (!(trigger instanceof Element))
        throw new Error(
            "The popover trigger element must be a valid HTMLElement.",
        );

    triggerRef.value = trigger;
});

const {
    active: activePopover,
    open,
    close,
    toggle,
} = usePopoverAPI({
    position: props.position,
    delay: props.delay,
    triggerRef,
    contentRef,
    onToggle,
    onBeforeToggle,
});

const _teleport = computed(() =>
    typeof props.teleport === "boolean"
        ? { to: getTeleportDefault(), disabled: !props.teleport }
        : { to: props.teleport, disabled: false },
);

// show/hide popover when active prop changes
watch(isActive, (value) => {
    if (activePopover.value === value) return;
    if (value) open();
    else close();
});

// #region --- Event Handler ---

function onBeforeToggle(event: ToggleEvent): void {
    if (event.newState === "open") emits("open", event);
    else emits("close", event);
}

function onToggle(event: ToggleEvent): void {
    if (event.newState === "open") isActive.value = true;
    else isActive.value = false;
}

// #endregion --- Event Handler ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-popover"],
    [
        "teleportClass",
        "o-popover--teleport",
        null,
        computed(() => !!props.teleport),
    ],
);

// TODO: rename to popover
const contentClasses = defineClasses(
    ["contentClass", "o-tooltip__content"],
    [
        "variantClass",
        "o-tooltip__content--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close, open, toggle });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <div ref="rootElement" data-oruga="popup" :class="rootClasses">
        <slot :active="isActive" />

        <Teleport :to="_teleport.to" :disabled="_teleport.disabled">
            <transition :name="animation">
                <!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
                <div
                    :id="id"
                    ref="contentElement"
                    :class="contentClasses"
                    popover>
                    <slot name="content" :dismiss="close">
                        {{ content }}
                    </slot>
                </div>
            </transition>
        </Teleport>
    </div>
</template>
