---
title: Tooltip
---

# Tooltip

> Display a brief helper text to your user

> <CarbonAds />

---

## Examples

 <example-tooltip />

## Class props

<br />

<inspector-tooltip-viewer />

<br />
<br />

## Props

| Prop name    | Description                                                                     | Type                | Values                                                                          | Default                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| active       | Whether tooltip is active or not, use v-model:active to make it two-way binding | boolean             | -                                                                               | true                                                                                                                                       |
| always       | Tooltip will be always active                                                   | boolean             | -                                                                               |                                                                                                                                            |
| animated     | Tooltip will have an animation                                                  | boolean             | -                                                                               | true                                                                                                                                       |
| animation    | Tooltip default animation                                                       | string              | -                                                                               | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tooltip: {<br>&nbsp;&nbsp;animation: 'fade'<br>}</code>   |
| appendToBody | Append tooltip content to body                                                  | boolean             | -                                                                               |                                                                                                                                            |
| autoClose    | Tooltip auto close options                                                      | array\|boolean      | `true`, `false`, `'inside'`, `'outside'`                                        | true                                                                                                                                       |
| delay        | Tooltip delay before it appears (number in ms)                                  | number              | -                                                                               |                                                                                                                                            |
| label        | Tooltip text                                                                    | string              | -                                                                               |                                                                                                                                            |
| multiline    | Tooltip will be multilined                                                      | boolean             | -                                                                               |                                                                                                                                            |
| override     |                                                                                 | boolean             | -                                                                               |                                                                                                                                            |
| position     | Tooltip position in relation to the element                                     | string              | `top`, `bottom`, `left`, `right`                                                | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tooltip: {<br>&nbsp;&nbsp;position: 'top'<br>}</code>     |
| triggers     | Tooltip trigger events                                                          | array               | `hover`, `click`, `focus`, `contextmenu`                                        | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tooltip: {<br>&nbsp;&nbsp;triggers: ['hover']<br>}</code> |
| variant      | Color of the tooltip                                                            | string\|func\|array | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                            |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| open       |            |
| close      |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| content |             |          |
| default |             |          |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__tooltip.scss.scss)

| CSS Variable                            | SASS Variable                     | Default                            |
| --------------------------------------- | --------------------------------- | ---------------------------------- |
| --oruga-tooltip-arrow-margin            | \$tooltip-arrow-margin            | 2px                                |
| --oruga-tooltip-arrow-size              | \$tooltip-arrow-size              | 5px                                |
| --oruga-tooltip-background-color        | \$tooltip-background-color        | \$primary                          |
| --oruga-tooltip-color                   | \$tooltip-color                   | \$primary-invert                   |
| --oruga-tooltip-content-box-shadow      | \$tooltip-content-box-shadow      | 0px 1px 2px 1px rgba(0, 1, 0, 0.2) |
| --oruga-tooltip-content-font-size       | \$tooltip-content-font-size       | 0.85rem                            |
| --oruga-tooltip-content-max-width       | \$tooltip-content-max-width       | 300px                              |
| --oruga-tooltip-content-multiline-width | \$tooltip-content-multiline-width | 300px                              |
| --oruga-tooltip-content-padding         | \$tooltip-content-padding         | 0.35rem 0.75rem                    |
| --oruga-tooltip-content-radius-large    | \$tooltip-content-radius-large    | 6px                                |
| --oruga-tooltip-content-weight-normal   | \$tooltip-content-weight-normal   | 400                                |
| --oruga-tooltip-content-zindex          | \$tooltip-content-zindex          | 38                                 |
