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

## Radio component

> Select an option from a set

```html
<o-radio></o-radio>
```

### Props

| Prop name      | Description                                                                          | Type                           | Values                                                                          | Default                                                |
| -------------- | ------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| ariaLabelledby | Accessibility label to establish relationship between the checkbox and control label | string                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code> |
| disabled       | Same as native disabled                                                              | boolean                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code> |
| label          | Input label, unnecessary when default slot is used                                   | string                         | -                                                                               |                                                        |
| name           | Same as native name                                                                  | string                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code> |
| nativeValue    | Same as native value                                                                 | string\|number\|boolean\|array | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code> |
| override       |                                                                                      | boolean                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code> |
| required       |                                                                                      | boolean                        | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code> |
| size           | Size of the control, optional                                                        | string                         | `small`, `medium`, `large`                                                      | <code style='white-space: nowrap; padding: 0;'></code> |
| v-model        |                                                                                      | string\|number\|boolean\|array | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code> |
| variant        | Color of the control, optional                                                       | string                         | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <code style='white-space: nowrap; padding: 0;'></code> |

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

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                |
| --------------------------------- | ---------------------- |
| $radio-active-background-color    | $primary               |
| $radio-checked-box-shadow-length  | 0 0 0.5em              |
| $radio-checked-box-shadow-opacity | 0.8                    |
| $radio-disabled-opacity           | $base-disabled-opacity |
| $radio-label-padding              | 0 0 0 0.5em            |
| $radio-margin-sibiling            | 0.5em                  |
| $radio-size                       | 1rem                   |
| $radio-line-height                | 1.25                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_radio.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                |
| --------------------------------- | ---------------------- |
| $radio-active-background-color    | $primary               |
| $radio-checked-box-shadow-length  | 0 0 0.5em              |
| $radio-checked-box-shadow-opacity | 0.8                    |
| $radio-disabled-opacity           | $base-disabled-opacity |
| $radio-label-padding              | 0 0 0 0.5em            |
| $radio-margin-sibiling            | 0.5em                  |
| $radio-size                       | 1rem                   |
| $radio-line-height                | 1.25                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_radio.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>
