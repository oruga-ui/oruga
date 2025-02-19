<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { DropdownClasses, DropdownItemClasses } from "../props";

const inspectData: InspectData<DropdownClasses & DropdownItemClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    triggerClass: {
        class: "triggerClass",
        description: "Class of the trigger element.",
    },
    teleportClass: {
        class: "teleportClass",
        description: "Class when the dropdown is teleported.",
        properties: ["teleport"],
        action: (cmp, data): void => {
            data.teleport = true;
            data.active = true;
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    inlineClass: {
        class: "inlineClass",
        description: "Class of the root element when inline.",
        properties: ["inline"],
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    activeClass: {
        class: "activeClass",
        description: "Class of the root element when menu is active or inline.",
        properties: ["active", "inline"],
        action: (cmp, data): void => {
            data.active = true;
        },
    },
    hoverableClass: {
        class: "hoverableClass",
        description: "Class of the root element when has trigger hover.",
        properties: ["triggers"],
        action: (cmp, data): void => {
            data.triggers = ["hover"];
        },
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element when has postion.",
        properties: ["position"],
        suffixes: [
            "auto",
            "top",
            "bottom",
            "left",
            "right",
            "top-right",
            "top-left",
            "bottom-left",
            "bottom-right",
            "auto",
            "top",
            "bottom",
            "left",
            "right",
            "top-right",
            "top-left",
            "bottom-left",
            "bottom-right",
        ],
        action: (cmp, data): void => {
            data.position = ["bottom"];
        },
    },
    modalClass: {
        class: "modalClass",
        description: "Class of the root element when shown as modal.",
        properties: ["mobileModal", "desktopModal"],
        action: (cmp, data): void => {
            data.mobileModal = true;
            data.desktopModal = true;
        },
    },
    overlayClass: {
        class: "overlayClass",
        description: "Class of the overlay element when shown as modal.",
        properties: ["mobileModal", "desktopModal"],
        action: (cmp, data): void => {
            data.mobileModal = true;
            data.desktopModal = true;
            data.active = true;
        },
    },
    menuClass: {
        class: "menuClass",
        description: "Class of the dropdown menu element.",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    menuActiveClass: {
        class: "menuActiveClass",
        description: "Class of dropdown menu element when active or inline.",
        properties: ["inline", "active"],
        action: (cmp, data): void => {
            data.active = true;
            data.inline = true;
        },
    },
    menuPositionClass: {
        class: "menuPositionClass",
        description: "Class of dropdown menu when has position.",
        properties: ["position"],
        suffixes: [
            "auto",
            "top",
            "bottom",
            "left",
            "right",
            "top-right",
            "top-left",
            "bottom-left",
            "bottom-right",
            "auto",
            "top",
            "bottom",
            "left",
            "right",
            "top-right",
            "top-left",
            "bottom-left",
            "bottom-right",
        ],
        action: (cmp, data): void => {
            data.position = "top-right";
            data.active = true;
        },
    },
    itemClass: {
        class: "itemClass",
        description: "Class of the dropdown item element",
        subitem: "dropdownitem",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemActiveClass: {
        class: "itemActiveClass",
        description: "Class of the dropdown item element when active.",
        subitem: "dropdownitem",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemDisabledClass: {
        class: "itemDisabledClass",
        description: "Class of the dropdown item element when disabled.",
        properties: ["disabled"],
        subitem: "dropdownitem",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemClickableClass: {
        class: "itemClickableClass",
        description: "Class of the dropdown item element when clickable",
        properties: ["clickable"],
        subitem: "dropdownitem",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemFocusedClass: {
        class: "itemFocusedClass",
        description: "Class of the dropdown item element when focused",
        subitem: "dropdownitem",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    scrollClipClass: {
        class: "scrollClipClass",
        description:
            "Class of the body when dropdown is open and scroll is clip.",
        properties: ["scroll"],
        action: (cmp, data): void => {
            data.scroll = "clip";
            data.active = true;
        },
    },
    noScrollClass: {
        class: "noScrollClass",
        description:
            "Class of the body when dropdown is open and scroll is not clip.",
        properties: ["scroll"],
        action: (cmp, data): void => {
            data.scroll = "";
            data.active = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-dropdown v-bind="props">
            <template #trigger="{ active }">
                <o-button
                    label="Click me!"
                    variant="primary"
                    :icon-right="active ? 'caret-up' : 'caret-down'" />
            </template>
            <o-dropdown-item v-bind="props" value="ac1">
                Action
            </o-dropdown-item>
            <o-dropdown-item v-bind="props" value="ac2">
                Another action
            </o-dropdown-item>
            <o-dropdown-item v-bind="props" value="ac3" disabled>
                Something else
            </o-dropdown-item>
        </o-dropdown>
    </inspector-wrapper>
</template>
