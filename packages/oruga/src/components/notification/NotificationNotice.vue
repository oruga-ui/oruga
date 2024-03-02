<script setup lang="ts">
import {
    computed,
    ref,
    onMounted,
    onBeforeMount,
    type PropType,
    type Component,
} from "vue";

import { getOption } from "@/utils/config";
import {
    defineClasses,
    getActiveClasses,
    useProgrammaticComponent,
} from "@/composables";

import type { NotifcationProps } from "./types";
import type { ProgrammaticInstance, ComponentClass } from "@/types";

/**
 * Notification Notice is an extension of the Notification component and is used for the programmatic usage
 * @displayName Notification Notice
 */
defineOptions({
    isOruga: true,
    name: "ONotificationNotice",
    configField: "notification",
    inheritAttrs: false,
});

const props = defineProps({
    /** Override existing theme classes completely */
    override: { type: Boolean, default: undefined },
    /**
     * Which position the notification will appear.
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
    /** Hide notification after duration (in miliseconds) */
    duration: {
        type: Number,
        default: () => getOption("notification.duration", 2000),
    },
    /** Show the Notification infinitely until it is dismissed. */
    infinite: { type: Boolean, default: false },
    /** If notice should queue with others notices (snackbar/toast/notification). */
    queue: {
        type: Boolean,
        default: () => getOption("notification.queue"),
    },
    /** Callback function to call on close (programmatically close or user canceled). */
    onClose: { type: Function as PropType<() => void>, default: () => {} },
    /**
     * Component to be injected.
     * Close notification within the component by emitting a 'close' event — $emit('close').
     */
    component: {
        type: [Object, Function] as PropType<Component>,
        default: undefined,
    },
    /** Props to be binded to the injected component. */
    props: { type: Object, default: undefined },
    /** Events to be binded to the injected component. */
    events: { type: Object, default: () => ({}) },
    /**
     * DOM element the toast will be created on (for programmatic usage).
     * Note that this also changes the position of the toast from fixed to absolute.
     * Meaning that the container should be fixed.
     */
    container: {
        type: [Object, String] as PropType<string | HTMLElement>,
        default: () => getOption("notification.container", "body"),
    },
    /**
     * Props passed to the internal notification component.
     * @ignore
     */
    notification: {
        type: Object as PropType<NotifcationProps>,
        default: () => ({}),
    },
    /**
     * This is used internally for programmatic usage.
     * @ignore
     */
    programmatic: {
        type: Object as PropType<ProgrammaticInstance>,
        default: undefined,
    },
    /**
     * This is used internally for programmatic usage.
     * @ignore
     */
    promise: { type: Promise, default: undefined },
    // class props (will not be displayed in the docs)
    /** Root class of the notice */
    noticeClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the notice when positioned */
    noticePositionClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
    /** Class of the custom container element */
    noticeCustomContainerClass: {
        type: [String, Array, Function] as PropType<ComponentClass>,
        default: undefined,
    },
});

const notificationRef = ref();

const isActive = ref(true);

function handleClose(...args: any[]): void {
    if (typeof props.onClose === "function" && isActive.value)
        props.onClose.apply(args);
    isActive.value = false;
    if (timer.value) clearTimeout(timer.value);
}

/** add programmatic usage to this component */
const { close, container } = useProgrammaticComponent(
    () => notificationRef.value.$el,
    {
        container: props.container,
        programmatic: props.programmatic,
        cancelable: true,
        destroy: true,
        onClose: handleClose,
    },
);

const parentTop = ref(null);
const parentBottom = ref(null);

const timer = ref();

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

        parentTop.value = container.value.querySelector(
            `.${rootClasses.join(".")}.${topClasses.join(".")}`,
        );
        parentBottom.value = container.value.querySelector(
            `.${rootClasses.join(".")}.${bottomClasses.join(".")}`,
        );

        if (parentTop.value && parentBottom.value) return;

        if (!parentTop.value) {
            parentTop.value = document.createElement("div");
            parentTop.value.className = `${rootClasses.join(
                " ",
            )} ${topClasses.join(" ")}`;
        }

        if (!parentBottom.value) {
            parentBottom.value = document.createElement("div");
            parentBottom.value.className = `${rootClasses.join(
                " ",
            )} ${bottomClasses.join(" ")}`;
        }

        container.value.appendChild(parentTop.value);
        container.value.appendChild(parentBottom.value);

        if (container.value.tagName !== "BODY") {
            const classes = getActiveClasses(
                noticeCustomContainerClasses.value,
            );
            if (classes?.length)
                classes
                    .filter((c) => !!c)
                    .forEach((c: string) => {
                        parentTop.value.classList.add(c);
                        parentBottom.value.classList.add(c);
                    });
        }
    }
});

onMounted(() => {
    if (shouldQueue.value) correctParent.value.innerHTML = "";
    correctParent.value.insertAdjacentElement(
        "afterbegin",
        notificationRef.value.$el,
    );
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
    props.queue
        ? parentTop.value.childElementCount > 0 ||
          parentBottom.value.childElementCount > 0
        : false,
);

/** Set timer to auto close message */
function setAutoClose(): void {
    if (!props.infinite) {
        // clear old timer
        if (timer.value) clearTimeout(timer.value);
        // set new timer
        timer.value = setTimeout(() => {
            if (isActive.value) close({ action: "close", method: "timeout" });
        }, props.duration);
    }
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

const noticeCustomContainerClasses = defineClasses([
    "noticeCustomContainerClass",
    "o-notices__custom-container",
]);

// --- Expose Public Functionalities ---

/** expose functionalities for programmatic usage */
defineExpose({ close: handleClose, promise: props.promise });
</script>

<template>
    <o-notification
        v-bind="notification"
        ref="notificationRef"
        v-model:active="isActive"
        :position="position"
        @close="close">
        <template #inner="{ close }">
            <!-- injected component for programmatic usage -->
            <component
                v-bind="$props.props"
                :is="component"
                v-if="component"
                v-on="$props.events"
                @close="close" />
        </template>
        <slot />
    </o-notification>
</template>
