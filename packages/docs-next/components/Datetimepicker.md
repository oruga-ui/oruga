---
title: Datetimepicker
---

# Datetimepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile

<Carbon />
</div>
<example-datetimepicker />

## Class props

<br />

<inspector-datetimepicker-viewer />

<br />
<br />

<div class="vp-doc">

## Props

| Prop name          | Description                                                 | Type           | Values                                            | Default                                                                                                                                  |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody       |                                                             | boolean        | -                                                 |                                                                                                                                          |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                          |
| datepicker         |                                                             | object         | -                                                 |                                                                                                                                          |
| datetimeCreator    |                                                             | func           | -                                                 | Default function (see source code)                                                                                                       |
| datetimeFormatter  |                                                             | func           | -                                                 |                                                                                                                                          |
| datetimeParser     |                                                             | func           | -                                                 |                                                                                                                                          |
| disabled           |                                                             | boolean        | -                                                 |                                                                                                                                          |
| editable           |                                                             | boolean        | -                                                 | false                                                                                                                                    |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                          |
| icon               | Icon name to be added                                       | string         | -                                                 |                                                                                                                                          |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                          |
| iconRight          |                                                             | string         | -                                                 |                                                                                                                                          |
| iconRightClickable |                                                             | boolean        | -                                                 |                                                                                                                                          |
| inline             |                                                             | boolean        | -                                                 |                                                                                                                                          |
| locale             |                                                             | string\|array  | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>          |
| maxDatetime        |                                                             | date           | -                                                 |                                                                                                                                          |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                          |
| minDatetime        |                                                             | date           | -                                                 |                                                                                                                                          |
| mobileNative       |                                                             | boolean        | -                                                 | true                                                                                                                                     |
| modelValue         |                                                             | date           | -                                                 |                                                                                                                                          |
| openOnFocus        |                                                             | boolean        | -                                                 |                                                                                                                                          |
| override           |                                                             | boolean        | -                                                 |                                                                                                                                          |
| placeholder        |                                                             | string         | -                                                 |                                                                                                                                          |
| position           |                                                             | string         | -                                                 |                                                                                                                                          |
| rounded            | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                          |
| size               |                                                             | string         | -                                                 |                                                                                                                                          |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>         |
| timepicker         |                                                             | object         | -                                                 |                                                                                                                                          |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                 | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code> |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                          |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| active-change     |            |
| icon-right-click  |            |
| change-month      |            |
| change-year       |            |
| blur              |            |
| focus             |            |
| update:modelValue |            |

## Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| footer |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datetimepicker.scss)

| CSS Variable | SASS Variable | Default |
| ------------ | ------------- | ------- |


</div>
