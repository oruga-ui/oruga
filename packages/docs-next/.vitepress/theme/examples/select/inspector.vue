<script setup>
import { ref } from "vue";

const selectedOptions = ref(null);
const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
        action: () => {
            selectedOptions.value = null;
        },
    },
    {
        class: "labelClass",
        description: "Class of the input label",
        action: () => {
            selectedOptions.value = null;
        },
    },
    {
        class: "iconLeftSpaceClass",
        description: "Class of the left icon space inside the select",
        properties: ["icon"],
        action: (cmp, data) => {
            data.icon = "envelope";
            selectedOptions.value = null;
        },
    },
    {
        class: "iconRightSpaceClass",
        description: "Class of the right icon space inside the select",
        properties: ["iconRight"],
        action: (cmp, data) => {
            data.iconRight = "times-circle";
            selectedOptions.value = null;
        },
    },
    {
        class: "roundedClass",
        description: "Class of select when rounded",
        properties: ["rounded"],
        action: (cmp, data) => {
            data.rounded = true;
            selectedOptions.value = null;
        },
    },
    {
        class: "multipleClass",
        description: "Class of the select when multiple mode is active",
        properties: ["multiple"],
        action: (cmp, data) => {
            data.multiple = true;
            selectedOptions.value = [];
        },
    },
    {
        class: "expandedClass",
        description: "Class of select when expanded",
        properties: ["expanded"],
        action: (cmp, data) => {
            data.expanded = true;
            selectedOptions.value = null;
        },
    },
    {
        class: "disabledClass",
        description: "Class of select when disabled ",
        properties: ["disabled"],
        action: (cmp, data) => {
            data.disabled = true;
        },
    },
    {
        class: "iconLeftClass",
        description: "Class of the left icon",
        properties: ["icon"],
        action: (cmp, data) => {
            data.icon = "envelope";
            selectedOptions.value = null;
        },
    },
    {
        class: "iconRightClass",
        description: "Class of the right icon",
        properties: ["iconRight"],
        action: (cmp, data) => {
            data.iconRight = "times-circle";
            selectedOptions.value = null;
        },
    },
    {
        class: "sizeClass",
        description: "Class of the select size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
            selectedOptions.value = null;
        },
    },
    {
        class: "variantClass",
        description: "Class of the select variant",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data) => {
            data.fieldvariant = "info";
            data.fieldmessage = "Info for this field";
            selectedOptions.value = null;
        },
    },
    {
        class: "selectClass",
        description: "Class of the native select element",
    },
    {
        class: "placeholderClass",
        description: "Class of the select placeholder",
        action: () => {
            selectedOptions.value = null;
        },
    },
    {
        class: "arrowClass",
        description: "Class of the select arrow",
        warning:
            "It applies the arrow icon using background-image and background-position on select element. An alternative to override it is iconRight prop (globally or not)",
        action: () => {
            selectedOptions.value = null;
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field :variant="props.fieldvariant" :message="props.fieldmessage">
            <o-select
                v-bind="props"
                v-model="selectedOptions"
                placeholder="Select a character">
                <optgroup label="Black Sails">
                    <option value="flint">Flint</option>
                    <option value="silver">Silver</option>
                    <option value="vane">Vane</option>
                    <option value="billy">Billy</option>
                    <option value="jack">Jack</option>
                </optgroup>
                <optgroup label="Breaking Bad">
                    <option value="heisenberg">Heisenberg</option>
                    <option value="jesse">Jesse</option>
                    <option value="saul">Saul</option>
                    <option value="mike">Mike</option>
                </optgroup>
            </o-select>
        </o-field>
    </inspector-wrapper>
</template>
