---
title: Slider
---

# Slider

<div class="vp-doc">

> A slider to select a value or range from a given range

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-slider />

</div>
<div class="vp-doc">

## Class props

<inspector-slider-viewer />

</div>

<div class="vp-doc">

## Slider Component

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

## SliderTick Component

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

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $slider-background | transparent !default |
| $slider-margin | 1em 0 !default |
| $slider-mark-size | 0.75rem !default |
| $slider-font-size | $base-font-size !default |
| $slider-rounded-borded-radius | $base-rounded-border-radius !default |
| $slider-thumb-background | $white !default |
| $slider-thumb-border | 1px solid $grey-light !default |
| $slider-thumb-radius | $base-border-radius !default |
| $slider-thumb-shadow | none !default |
| $slider-thumb-to-track-ratio | 2 !default |
| $slider-thumb-transform | scale(1.25) !default |
| $slider-tick-background | $primary !default |
| $slider-tick-radius | $base-border-radius !default |
| $slider-tick-to-track-ratio | 0.5 !default |
| $slider-tick-width | 3px !default |
| $slider-track-background | $grey-lighter !default |
| $slider-fill-background | $primary !default |
| $slider-track-border-radius | $base-border-radius !default |
| $slider-track-border | 0px solid $grey !default |
| $slider-track-disabled | 0.5 !default |
| $slider-track-radius | $base-border-radius !default |
| $slider-track-shadow | 0px 0px 0px $grey !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_slider.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $slider-background | transparent !default |
| $slider-margin | 1em 0 !default |
| $slider-mark-size | 0.75rem !default |
| $slider-font-size | $base-font-size !default |
| $slider-rounded-borded-radius | $base-rounded-border-radius !default |
| $slider-thumb-background | $white !default |
| $slider-thumb-border | 1px solid $grey-light !default |
| $slider-thumb-radius | $base-border-radius !default |
| $slider-thumb-shadow | none !default |
| $slider-thumb-to-track-ratio | 2 !default |
| $slider-thumb-transform | scale(1.25) !default |
| $slider-tick-background | $primary !default |
| $slider-tick-radius | $base-border-radius !default |
| $slider-tick-to-track-ratio | 0.5 !default |
| $slider-tick-width | 3px !default |
| $slider-track-background | $grey-lighter !default |
| $slider-fill-background | $primary !default |
| $slider-track-border-radius | $base-border-radius !default |
| $slider-track-border | 0px solid $grey !default |
| $slider-track-disabled | 0.5 !default |
| $slider-track-radius | $base-border-radius !default |
| $slider-track-shadow | 0px 0px 0px $grey !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_slider.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $slider-tick-width | 0.25rem !default |
| $slider-tick-height | 0.25rem !default |
| $slider-tick-radius | 50% !default |
| $slider-tick-bg | var(--#{$prefix}gray) !default |

📄 [Full scss file](https://github.com/oruga-ui/theme-bootstrap/tree/main/src/assets/scss/components/_slider.scss)

</div>

</div>
