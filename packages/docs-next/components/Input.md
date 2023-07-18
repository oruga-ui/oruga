---
title: Input
---

# Input

<div class="vp-doc">

> Get user Input. Use with Field to access all functionalities

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-input />

</div>
<div class="vp-doc">

## Class props

<inspector-input-viewer />

</div>

<div class="vp-doc">

## Input Component

### Props

| Prop name          | Description                                                 | Type           | Values                                                                          | Default                                                                                                                                        |
| ------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Native options to use in HTML5 validation                   | string         | -                                                                               |                                                                                                                                                |
| autosize           | Automatically adjust height in textarea                     | boolean        | -                                                                               | false                                                                                                                                          |
| clearIcon          | Icon name to be added on the clear button                   | string         | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;clearIcon: 'close-circle'<br>}</code> |
| clearable          | Add a button/icon to clear the inputed text                 | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;clearable: false<br>}</code>          |
| expanded           | Makes input full width when inside a grouped or addon field | boolean        | -                                                                               |                                                                                                                                                |
| hasCounter         | Show character counter when maxlength prop is passed        | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> input: {<br>&nbsp;&nbsp;counter: false<br>}</code>            |
| icon               | Icon name to be added                                       | string         | -                                                                               |                                                                                                                                                |
| iconClickable      | Makes the icon clickable                                    | boolean        | -                                                                               |                                                                                                                                                |
| iconPack           | Icon pack to use                                            | string         | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                                |
| iconRight          | Icon name to be added on the right side                     | string         | -                                                                               |                                                                                                                                                |
| iconRightClickable | Make the icon right clickable                               | boolean        | -                                                                               |                                                                                                                                                |
| iconRightVariant   | Variant of right icon                                       | string         | -                                                                               |                                                                                                                                                |
| maxlength          | Same as native maxlength, plus character counter            | number\|string | -                                                                               |                                                                                                                                                |
| override           |                                                             | boolean        | -                                                                               |                                                                                                                                                |
| passwordReveal     | Adds the reveal password functionality                      | boolean        | -                                                                               |                                                                                                                                                |
| rounded            | Makes the element rounded                                   | boolean        | -                                                                               |                                                                                                                                                |
| size               | Vertical size of input, optional                            | string         | `small`, `medium`, `large`                                                      |                                                                                                                                                |
| statusIcon         | Show status icon using field and variant prop               | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>               |
| type               | Input type, like native                                     | string         | `Any native input type`, `and textarea`                                         | 'text'                                                                                                                                         |
| useHtml5Validation | Enable html 5 native validation                             | boolean        | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>       |
| v-model            |                                                             | number\|string | -                                                                               |                                                                                                                                                |
| validationMessage  | The message which is shown when a validation error occurs   | string         | -                                                                               |                                                                                                                                                |
| variant            | Color of the control, optional                              | string         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| blur              |            |
| focus             |            |
| invalid           |            |
| update:modelValue |            |
| input             |            |
| icon-click        |            |
| icon-right-click  |            |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $input-background-color | #ffffff !default |
| $input-border-color | $grey-lighter !default |
| $input-border-style | solid !default |
| $input-border-width | 1px !default |
| $input-border-radius | $base-border-radius !default |
| $input-rounded-border-radius | $base-rounded-border-radius !default |
| $input-box-shadow | inset 0 1px 2px hsla(0,0%,4%,.1) !default |
| $input-color | #363636 !default |
| $input-icon-zindex | 4 !default |
| $input-counter-font-size | .75rem !default |
| $input-counter-margin | .25rem 0 0 .5rem !default |
| $input-height | $control-height !default |
| $input-line-height | $base-line-height !default |
| $input-margin | 0 !default |
| $input-padding | $control-padding-vertical $control-padding-horizontal !default |
| $input-textarea-max-height | 600px !default |
| $input-textarea-min-height | 120px !default |
| $input-textarea-padding | 0.625em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_input.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $input-background-color | #ffffff !default |
| $input-border-color | $grey-lighter !default |
| $input-border-style | solid !default |
| $input-border-width | 1px !default |
| $input-border-radius | $base-border-radius !default |
| $input-rounded-border-radius | $base-rounded-border-radius !default |
| $input-box-shadow | inset 0 1px 2px hsla(0,0%,4%,.1) !default |
| $input-color | #363636 !default |
| $input-icon-zindex | 4 !default |
| $input-counter-font-size | .75rem !default |
| $input-counter-margin | .25rem 0 0 .5rem !default |
| $input-height | $control-height !default |
| $input-line-height | $base-line-height !default |
| $input-margin | 0 !default |
| $input-padding | $control-padding-vertical $control-padding-horizontal !default |
| $input-textarea-max-height | 600px !default |
| $input-textarea-min-height | 120px !default |
| $input-textarea-padding | 0.625em !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_input.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $input-icon-color | $input-color !default |
| $input-icon-spacer | 0.75rem !default |
| $input-icon-padding-sm | 2rem !default |
| $input-icon-padding | 2.5rem !default |
| $input-icon-padding-lg | 3rem !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_input.scss)

</div>

</div>
