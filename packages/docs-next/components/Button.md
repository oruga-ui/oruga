---
title: Button
---

# Button

<div class="vp-doc">

> The classic button, in different colors, sizes, and states

</div>

<div class="vp-example">

## Examples

<example-button />

</div>
<div class="vp-example">

## Class props

<inspector-button-viewer />

</div>

<div class="vp-doc">

## Button component

> The classic button, in different colors, sizes, and states

```html
<o-button></o-button>
```

### Props

| Prop name  | Description                                              | Type             | Values                                                                          | Default                                                                                                                                              |
| ---------- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled   | Button will be disabled                                  | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| expanded   | Button will be expanded (full-width)                     | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| iconLeft   | Icon name to show on the left                            | string           | -                                                                               |                                                                                                                                                      |
| iconPack   | Icon pack to use                                         | string           | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconRight  | Icon name to show on the right                           | string           | -                                                                               |                                                                                                                                                      |
| inverted   | Enable inverted style                                    | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| label      | Button label, unnecessary when default slot is used      | string           | -                                                                               |                                                                                                                                                      |
| loading    | Enable loading style                                     | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| nativeType | Button type, like native                                 | string           | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"button"</code>                                                                                       |
| outlined   | Enable outlined style                                    | boolean          | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| override   | Override existing theme classes completely               | boolean          | -                                                                               |                                                                                                                                                      |
| role       | Accessibility Role attribute to be passed to the button. | string           | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;role: "button"<br>}</code>      |
| rounded    | Enable rounded style                                     | boolean          | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;rounded: false<br>}</code>      |
| size       | Size of the control                                      | string           | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| tag        | Button tag name                                          | DynamicComponent | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)`        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;tag: "button"<br>}</code>       |
| variant    | Color variant of the control                             | string           | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                            |
| --------------------------------- | ---------------------------------- |
| $button-background-color          | $primary                           |
| $button-color                     | $primary-invert                    |
| $button-border-radius             | $base-border-radius                |
| $button-border                    | 1px solid $button-background-color |
| $button-box-shadow                | none                               |
| $button-font-weight               | 400                                |
| $button-line-height               | $base-line-height                  |
| $button-margin-icon-to-text       | 0.1875em                           |
| $button-margin                    | 0                                  |
| $button-height                    | $control-height                    |
| $button-padding                   | $control-padding-vertical 0.75em   |
| $button-rounded-border-radius     | $base-rounded-border-radius        |
| $button-disabled-opacity          | $base-disabled-opacity             |
| $button-outlined-background-color | transparent                        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_button.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                     | Default                            |
| --------------------------------- | ---------------------------------- |
| $button-background-color          | $primary                           |
| $button-color                     | $primary-invert                    |
| $button-border-radius             | $base-border-radius                |
| $button-border                    | 1px solid $button-background-color |
| $button-box-shadow                | none                               |
| $button-font-weight               | 400                                |
| $button-line-height               | $base-line-height                  |
| $button-margin-icon-to-text       | 0.1875em                           |
| $button-margin                    | 0                                  |
| $button-height                    | $control-height                    |
| $button-padding                   | $control-padding-vertical 0.75em   |
| $button-rounded-border-radius     | $base-rounded-border-radius        |
| $button-disabled-opacity          | $base-disabled-opacity             |
| $button-outlined-background-color | transparent                        |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_button.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable           | Default                       |
| ----------------------- | ----------------------------- |
| $btn-spacer             | 0.5rem                        |
| $btn-border-color       | var(--#{$prefix}border-color) |
| $btn-hover-border-color | var(--#{$prefix}border-color) |
| $btn-hover-box-shadow   | $box-shadow-sm                |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_button.scss)

</div>

</div>
