<script setup lang="ts">
import { computed, ref } from "vue";

import OIcon from "../icon/Icon.vue";
import CloseButton from "../utils/CloseButton.vue";

import { getDefault } from "@/utils/config";
import { defineClasses } from "@/composables";

import type { NotificationProps } from "./props";

/**
 * Bold notification blocks to alert your users of something.
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
    message: undefined,
    active: true,
    type: undefined,
    variant: () => getDefault("notification.variant"),
    rounded: () => getDefault("notification.rounded"),
    position: () => getDefault("notification.position", "top"),
    animation: () => getDefault("notification.animation", "fade"),
    icon: undefined,
    iconPack: () => getDefault("notification.iconPack"),
    iconSize: () => getDefault("notification.iconSize", "large"),
    closeable: false,
    closeIcon: () => getDefault("notification.closeIcon", "close"),
    closeIconSize: () => getDefault("notification.closeIconSize"),
    ariaCloseLabel: () => getDefault("notification.ariaCloseLabel", "Close"),
});

const emits = defineEmits<{
    /**
     * active prop two-way binding
     * @param value {boolean} - updated active prop
     */
    "update:active": [value: boolean];
    /**
     * on component close event
     * @param event {Event} - native event
     */
    close: [...args: [] | [Event]];
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
function close(...args: [] | [Event]): void {
    isActive.value = false;
    emits("close", ...args);
}

// #region --- Animation Feature ---

const isAnimated = ref(props.active);

/** Transition after-enter hook */
function afterEnter(): void {
    isAnimated.value = true;
}

/** Transition before-leave hook */
function beforeLeave(): void {
    isAnimated.value = false;
}

// #endregion --- Animation Feature ---

// #region --- Computed Component Classes ---

const rootClasses = defineClasses(
    ["rootClass", "o-notification"],
    [
        "variantClass",
        "o-notification--",
        computed(() => props.variant),
        computed(() => !!props.variant),
    ],
    [
        "roundedClass",
        "o-notification--rounded",
        null,
        computed(() => props.rounded),
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

// #endregion --- Computed Component Classes ---
</script>

<template>
    <transition
        :name="animation"
        @after-enter="afterEnter"
        @before-leave="beforeLeave">
        <article
            v-show="isActive"
            v-bind="$attrs"
            data-oruga="notification"
            :class="rootClasses">
            <CloseButton
                v-if="closeable"
                v-show="isAnimated"
                :pack="iconPack"
                :icon="closeIcon"
                :size="closeIconSize"
                :label="ariaCloseLabel"
                :classes="closeClasses"
                @click="close($event)">
                <!--
                    @slot Override the close icon
                -->
                <slot v-if="$slots['close']" name="close" />
            </CloseButton>

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
                    :size="iconSize"
                    aria-hidden="true" />
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
