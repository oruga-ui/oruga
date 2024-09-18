# Datepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

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

## Datepicker component

> An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile

```html
<o-datepicker></o-datepicker>
```

### Props

| Prop name                 | Description | Type | Values | Default                                                                                                                                                                |
| ------------------------- | ----------- | ---- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active                    |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| ariaNextLabel             |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;ariaNextLabel: "Next Page"<br>}</code>        |
| ariaPreviousLabel         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;ariaNextLabel: "Previous Page"<br>}</code>    |
| closeOnClick              |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;closeOnClick: true<br>}</code>                |
| customValidity            |             |      | -      | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                               |
| dateCreator               |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dateCreator: () => new Date()<br>}</code>     |
| dateFormatter             |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dateFormatter: () => undefined, <br>}</code>  |
| dateParser                |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dateParser: () => undefined, <br>}</code>     |
| dayNames                  |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dayNames: undefined<br>}</code>               |
| disabled                  |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| events                    |             |      | -      |                                                                                                                                                                        |
| expanded                  |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| firstDayOfWeek            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;firstDayOfWeek: 0<br>}</code>                 |
| focusedDate               |             |      | -      |                                                                                                                                                                        |
| icon                      |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>                   |
| iconNext                  |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>         |
| iconPack                  |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>               |
| iconPrev                  |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>          |
| iconRight                 |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>              |
| iconRightClickable        |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| indicators                |             |      | -      | <code style='white-space: nowrap; padding: 0;'>"dots"</code>                                                                                                           |
| inline                    |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| locale                    |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>                             |
| maxDate                   |             |      | -      |                                                                                                                                                                        |
| minDate                   |             |      | -      |                                                                                                                                                                        |
| mobileBreakpoint          |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>       |
| mobileModal               |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                 |
| mobileNative              |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;mobileNative: false<br>}</code>               |
| v-model                   |             |      | -      | <code style='white-space: nowrap; padding: 0;'>null</code>                                                                                                             |
| monthNames                |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;monthNames: undefined<br>}</code>             |
| nearbyMonthDays           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;nearbyMonthDays: true<br>}</code>             |
| nearbySelectableMonthDays |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;nearbySelectableMonthDays: false<br>}</code>  |
| openOnFocus               |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;openOnFocus: true<br>}</code>                 |
| override                  |             |      | -      |                                                                                                                                                                        |
| placeholder               |             |      | -      |                                                                                                                                                                        |
| position                  |             |      | -      |                                                                                                                                                                        |
| readonly                  |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| rounded                   |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| rulesForFirstWeek         |             |      | -      | <code style='white-space: nowrap; padding: 0;'>4</code>                                                                                                                |
| selectableDates           |             |      | -      |                                                                                                                                                                        |
| showWeekNumber            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;showWeekNumber: false<br>}</code>             |
| size                      |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                   |
| teleport                  |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                   |
| trapFocus                 |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                   |
| type                      |             |      | -      | <code style='white-space: nowrap; padding: 0;'>"date"</code>                                                                                                           |
| unselectableDates         |             |      | -      |                                                                                                                                                                        |
| unselectableDaysOfWeek    |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;unselectableDaysOfWeek: undefined<br>}</code> |
| useHtml5Validation        |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                      |
| weekNumberClickable       |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;weekNumberClickable: false<br>}</code>        |
| yearsRange                |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;yearsRange: [-100,10]<br>}</code>             |

### Events

| Event name        | Properties                                           | Description                      |
| ----------------- | ---------------------------------------------------- | -------------------------------- |
| focus             | **event** `Event` - native event                     | on input focus event             |
| blur              | **event** `Event` - native event                     | on input blur event              |
| invalid           | **event** `Event` - native event                     | on input invalid event           |
| icon-click        | **event** `Event` - native event                     | on icon click event              |
| icon-right-click  | **event** `Event` - native event                     | on icon right click event        |
| range-start       | **value** `Date` - range start date                  | on range start is selected event |
| range-end         | **value** `Date` - range end date                    | on range end is selected event   |
| update:modelValue | **value** `Date \| Date[]` - updated modelValue prop | modelValue prop two-way binding  |
| update:active     | **value** `boolean` - updated active prop            | active prop two-way binding      |
| change-month      | **value** `number` - month number                    | on month change event            |
| change-year       | **value** `number` - year number                     | on year change event             |

### Slots

| Name    | Description                 | Bindings |
| ------- | --------------------------- | -------- |
| trigger | Override the trigger        |          |
| header  | Override the header         |          |
| body    | Override the body           |          |
| footer  | Define an additional footer |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                                     | Default                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| $datepicker-font-size                             | var(--#{$prefix}base-font-size)                        |
| $datepicker-box-line-height                       | var(--#{$prefix}base-line-height)                      |
| $datepicker-box-padding                           | 0.375rem 1rem                                          |
| $datepicker-header-padding                        | 0 0 0.875rem 0                                         |
| $datepicker-header-margin                         | 0 0 0.875rem 0                                         |
| $datepicker-header-border-bottom                  | 1px solid var(--#{$prefix}grey-lighter)                |
| $datepicker-footer-padding                        | 0.875rem 0.5rem 0 0.5rem                               |
| $datepicker-footer-margin                         | 0.875rem 0 0.875rem 0                                  |
| $datepicker-footer-border-top                     | 1px solid var(--#{$prefix}grey-lighter)                |
| $datepicker-table-head-padding                    | 0 0 0.875rem 0                                         |
| $datepicker-table-head-margin                     | 0 0 0.875rem 0                                         |
| $datepicker-table-head-border-bottom              | 1px solid var(--#{$prefix}grey-lighter)                |
| $datepicker-table-head-item-color                 | var(--#{$prefix}grey)                                  |
| $datepicker-table-head-item-font-weight           | 600                                                    |
| $datepicker-item-today-border                     | solid 1px rgba(var(--#{$prefix}primary), 0.5)          |
| $datepicker-item-selectable-color                 | var(--#{$prefix}grey-dark)                             |
| $datepicker-item-disabled-color                   | var(--#{$prefix}grey-light)                            |
| $datepicker-item-border-radius                    | var(--#{$prefix}base-border-radius)                    |
| $datepicker-item-padding                          | 0.5rem 0.75rem                                         |
| $datepicker-item-selected-color                   | var(--#{$prefix}primary-invert)                        |
| $datepicker-item-selected-background-color        | var(--#{$prefix}primary)                               |
| $datepicker-item-selected-border-radius           | 0                                                      |
| $datepicker-item-selected-within-background-color | rgba( $datepicker-item-selected-background-color, 0.5) |
| $datepicker-item-hovered-background-color         | var(--#{$prefix}grey)                                  |
| $datepicker-item-hovered-color                    | var(--#{$prefix}grey-lighter)                          |
| $datepicker-item-hovered-background-color         | #f5f5f5                                                |
| $datepicker-item-hovered-within-background-color  | rgba( $datepicker-item-hovered-background-color, 0.5)  |
| $datepicker-item-nearby-color                     | var(--#{$prefix}grey-light)                            |
| $datepicker-events-item-padding                   | 0.3rem 0.75rem 0.75rem                                 |
| $datepicker-event-background-color                | var(--#{$prefix}grey-light)                            |
| $datepicker-event-dots-size                       | 0.35em                                                 |
| $datepicker-event-dots-margin                     | 0 0.1em                                                |
| $datepicker-event-bars-height                     | 0.25em                                                 |
| $datepicker-btn-border-color                      | var(--#{$prefix}grey-lighter)                          |
| $datepicker-btn-border-radius                     | var(--#{$prefix}base-border-radius)                    |
| $datepicker-btn-border                            | 1px solid transparent                                  |
| $datepicker-btn-color                             | #363636                                                |
| $datepicker-btn-height                            | 2.25em                                                 |
| $datepicker-btn-hover-border-color                | var(--#{$prefix}grey-light)                            |
| $datepicker-btn-hover-color                       | #363636                                                |
| $datepicker-btn-line-height                       | var(--#{$prefix}base-line-height)                      |
| $datepicker-btn-margin                            | 0.25rem                                                |
| $datepicker-btn-min-width                         | 2.25em                                                 |
| $datepicker-btn-padding                           | 0.5em 0.5em                                            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_datepicker.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                   | Default                                 |
| ------------------------------- | --------------------------------------- |
| $datepicker-background-color    | var(--#{$prefix}body-bg)                |
| $datepicker-pagination-spacer   | calc($spacer \* 0.5)                    |
| $datepicker-section-spacer      | calc($spacer \* 0.75)                   |
| $datepicker-section-border      | 1px solid var(--#{$prefix}border-color) |
| $datepicker-cell-padding        | 0.5rem 0.75rem                          |
| $datepicker-cell-width          | calc(#{100%} / 7)                       |
| $datepicker-cell-border-radius  | var(--#{$prefix}border-radius)          |
| $datepicker-cell-font-weight    | 400                                     |
| $datepicker-cell-color          | var(--#{$prefix}black)                  |
| $datepicker-cell-hovered-color  | var(--#{$prefix}secondary)              |
| $datepicker-cell-selected-color | var(--#{$prefix}primary)                |
| $datepicker-month-width         | 20rem                                   |
| $datepicker-month-cell-spacer   | calc($spacer \* 0.5)                    |
| $datepicker-month-cell-height   | 2.5rem                                  |
| $datepicker-dropdown-width      | calc(100vw - 40px)                      |
| $datepicker-dropdown-max-width  | 460px                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_datepicker.scss)

</div>

</div>
