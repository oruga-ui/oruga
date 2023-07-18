---
title: Button
---

# Button

<div class="vp-doc">

> The classic button, in different colors, sizes, and states

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-button />

</div>
<div class="vp-doc">

## Class props

<inspector-button-viewer />

</div>

<div class="vp-doc">

## Button Component

### Props

| Prop name  | Description                              | Type                | Values                                                                          | Default                                                                                                                                          |
| ---------- | ---------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| disabled   | Button will be disabled                  | boolean             | -                                                                               |                                                                                                                                                  |
| expanded   | Button will be expanded (full-width)     | boolean             | -                                                                               |                                                                                                                                                  |
| iconBoth   |                                          | boolean             | -                                                                               |                                                                                                                                                  |
| iconLeft   | Icon name to show on the left            | string              | -                                                                               |                                                                                                                                                  |
| iconPack   | Icon pack to use                         | string              | `mdi`, `fa`, `fas and any other custom icon pack`                               |                                                                                                                                                  |
| iconRight  | Icon name to show on the right           | string              | -                                                                               |                                                                                                                                                  |
| inverted   |                                          | boolean             | -                                                                               |                                                                                                                                                  |
| label      | Button label, optional when default slot | string              | -                                                                               |                                                                                                                                                  |
| loading    | Loading style                            | boolean             | -                                                                               |                                                                                                                                                  |
| nativeType | Button type, like native                 | string              | -                                                                               | 'button'                                                                                                                                         |
| outlined   | Outlined style                           | boolean             | -                                                                               |                                                                                                                                                  |
| override   |                                          | boolean             | -                                                                               |                                                                                                                                                  |
| rounded    | Rounded style                            | boolean             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> button: {<br>&nbsp;&nbsp;rounded: false<br>}</code> |
| size       | Size of button, optional                 | string              | `small`, `medium`, `large`                                                      |                                                                                                                                                  |
| tag        | Button tag name                          | string \| Component | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)`        | 'button'                                                                                                                                         |
| variant    | Color of the control, optional           | string              | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                  |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $button-background-color | $primary !default |
| $button-color | $primary-invert !default |
| $button-border-radius | $base-border-radius !default |
| $button-border | 1px solid $button-background-color !default |
| $button-box-shadow | none !default |
| $button-font-weight | 400 !default |
| $button-line-height | $base-line-height !default |
| $button-margin-icon-to-text | .1875em !default |
| $button-margin | 0 !default |
| $button-height | $control-height !default |
| $button-padding | $control-padding-vertical .75em !default |
| $button-rounded-border-radius | $base-rounded-border-radius !default |
| $button-disabled-opacity | $base-disabled-opacity !default |
| $button-outlined-background-color | transparent !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_button.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $button-background-color | $primary !default |
| $button-color | $primary-invert !default |
| $button-border-radius | $base-border-radius !default |
| $button-border | 1px solid $button-background-color !default |
| $button-box-shadow | none !default |
| $button-font-weight | 400 !default |
| $button-line-height | $base-line-height !default |
| $button-margin-icon-to-text | .1875em !default |
| $button-margin | 0 !default |
| $button-height | $control-height !default |
| $button-padding | $control-padding-vertical .75em !default |
| $button-rounded-border-radius | $base-rounded-border-radius !default |
| $button-disabled-opacity | $base-disabled-opacity !default |
| $button-outlined-background-color | transparent !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_button.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $btn-spacer | 0.5rem !default |
| $btn-border-color | var(--#{$prefix}border-color) |
| $btn-hover-border-color | var(--#{$prefix}border-color) |
| $btn-hover-box-shadow | $box-shadow-sm !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_button.scss)

</div>

</div>
