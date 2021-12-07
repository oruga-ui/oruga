---
title: Datepicker
---

# Datepicker

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

> <CarbonAds />

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

### Month picker

::: demo

```html
<template>
  <o-field label="Select a month">
    <o-datepicker placeholder="Click to select..." icon="calendar" type="month" v-model="dates"> </o-datepicker>
  </o-field>
</template>

<script>
  export default {
    data() {
      return {
        dates: undefined
      }
    }
  }
</script>
```

:::

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datepicker.scss)

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
                    specificity: "when <b>mobileClass</b> is applied",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "nextBtnClass",
                    description: "Class of the next button inside the Datepicker box",
                    specificity: "when <b>mobileClass</b> is applied",
                    action: () => {
                        this.openDatePicker();
                    }
                },
                {
                    class: "listsClass",
                    description: "Class of the month and year selects container inside the Datepicker box",
                    specificity: "when <b>mobileClass</b> is applied",
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

| Prop name                 | Description                                                            | Type           | Values                                            | Default                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------- | -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody              |                                                                        | boolean        | -                                                 |                                                                                                                                                             |
| ariaNextLabel             |                                                                        | string         | -                                                 |                                                                                                                                                             |
| ariaPreviousLabel         |                                                                        | string         | -                                                 |                                                                                                                                                             |
| autocomplete              | Native options to use in HTML5 validation                              | string         | -                                                 |                                                                                                                                                             |
| closeOnClick              |                                                                        | boolean        | -                                                 | true                                                                                                                                                        |
| dateCreator               |                                                                        | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dateFormatter             |                                                                        | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dateParser                |                                                                        | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dayNames                  |                                                                        | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;dayNames: undefined<br>}</code>               |
| disabled                  |                                                                        | boolean        | -                                                 |                                                                                                                                                             |
| editable                  |                                                                        | boolean        | -                                                 |                                                                                                                                                             |
| events                    |                                                                        | array          | -                                                 |                                                                                                                                                             |
| expanded                  | Makes input full width when inside a grouped or addon field            | boolean        | -                                                 |                                                                                                                                                             |
| firstDayOfWeek            | First day of week to display in table header (getDay() of Date Object) | number         | `0`, `1`, `2`, `3`, `4`, `5`, `6`                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;firstDayOfWeek: 0<br>}</code>                 |
| focusedDate               |                                                                        | date           | -                                                 |                                                                                                                                                             |
| icon                      | Icon name to be added                                                  | string         | -                                                 |                                                                                                                                                             |
| iconNext                  |                                                                        | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code>         |
| iconPack                  | Icon pack to use                                                       | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                             |
| iconPrev                  |                                                                        | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>          |
| iconRight                 | Icon name to be added on the right side                                | string         | -                                                 |                                                                                                                                                             |
| iconRightClickable        | Make the icon right clickable                                          | boolean        | -                                                 |                                                                                                                                                             |
| indicators                |                                                                        | string         | -                                                 | 'dots'                                                                                                                                                      |
| inline                    |                                                                        | boolean        | -                                                 |                                                                                                                                                             |
| locale                    |                                                                        | string\|array  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>                             |
| maxDate                   |                                                                        | date           | -                                                 |                                                                                                                                                             |
| maxlength                 | Same as native maxlength, plus character counter                       | number\|string | -                                                 |                                                                                                                                                             |
| minDate                   |                                                                        | date           | -                                                 |                                                                                                                                                             |
| mobileBreakpoint          | Mobile breakpoint as max-width value                                   | string         | -                                                 |                                                                                                                                                             |
| mobileModal               |                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                 |
| mobileNative              |                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                |
| monthNames                |                                                                        | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;monthNames: undefined<br>}</code>             |
| multiple                  |                                                                        | boolean        | -                                                 | false                                                                                                                                                       |
| nearbyMonthDays           |                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbyMonthDays: true<br>}</code>             |
| nearbySelectableMonthDays |                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbySelectableMonthDays: false<br>}</code>  |
| openOnFocus               |                                                                        | boolean        | -                                                 |                                                                                                                                                             |
| override                  | Override classes                                                       | boolean        | -                                                 | false                                                                                                                                                       |
| placeholder               |                                                                        | string         | -                                                 |                                                                                                                                                             |
| position                  | Optional, position of the datepicker relative to the input             | string         | `top-right`, `top-left`, `bottom-left`            |                                                                                                                                                             |
| range                     |                                                                        | boolean        | -                                                 | false                                                                                                                                                       |
| rounded                   | Makes the element rounded                                              | boolean        | -                                                 |                                                                                                                                                             |
| rulesForFirstWeek         |                                                                        | number         | -                                                 | Default function (see source code)                                                                                                                          |
| selectableDates           |                                                                        | array          | -                                                 |                                                                                                                                                             |
| showWeekNumber            |                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;showWeekNumber: false<br>}</code>             |
| size                      | Size of button, optional                                               | string         | `small`, `medium`, `large`                        |                                                                                                                                                             |
| statusIcon                | Show status icon using field and variant prop                          | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                            |
| trapFocus                 |                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                   |
| type                      |                                                                        | string         | -                                                 |                                                                                                                                                             |
| unselectableDates         |                                                                        | array          | -                                                 |                                                                                                                                                             |
| unselectableDaysOfWeek    |                                                                        | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;unselectableDaysOfWeek: undefined<br>}</code> |
| useHtml5Validation        | Enable html 5 native validation                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>                    |
| v-model                   |                                                                        | date\|array    | -                                                 |                                                                                                                                                             |
| validationMessage         | The message which is shown when a validation error occurs              | string         | -                                                 |                                                                                                                                                             |
| weekNumberClickable       |                                                                        | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;weekNumberClickable: false<br>}</code>        |
| yearsRange                |                                                                        | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;yearsRange: [-100, 10]<br>}</code>            |

## Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| icon-right-click |            |
| range-start      |            |
| range-end        |            |
| blur             |            |
| focus            |            |
| input            |            |
| change-month     |            |
| change-year      |            |
| active-change    |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| header  |             |          |
| default |             |          |

## Style

| CSS Variable                                             | SASS Variable                                      | Default                                                |
| -------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| --oruga-datepicker-font-size                             | \$datepicker-font-size                             | \$base-font-size                                       |
| --oruga-datepicker-box-line-height                       | \$datepicker-box-line-height                       | \$base-line-height                                     |
| --oruga-datepicker-box-padding                           | \$datepicker-box-padding                           | .375rem 1rem                                           |
| --oruga-datepicker-header-padding                        | \$datepicker-header-padding                        | 0 0 0.875rem 0                                         |
| --oruga-datepicker-header-margin                         | \$datepicker-header-margin                         | 0 0 0.875rem 0                                         |
| --oruga-datepicker-header-border-bottom                  | \$datepicker-header-border-bottom                  | 1px solid \$grey-lighter                               |
| --oruga-datepicker-footer-padding                        | \$datepicker-footer-padding                        | 0.875rem .5rem 0 .5rem                                 |
| --oruga-datepicker-footer-margin                         | \$datepicker-footer-margin                         | 0.875rem 0 0.875rem 0                                  |
| --oruga-datepicker-footer-border-top                     | \$datepicker-footer-border-top                     | 1px solid \$grey-lighter                               |
| --oruga-datepicker-table-head-padding                    | \$datepicker-table-head-padding                    | 0 0 0.875rem 0                                         |
| --oruga-datepicker-table-head-margin                     | \$datepicker-table-head-margin                     | 0 0 0.875rem 0                                         |
| --oruga-datepicker-table-head-border-bottom              | \$datepicker-table-head-border-bottom              | 1px solid \$grey-lighter                               |
| --oruga-datepicker-table-head-item-color                 | \$datepicker-table-head-item-color                 | \$grey                                                 |
| --oruga-datepicker-table-head-item-font-weight           | \$datepicker-table-head-item-font-weight           | 600                                                    |
| --oruga-datepicker-item-today-border                     | \$datepicker-item-today-border                     | solid 1px rgba(\$primary, 0.5)                         |
| --oruga-datepicker-item-selectable-color                 | \$datepicker-item-selectable-color                 | \$grey-dark                                            |
| --oruga-datepicker-item-disabled-color                   | \$datepicker-item-disabled-color                   | \$grey-light                                           |
| --oruga-datepicker-item-border-radius                    | \$datepicker-item-border-radius                    | \$base-border-radius                                   |
| --oruga-datepicker-item-padding                          | \$datepicker-item-padding                          | 0.5rem 0.75rem                                         |
| --oruga-datepicker-item-selected-color                   | \$datepicker-item-selected-color                   | \$primary-invert                                       |
| --oruga-datepicker-item-selected-background-color        | \$datepicker-item-selected-background-color        | \$primary                                              |
| --oruga-datepicker-item-selected-border-radius           | \$datepicker-item-selected-border-radius           | 0                                                      |
| --oruga-datepicker-item-selected-within-background-color | \$datepicker-item-selected-within-background-color | rgba(\$datepicker-item-selected-background-color, 0.5) |
| --oruga-datepicker-item-hovered-background-color         | \$datepicker-item-hovered-background-color         | \$grey                                                 |
| --oruga-datepicker-item-hovered-color                    | \$datepicker-item-hovered-color                    | \$grey-lighter                                         |
| --oruga-datepicker-item-hovered-background-color         | \$datepicker-item-hovered-background-color         | #f5f5f5                                                |
| --oruga-datepicker-item-hovered-within-background-color  | \$datepicker-item-hovered-within-background-color  | rgba(\$datepicker-item-hovered-background-color, 0.5)  |
| --oruga-datepicker-item-nearby-color                     | \$datepicker-item-nearby-color                     | \$grey-light                                           |
| --oruga-datepicker-events-item-padding                   | \$datepicker-events-item-padding                   | .3rem .75rem .75rem                                    |
| --oruga-datepicker-event-background-color                | \$datepicker-event-background-color                | \$grey-light                                           |
| --oruga-datepicker-event-dots-size                       | \$datepicker-event-dots-size                       | .35em                                                  |
| --oruga-datepicker-event-dots-margin                     | \$datepicker-event-dots-margin                     | 0 .1em                                                 |
| --oruga-datepicker-event-bars-height                     | \$datepicker-event-bars-height                     | .25em                                                  |
| --oruga-datepicker-btn-border-color                      | \$datepicker-btn-border-color                      | \$grey-lighter                                         |
| --oruga-datepicker-btn-border-radius                     | \$datepicker-btn-border-radius                     | \$base-border-radius                                   |
| --oruga-datepicker-btn-border                            | \$datepicker-btn-border                            | 1px solid transparent                                  |
| --oruga-datepicker-btn-color                             | \$datepicker-btn-color                             | #363636                                                |
| --oruga-datepicker-btn-height                            | \$datepicker-btn-height                            | 2.25em                                                 |
| --oruga-datepicker-btn-hover-border-color                | \$datepicker-btn-hover-border-color                | \$grey-light                                           |
| --oruga-datepicker-btn-hover-color                       | \$datepicker-btn-hover-color                       | #363636                                                |
| --oruga-datepicker-btn-line-height                       | \$datepicker-btn-line-height                       | \$base-line-height                                     |
| --oruga-datepicker-btn-margin                            | \$datepicker-btn-margin                            | .25rem                                                 |
| --oruga-datepicker-btn-min-width                         | \$datepicker-btn-min-width                         | 2.25em                                                 |
| --oruga-datepicker-btn-padding                           | \$datepicker-btn-padding                           | .5em .5em                                              |
