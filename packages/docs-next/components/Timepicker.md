---
title: Timepicker
---

# Timepicker

<div class="vp-doc">

> An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile

<Carbon />
</div>

<div class="vp-doc">

## Examples

  <example-timepicker />
  
</div>
<div class="vp-doc">

## Class props

<inspector-timepicker-viewer />

</div>

<div class="vp-doc">

## Timepicker Component

### Props

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
| invalid           |            |
| update:modelValue |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| trigger |             |          |
| default |             |          |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $timepicker-font-size | $base-font-size !default |
| $timepicker-box-line-height | $base-line-height !default |
| $timepicker-box-padding | .375rem 1rem !default |
| $timepicker-footer-padding | 0 .5rem !default |
| $timepicker-footer-margin | 0.875rem 0 0 0 !default |
| $timepicker-select-line-height | $base-line-height !default |
| $timepicker-select-padding | $control-padding-vertical $control-padding-horizontal !default |
| $timepicker-select-color | #363636 !default |
| $timepicker-select-font-weight | 600 !default |
| $timepicker-select-placeholder-opacity | $base-disabled-opacity !default |
| $timepicker-separator-font-weight | 600 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_timepicker.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $timepicker-font-size | $base-font-size !default |
| $timepicker-box-line-height | $base-line-height !default |
| $timepicker-box-padding | .375rem 1rem !default |
| $timepicker-footer-padding | 0 .5rem !default |
| $timepicker-footer-margin | 0.875rem 0 0 0 !default |
| $timepicker-select-line-height | $base-line-height !default |
| $timepicker-select-padding | $control-padding-vertical $control-padding-horizontal !default |
| $timepicker-select-color | #363636 !default |
| $timepicker-select-font-weight | 600 !default |
| $timepicker-select-placeholder-opacity | $base-disabled-opacity !default |
| $timepicker-separator-font-weight | 600 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_timepicker.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $timepicker-select-margin | 0.2rem 0.2rem 0.2rem 0 !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_timepicker.scss)

</div>

</div>
