<script setup lang="ts">
import { ref } from "vue";
import type { OptionsGrpupItem } from "@oruga-ui/oruga-next";

const options: OptionsGrpupItem<string>[] = [
    {
        group: "Frameworks",
        options: ["Vue.js"],
    },
];

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "itemClass",
        description: "Class of the menu items",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el.dispatchEvent(new Event("focus"));
            el.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    {
        class: "itemHoverClass",
        description: "Class of the menu items on hover",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el.dispatchEvent(new Event("focus"));
            el.dispatchEvent(
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
                el.dispatchEvent(
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
                el.dispatchEvent(
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
    {
        class: "itemGroupTitleClass",
        description: "Class of the menu items group title",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el.dispatchEvent(new Event("focus"));
            el.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    {
        class: "itemEmptyClass",
        description: "Class of the menu empty placeholder item",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el.dispatchEvent(new Event("focus"));
            el.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "|",
                    shiftKey: true,
                }),
            );
        },
    },
    {
        class: "itemHeaderClass",
        description: "Class of the menu header item",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el.dispatchEvent(new Event("focus"));
            el.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    {
        class: "itemFooterClass",
        description: "Class of the menu footer item",
        action: (cmp) => {
            const el = cmp.querySelector("input");
            el.dispatchEvent(new Event("focus"));
            el.dispatchEvent(
                new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: "Q",
                    shiftKey: true,
                }),
            );
        },
    },
    {
        class: "inputClasses",
        realClass: "inputClasses.rootClass",
        description: "Classes to apply on internal input component",
        componentRef: "Input",
    },
];

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
