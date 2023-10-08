<script setup lang="ts">
import { type Component, type PropType, computed } from "vue";

import OIcon from "../icon/Icon.vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import { useComputedClass, useClassProps, usePropBinding } from "@/composables";

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
     * Type (color) of the notification, optional
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
     * Color of the control, optional
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
        default: () =>
            getOption("notification.ariaCloseLabel", "Close notification"),
    },
    /**
     * Icon pack to use
     * @values mdi, fa, fas and any other custom icon pack
     */
    iconPack: {
        type: String,
        default: () => getOption("notification.iconPack", undefined),
    },
    /** Add close/delete button to the item that closes the notification*/
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
    /** Icon name to use */
    icon: { type: String, default: undefined },
    /**
     * Icon size
     * @values small, medium, large
     */
    iconSize: { type: String, default: "large" },
    /**
     * Component to be injected.
     * Close notification within the component by emitting a 'close' event — $emit('close').
     */
    component: {
        type: [Object, Function] as PropType<Component>,
        default: undefined,
    },
    /** Props to be binded to the injected component */
    props: { type: Object, default: undefined },
    /** Events to be binded to the injected component */
    events: { type: Object, default: () => ({}) },
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "rootClass",
        "closeClass",
        "contentClass",
        "iconClass",
        "positionClass",
        "variantClass",
        "wrapperClass",
    ]),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on notification close event
     * @param value {any}
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

const rootClasses = computed(() => [
    useComputedClass("rootClass", "o-notification"),
    {
        [useComputedClass("variantClass", "o-notification--", props.variant)]:
            props.variant,
    },
    {
        [useComputedClass("positionClass", "o-notification--", props.position)]:
            props.position,
    },
]);

const wrapperClasses = computed(() => [
    useComputedClass("wrapperClass", "o-notification__wrapper"),
]);

const iconClasses = computed(() => [
    useComputedClass("iconClass", "o-notification__icon"),
]);

const contentClasses = computed(() => [
    useComputedClass("contentClass", "o-notification__content"),
]);

const closeClasses = computed(() => [
    useComputedClass("closeClass", "o-notification__close"),
]);
</script>

<template>
    <transition :name="animation">
        <article v-show="isActive" :class="rootClasses" v-bind="$attrs">
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

            <component
                v-bind="props"
                :is="component"
                v-if="component"
                v-on="events"
                @close="close" />

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
                    <span v-if="message" v-html="message" />
                    <!--
                        @slot Notification default content 
                            @binding {close} close function to close the notification
                        -->
                    <slot v-else :close="close" />
                </div>
            </div>
        </article>
    </transition>
</template>
