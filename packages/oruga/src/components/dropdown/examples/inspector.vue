<script setup lang="ts">
import type { InspectData } from "@docs";
import type {
    DropdownClasses,
    DropdownItemClasses,
    DropdownProps,
    DropdownItemProps,
} from "../props";

const inspectData: InspectData<
    DropdownClasses & DropdownItemClasses,
    DropdownProps<unknown> & DropdownItemProps<unknown>
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
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
    teleportClass: {
        class: "teleportClass",
        description: "Class of the root element when teleported.",
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
        description: "Class of the root element when inlined.",
        properties: ["inline"],
        action: (cmp, data): void => {
            data.inline = true;
        },
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
        description: "Class of the root element when active or inline.",
        properties: ["active", "inline"],
        action: (cmp, data): void => {
            data.active = true;
        },
    },
    hoverableClass: {
        class: "hoverableClass",
        description: "Class of the root element when trigger is hoverable.",
        properties: ["triggers"],
        action: (cmp, data): void => {
            data.triggers = ["hover"];
        },
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element with postion.",
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
            data.position = "bottom";
        },
    },
    triggerClass: {
        class: "triggerClass",
        description: "Class of the trigger element.",
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
        description: "Class of the menu element.",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    menuActiveClass: {
        class: "menuActiveClass",
        description: "Class of the menu element when active or inline.",
        properties: ["inline", "active"],
        action: (cmp, data): void => {
            data.active = true;
            data.inline = true;
        },
    },
    menuPositionClass: {
        class: "menuPositionClass",
        description: "Class of the menu element with position.",
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
        subitem: "dropdownitem",
        description: "Class of the item element.",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemSelectedClass: {
        class: "itemSelectedClass",
        subitem: "dropdownitem",
        description: "Class of the item element when selected.",
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemDisabledClass: {
        class: "itemDisabledClass",
        subitem: "dropdownitem",
        description: "Class of the item element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemClickableClass: {
        class: "itemClickableClass",
        subitem: "dropdownitem",
        description: "Class of the item element when clickable.",
        properties: ["clickable"],
        action: (cmp, data): void => {
            data.inline = true;
        },
    },
    itemFocusedClass: {
        class: "itemFocusedClass",
        subitem: "dropdownitem",
        description: "Class of the item element when focused.",
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
            data.scroll = "keep";
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
