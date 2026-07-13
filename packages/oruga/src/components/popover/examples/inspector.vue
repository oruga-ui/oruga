<script setup lang="ts">
import type { InspectData } from "@docs";
import type { PopoverClasses, PopoverProps } from "../props";

const inspectData: InspectData<PopoverClasses, PopoverProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    modalClass: {
        class: "modalClass",
        description: "Class of the root element when shown as modal.",
        properties: ["modal"],
        action: (data): void => {
            data.modal = true;
            data.active = true;
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (data): void => {
            data.disabled = true;
        },
    },
    activeClass: {
        class: "activeClass",
        description: "Class of the root element when active.",
        properties: ["active"],
        action: (data): void => {
            data.active = true;
        },
    },
    teleportClass: {
        class: "teleportClass",
        description: "Class of the root element when teleported.",
        properties: ["teleport"],
        action: (data): void => {
            data.teleport = true;
        },
    },
    triggerClass: {
        class: "triggerClass",
        description: "Class of the trigger element.",
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
    },
    contentActiveClass: {
        class: "contentActiveClass",
        description: "Class of the content element when active.",
        properties: ["active"],
        action: (data): void => {
            data.active = true;
        },
    },
    contentBackdropClass: {
        class: "contentBackdropClass",
        description: "Class of the content when should has a backdrop.",
        properties: ["modal"],
        action: (data): void => {
            data.modal = true;
            data.active = true;
        },
    },
    headerClass: {
        class: "headerClass",
        description: "Class of the content header element.",
        properties: ["title"],
        action: (data): void => {
            data.active = true;
        },
    },
    bodyClass: {
        class: "bodyClass",
        description: "Class of the content body element.",
        action: (data): void => {
            data.active = true;
        },
    },
    closeClass: {
        class: "closeClass",
        description: "Class of the close element.",
    },
    scrollClipClass: {
        class: "scrollClipClass",
        description: "Class of the body when is open and scroll is clipped.",
        properties: ["clipScroll"],
        action: (data): void => {
            data.clipScroll = true;
        },
    },
    scrollKeepClass: {
        class: "scrollKeepClass",
        description: "Class of the body when is open and scroll is keeped.",
        properties: ["clipScroll"],
        action: (data): void => {
            data.clipScroll = false;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-popover content="Tooltip!" v-bind="props">
            <o-button label="Open Popover!" />

            <template #content>
                <h4>Heading</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur warning elit. Fusce
                    id fermentum quam
                </p>
                <a href="#">Some Link</a>
            </template>
        </o-popover>
    </inspector-wrapper>
</template>
