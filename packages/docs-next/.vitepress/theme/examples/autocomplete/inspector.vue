<script setup>
const filtered = [
    {
        type: "Frameworks",
        items: ["Vue.js"],
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
                    char: "Q",
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
                    char: "Q",
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
                    char: "|",
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
                    char: "Q",
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
                    char: "Q",
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
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-autocomplete
            v-bind="props"
            group-field="type"
            group-options="items"
            placeholder="e.g. Vue.js"
            :data="filtered"
            icon="search"
            clearable
            @select="(option) => (selected = option)">
            <template #empty>No results found</template>
            <template #header>Header slot (optional)</template>
            <template #footer>Footer slot (optional)</template>
        </o-autocomplete>
    </inspector-wrapper>
</template>
