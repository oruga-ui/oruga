---
title: Slider
---

# Slider

<div class="vp-doc">

> A slider to select a value or range from a given range

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">

## Class props

inspector-Slider-viewer /
Slider

</div>

<div class="vp-doc">

## Slider component

> A slider to select a value or range from a given range

```html
<o-slider></o-slider>
```

### Props

| Prop name         | Description                                                           | Type               | Values                                                                          | Default                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel         | Accessibility aria-label to to be passed to the slider thumb element. | string \| string[] | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;ariaLabel: undefined<br>}</code>      |
| biggerSliderFocus | Increases slider size on focus                                        | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| customFormatter   | Function to format the tooltip label for display                      | func               | -                                                                               |                                                                                                                                                            |
| disabled          | Slider will be disabled                                               | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| format            | Define v-model format                                                 | string             | `row`, `percent`                                                                | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;format: "raw"<br>}</code>             |
| indicator         | Show indicators                                                       | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| lazy              | Update v-model only when dragging is finished                         | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| locale            | Date format locale                                                    | string \| string[] | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>                 |
| max               | Maximum value                                                         | number             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>100</code>                                                                                                  |
| min               | Minimum value                                                         | number             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                    |
| rounded           | Rounded thumb                                                         | boolean            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;rounded: false<br>}</code>            |
| size              | Vertical size of slider                                               | string             | `small`, `medium`, `large`                                                      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| step              | Step interval of ticks                                                | number             | -                                                                               | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                    |
| ticks             | Show tick marks                                                       | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| tooltip           | Show tooltip when thumb is being dragged                              | boolean            | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;tooltip: true<br>}</code>             |
| tooltipAlways     | Tooltip displays always                                               | boolean            | -                                                                               | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| tooltipVariant    | Color of the tooltip                                                  | string             | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;tooltipVariant: undefined<br>}</code> |
| v-model           |                                                                       | number \| number[] | -                                                                               | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                    |
| variant           | Color of the slider                                                   | string             | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

### Events

| Event name        | Properties                                               | Description                     |
| ----------------- | -------------------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `number \| number[]` - updated modelValue prop | modelValue prop two-way binding |
| change            | **value** `number \| number[]` - updated modelValue prop | on value change event           |
| dragging          | **value** `number \| number[]` - updated modelValue prop | on dragging event               |
| dragstart         |                                                          | on drag start event             |
| dragend           |                                                          | on drag end event               |

### Slots

| Name    | Description                         | Bindings |
| ------- | ----------------------------------- | -------- |
| default | Define additional slider ticks here |          |

</div>

<div class="vp-doc">

## SliderTick component

```html
<o-slider-tick></o-slider-tick>
```

### Props

| Prop name | Description          | Type   | Values | Default                                                |
| --------- | -------------------- | ------ | ------ | ------------------------------------------------------ |
| label     | Tick label           | string | -      |                                                        |
| value     | Value of single tick | number | -      | <code style='white-space: nowrap; padding: 0;'></code> |

### Slots

| Name    | Description                                  | Bindings |
| ------- | -------------------------------------------- | -------- |
| default | Override tick content, default is label prop |          |

</div>

<div class="vp-doc">
</div>
<div class="vp-doc">
</div>
