<script setup lang="ts">
import type { OptionsGroupProp } from "@oruga-ui/oruga-next";
import type { InspectData } from "@docs";
import type {
    ListboxClasses,
    ListboxProps,
    ListItemClasses,
    ListItemProps,
} from "@/components/listbox/props";

const options: OptionsGroupProp<string> = [
    {
        label: "Frameworks",
        options: ["Vue.js"],
    },
];

const inspectData: InspectData<
    ListboxClasses & ListItemClasses,
    ListboxProps<unknown, boolean> & ListItemProps<unknown>
> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (data): void => {
            data.disabled = true;
        },
    },
    selectableClass: {
        class: "selectableClass",
        description: "Class of the root element when selectable.",
        properties: ["selectable"],
        action: (data): void => {
            data.selectable = true;
        },
    },
    filterableClass: {
        class: "filterableClass",
        description: "Class of the root element when filterable.",
        properties: ["filterable"],
        action: (data): void => {
            data.filterable = true;
        },
    },
    multipleClass: {
        class: "multipleClass",
        description: "Class of the root element when multiple.",
        properties: ["multiple"],
        action: (data): void => {
            data.multiple = true;
        },
    },
    headerClass: {
        class: "headerClass",
        description: "Class of the header slot wrapper element.",
    },
    footerClass: {
        class: "footerClass",
        description: "Class of the footer slot wrapper element.",
    },
    emptyClass: {
        class: "emptyClass",
        description: "Class of the empty slot wrapper element.",
        action: (data): void => {
            data.options = [];
        },
    },
    filterClass: {
        class: "filterClass",
        description: "Class of the filter wrapper element.",
    },
    containerClass: {
        class: "containerClass",
        description: "Class of the list container element.",
    },
    listClass: {
        class: "listClass",
        description: "Class of the list element.",
    },
    itemClass: {
        class: "itemClass",
        subitem: "listitem",
        description: "Class of the item element.",
    },
    itemSelectedClass: {
        class: "itemSelectedClass",
        subitem: "listitem",
        description: "Class of the item element when selected.",
        action: (data): void => {
            data.modelValue = "Vue.js";
        },
    },
    itemFocusedClass: {
        class: "itemFocusedClass",
        subitem: "listitem",
        description: "Class of the item element when focused.",
    },
    itemClickableClass: {
        class: "itemClickableClass",
        subitem: "listitem",
        description: "Class of the item element when clickable.",
    },
    itemDisabledClass: {
        class: "itemDisabledClass",
        subitem: "listitem",
        description: "Class of the item element when disabled.",
        action: (data): void => {
            data.options = [
                {
                    label: "Frameworks",
                    options: ["Vue.js"],
                    attrs: { disabled: true },
                },
            ];
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
        <o-listbox :options="options" v-bind="props">
            <template #empty>No results found</template>
            <template #header>Header slot (optional)</template>
            <template #footer>Footer slot (optional)</template>
        </o-listbox>
    </inspector-wrapper>
</template>
