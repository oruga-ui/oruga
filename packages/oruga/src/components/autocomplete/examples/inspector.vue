<script setup lang="ts">
import { ref } from "vue";
import type { OptionsGroupProp } from "@oruga-ui/oruga-next";
import type { InspectData } from "@/docs";
import type { AutocompleteClasses } from "../props";

const options: OptionsGroupProp<string> = [
    {
        group: "Frameworks",
        options: ["Vue.js"],
    },
];

const inspectData: InspectData<AutocompleteClasses> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element",
    },
    itemClass: {
        class: "itemClass",
        description: "Class of the menu items",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el?.dispatchEvent(new Event("focus"));
            el?.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    itemHoverClass: {
        class: "itemHoverClass",
        description: "Class of the menu items on hover",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el?.dispatchEvent(new Event("focus"));
            el?.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    keyCode: 40,
                    charCode: 40,
                    ctrlKey: false,
                    altKey: false,
                    shiftKey: false,
                    metaKey: false,
                }),
            );
            setTimeout(() => {
                el?.dispatchEvent(
                    new KeyboardEvent("keydown", {
                        bubbles: true,
                        cancelable: true,
                        keyCode: 40,
                        charCode: 40,
                        ctrlKey: false,
                        altKey: false,
                        shiftKey: false,
                        metaKey: false,
                    }),
                );
                el?.dispatchEvent(
                    new KeyboardEvent("keydown", {
                        bubbles: true,
                        cancelable: true,
                        keyCode: 40,
                        charCode: 40,
                        ctrlKey: false,
                        altKey: false,
                        shiftKey: false,
                        metaKey: false,
                    }),
                );
            }, 500);
        },
    },
    itemGroupTitleClass: {
        class: "itemGroupTitleClass",
        description: "Class of the menu items group title",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el?.dispatchEvent(new Event("focus"));
            el?.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    itemEmptyClass: {
        class: "itemEmptyClass",
        description: "Class of the menu empty placeholder item",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el?.dispatchEvent(new Event("focus"));
            el?.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "|",
                    shiftKey: true,
                }),
            );
        },
    },
    itemHeaderClass: {
        class: "itemHeaderClass",
        description: "Class of the menu header item",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el?.dispatchEvent(new Event("focus"));
            el?.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    itemFooterClass: {
        class: "itemFooterClass",
        description: "Class of the menu footer item",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el?.dispatchEvent(new Event("focus"));
            el?.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    inputClasses: {
        class: "inputClasses",
        description: "Classes to apply on internal input component",
        relatedClass: "inputClasses.rootClass",
        relatedComponent: "Input",
    },
};

const selected = ref();
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-autocomplete
            v-bind="props"
            v-model="selected"
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
