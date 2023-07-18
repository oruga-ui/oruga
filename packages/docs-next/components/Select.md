---
title: Select
---

# Select

<div class="vp-doc">

> Select an item in a dropdown list. Use with Field to access all functionalities

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-select />

</div>
<div class="vp-doc">

## Class props

<inspector-select-viewer />

</div>

<div class="vp-doc">

## Select Component

### Props

| Prop name          | Description                                                 | Type                                   | Values                                                                          | Default                                                                                                                                    |
| ------------------ | ----------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| autocomplete       | Native options to use in HTML5 validation                   | string                                 | -                                                                               |                                                                                                                                            |
| expanded           | Makes input full width when inside a grouped or addon field | boolean                                | -                                                                               |                                                                                                                                            |
| icon               | Icon name to be added                                       | string                                 | -                                                                               |                                                                                                                                            |
| iconPack           | Icon pack to use                                            | string                                 | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> select: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>  |
| iconRight          | Icon name to be added on the right side                     | string                                 | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> select: {<br>&nbsp;&nbsp;iconRight: undefined<br>}</code> |
| maxlength          | Same as native maxlength, plus character counter            | number\|string                         | -                                                                               |                                                                                                                                            |
| multiple           |                                                             | boolean                                | -                                                                               |                                                                                                                                            |
| nativeSize         | Same as native size                                         | string\|number                         | -                                                                               |                                                                                                                                            |
| override           |                                                             | boolean                                | -                                                                               |                                                                                                                                            |
| placeholder        | Text when nothing is selected                               | string                                 | -                                                                               |                                                                                                                                            |
| rounded            | Makes the element rounded                                   | boolean                                | -                                                                               |                                                                                                                                            |
| size               | Vertical size of input, optional                            | string                                 | `small`, `medium`, `large`                                                      |                                                                                                                                            |
| statusIcon         | Show status icon using field and variant prop               | boolean                                | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "statusIcon": true<br>}</code>           |
| useHtml5Validation | Enable html 5 native validation                             | boolean                                | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; "useHtml5Validation": true<br>}</code>   |
| v-model            |                                                             | string\|number\|boolean\|object\|array | -                                                                               | null                                                                                                                                       |
| validationMessage  | The message which is shown when a validation error occurs   | string                                 | -                                                                               |                                                                                                                                            |
| variant            | Color of the control, optional                              | string                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                            |

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
| default |             |          |

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $select-background-color | #fff !default |
| $select-border-color | $grey-lighter !default |
| $select-border-width | 1px !default |
| $select-border-style | solid !default |
| $select-border-radius | $base-border-radius !default |
| $select-rounded-border-radius | $base-rounded-border-radius !default |
| $select-box-shadow | none !default |
| $select-color | #363636 !default |
| $select-icon-zindex | 4 !default |
| $select-height | $control-height !default |
| $select-arrow-size | 1rem !default |
| $select-line-height | $base-line-height !default |
| $select-margin | 0 !default |
| $select-max-width | 100% !default |
| $select-width | 100% !default |
| $select-placeholder-opacity | $base-disabled-opacity !default |
| $select-padding | $control-padding-vertical $control-padding-horizontal !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_select.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $select-background-color | #fff !default |
| $select-border-color | $grey-lighter !default |
| $select-border-width | 1px !default |
| $select-border-style | solid !default |
| $select-border-radius | $base-border-radius !default |
| $select-rounded-border-radius | $base-rounded-border-radius !default |
| $select-box-shadow | none !default |
| $select-color | #363636 !default |
| $select-icon-zindex | 4 !default |
| $select-height | $control-height !default |
| $select-arrow-size | 1rem !default |
| $select-line-height | $base-line-height !default |
| $select-margin | 0 !default |
| $select-max-width | 100% !default |
| $select-width | 100% !default |
| $select-placeholder-opacity | $base-disabled-opacity !default |
| $select-padding | $control-padding-vertical $control-padding-horizontal !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_select.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>
