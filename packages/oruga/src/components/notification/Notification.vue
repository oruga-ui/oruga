<script setup lang="ts">
import { computed } from "vue";

import OIcon from "../icon/Icon.vue";

import { getOption } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { NotificationProps } from "./props";

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

const props = withDefaults(defineProps<NotificationProps>(), {
    override: undefined,
    active: true,
    type: undefined,
    variant: () => getOption("notification.variant"),
    position: () => getOption("notification.position", "top"),
    message: undefined,
    animation: () => getOption("notification.animation", "fade"),
    iconPack: () => getOption("notification.iconPack"),
    icon: undefined,
    iconSize: () => getOption("notification.iconSize", "large"),
    closable: false,
    closeIcon: () => getOption("notification.closeIcon", "close"),
    closeIconSize: () => getOption("notification.closeIconSize"),
    ariaCloseLabel: () => getOption("notification.ariaCloseLabel", "Close"),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    (e: "update:active", value: boolean): void;
    /**
     * on component close event
     * @param value {unknown} - close event data
     */
    (e: "close", ...args: unknown[]): void;
}>();

const isActive = defineModel<boolean>("active", { default: true });

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

/** set active to false and emit close event */
function close(...args: unknown[]): void {
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
                        <span v-if="message">{{ message }} </span>
                    </slot>
                </div>
            </div>
        </article>
    </transition>
</template>
