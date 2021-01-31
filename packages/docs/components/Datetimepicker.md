---
title: Datetimepicker
---

# Datetimepicker

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/datetimepicker/examples/Datetimepicker.md" class="docgen-edit-link">edit on github</a>

## Examples

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <div class="control">
        <o-switch v-model="showWeekNumber">Show week number</o-switch>
      </div>
      <div class="control">
        <o-switch v-model="enableSeconds">Enable seconds</o-switch>
      </div>
      <o-field label="Locale">
        <o-select v-model="locale">
          <option :value="undefined"></option>
          <option value="de-DE">de-DE</option>
          <option value="en-CA">en-CA</option>
          <option value="en-GB">en-GB</option>
          <option value="en-US">en-US</option>
          <option value="es-ES">es-ES</option>
          <option value="es-MX">es-MX</option>
          <option value="fr-CA">fr-CA</option>
          <option value="fr-FR">fr-FR</option>
          <option value="it-IT">it-IT</option>
          <option value="ja-JP">ja-JP</option>
          <option value="pt-BR">pt-BR</option>
          <option value="ru-RU">ru-RU</option>
          <option value="zn-CN">zn-CN</option>
        </o-select>
      </o-field>
      <o-field label="Hour format">
        <o-select v-model="hourFormat">
          <option :value="undefined"></option>
          <option value="12">12</option>
          <option value="24">24</option>
        </o-select>
      </o-field>
    </o-field>
    <o-field label="Select datetime">
      <o-datetimepicker
        rounded
        placeholder="Click to select..."
        icon="calendar"
        :locale="locale"
        :datepicker="{ showWeekNumber }"
        :timepicker="{ enableSeconds, hourFormat }"
        horizontal-time-picker
      >
      </o-datetimepicker>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        showWeekNumber: false,
        enableSeconds: false,
        hourFormat: undefined, // Browser locale
        locale: undefined // Browser locale
      }
    }
  }
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datetimepicker.scss)

<br />
<template>
    <div>
        <doc-wrapper>
            <template v-slot:default="s">
                <o-field label="Select datetime">
                    <o-datetimepicker
                        v-bind="s"
                        placeholder="Click to select..."
                        icon="calendar"
                        horizontal-time-picker
                    >
                    </o-datetimepicker>
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

| Prop name            | Description                                                 | Type           | Values                                            | Default                                                                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody         |                                                             | boolean        | -                                                 |                                                                                                                                                                                                                                       |
| autocomplete         | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                                                                                                                       |
| datepicker           |                                                             | object         | -                                                 |                                                                                                                                                                                                                                       |
| datetimeCreator      |                                                             | func           | -                                                 | (date) => {<br> const datetimeCreator = getValueByPath(config, 'datetimepicker.datetimeCreator', undefined)<br> if (typeof datetimeCreator === 'function') {<br> return datetimeCreator(date)<br> } else {<br> return date<br> }<br>} |
| datetimeFormatter    |                                                             | func           | -                                                 |                                                                                                                                                                                                                                       |
| datetimeParser       |                                                             | func           | -                                                 |                                                                                                                                                                                                                                       |
| disabled             |                                                             | boolean        | -                                                 |                                                                                                                                                                                                                                       |
| editable             |                                                             | boolean        | -                                                 | false                                                                                                                                                                                                                                 |
| expanded             | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                                                                                                                       |
| focusable            |                                                             | boolean        | -                                                 | true                                                                                                                                                                                                                                  |
| horizontalTimePicker |                                                             | boolean        | -                                                 |                                                                                                                                                                                                                                       |
| icon                 | Icon name to be added                                       | string         | -                                                 |                                                                                                                                                                                                                                       |
| iconPack             | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                                                                                                       |
| inline               |                                                             | boolean        | -                                                 |                                                                                                                                                                                                                                       |
| maxDatetime          |                                                             | date           | -                                                 |                                                                                                                                                                                                                                       |
| maxlength            | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                                                                                                                       |
| minDatetime          |                                                             | date           | -                                                 |                                                                                                                                                                                                                                       |
| mobileNative         |                                                             | boolean        | -                                                 | true                                                                                                                                                                                                                                  |
| openOnFocus          |                                                             | boolean        | -                                                 |                                                                                                                                                                                                                                       |
| placeholder          |                                                             | string         | -                                                 |                                                                                                                                                                                                                                       |
| position             |                                                             | string         | -                                                 |                                                                                                                                                                                                                                       |
| rounded              | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                                                                                                                       |
| statusIcon           | Show status icon using field and variant prop               | boolean        | -                                                 | () => {<br> return getValueByPath(config, "statusIcon", true);<br>}                                                                                                                                                                   |
| timepicker           |                                                             | object         | -                                                 |                                                                                                                                                                                                                                       |
| tzOffset             |                                                             | number         | -                                                 | 0                                                                                                                                                                                                                                     |
| useHtml5Validation   | Enable html 5 native validation                             | boolean        | -                                                 | () => {<br> return getValueByPath(config, "useHtml5Validation", true);<br>}                                                                                                                                                           |
| validationMessage    | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                                                                                                                       |
| value                |                                                             | date           | -                                                 |                                                                                                                                                                                                                                       |

## Events

| Event name   | Properties | Description |
| ------------ | ---------- | ----------- |
| change-month |            |
| change-year  |            |
| blur         |            |
| focus        |            |
| input        |            |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| left  |             |          |
| right |             |          |
