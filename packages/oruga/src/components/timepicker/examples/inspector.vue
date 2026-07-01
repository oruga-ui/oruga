<script setup lang="ts">
import type { InspectData } from "@docs";
import type { TimepickerClasses, TimepickerProps } from "../props";

const inspectData: InspectData<TimepickerClasses, TimepickerProps> = {
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
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (data): void => {
            data.size = "large";
            data.active = true;
        },
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (data): void => {
            data.expanded = true;
        },
    },
    triggerClass: {
        class: "triggerClass",
        description: "Class of the trigger element.",
    },
    contentClass: {
        class: "contentClass",
        description:
            "Class of the box container element where you choose the date.",
        action: (data): void => {
            data.inline = true;
            data.active = true;
        },
    },
    modalClass: {
        class: "modalClass",
        description: "Class of the content element when shown as modal",
        action: (data): void => {
            data.desktopModal = true;
            data.mobileModal = true;
            data.active = true;
        },
    },
    separatorClass: {
        class: "separatorClass",
        description: "Class of the select separator element.",
        action: (data): void => {
            data.active = true;
        },
    },
    footerClass: {
        class: "footerClass",
        description: "Class of the footer element.",
        action: (data): void => {
            data.active = true;
        },
    },
    inputClass: {
        class: "inputClass",
        description: "Class to apply on the input element.",
        relatedClass: "inputClasses.rootClass",
        relatedComponent: "Input",
    },
    inputAttrs: {
        class: "inputAttrs",
        description:
            "Input properties to apply on the internal input component.",
        relatedComponent: "Input",
    },
    selectClass: {
        class: "selectClass",
        description: "Class to apply on the select element.",
        relatedClass: "selectClasses.rootClass",
        relatedComponent: "Select",
    },
    selectAttrs: {
        class: "selectAttrs",
        description:
            "Select properties to apply on the internal select component.",
        relatedComponent: "Select",
        action: (data): void => {
            data.active = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field label="Select time">
            <o-timepicker placeholder="Click to select..." v-bind="props">
                <div>This is the footer</div>
            </o-timepicker>
        </o-field>
    </inspector-wrapper>
</template>
