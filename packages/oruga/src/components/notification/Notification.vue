<script setup lang="ts">
import { computed } from "vue";

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
    title: undefined,
    message: undefined,
    content: undefined,
    active: true,
    type: undefined,
    variant: () => getDefault("notification.variant"),
    rounded: () => getDefault("notification.rounded"),
    animation: () => getDefault("notification.animation", "fade"),
    icon: undefined,
    iconPack: () => getDefault("notification.iconPack"),
    iconSize: () => getDefault("notification.iconSize", "large"),
    closeable: false,
    closeIcon: () => getDefault("notification.closeIcon", "close"),
    closeIconSize: () => getDefault("notification.closeIconSize"),
    ariaCloseLabel: () => getDefault("notification.ariaCloseLabel", "Close"),
    component: undefined,
    props: undefined,
    events: undefined,
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

defineSlots<{
    /**
     * Override the notification title, default is title prop
     * @param close {(...args: [] | [Event]): void} -  function to emit a `confirm` event
     */
    title?(props: { close: () => void }): void;
    /**
     * Override the default notification body
     * @param close {(...args: [] | [Event]): void} -  function to emit a `confirm` event
     */
    default?(props: { close: (...args: [] | [Event]) => void }): void;
    /**
     * Override the body content, default is content prop
     * @param close {(...args: [] | [Event]): void} -  function to emit a `confirm` event
     */
    content?(props: { close: () => void }): void;
    /** Define a custom close icon */
    close?(): void;
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
);

const contentClasses = defineClasses([
    "contentClass",
    "o-notification__content",
]);

const headerClasses = defineClasses(["headerClass", "o-notification__header"]);

const bodyClasses = defineClasses(["bodyClass", "o-notification__body"]);

const iconClasses = defineClasses(["iconClass", "o-notification__icon"]);

const closeClasses = defineClasses(["closeClass", "o-notification__close"]);

// #endregion --- Computed Component Classes ---
</script>

<template>
    <transition :name="animation">
        <article
            v-show="isActive"
            v-bind="$attrs"
            data-oruga="notification"
            :class="rootClasses">
            <o-icon
                v-if="computedIcon"
                :icon="computedIcon"
                :pack="iconPack"
                :class="iconClasses"
                :size="iconSize"
                aria-hidden="true" />

            <div :class="contentClasses">
                <header v-if="title || $slots['title']" :class="headerClasses">
                    <slot name="title" :close="close">
                        {{ title }}
                    </slot>
                </header>

                <div :class="bodyClasses">
                    <slot :close="close">
                        <!-- injected component for programmatic usage -->
                        <component
                            :is="$props.component"
                            v-if="$props.component"
                            v-bind="$props.props"
                            v-on="$props.events || {}"
                            @close="close" />

                        <slot name="content" :close="close">
                            {{ content }}
                            <span v-if="message">{{ message }} </span>
                        </slot>
                    </slot>
                </div>
            </div>

            <CloseButton
                v-if="closeable"
                :pack="iconPack"
                :icon="closeIcon"
                :size="closeIconSize"
                :label="ariaCloseLabel"
                :classes="closeClasses"
                @click="close($event)">
                <slot v-if="$slots['close']" name="close" />
            </CloseButton>
        </article>
    </transition>
</template>
