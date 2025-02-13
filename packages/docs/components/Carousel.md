---
sidebarDepth: 2
---

# Carousel

<div class="vp-doc">

The **Carousel** component is a slideshow for cycling through a set of elements — images or text like - a carousel, referred to as slides, by sequentially displaying a subset of one or more slides.
One slide is displayed at a time, and users can activate a next or previous slide control that hides the current slide and "rotates" the next or previous slide into view.
The component implements the W3C ARIA APG [Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

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

> A Slideshow for cycling images in confined spaces.

```html
<o-carousel></o-carousel>
```

### Props

| Prop name               | Description                                       | Type                      | Values                                            | Default                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------- | ------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaAutoplayPauseLabel  | Accessibility autoplay pause button aria label    | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaAutoplayPauseLabel: "Stop Automatic Slide Show"<br>}</code>   |
| ariaAutoplayResumeLabel | Accessibility autoplay resume button aria label   | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaAutoplayResumeLabel: "Start Automatic Slide Show"<br>}</code> |
| ariaNextLabel           | Accessibility next button aria label              | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaNextLabel: "Next Slide"<br>}</code>                           |
| ariaPreviousLabel       | Accessibility previous button aria label          | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaPreviousLabel: "Previous Slide"<br>}</code>                   |
| arrows                  | Show next / prev arrows                           | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;arrows: true<br>}</code>                                          |
| arrowsHover             | Show next / prev arrows only on hover             | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;arrowsHover: true<br>}</code>                                     |
| autoplay                | Move item automaticalls after `interval`          | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| breakpoints             | Define these props for different screen sizes     | Record&lt;number, any&gt; | -                                                 | <code style='white-space: nowrap; padding: 0;'>{}</code>                                                                                                                                 |
| dragable                | Enable drag mode                                  | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                               |
| iconAutoplayPause       | Icon name for autoplay pause button               | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconAutoplayPause: "pause"<br>}</code>                            |
| iconAutoplayResume      | Icon name for autoplay resume button              | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconAutoplayResume: "play"<br>}</code>                            |
| iconNext                | Icon name for next button                         | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>                             |
| iconPack                | Icon pack to use                                  | string                    | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                                   |
| iconPrev                | Icon name for previous button                     | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>                              |
| iconSize                | Icon size                                         | string                    | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>                                   |
| indicatorInside         | Place indicators inside the carousel              | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| indicatorPosition       | Position of the indicator - depends on used theme | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;indicatorPosition: "bottom"<br>}</code>                           |
| indicatorStyle          | Style of the indicator - depends on used theme    | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;indicatorStyle: "dots"<br>}</code>                                |
| indicators              | Enable indicators                                 | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                               |
| interval                | Timer interval for `autoplay`                     | number                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;interval: 3500<br>}</code>                                        |
| itemsToList             | Number of items to switch at once                 | number                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;itemsToList: 1<br>}</code>                                        |
| itemsToShow             | Number of items to show at once                   | number                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;itemsToShow: 1<br>}</code>                                        |
| v-model                 | The index of the current active element           | number                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                                                  |
| overlay                 | Show an overlay                                   | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| override                | Override existing theme classes completely        | boolean                   | -                                                 |                                                                                                                                                                                          |
| pauseHover              | Pause autoplay on hover                           | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| repeat                  | Repeat from the beginning after reaching the end  | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |

### Events

| Event name         | Properties                                   | Description                     |
| ------------------ | -------------------------------------------- | ------------------------------- |
| update:model-value | **value** `number` - updated modelValue prop | modelValue prop two-way binding |
| change             | **value** `number` - active index            | on carousel slide change event  |
| click              | **event** `event` - native event             | on item click event             |

### Slots

| Name       | Description                      | Bindings                                                                                                                                                                                                        |
| ---------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pause      | Override the pause/resume button | **autoplay** `boolean` - if autoplay is active<br/>**toggle** `(): void` - toggle autoplay                                                                                                                      |
| arrow      | Override the arrows              | **has-prev** `boolean` - has prev arrow button<br/>**prev** `(): void` - switch to prev item function<br/>**has-next** `boolean` - has next arrow button<br/>**next** `(): void` - switch to next item function |
| default    | Display carousel item            |                                                                                                                                                                                                                 |
| indicators | Override the indicators          | **active** `number` - active index<br/>**switch-to** `(idx: number): void` - switch to item function                                                                                                            |
| indicator  | Override the indicator elements  | **index** `index` - indicator index                                                                                                                                                                             |
| overlay    | Overlay element                  |                                                                                                                                                                                                                 |

</div>

<div class="vp-doc">

## CarouselItem component

> A Slideshow item used by the carousel.

```html
<o-carousel-item></o-carousel-item>
```

### Props

| Prop name | Description                                | Type    | Values | Default                                                     |
| --------- | ------------------------------------------ | ------- | ------ | ----------------------------------------------------------- |
| clickable | Make item clickable                        | boolean | -      | <code style='white-space: nowrap; padding: 0;'>false</code> |
| override  | Override existing theme classes completely | boolean | -      |                                                             |

### Slots

| Name    | Description     | Bindings |
| ------- | --------------- | -------- |
| default | Default content |          |

</div>

<div class="vp-doc">

## Sass variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                          | Default                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| $carousel-arrow-background             | var(--#{$prefix}white)                                                          |
| $carousel-arrow-color                  | var(--#{$prefix}primary)                                                        |
| $carousel-arrow-icon-spaced            | 1.5rem                                                                          |
| $carousel-arrow-top                    | 50%                                                                             |
| $carousel-arrow-size                   | 1.5rem                                                                          |
| $carousel-arrow-border-radius          | var( --#{$prefix}base-border-radius-rounded)                                    |
| $carousel-arrow-border                 | 1px solid $carousel-arrow-background                                            |
| $carousel-arrow-transition             | var(--#{$prefix}transition-duration)  var(--#{$prefix}transition-timing)        |
| $carousel-indicators-background        | rgba(var(--#{$prefix}white), 0.5)                                               |
| $carousel-indicators-padding           | 0.5rem                                                                          |
| $carousel-indicator-margin             | 0 0.5rem 0 0                                                                    |
| $carousel-indicator-color              | var(--#{$prefix}primary)                                                        |
| $carousel-indicator-background         | var(--#{$prefix}white)                                                          |
| $carousel-indicator-border             | 1px solid $carousel-indicator-color                                             |
| $carousel-indicator-active-background  | $carousel-indicator-color                                                       |
| $carousel-indicator-active-border      | 1px solid $carousel-indicator-color                                             |
| $carousel-indicator-transition         | var(--#{$prefix}transition-duration)  var(--#{$prefix}transition-timing)        |
| $carousel-indicator-size               | 10px                                                                            |
| $carousel-indicator-dots-border-radius | var( --#{$prefix}base-border-radius)                                            |
| $carousel-indicator-lines-height       | 5px                                                                             |
| $carousel-indicator-lines-width        | 25px                                                                            |
| $carousel-items-transition             | all var(--#{$prefix}transition-duration)  var(--#{$prefix}transition-timing) 0s |
| $carousel-item-border                  | 2px solid transparent                                                           |
| $carousel-overlay-background           | hsla(0, 0%, 4%, 0.86)                                                           |
| $carousel-overlay-zindex               | 40                                                                              |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_carousel.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                  | Default                                 |
| ------------------------------ | --------------------------------------- |
| $carousel-arrow-background     | css.getVar("scheme-main")               |
| $carousel-arrow-color          | css.getVar("primary")                   |
| $carousel-arrow-icon-spaced    | 1.5rem                                  |
| $carousel-arrow-top            | 50%                                     |
| $carousel-indicator-background | rgba(css.getVar("scheme-invert"), 0.5)  |
| $carousel-indicator-border     | css.getVar("scheme-main")               |
| $carousel-indicator-color      | css.getVar("primary")                   |
| $carousel-indicator-spaced     | 0.5rem                                  |
| $carousel-overlay-background   | rgba(css.getVar("scheme-invert"), 0.86) |
| $carousel-overlay-z            | 40                                      |

See ➜ 📄 [Full scss file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_carousel.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</div>
