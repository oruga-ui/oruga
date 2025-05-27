<script setup lang="ts" generic="C extends Component">
import {
    computed,
    ref,
    onMounted,
    onBeforeMount,
    useTemplateRef,
    type Component,
} from "vue";

import ONotification from "./Notification.vue";

import { getDefault } from "@/utils/config";
import { defineClasses, getActiveClasses } from "@/composables";
import type { CloseEventArgs } from "../programmatic";

import type { NotificationNoticeProps } from "./props";

/**
 * Notification Notice is an extension of the Notification component and is used for the programmatic usage.
 * @displayName Notification Notice
 */
defineOptions({
    isOruga: true,
    name: "ONotificationNotice",
    configField: "notification",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<NotificationNoticeProps<C>>(), {
    override: undefined,
    container: undefined,
    variant: () => getDefault("notification.variant"),
    position: () => getDefault("notification.position", "top"),
    duration: () => getDefault("notification.duration", 2000),
    infinite: false,
    pauseOnHover: false,
    queue: () => getDefault("notification.queue"),
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /**
     * on component close event
     * @param value {string} - close event method
     */
    close: [...args: [string] | CloseEventArgs<C>];
}>();

const notificationRef = useTemplateRef("notificationComponent");

const isActive = ref(true);

const parentTop = ref<Element | null>(null);
const parentBottom = ref<Element | null>(null);

/** Create or inject notice dom container elements. */
onBeforeMount(() => {
    if (
        noticeClasses.value &&
        positionBottomClasses.value &&
        positionTopClasses.value
    ) {
        const rootClasses = getActiveClasses(noticeClasses.value);
        const topClasses = getActiveClasses(positionTopClasses.value);
        const bottomClasses = getActiveClasses(positionBottomClasses.value);

        parentTop.value = props.container.querySelector(
            `.${rootClasses.join(".")}.${topClasses.join(".")}`,
        );
        parentBottom.value = props.container.querySelector(
            `.${rootClasses.join(".")}.${bottomClasses.join(".")}`,
        );

        if (parentTop.value && parentBottom.value) return;

        // create notices top container if not alread there
        if (!parentTop.value) {
            parentTop.value = document.createElement("div");
            parentTop.value.className = `${rootClasses.join(
                " ",
            )} ${topClasses.join(" ")}`;
            parentTop.value.role = "region";
            parentTop.value.ariaLive = "polite";
        }

        // create notices bottom container if not alread there
        if (!parentBottom.value) {
            parentBottom.value = document.createElement("div");
            parentBottom.value.className = `${rootClasses.join(
                " ",
            )} ${bottomClasses.join(" ")}`;
            parentBottom.value.role = "region";
            parentBottom.value.ariaLive = "polite";
        }

        // append notices top and bottom container to given container
        props.container.appendChild(parentTop.value);
        props.container.appendChild(parentBottom.value);

        if (props.container.tagName !== "BODY") {
            const classes = getActiveClasses(noticeContainerClasses.value);
            if (classes?.length)
                classes
                    .filter((c) => !!c)
                    .forEach((c: string) => {
                        parentTop.value?.classList.add(c);
                        parentBottom.value?.classList.add(c);
                    });
        }
    }
});

onMounted(() => {
    showNotice();
    setAutoClose();
});

const correctParent = computed(() => {
    switch (props.position) {
        case "top-right":
        case "top":
        case "top-left":
            return parentTop.value;

        case "bottom-right":
        case "bottom":
        case "bottom-left":
            return parentBottom.value;
        default:
            return null;
    }
});

const shouldQueue = computed(() =>
    props.queue && parentTop.value && parentBottom.value
        ? parentTop.value.childElementCount > 0 ||
          parentBottom.value.childElementCount > 0
        : false,
);

const isAlert = computed(
    () => props.variant === "warning" || props.variant === "danger",
);

/** move the rendered component template into the correct parent container */
function showNotice(): void {
    if (!correctParent.value) return;

    if (shouldQueue.value) correctParent.value.innerHTML = "";
    correctParent.value.insertAdjacentElement(
        "afterbegin",
        notificationRef.value?.$el,
    );
}

// --- Auto Close Feature  ---

let timer: ReturnType<typeof setTimeout> | undefined;

/** Set timer to auto close message */
function setAutoClose(): void {
    if (!props.infinite) {
        // clear old timer
        if (timer) clearTimeout(timer);
        // set new timer
        timer = setTimeout(() => {
            if (isActive.value) close("timeout");
        }, props.duration);
    }
}

let isPaused = false;

function onMouseOver(): void {
    if (props.pauseOnHover && !props.infinite) {
        isPaused = true;
        // stop auto close timeout
        clearInterval(timer);
    }
}

function onMouseLeave(): void {
    if (isPaused)
        // close when mouse leave and is paused before
        close("mouseleave");
}

/** set active to false and emit close event */
function close(...args: [string] | CloseEventArgs<C>): void {
    isActive.value = false;
    if (timer) clearTimeout(timer);
    emits("close", ...args);
}

// --- Computed Component Classes ---

const noticeClasses = defineClasses(["noticeClass", "o-notices"]);

const positionTopClasses = defineClasses([
    "noticePositionClass",
    "o-notices--",
    "top",
]);
const positionBottomClasses = defineClasses([
    "noticePositionClass",
    "o-notices--",
    "bottom",
]);

const noticeContainerClasses = defineClasses([
    "noticeContainerClass",
    "o-notices__container",
]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });
</script>

<template>
    <o-notification
        ref="notificationComponent"
        v-bind="$attrs"
        v-model:active="isActive"
        :override="override"
        :position="position"
        :variant="variant"
        :role="isAlert ? 'alert' : 'status'"
        :aria-atomic="true"
        @close="close"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave">
        <template #inner="{ close }">
            <!-- injected component for programmatic usage -->
            <component
                v-bind="$props.props"
                :is="component"
                v-if="component"
                v-on="$props.events || {}"
                @close="close" />
        </template>
        <slot />
    </o-notification>
</template>
