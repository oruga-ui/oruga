<script setup>
function openDatetimePicker() {
    setTimeout(() => {
        this.$refs.datetimepicker.$el
            .getElementsByClassName("o-drop__trigger")[0]
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
