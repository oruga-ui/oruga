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

## Checkbox component

```html
<o-checkbox></o-checkbox>
```

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

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                |
| ------------------------------------ | ---------------------- |
| $checkbox-active-background-color    | $primary               |
| $checkbox-background-color           | $primary               |
| $checkbox-border-color               | $primary               |
| $checkbox-border-radius              | $base-border-radius    |
| $checkbox-border-width               | 2px                    |
| $checkbox-checked-box-shadow-length  | 0 0 0.5em              |
| $checkbox-checked-box-shadow-opacity | 0.8                    |
| $checkbox-checkmark-color            | $primary-invert        |
| $checkbox-disabled-opacity           | $base-disabled-opacity |
| $checkbox-label-padding              | 0 0 0 0.5em            |
| $checkbox-margin-sibiling            | 0.5em                  |
| $checkbox-size                       | 1rem                   |
| $checkbox-line-height                | 1.5                    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_checkbox.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                        | Default                |
| ------------------------------------ | ---------------------- |
| $checkbox-active-background-color    | $primary               |
| $checkbox-background-color           | $primary               |
| $checkbox-border-color               | $primary               |
| $checkbox-border-radius              | $base-border-radius    |
| $checkbox-border-width               | 2px                    |
| $checkbox-checked-box-shadow-length  | 0 0 0.5em              |
| $checkbox-checked-box-shadow-opacity | 0.8                    |
| $checkbox-checkmark-color            | $primary-invert        |
| $checkbox-disabled-opacity           | $base-disabled-opacity |
| $checkbox-label-padding              | 0 0 0 0.5em            |
| $checkbox-margin-sibiling            | 0.5em                  |
| $checkbox-size                       | 1rem                   |
| $checkbox-line-height                | 1.5                    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_checkbox.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>
