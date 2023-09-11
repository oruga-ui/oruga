---
title: Switch
---

# Switch

<div class="vp-doc">

> Switch between two opposing states

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-switch />

</div>
<div class="vp-example">

## Class props

<inspector-switch-viewer />

</div>

<div class="vp-doc">

## Switch component

```html
<o-switch></o-switch>
```

### Props

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

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| $switch-active-background-color | $primary                                                                                         |
| $switch-action-background       | #f5f5f5                                                                                          |
| $switch-background              | $grey-light                                                                                      |
| $switch-border-radius           | $base-border-radius                                                                              |
| $switch-box-shadow              | 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05) |
| $switch-disabled-opacity        | $base-disabled-opacity                                                                           |
| $switch-margin-label            | 0.5em                                                                                            |
| $switch-padding                 | 0.2em                                                                                            |
| $switch-rounded-border-radius   | $base-rounded-border-radius                                                                      |
| $switch-width                   | 2.75 \* 1em                                                                                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_switch.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| $switch-active-background-color | $primary                                                                                         |
| $switch-action-background       | #f5f5f5                                                                                          |
| $switch-background              | $grey-light                                                                                      |
| $switch-border-radius           | $base-border-radius                                                                              |
| $switch-box-shadow              | 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05) |
| $switch-disabled-opacity        | $base-disabled-opacity                                                                           |
| $switch-margin-label            | 0.5em                                                                                            |
| $switch-padding                 | 0.2em                                                                                            |
| $switch-rounded-border-radius   | $base-rounded-border-radius                                                                      |
| $switch-width                   | 2.75 \* 1em                                                                                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_switch.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable  | Default |
| -------------- | ------- |
| $switch-spacer | 0.5rem  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_switch.scss)

</div>

</div>
