---
title: Timepicker
---

# Timepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile

</div>
<example-timepicker />

## Class props

<br />

<inspector-timepicker-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name             | Description                                                 | Type           | Values                                            | Default                                                                                                                                      |
| --------------------- | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody          |                                                             | boolean        | -                                                 |                                                                                                                                              |
| autocomplete          | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                              |
| defaultMinutes        |                                                             | number         | -                                                 |                                                                                                                                              |
| defaultSeconds        |                                                             | number         | -                                                 |                                                                                                                                              |
| disabled              |                                                             | boolean        | -                                                 |                                                                                                                                              |
| editable              |                                                             | boolean        | -                                                 |                                                                                                                                              |
| enableSeconds         |                                                             | boolean        | -                                                 |                                                                                                                                              |
| expanded              | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                              |
| hourFormat            |                                                             | string         | -                                                 |                                                                                                                                              |
| icon                  | Icon name to be added                                       | string         | -                                                 |                                                                                                                                              |
| iconPack              | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                              |
| incrementHours        |                                                             | number         | -                                                 | 1                                                                                                                                            |
| incrementMinutes      |                                                             | number         | -                                                 | 1                                                                                                                                            |
| incrementSeconds      |                                                             | number         | -                                                 | 1                                                                                                                                            |
| inline                |                                                             | boolean        | -                                                 |                                                                                                                                              |
| maxTime               |                                                             | date           | -                                                 |                                                                                                                                              |
| maxlength             | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                              |
| minTime               |                                                             | date           | -                                                 |                                                                                                                                              |
| mobileBreakpoint      | Mobile breakpoint as max-width value                        | string         | -                                                 |                                                                                                                                              |
| mobileNative          |                                                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> timepicker: {<br>&nbsp;&nbsp;mobileNative: true<br>}</code> |
| openOnFocus           |                                                             | boolean        | -                                                 |                                                                                                                                              |
| override              |                                                             | boolean        | -                                                 |                                                                                                                                              |
| placeholder           |                                                             | string         | -                                                 |                                                                                                                                              |
| position              |                                                             | string         | -                                                 |                                                                                                                                              |
| resetOnMeridianChange |                                                             | boolean        | -                                                 | false                                                                                                                                        |
| rounded               | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                              |
| size                  | Size of button, optional                                    | string         | `small`, `medium`, `large`                        |                                                                                                                                              |
| statusIcon            | Show status icon using field and variant prop               | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>             |
| timeCreator           |                                                             | func           | -                                                 | Default function (see source code)                                                                                                           |
| timeFormatter         |                                                             | func           | -                                                 | Default function (see source code)                                                                                                           |
| timeParser            |                                                             | func           | -                                                 | Default function (see source code)                                                                                                           |
| unselectableTimes     |                                                             | array          | -                                                 |                                                                                                                                              |
| useHtml5Validation    | Enable html 5 native validation                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>     |
| v-model               |                                                             | date           | -                                                 |                                                                                                                                              |
| validationMessage     | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                              |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| blur              |            |
| focus             |            |
| update:modelValue |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__timepicker.scss.scss)

| CSS Variable                                  | SASS Variable                           | Default                                               |
| --------------------------------------------- | --------------------------------------- | ----------------------------------------------------- |
| --oruga-timepicker-font-size                  | \$timepicker-font-size                  | \$base-font-size                                      |
| --oruga-timepicker-box-line-height            | \$timepicker-box-line-height            | \$base-line-height                                    |
| --oruga-timepicker-box-padding                | \$timepicker-box-padding                | .375rem 1rem                                          |
| --oruga-timepicker-footer-padding             | \$timepicker-footer-padding             | 0 .5rem                                               |
| --oruga-timepicker-footer-margin              | \$timepicker-footer-margin              | 0.875rem 0 0 0                                        |
| --oruga-timepicker-select-line-height         | \$timepicker-select-line-height         | \$base-line-height                                    |
| --oruga-timepicker-select-padding             | \$timepicker-select-padding             | $control-padding-vertical $control-padding-horizontal |
| --oruga-timepicker-select-color               | \$timepicker-select-color               | #363636                                               |
| --oruga-timepicker-select-font-weight         | \$timepicker-select-font-weight         | 600                                                   |
| --oruga-timepicker-select-placeholder-opacity | \$timepicker-select-placeholder-opacity | \$base-disabled-opacity                               |
| --oruga-timepicker-separator-font-weight      | \$timepicker-separator-font-weight      | 600                                                   |

</div>
