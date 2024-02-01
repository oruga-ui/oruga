---
title: Datepicker
---

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

| Prop name                 | Description                                                                                                                                                                      | Type                                   | Values                                            | Default                                                                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active                    | The active state of the dropdown, use v-model:active to make it two-way binding.                                                                                                 | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| ariaNextLabel             | Accessibility next button aria label                                                                                                                                             | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;ariaNextLabel: "Next Page"<br>}</code>        |
| ariaPreviousLabel         | Accessibility previous button aria label                                                                                                                                         | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;ariaNextLabel: "Previous Page"<br>}</code>    |
| closeOnClick              | Close dropdown on click                                                                                                                                                          | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;closeOnClick: true<br>}</code>                |
| dateCreator               | Date creator function, default is `new Date()`                                                                                                                                   | () =&gt; Date                          | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dateCreator: () => new Date()<br>}</code>     |
| dateFormatter             | Custom function to format a date into a string                                                                                                                                   | (date: Date \| Date[]) =&gt; string    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dateFormatter: defaultFunction<br>}</code>    |
| dateParser                | Custom function to parse a string into a date                                                                                                                                    | (date: string) =&gt; Date              | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dateParser: defaultFunction<br>}</code>       |
| dayNames                  | Set custom day names, else use names based on locale                                                                                                                             | string[]                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;dayNames: undefined<br>}</code>               |
| disabled                  | Same as native disabled                                                                                                                                                          | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| events                    | Events to display on picker                                                                                                                                                      | DatepickerEvent[]                      | -                                                 |                                                                                                                                                                        |
| expanded                  | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| firstDayOfWeek            | Set the first day of a week                                                                                                                                                      | number                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;firstDayOfWeek: 0<br>}</code>                 |
| focusedDate               | Set default date to focus on                                                                                                                                                     | date                                   | -                                                 |                                                                                                                                                                        |
| icon                      | Icon to be shown                                                                                                                                                                 | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>                   |
| iconNext                  | Icon name for next icon                                                                                                                                                          | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>         |
| iconPack                  | Icon pack to use                                                                                                                                                                 | string                                 | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>               |
| iconPrev                  | Icon name for previous icon                                                                                                                                                      | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>          |
| iconRight                 | Icon to be added on the right side                                                                                                                                               | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>              |
| iconRightClickable        | Make the icon right clickable                                                                                                                                                    | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| indicators                | Event indicators for style class definiton                                                                                                                                       | string                                 | -                                                 | <code style='white-space: nowrap; padding: 0;'>"dots"</code>                                                                                                           |
| inline                    | Display datepicker inline                                                                                                                                                        | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| locale                    | Date format locale                                                                                                                                                               | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>                             |
| maxDate                   | Max date to select                                                                                                                                                               | date                                   | -                                                 |                                                                                                                                                                        |
| minDate                   | Min date to select                                                                                                                                                               | date                                   | -                                                 |                                                                                                                                                                        |
| mobileBreakpoint          | Mobile breakpoint as max-width value                                                                                                                                             | string                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code>       |
| mobileModal               | Enable dropdown mobile modal                                                                                                                                                     | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>                 |
| mobileNative              | Enable mobile native input if mobile agent                                                                                                                                       | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>                |
| monthNames                | Set custom month names, else use names based on locale                                                                                                                           | string[]                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;monthNames: undefined<br>}</code>             |
| multiple                  | Same as native, also push new item to v-model instead of replacing                                                                                                               | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| nearbyMonthDays           | Show nearby month days                                                                                                                                                           | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;nearbyMonthDays: true<br>}</code>             |
| nearbySelectableMonthDays | Define if nearby month days can be selected                                                                                                                                      | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;nearbySelectableMonthDays: false<br>}</code>  |
| openOnFocus               | Open dropdown on focus                                                                                                                                                           | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;openOnFocus: true<br>}</code>                 |
| placeholder               | Input placeholder                                                                                                                                                                | string                                 | -                                                 |                                                                                                                                                                        |
| position                  | Position of the dropdown relative to the input                                                                                                                                   | string                                 | -                                                 |                                                                                                                                                                        |
| range                     | Enable date range selection                                                                                                                                                      | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| readonly                  | Same as native input readonly                                                                                                                                                    | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                             |
| rounded                   | Makes the input rounded                                                                                                                                                          | boolean                                | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                            |
| rulesForFirstWeek         | Rules for the first week : 1 for the 1st January, 4 for the 4th January                                                                                                          | number                                 | -                                                 | Default function (see source code)                                                                                                                                     |
| selectableDates           | Define a list of dates which can be selected                                                                                                                                     | Date[] \| ((date: Date) =&gt; boolean) | -                                                 | Default function (see source code)                                                                                                                                     |
| showWeekNumber            | Show weeek numbers                                                                                                                                                               | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;showWeekNumber: false<br>}</code>             |
| size                      | Size of the control input                                                                                                                                                        | string                                 | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;size: undefined<br>}</code>                   |
| teleport                  | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean\|string\|object                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;teleport: false<br>}</code>                   |
| trapFocus                 | Trap dropdown on focus                                                                                                                                                           | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;trapFocus: true<br>}</code>                   |
| type                      | Define picker mode                                                                                                                                                               | string                                 | `date`, `month`                                   | <code style='white-space: nowrap; padding: 0;'>"date"</code>                                                                                                           |
| unselectableDates         | Define a list of dates which can not be selected                                                                                                                                 | Date[] \| ((date: Date) =&gt; boolean) | -                                                 | Default function (see source code)                                                                                                                                     |
| unselectableDaysOfWeek    | Define a list of weeks which can not be selected                                                                                                                                 | number[]                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;unselectableDaysOfWeek: undefined<br>}</code> |
| useHtml5Validation        | Enable html 5 native validation                                                                                                                                                  | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                      |
| v-model                   |                                                                                                                                                                                  | Date \| Date[]                         | -                                                 |                                                                                                                                                                        |
| validationMessage         | The message which is shown when a validation error occurs                                                                                                                        | string                                 | -                                                 |                                                                                                                                                                        |
| weekNumberClickable       | Define if weeek numbers are clickable                                                                                                                                            | boolean                                | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;weekNumberClickable: false<br>}</code>        |
| yearsRange                | Define the range of years to show                                                                                                                                                | number[]                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>datepicker: {<br>&nbsp;&nbsp;yearsRange: [-100,10]<br>}</code>             |

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

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                                     | Default                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| $datepicker-font-size                             | $base-font-size                                        |
| $datepicker-box-line-height                       | $base-line-height                                      |
| $datepicker-box-padding                           | 0.375rem 1rem                                          |
| $datepicker-header-padding                        | 0 0 0.875rem 0                                         |
| $datepicker-header-margin                         | 0 0 0.875rem 0                                         |
| $datepicker-header-border-bottom                  | 1px solid $grey-lighter                                |
| $datepicker-footer-padding                        | 0.875rem 0.5rem 0 0.5rem                               |
| $datepicker-footer-margin                         | 0.875rem 0 0.875rem 0                                  |
| $datepicker-footer-border-top                     | 1px solid $grey-lighter                                |
| $datepicker-table-head-padding                    | 0 0 0.875rem 0                                         |
| $datepicker-table-head-margin                     | 0 0 0.875rem 0                                         |
| $datepicker-table-head-border-bottom              | 1px solid $grey-lighter                                |
| $datepicker-table-head-item-color                 | $grey                                                  |
| $datepicker-table-head-item-font-weight           | 600                                                    |
| $datepicker-item-today-border                     | solid 1px rgba($primary, 0.5)                          |
| $datepicker-item-selectable-color                 | $grey-dark                                             |
| $datepicker-item-disabled-color                   | $grey-light                                            |
| $datepicker-item-border-radius                    | $base-border-radius                                    |
| $datepicker-item-padding                          | 0.5rem 0.75rem                                         |
| $datepicker-item-selected-color                   | $primary-invert                                        |
| $datepicker-item-selected-background-color        | $primary                                               |
| $datepicker-item-selected-border-radius           | 0                                                      |
| $datepicker-item-selected-within-background-color | rgba( $datepicker-item-selected-background-color, 0.5) |
| $datepicker-item-hovered-background-color         | $grey                                                  |
| $datepicker-item-hovered-color                    | $grey-lighter                                          |
| $datepicker-item-hovered-background-color         | #f5f5f5                                                |
| $datepicker-item-hovered-within-background-color  | rgba( $datepicker-item-hovered-background-color, 0.5)  |
| $datepicker-item-nearby-color                     | $grey-light                                            |
| $datepicker-events-item-padding                   | 0.3rem 0.75rem 0.75rem                                 |
| $datepicker-event-background-color                | $grey-light                                            |
| $datepicker-event-dots-size                       | 0.35em                                                 |
| $datepicker-event-dots-margin                     | 0 0.1em                                                |
| $datepicker-event-bars-height                     | 0.25em                                                 |
| $datepicker-btn-border-color                      | $grey-lighter                                          |
| $datepicker-btn-border-radius                     | $base-border-radius                                    |
| $datepicker-btn-border                            | 1px solid transparent                                  |
| $datepicker-btn-color                             | #363636                                                |
| $datepicker-btn-height                            | 2.25em                                                 |
| $datepicker-btn-hover-border-color                | $grey-light                                            |
| $datepicker-btn-hover-color                       | #363636                                                |
| $datepicker-btn-line-height                       | $base-line-height                                      |
| $datepicker-btn-margin                            | 0.25rem                                                |
| $datepicker-btn-min-width                         | 2.25em                                                 |
| $datepicker-btn-padding                           | 0.5em 0.5em                                            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_datepicker.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                                     | Default                                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| $datepicker-font-size                             | $base-font-size                                        |
| $datepicker-box-line-height                       | $base-line-height                                      |
| $datepicker-box-padding                           | 0.375rem 1rem                                          |
| $datepicker-header-padding                        | 0 0 0.875rem 0                                         |
| $datepicker-header-margin                         | 0 0 0.875rem 0                                         |
| $datepicker-header-border-bottom                  | 1px solid $grey-lighter                                |
| $datepicker-footer-padding                        | 0.875rem 0.5rem 0 0.5rem                               |
| $datepicker-footer-margin                         | 0.875rem 0 0.875rem 0                                  |
| $datepicker-footer-border-top                     | 1px solid $grey-lighter                                |
| $datepicker-table-head-padding                    | 0 0 0.875rem 0                                         |
| $datepicker-table-head-margin                     | 0 0 0.875rem 0                                         |
| $datepicker-table-head-border-bottom              | 1px solid $grey-lighter                                |
| $datepicker-table-head-item-color                 | $grey                                                  |
| $datepicker-table-head-item-font-weight           | 600                                                    |
| $datepicker-item-today-border                     | solid 1px rgba($primary, 0.5)                          |
| $datepicker-item-selectable-color                 | $grey-dark                                             |
| $datepicker-item-disabled-color                   | $grey-light                                            |
| $datepicker-item-border-radius                    | $base-border-radius                                    |
| $datepicker-item-padding                          | 0.5rem 0.75rem                                         |
| $datepicker-item-selected-color                   | $primary-invert                                        |
| $datepicker-item-selected-background-color        | $primary                                               |
| $datepicker-item-selected-border-radius           | 0                                                      |
| $datepicker-item-selected-within-background-color | rgba( $datepicker-item-selected-background-color, 0.5) |
| $datepicker-item-hovered-background-color         | $grey                                                  |
| $datepicker-item-hovered-color                    | $grey-lighter                                          |
| $datepicker-item-hovered-background-color         | #f5f5f5                                                |
| $datepicker-item-hovered-within-background-color  | rgba( $datepicker-item-hovered-background-color, 0.5)  |
| $datepicker-item-nearby-color                     | $grey-light                                            |
| $datepicker-events-item-padding                   | 0.3rem 0.75rem 0.75rem                                 |
| $datepicker-event-background-color                | $grey-light                                            |
| $datepicker-event-dots-size                       | 0.35em                                                 |
| $datepicker-event-dots-margin                     | 0 0.1em                                                |
| $datepicker-event-bars-height                     | 0.25em                                                 |
| $datepicker-btn-border-color                      | $grey-lighter                                          |
| $datepicker-btn-border-radius                     | $base-border-radius                                    |
| $datepicker-btn-border                            | 1px solid transparent                                  |
| $datepicker-btn-color                             | #363636                                                |
| $datepicker-btn-height                            | 2.25em                                                 |
| $datepicker-btn-hover-border-color                | $grey-light                                            |
| $datepicker-btn-hover-color                       | #363636                                                |
| $datepicker-btn-line-height                       | $base-line-height                                      |
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
