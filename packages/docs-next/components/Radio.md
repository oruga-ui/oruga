---
title: Radio
---

# Radio

<div class="vp-doc">

> Select an option from a set

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-radio />

</div>
<div class="vp-example">

## Class props

<inspector-radio-viewer />

</div>

<div class="vp-doc">

## Radio Component

### Props

| Prop name   | Description                    | Type                           | Values                                                                          | Default |
| ----------- | ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------- | ------- |
| disabled    | Same as native disabled        | boolean                        | -                                                                               |         |
| name        | Same as native name            | string                         | -                                                                               |         |
| nativeValue | Same as native value           | string\|number\|boolean\|array | -                                                                               |         |
| override    |                                | boolean                        | -                                                                               |         |
| required    |                                | boolean                        | -                                                                               |         |
| size        | Size of the control, optional  | string                         | `small`, `medium`, `large`                                                      |         |
| v-model     |                                | string\|number\|boolean\|array | -                                                                               |         |
| variant     | Color of the control, optional | string                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| input             |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $radio-active-background-color | $primary !default |
| $radio-checked-box-shadow-length | 0 0 0.5em !default |
| $radio-checked-box-shadow-opacity | 0.8 !default |
| $radio-disabled-opacity | $base-disabled-opacity !default |
| $radio-label-padding | 0 0 0 .5em !default |
| $radio-margin-sibiling | 0.5em !default |
| $radio-size | 1rem !default |
| $radio-line-height | 1.25 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_radio.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $radio-active-background-color | $primary !default |
| $radio-checked-box-shadow-length | 0 0 0.5em !default |
| $radio-checked-box-shadow-opacity | 0.8 !default |
| $radio-disabled-opacity | $base-disabled-opacity !default |
| $radio-label-padding | 0 0 0 .5em !default |
| $radio-margin-sibiling | 0.5em !default |
| $radio-size | 1rem !default |
| $radio-line-height | 1.25 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_radio.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>
