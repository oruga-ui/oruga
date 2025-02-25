<script setup lang="ts">
import { ref } from "vue";
import type { InspectData } from "@docs";
import type { FieldClasses, FieldProps } from "../props";

const name = ref("");

const inspectData: InspectData<FieldClasses, FieldProps> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    mobileClass: {
        class: "mobileClass",
        description: "Class of the root element when on mobile.",
        info: "Switch to mobile view to see it in action!",
    },
    focusedClass: {
        class: "focusedClass",
        description:
            "Class of the root element when the form element is focused.",
        info: "Will be controlled by the focus event emitted by form elements.",
        action: (cmp): void => {
            cmp.focus();
        },
    },
    filledClass: {
        class: "filledClass",
        description:
            "Class of the root element when the form element is filled.",
        info: "Will be controlled by the form element.",
        action: (): void => {
            name.value = "Oruga";
        },
    },
    bodyClass: {
        class: "bodyClass",
        description: "Class for the body wrapper element.",
    },
    groupedClass: {
        class: "groupedClass",
        description: "Class of the inner body wrapper when grouped.",
        properties: ["grouped"],
        action: (cmp, data): void => {
            data.grouped = true;
        },
    },
    addonsClass: {
        class: "addonsClass",
        description:
            "Class of the inner body wrapper element when element get automatically attached together inside a field.",
        action: (cmp, data): void => {
            data.addons = true;
        },
    },
    multilineClass: {
        class: "multilineClass",
        description:
            "Class for inner body wrapper element to fill up multiple lines.",
        properties: ["multiline"],
        action: (cmp, data): void => {
            data.multiline = true;
        },
    },
    horizontalClass: {
        class: "horizontalClass",
        description: "Class to align label and control in horizontal forms.",
        properties: ["horizontal"],
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    horizontalLabelClass: {
        class: "horizontalLabelClass",
        description: "Class for the label element when horizontal.",
        properties: ["horizontal"],
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    horizontalBodyClass: {
        class: "horizontalBodyClass",
        description: "Class for the body element when horizontal.",
        properties: ["horizontal"],
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    labelClass: {
        class: "labelClass",
        description: "Class for the label element.",
        properties: ["label"],
    },
    labelSizeClass: {
        class: "labelSizeClass",
        description: "Class for the label element with size.",
        properties: ["label", "labelSize"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.labelSize = "large";
        },
    },
    labelVariantClass: {
        class: "labelVariantClass",
        description: "Class of the label element with variant.",
        properties: ["label", "variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "info";
        },
    },
    messageClass: {
        class: "messageClass",
        description: "Class of the the message element.",
        properties: ["message"],
        action: (cmp, data): void => {
            data.message = "This is a message for the field";
        },
    },
    messageVariantClass: {
        class: "messageVariantClass",
        description: "Class of the message element with variant.",
        properties: ["message", "variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "info";
            data.message = "This is a message for the field";
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field label="Field" grouped v-bind="props">
            <o-input v-model="name" name="name" placeholder="Name" expanded />
            <o-input
                name="email"
                type="email"
                placeholder="nobody@nowhere.com"
                expanded />
        </o-field>
    </inspector-wrapper>
</template>
