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

<script setup>
function openTimePicker() {
    setTimeout(() => {
        this.$refs.timepicker.$el
            .getElementsByClassName("o-drop__trigger")[0]
            .click();
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
        description: "Classes to apply on internal input.",
        componentRef: "Input",
    },
    {
        class: "dropdownClasses",
        realClass: "dropdownClasses.rootClass",
        description: "Classes to apply on dropdown.",
        componentRef: "Dropdown",
        action: () => {
            openTimePicker();
        },
    },
    {
        class: "selectClasses",
        realClass: "selectClasses.selectClass",
        description: "Classes to apply on select.",
        componentRef: "Select",
        action: () => {
            openTimePicker();
        },
    },
];
</script>

<style lang="scss">
.datepicker__table {
    border-collapse: collapse;
}
</style>
