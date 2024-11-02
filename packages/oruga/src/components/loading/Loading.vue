<script setup lang="ts">
import { useTemplateRef, watch } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { isClient } from "@/utils/ssr";
import {
    defineClasses,
    useEventListener,
    usePreventScrolling,
} from "@/composables";

import type { LoadingProps } from "./props";

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

const props = withDefaults(defineProps<LoadingProps>(), {
    override: undefined,
    active: false,
    fullPage: true,
    label: undefined,
    animation: () => getOption("loading.animation", "fade"),
    cancelable: false,
    icon: () => getOption("loading.icon", "loading"),
    iconSpin: () => getOption("loading.iconSpin", true),
    iconSize: () => getOption("loading.iconSize", "medium"),
    scroll: () => getOption("modal.scroll", "keep"),
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

const rootRef = useTemplateRef("rootElement");

const isFullPage = defineModel<boolean>("fullPage", { default: true });

const isActive = defineModel<boolean>("active", { default: false });

const toggleScroll = usePreventScrolling(props.scroll === "keep");

watch(isActive, (value) => {
    if (isFullPage.value) toggleScroll(value);
});

// --- Events Feature ---

if (isClient) {
    // register onKeyPress event when is active
    useEventListener("keyup", onKeyPress, rootRef, { trigger: isActive });
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
            ref="rootElement"
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
