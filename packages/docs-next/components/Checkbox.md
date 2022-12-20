---
title: Checkbox
---

# Checkbox

<div class="vp-doc">

> Select a single or grouped options

<Carbon />
</div>
<example-checkbox />

## Class props

<br />

<inspector-checkbox-viewer />

<br />
<br />

<div class="vp-doc">

## Props

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

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| input             |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_checkbox.scss)

| CSS Variable                                | SASS Variable                         | Default                 |
| ------------------------------------------- | ------------------------------------- | ----------------------- |
| --oruga-checkbox-active-background-color    | \$checkbox-active-background-color    | \$primary               |
| --oruga-checkbox-background-color           | \$checkbox-background-color           | \$primary               |
| --oruga-checkbox-border-color               | \$checkbox-border-color               | \$primary               |
| --oruga-checkbox-border-radius              | \$checkbox-border-radius              | \$base-border-radius    |
| --oruga-checkbox-border-width               | \$checkbox-border-width               | 2px                     |
| --oruga-checkbox-checked-box-shadow-length  | \$checkbox-checked-box-shadow-length  | 0 0 0.5em               |
| --oruga-checkbox-checked-box-shadow-opacity | \$checkbox-checked-box-shadow-opacity | 0.8                     |
| --oruga-checkbox-checkmark-color            | \$checkbox-checkmark-color            | \$primary-invert        |
| --oruga-checkbox-disabled-opacity           | \$checkbox-disabled-opacity           | \$base-disabled-opacity |
| --oruga-checkbox-label-padding              | \$checkbox-label-padding              | 0 0 0 .5em              |
| --oruga-checkbox-margin-sibiling            | \$checkbox-margin-sibiling            | 0.5em                   |
| --oruga-checkbox-size                       | \$checkbox-size                       | 1rem                    |
| --oruga-checkbox-line-height                | \$checkbox-line-height                | 1.5                     |

</div>
