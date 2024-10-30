# Switch

<div class="vp-doc">

> Switch between two opposing states

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

> Switch between two opposing states

```html
<o-switch></o-switch>
```

### Props

| Prop name          | Description                                                                         | Type                            | Values                                                                          | Default                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                      | string                          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| disabled           | Same as native disabled                                                             | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| falseValue         | Overrides the returned value when it's not checked                                  | string\|number\|boolean\|object | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| id                 | Same as native id. Also set the for label for o-field wrapper - default is an uuid. | string                          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                              |
| label              | Input label, unnecessary when default slot is used                                  | string                          | -                                                                               |                                                                                                                                                            |
| v-model            | The input value state                                                               | string\|number\|boolean\|object | -                                                                               |                                                                                                                                                            |
| name               | Name attribute on native checkbox                                                   | string                          | -                                                                               |                                                                                                                                                            |
| nativeValue        | Same as native value                                                                | string\|number\|boolean\|object | -                                                                               |                                                                                                                                                            |
| override           | Override existing theme classes completely                                          | boolean                         | -                                                                               |                                                                                                                                                            |
| passiveVariant     | Color of the switch when is passive                                                 | string                          | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;passiveVariant: undefined<br>}</code> |
| position           | Label position                                                                      | string                          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"right"</code>                                                                                              |
| required           | Same as native required                                                             | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| rounded            | Rounded style                                                                       | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                 |
| size               | Size of the control                                                                 | string                          | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| trueValue          | Overrides the returned value when it's checked                                      | string\|number\|boolean\|object | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                 |
| useHtml5Validation | Enable html 5 native validation                                                     | boolean                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>          |
| variant            | Color of the control                                                                | string                          | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

### Events

| Event name        | Properties                                                                                           | Description                     |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `string \| number \| boolean \| object` - updated modelValue prop                          | modelValue prop two-way binding |
| input             | **value** `string \| number \| boolean \| object` - input value<br/>**event** `Event` - native event | on input change event           |
| focus             | **event** `Event` - native event                                                                     | on input focus event            |
| blur              | **event** `Event` - native event                                                                     | on input blur event             |
| invalid           | **event** `Event` - native event                                                                     | on input invalid event          |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                   | Default                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| $switch-active-background-color | var(--#{$prefix}primary)                                                                         |
| $switch-action-background       | #f5f5f5                                                                                          |
| $switch-background              | var(--#{$prefix}grey-light)                                                                      |
| $switch-border-radius           | var(--#{$prefix}base-border-radius)                                                              |
| $switch-box-shadow              | 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05) |
| $switch-disabled-opacity        | var(--#{$prefix}base-disabled-opacity)                                                           |
| $switch-margin-label            | 0.5em                                                                                            |
| $switch-padding                 | 0.2em                                                                                            |
| $switch-rounded-border-radius   | var( --#{$prefix}base-border-radius-rounded)                                                     |
| $switch-width                   | 2.75 \* 1em                                                                                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_switch.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                   | Default                  |
| ------------------------------- | ------------------------ |
| $switch-colors                  | var.$colors              |
| $switch-width                   | 2.75em                   |
| $switch-padding                 | 0.2em                    |
| $switch-background-color        | css.getVar("grey-light") |
| $switch-active-background-color | css.getVar("primary")    |
| $switch-shadow                  | css.getVar("shadow")     |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_switch.scss)

</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable  | Default |
| -------------- | ------- |
| $switch-spacer | 0.5rem  |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_switch.scss)

</div>

</div>
