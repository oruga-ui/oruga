---
sidebarDepth: 2
---

[//]: # "This file is generated and should not be edited by hand!"

# Carousel

<section class="odocs-head">

The **Carousel** component is a slideshow for cycling through a set of elements — images or text like - a carousel, referred to as slides, by sequentially displaying a subset of one or more slides.
One slide is displayed at a time, and users can activate a next or previous slide control that hides the current slide and "rotates" the next or previous slide into view.
The component implements the W3C ARIA APG [Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

</section>

<section class="odocs-examples">

## Examples

<script setup>
import Base from "@/components/Carousel/examples/base.vue";
import BaseCode from "@/components/Carousel/examples/base.vue?raw";

import List from "@/components/Carousel/examples/list.vue";
import ListCode from "@/components/Carousel/examples/list.vue?raw";

import Indicators from "@/components/Carousel/examples/indicators.vue";
import IndicatorsCode from "@/components/Carousel/examples/indicators.vue?raw";

import Options from "@/components/Carousel/examples/options.vue";
import OptionsCode from "@/components/Carousel/examples/options.vue?raw";

import Slideshow from "@/components/Carousel/examples/slideshow.vue";
import SlideshowCode from "@/components/Carousel/examples/slideshow.vue?raw";

import Autoplay from "@/components/Carousel/examples/autoplay.vue";
import AutoplayCode from "@/components/Carousel/examples/autoplay.vue?raw";
</script>

### Base

Here is a basic example of a carousel with some slides. When no `value` is set for an item, the index of the slide is used to as `v-model` value.

<ExampleViewer :component="Base" :code="BaseCode" />

### Indicators

Alongside the previous/next controls, slide indicators can be activated using the `indicators` prop. Indicators allow the user to jump directly to a particular slide. The position can be set with the `indicatorPosition` and `indicatorInside` props to display the indicators at the top or bottom and inside or outside the slide. If there is more than one style defined for the indicators in a theme, the style can be customised by using the `indicatorStyle` prop.

<ExampleViewer :component="Indicators" :code="IndicatorsCode" />

### Options

Instead of using the `<o-carousel-item>` component directly inside the default slot, an `options` prop can be set, which allows the options to be set programmatically. All `<o-carousel-item>` component props can be used as attributes of the item object in the options list.

<ExampleViewer :component="Options" :code="OptionsCode" />

### Carousel List

The component is capable of displaying and rotating more than one slide at a time. Therefore, the `items-to-show` and `items-to-list` props can be used to specify the number of items to be shown and rotated at once.

<ExampleViewer :component="List" :code="ListCode" />

### Slideshow

Using the `indicators` slot, the indicators can be further customised to create a custom style like a picture gallery slideshow. Click on the slide to open the gallery mode.

<ExampleViewer :component="Slideshow" :code="SlideshowCode" />

### Autoplay

Using the `autoplay` prop, the carousel will run automatically. The `interval` prop can be used to set the cycle speed. Moving focus to any of the carousel content, including the tab elements, pauses automatic rotation, when the `pause-hover` prop is set. If operating system preferences have been set for reduced motion or disabling animations, the auto-rotation is initially paused.

::: info Accessibility Note:
When using autoplay, users must be able to stop and start slide rotation, which is an essential aspect of carousel accessibility for a variety of people with disabilities. People with low vision or a cognitive disability that affects visual processing or reading benefit from being able to control slide rotation so that they have enough time to explore slide content.
:::

<ExampleViewer :component="Autoplay" :code="AutoplayCode" />

</section>

<section class="odocs-specs">

## Carousel Component

> A Slideshow for cycling images in confined spaces.

```html
<o-carousel></o-carousel>
```

### Props

| Prop name               | Description                                                                                                          | Type                           | Values                                            | Default                                                                                                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ariaAutoplayPauseLabel  | Accessibility autoplay pause button aria label                                                                       | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaAutoplayPauseLabel: "Stop Automatic Slide Show"<br>}</code>   |
| ariaAutoplayResumeLabel | Accessibility autoplay resume button aria label                                                                      | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaAutoplayResumeLabel: "Start Automatic Slide Show"<br>}</code> |
| ariaNextLabel           | Accessibility next button aria label                                                                                 | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaNextLabel: "Next Slide"<br>}</code>                           |
| ariaPreviousLabel       | Accessibility previous button aria label                                                                             | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;ariaPreviousLabel: "Previous Slide"<br>}</code>                   |
| arrows                  | Show next / prev arrows                                                                                              | boolean                        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;arrows: true<br>}</code>                                          |
| arrowsHover             | Show next / prev arrows only on hover                                                                                | boolean                        | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;arrowsHover: true<br>}</code>                                     |
| autoplay                | Move item automaticalls after `interval`                                                                             | boolean                        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| breakpoints             | Define these props for different screen sizes                                                                        | Record&lt;number, any&gt;      | -                                                 |                                                                                                                                                                                          |
| dragable                | Enable drag mode                                                                                                     | boolean                        | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                               |
| iconAutoplayPause       | Icon name for autoplay pause button                                                                                  | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconAutoplayPause: "pause"<br>}</code>                            |
| iconAutoplayResume      | Icon name for autoplay resume button                                                                                 | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconAutoplayResume: "play"<br>}</code>                            |
| iconNext                | Icon name for next button                                                                                            | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>                             |
| iconPack                | Icon pack to use                                                                                                     | string                         | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>                                   |
| iconPrev                | Icon name for previous button                                                                                        | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>                              |
| iconSize                | Icon size                                                                                                            | string                         | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>                                   |
| indicatorInside         | Place indicators inside the carousel                                                                                 | boolean                        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| indicatorPosition       | Position of the indicator - depends on used theme                                                                    | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;indicatorPosition: "bottom"<br>}</code>                           |
| indicatorStyle          | Style of the indicator - depends on used theme                                                                       | string                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;indicatorStyle: "dots"<br>}</code>                                |
| indicators              | Enable indicators                                                                                                    | boolean                        | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                                               |
| interval                | Timer interval for `autoplay`                                                                                        | number                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;interval: 3500<br>}</code>                                        |
| itemsToList             | Number of items to switch at once                                                                                    | number                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;itemsToList: 1<br>}</code>                                        |
| itemsToShow             | Number of items to show at once                                                                                      | number                         | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;itemsToShow: 1<br>}</code>                                        |
| v-model                 | The index of the current active element<br/>The selected item value or index, use v-model to make it two-way binding | unknown                        | -                                                 |                                                                                                                                                                                          |
| options                 | Menu items, unnecessary when default slot is used                                                                    | CarouselOptions&lt;unknown&gt; | -                                                 |                                                                                                                                                                                          |
| overlay                 | Show an overlay                                                                                                      | boolean                        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| override                | Override existing theme classes completely                                                                           | boolean                        | -                                                 |                                                                                                                                                                                          |
| pauseHover              | Pause autoplay on hover                                                                                              | boolean                        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |
| repeat                  | Repeat from the beginning after reaching the end                                                                     | boolean                        | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                                              |

### Events

| Event name         | Properties                                                                  | Description                     |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------- |
| update:model-value | **value** `number` - updated modelValue prop                                | modelValue prop two-way binding |
| change             | **value** `unknown` - new tab value<br/>**value** `unknown` - old tab value | on carousel slide change event  |
| click              | **event** `event` - native event                                            | on item click event             |

### Slots

| Name       | Description                                   | Bindings                                                                                                                                                                                                      |
| ---------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pause      | Override the pause/resume button              | **autoplay** `boolean` - if autoplay is active<br/>**toggle** `(): void` - toggle autoplay                                                                                                                    |
| arrows     | Override the arrows                           | **hasPrev** `boolean` - has prev arrow button<br/>**hasNext** `boolean` - has next arrow button<br/>**prev** `(): void` - switch to prev item function<br/>**next** `(): void` - switch to next item function |
| default    | Define the carousel items here                |                                                                                                                                                                                                               |
| indicators | Override the indicators                       | **activeIndex** `number` - active item index<br/>**switchTo** `(idx?: number): void` - switch to item function                                                                                                |
| indicator  | Override the indicator elements               | **index** `number` - indicator index                                                                                                                                                                          |
| overlay    | Define element to show when overlay is active |                                                                                                                                                                                                               |

</section>

[//]: # "This file is generated and should not be edited by hand!"

<section class="odocs-specs">

## CarouselItem Component

> A Slideshow item used by the carousel.

```html
<o-carousel-item></o-carousel-item>
```

### Props

| Prop name | Description                                                                                      | Type    | Values | Default                                                     |
| --------- | ------------------------------------------------------------------------------------------------ | ------- | ------ | ----------------------------------------------------------- |
| clickable | Make item clickable                                                                              | boolean | -      | <code style='white-space: nowrap; padding: 0;'>false</code> |
| image     | Background image of the item                                                                     | string  | -      |                                                             |
| imageAlt  | Image alt tag of the background image                                                            | string  | -      |                                                             |
| override  | Override existing theme classes completely                                                       | boolean | -      |                                                             |
| subtitle  | Subtitle of the slide, unnecessary when default slot is used                                     | string  | -      |                                                             |
| title     | Title of the slide, unnecessary when default slot is used                                        | string  | -      |                                                             |
| value     | Item value (it will be used as the v-model of the wrapper component) - default is the item index | unknown | -      |                                                             |

### Events

| Event name | Properties                                                                 | Description                  |
| ---------- | -------------------------------------------------------------------------- | ---------------------------- |
| click      | **value** `unknown` - value prop data<br/>**event** `event` - native event | onclick event                |
| activate   |                                                                            | on tab item activate event   |
| deactivate |                                                                            | on tab item deactivate event |

### Slots

| Name    | Description               | Bindings |
| ------- | ------------------------- | -------- |
| default | Override the item content |          |

</section>

<section class="odocs-classes">

## Class Inspector

<inspector-carousel-viewer />

</section>

<section class="odocs-style">

## Sass Variables

<div class="theme-oruga">

> Current theme ➜ _[Oruga](https://github.com/oruga-ui/theme-oruga)_

| SASS Variable                         | Default                                                              |
| ------------------------------------- | -------------------------------------------------------------------- |
| $carousel-arrow-icon-spacer           | 1.5rem                                                               |
| $carousel-arrow-top                   | 50%                                                                  |
| $carousel-arrow-size                  | 1.5rem                                                               |
| $carousel-arrow-color                 | h.useVar("primary")                                                  |
| $carousel-arrow-border-width          | 1px                                                                  |
| $carousel-arrow-border-style          | solid                                                                |
| $carousel-arrow-border-color          | h.useVar("white")                                                    |
| $carousel-arrow-border-radius         | h.useVar("border-radius-rounded")                                    |
| $carousel-arrow-background-color      | $carousel-arrow-border-color                                         |
| $carousel-arrow-transition            | h.useVar("transition-duration") h.useVar("transition-timing")        |
| $carousel-autoplay-top                | 1em                                                                  |
| $carousel-autoplay-left               | $carousel-arrow-icon-spacer                                          |
| $carousel-autoplay-right              | unset                                                                |
| $carousel-autoplay-bottom             | unset                                                                |
| $carousel-indicators-background       | rgba(h.useVar("white"), 0.5)                                         |
| $carousel-indicators-padding          | 0.5rem                                                               |
| $carousel-indicator-spacer            | 0.5rem                                                               |
| $carousel-indicator-size              | 0.75em                                                               |
| $carousel-indicator-lines-height      | 5px                                                                  |
| $carousel-indicator-lines-width       | 25px                                                                 |
| $carousel-indicator-color             | h.useVar("primary")                                                  |
| $carousel-indicator-border            | 1px solid $carousel-indicator-color                                  |
| $carousel-indicator-background        | h.useVar("white")                                                    |
| $carousel-indicator-transition        | h.useVar("transition-duration") h.useVar("transition-timing")        |
| $carousel-indicator-dots-radius       | h.useVar("border-radius")                                            |
| $carousel-indicator-active-background | $carousel-indicator-color                                            |
| $carousel-indicator-active-border     | 1px solid $carousel-indicator-color                                  |
| $carousel-items-transition            | all h.useVar("transition-duration") h.useVar("transition-timing") 0s |
| $carousel-item-border                 | 2px solid transparent                                                |
| $carousel-overlay-background-color    | h.useVar( "overlay-background-color")                                |
| $carousel-overlay-zindex              | map.get(vars.$zindex, "overlay")                                     |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-oruga/tree/main/src/assets/scss/components/_carousel.scss)

</div>
<div class="theme-bulma">

> Current theme ➜ _[Bulma](https://github.com/oruga-ui/theme-bulma)_

| SASS Variable                  | Default                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| $carousel-arrow-icon-spaced    | 1.5rem                                                                               |
| $carousel-arrow-top            | 50%                                                                                  |
| $carousel-indicator-spaced     | 0.5rem                                                                               |
| $carousel-overlay-z            | 40                                                                                   |
| $carousel-arrow-background     | css.getVar("scheme-main")                                                            |
| $carousel-arrow-color          | css.getVar("primary")                                                                |
| $carousel-indicator-background | rgba(css.getVar("scheme-invert"), 0.5)                                               |
| $carousel-indicator-border     | css.getVar("scheme-main")                                                            |
| $carousel-indicator-color      | css.getVar("primary")                                                                |
| $carousel-overlay-background   | hsla( css.getVar(scheme-h), css.getVar(scheme-s), css.getVar(scheme-invert-l), 0.86) |

See ➜ 📄 [SCSS file](https://github.com/oruga-ui/theme-bulma/tree/main/src/assets/scss/components/_carousel.scss)

</div>
<div class="theme-bootstrap">

> Current theme ➜ _[Bootstrap](https://github.com/oruga-ui/theme-bootstrap)_

<p>The theme does not have any custom variables for this component.</p>
</div>

</section>
