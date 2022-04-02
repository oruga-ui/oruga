<template>
    <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field label="Select a date">
                    <o-datepicker v-bind="s" :events="events" locale="en-GB" placeholder="Click to select a date..." icon="calendar" ref="datepicker">
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
            events: [
                {
                    date: new Date(),
                    type: 'info'
                },
                {
                    date: new Date(),
                    type: 'warning'
                }
            ],
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
                    description: "Class of the Datepicker box where you choose the date",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerClass",
                    description: "Class of the Datepicker header inside the box",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerButtonsClass",
                    description: "Class of the Datepicker buttons inside the box",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerButtonsSizeClass",
                    description: "Class of the Datepicker buttons inside the box when a size is choosen",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.size = 'large';
                        this.openDatePicker();
                    },
                },
                {
                    class: "prevBtnClass",
                    description: "Class of the prev. button inside the Datepicker box",
                    specificity: "when <b>mobileClass</b> is applied",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "nextBtnClass",
                    description: "Class of the next button inside the Datepicker box",
                    specificity: "when <b>mobileClass</b> is applied",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "listsClass",
                    description: "Class of the month and year selects container inside the Datepicker box",
                    specificity: "when <b>mobileClass</b> is applied",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "footerClass",
                    description: "Class of the Datepicker footer",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableClass",
                    description: "Class of the Datepicker table inside the box",
                    action: (cmp) => {
                        cmp.data.type = ''
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableHeadClass",
                    description: "Class of Datepicker header with days of the week inside the table",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableHeadCellClass",
                    description: "Class of the cell inside the table header",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableBodyClass",
                    description: "Class of the table body inside the box",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableRowClass",
                    description: "Class of the table row",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellClass",
                    description: "Class of the table cell",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellInvisibleClass",
                    description: "Class of the table cell when nearby month days are hidden",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.nearbyMonthDays = false
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellSelectedClass",
                    description: "Class of table cell when it's selected",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellFirstSelectedClass",
                    description: "Class of the first selected table cell when in range",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.range = true
                        cmp.data.inline = true
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellWithinSelectedClass",
                    description: "Class of the table cells within the range when the range is selected",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.range = true
                        cmp.data.inline = true
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellLastSelectedClass",
                    description: "Class of the last selected table cell during range selection",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellFirstHoveredClass",
                    description: "Class of the first hovered table cell during range selection",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellWithinHoveredClass",
                    description: "Class of the table cell when hovered during range selection",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellLastHoveredClass",
                    description: "Class of the last table cell hovered during range selection",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellTodayClass",
                    description: "Class of the table cell of the current day",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellSelectableClass",
                    description: "Class of the table cell that is selectable",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellUnselectableClass",
                    description: "Class of the table cell that is unselectable",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellNearbyClass",
                    description: "Class of the table cell when nearby days (prev/next month) are selectable",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.nearbySelectableMonthDays = true
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellEventsClass",
                    description: "Class of the cell of a row when at least one event is present",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableEventClass",
                    description: "Class of the event",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableEventsClass",
                    description: "Class of the events container",
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableEventVariantClass",
                    description: "Class of the event indicator when a `variant` is specified",
                    properties: ["variant in event"],
                    suffixes: ['primary', 'info', 'warning', 'danger'],
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableEventIndicatorsClass",
                    description: "Class of the event indicator",
                    properties: ['indicator'],
                    suffixes: ['bars', 'dots', '*'],
                    action: (cmp) => {
                        cmp.data.type = ''
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.indicators = 'bars'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthClass",
                    description: "Class of the Datepicker table inside the box when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthBodyClass",
                    description: "Class of the table body inside the box when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthRowClass",
                    description: "Class of the table row when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellClass",
                    description: "Class of the table cell when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellInvisibleClass",
                    description: "Class of the table cell when nearby month days are hidden when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        cmp.data.nearbyMonthDays = false
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellSelectedClass",
                    description: "Class of table cell when it's selected when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellFirstSelectedClass",
                    description: "Class of the first selected table cell when in range when type is month",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        cmp.data.range = true
                        cmp.data.inline = true
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellWithinSelectedClass",
                    description: "Class of the table cells within the range when the range is selected when type is month",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        cmp.data.range = true
                        cmp.data.inline = true
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellLastSelectedClass",
                    description: "Class of the last selected table cell during range selection when type is month",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellFirstHoveredClass",
                    description: "Class of the first hovered table cell during range selection when type is month",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellWithinHoveredClass",
                    description: "Class of the table cell when hovered during range selection when type is month",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellLastHoveredClass",
                    description: "Class of the last table cell hovered during range selection when type is month",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
                        cmp.data.range = true
                        cmp.data.inline = true
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellTodayClass",
                    description: "Class of the table cell of the current day when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellSelectableClass",
                    description: "Class of the table cell that is selectable when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellUnselectableClass",
                    description: "Class of the table cell that is unselectable when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthCellNearbyClass",
                    description: "Class of the table cell when nearby days (prev/next month) are selectable when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        cmp.data.nearbySelectableMonthDays = true
                        this.openDatePicker();
                    }
                },
                {
                    class: "monthEventsClass",
                    description: "Class of the events container when type is month",
                    action: (cmp) => {
                        cmp.data.type = 'month'
                        cmp.data.monthClass = 'datepicker__,table__month'
                        this.openDatePicker();
                    }
                },
                {
                    class: "mobileClass",
                    description: "Class of the Datepicker when on mobile",
                    warning: "Switch to mobile view to see it in action!",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "inputClasses",
                    realClass: "inputClasses.rootClass",
                    description: "Classes to apply on internal input.",
                    componentRef: "Input"
                },
                {
                    class: "dropdownClasses",
                    realClass: "dropdownClasses.rootClass",
                    description: "Classes to apply on dropdown.",
                    componentRef: "Dropdown",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "selectListClasses",
                    description: "Classes to apply on select list (month and year).",
                    componentRef: "Select",
                    action: () => {
                        this.openDatePicker();
                    }
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
