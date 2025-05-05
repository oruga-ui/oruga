<script setup lang="ts">
import type { InspectData } from "@docs";
import type {
    BreadcrumbClasses,
    BreadcrumbItemClasses,
    BreadcrumbItemProps,
    BreadcrumbProps,
} from "../props";

const inspectData: InspectData<
    BreadcrumbClasses & BreadcrumbItemClasses,
    BreadcrumbProps & BreadcrumbItemProps
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (data) => {
            data.size = "large";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the root element with variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data) => {
            data.variant = "warning";
        },
    },
    positionClass: {
        class: "positionClass",
        description: "Class of the breadcrumb with alignment",
        properties: ["position"],
        suffixes: ["left", "center", "right"],
        action: (data) => {
            data.variant = "right";
        },
    },
    listClass: {
        class: "listClass",
        description: "Class of the list element",
    },
    itemClass: {
        class: "itemClass",
        description: " Class of the item element",
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the item element when disabled",
        properties: ["disabled"],
        action: (data) => {
            data.disabled = true;
        },
    },
    activeClass: {
        class: "activeClass",
        description: "Class of the item element when active",
        properties: ["active"],
        action: (data) => {
            data.active = true;
        },
    },
    seperatorClass: {
        class: "seperatorClass",
        description: "Class of the item seperator element",
        properties: ["separator"],
        action: (data) => {
            data.separator = "/";
        },
    },
    linkClass: {
        class: "linkClass",
        description: "Class of the item link element",
    },
    iconClass: {
        class: "iconClass",
        description: "Class of the item icon element",
        properties: ["iconLeft", "iconRight"],
        action: (data) => {
            data.iconLeft = "home";
            data.iconRight = "home";
        },
    },
    iconLeftClass: {
        class: "iconLeftClass",
        description: "Class of the item left icon element",
        properties: ["iconLeft"],
        action: (data) => {
            data.iconLeft = "home";
        },
    },
    iconRightClass: {
        class: "iconRightClass",
        description: "Class of the item right icon element",
        properties: ["iconRight"],
        action: (data) => {
            data.iconRight = "home";
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-breadcrumb v-bind="props">
            <o-breadcrumb-item v-bind="props" label="Home" />
            <o-breadcrumb-item label="Docs" href="/documentation/" />
            <o-breadcrumb-item
                label="Breadcrumb"
                href="/components/Breadcrumb.html" />
        </o-breadcrumb>
    </inspector-wrapper>
</template>
