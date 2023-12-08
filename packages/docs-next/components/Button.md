---
title: Button
---

# Button

<div class="vp-doc">

> The classic button, in different colors, sizes, and states

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-button />

</div>
<div class="vp-example">

## Class props

inspector-Button-viewer /
Button

</div>

<div class="vp-doc">

## Button component

> The classic button, in different colors, sizes, and states

```html
<o-button></o-button>
```

### Props

| Prop name  | Description                                              | Type                | Values                                                                          | Default                                                                                                                                              |
| ---------- | -------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled   | Button will be disabled                                  | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| expanded   | Button will be expanded (full-width)                     | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| iconLeft   | Icon name to show on the left                            | string              | -                                                                               |                                                                                                                                                      |
| iconPack   | Icon pack to use                                         | string              | `mdi`, `fa`, `fas and any other custom icon pack`                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code> |
| iconRight  | Icon name to show on the right                           | string              | -                                                                               |                                                                                                                                                      |
| inverted   | Enable inverted style                                    | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| label      | Button label, unnecessary when default slot is used      | string              | -                                                                               |                                                                                                                                                      |
| loading    | Enable loading style                                     | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| nativeType | Button type, like native                                 | string              | -                                                                               | <code style='white-space: nowrap; padding: 0;'>"button"</code>                                                                                       |
| outlined   | Enable outlined style                                    | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                          |
| role       | Accessibility Role attribute to be passed to the button. | string              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;role: "button"<br>}</code>      |
| rounded    | Enable rounded style                                     | boolean             | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;rounded: false<br>}</code>      |
| size       | Size of the control                                      | string              | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;size: undefined<br>}</code>     |
| tag        | Button tag name                                          | string \| Component | `button`, `a`, `input`, `router-link`, `nuxt-link (or other nuxt alias)`        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;tag: "button"<br>}</code>       |
| variant    | Color variant of the control                             | string              | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>button: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Slots

| Name    | Description                               | Bindings |
| ------- | ----------------------------------------- | -------- |
| default | Override the label, default is label prop |          |

</div>

<div class="vp-doc">
</div>
