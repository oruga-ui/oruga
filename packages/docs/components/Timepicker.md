# Timepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile

</div>

<div class="vp-example">

## Examples

<example-timepicker />

</div>

<div class="vp-example">

## Class props

<inspector-timepicker-viewer />

</div>

<div class="vp-doc">

## Timepicker component

> An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile

```html
<o-timepicker></o-timepicker>
```

### Props

| Prop name             | Description                                                                                                                                                                      | Type                                                                                      | Values                                            | Default                                                                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active                | The active state of the dropdown                                                                                                                                                 | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| closeOnClick          | Close dropdown on click                                                                                                                                                          | boolean                                                                                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;closeOnClick: true<br>}</code>          |
| creator               | time creator function, default is `new Date()`                                                                                                                                   | (() =&gt; Date)                                                                           | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;creator: undefined<br>}</code>          |
| customValidity        | Custom HTML 5 validation error to set on the form control                                                                                                                        | string \| ((currentValue: Date \| null , state: ValidityState) =&gt; string) \| undefined | -                                                 | <code style='white-space: nowrap; padding: 0;'>""</code>                                                                                                         |
| defaultMinutes        |                                                                                                                                                                                  | number                                                                                    | -                                                 |                                                                                                                                                                  |
| defaultSeconds        |                                                                                                                                                                                  | number                                                                                    | -                                                 |                                                                                                                                                                  |
| desktopModal          | Dropdown content is shown into a modal on desktop                                                                                                                                | boolean                                                                                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;desktopModal: true<br>}</code>          |
| disabled              | Same as native disabled                                                                                                                                                          | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| enableSeconds         |                                                                                                                                                                                  | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| expanded              | Makes input full width when inside a grouped or addon field                                                                                                                      | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| formatter             | Custom function to format a date into a string                                                                                                                                   | ((date: Date ) =&gt; string) \| undefined                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;formatter: undefined<br>}</code>        |
| hourFormat            |                                                                                                                                                                                  | "12" \| "24" \| 12 \| 24                                                                  | -                                                 |                                                                                                                                                                  |
| icon                  | Icon to be shown                                                                                                                                                                 | string                                                                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;icon: undefined<br>}</code>             |
| iconPack              | Icon pack to use                                                                                                                                                                 | string                                                                                    | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>         |
| iconRight             | Icon to be added on the right side                                                                                                                                               | string                                                                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code>        |
| iconRightClickable    | Make the icon right clickable                                                                                                                                                    | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| incrementHours        |                                                                                                                                                                                  | number                                                                                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| incrementMinutes      |                                                                                                                                                                                  | number                                                                                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| incrementSeconds      |                                                                                                                                                                                  | number                                                                                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                          |
| inline                | Display datepicker inline                                                                                                                                                        | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| locale                | Date format locale                                                                                                                                                               | string                                                                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>                       |
| maxTime               | Max time to select                                                                                                                                                               | Date                                                                                      | -                                                 |                                                                                                                                                                  |
| minTime               | Min time to select                                                                                                                                                               | Date                                                                                      | -                                                 |                                                                                                                                                                  |
| mobileBreakpoint      | Mobile breakpoint as `max-width` value                                                                                                                                           | string                                                                                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;mobileBreakpoint: undefined<br>}</code> |
| mobileModal           | Dropdown content is shown into a modal on mobile                                                                                                                                 | boolean                                                                                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;mobileModal: true<br>}</code>           |
| mobileNative          | Enable mobile native input if mobile agent                                                                                                                                       | boolean                                                                                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code>          |
| v-model               | The input value state                                                                                                                                                            | Date                                                                                      | -                                                 |                                                                                                                                                                  |
| openOnFocus           | Open dropdown on focus                                                                                                                                                           | boolean                                                                                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;openOnFocus: true<br>}</code>           |
| override              | Override existing theme classes completely                                                                                                                                       | boolean                                                                                   | -                                                 |                                                                                                                                                                  |
| parser                | Custom function to parse a string into a date                                                                                                                                    | ((date: string) =&gt; Date ) \| undefined                                                 | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;parser: undefined<br>}</code>           |
| placeholder           | Input placeholder                                                                                                                                                                | string                                                                                    | -                                                 |                                                                                                                                                                  |
| position              | Dropdown position                                                                                                                                                                | string                                                                                    | -                                                 |                                                                                                                                                                  |
| readonly              | Same as native input readonly                                                                                                                                                    | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| resetOnMeridianChange | Reset the time inputs when meridian changes                                                                                                                                      | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| rounded               | Makes the input rounded                                                                                                                                                          | boolean                                                                                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                      |
| size                  | Size of the button                                                                                                                                                               | string                                                                                    | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;size: undefined<br>}</code>             |
| teleport              | Append the component to another part of the DOM.<br/>Set `true` to append the component to the body.<br/>In addition, any CSS selector string or an actual DOM node can be used. | boolean \| object \| string                                                               | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>timepicker: {<br>&nbsp;&nbsp;teleport: false<br>}</code>             |
| unselectableTimes     | Define a list of times which can not be selected                                                                                                                                 | Date[] \| ((date: Date) =&gt; boolean)                                                    | -                                                 |                                                                                                                                                                  |
| useHtml5Validation    | Enable HTML 5 native validation                                                                                                                                                  | boolean                                                                                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>                |


### Events

| Event name         | Properties                                 | Description                     |
| ------------------ | ------------------------------------------ | ------------------------------- |
| focus              | **event** `Event` - native event           | on input focus event            |
| blur               | **event** `Event` - native event           | on input blur event             |
| invalid            | **event** `Event` - native event           | on input invalid event          |
| icon-click         | **event** `Event` - native event           | on icon click event             |
| icon-right-click   | **event** `Event` - native event           | on icon right click event       |
| update:model-value | **value** `Date` - updated modelValue prop | modelValue prop two-way binding |
| update:active      | **value** `boolean` - updated active prop  | active prop two-way binding     |

### Slots

| Name    | Description                            | Bindings |
| ------- | -------------------------------------- | -------- |
| trigger | Override the trigger                   |          |
| default | Define an additional content on footer |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                               |
| -------------------------------------- | ----------------------------------------------------- |
| $timepicker-font-size                  | $base-font-size                                       |
| $timepicker-box-line-height            | $base-line-height                                     |
| $timepicker-box-padding                | 0.375rem 1rem                                         |
| $timepicker-footer-padding             | 0 0.5rem                                              |
| $timepicker-footer-margin              | 0.875rem 0 0 0                                        |
| $timepicker-select-line-height         | $base-line-height                                     |
| $timepicker-select-padding             | $control-padding-vertical $control-padding-horizontal |
| $timepicker-select-color               | #363636                                               |
| $timepicker-select-font-weight         | 600                                                   |
| $timepicker-select-placeholder-opacity | $base-disabled-opacity                                |
| $timepicker-separator-font-weight      | 600                                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_timepicker.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable | Default |
| ------------- | ------- |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_timepicker.scss)

</div>

</div>
