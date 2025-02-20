<script setup lang="ts">
import type { OptionsGroupProp } from "@oruga-ui/oruga-next";
import type { InspectData } from "@/docs";
import type { AutocompleteClasses, AutocompleteProps } from "../props";

const options: OptionsGroupProp<string> = [
    {
        label: "Frameworks",
        options: ["Vue.js"],
    },
];

const inspectData: InspectData<
    AutocompleteClasses,
    AutocompleteProps<unknown>
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    itemClass: {
        class: "itemClass",
        description: "Class of the menu items.",
        action: (cmp, data): void => {
            data.input = "Q";
            data.active = true;
        },
    },
    itemGroupTitleClass: {
        class: "itemGroupTitleClass",
        description: "Class of the menu items group title.",
        action: (cmp, data): void => {
            data.input = "Q";
            data.active = true;
        },
    },
    itemEmptyClass: {
        class: "itemEmptyClass",
        description: "Class of the menu empty placeholder item.",
        action: (cmp, data): void => {
            data.input = "|";
            data.active = true;
        },
    },
    itemHeaderClass: {
        class: "itemHeaderClass",
        description: "Class of the menu header item.",
        action: (cmp, data): void => {
            data.input = "Q";
            data.active = true;
        },
    },
    itemFooterClass: {
        class: "itemFooterClass",
        description: "Class of the menu footer item.",
        action: (cmp, data): void => {
            data.input = "Q";
            data.active = true;
        },
    },
    inputClasses: {
        class: "inputClasses",
        description: "Classes to apply on the internal input component.",
        relatedComponent: "Input",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-autocomplete
            v-bind="props"
            :options="options"
            placeholder="e.g. Vue.js"
            icon="search"
            clearable
            selectable-header
            selectable-footer>
            <template #empty>No results found</template>
            <template #header>Header slot (optional)</template>
            <template #footer>Footer slot (optional)</template>
        </o-autocomplete>
    </inspector-wrapper>
</template>
