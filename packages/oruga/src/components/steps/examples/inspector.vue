<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { StepsClasses, StepItemClasses } from "../props";

const inspectData: InspectData<StepsClasses & StepItemClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Size of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
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
    positionClass: {
        class: "positionClass",
        description:
            "Class of the root element when is vertical and has position.",
        properties: ["position", "vertical"],
        suffixes: ["left", "right", "centered"],
        action: (cmp, data): void => {
            data.vertical = true;
            data.position = "right";
        },
    },
    verticalClass: {
        class: "verticalClass",
        description: "Class of the root element when is vertical.",
        properties: ["vertical"],
        action: (cmp, data): void => {
            data.vertical = true;
        },
    },
    listClass: {
        class: "listClass",
        description: "Class of the steps list container.",
    },
    animatedClass: {
        class: "animatedClass",
        description: "Class of steps list container when animated.",
        properties: ["animated"],
        action: (cmp, data): void => {
            data.animated = true;
        },
    },
    dividerClass: {
        class: "dividerClass",
        description: "Class of the step item divider element.",
    },
    markerClass: {
        class: "markerClass",
        description: "Class of the step item marker element.",
    },
    markerRoundedClass: {
        class: "markerRoundedClass",
        description: "Class of the step item marker element when rounded.",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.position = "right";
        },
    },
    contentClass: {
        class: "contentClass",
        description: "Class of the content element.",
        specificity: "when <b>positionClass</b> is applied",
    },
    transitioningClass: {
        class: "transitioningClass",
        description: "Class of the content element when transitioning",
        info: "Click on a marker to see it in action!",
    },
    stepClass: {
        class: "stepClass",
        subitem: "stepitem",
        description: "Class of the step item element.",
    },
    stepActiveClass: {
        class: "stepActiveClass",
        subitem: "stepitem",
        description: "Class of the step item element when active.",
    },
    stepVariantClass: {
        class: "stepVariantClass",
        subitem: "stepitem",
        description:
            "Class of the step item element with variant (default value by parent steps component).",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "warning";
        },
    },
    stepClickableClass: {
        class: "stepClickableClass",
        subitem: "stepitem",
        description: "Class of the step item element when clickable.",
        properties: ["clickable"],
    },
    stepDisabledClass: {
        class: "stepDisabledClass",
        subitem: "stepitem",
        description: "Class of the step item element when disabled.",
        properties: ["disabled"],
    },
    stepPreviousClass: {
        class: "stepPreviousClass",
        subitem: "stepitem",
        description: "Class of the step item element before the active one.",
        action: (cmp, data): void => {
            data.modelValue = 2;
        },
    },
    stepNextClass: {
        class: "stepNextClass",
        subitem: "stepitem",
        description: "Class of the step item element after the active one.",
        action: (cmp, data): void => {
            data.modelValue = 2;
        },
    },
    stepPositionClass: {
        class: "stepPositionClass",
        subitem: "stepitem",
        description: "Class of the step item element when positioned.",
        properties: ["labelPosition"],
        suffixes: ["bottom", "right", "left"],
        action: (cmp, data): void => {
            data.labelPosition = "right";
        },
    },
    stepLabelClass: {
        class: "stepLabelClass",
        subitem: "stepitem",
        description: "Class of the step item label element.",
    },
    stepIconClass: {
        class: "stepIconClass",
        subitem: "stepitem",
        description: "Class of the step item icon element.",
    },
    stepPanelClass: {
        class: "stepPanelClass",
        subitem: "stepitem",
        description: "Class of the step panel element.",
    },
    navigationClass: {
        class: "navigationClass",
        description: "Class of the navigation element",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-steps v-bind="props">
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
