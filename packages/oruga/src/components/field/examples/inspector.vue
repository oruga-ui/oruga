<script setup lang="ts">
import { ref } from "vue";
import type { InspectData } from "@/docs";
import type { FieldClasses } from "../props";

const name = ref("");

const inspectData: InspectData<FieldClasses> = {
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
        description: "Class for field label when horizontal.",
        properties: ["horizontal"],
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    horizontalBodyClass: {
        class: "horizontalBodyClass",
        description: "Class for field body when horizontal.",
        properties: ["horizontal"],
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    groupedClass: {
        class: "groupedClass",
        description:
            "Class of the inner wrapper when fields are grouped together.",
        properties: ["grouped"],
        action: (cmp, data): void => {
            data.grouped = true;
        },
    },
    groupMultilineClass: {
        class: "groupMultilineClass",
        description:
            "Class of the inner wrapper when fields fill up multiple lines.",
        properties: ["groupMultiline"],
        action: (cmp, data): void => {
            data.groupMultiline = true;
        },
    },
    addonsClass: {
        class: "addonsClass",
        description:
            "Class of the inner wrapper when components automatically attached together.",
        info: "Use the <code>expanded</code> prop on the control to fill up the remaining space.",
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    bodyClass: {
        class: "bodyClass",
        description: "Class for the field body wrapper element.",
    },
    labelClass: {
        class: "labelClass",
        description: "Class for the field label element.",
    },
    labelSizeClass: {
        class: "labelSizeClass",
        description: "Class for the field label element with size.",
        properties: ["labelSize"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.labelSize = "large";
        },
    },
    labelVariantClass: {
        class: "labelVariantClass",
        description: "Class of the label field with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "info";
        },
    },
    messageClass: {
        class: "messageClass",
        description: "Class of the the field message element.",
        properties: ["message"],
        action: (cmp, data): void => {
            data.message = "This is a message for the field";
        },
    },
    messageVariantClass: {
        class: "messageVariantClass",
        description: "Class of the field message element with variant.",
        properties: ["variant"],
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
        <o-field v-bind="props" label="Field" grouped>
            <o-input v-model="name" name="name" placeholder="Name" expanded />
            <o-input
                name="email"
                type="email"
                placeholder="nobody@nowhere.com"
                expanded />
        </o-field>
    </inspector-wrapper>
</template>
