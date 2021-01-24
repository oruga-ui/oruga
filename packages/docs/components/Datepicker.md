---
title: Datepicker
---

# Datepicker

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/datepicker/examples/Datepicker.md" class="docgen-edit-link">edit on github</a>

## Examples

::: demo

```html
<template>
  <section>
    <o-field grouped group-multiline>
      <o-field>
        <o-select v-model="locale" placeholder="Locale">
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
        </o-select>
      </o-field>
      <o-field>
        <o-switch v-model="showWeekNumber">Show week number</o-switch>
      </o-field>
    </o-field>
    <o-field label="Select a date">
      <o-datepicker v-model="selected" :show-week-number="showWeekNumber" :locale="locale" placeholder="Click to select..." icon="calendar" trap-focus> </o-datepicker>
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        selected: new Date(),
        showWeekNumber: false,
        locale: undefined // Browser locale
      }
    }
  }
</script>
```

:::

### Min/Max date

::: demo

```html
<template>
  <o-field label="Select a date">
    <o-datepicker placeholder="Click to select..." icon="calendar" :min-date="minDate" :max-date="maxDate"> </o-datepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      const today = new Date()

      return {
        date: new Date(),
        minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
      }
    }
  }
</script>
```

:::

### Range

::: demo

```html
<template>
  <o-field label="Select a date">
    <o-datepicker placeholder="Click to select..." icon="calendar" v-model="dates" range> </o-datepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      return {
        dates: []
      }
    }
  }
</script>
```

:::

### Multiple

::: demo

```html
<template>
  <o-field label="Select a date">
    <o-datepicker placeholder="Click to select..." v-model="dates" multiple> </o-datepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      return {
        dates: []
      }
    }
  }
</script>
```

:::

### Trigger

::: demo

```html
<template>
  <section>
    <o-field label="Select a date" grouped>
      <o-datepicker v-model="selected" :mobile-native="false">
        <template v-slot:trigger>
          <o-button icon-left="calendar" type="primary" />
        </template>
      </o-datepicker>
      <o-input readonly :value="selectedString" />
    </o-field>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        selected: null
      }
    },
    computed: {
      selectedString() {
        return this.selected ? this.selected.toDateString() : ''
      }
    }
  }
</script>
```

:::

### Programmatically

::: demo

```html
<template>
  <section>
    <o-field>
      <o-datepicker ref="datepicker" expanded placeholder="Select a date"> </o-datepicker>
      <o-button @click="$refs.datepicker.toggle()" icon-left="calendar" type="primary" />
    </o-field>
  </section>
</template>

<script>
  export default {}
</script>
```

:::

### Footer slot

::: demo

```html
<template>
  <o-field label="Select a date">
    <o-datepicker v-model="date" :first-day-of-week="1" placeholder="Click to select...">
      <o-button variant="primary" @click="date = new Date()">
        <o-icon icon="calendar"></o-icon>
        <span>Today</span>
      </o-button>

      <o-button variant="danger" @click="date = null">
        <o-icon icon="times"></o-icon>
        <span>Clear</span>
      </o-button>
    </o-datepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date()
      }
    }
  }
</script>
```

:::

### Header slot

::: demo

```html
<template>
  <o-field label="Select a date">
    <o-datepicker :focused-date="date" :first-day-of-week="1" placeholder="Click to select...">
      <template slot="header">
        <o-field>
          <o-autocomplete open-on-focus readonly v-model="month" :data="months" field="name" @select="selectMonth"> </o-autocomplete>
          <o-button disabled>{{ date.getFullYear() }}</o-button>
        </o-field>
      </template>
    </o-datepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date(),
        month: null,
        months: [
          { name: 'January', value: 0 },
          { name: 'February', value: 1 },
          { name: 'March', value: 2 },
          { name: 'April', value: 3 },
          { name: 'May', value: 4 },
          { name: 'June', value: 5 },
          { name: 'July', value: 6 },
          { name: 'August', value: 7 },
          { name: 'September', value: 8 },
          { name: 'October', value: 9 },
          { name: 'November', value: 10 },
          { name: 'December', value: 11 }
        ]
      }
    },
    methods: {
      selectMonth(option) {
        if (option) {
          this.date = new Date(this.date)
          this.date.setMonth(option.value)
        }
      }
    },
    mounted() {
      this.month = this.months.filter(item => item.value == this.date.getMonth())[0].name
    }
  }
</script>
```

:::

### Events

::: demo

```html
<template>
  <span>
    <o-field>
      <o-switch v-model="bars">Bars</o-switch>
    </o-field>
    <o-datepicker inline v-model="date" :events="events" :indicators="indicators"> </o-datepicker>
  </span>
</template>

<script>
  const thisMonth = new Date().getMonth()

  export default {
    computed: {
      indicators() {
        return this.bars ? 'bars' : 'dots'
      }
    },
    data() {
      return {
        date: new Date(2017, thisMonth, 1),
        events: [
          new Date(2017, thisMonth, 2),
          new Date(2017, thisMonth, 6),
          {
            date: new Date(2017, thisMonth, 6),
            type: 'info'
          },
          {
            date: new Date(2017, thisMonth, 8),
            type: 'danger'
          },
          {
            date: new Date(2017, thisMonth, 10),
            type: 'success'
          },
          {
            date: new Date(2017, thisMonth, 10),
            type: 'link'
          },
          new Date(2017, thisMonth, 12),
          {
            date: new Date(2017, thisMonth, 12),
            type: 'warning'
          },
          {
            date: new Date(2017, thisMonth, 16),
            type: 'danger'
          },
          new Date(2017, thisMonth, 20),
          {
            date: new Date(2017, thisMonth, 29),
            type: 'success'
          },
          {
            date: new Date(2017, thisMonth, 29),
            type: 'warning'
          },
          {
            date: new Date(2017, thisMonth, 29),
            type: 'info'
          }
        ],
        bars: false
      }
    }
  }
</script>
```

:::

## Class props

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

| Prop name                 | Description                                                        | Type           | Values                                            | Default                                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------ | -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody              |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| ariaNextLabel             |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| ariaPreviousLabel         |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| autocomplete              | Native options to use in HTML5 validation                          | string         | -                                                 |                                                                                                                                                                                                                                                         |
| closeOnClick              |                                                                    | boolean        | -                                                 | true                                                                                                                                                                                                                                                    |
| dateCreator               |                                                                    | func           | -                                                 | () => {<br> const dateCreator = getValueByPath(config, 'datepicker.dateCreator', undefined)<br> if (typeof dateCreator === 'function') {<br> return dateCreator()<br> } else {<br> return new Date()<br> }<br>}                                         |
| dateFormatter             |                                                                    | func           | -                                                 | (date, vm) => {<br> const dateFormatter = getValueByPath(config, 'datepicker.dateFormatter', undefined)<br> if (typeof dateFormatter === 'function') {<br> return dateFormatter(date)<br> } else {<br> return defaultDateFormatter(date, vm)<br> }<br>} |
| dateParser                |                                                                    | func           | -                                                 | (date, vm) => {<br> const dateParser = getValueByPath(config, 'datepicker.dateParser', undefined)<br> if (typeof dateParser === 'function') {<br> return dateParser(date)<br> } else {<br> return defaultDateParser(date, vm)<br> }<br>}                |
| dayNames                  |                                                                    | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;dayNames: undefined<br>}</code>                                                                                                            |
| disabled                  |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| dropdownClasses           | Classes to apply on internal dropdown (@see o-dropdown style docs) | object         | -                                                 |                                                                                                                                                                                                                                                         |
| editable                  |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| events                    |                                                                    | array          | -                                                 |                                                                                                                                                                                                                                                         |
| expanded                  | Makes input full width when inside a grouped or addon field        | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| firstDayOfWeek            |                                                                    | number         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;firstDayOfWeek: 0<br>}</code>                                                                                                              |
| focusedDate               |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |
| horizontalTimePicker      |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| icon                      | Icon name to be added                                              | string         | -                                                 |                                                                                                                                                                                                                                                         |
| iconNext                  |                                                                    | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code>                                                                                                      |
| iconPack                  | Icon pack to use                                                   | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                                                                                                                         |
| iconPrev                  |                                                                    | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>                                                                                                       |
| iconRight                 |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| indicators                |                                                                    | string         | -                                                 | 'dots'                                                                                                                                                                                                                                                  |
| inline                    |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| inputClasses              | Classes to apply on internal input (@see o-input style docs)       | object         | -                                                 |                                                                                                                                                                                                                                                         |
| locale                    |                                                                    | string\|array  | -                                                 | () => {<br> return getValueByPath(config, 'locale')<br>}                                                                                                                                                                                                |
| maxDate                   |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |
| maxlength                 | Same as native maxlength, plus character counter                   | number\|string | -                                                 |                                                                                                                                                                                                                                                         |
| minDate                   |                                                                    | date           | -                                                 |                                                                                                                                                                                                                                                         |
| mobileBreakpoint          | Mobile breakpoint as max-width value                               | string         | -                                                 |                                                                                                                                                                                                                                                         |
| mobileModal               |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                                                                                                              |
| mobileNative              |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                                                                                                             |
| monthNames                |                                                                    | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;monthNames: undefined<br>}</code>                                                                                                          |
| multiple                  |                                                                    | boolean        | -                                                 | false                                                                                                                                                                                                                                                   |
| nearbyMonthDays           |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;nearbyMonthDays: true<br>}</code>                                                                                                          |
| nearbySelectableMonthDays |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;nearbySelectableMonthDays: false<br>}</code>                                                                                               |
| openOnFocus               |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| override                  |                                                                    | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| placeholder               |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| position                  |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| range                     |                                                                    | boolean        | -                                                 | false                                                                                                                                                                                                                                                   |
| rounded                   | Makes the element rounded                                          | boolean        | -                                                 |                                                                                                                                                                                                                                                         |
| rulesForFirstWeek         |                                                                    | number         | -                                                 | () => 4                                                                                                                                                                                                                                                 |
| selectableDates           |                                                                    | array          | -                                                 |                                                                                                                                                                                                                                                         |
| showWeekNumber            |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;showWeekNumber: false<br>}</code>                                                                                                          |
| size                      | Size of button, optional                                           | string         | `small`, `medium`, `large`                        |                                                                                                                                                                                                                                                         |
| statusIcon                | Show status icon using field and variant prop                      | boolean        | -                                                 | () => {<br> return getValueByPath(config, "statusIcon", true);<br>}                                                                                                                                                                                     |
| trapFocus                 |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                                                                                                                |
| type                      |                                                                    | string         | -                                                 |                                                                                                                                                                                                                                                         |
| unselectableDates         |                                                                    | array          | -                                                 |                                                                                                                                                                                                                                                         |
| unselectableDaysOfWeek    |                                                                    | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;unselectableDaysOfWeek: undefined<br>}</code>                                                                                              |
| useHtml5Validation        | Enable html 5 native validation                                    | boolean        | -                                                 | () => {<br> return getValueByPath(config, "useHtml5Validation", true);<br>}                                                                                                                                                                             |
| validationMessage         | The message which is shown when a validation error occurs          | string         | -                                                 |                                                                                                                                                                                                                                                         |
| value                     |                                                                    | date\|array    | -                                                 |                                                                                                                                                                                                                                                         |
| weekNumberClickable       |                                                                    | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;weekNumberClickable: false<br>}</code>                                                                                                     |
| yearsRange                |                                                                    | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker {<br>&nbsp;&nbsp;yearsRange: [-100<br>}</code>                                                                                                              |

## Events

| Event name   | Properties | Description |
| ------------ | ---------- | ----------- |
| range-start  |            |
| range-end    |            |
| blur         |            |
| focus        |            |
| input        |            |
| change-month |            |
| change-year  |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| header  |             |          |
| default |             |          |
