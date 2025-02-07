<script setup lang="ts">
import { ref } from "vue";

const activeStep = ref(1);

const subitem = "stepitem";
const inspectData = [
    {
        class: "rootClass",
        description: "Root class of the element",
    },
    {
        class: "mobileClass",
        description: "Class of steps component when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "sizeClass",
        description: "Size of the steps",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    {
        class: "verticalClass",
        description: "Class of the tooltip trigger",
        properties: ["vertical"],
        action: (cmp, data): void => {
            data.vertical = true;
        },
    },
    {
        class: "positionClass",
        description:
            "Class of the Steps component when is vertical and its position changes",
        properties: ["position", "vertical"],
        suffixes: ["bottom", "left", "right"],
        action: (cmp, data): void => {
            data.vertical = true;
            data.position = "right";
        },
    },
    {
        class: "animatedClass",
        description: "Class of Steps component when animation gets triggered",
        properties: ["animated"],
        action: (cmp, data): void => {
            data.animated = true;
        },
    },
    {
        class: "dividerClass",
        description: "Class of the Steps component dividers",
        specificity:
            "when <b>mobileClass</b> or <b>itemHeaderActiveClass</b> or <b>itemHeaderPreviousClass</b> or <b>positionClass</b> is applied",
    },
    {
        class: "markerClass",
        description: "Class of the Steps component marker",
        specificity:
            "when <b>itemHeaderActiveClass</b> or <b>itemHeaderPreviousClass</b> is applied",
    },
    {
        class: "markerRoundedClass",
        description: "Class of the Steps markers trigger when are rounded",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.position = "right";
        },
    },
    {
        class: "contentClass",
        description: "Class of the Steps component content",
        specificity: "when <b>positionClass</b> is applied",
    },
    {
        class: "transitioningClass",
        description:
            "Class of the Steps component content when transition is happening",
        warning: "Click on a marker to see it in action",
    },
    {
        class: "navClass",
        description: "Class of the steps nav container",
    },
    {
        class: "navItemClass",
        description: "Class of the nav item",
        specificity: "when <b>positionClass</b> is applied",
        subitem: true,
    },
    {
        class: "navItemActiveClass",
        description: "Class of the nav item when active",
        subitem: true,
    },
    {
        class: "navItemPreviousClass",
        description: "Class of the nav item before the active one",
        subitem: true,
        action: (): void => {
            activeStep.value = 2;
        },
    },
    {
        class: "navItemNextClass",
        description: "CClass of the nav item after the active one",
        subitem: true,
        action: (): void => {
            activeStep.value = 2;
        },
    },
    {
        class: "navItemVariantClass",
        description:
            "Class of the nav item with variant (default value by parent steps component)",
        subitem: true,
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
    {
        class: "stepClass",
        description: "Class of the content item",
        subitem: true,
    },
    {
        class: "stepActiveClass",
        description: "Class of the tab item when active",
    },
    {
        class: "stepClickableClass",
        description: "Class of the Steps component item when clickable",
        properties: ["clickable"],
    },
    {
        class: "stepDisabledClass",
        description: "Class of the Steps component item when disabled",
        properties: ["disabled"],
    },
    {
        class: "stepLabelPositionClass",
        description: "Class of the Step component item label when positioned",
        properties: ["labelPosition"],
        suffixes: ["bottom", "right", "left"],
        action: (cmp, data): void => {
            data.labelPosition = "right";
        },
    },
    {
        class: "stepLabelClass",
        description: "Class of the Step component item label",
    },
    {
        class: "stepIconClass",
        description: "Class of the Step component item icon",
    },
    {
        class: "stepPanelClass",
        description: "Class of the step item panel",
        subitem: true,
    },
    {
        class: "navigationClass",
        description: "Class of the Steps component navigation element",
        specificity: "when <b>positionClass</b> is applied",
    },
];
</script>

<template>
    <inspector-wrapper
        v-slot="props"
        :inspect-data="inspectData"
        :subitem="subitem">
        <o-steps v-bind="props" v-model="activeStep">
            <o-step-item
                v-bind="props"
                label="Account"
                icon="user-lock"
                step="1">
                <h1 class="title has-text-centered">Account</h1>
                Lorem ipsum dolor sit amet.
            </o-step-item>
            <o-step-item
                v-bind="props"
                label="Profile"
                icon="user"
                clickable
                step="2">
                <h1 class="title has-text-centered">Profile</h1>
                Lorem ipsum dolor sit amet.
            </o-step-item>
            <o-step-item
                v-bind="props"
                label="Social"
                icon="user-plus"
                step="3">
                <h1 class="title has-text-centered">Social</h1>
                Lorem ipsum dolor sit amet.
            </o-step-item>
        </o-steps>
    </inspector-wrapper>
</template>
