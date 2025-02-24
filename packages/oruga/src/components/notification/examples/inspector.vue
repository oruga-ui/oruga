<script setup lang="ts">
import type { InspectData } from "@docs";
import type {
    NotificationClasses,
    NotificationNoticeClasses,
    NotificationProps,
} from "../props";

const inspectData: InspectData<
    NotificationClasses & NotificationNoticeClasses,
    NotificationProps
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
        info: "You have to declare a class when override mode.",
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element when positioned.",
        properties: ["position"],
        suffixes: [
            "top-right",
            "top",
            "top-left",
            "bottom-right",
            "bottom",
            "bottom-left",
        ],
        info: "You have to declare a class for top and bottom position when override mode.",
        action: (cmp, data): void => {
            data.position = "top-right";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the root element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
    wrapperClass: {
        class: "wrapperClass",
        description: "Class of the wrapper element.",
    },
    iconClass: {
        class: "iconClass",
        description: "Class of the icon element on the left.",
        properties: ["type"],
        action: (cmp, data): void => {
            data.type = "info";
        },
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
    },
    closeClass: {
        class: "closeClass",
        description: "Class of the close button element.",
        properties: ["closable"],
        action: (cmp, data): void => {
            data.closable = true;
        },
    },
    noticeClass: {
        class: "noticeClass",
        description: "Class of the notice wrapper element.",
        nospec: true,
    },
    noticePositionClass: {
        class: "noticePositionClass",
        description: "Class of the notice wrapper element when positioned.",
        properties: ["position"],
        suffixes: [
            "top-right",
            "top",
            "top-left",
            "bottom-right",
            "bottom",
            "bottom-left",
        ],
        action: (cmp, data): void => {
            data.position = "top-right";
        },
        nospec: true,
    },
    noticeContainerClass: {
        class: "noticeContainerClass",
        description: "Class of the notice container element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-notification v-bind="props">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
            fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
            sapien laoreet elit
        </o-notification>
    </inspector-wrapper>
</template>
