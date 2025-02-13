<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref(1);

const subitem = "tabitem";

const inspectData = [
    {
        class: "rootClass",
        description: "Root class of the element",
    },
    {
        class: "verticalClass",
        description: "Class of Tabs component when vertical",
        properties: ["vertical"],
        action: (cmp, data): void => {
            data.vertical = true;
        },
    },
    {
        class: "expandedClass",
        description: "Class of Tabs component when expanded",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    {
        class: "multilineClass",
        description: "Class of Tabs component when multiline",
        properties: ["multiline"],
        action: (cmp, data): void => {
            data.multiline = true;
        },
    },
    {
        class: "positionClass",
        description: "Class of Tabs component position",
        properties: ["position"],
        suffixes: ["bottom", "left", "right"],
        action: (cmp, data): void => {
            data.vertical = true;
            data.position = "right";
        },
    },
    {
        class: "sizeClass",
        description: "Size of the navigation",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    {
        class: "typeClass",
        description: "Type of the navigation",
        properties: ["type"],
        suffixes: ["default", "boxed", "toggle", "pills"],
    },
    {
        class: "tablistClass",
        description: "Class of the tablist element",
    },
    {
        class: "tabClass",
        description: "Class of the tab item",
        subitem: true,
    },
    {
        class: "tabActiveClass",
        description: "Class of the tab item when active",
        subitem: true,
        action: (cmp, data): void => {
            data.active = true;
        },
    },
    {
        class: "tabPreviousClass",
        description: "Class of the nav item before the active one",
    },
    {
        class: "tabNextClass",
        description: "Class of the nav item after the active one",
    },
    {
        class: "tabDisabledClass",
        description: "Class of the tab item when disabled",
        properties: ["disabled"],
        subitem: true,
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    {
        class: "tabTypeClass",
        description: "Class of the tab item type",
        properties: ["type"],
        subitem: true,
        suffixes: ["default", "boxed", "toggle", "pills"],
    },
    {
        class: "tabIconClass",
        description: "Class of the tab item icon",
        properties: ["icon"],
        subitem: true,
    },
    {
        class: "tabLabelClass",
        description: "Class of the tab item label",
        properties: ["label"],
        subitem: true,
    },
    {
        class: "contentClass",
        description: "Class of the tab content",
    },
    {
        class: "transitioningClass",
        description: "Class of the tab content when transitioning",
    },
    {
        class: "tabPanelClass",
        description: "Class of the tab item panel",
        subitem: true,
    },
];
</script>

<template>
    <inspector-wrapper
        v-slot="props"
        :inspect-data="inspectData"
        :subitem="subitem">
        <o-tabs v-model="activeTab" v-bind="props">
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
