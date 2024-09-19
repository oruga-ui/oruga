---
sidebarDepth: 2
---

# Slider

<div class="vp-doc">

> A slider to select a value or range from a given range

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

> A slider to select a value or range from a given range

```html
<o-slider></o-slider>
```

### Props

| Prop name         | Description | Type | Values | Default                                                                                                                                                    |
| ----------------- | ----------- | ---- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaLabel         |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;ariaLabel: undefined<br>}</code>      |
| biggerSliderFocus |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| disabled          |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| format            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;format: "raw"<br>}</code>             |
| formatter         |             |      | -      |                                                                                                                                                            |
| indicator         |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| lazy              |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| locale            |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>{<br>&nbsp;&nbsp;locale: undefined<br>}</code>                 |
| max               |             |      | -      | <code style='white-space: nowrap; padding: 0;'>100</code>                                                                                                  |
| min               |             |      | -      | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                    |
| v-model           |             |      | -      |                                                                                                                                                            |
| override          |             |      | -      |                                                                                                                                                            |
| rounded           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;rounded: false<br>}</code>            |
| size              |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;size: undefined<br>}</code>           |
| step              |             |      | -      | <code style='white-space: nowrap; padding: 0;'>1</code>                                                                                                    |
| ticks             |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| tooltip           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;tooltip: true<br>}</code>             |
| tooltipAlways     |             |      | -      | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                |
| tooltipVariant    |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;tooltipVariant: undefined<br>}</code> |
| variant           |             |      | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>slider: {<br>&nbsp;&nbsp;variant: undefined<br>}</code>        |

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

| Prop name | Description                                | Type    | Values | Default                                                |
| --------- | ------------------------------------------ | ------- | ------ | ------------------------------------------------------ |
| label     | Tick label                                 | string  | -      |                                                        |
| override  | Override existing theme classes completely | boolean | -      |                                                        |
| value     | Value of single tick                       | number  | -      | <code style='white-space: nowrap; padding: 0;'></code> |

### Slots

| Name    | Description                                  | Bindings |
| ------- | -------------------------------------------- | -------- |
| default | Override tick content, default is label prop |          |

</div>

<div class="vp-doc">

</div>
<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                 | Default                                      |
| ----------------------------- | -------------------------------------------- |
| $slider-background            | transparent                                  |
| $slider-margin                | 1em 0                                        |
| $slider-mark-size             | 0.75rem                                      |
| $slider-font-size             | var(--#{$prefix}base-font-size)              |
| $slider-rounded-borded-radius | var( --#{$prefix}base-border-radius-rounded) |
| $slider-thumb-background      | var(--#{$prefix}white)                       |
| $slider-thumb-border          | 1px solid var(--#{$prefix}grey-light)        |
| $slider-thumb-radius          | var(--#{$prefix}base-border-radius)          |
| $slider-thumb-shadow          | none                                         |
| $slider-thumb-to-track-ratio  | 2                                            |
| $slider-thumb-transform       | scale(1.25)                                  |
| $slider-tick-background       | var(--#{$prefix}primary)                     |
| $slider-tick-radius           | var(--#{$prefix}base-border-radius)          |
| $slider-tick-to-track-ratio   | 0.5                                          |
| $slider-tick-width            | 3px                                          |
| $slider-track-background      | var(--#{$prefix}grey-lighter)                |
| $slider-fill-background       | var(--#{$prefix}primary)                     |
| $slider-track-border-radius   | var(--#{$prefix}base-border-radius)          |
| $slider-track-border          | 0px solid var(--#{$prefix}grey)              |
| $slider-track-disabled        | 0.5                                          |
| $slider-track-radius          | var(--#{$prefix}base-border-radius)          |
| $slider-track-shadow          | 0px 0px 0px var(--#{$prefix}grey)            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_slider.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                | Default                            |
| ---------------------------- | ---------------------------------- |
| $slider-colors               | var.$colors                        |
| $slider-radius               | css.getVar("radius")               |
| $slider-background           | css.getVar("grey-lighter")         |
| $slider-color                | css.getVar("primary")              |
| $slider-track-border         | 0px solid css.getVar("grey")       |
| $slider-track-shadow         | 0px 0px 0px css.getVar("grey")     |
| $slider-thumb-background     | css.getVar("scheme-main")          |
| $slider-thumb-radius         | css.getVar("radius")               |
| $slider-thumb-border         | 1px solid css.getVar("grey-light") |
| $slider-thumb-shadow         | none                               |
| $slider-thumb-to-track-ratio | 2                                  |
| $slider-tick-to-track-ratio  | 0.5                                |
| $slider-tick-width           | 3px                                |
| $slider-tick-radius          | css.getVar("radius")               |
| $slider-tick-background      | css.getVar("grey-light")           |
| $slider-tick-label-size      | 0.75rem                            |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_slider.scss)

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
