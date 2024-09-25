<script setup lang="ts">
import { ref, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import { defineClasses, useEventListener } from "@/composables";

import type { ComponentClass } from "@/types";

/**
 * A simple loading overlay
 * @displayName Loading
 * @style _loading.scss
 */
defineOptions({
    isOruga: true,
    name: "OLoading",
    configField: "loading",
    inheritAttrs: false,
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /** Whether loading is active or not, use v-model:active to make it two-way binding */
    active: { type: Boolean, default: false },
    /** Loader will overlay the full page. */
    fullPage: { type: Boolean, default: true },
    /** Notification label, unnecessary when default slot is used. */
    label: { type: String, default: undefined },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("loading.animation", "fade"),
    },
    /** Is Loading cancable by pressing escape or clicking outside. */
    cancelable: { type: Boolean, default: false },
    /** Icon name to show, unnecessary when default slot is used. */
    icon: {
        type: String,
        default: () => getOption("loading.icon", "loading"),
    },
    /** Enable spin effect on icon */
    iconSpin: {
        type: Boolean,
        default: () => getOption("loading.iconSpin", true),
    },
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize: {
        type: String,
        default: () => getOption("loading.iconSize", "medium"),
    },
    // class props (will not be displayed in the docs)
    /** Class of the root element */
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for the root element when fullpage */
    fullPageClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the loading overlay */
    overlayClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for the loading icon */
    iconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class for the loading label */
    labelClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * fullPage prop two-way binding
     * @param value {boolean} - updated fullPage prop
     */
    (e: "update:fullPage", value: boolean): void;
    /**
     * on component close event
     * @param value {unknown} - close event data
     */
    (e: "close", ...args: unknown[]): void;
}>();

const rootRef = ref();

const isFullPage = defineModel<boolean>("fullPage", { default: true });

const isActive = defineModel<boolean>("active", { default: false });

// --- Events Feature ---

if (isClient) {
    // register onKeyPress event when is active
    useEventListener("keyup", onKeyPress, rootRef.value, {
        trigger: isActive,
    });
}

/** Keypress event that is bound to the document. */
function onKeyPress(event: KeyboardEvent): void {
    if (!isActive.value) return;
    if (event.key === "Escape" || event.key === "Esc") cancel("escape");
}

/**
 * Check if method is cancelable.
 * Call close() with action `cancel`.
 * @param method Cancel method
 */
function cancel(method: string): void {
    // check if method is cancelable
    if (
        !props.cancelable ||
        (Array.isArray(props.cancelable) && !props.cancelable.includes(method))
    )
        return;
    close({ action: "cancel", method });
}

/** set active to false and emit close event */
function close(...args: unknown[]): void {
    isActive.value = false;
    emits("close", args);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-load"],
    ["fullPageClass", "o-load--fullpage", null, isFullPage],
);

const overlayClasses = defineClasses(["overlayClass", "o-load__overlay"]);

const iconClasses = defineClasses(["iconClass", "o-load__icon"]);

const labelClasses = defineClasses(["labelClass", "o-load__label"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });
</script>

<template>
    <transition :name="animation">
        <div
            v-if="isActive"
            ref="rootRef"
            data-oruga="loading"
            role="dialog"
            :class="rootClasses">
            <div
                :class="overlayClasses"
                :tabindex="-1"
                @click="cancel('outside')" />
            <!-- 
                @slot Override icon and label
                @binding {close} close - function to close the component
            -->
            <slot :close="close">
                <o-icon
                    :icon="icon"
                    :spin="iconSpin"
                    :size="iconSize"
                    :class="iconClasses"
                    both />
                <span v-if="label" :class="labelClasses">
                    {{ label }}
                </span>
            </slot>
        </div>
    </transition>
</template>
