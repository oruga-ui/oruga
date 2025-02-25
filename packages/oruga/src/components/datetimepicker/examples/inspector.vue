<script setup lang="ts">
import type { InspectData } from "@docs";
import type { DatetimePickerClasses, DatetimepickerProps } from "../props";

const inspectData: InspectData<DatetimePickerClasses, DatetimepickerProps> = {
    datepickerWrapperClass: {
        class: "datepickerWrapperClass",
        description: "Class of the Datepicker component wrapper element.",
    },
    timepickerWrapperClass: {
        class: "timepickerWrapperClass",
        description: "Class of the Timepicker component wrapper element.",
        action: (data): void => {
            data.active = true;
        },
    },
};
</script>

<template>
    <inspector-wrapper v-slot="props" :inspect-data="inspectData">
        <o-field label="Select datetime">
            <o-datetimepicker
                placeholder="Click to select..."
                icon="calendar"
                horizontal-time-picker
                v-bind="props" />
        </o-field>
    </inspector-wrapper>
</template>
