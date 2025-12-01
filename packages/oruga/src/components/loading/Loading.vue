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
    cancelable: undefined,
    closeOnOutside: false,
    closeOnEscape: false,
    icon: () => getDefault("loading.icon", "loading"),
    iconPack: () => getDefault("loading.iconPack"),
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
     * on active state changes to false
     * @param event {Event} - native event
     */
    close: [event?: Event];
}>();

const rootRef = useTemplateRef("rootElement");

const isFullPage = defineModel<boolean>("fullPage", { default: true });

const isActive = defineModel<boolean>("active", { default: false });

const toggleScroll = usePreventScrolling(props.clipScroll);

watch(isActive, (value) => {
    if (isFullPage.value) toggleScroll(value);
});

// #region --- Events Feature ---

if (isClient) {
    // register onKeyup event when is active
    useEventListener(rootRef, "keyup", onKeyup, {
        trigger: isActive,
        passive: true,
    });
}

/** Keyup event listener that is bound to the root element. */
function onKeyup(event: KeyboardEvent): void {
    if (!props.closeOnEscape || checkNotCloseable("escape")) return;
    if (event.key === "Escape" || event.key === "Esc") close(event);
}

/** Click outside event listener, when clicked on the overlay. */
function clickedOutside(event: Event): void {
    if (!props.closeOnOutside || checkNotCloseable("outside")) return;
    close(event);
}

/** check if method is cancelable (for deprecreated check) */
function checkNotCloseable(method: string): boolean {
    return (
        typeof props.cancelable !== "undefined" &&
        ((typeof props.cancelable === "boolean" && !props.cancelable) ||
            !props.cancelable ||
            (Array.isArray(props.cancelable) &&
                !props.cancelable.includes(method)))
    );
}

/** set active to false and emit close event */
function close(event?: Event): void {
    if (!isActive.value) return;
    isActive.value = false;
    emits("close", event);
}

// #endregion --- Events Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-loading"],
    ["fullPageClass", "o-loading--fullpage", null, isFullPage],
);

const overlayClasses = defineClasses(["overlayClass", "o-loading__overlay"]);

const iconClasses = defineClasses(["iconClass", "o-loading__icon"]);

const labelClasses = defineClasses(["labelClass", "o-loading__label"]);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });

// #endregion --- Expose Public Functionalities ---
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
                @click="clickedOutside" />
            <!--
                @slot Override icon and label
                @binding {close} close - function to close the component
            -->
            <slot :close="close">
                <o-icon
                    :icon="icon"
                    :spin="iconSpin"
                    :size="iconSize"
                    :pack="iconPack"
                    :class="iconClasses" />
                <span v-if="label" :class="labelClasses">
                    {{ label }}
                </span>
            </slot>
        </div>
    </transition>
</template>
