---
title: Carousel
---

# Carousel

<div class="vp-doc">

> A Slideshow for cycling images in confined spaces

<Carbon />
</div>

<div class="vp-doc">

## Examples

<example-carousel />

</div>
<div class="vp-doc">

## Class props

<inspector-carousel-viewer />

</div>

<div class="vp-doc">

## Carousel Component

### Props

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

</div>
<div class="vp-doc">

## Theme Styles

<div class="theme-orugabase">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $carousel-arrow-background | $white !default |
| $carousel-arrow-color | $primary !default |
| $carousel-arrow-icon-spaced | 1.5rem !default |
| $carousel-arrow-top | 50% !default |
| $carousel-arrow-size | 1.5rem !default |
| $carousel-arrow-border-radius | $base-rounded-border-radius !default |
| $carousel-arrow-border | 1px solid $carousel-arrow-background !default |
| $carousel-arrow-transition | $speed-slow $easing !default |
| $carousel-indicators-background | rgba($white , 0.50) !default |
| $carousel-indicators-padding | .5rem !default |
| $carousel-indicator-margin | 0 .5rem 0 0 !default |
| $carousel-indicator-color | $primary !default |
| $carousel-indicator-background | $white !default |
| $carousel-indicator-border | 1px solid $carousel-indicator-color !default |
| $carousel-indicator-active-background | $carousel-indicator-color !default |
| $carousel-indicator-active-border | 1px solid $carousel-indicator-color !default |
| $carousel-indicator-transition | $speed-slow $easing !default |
| $carousel-indicator-size | 10px !default |
| $carousel-indicator-dots-border-radius | $base-border-radius !default |
| $carousel-indicator-lines-height | 5px !default |
| $carousel-indicator-lines-width | 25px !default |
| $carousel-items-transition | all $speed-slower ease-out 0s !default |
| $carousel-item-border | 2px solid transparent !default |
| $carousel-overlay-background | hsla(0,0%,4%,.86) !default |
| $carousel-overlay-zindex | 40 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_carousel.scss)

</div>

<div class="theme-orugafull">
 
| SASS Variable  | Default |
| -------------- | ------- |
| $carousel-arrow-background | $white !default |
| $carousel-arrow-color | $primary !default |
| $carousel-arrow-icon-spaced | 1.5rem !default |
| $carousel-arrow-top | 50% !default |
| $carousel-arrow-size | 1.5rem !default |
| $carousel-arrow-border-radius | $base-rounded-border-radius !default |
| $carousel-arrow-border | 1px solid $carousel-arrow-background !default |
| $carousel-arrow-transition | $speed-slow $easing !default |
| $carousel-indicators-background | rgba($white , 0.50) !default |
| $carousel-indicators-padding | .5rem !default |
| $carousel-indicator-margin | 0 .5rem 0 0 !default |
| $carousel-indicator-color | $primary !default |
| $carousel-indicator-background | $white !default |
| $carousel-indicator-border | 1px solid $carousel-indicator-color !default |
| $carousel-indicator-active-background | $carousel-indicator-color !default |
| $carousel-indicator-active-border | 1px solid $carousel-indicator-color !default |
| $carousel-indicator-transition | $speed-slow $easing !default |
| $carousel-indicator-size | 10px !default |
| $carousel-indicator-dots-border-radius | $base-border-radius !default |
| $carousel-indicator-lines-height | 5px !default |
| $carousel-indicator-lines-width | 25px !default |
| $carousel-items-transition | all $speed-slower ease-out 0s !default |
| $carousel-item-border | 2px solid transparent !default |
| $carousel-overlay-background | hsla(0,0%,4%,.86) !default |
| $carousel-overlay-zindex | 40 !default |

📄 [Full scss file](https://github.com/oruga-ui/oruga/blob/master/packages/oruga/src/scss/components/_carousel.scss)

</div>

<div class="theme-bulma">

<p> This component does not have any Oruga style overrides for the Bulma Theme. </p>
      
</div>

<div class="theme-bootstrap">

<p> This component does not have any Oruga style overrides for the Bootstrap Theme. </p>
      
</div>

</div>
