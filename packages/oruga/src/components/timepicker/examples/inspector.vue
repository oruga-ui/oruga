<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

const timepicker = ref();

// get programmatic oruga access
const app = getCurrentInstance();
const oruga = app?.appContext.config.globalProperties.$oruga;

const triggerClass = oruga?.config
    ? oruga.config.getOption("dropdown.triggerClass", "o-drop__trigger")
    : "o-drop__trigger";

function openTimePicker() {
    setTimeout(() => {
        timepicker.value.$el.getElementsByClassName(triggerClass)[0].click();
    }, 500);
}

const inspectData = [
    {
        class: "rootClass",
        description: "Class of the root element",
    },
    {
        class: "sizeClass",
        description: "Class of the Timepicker component size",
        properties: ["size"],
        suffixes: ["small", "medium", "large"],
        action: (cmp, data) => {
            data.size = "large";
            openTimePicker();
        },
    },
    {
        class: "boxClass",
        description:
            "Class of the Timepicker component box where you choose the date",
        action: () => {
            openTimePicker();
        },
    },
    {
        class: "separatorClass",
        description: "Class of the Timepicker separator",
        action: () => {
            openTimePicker();
        },
    },
    {
        class: "footerClass",
        description: "Class of the Timepicker footer",
        action: () => {
            openTimePicker();
        },
    },
    {
        class: "mobileClass",
        description: "Class of the Table when on mobile",
        warning: "Switch to mobile view to see it in action!",
    },
    {
        class: "inputClasses",
        realClass: "inputClasses.rootClass",
        description: "Classes to apply on internal input component",
        componentRef: "Input",
    },
    {
        class: "dropdownClasses",
        realClass: "dropdownClasses.rootClass",
        description: "Classes to apply on internal dropdown component",
        componentRef: "Dropdown",
        action: () => {
            openTimePicker();
        },
    },
    {
        class: "selectClasses",
        realClass: "selectClasses.selectClass",
        description: "Classes to apply on internal select component",
        componentRef: "Select",
        action: () => {
            openTimePicker();
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field label="Select time">
            <o-timepicker
                v-bind="props"
                ref="timepicker"
                placeholder="Click to select...">
                <div>This is the footer</div>
            </o-timepicker>
        </o-field>
    </inspector-wrapper>
</template>

<style>
.datepicker__table {
    border-collapse: collapse;
}
</style>
