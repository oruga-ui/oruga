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

```html
<o-radio></o-radio>
```

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

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/oruga)_

| SASS Variable                     | Default                |
| --------------------------------- | ---------------------- |
| $radio-active-background-color    | $primary               |
| $radio-checked-box-shadow-length  | 0 0 0.5em              |
| $radio-checked-box-shadow-opacity | 0.8                    |
| $radio-disabled-opacity           | $base-disabled-opacity |
| $radio-label-padding              | 0 0 0 .5em             |
| $radio-margin-sibiling            | 0.5em                  |
| $radio-size                       | 1rem                   |
| $radio-line-height                | 1.25                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_radio.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/oruga)_

| SASS Variable                     | Default                |
| --------------------------------- | ---------------------- |
| $radio-active-background-color    | $primary               |
| $radio-checked-box-shadow-length  | 0 0 0.5em              |
| $radio-checked-box-shadow-opacity | 0.8                    |
| $radio-disabled-opacity           | $base-disabled-opacity |
| $radio-label-padding              | 0 0 0 .5em             |
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
