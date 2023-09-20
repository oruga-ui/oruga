<script setup>
import { ref } from "vue";

const activeTab = ref(1);

const subitem = "tabitem";

const inspectData = [
    {
        class: "rootClass",
        description: "Root class of the element",
    },
    {
        class: "navSizeClass",
        description: "Size of the navigation",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
        },
    },
    {
        class: "navTypeClass",
        description: "Type of the navigation",
        properties: ["type"],
        suffixes: ["default", "boxed", "toggle"],
    },
    {
        class: "verticalClass",
        description: "Class of Tabs component when vertical",
        properties: ["vertical"],
        action: (cmp, data) => {
            data.vertical = true;
        },
    },
    {
        class: "expandedClass",
        description: "Class of Tabs component when expanded",
        properties: ["expanded"],
        action: (cmp, data) => {
            data.expanded = true;
        },
    },
    {
        class: "multilineClass",
        description: "Class of Tabs component when multiline",
        properties: ["multiline"],
        action: (cmp, data) => {
            data.multiline = true;
        },
    },
    {
        class: "positionClass",
        description:
            "Class of Tabs component when when is vertical and its position changes",
        properties: ["position", "vertical"],
        suffixes: ["bottom", "left", "right"],
        action: (cmp, data) => {
            data.vertical = true;
            data.position = "right";
        },
    },
    {
        class: "tabItemWrapperClass",
        description: "Class of the tab item wrapper",
        specificity: "when <b>expandedClass</b> is applied",
    },
    {
        class: "contentClass",
        description: "Class of the tab content",
    },
    {
        class: "itemClass",
        description: "Class of the tab item",
        subitem: true,
    },
    {
        class: "itemHeaderClass",
        description: "Class of the tab item header",
        specificity:
            "when <b>verticalClass</b> or <b>expandedClass</b> or <b>positionClass</b> is applied",
        subitem: true,
    },
    {
        class: "itemHeaderActiveClass",
        description: "Class of the tab item header when active",
        subitem: true,
        suffixes: ["default", "boxed", "toggle"],
    },
    {
        class: "itemHeaderDisabledClass",
        description: "Class of the tab item header when disabled",
        subitem: true,
        suffixes: ["default", "boxed", "toggle"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "itemHeaderTypeClass",
        description: "Class of the tab item header type",
        subitem: true,
        suffixes: ["default", "boxed", "toggle"],
    },
    {
        class: "itemHeaderIconClass",
        description: "Class of the tab item header icon",
        subitem: true,
    },
    {
        class: "itemHeaderTextClass",
        description: "Class of the tab item header text",
        subitem: true,
    },
    {
        class: "navTabsClass",
        description: "Class of the Tabs component nav tabs",
        specificity: "when <b>positionClass</b> is applied",
    },
    {
        class: "navPositionClass",
        description: "Class of the Tabs component nav position",
        properties: ["position"],
        suffixes: ["bottom", "left", "right"],
        action: (cmp, data) => {
            data.vertical = false;
            data.position = "right";
        },
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
