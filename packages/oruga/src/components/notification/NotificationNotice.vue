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

const props = withDefaults(defineProps<NotificationNoticeProps<C>>(), {
    override: undefined,
    // container: undefined,
    position: () => getDefault("notification.position", "top"),
    duration: () => getDefault("notification.duration", 2000),
    infinite: false,
    queue: () => getDefault("notification.queue"),
    component: undefined,
    props: undefined,
    events: undefined,
});

const emits = defineEmits<{
    /**
     * on component close event
     * @param value {unknown} - close event data
     */
    close: [...args: unknown[]];
}>();

const notificationRef = useTemplateRef("notificationComponent");

const isActive = ref(true);

const parentTop = ref<Element | null>(null);
const parentBottom = ref<Element | null>(null);

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

        parentTop.value = props.container.querySelector(
            `.${rootClasses.join(".")}.${topClasses.join(".")}`,
        );
        parentBottom.value = props.container.querySelector(
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

function showNotice(): void {
    if (!correctParent.value) return;

    if (shouldQueue.value) correctParent.value.innerHTML = "";
    correctParent.value.insertAdjacentElement(
        "afterbegin",
        notificationRef.value?.$el,
    );
}

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

/** set active to false and emit close event */
function close(...args: unknown[]): void {
    isActive.value = false;
    if (timer.value) clearTimeout(timer.value);
    emits("close", args);
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
        v-bind="$attrs"
        ref="notificationComponent"
        v-model:active="isActive"
        :override="override"
        :position="position"
        @close="close">
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
