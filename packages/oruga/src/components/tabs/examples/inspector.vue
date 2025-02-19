<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { TabsClasses, TabItemClasses } from "../props";

const inspectData: InspectData<TabsClasses & TabItemClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the root element with position.",
        properties: ["position"],
        suffixes: ["bottom", "left", "right"],
        action: (cmp, data): void => {
            data.vertical = true;
            data.position = "right";
        },
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    typeClass: {
        class: "typeClass",
        description: "Class of the root element with type.",
        properties: ["type"],
        suffixes: ["default", "boxed", "toggle", "pills"],
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    verticalClass: {
        class: "verticalClass",
        description: "Class of the root element when vertical.",
        properties: ["vertical"],
        action: (cmp, data): void => {
            data.vertical = true;
        },
    },
    multilineClass: {
        class: "multilineClass",
        description: "Class of the root element when multilined.",
        properties: ["multiline"],
        action: (cmp, data): void => {
            data.multiline = true;
        },
    },
    tablistClass: {
        class: "tablistClass",
        description: "Class of the tablist element.",
    },
    tabClass: {
        class: "tabClass",
        subitem: "tabitem",
        description: "Class of the tab item element.",
    },
    tabActiveClass: {
        class: "tabActiveClass",
        subitem: "tabitem",
        description: "Class of the tab item element when active.",
        action: (cmp, data): void => {
            data.active = true;
        },
    },
    tabPreviousClass: {
        class: "tabPreviousClass",
        subitem: "tabitem",
        description: "Class of the nav item element before the active one.",
    },
    tabNextClass: {
        class: "tabNextClass",
        subitem: "tabitem",
        description: "Class of the nav item element after the active one.",
    },
    tabDisabledClass: {
        class: "tabDisabledClass",
        subitem: "tabitem",
        description: "Class of the tab item element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    tabTypeClass: {
        class: "tabTypeClass",
        subitem: "tabitem",
        description: "Class of the tab item with type.",
        properties: ["type"],
        suffixes: ["default", "boxed", "toggle", "pills"],
    },
    tabIconClass: {
        class: "tabIconClass",
        subitem: "tabitem",
        description: "Class of the tab item icon element.",
        properties: ["icon"],
    },
    tabLabelClass: {
        class: "tabLabelClass",
        subitem: "tabitem",
        description: "Class of the tab item label element.",
        properties: ["label"],
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the tab item wrapper element.",
    },
    transitioningClass: {
        class: "transitioningClass",
        description:
            "Class of the tab item wrapper element when transitioning.",
    },
    tabPanelClass: {
        class: "tabPanelClass",
        subitem: "tabitem",
        description: "Class of the tab item panel element.",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-tabs v-bind="props">
            <o-tab-item
                v-bind="props"
                :value="1"
                label="Pictures"
                icon="images">
                Lorem ipsum dolor sit amet.
            </o-tab-item>
            <o-tab-item v-bind="props" :value="2" label="Music" icon="music">
                Lorem <br />
                ipsum <br />
                dolor <br />
                sit <br />
                amet.
            </o-tab-item>
            <o-tab-item v-bind="props" :value="3" label="Videos" icon="video">
                Nunc nec velit nec libero vestibulum eleifend. Curabitur
                pulvinar congue luctus. Nullam hendrerit iaculis augue vitae
                ornare. Maecenas vehicula pulvinar tellus, id sodales felis
                lobortis eget.
            </o-tab-item>
        </o-tabs>
    </inspector-wrapper>
</template>
