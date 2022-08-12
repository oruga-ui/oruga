---
title: Carousel
---

# Carousel

> A Slideshow for cycling images in confined spaces

---

## Examples

 <example-carousel />

## Class props

<br />

<inspector-carousel-viewer />

<br />
<br />

## Props

| Prop name         | Description | Type    | Values | Default                                                                                                                                           |
| ----------------- | ----------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| arrow             |             | boolean | -      | true                                                                                                                                              |
| arrowHover        |             | boolean | -      | true                                                                                                                                              |
| asIndicator       |             | boolean | -      |                                                                                                                                                   |
| autoplay          |             | boolean | -      | false                                                                                                                                             |
| breakpoints       |             | object  | -      | {}                                                                                                                                                |
| hasDrag           |             | boolean | -      | true                                                                                                                                              |
| iconNext          |             | string  | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          |             | string  | -      |                                                                                                                                                   |
| iconPrev          |             | string  | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| iconSize          |             | string  | -      |                                                                                                                                                   |
| indicator         |             | boolean | -      | true                                                                                                                                              |
| indicatorInside   |             | boolean | -      | false                                                                                                                                             |
| indicatorMode     |             | string  | -      | 'click'                                                                                                                                           |
| indicatorPosition |             | string  | -      | 'bottom'                                                                                                                                          |
| indicatorStyle    |             | string  | -      | 'dots'                                                                                                                                            |
| interval          |             | number  | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;interval: 3500<br>}</code>            |
| itemsToList       |             | number  | -      | 1                                                                                                                                                 |
| itemsToShow       |             | number  | -      | 1                                                                                                                                                 |
| modelValue        |             | number  | -      | 0                                                                                                                                                 |
| overlay           |             | boolean | -      |                                                                                                                                                   |
| override          |             | boolean | -      |                                                                                                                                                   |
| pauseHover        |             | boolean | -      | false                                                                                                                                             |
| repeat            |             | boolean | -      | false                                                                                                                                             |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| scroll            |            |
| click             |            |

## Slots

| Name       | Description | Bindings        |
| ---------- | ----------- | --------------- |
| default    |             |                 |
| arrow      |             | <br/><br/><br/> |
| indicators |             | <br/><br/>      |
| indicator  |             |                 |
| overlay    |             |                 |

## Style

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/__carousel.scss.scss)

| CSS Variable                                  | SASS Variable                           | Default                               |
| --------------------------------------------- | --------------------------------------- | ------------------------------------- |
| --oruga-carousel-arrow-background             | \$carousel-arrow-background             | \$white                               |
| --oruga-carousel-arrow-color                  | \$carousel-arrow-color                  | \$primary                             |
| --oruga-carousel-arrow-icon-spaced            | \$carousel-arrow-icon-spaced            | 1.5rem                                |
| --oruga-carousel-arrow-top                    | \$carousel-arrow-top                    | 50%                                   |
| --oruga-carousel-arrow-size                   | \$carousel-arrow-size                   | 1.5rem                                |
| --oruga-carousel-arrow-border-radius          | \$carousel-arrow-border-radius          | \$base-rounded-border-radius          |
| --oruga-carousel-arrow-border                 | \$carousel-arrow-border                 | 1px solid \$carousel-arrow-background |
| --oruga-carousel-arrow-transition             | \$carousel-arrow-transition             | $speed-slow $easing                   |
| --oruga-carousel-indicators-background        | \$carousel-indicators-background        | rgba(\$white , 0.50)                  |
| --oruga-carousel-indicators-padding           | \$carousel-indicators-padding           | .5rem                                 |
| --oruga-carousel-indicator-margin             | \$carousel-indicator-margin             | 0 .5rem 0 0                           |
| --oruga-carousel-indicator-color              | \$carousel-indicator-color              | \$primary                             |
| --oruga-carousel-indicator-background         | \$carousel-indicator-background         | \$white                               |
| --oruga-carousel-indicator-border             | \$carousel-indicator-border             | 1px solid \$carousel-indicator-color  |
| --oruga-carousel-indicator-active-background  | \$carousel-indicator-active-background  | \$carousel-indicator-color            |
| --oruga-carousel-indicator-active-border      | \$carousel-indicator-active-border      | 1px solid \$carousel-indicator-color  |
| --oruga-carousel-indicator-transition         | \$carousel-indicator-transition         | $speed-slow $easing                   |
| --oruga-carousel-indicator-size               | \$carousel-indicator-size               | 10px                                  |
| --oruga-carousel-indicator-dots-border-radius | \$carousel-indicator-dots-border-radius | \$base-border-radius                  |
| --oruga-carousel-indicator-lines-height       | \$carousel-indicator-lines-height       | 5px                                   |
| --oruga-carousel-indicator-lines-width        | \$carousel-indicator-lines-width        | 25px                                  |
| --oruga-carousel-items-transition             | \$carousel-items-transition             | all \$speed-slower ease-out 0s        |
| --oruga-carousel-item-border                  | \$carousel-item-border                  | 2px solid transparent                 |
| --oruga-carousel-overlay-background           | \$carousel-overlay-background           | hsla(0,0%,4%,.86)                     |
| --oruga-carousel-overlay-zindex               | \$carousel-overlay-zindex               | 40                                    |
