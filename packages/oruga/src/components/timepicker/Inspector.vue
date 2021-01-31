<template>
    <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field label="Select time">
                    <o-timepicker v-bind="s" placeholder="Click to select..." ref="timepicker">
                        <div>This is the footer</div>
                    </o-timepicker>
                </o-field>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    methods: {
        openTimePicker() {
            setTimeout(() => {
                this.$refs.timepicker.$el.getElementsByClassName('o-drop__trigger')[0].click()
            }, 500)
        }
    },
    data() {
        return {
            inspectData: [
                {
                    class: "rootClass",
                    description: "Class of the root element",
                },
                {
                    class: "sizeClass",
                    description: "Class of the Timepicker component size",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                        this.openTimePicker();
                    },
                },
                {
                    class: "boxClass",
                    description: "Class of the Timepicker component box where you choose the date",
                    action: () => {
                        this.openTimePicker();
                    }
                },
                {
                    class: "selectClass",
                    description: "Class of the Timepicker select",
                    action: () => {
                        this.openTimePicker();
                    }
                },
                {
                    class: "selectPlaceholderClass",
                    description: "Class of the Timepicker select placeholder",
                    action: () => {
                        this.openTimePicker();
                    }
                },
                {
                    class: "separatorClass",
                    description: "Class of the Timepicker separator",
                    action: () => {
                        this.openTimePicker();
                    },
                },
                {
                    class: "footerClass",
                    description: "Class of the Timepicker footer",
                    action: () => {
                        this.openTimePicker();
                    }
                },
                {
                    class: "mobileClass",
                    description: "Class of the Table when on mobile",
                    warning: "Switch to mobile view to see it in action!"
                },
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
