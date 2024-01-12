<script setup lang="ts">
import { computed, type PropType } from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { defineClasses, usePropBinding } from "@/composables";

import type { ComponentClass } from "@/types";

/**
 * Bold notification blocks to alert your users of something
 * @displayName Notification
 * @requires ./NotificationNotice.vue
 * @style _notification.scss
 */
defineOptions({
    isOruga: true,
    name: "ONotification",
    configField: "notification",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Whether modal is active or not, use v-model:active to make it two-way binding */
    active: { type: Boolean, default: true },
    /**
     * Type (color) of the notification
     * @values info, success, warning, danger
     */
    type: {
        type: String,
        default: undefined,
        validator: (value: string) =>
            ["info", "success", "warning", "danger", undefined].indexOf(value) >
            -1,
    },
    /**
     * Color of the control
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: {
        type: String,
        default: () => getOption("notification.variant"),
    },
    /**
     * Which position the notification will appear when programmatically
     * @values top-right, top, top-left, bottom-right, bottom, bottom-left
     */
    position: {
        type: String,
        default: () => getOption("notification.position", "top"),
        validator: (value: string) =>
            [
                "top-right",
                "top",
                "top-left",
                "bottom-right",
                "bottom",
                "bottom-left",
            ].indexOf(value) > -1,
    },
    /** Message text (can contain HTML), unnecessary when default slot is used */
    message: {
        type: [String, Array] as PropType<string | string[]>,
        default: undefined,
    },
    /** Custom animation (transition name) */
    animation: {
        type: String,
        default: () => getOption("notification.animation", "fade"),
    },
    /** Accessibility label for the close button */
    ariaCloseLabel: {
        type: String,
        default: () => getOption("notification.ariaCloseLabel", "Close"),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("notification.iconPack"),
    },
    /** Icon name to use */
    icon: { type: String, default: undefined },
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize: {
        type: String,
        default: () => getOption("notification.iconSize", "large"),
    },
    /** Add close button to the item that closes the notification */
    closable: { type: Boolean, default: false },
    /** Close icon name */
    closeIcon: {
        type: String,
        default: () => getOption("notification.closeIcon", "close"),
    },
    /**
     * Size of close icon
     * @values small, medium, large
     */
    closeIconSize: {
        type: String,
        default: () => getOption("notification.closeIconSize"),
    },
    // class props (will not be displayed in the docs)
    rootClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    closeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    contentClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    iconClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    positionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    variantClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    wrapperClass: {
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
     * on component close event
     * @param value {any} - close event data
     */
    (e: "close", ...args: any[]): void;
}>();

const isActive = usePropBinding<boolean>("active", props, emits, {
    passive: true,
});

/** Icon name (MDI) based on type. */
const computedIcon = computed(() => {
    if (props.icon) return props.icon;

    switch (props.type) {
        case "info":
            return "information";
        case "success":
            return "check-circle";
        case "warning":
            return "alert";
        case "danger":
            return "alert-circle";
        default:
            return null;
    }
});

/** Close the Message and emit events. */
function close(...args: any[]): void {
    isActive.value = false;
    emits("close", ...args);
}

// --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-notification"],
    [
        "variantClass",
        "o-notification--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "positionClass",
        "o-notification--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
);

const wrapperClasses = defineClasses([
    "wrapperClass",
    "o-notification__wrapper",
]);

const iconClasses = defineClasses(["iconClass", "o-notification__icon"]);

const contentClasses = defineClasses([
    "contentClass",
    "o-notification__content",
]);

const closeClasses = defineClasses(["closeClass", "o-notification__close"]);
</script>

<template>
    <transition :name="animation">
        <article
            v-show="isActive"
            v-bind="$attrs"
            :class="rootClasses"
            data-oruga="notification">
            <button
                v-if="closable"
                :class="closeClasses"
                type="button"
                :aria-label="ariaCloseLabel"
                @click="close({ action: 'close', method: 'x' })">
                <o-icon
                    clickable
                    :pack="iconPack"
                    both
                    :icon="closeIcon"
                    :size="closeIconSize" />
            </button>

            <!--
                @slot Notification inner content, outside of the message container
                @binding {(...args): void} close - function to close the notification
            -->
            <slot name="inner" :close="close" />

            <div v-if="$slots.default || message" :class="wrapperClasses">
                <o-icon
                    v-if="computedIcon"
                    :icon="computedIcon"
                    :pack="iconPack"
                    :class="iconClasses"
                    both
                    :size="iconSize"
                    aria-hidden />
                <div :class="contentClasses">
                    <!--
                        @slot Notification default content, default is message prop
                        @binding {(...args): void} close - function to close the notification
                    -->
                    <slot :close="close">
                        <span v-if="message" v-html="message" />
                    </slot>
                </div>
            </div>
        </article>
    </transition>
</template>
