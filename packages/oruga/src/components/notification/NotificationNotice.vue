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

import type { NotificationNoticeProps } from "./props";
import type { CloseEventArgs } from "../programmatic";

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
    variant: undefined,
    position: () => getDefault("notification.position", "top"),
    duration: () => getDefault("notification.duration", 5000),
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
     * @param event {Event} - native event
     */
    close: [...args: [] | [Event] | CloseEventArgs<C>];
}>();

defineSlots<{
    /** Override the default notification body */
    default?(): void;
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

/** move the rendered component template into the correct parent container */
function showNotice(): void {
    if (!correctParent.value) return;

    if (shouldQueue.value) correctParent.value.innerHTML = "";
    correctParent.value.insertAdjacentElement(
        "afterbegin",
        notificationRef.value?.$el,
    );
}

// #region --- Auto Close Feature ---

let timeout: ReturnType<typeof setTimeout> | undefined;

/** Set timer to auto close */
function setAutoClose(): void {
    if (!props.infinite) {
        // clear old timer
        if (timeout) clearTimeout(timeout);
        // set new timer
        timeout = setTimeout(() => {
            if (isActive.value) close();
        }, props.duration);
    }
}

let isPaused = false;
let isHovered = false;
let isFocused = false;

/** stop the auto close timeout until the pointer and the focus have left */
function pause(): void {
    isPaused = true;
    clearTimeout(timeout);
}

/** close when the notice was paused and neither the pointer nor the focus is inside anymore */
function resume(event: Event): void {
    if (isPaused && !isHovered && !isFocused) close(event);
}

function onHoverEnter(): void {
    if (!props.pauseOnHover || props.infinite) return;
    isHovered = true;
    pause();
}

function onHoverLeave(event: PointerEvent): void {
    isHovered = false;
    resume(event);
}

// keyboard users cannot hover, so focus inside the notice pauses the timer as well
function onFocusEnter(): void {
    if (!props.pauseOnHover || props.infinite) return;
    isFocused = true;
    pause();
}

function onFocusLeave(event: FocusEvent): void {
    // focus moves between elements inside the notice
    const root = event.currentTarget as HTMLElement | null;
    if (root?.contains(event.relatedTarget as Node | null)) return;
    isFocused = false;
    resume(event);
}

/** set active to false and emit close event */
function close(...args: [] | [Event] | CloseEventArgs<C>): void {
    isActive.value = false;
    if (timeout) clearTimeout(timeout);
    emits("close", ...args);
}

// #endregion --- Auto Close Feature ---

// #region --- Computed Component Classes ---

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

const notificationClasses = defineClasses([
    "positionClass",
    "o-notification--",
    computed(() => props.position),
    computed(() => !!props.position),
]);

// #endregion --- Computed Component Classes ---

// #region --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close });

// #endregion --- Expose Public Functionalities ---
</script>

<template>
    <o-notification
        ref="notificationComponent"
        v-bind="$attrs"
        v-model:active="isActive"
        :override="override"
        :position="position"
        :variant="variant"
        :component="$props.component"
        :props="$props.props"
        :events="$props.events"
        :class="notificationClasses"
        @close="close"
        @pointerenter="onHoverEnter"
        @pointerleave="onHoverLeave"
        @focusin="onFocusEnter"
        @focusout="onFocusLeave">
        <slot />
    </o-notification>
</template>
