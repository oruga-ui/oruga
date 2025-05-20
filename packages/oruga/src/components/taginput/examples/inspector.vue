<script setup lang="ts">
import { ref } from "vue";
import type { InspectData } from "@docs";
import type { TaginputClasses, TaginputProps } from "../props";
import type { OptionsPropItem } from "@oruga-ui/oruga-next";

const options: OptionsPropItem[] = [
    {
        label: "Jesse Simmons",
        value: {
            id: 1,
            user: { first_name: "Jesse", last_name: "Simmons" },
            date: "2016/10/15 13:43:27",
            gender: "Male",
        },
    },
    {
        label: "John Jacobs",
        value: {
            id: 2,
            user: { first_name: "John", last_name: "Jacobs" },
            date: "2016/12/15 06:00:53",
            gender: "Male",
        },
    },
    {
        label: "Tina Gilbert",
        value: {
            id: 3,
            user: { first_name: "Tina", last_name: "Gilbert" },
            date: "2016/04/26 06:26:28",
            gender: "Female",
        },
    },
    {
        label: "Clarence Flores",
        value: {
            id: 4,
            user: { first_name: "Clarence", last_name: "Flores" },
            date: "2016/04/10 10:28:46",
            gender: "Male",
        },
    },
    {
        label: "Anne Lee",
        value: {
            id: 5,
            user: { first_name: "Anne", last_name: "Lee" },
            date: "2016/12/06 14:38:38",
            gender: "Female",
        },
    },
    {
        label: "Sara Armstrong",
        value: {
            id: 6,
            user: { first_name: "Sara", last_name: "Armstrong" },
            date: "2016/09/23 18:50:04",
            gender: "Female",
        },
    },
    {
        label: "Anthony Webb",
        value: {
            id: 7,
            user: { first_name: "Anthony", last_name: "Webb" },
            date: "2016/08/30 23:49:38",
            gender: "Male",
        },
    },
    {
        label: "Andrew Greene",
        value: {
            id: 8,
            user: { first_name: "Andrew", last_name: "Greene" },
            date: "2016/11/20 14:57:47",
            gender: "Male",
        },
    },
    {
        label: "Russell White",
        value: {
            id: 9,
            user: { first_name: "Russell", last_name: "White" },
            date: "2016/07/13 09:29:49",
            gender: "Male",
        },
    },
    {
        label: "Lori Hunter",
        value: {
            id: 10,
            user: { first_name: "Lori", last_name: "Hunter" },
            date: "2016/12/09 01:44:05",
            gender: "Female",
        },
    },
    {
        label: "Ronald Wood",
        value: {
            id: 11,
            user: { first_name: "Ronald", last_name: "Wood" },
            date: "2016/12/04 02:23:48",
            gender: "Male",
        },
    },
    {
        label: "Michael Harper",
        value: {
            id: 12,
            user: { first_name: "Michael", last_name: "Harper" },
            date: "2016/07/27 13:28:15",
            gender: "Male",
        },
    },
    {
        label: "George Dunn",
        value: {
            id: 13,
            user: { first_name: "George", last_name: "Dunn" },
            date: "2017/03/07 12:26:52",
            gender: "Male",
        },
    },
    {
        label: "Eric Rogers",
        value: {
            id: 14,
            user: { first_name: "Eric", last_name: "Rogers" },
            date: "2016/06/07 05:41:52",
            gender: "Male",
        },
    },
    {
        label: "Juan Meyer",
        value: {
            id: 15,
            user: { first_name: "Juan", last_name: "Meyer" },
            date: "2017/02/01 04:56:34",
            gender: "Male",
        },
    },
    {
        label: "Silvia Rosa",
        value: {
            id: 16,
            user: { first_name: "Silvia", last_name: "Rosa" },
            date: "2017/01/26 11:50:04",
            gender: "Female",
        },
    },
    {
        label: "Lori Cunningham",
        value: {
            id: 17,
            user: { first_name: "Lori", last_name: "Cunningham" },
            date: "2016/05/01 10:00:56",
            gender: "Female",
        },
    },
    {
        label: "Charle Graham",
        value: {
            id: 18,
            user: { first_name: "Charles", last_name: "Graham" },
            date: "2016/05/31 06:43:30",
            gender: "Male",
        },
    },
    {
        label: "Henry Morrison",
        value: {
            id: 19,
            user: { first_name: "Henry", last_name: "Morrison" },
            date: "2016/09/27 16:15:44",
            gender: "Male",
        },
    },
    {
        label: "Albert Mendoza",
        value: {
            id: 20,
            user: { first_name: "Albert", last_name: "Mendoza" },
            date: "2016/08/08 05:29:24",
            gender: "Male",
        },
    },
    {
        label: "Ruby Snyder",
        value: {
            id: 21,
            user: { first_name: "Ruby", last_name: "Snyder" },
            date: "2017/04/01 12:04:39",
            gender: "Female",
        },
    },
];

const tags = ref([options[1].value]);

const inspectData: InspectData<TaginputClasses, TaginputProps<unknown>> = {
    rootClass: {
        class: "rootClass",
        description: "Class of the root element.",
    },
    sizeClass: {
        class: "sizeClass",
        description: "Class of the root element with size.",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (data): void => {
            data.size = "large";
        },
    },
    variantClass: {
        class: "variantClass",
        description: "Class of the root element with variant.",
        properties: ["variant"],
        suffixes: ["primary", "info", "warning", "danger"],
        action: (data): void => {
            data.variant = "warning";
        },
    },
    expandedClass: {
        class: "expandedClass",
        description: "Class of the root element when expanded.",
        properties: ["expanded"],
        action: (data): void => {
            data.expanded = true;
        },
    },
    disabledClass: {
        class: "disabledClass",
        description: "Class of the root element when disabled.",
        properties: ["disabled"],
        action: (data): void => {
            data.disabled = true;
        },
    },
    containerClass: {
        class: "containerClass",
        description: "Class of the inner container element.",
    },
    itemClass: {
        class: "itemClass",
        description: "Class of the tag item element.",
    },
    closeClass: {
        class: "closeClass",
        description: "Class of the tag item close button element.",
        properties: ["closeable"],
        action: (data): void => {
            data.closeable = true;
        },
    },
    counterClass: {
        class: "counterClass",
        description: "Class of the counter element.",
        properties: ["counter", "maxitems"],
        action: (data): void => {
            data.counter = true;
            data.maxitems = 5;
        },
    },
    autocompleteClasses: {
        class: "autocompleteClasses",
        description: "Classes to apply on the internal autocomplete component.",
        relatedComponent: "Autocomplete",
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-taginput
            v-bind="props"
            v-model="tags"
            :options="options"
            :allow-autocomplete="true"
            icon="tag"
            placeholder="Add a tag">
        </o-taginput>
    </inspector-wrapper>
</template>
