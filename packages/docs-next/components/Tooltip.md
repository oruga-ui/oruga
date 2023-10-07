---
title: Tooltip
---

# Tooltip

<div class="vp-doc">

> Display a brief helper text to your user

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-tooltip />

</div>
<div class="vp-example">

## Class props

<inspector-tooltip-viewer />

</div>

<div class="vp-doc">

## Tooltip component

```html
<o-tooltip></o-tooltip>
```

### Props

| Prop name    | Description                                                                     | Type                | Values                                                                          | Default                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| active       | Whether tooltip is active or not, use v-model:active to make it two-way binding | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                              |
| always       | Tooltip will be always active                                                   | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                  |
| animated     | Tooltip will have an animation                                                  | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                              |
| animation    | Tooltip default animation                                                       | string              | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;animation: "fade", <br>}</code>   |
| appendToBody | Append tooltip content to body                                                  | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                  |
| autoClose    | Tooltip auto close options                                                      | array\|boolean      | `true`, `false`, `'inside'`, `'outside'`                                        | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                              |
| delay        | Tooltip delay before it appears (number in ms)                                  | number              | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                  |
| label        | Tooltip text                                                                    | string              | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                  |
| multiline    | Tooltip will be multilined                                                      | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                  |
| override     |                                                                                 | boolean             | -                                                                               | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                  |
| position     | Tooltip position in relation to the element                                     | Position \| "auto"  | `top`, `bottom`, `left`, `right`, ``                                            | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;position: "top"<br>}</code>       |
| triggers     | Tooltip trigger events                                                          | array               | `hover`, `click`, `focus`, `contextmenu`                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;triggers: [ "hover",]<br>}</code> |
| variant      | Color of the tooltip                                                            | string\|func\|array | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <code style='white-space: nowrap; padding: 0;'></code>                                                                                                  |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| open       |            |
| close      |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| content |             |          |
| default |             |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                    | Default                            |
| -------------------------------- | ---------------------------------- |
| $tooltip-arrow-margin            | 2px                                |
| $tooltip-arrow-size              | 5px                                |
| $tooltip-background-color        | $primary                           |
| $tooltip-color                   | $primary-invert                    |
| $tooltip-content-box-shadow      | 0px 1px 2px 1px rgba(0, 1, 0, 0.2) |
| $tooltip-content-font-size       | 0.85rem                            |
| $tooltip-content-max-width       | 300px                              |
| $tooltip-content-multiline-width | 300px                              |
| $tooltip-content-padding         | 0.35rem 0.75rem                    |
| $tooltip-content-radius-large    | 6px                                |
| $tooltip-content-weight-normal   | 400                                |
| $tooltip-content-zindex          | 38                                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tooltip.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                    | Default                            |
| -------------------------------- | ---------------------------------- |
| $tooltip-arrow-margin            | 2px                                |
| $tooltip-arrow-size              | 5px                                |
| $tooltip-background-color        | $primary                           |
| $tooltip-color                   | $primary-invert                    |
| $tooltip-content-box-shadow      | 0px 1px 2px 1px rgba(0, 1, 0, 0.2) |
| $tooltip-content-font-size       | 0.85rem                            |
| $tooltip-content-max-width       | 300px                              |
| $tooltip-content-multiline-width | 300px                              |
| $tooltip-content-padding         | 0.35rem 0.75rem                    |
| $tooltip-content-radius-large    | 6px                                |
| $tooltip-content-weight-normal   | 400                                |
| $tooltip-content-zindex          | 38                                 |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_tooltip.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable                    | Default         |
| -------------------------------- | --------------- |
| $tooltip-arrow-spacer            | 2px             |
| $tooltip-content-multiline-width | 50vw            |
| $tooltip-shadow                  | $box-shadow-sm  |
| $tooltip-zindex                  | $zindex-tooltip |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_tooltip.scss)

</div>

</div>
