---
title: Timepicker
---

# Timepicker

> An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile

---

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_timepicker.scss)

<br />
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
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerClass",
                    description: "Class of the Datepicker header inside the box",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerButtonsClass",
                    description: "Class of the Datepicker buttons inside the box",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "headerButtonsSizeClass",
                    description: "Class of the Datepicker buttons inside the box when a size is choosen",
                    properties: ["size"],
                    suffixes: ['small', 'medium', 'large'],
                    action: (cmp) => {
                        cmp.data.size = 'large';
                        this.openDatePicker();
                    },
                },
                {
                    class: "prevBtnClass",
                    description: "Class of the prev. button inside the Datepicker box",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "nextBtnClass",
                    description: "Class of the next button inside the Datepicker box",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "listsClass",
                    description: "Class of the month and year selects container inside the Datepicker box",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "footerClass",
                    description: "Class of the Datepicker footer",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableClass",
                    description: "Class of the Datepicker table inside the box",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableHeadClass",
                    description: "Class of Datepicker header with days of the week inside the table",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableHeadCellClass",
                    description: "Class of the cell inside the table header",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableBodyClass",
                    description: "Class of the table body inside the box",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableRowClass",
                    description: "Class of the table row",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellClass",
                    description: "Class of the table cell",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellInvisibleClass",
                    description: "Class of the table cell when nearby month days are hidden",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.nearbyMonthDays = false
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellSelectedClass",
                    description: "Class of table cell when it's selected",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellFirstSelectedClass",
                    description: "Class of the first selected table cell when in range",
                    warning: "See it in action selecting a date range",
                    action: (cmp) => {
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
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellSelectableClass",
                    description: "Class of the table cell that is selectable",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellUnselectableClass",
                    description: "Class of the table cell that is unselectable",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellNearbyClass",
                    description: "Class of the table cell when nearby days (prev/next month) are selectable",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.nearbySelectableMonthDays = true
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableCellEventsClass",
                    description: "Class of the cell of a row when at least one event is present",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableEventClass",
                    description: "Class of the event",
                    action: (cmp) => {
                        cmp.data.tableClass = 'datepicker__table'
                        this.openDatePicker();
                    }
                },
                {
                    class: "tableEventsClass",
                    description: "Class of the events container",
                    action: (cmp) => {
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
                        cmp.data.tableClass = 'datepicker__table'
                        cmp.data.indicators = 'bars'
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

<br />
<br />

## Props

| Prop name             | Description                                                        | Type           | Values                                            | Default                                                                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------ | -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody          |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| autocomplete          | Native options to use in HTML5 validation                          | string         | -                                                 |                                                                                                                                                                                                                                                         |
| defaultMinutes        |                                                                    | number         | -                                                 |                                                                                                                                                                                                                                                         |
| defaultSeconds        |                                                                    | number         | -                                                 |                                                                                                                                                                                                                                                         |
| disabled              |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| dropdownClasses       | Classes to apply on internal dropdown (@see o-dropdown style docs) | object         | -                                                 |                                                                                                                                                                                                                                                         |
| editable              |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| enableSeconds         |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| expanded              | Makes input full width when inside a grouped or addon field        | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| focusable             |                                                                    | boolean        | -                                                 | true                                                                                                                                                                                                                                                    |
| hourFormat            |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| icon                  | Icon name to be added                                              | string         | -                                                 |                                                                                                                                                                                                                                                         |
| iconPack              | Icon pack to use                                                   | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                                                                                                                         |
| incrementHours        |                                                                    | number         | -                                                 | 1                                                                                                                                                                                                                                                       |
| incrementMinutes      |                                                                    | number         | -                                                 | 1                                                                                                                                                                                                                                                       |
| incrementSeconds      |                                                                    | number         | -                                                 | 1                                                                                                                                                                                                                                                       |
| inline                |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| inputClasses          | Classes to apply on internal input (@see o-input style docs)       | object         | -                                                 |                                                                                                                                                                                                                                                         |
| maxTime               |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |
| maxlength             | Same as native maxlength, plus character counter                   | number\|string | -                                                 |                                                                                                                                                                                                                                                         |
| minTime               |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |
| mobileBreakpoint      | Mobile breakpoint as max-width value                               | string         | -                                                 |                                                                                                                                                                                                                                                         |
| mobileNative          |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> timepicker {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                                                                                                             |
| openOnFocus           |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| override              |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| placeholder           |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| position              |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| resetOnMeridianChange |                                                                    | boolean        | -                                                 | false                                                                                                                                                                                                                                                   |
| rounded               | Makes the element rounded                                          | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| statusIcon            | Show status icon using field and variant prop                      | boolean        | -                                                 | () => {<br> return getValueByPath(config, "statusIcon", true);<br>}                                                                                                                                                                                     |
| timeCreator           |                                                                    | func           | -                                                 | () => {<br> const timeCreator = getValueByPath(config, 'timepicker.timeCreator', undefined)<br> if (typeof timeCreator === 'function') {<br> return timeCreator()<br> } else {<br> return new Date()<br> }<br>}                                         |
| timeFormatter         |                                                                    | func           | -                                                 | (date, vm) => {<br> const timeFormatter = getValueByPath(config, 'timepicker.timeFormatter', undefined)<br> if (typeof timeFormatter === 'function') {<br> return timeFormatter(date)<br> } else {<br> return defaultTimeFormatter(date, vm)<br> }<br>} |
| timeParser            |                                                                    | func           | -                                                 | (date, vm) => {<br> const timeParser = getValueByPath(config, 'timepicker.timeParser', undefined)<br> if (typeof timeParser === 'function') {<br> return timeParser(date)<br> } else {<br> return defaultTimeParser(date, vm)<br> }<br>}                |
| tzOffset              |                                                                    | number         | -                                                 | 0                                                                                                                                                                                                                                                       |
| unselectableTimes     |                                                                    | array          | -                                                 |                                                                                                                                                                                                                                                         |
| useHtml5Validation    | Enable html 5 native validation                                    | boolean        | -                                                 | () => {<br> return getValueByPath(config, "useHtml5Validation", true);<br>}                                                                                                                                                                             |
| validationMessage     | The message which is shown when a validation error occurs          | string         | -                                                 |                                                                                                                                                                                                                                                         |
| value                 |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| blur       |            |
| focus      |            |
| input      |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

## Style

| CSS Variable                 | SASS Variable          | Default          |
| ---------------------------- | ---------------------- | ---------------- |
| --oruga-timepicker-font-size | \$timepicker-font-size | \$base-font-size |
