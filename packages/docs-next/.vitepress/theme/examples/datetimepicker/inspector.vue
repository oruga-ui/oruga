<script setup>
import { getCurrentInstance, ref } from "vue";

const datetimepicker = ref();

// get programmatic oruga access
const app = getCurrentInstance();
const oruga = app.appContext.config.globalProperties.$oruga;

const triggerClass = oruga?.config
    ? oruga.config.getOption("dropdown.triggerClass", "o-drop__trigger")
    : "o-drop__trigger";

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

<style lang="scss">
.datepicker__table {
    border-collapse: collapse;
}
</style>
