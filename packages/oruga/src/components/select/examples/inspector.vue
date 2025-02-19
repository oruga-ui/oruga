<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { SelectClasses } from "../props";

const inspectData: InspectData<SelectClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (cmp, data): void => {
            data.expanded = true;
        },
    },
    rootVariantClass: {
        class: "rootVariantClass",
        description: "Class of the root elelement with variant.",
    },
    selectClass: {
        class: "selectClass",
        description: "Class of the native select element.",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the select element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data): void => {
            data.size = "large";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the select element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (cmp, data): void => {
            data.fieldvariant = "info";
            data.fieldmessage = "Info for this field";
        },
    },
    roundedClass: {
        class: "roundedClass",
        description: "Class of select element when rounded.",
        properties: ["rounded"],
        action: (cmp, data): void => {
            data.rounded = true;
        },
    },
    multipleClass: {
        class: "multipleClass",
        description: "Class of the select element when multiple.",
        properties: ["multiple"],
        action: (cmp, data): void => {
            data.multiple = true;
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of select element when disabled.",
        properties: ["disabled"],
        action: (cmp, data): void => {
            data.disabled = true;
        },
    },
    placeholderClass: {
        class: "placeholderClass",
        description: "Class of the select element with an placeholder.",
    },
    arrowedClass: {
        class: "arrowedClass",
        description: "Class of the select element when with an arrow.",
        info: "It applies the arrow icon using background-image and background-position on select element. An alternative to override it is iconRight prop (globally or not).",
    },
    iconLeftSpaceClass: {
        class: "iconLeftSpaceClass",
        description: "Class of the select element with left icon space.",
        properties: ["icon"],
        action: (cmp, data): void => {
            data.icon = "envelope";
        },
    },
    iconRightSpaceClass: {
        class: "iconRightSpaceClass",
        description: "Class of the select element with right icon space.",
        properties: ["iconRight"],
        action: (cmp, data): void => {
            data.iconRight = "times-circle";
        },
    },
    iconLeftClass: {
        class: "iconLeftClass",
        description: "Class of the left icon element.",
        properties: ["icon"],
        action: (cmp, data): void => {
            data.icon = "envelope";
        },
    },
    iconRightClass: {
        class: "iconRightClass",
        description: "Class of the right icon element.",
        properties: ["iconRight"],
        action: (cmp, data): void => {
            data.iconRight = "times-circle";
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field :variant="props.fieldvariant" :message="props.fieldmessage">
            <o-select
                v-bind="props"
                placeholder="Select a character"
                aria-label="Select a character">
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
