---
title: Datepicker
---

# Datepicker

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga-next/src/components/datepicker/examples/Datepicker.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

<ExampleViewer example="datepicker/base" />

### Min/Max date

<ExampleViewer example="datepicker/min-max-date" />

### Range

<ExampleViewer example="datepicker/range" />

### Multiple

<ExampleViewer example="datepicker/multiple" />

### Trigger

<ExampleViewer example="datepicker/trigger" />

### Programmatically

<ExampleViewer example="datepicker/programmatically" />

### Footer slot

<ExampleViewer example="datepicker/footer-slot" />

### Header slot

<ExampleViewer example="datepicker/header-slot" />

### Events

<ExampleViewer example="datepicker/events" />

### Month picker

<ExampleViewer example="datepicker/month-picker" />

## Class props

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datepicker.scss)

<br />

<br />
<br />

## Props

| Prop name                 | Description                                                 | Type           | Values                                            | Default                                                                                                                                                     |
| ------------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody              |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| ariaNextLabel             |                                                             | string         | -                                                 |                                                                                                                                                             |
| ariaPreviousLabel         |                                                             | string         | -                                                 |                                                                                                                                                             |
| autocomplete              | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                                             |
| closeOnClick              |                                                             | boolean        | -                                                 | true                                                                                                                                                        |
| dateCreator               |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dateFormatter             |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dateParser                |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                          |
| dayNames                  |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;dayNames: undefined<br>}</code>               |
| disabled                  |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| editable                  |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| events                    |                                                             | array          | -                                                 |                                                                                                                                                             |
| expanded                  | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                                             |
| firstDayOfWeek            |                                                             | number         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;firstDayOfWeek: 0<br>}</code>                 |
| focusedDate               |                                                             | Date           | -                                                 |                                                                                                                                                             |
| icon                      | Icon name to be added                                       | string         | -                                                 |                                                                                                                                                             |
| iconNext                  |                                                             | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code>         |
| iconPack                  | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                             |
| iconPrev                  |                                                             | string         | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>          |
| iconRight                 |                                                             | string         | -                                                 |                                                                                                                                                             |
| iconRightClickable        |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| indicators                |                                                             | string         | -                                                 | 'dots'                                                                                                                                                      |
| inline                    |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| locale                    |                                                             | string\|array  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>                             |
| maxDate                   |                                                             | Date           | -                                                 |                                                                                                                                                             |
| maxlength                 | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                                             |
| minDate                   |                                                             | Date           | -                                                 |                                                                                                                                                             |
| mobileBreakpoint          | Mobile breakpoint as max-width value                        | string         | -                                                 |                                                                                                                                                             |
| mobileModal               |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                 |
| mobileNative              |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                |
| modelValue                |                                                             | date\|array    | -                                                 |                                                                                                                                                             |
| monthNames                |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;monthNames: undefined<br>}</code>             |
| multiple                  |                                                             | boolean        | -                                                 | false                                                                                                                                                       |
| nearbyMonthDays           |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbyMonthDays: true<br>}</code>             |
| nearbySelectableMonthDays |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbySelectableMonthDays: false<br>}</code>  |
| openOnFocus               |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| override                  |                                                             | boolean        | -                                                 |                                                                                                                                                             |
| placeholder               |                                                             | string         | -                                                 |                                                                                                                                                             |
| position                  |                                                             | string         | -                                                 |                                                                                                                                                             |
| range                     |                                                             | boolean        | -                                                 | false                                                                                                                                                       |
| rounded                   | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                                             |
| rulesForFirstWeek         |                                                             | number         | -                                                 | Default function (see source code)                                                                                                                          |
| selectableDates           |                                                             | array          | -                                                 |                                                                                                                                                             |
| showWeekNumber            |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;showWeekNumber: false<br>}</code>             |
| size                      | Size of button, optional                                    | string         | `small`, `medium`, `large`                        |                                                                                                                                                             |
| statusIcon                | Show status icon using field and variant prop               | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                            |
| trapFocus                 |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                   |
| type                      |                                                             | string         | -                                                 |                                                                                                                                                             |
| unselectableDates         |                                                             | array          | -                                                 |                                                                                                                                                             |
| unselectableDaysOfWeek    |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;unselectableDaysOfWeek: undefined<br>}</code> |
| useHtml5Validation        | Enable html 5 native validation                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>                    |
| validationMessage         | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                                             |
| weekNumberClickable       |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;weekNumberClickable: false<br>}</code>        |
| yearsRange                |                                                             | array          | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;yearsRange: [-100, 10]<br>}</code>            |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| icon-right-click  |            |
| range-start       |            |
| range-end         |            |
| blur              |            |
| focus             |            |
| update:modelValue |            |
| change-month      |            |
| change-year       |            |
| active-change     |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| header  |             |          |
| table   |             |          |
| footer  |             |          |
