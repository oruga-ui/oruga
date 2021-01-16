<template>
    <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field label="Select a date">
                    <o-datepicker v-bind="s" locale="en-GB" placeholder="Click to select a date..." icon="calendar" ref="datepicker">
                        Footer
                    </o-datepicker>
                </o-field>
            </template>
        </doc-wrapper>
        <inspector :inspectData="inspectData"></inspector>
    </div>
</template>

<script>
export default {
    methods: {
        openDatePicker() {
            setTimeout(() => {
                this.$refs.datepicker.$el.getElementsByClassName('o-input-iconspace-left')[0].click()
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
                    description: "Class of the Datepicker size",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                    },
                },
                {
                    class: "boxClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerButtonsClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerButtonsSizeClass",
                    description: "Class of the root element",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                        this.openDatePicker();
                    },
                },
                {
                    class: "prevBtnClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "nextBtnClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "listsClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "footerClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableClass",
                    description: "Class of the root element",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableHeadClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableHeadCellClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableBodyClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableRowClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellSelectedClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellFirstSelectedClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellWithinSelectedClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellLastSelectedClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellFirstHoveredClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellWithinHoveredClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellLastHoveredClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellTodayClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellSelectableClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellUnselectableClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellNearbyClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableCellEventsClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableEventsClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableEventVariantClass",
                    description: "Class of the root element",
                },
                {
                    class: "tableEventIndicatorClass",
                    description: "Class of the root element",
                },
                {
                    class: "mobileClass",
                    description: "Class of the root element",
                    warning: "Switch to mobile view to see it in action!",
                }
            ],
        };
    }
}
</script>
