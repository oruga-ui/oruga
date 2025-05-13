# Button

<section class="odocs-head">

The **Button** component uses [HTML's native button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) by default.
The `label` prop is used to populate the text of the button — or alternatively you can use the default slot.
The button can be have different colors, sizes, and states.
The component supports the W3C ARIA APG [Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

</section>

<section class="odocs-examples">

## Examples

<example-button />

</section>

<section class="odocs-specs">

## Button component

> The classic button, in different colors, sizes, and states.

```html
<o-button></o-button>
```

### Props

| Prop name | Description                                         | Type                            | Values                                                                          | Default                                                                                                                                              |
| --------- | --------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled  | Button will be disabled                             | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| expanded  | Button will be expanded (full-width)                | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| iconLeft  | Icon name to show on the left                       | string                          | -                                                                               |                                                                                                                                                      |
| iconPack  | Icon pack to use                                    | string                          | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconRight | Icon name to show on the right                      | string                          | -                                                                               |                                                                                                                                                      |
| inverted  | Enable inverted style                               | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| label     | Button label, unnecessary when default slot is used | string                          | -                                                                               |                                                                                                                                                      |
| loading   | Enable loading style                                | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| outlined  | Enable outlined style                               | boolean                         | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| override  | Override existing theme classes completely          | boolean                         | -                                                                               |                                                                                                                                                      |
| rounded   | Enable rounded style                                | boolean                         | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;rounded: false<br>}</code>      |
| size      | Size of the control                                 | string                          | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| tag       | Button tag name                                     | DynamicComponent                | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)`        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;tag: "button"<br>}</code>       |
| type      | Button type, like native                            | "button" \| "reset" \| "submit" | `button`, `submit`, `reset`                                                     | <code style='white-space: nowrap; padding: 0;'>"button"</code>                                                                                       |
| variant   | Color variant of the control                        | string                          | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Events

| Event name | Properties                       | Description        |
| ---------- | -------------------------------- | ------------------ |
| click      | **event** `Event` - native event | button click event |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-button-viewer />

</section>

<section class="odocs-style">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                                         |
| --------------------------------- | ----------------------------------------------- |
| $button-background-color          | transparent                                     |
| $button-color                     | var(--#{$prefix}black)                          |
| $button-border-radius             | var(--#{$prefix}base-border-radius)             |
| $button-border-color              | var(--#{$prefix}grey-lighter)                   |
| $button-border                    | 1px solid $button-border-color                  |
| $button-box-shadow                | none                                            |
| $button-font-weight               | 400                                             |
| $button-line-height               | var(--#{$prefix}base-line-height)               |
| $button-margin-icon-to-text       | 0.1875em                                        |
| $button-margin                    | 0                                               |
| $button-spacer                    | 0.5rem                                          |
| $button-height                    | $control-height                                 |
| $button-padding                   | $control-padding-vertical 0.75em                |
| $button-rounded-border-radius     | var( --#{$prefix}#{base-border-radius-rounded}) |
| $button-disabled-opacity          | var(--#{$prefix}#{base-disabled-opacity})       |
| $button-outlined-background-color | transparent                                     |
| $button-outlined-border-color     | var(--#{$prefix}grey-light)                     |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_button.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default                       |
| ----------------------- | ----------------------------- |
| $btn-spacer             | 0.5rem                        |
| $btn-height             | 2.35em                        |
| $btn-border-color       | var(--#{$prefix}border-color) |
| $btn-hover-border-color | var(--#{$prefix}border-color) |
| $btn-hover-box-shadow   | $box-shadow-sm                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_button.scss)

</div>

</section>
