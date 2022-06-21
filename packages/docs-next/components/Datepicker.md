---
title: Datepicker
---

# Datepicker

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

> <CarbonAds />

---

## Examples

 <exampledatepicker />

## Class props

<br />

<inspectordatepicker />

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

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__datepicker.scss.scss)

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
