---
title: Datepicker
---

# Datepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-datepicker />

</div>
<div class="vp-example">

## Class props

<inspector-datepicker-viewer />

</div>

<div class="vp-doc">

## Datepicker Component

### Props

| Prop name                 | Description                                                 | Type           | Values                                            | Default                                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody              |                                                             | boolean        | -                                                 |                                                                                                                                                                         |
| ariaNextLabel             |                                                             | string         | -                                                 |                                                                                                                                                                         |
| ariaPreviousLabel         |                                                             | string         | -                                                 |                                                                                                                                                                         |
| autocomplete              | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                                                         |
| closeOnClick              |                                                             | boolean        | -                                                 | true                                                                                                                                                                    |
| dateCreator               |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                                      |
| dateFormatter             |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                                      |
| dateParser                |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                                      |
| dayNames                  |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;dayNames: undefined<br>}</code>               |
| disabled                  |                                                             | boolean        | -                                                 |                                                                                                                                                                         |
| editable                  |                                                             | boolean        | -                                                 |                                                                                                                                                                         |
| events                    |                                                             | array          | -                                                 |                                                                                                                                                                         |
| expanded                  | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                                                         |
| firstDayOfWeek            |                                                             | number         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;firstDayOfWeek: 0<br>}</code>                 |
| focusedDate               |                                                             | Date           | -                                                 |                                                                                                                                                                         |
| icon                      | Icon name to be added                                       | string         | -                                                 |                                                                                                                                                                         |
| iconNext                  |                                                             | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code>         |
| iconPack                  | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                                         |
| iconPrev                  |                                                             | string         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>          |
| iconRight                 |                                                             | string         | -                                                 |                                                                                                                                                                         |
| iconRightClickable        |                                                             | boolean        | -                                                 |                                                                                                                                                                         |
| indicators                |                                                             | string         | -                                                 | 'dots'                                                                                                                                                                  |
| inline                    |                                                             | boolean        | -                                                 |                                                                                                                                                                         |
| locale                    |                                                             | string\|array  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>                             |
| maxDate                   |                                                             | Date           | -                                                 |                                                                                                                                                                         |
| maxlength                 | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                                                         |
| minDate                   |                                                             | Date           | -                                                 |                                                                                                                                                                         |
| mobileBreakpoint          | Mobile breakpoint as max-width value                        | string         | -                                                 |                                                                                                                                                                         |
| mobileModal               |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                 |
| mobileNative              |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                |
| modelValue                |                                                             | date\|array    | -                                                 |                                                                                                                                                                         |
| monthNames                |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;monthNames: undefined<br>}</code>             |
| multiple                  |                                                             | boolean        | -                                                 | false                                                                                                                                                                   |
| nearbyMonthDays           |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbyMonthDays: true<br>}</code>             |
| nearbySelectableMonthDays |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;nearbySelectableMonthDays: false<br>}</code>  |
| openOnFocus               |                                                             | boolean        | -                                                 |                                                                                                                                                                         |
| override                  |                                                             | boolean        | -                                                 |                                                                                                                                                                         |
| placeholder               |                                                             | string         | -                                                 |                                                                                                                                                                         |
| position                  |                                                             | string         | -                                                 |                                                                                                                                                                         |
| range                     |                                                             | boolean        | -                                                 | false                                                                                                                                                                   |
| rounded                   | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                                                         |
| rulesForFirstWeek         |                                                             | number         | -                                                 | Default function (see source code)                                                                                                                                      |
| selectableDates           |                                                             | array\|func    | -                                                 |                                                                                                                                                                         |
| showWeekNumber            |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;showWeekNumber: false<br>}</code>             |
| size                      | Size of button, optional                                    | string         | `small`, `medium`, `large`                        |                                                                                                                                                                         |
| statusIcon                | Show status icon using field and variant prop               | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>                            |
| trapFocus                 |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                   |
| type                      |                                                             | string         | -                                                 |                                                                                                                                                                         |
| unselectableDates         |                                                             | array\|func    | -                                                 |                                                                                                                                                                         |
| unselectableDaysOfWeek    |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;unselectableDaysOfWeek: undefined<br>}</code> |
| useHtml5Validation        | Enable html 5 native validation                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>                    |
| validationMessage         | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                                                         |
| weekNumberClickable       |                                                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;weekNumberClickable: false<br>}</code>        |
| yearsRange                |                                                             | array          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> datepicker: {<br>&nbsp;&nbsp;yearsRange: [-100, 10]<br>}</code>            |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| icon-right-click  |            |
| range-start       |            |
| range-end         |            |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |
| change-month      |            |
| change-year       |            |
| active-change     |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| header  |             |          |
| table   |             |          |
| footer  |             |          |

</div>

<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $datepicker-font-size | $base-font-size !default |
| $datepicker-box-line-height | $base-line-height !default |
| $datepicker-box-padding | .375rem 1rem !default |
| $datepicker-header-padding | 0 0 0.875rem 0 !default |
| $datepicker-header-margin | 0 0 0.875rem 0 !default |
| $datepicker-header-border-bottom | 1px solid $grey-lighter !default |
| $datepicker-footer-padding | 0.875rem .5rem 0 .5rem !default |
| $datepicker-footer-margin | 0.875rem 0 0.875rem 0 !default |
| $datepicker-footer-border-top | 1px solid $grey-lighter !default |
| $datepicker-table-head-padding | 0 0 0.875rem 0 !default |
| $datepicker-table-head-margin | 0 0 0.875rem 0 !default |
| $datepicker-table-head-border-bottom | 1px solid $grey-lighter !default |
| $datepicker-table-head-item-color | $grey !default |
| $datepicker-table-head-item-font-weight | 600 !default |
| $datepicker-item-today-border | solid 1px rgba($primary, 0.5) !default |
| $datepicker-item-selectable-color | $grey-dark !default |
| $datepicker-item-disabled-color | $grey-light !default |
| $datepicker-item-border-radius | $base-border-radius !default |
| $datepicker-item-padding | 0.5rem 0.75rem !default |
| $datepicker-item-selected-color | $primary-invert !default |
| $datepicker-item-selected-background-color | $primary !default |
| $datepicker-item-selected-border-radius | 0 !default |
| $datepicker-item-selected-within-background-color | rgba($datepicker-item-selected-background-color, 0.5) !default |
| $datepicker-item-hovered-background-color | $grey !default |
| $datepicker-item-hovered-color | $grey-lighter !default |
| $datepicker-item-hovered-background-color | #f5f5f5 !default |
| $datepicker-item-hovered-within-background-color | rgba($datepicker-item-hovered-background-color, 0.5) !default |
| $datepicker-item-nearby-color | $grey-light !default |
| $datepicker-events-item-padding | .3rem .75rem .75rem !default |
| $datepicker-event-background-color | $grey-light !default |
| $datepicker-event-dots-size | .35em !default |
| $datepicker-event-dots-margin | 0 .1em !default |
| $datepicker-event-bars-height | .25em !default |
| $datepicker-btn-border-color | $grey-lighter !default |
| $datepicker-btn-border-radius | $base-border-radius !default |
| $datepicker-btn-border | 1px solid transparent !default |
| $datepicker-btn-color | #363636 !default |
| $datepicker-btn-height | 2.25em !default |
| $datepicker-btn-hover-border-color | $grey-light !default |
| $datepicker-btn-hover-color | #363636 !default |
| $datepicker-btn-line-height | $base-line-height !default |
| $datepicker-btn-margin | .25rem !default |
| $datepicker-btn-min-width | 2.25em !default |
| $datepicker-btn-padding | .5em .5em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datepicker.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $datepicker-font-size | $base-font-size !default |
| $datepicker-box-line-height | $base-line-height !default |
| $datepicker-box-padding | .375rem 1rem !default |
| $datepicker-header-padding | 0 0 0.875rem 0 !default |
| $datepicker-header-margin | 0 0 0.875rem 0 !default |
| $datepicker-header-border-bottom | 1px solid $grey-lighter !default |
| $datepicker-footer-padding | 0.875rem .5rem 0 .5rem !default |
| $datepicker-footer-margin | 0.875rem 0 0.875rem 0 !default |
| $datepicker-footer-border-top | 1px solid $grey-lighter !default |
| $datepicker-table-head-padding | 0 0 0.875rem 0 !default |
| $datepicker-table-head-margin | 0 0 0.875rem 0 !default |
| $datepicker-table-head-border-bottom | 1px solid $grey-lighter !default |
| $datepicker-table-head-item-color | $grey !default |
| $datepicker-table-head-item-font-weight | 600 !default |
| $datepicker-item-today-border | solid 1px rgba($primary, 0.5) !default |
| $datepicker-item-selectable-color | $grey-dark !default |
| $datepicker-item-disabled-color | $grey-light !default |
| $datepicker-item-border-radius | $base-border-radius !default |
| $datepicker-item-padding | 0.5rem 0.75rem !default |
| $datepicker-item-selected-color | $primary-invert !default |
| $datepicker-item-selected-background-color | $primary !default |
| $datepicker-item-selected-border-radius | 0 !default |
| $datepicker-item-selected-within-background-color | rgba($datepicker-item-selected-background-color, 0.5) !default |
| $datepicker-item-hovered-background-color | $grey !default |
| $datepicker-item-hovered-color | $grey-lighter !default |
| $datepicker-item-hovered-background-color | #f5f5f5 !default |
| $datepicker-item-hovered-within-background-color | rgba($datepicker-item-hovered-background-color, 0.5) !default |
| $datepicker-item-nearby-color | $grey-light !default |
| $datepicker-events-item-padding | .3rem .75rem .75rem !default |
| $datepicker-event-background-color | $grey-light !default |
| $datepicker-event-dots-size | .35em !default |
| $datepicker-event-dots-margin | 0 .1em !default |
| $datepicker-event-bars-height | .25em !default |
| $datepicker-btn-border-color | $grey-lighter !default |
| $datepicker-btn-border-radius | $base-border-radius !default |
| $datepicker-btn-border | 1px solid transparent !default |
| $datepicker-btn-color | #363636 !default |
| $datepicker-btn-height | 2.25em !default |
| $datepicker-btn-hover-border-color | $grey-light !default |
| $datepicker-btn-hover-color | #363636 !default |
| $datepicker-btn-line-height | $base-line-height !default |
| $datepicker-btn-margin | .25rem !default |
| $datepicker-btn-min-width | 2.25em !default |
| $datepicker-btn-padding | .5em .5em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datepicker.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $datepicker-background-color | white !default |
| $datepicker-cell-margin | 0.31rem !default |
| $datepicker-cell-padding | 0.31rem !default |
| /* or 0.5rem 0.75rem*/$datepicker-cell-width | calc(#{100%} / 7) !default |
| $datepicker-cell-font-weight | 400 !default |
| $datepicker-cell-text-align | center !default |
| $datepicker-cell-unselectable-color | rgba(0, 0, 0, 0.3) !default |
| $datepicker-cell-hovered-color | rgba(0, 0, 0, 0.5) !default |
| $datepicker-cell-selected-color | $primary !default |
| $datepicker-cell-border-radius | var(--#{$prefix}border-radius) !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_datepicker.scss)

</div>

</div>
