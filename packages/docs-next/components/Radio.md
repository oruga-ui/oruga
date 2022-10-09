---
title: Radio
---

# Radio

> Select an option from a set

<example-radio />

## Class props

<br />

<inspector-radio-viewer />

<br />
<br />

## Props

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

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__radio.scss.scss)

| CSS Variable                             | SASS Variable                      | Default                 |
| ---------------------------------------- | ---------------------------------- | ----------------------- |
| --oruga-radio-active-background-color    | \$radio-active-background-color    | \$primary               |
| --oruga-radio-checked-box-shadow-length  | \$radio-checked-box-shadow-length  | 0 0 0.5em               |
| --oruga-radio-checked-box-shadow-opacity | \$radio-checked-box-shadow-opacity | 0.8                     |
| --oruga-radio-disabled-opacity           | \$radio-disabled-opacity           | \$base-disabled-opacity |
| --oruga-radio-label-padding              | \$radio-label-padding              | 0 0 0 .5em              |
| --oruga-radio-margin-sibiling            | \$radio-margin-sibiling            | 0.5em                   |
| --oruga-radio-size                       | \$radio-size                       | 1rem                    |
| --oruga-radio-line-height                | \$radio-line-height                | 1.25                    |
