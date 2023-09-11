---
title: Carousel
---

# Carousel

<div class="vp-doc">

> A Slideshow for cycling images in confined spaces

<Carbon />
</div>

<div class="vp-example">

## Examples

<example-carousel />

</div>
<div class="vp-example">

## Class props

<inspector-carousel-viewer />

</div>

<div class="vp-doc">

## Carousel component

```html
<o-carousel></o-carousel>
```

### Props

| Prop name         | Description | Type    | Values | Default                                                                                                                                                       |
| ----------------- | ----------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arrow             |             | boolean | -      | true                                                                                                                                                          |
| arrowHover        |             | boolean | -      | true                                                                                                                                                          |
| asIndicator       |             | boolean | -      |                                                                                                                                                               |
| autoplay          |             | boolean | -      | false                                                                                                                                                         |
| breakpoints       |             | object  | -      | {}                                                                                                                                                            |
| hasDrag           |             | boolean | -      | true                                                                                                                                                          |
| iconNext          |             | string  | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          |             | string  | -      |                                                                                                                                                               |
| iconPrev          |             | string  | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| iconSize          |             | string  | -      |                                                                                                                                                               |
| indicator         |             | boolean | -      | true                                                                                                                                                          |
| indicatorInside   |             | boolean | -      | false                                                                                                                                                         |
| indicatorMode     |             | string  | -      | 'click'                                                                                                                                                       |
| indicatorPosition |             | string  | -      | 'bottom'                                                                                                                                                      |
| indicatorStyle    |             | string  | -      | 'dots'                                                                                                                                                        |
| interval          |             | number  | -      | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;interval: 3500<br>}</code>            |
| itemsToList       |             | number  | -      | 1                                                                                                                                                             |
| itemsToShow       |             | number  | -      | 1                                                                                                                                                             |
| modelValue        |             | number  | -      | 0                                                                                                                                                             |
| overlay           |             | boolean | -      |                                                                                                                                                               |
| override          |             | boolean | -      |                                                                                                                                                               |
| pauseHover        |             | boolean | -      | false                                                                                                                                                         |
| repeat            |             | boolean | -      | false                                                                                                                                                         |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| scroll            |            |
| click             |            |

### Slots

| Name       | Description | Bindings        |
| ---------- | ----------- | --------------- |
| default    |             |                 |
| arrow      |             | <br/><br/><br/> |
| indicators |             | <br/><br/>      |
| indicator  |             |                 |
| overlay    |             |                 |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-orugabase">

> Current theme ➜ _[Oruga Base](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                              |
| -------------------------------------- | ------------------------------------ |
| $carousel-arrow-background             | $white                               |
| $carousel-arrow-color                  | $primary                             |
| $carousel-arrow-icon-spaced            | 1.5rem                               |
| $carousel-arrow-top                    | 50%                                  |
| $carousel-arrow-size                   | 1.5rem                               |
| $carousel-arrow-border-radius          | $base-rounded-border-radius          |
| $carousel-arrow-border                 | 1px solid $carousel-arrow-background |
| $carousel-arrow-transition             | $speed-slow $easing                  |
| $carousel-indicators-background        | rgba($white, 0.5)                    |
| $carousel-indicators-padding           | 0.5rem                               |
| $carousel-indicator-margin             | 0 0.5rem 0 0                         |
| $carousel-indicator-color              | $primary                             |
| $carousel-indicator-background         | $white                               |
| $carousel-indicator-border             | 1px solid $carousel-indicator-color  |
| $carousel-indicator-active-background  | $carousel-indicator-color            |
| $carousel-indicator-active-border      | 1px solid $carousel-indicator-color  |
| $carousel-indicator-transition         | $speed-slow $easing                  |
| $carousel-indicator-size               | 10px                                 |
| $carousel-indicator-dots-border-radius | $base-border-radius                  |
| $carousel-indicator-lines-height       | 5px                                  |
| $carousel-indicator-lines-width        | 25px                                 |
| $carousel-items-transition             | all $speed-slower ease-out 0s        |
| $carousel-item-border                  | 2px solid transparent                |
| $carousel-overlay-background           | hsla(0, 0%, 4%, 0.86)                |
| $carousel-overlay-zindex               | 40                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_carousel.scss)

</div><div class="theme-orugafull">

> Current theme ➜ _[Oruga Full](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                              |
| -------------------------------------- | ------------------------------------ |
| $carousel-arrow-background             | $white                               |
| $carousel-arrow-color                  | $primary                             |
| $carousel-arrow-icon-spaced            | 1.5rem                               |
| $carousel-arrow-top                    | 50%                                  |
| $carousel-arrow-size                   | 1.5rem                               |
| $carousel-arrow-border-radius          | $base-rounded-border-radius          |
| $carousel-arrow-border                 | 1px solid $carousel-arrow-background |
| $carousel-arrow-transition             | $speed-slow $easing                  |
| $carousel-indicators-background        | rgba($white, 0.5)                    |
| $carousel-indicators-padding           | 0.5rem                               |
| $carousel-indicator-margin             | 0 0.5rem 0 0                         |
| $carousel-indicator-color              | $primary                             |
| $carousel-indicator-background         | $white                               |
| $carousel-indicator-border             | 1px solid $carousel-indicator-color  |
| $carousel-indicator-active-background  | $carousel-indicator-color            |
| $carousel-indicator-active-border      | 1px solid $carousel-indicator-color  |
| $carousel-indicator-transition         | $speed-slow $easing                  |
| $carousel-indicator-size               | 10px                                 |
| $carousel-indicator-dots-border-radius | $base-border-radius                  |
| $carousel-indicator-lines-height       | 5px                                  |
| $carousel-indicator-lines-width        | 25px                                 |
| $carousel-items-transition             | all $speed-slower ease-out 0s        |
| $carousel-item-border                  | 2px solid transparent                |
| $carousel-overlay-background           | hsla(0, 0%, 4%, 0.86)                |
| $carousel-overlay-zindex               | 40                                   |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_carousel.scss)

</div><div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

<p>The theme does not have any custom variables for this component.</p>
</div><div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>
