---
title: Carousel
---

# Carousel

<div class="vp-doc">

> A Slideshow for cycling images in confined spaces

<Carbon />
</div>

<div class="vp-example">
</div>
<div class="vp-example">
</div>

<div class="vp-doc">

## Carousel component

> A Slideshow for cycling images in confined spaces

```html
<o-carousel></o-carousel>
```

### Props

| Prop name         | Description                                       | Type                      | Values                                            | Default                                                                                                                                                        |
| ----------------- | ------------------------------------------------- | ------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arrows            | Show next / prev arrows                           | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;arrows: true<br>}</code>                |
| arrowsHover       | Show next / prev arrows only on hover             | boolean                   | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;arrowsHover: true<br>}</code>           |
| autoplay          | Move item automaticalls after `interval`          | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| breakpoints       | Define these props for different screen sizes     | Record&lt;number, any&gt; | -                                                 | Default function (see source code)                                                                                                                             |
| dragable          | Enable drag mode                                  | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                     |
| iconNext          | Icon name for next icon                           | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconNext: "chevron-right"<br>}</code>   |
| iconPack          | Icon pack to use                                  | string                    | `mdi`, `fa`, `fas and any other custom icon pack` | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconPack: undefined<br>}</code>         |
| iconPrev          | Icon name for previous icon                       | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconPrev: "chevron-left"<br>}</code>    |
| iconSize          | Icon size                                         | string                    | `small`, `medium`, `large`                        | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;iconSize: undefined<br>}</code>         |
| indicatorInside   | Place indicators inside the carousel              | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| indicatorMode     | Indicator interaction mode                        | string                    | `click`, `hover`                                  | <code style='white-space: nowrap; padding: 0;'>"click"</code>                                                                                                  |
| indicatorPosition | Position of the indicator - depends on used theme | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;indicatorPosition: "bottom"<br>}</code> |
| indicatorStyle    | Style of the indicator - depends on used theme    | string                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;indicatorStyle: "dots"<br>}</code>      |
| indicators        | Enable indicators                                 | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>true</code>                                                                                                     |
| interval          | Timer interval for `autoplay`                     | number                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;interval: 3500<br>}</code>              |
| itemsToList       | Number of items to switch at once                 | number                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;itemsToList: 1<br>}</code>              |
| itemsToShow       | Number of items to show at once                   | number                    | -                                                 | <div><small>From <b>config</b>:</small></div><code style='white-space: nowrap; padding: 0;'>carousel: {<br>&nbsp;&nbsp;itemsToShow: 1<br>}</code>              |
| overlay           | Show an overlay                                   | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| pauseHover        | Pause autoplay on hover                           | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| repeat            | Repeat from the beginning after reaching the end  | boolean                   | -                                                 | <code style='white-space: nowrap; padding: 0;'>false</code>                                                                                                    |
| v-model           |                                                   | number                    | -                                                 | <code style='white-space: nowrap; padding: 0;'>0</code>                                                                                                        |

### Events

| Event name        | Properties                                   | Description                     |
| ----------------- | -------------------------------------------- | ------------------------------- |
| update:modelValue | **value** `number` - updated modelValue prop | modelValue prop two-way binding |
| scroll            | **value** `number` - scroll index            | on carousel scroll event        |
| click             | **event** `event` - native event             | on item click event             |

### Slots

| Name       | Description                     | Bindings                                                                                                                                                                                                        |
| ---------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default    | Display carousel item           |                                                                                                                                                                                                                 |
| arrow      | Override the arrows             | **has-prev** `boolean` - has prev arrow button<br/>**prev** `(): void` - switch to prev item function<br/>**has-next** `boolean` - has next arrow button<br/>**next** `(): void` - switch to next item function |
| indicators | Override the indicators         | **active** `number` - active index<br/>**switch-to** `(idx: number): void` - switch to item function<br/>**indicator-index** `number` - current indicator index                                                 |
| indicator  | Override the indicator elements | **index** `index` - indicator index                                                                                                                                                                             |
| overlay    | Overlay element                 |                                                                                                                                                                                                                 |

</div>

<div class="vp-doc">

## CarouselItem component

> A Slideshow item used by the carousel

```html
<o-carousel-item></o-carousel-item>
```

### Props

| Prop name | Description         | Type    | Values | Default                                                     |
| --------- | ------------------- | ------- | ------ | ----------------------------------------------------------- |
| clickable | Make item clickable | boolean | -      | <code style='white-space: nowrap; padding: 0;'>false</code> |

### Slots

| Name    | Description     | Bindings |
| ------- | --------------- | -------- |
| default | Default content |          |

</div>

<div class="vp-doc">
</div>
<div class="vp-doc">
</div>
