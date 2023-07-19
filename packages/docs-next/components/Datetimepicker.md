---
title: Datetimepicker
---

# Datetimepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-datetimepicker />

</div>
<div class="vp-example">

## Class props

<inspector-datetimepicker-viewer />

</div>

<div class="vp-doc">

## Datetimepicker Component

### Props

| Prop name          | Description                                                 | Type           | Values                                            | Default                                                                                                                                              |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| appendToBody       |                                                             | boolean        | -                                                 |                                                                                                                                                      |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                 |                                                                                                                                                      |
| datepicker         |                                                             | object         | -                                                 |                                                                                                                                                      |
| datetimeCreator    |                                                             | func           | -                                                 | Default function (see source code)                                                                                                                   |
| datetimeFormatter  |                                                             | func           | -                                                 |                                                                                                                                                      |
| datetimeParser     |                                                             | func           | -                                                 |                                                                                                                                                      |
| disabled           |                                                             | boolean        | -                                                 |                                                                                                                                                      |
| editable           |                                                             | boolean        | -                                                 | false                                                                                                                                                |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                 |                                                                                                                                                      |
| icon               | Icon name to be added                                       | string         | -                                                 |                                                                                                                                                      |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack` |                                                                                                                                                      |
| iconRight          |                                                             | string         | -                                                 |                                                                                                                                                      |
| iconRightClickable |                                                             | boolean        | -                                                 |                                                                                                                                                      |
| inline             |                                                             | boolean        | -                                                 |                                                                                                                                                      |
| locale             |                                                             | string\|array  | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>          |
| maxDatetime        |                                                             | date           | -                                                 |                                                                                                                                                      |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                 |                                                                                                                                                      |
| minDatetime        |                                                             | date           | -                                                 |                                                                                                                                                      |
| mobileNative       |                                                             | boolean        | -                                                 | true                                                                                                                                                 |
| modelValue         |                                                             | date           | -                                                 |                                                                                                                                                      |
| openOnFocus        |                                                             | boolean        | -                                                 |                                                                                                                                                      |
| override           |                                                             | boolean        | -                                                 |                                                                                                                                                      |
| placeholder        |                                                             | string         | -                                                 |                                                                                                                                                      |
| position           |                                                             | string         | -                                                 |                                                                                                                                                      |
| rounded            | Makes the element rounded                                   | boolean        | -                                                 |                                                                                                                                                      |
| size               |                                                             | string         | -                                                 |                                                                                                                                                      |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>         |
| timepicker         |                                                             | object         | -                                                 |                                                                                                                                                      |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code> |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                 |                                                                                                                                                      |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| active-change     |            |
| icon-right-click  |            |
| change-month      |            |
| change-year       |            |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |

### Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| footer |             |          |

</div>

<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datetimepicker.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_datetimepicker.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>
