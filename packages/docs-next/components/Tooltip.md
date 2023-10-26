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

> Display a brief helper text to your user

```html
<o-tooltip></o-tooltip>
```

### Props

| Prop name    | Description                                                                     | Type                | Values                                                                                    | Default                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| active       | Whether tooltip is active or not, use v-model:active to make it two-way binding | boolean             | -                                                                                         | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| always       | Tooltip will be always active                                                   | boolean             | -                                                                                         | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| animation    | Tooltip default animation                                                       | string              | -                                                                                         | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;animation: "fade"<br>}</code>   |
| appendToBody | Append tooltip content to body                                                  | boolean             | -                                                                                         | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| autoClose    | Tooltip auto close options                                                      | string[] \| boolean | `true`, `false`, `'inside'`, `'outside'`, `'escape'`                                      | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                            |
| delay        | Tooltip delay before it appears (number in ms)                                  | number              | -                                                                                         |                                                                                                                                                       |
| disabled     | Tooltip will be disabled                                                        | boolean             | -                                                                                         | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| label        | Tooltip text, unnecessary when content slot is used                             | string              | -                                                                                         |                                                                                                                                                       |
| multiline    | Tooltip will be multilined                                                      | boolean             | -                                                                                         | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                           |
| position     | Tooltip position in relation to the element                                     | Position \| "auto"  | `'top'`, `'bottom'`, `'left'`, `'right'`, `'auto'`                                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;position: "top"<br>}</code>     |
| triggers     | Tooltip trigger events                                                          | string[]            | `'hover'`, `'click'`, `'focus'`, `'contextmenu'`                                          | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;triggers: ["hover"]<br>}</code> |
| variant      | Color of the tooltip                                                            | string              | `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>tooltip: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>  |

### Events

| Event name    | Properties                                | Description                     |
| ------------- | ----------------------------------------- | ------------------------------- |
| update:active | **value** `boolean` - updated active prop | active prop two-way binding     |
| close         |                                           | on active change to false event |
| open          |                                           | on active change to true event  |

### Slots

| Name    | Description                            | Bindings |
| ------- | -------------------------------------- | -------- |
| content | Tooltip content, prop label is default |          |
| default | Tooltip trigger slot                   |          |

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
