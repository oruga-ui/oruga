---
title: Slider
---

# Slider

<div class="vp-doc">

> A slider to select a value or range from a given range

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-slider />

</div>
<div class="vp-example">

## Class props

<inspector-slider-viewer />

</div>

<div class="vp-doc">

## Slider component

```html
<o-slider></o-slider>
```

### Props

| Prop name         | Description                                      | Type          | Values                                                                          | Default                                                                                                                                          |
| ----------------- | ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| ariaLabel         |                                                  | string\|array | -                                                                               |                                                                                                                                                  |
| biggerSliderFocus | Increases slider size on focus                   | boolean       | -                                                                               | false                                                                                                                                            |
| customFormatter   | Function to format the tooltip label for display | func          | -                                                                               |                                                                                                                                                  |
| disabled          |                                                  | boolean       | -                                                                               | false                                                                                                                                            |
| format            |                                                  | string        | -                                                                               | 'raw'                                                                                                                                            |
| indicator         |                                                  | boolean       | -                                                                               | false                                                                                                                                            |
| lazy              | Update v-model only when dragging is finished    | boolean       | -                                                                               | false                                                                                                                                            |
| locale            |                                                  | string\|array | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp; locale: undefined<br>}</code>      |
| max               | Maximum value                                    | number        | -                                                                               | 100                                                                                                                                              |
| min               | Minimum value                                    | number        | -                                                                               | 0                                                                                                                                                |
| override          |                                                  | boolean       | -                                                                               |                                                                                                                                                  |
| rounded           | Rounded thumb                                    | boolean       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> slider: {<br>&nbsp;&nbsp;rounded: false<br>}</code> |
| size              | Vertical size of slider, optional                | string        | `small`, `medium`, `large`                                                      |                                                                                                                                                  |
| step              | Step interval of ticks                           | number        | -                                                                               | 1                                                                                                                                                |
| ticks             | Show tick marks                                  | boolean       | -                                                                               | false                                                                                                                                            |
| tooltip           | Show tooltip when thumb is being dragged         | boolean       | -                                                                               | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> slider: {<br>&nbsp;&nbsp;tooltip: true<br>}</code>  |
| tooltipAlways     | Tooltip displays always                          | boolean       | -                                                                               | false                                                                                                                                            |
| tooltipVariant    | Color of the tooltip                             | string        | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                  |
| v-model           |                                                  | number\|array | -                                                                               | 0                                                                                                                                                |
| variant           | Color of the slider                              | string        | `primary`, `info`, `success`, `warning`, `danger`, `and any other custom color` |                                                                                                                                                  |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| change            |            |
| dragging          |            |
| dragstart         |            |
| dragend           |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

## SliderTick component

```html
<o-slider-tick></o-slider-tick>
```

### Props

| Prop name | Description          | Type    | Values | Default |
| --------- | -------------------- | ------- | ------ | ------- |
| override  |                      | boolean | -      |         |
| value     | Value of single tick | number  | -      | 0       |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                     |
| ----------------------------- | --------------------------- |
| $slider-background            | transparent                 |
| $slider-margin                | 1em 0                       |
| $slider-mark-size             | 0.75rem                     |
| $slider-font-size             | $base-font-size             |
| $slider-rounded-borded-radius | $base-rounded-border-radius |
| $slider-thumb-background      | $white                      |
| $slider-thumb-border          | 1px solid $grey-light       |
| $slider-thumb-radius          | $base-border-radius         |
| $slider-thumb-shadow          | none                        |
| $slider-thumb-to-track-ratio  | 2                           |
| $slider-thumb-transform       | scale(1.25)                 |
| $slider-tick-background       | $primary                    |
| $slider-tick-radius           | $base-border-radius         |
| $slider-tick-to-track-ratio   | 0.5                         |
| $slider-tick-width            | 3px                         |
| $slider-track-background      | $grey-lighter               |
| $slider-fill-background       | $primary                    |
| $slider-track-border-radius   | $base-border-radius         |
| $slider-track-border          | 0px solid $grey             |
| $slider-track-disabled        | 0.5                         |
| $slider-track-radius          | $base-border-radius         |
| $slider-track-shadow          | 0px 0px 0px $grey           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_slider.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                     |
| ----------------------------- | --------------------------- |
| $slider-background            | transparent                 |
| $slider-margin                | 1em 0                       |
| $slider-mark-size             | 0.75rem                     |
| $slider-font-size             | $base-font-size             |
| $slider-rounded-borded-radius | $base-rounded-border-radius |
| $slider-thumb-background      | $white                      |
| $slider-thumb-border          | 1px solid $grey-light       |
| $slider-thumb-radius          | $base-border-radius         |
| $slider-thumb-shadow          | none                        |
| $slider-thumb-to-track-ratio  | 2                           |
| $slider-thumb-transform       | scale(1.25)                 |
| $slider-tick-background       | $primary                    |
| $slider-tick-radius           | $base-border-radius         |
| $slider-tick-to-track-ratio   | 0.5                         |
| $slider-tick-width            | 3px                         |
| $slider-track-background      | $grey-lighter               |
| $slider-fill-background       | $primary                    |
| $slider-track-border-radius   | $base-border-radius         |
| $slider-track-border          | 0px solid $grey             |
| $slider-track-disabled        | 0.5                         |
| $slider-track-radius          | $base-border-radius         |
| $slider-track-shadow          | 0px 0px 0px $grey           |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_slider.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

| SASS Variable       | Default               |
| ------------------- | --------------------- |
| $slider-tick-width  | 0.25rem               |
| $slider-tick-height | 0.25rem               |
| $slider-tick-radius | 50%                   |
| $slider-tick-bg     | var(--#{$prefix}gray) |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_slider.scss)

</div>

</div>
