<script setup lang="ts">
import { ref, computed, watch, useId, useTemplateRef, onMounted } from "vue";

import { getDefault } from "@/utils/config";
import {
    defineClasses,
    getTeleportDefault,
    usePopoverAPI,
} from "@/composables";

import type { PopupProps } from "./props";

/**
 * A popup is a content container that displays the content over the top of other content.
 * @displayName Popup
 * @style _popup.scss
 */
defineOptions({
    isOruga: true,
    name: "OPopup",
    configField: "popup",
});

const props = withDefaults(defineProps<PopupProps>(), {
    override: undefined,
    active: false,
    id: () => useId(),
    content: undefined,
    disabled: false,
    variant: () => getDefault("popup.variant"),
    position: () => getDefault("popup.position", "top"),
    animation: () => getDefault("popup.animation", "fade"),
    maxWidth: () => getDefault("popup.maxWidth"),
    triggerTag: () => getDefault("popup.triggerTag", "div"),
    openOnClick: () => getDefault("popup.openOnClick", false),
    openOnContextmenu: () => getDefault("popup.openOnContextmenu", false),
    delay: undefined,
    closeOnEscape: () => getDefault("popup.closeOnEscape", false),
    closeOnOutside: () => getDefault("popup.closeOnOutside", false),
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
     * Define a trigger here
     * @param active {boolean} - popup active state
     */
    default?(props: { active: boolean }): void;
    /** Override the popup content, default is content prop */
    content?(): void;
}>();

const isActive = defineModel<boolean>("active", { default: false });

const autoPosition = ref(props.position);

/** update autoPosition on prop change */
watch(
    () => props.position,
    (v) => (autoPosition.value = v),
);

const rootRef = useTemplateRef("rootElement");
const contentRef = useTemplateRef("contentElement");
const triggerRef = ref<Element>();

onMounted(() => {
    if (!rootRef.value) return;
    // get the trigger element which should be the first element in the default slot
    const trigger = rootRef.value.firstElementChild;
    if (trigger && trigger !== contentRef.value) triggerRef.value = trigger;
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

// show/hode popover when active prop changes
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

const rootClasses = defineClasses(["rootClass", "o-popup"]);

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
