
<template>
    <doc-wrapper :inspect-class="inspectClass">
        <template v-slot:default="s">
            <o-field label="Select datetime">
                <o-datetimepicker
                    v-bind="s"
                    placeholder="Click to select..."
                    icon="calendar"
                    horizontal-time-picker
                    ref="datetimepicker"
                >
                </o-datetimepicker>
            </o-field>
        </template>
    </doc-wrapper>
    <inspector :inspectData="inspectData" @inspect-class="inspectClass = $event"></inspector>
</template>

<script>
export default {
    methods: {
        openDatetimePicker() {
            setTimeout(() => {
                this.$refs.datetimepicker.$el.getElementsByClassName('o-drop__trigger')[0].click()
            }, 500)
        }
    },
    data() {
        return {
            inspectClass: {},
            inspectData: [
                {
                    class: "datepickerWrapperClass",
                    description: "Class of the Datepicker wrapper",
                },
                {
                    class: "timepickerWrapperClass",
                    description: "Class of the Timepicker wrapper",
                    action: () => {
                        this.openDatetimePicker();
                    }
                }
            ],
        };
    }
}
</script>
<style>
.datepicker__table {
    border-collapse: collapse;
}
</style>
