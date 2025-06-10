<script setup lang="ts">
import { useTemplateRef, watch } from "vue";

import OIcon from "../icon/Icon.vue";

import { getDefault } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    useEventListener,
    usePreventScrolling,
} from "@/composables";

import type { LoadingProps } from "./props";

/**
 * A simple loading overlay.
 * @displayName Loading
 * @style _loading.scss
 */
defineOptions({
    isOruga: true,
    name: "OLoading",
    configField: "loading",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<LoadingProps>(), {
    override: undefined,
    active: false,
    fullPage: true,
    label: undefined,
    animation: () => getDefault("loading.animation", "fade"),
    cancelable: false,
    icon: () => getDefault("loading.icon", "loading"),
    iconSpin: () => getDefault("loading.iconSpin", true),
    iconSize: () => getDefault("loading.iconSize", "medium"),
    clipScroll: () => getDefault("loading.clipScroll", false),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * fullPage prop two-way binding
     * @param value {boolean} - updated fullPage prop
     */
    "update:fullPage": [value: boolean];
    /**
     * on component close event
     * @param value {string} - close event method
     */
    close: [...args: [] | [string]];
}>();

const rootRef = useTemplateRef("rootElement");

const isFullPage = defineModel<boolean>("fullPage", { default: true });

const isActive = defineModel<boolean>("active", { default: false });

const toggleScroll = usePreventScrolling(props.clipScroll);

watch(isActive, (value) => {
    if (isFullPage.value) toggleScroll(value);
});

// --- Events Feature ---

if (isClient) {
    // register onKeyPress event when is active
    useEventListener(rootRef, "keyup", onKeyPress, { trigger: isActive });
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
    close(method);
}

/** set active to false and emit close event */
function close(...args: [] | [string]): void {
    isActive.value = false;
    emits("close", ...args);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-loading"],
    ["fullPageClass", "o-loading--fullpage", null, isFullPage],
);

const overlayClasses = defineClasses(["overlayClass", "o-loading__overlay"]);

const iconClasses = defineClasses(["iconClass", "o-loading__icon"]);

const labelClasses = defineClasses(["labelClass", "o-loading__label"]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });
</script>

<template>
    <transition :name="animation">
        <div
            v-if="isActive"
            ref="rootElement"
            data-oruga="loading"
            :class="rootClasses"
            role="status"
            aria-live="polite">
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
                    :class="iconClasses" />
                <span v-if="label" :class="labelClasses">
                    {{ label }}
                </span>
            </slot>
        </div>
    </transition>
</template>
