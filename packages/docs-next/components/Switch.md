---
title: Switch
---

# Switch

> Switch between two opposing states

---

## Examples

 <example-switch />

## Class props

<br />

<inspector-switch-viewer />

<br />
<br />

## Props

| Prop name      | Description                                                                         | Type                    | Values                                                                          | Default |
| -------------- | ----------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- | ------- |
| ariaLabelledby | Accessibility label to establish relationship between the switch and control label' | string                  | -                                                                               |         |
| disabled       |                                                                                     | boolean                 | -                                                                               |         |
| falseValue     | Overrides the returned value when it's not checked                                  | string\|number\|boolean | -                                                                               | false   |
| name           | Name attribute on native checkbox                                                   | string                  | -                                                                               |         |
| nativeValue    | Same as native value                                                                | string\|number\|boolean | -                                                                               |         |
| override       |                                                                                     | boolean                 | -                                                                               |         |
| passiveVariant | Color of the switch when is passive, optional                                       | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |
| position       | Label position                                                                      | string                  | -                                                                               | 'right' |
| required       |                                                                                     | boolean                 | -                                                                               |         |
| rounded        | Rounded style                                                                       | boolean                 | -                                                                               | true    |
| size           | Vertical size of switch, optional                                                   | string                  | `small`, `medium`, `large`                                                      |         |
| trueValue      | Overrides the returned value when it's checked                                      | string\|number\|boolean | -                                                                               | true    |
| v-model        |                                                                                     | string\|number\|boolean | -                                                                               |         |
| variant        | Color of the switch, optional                                                       | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |         |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__switch.scss.scss)

| CSS Variable                           | SASS Variable                    | Default                                                                                          |
| -------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| --oruga-switch-active-background-color | \$switch-active-background-color | \$primary                                                                                        |
| --oruga-switch-action-background       | \$switch-action-background       | #f5f5f5                                                                                          |
| --oruga-switch-background              | \$switch-background              | \$grey-light                                                                                     |
| --oruga-switch-border-radius           | \$switch-border-radius           | \$base-border-radius                                                                             |
| --oruga-switch-box-shadow              | \$switch-box-shadow              | 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05) |
| --oruga-switch-disabled-opacity        | \$switch-disabled-opacity        | \$base-disabled-opacity                                                                          |
| --oruga-switch-margin-label            | \$switch-margin-label            | .5em                                                                                             |
| --oruga-switch-padding                 | \$switch-padding                 | 0.2em                                                                                            |
| --oruga-switch-rounded-border-radius   | \$switch-rounded-border-radius   | \$base-rounded-border-radius                                                                     |
| --oruga-switch-width                   | \$switch-width                   | 2.75 \* 1em                                                                                      |
