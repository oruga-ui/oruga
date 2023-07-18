---
title: Tooltip
---

# Tooltip

<div class="vp-doc">

> Display a brief helper text to your user

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-tooltip />

</div>
<div class="vp-doc">

## Class props

<inspector-tooltip-viewer />

</div>

<div class="vp-doc">

## Tooltip Component

### Props

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
| position     | Tooltip position in relation to the element                                     | Position \| 'auto'  | `top`, `bottom`, `left`, `right`, ``                                            | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> tooltip: {<br>&nbsp;&nbsp;position: 'top'<br>}</code>     |
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

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $tooltip-arrow-margin | 2px !default |
| $tooltip-arrow-size | 5px !default |
| $tooltip-background-color | $primary !default |
| $tooltip-color | $primary-invert !default |
| $tooltip-content-box-shadow | 0px 1px 2px 1px rgba(0, 1, 0, 0.2) !default |
| $tooltip-content-font-size | 0.85rem !default |
| $tooltip-content-max-width | 300px !default |
| $tooltip-content-multiline-width | 300px !default |
| $tooltip-content-padding | 0.35rem 0.75rem !default |
| $tooltip-content-radius-large | 6px !default |
| $tooltip-content-weight-normal | 400 !default |
| $tooltip-content-zindex | 38 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tooltip.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $tooltip-arrow-margin | 2px !default |
| $tooltip-arrow-size | 5px !default |
| $tooltip-background-color | $primary !default |
| $tooltip-color | $primary-invert !default |
| $tooltip-content-box-shadow | 0px 1px 2px 1px rgba(0, 1, 0, 0.2) !default |
| $tooltip-content-font-size | 0.85rem !default |
| $tooltip-content-max-width | 300px !default |
| $tooltip-content-multiline-width | 300px !default |
| $tooltip-content-padding | 0.35rem 0.75rem !default |
| $tooltip-content-radius-large | 6px !default |
| $tooltip-content-weight-normal | 400 !default |
| $tooltip-content-zindex | 38 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_tooltip.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $tooltip-arrow-spacer | 2px !default |
| $tooltip-content-multiline-width | 50vw !default |
| $tooltip-shadow | $box-shadow-sm !default |
| $tooltip-zindex | $zindex-tooltip |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_tooltip.scss)

</div>

</div>
