<script setup lang="ts">
import {
    computed,
    ref,
    onMounted,
    onBeforeMount,
    watch,
    type PropType,
    type Component,
} from "vue";

import { baseComponentProps } from "@/utils/SharedProps";
import { getOption } from "@/utils/config";
import {
    useComputedClass,
    useClassProps,
    useProgrammaticComponent,
} from "@/composables";
import type { PropBind, ProgrammaticInstance } from "@/types";
import type { NotifcationProps } from "./types";

/**
 * Notification Notice is used for the programmatic usage
 * @displayName Notification Notice
 */
defineOptions({
    isOruga: true,
    name: "ONotificationNotice",
    configField: "notification",
    inheritAttrs: false,
});

const props = defineProps({
    // add global shared props (will not be displayed in the docs)
    ...baseComponentProps,
    /** Whether notification is active or not, use v-model:active to make it two-way binding. */
    active: { type: Boolean, default: true },
    /** Props passed to the internal notification component. */
    notification: {
        type: Object as PropType<NotifcationProps>,
        default: () => ({}),
    },
    /**
     * Which position the notification will appear when programmatically.
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
    /** Callback function to call after user canceled (pressed escape / clicked outside). */
    onCancel: { type: Function as PropType<() => void>, default: () => {} },
    /** Callback function to call after close (programmatically close or user canceled). */
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
    // add class props (will not be displayed in the docs)
    ...useClassProps([
        "noticeClass",
        "noticePositionClass",
        "noticeCustomContainerClass",
    ]),
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

const notificationRef = ref();

/** add programmatic usage to this component */
const { isActive, close, container } = useProgrammaticComponent(
    () => notificationRef.value.$el,
    props,
    emits,
    {
        cancelOptions: ["escape", "x"],
    },
);

const parentTop = ref(null);
const parentBottom = ref(null);

const timer = ref();

watch(
    () => isActive,
    (value) => {
        if (value) setAutoClose();
        else if (timer.value) clearTimeout(timer.value);
    },
);

/** Create or inject notice dom container elements. */
onBeforeMount(() => {
    if (
        rootClasses.value &&
        positionClasses("top") &&
        positionClasses("bottom")
    ) {
        parentTop.value = container.value.querySelector(
            `&>.${rootClasses.value.join(".")}.${positionClasses("top").join(
                ".",
            )}`,
        );
        parentBottom.value = container.value.querySelector(
            `&>.${rootClasses.value.join(".")}.${positionClasses("bottom").join(
                ".",
            )}`,
        );

        if (parentTop.value && parentBottom.value) return;

        if (!parentTop.value) {
            parentTop.value = document.createElement("div");
            parentTop.value.className = `${rootClasses.value.join(
                " ",
            )} ${positionClasses("top").join(" ")}`;
        }

        if (!parentBottom.value) {
            parentBottom.value = document.createElement("div");
            parentBottom.value.className = `${rootClasses.value.join(
                " ",
            )} ${positionClasses("bottom").join(" ")}`;
        }

        container.value.appendChild(parentTop.value);
        container.value.appendChild(parentBottom.value);

        if (container.value.tagName !== "BODY") {
            const classes = noticeCustomContainerClasses.value;
            if (classes && classes.length) {
                classes
                    .filter((c) => !!c)
                    .forEach((c: string) => {
                        parentTop.value.classList.add(c);
                        parentBottom.value.classList.add(c);
                    });
            }
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
    props.queue
        ? parentTop.value.childElementCount > 0 ||
          parentBottom.value.childElementCount > 0
        : false,
);

function showNotice(): void {
    if (shouldQueue.value) correctParent.value.innerHTML = "";
    correctParent.value.insertAdjacentElement(
        "afterbegin",
        notificationRef.value.$el,
    );
    isActive.value = true;
}

/** Set timer to auto close message */
function setAutoClose(): void {
    if (!props.infinite) {
        // clear old timer
        if (timer.value) clearTimeout(timer.value);
        // set new timer
        timer.value = setTimeout(() => {
            if (isActive.value)
                handleClose({ action: "close", method: "timeout" });
        }, props.duration);
    }
}

function handleClose(...args: any[]): void {
    clearTimeout(timer.value);
    close(...args);
}

// --- Computed Component Classes ---

const rootClasses = computed(() => [
    useComputedClass("noticeClass", "o-notices"),
]);

function positionClasses(position): PropBind {
    return [useComputedClass("noticePositionClass", "o-notices--", position)];
}

const noticeCustomContainerClasses = computed(() => [
    useComputedClass(
        "noticeCustomContainerClass",
        "o-notices__custom-container",
    ),
]);

// --- Expose Public Functionality ---

/** expose functionalities for programmatic usage */
defineExpose({ close: handleClose, promise: props.promise });
</script>

<template>
    <o-notification
        v-bind="notification"
        ref="notificationRef"
        v-model:active="isActive"
        :position="position"
        @close="handleClose">
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
