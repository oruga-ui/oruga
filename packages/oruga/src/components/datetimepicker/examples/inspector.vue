<script setup lang="ts">
import type { InspectData } from "@/docs";
import type { DatetimePickerClasses } from "../props";

const inspectData: InspectData<DatetimePickerClasses> = {
    datepickerWrapperClass: {
        class: "datepickerWrapperClass",
        description: "Class of the Datepicker wrapper element.",
    },
    timepickerWrapperClass: {
        class: "timepickerWrapperClass",
        description: "Class of the Timepicker wrapper element.",
        action: (cmp, data): void => {
            data.active = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field label="Select datetime">
            <o-datetimepicker
                v-bind="props"
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
