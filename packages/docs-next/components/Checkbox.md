---
title: Checkbox
---

# Checkbox

<div class="vp-doc">

> Select a single or grouped options

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-checkbox />

</div>
<div class="vp-example">

## Class props

<inspector-checkbox-viewer />

</div>

<div class="vp-doc">

## Checkbox Component

### Props

| Prop name      | Description                                                                          | Type                           | Values                                                                          | Default |
| -------------- | ------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------- | ------- |
| ariaLabelledby | Accessibility label to establish relationship between the checkbox and control label | string                         | -                                                                               |         |
| autocomplete   |                                                                                      | string                         | -                                                                               |         |
| disabled       | Same as native disabled                                                              | boolean                        | -                                                                               |         |
| falseValue     | Overrides the returned value when it's not checked                                   | string\|number\|boolean        | -                                                                               | false   |
| indeterminate  | Same as native indeterminate                                                         | boolean                        | -                                                                               | false   |
| name           | Same as native name                                                                  | string                         | -                                                                               |         |
| nativeValue    | Same as native value                                                                 | string\|number\|boolean\|array | -                                                                               |         |
| override       |                                                                                      | boolean                        | -                                                                               |         |
| required       |                                                                                      | boolean                        | -                                                                               |         |
| size           | Size of the control, optional                                                        | string                         | `small`, `medium`, `large`                                                      |         |
| trueValue      | Overrides the returned value when it's checked                                       | string\|number\|boolean        | -                                                                               | true    |
| v-model        |                                                                                      | string\|number\|boolean\|array | -                                                                               |         |
| variant        | Color of the control, optional                                                       | string                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

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
| $checkbox-active-background-color | $primary !default |
| $checkbox-background-color | $primary !default |
| $checkbox-border-color | $primary !default |
| $checkbox-border-radius | $base-border-radius !default |
| $checkbox-border-width | 2px !default |
| $checkbox-checked-box-shadow-length | 0 0 0.5em !default |
| $checkbox-checked-box-shadow-opacity | 0.8 !default |
| $checkbox-checkmark-color | $primary-invert !default |
| $checkbox-disabled-opacity | $base-disabled-opacity !default |
| $checkbox-label-padding | 0 0 0 0.5em !default |
| $checkbox-margin-sibiling | 0.5em !default |
| $checkbox-size | 1rem !default |
| $checkbox-line-height | 1.5 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_checkbox.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $checkbox-active-background-color | $primary !default |
| $checkbox-background-color | $primary !default |
| $checkbox-border-color | $primary !default |
| $checkbox-border-radius | $base-border-radius !default |
| $checkbox-border-width | 2px !default |
| $checkbox-checked-box-shadow-length | 0 0 0.5em !default |
| $checkbox-checked-box-shadow-opacity | 0.8 !default |
| $checkbox-checkmark-color | $primary-invert !default |
| $checkbox-disabled-opacity | $base-disabled-opacity !default |
| $checkbox-label-padding | 0 0 0 0.5em !default |
| $checkbox-margin-sibiling | 0.5em !default |
| $checkbox-size | 1rem !default |
| $checkbox-line-height | 1.5 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_checkbox.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>
