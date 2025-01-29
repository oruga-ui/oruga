<script setup lang="ts">
import { ref } from "vue";
import { useOruga } from "@/utils/programmatic";

const datetimepicker = ref();

// get programmatic oruga access
const oruga = useOruga();
const triggerClass =
    oruga.config.getOption("input.iconLeftClass", "o-input__icon-left") ??
    "o-input__icon-left";

function openDatetimePicker() {
    setTimeout(() => {
        datetimepicker.value.$el
            .getElementsByClassName(triggerClass)[0]
            .click();
    }, 500);
}

const inspectData = [
    {
        class: "datepickerWrapperClass",
        description: "Class of the Datepicker wrapper",
    },
    {
        class: "timepickerWrapperClass",
        description: "Class of the Timepicker wrapper",
        action: () => {
            openDatetimePicker();
        },
    },
];
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field label="Select datetime">
            <o-datetimepicker
                v-bind="props"
                ref="datetimepicker"
                placeholder="Click to select..."
                icon="calendar"
                horizontal-time-picker />
        </o-field>
    </inspector-wrapper>
</template>

<style>
.datepicker__table {
    border-collapse: collapse;
}
</style>
