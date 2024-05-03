---
title: Radio
---

# Radio

<div class="vp-doc">

> Select an option from a set

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

| Prop name          | Description                                                    | Type                    | Values                                                                          | Default                                                                                                                                             |
| ------------------ | -------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation | string                  | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>radio: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code> |
| disabled           | Same as native disabled                                        | boolean                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| label              | Input label, unnecessary when default slot is used             | string                  | -                                                                               |                                                                                                                                                     |
| name               | Same as native name                                            | string                  | -                                                                               |                                                                                                                                                     |
| nativeValue        | Same as native value                                           | string\|number\|boolean | -                                                                               |                                                                                                                                                     |
| override           | Override existing theme classes completely                     | boolean                 | -                                                                               |                                                                                                                                                     |
| required           | Same as native required                                        | boolean                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                         |
| size               | Size of the control                                            | string                  | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>radio: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| useHtml5Validation | Enable html 5 native validation                                | boolean                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>   |
| v-model            |                                                                | string\|number\|boolean | -                                                                               |                                                                                                                                                     |
| variant            | Color of the control                                           | string                  | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>radio: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Events

| Event name        | Properties                                                                             | Description                     |
| ----------------- | -------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string, number, boolean` - updated modelValue prop                          | modelValue prop two-way binding |
| input             | **value** `string, number, boolean` - input value<br/>**event** `Event` - native event | on input change event           |
| focus             | **event** `Event` - native event                                                       | on input focus event            |
| blur              | **event** `Event` - native event                                                       | on input blur event             |
| invalid           | **event** `Event` - native event                                                       | on input invalid event          |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

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
