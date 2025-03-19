# Switch

<section class="odocs-head">

The **Switch** input component — sometimes called "toggle" — offers a choice between one of two values;
it's a great option when you want the user to toggle a feature on or off.
This component implements the W3C ARIA APG [Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).
Use it with the Field component to access all the functionalities.

</section>

<section class="odocs-examples">

## Examples

<example-switch />

</section>

<section class="odocs-specs">

## Switch component

> Switch between two opposing states.

```html
<o-switch></o-switch>
```

### Props

| Prop name          | Description                                                                         | Type                                                                   | Values                                                                          | Default                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocomplete       | Same as native autocomplete options to use in HTML5 validation                      | string                                                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;autocomplete: "off"<br>}</code>       |
| customValidity     | Custom HTML 5 validation error to set on the form control                           | string \| ((currentValue: unknown, state: ValidityState) =&gt; string) | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                     |
| disabled           | Same as native disabled                                                             | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| falseValue         | Overrides the returned value when it's not checked                                  | unknown                                                                | -                                                                               |                                                                                                                                                            |
| id                 | Same as native id. Also set the for label for o-field wrapper - default is an uuid. | string                                                                 | -                                                                               | <code style='white-space: nowrap; padding: 0;'>useId()</code>                                                                                              |
| label              | Input label, unnecessary when default slot is used                                  | string                                                                 | -                                                                               |                                                                                                                                                            |
| v-model            | The input value state, use v-model to make it two-way binding                       | unknown                                                                | -                                                                               |                                                                                                                                                            |
| name               | Name attribute on native checkbox                                                   | string                                                                 | -                                                                               |                                                                                                                                                            |
| nativeValue        | Same as native value                                                                | unknown                                                                | -                                                                               |                                                                                                                                                            |
| override           | Override existing theme classes completely                                          | boolean                                                                | -                                                                               |                                                                                                                                                            |
| passiveVariant     | Color of the switch when is passive                                                 | string                                                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;passiveVariant: undefined<br>}</code> |
| position           | Label position                                                                      | string                                                                 | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;right: "position"<br>}</code>         |
| required           | Same as native required                                                             | boolean                                                                | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| rounded            | Rounded style                                                                       | boolean                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;rounded: true<br>}</code>             |
| size               | Size of the control                                                                 | string                                                                 | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| trueValue          | Overrides the returned value when it's checked                                      | unknown                                                                | -                                                                               |                                                                                                                                                            |
| useHtml5Validation | Enable html 5 native validation                                                     | boolean                                                                | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;useHtml5Validation: true<br>}</code>          |
| variant            | Color of the control                                                                | string                                                                 | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>switch: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

### Events

| Event name         | Properties                                                       | Description                     |
| ------------------ | ---------------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `T` - updated modelValue prop                          | modelValue prop two-way binding |
| input              | **value** `T` - input value<br/>**event** `Event` - native event | on input change event           |
| focus              | **event** `Event` - native event                                 | on input focus event            |
| blur               | **event** `Event` - native event                                 | on input blur event             |
| invalid            | **event** `Event` - native event                                 | on input invalid event          |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-switch-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                                                   |
| ----------------------------- | --------------------------------------------------------- |
| $switch-spacer                | 0.5em                                                     |
| $switch-width                 | 2.75em                                                    |
| $switch-height                | 1.5em                                                     |
| $switch-background            | var(--#{$prefix}grey-light)                               |
| $switch-toggle-background     | #f5f5f5                                                   |
| $switch-border                | $control-border-width solid var(--#{$prefix}grey-lighter) |
| $switch-border-radius         | var(--#{$prefix}base-border-radius)                       |
| $switch-border-radius-rounded | var( --#{$prefix}base-border-radius-rounded)              |
| $switch-checked-background    | var(--#{$prefix}primary)                                  |
| $switch-disabled-opacity      | var(--#{$prefix}base-disabled-opacity)                    |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_switch.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                   | Default                  |
| ------------------------------- | ------------------------ |
| $switch-width                   | 2.75em                   |
| $switch-padding                 | 0.2em                    |
| $switch-colors                  | dv.$colors               |
| $switch-background-color        | css.getVar("grey-light") |
| $switch-active-background-color | css.getVar("primary")    |
| $switch-shadow                  | css.getVar("shadow")     |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_switch.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable  | Default |
| -------------- | ------- |
| $switch-spacer | 0.5em   |
| $switch-width  | 2.75em  |
| $switch-height | 1.5em   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_switch.scss)

</div>

</section>
