<script setup lang="ts">
import { ref } from "vue";

const name = ref("");

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "mobileClass",
        description: "Class of file component when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "horizontalClass",
        description: "Class to align label and control in horizontal forms",
        properties: ["horizontal"],
        specificity: "when <b>horizontal</b> is applied",
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    {
        class: "horizontalLabelClass",
        description: "Class for field label when horizontal",
        properties: ["horizontal"],
        specificity: "when <b>horizontal</b> is applied",
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    {
        class: "horizontalBodyClass",
        description: "Class for field body when horizontal",
        specificity: "when <b>horizontal</b> is applied",
        properties: ["horizontal"],
        action: (cmp, data): void => {
            data.horizontal = true;
        },
    },
    {
        class: "groupedClass",
        description: "Class when fields are grouped together",
        properties: ["grouped"],
        action: (cmp, data): void => {
            data.grouped = true;
        },
    },
    {
        class: "groupMultilineClass",
        description: "Class when fields fill up multiple lines",
        properties: ["groupMultiline"],
        action: (cmp, data): void => {
            data.groupMultiline = true;
        },
    },
    {
        class: "labelClass",
        description: "Class for field label",
    },
    {
        class: "labelSizeClass",
        description: "Class for field label size",
        properties: ["labelSize"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.labelSize = "large";
        },
    },
    {
        class: "labelVariantClass",
        description: "Class of the label field variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "info";
        },
    },
    {
        class: "bodyClass",
        description: "Class for field body",
    },
    {
        class: "addonsClass",
        description:
            "Class for components automatically attached together when inside a field",
        warning:
            "Use the <code>expanded</code> prop on the control to fill up the remaining space",
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    {
        class: "messageClass",
        description: "Class for the field message",
        properties: ["message"],
        action: (cmp, data): void => {
            data.message = "This is a message for the field";
        },
    },
    {
        class: "messageVariantClass",
        description: "Class of the message field variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.variant = "info";
            data.message = "This is a message for the field";
        },
    },
    {
        class: "focusedClass",
        description: "Class for the focused field",
        warning: "focus event emitted by form elements",
        action: (cmp): void => {
            cmp.focus();
        },
    },
    {
        class: "filledClass",
        description: "Class for the filled field",
        warning: "when it contains a input",
        action: (): void => {
            name.value = "Oruga";
        },
    },
];
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
