---
title: Carousel
---

# Carousel

> A Slideshow for cycling images in confined spaces

> <CarbonAds />

---

<a href="https://github.com/oruga-ui/oruga/edit/develop/packages/docs/../oruga/src/components/carousel/examples/Carousel.md" class="docgen-edit-link">edit on github</a>

## Examples

### Base

::: demo

```html
<template>
  <o-carousel>
    <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
      <section class="ex-slide" :style="{'background-color': carousel.color }">
        <h1>{{carousel.text}}</h1>
      </section>
    </o-carousel-item>
  </o-carousel>
</template>

<script>
  export default {
    data() {
      return {
        carousels: [
          { text: 'Slide 1', color: '#445e00' },
          { text: 'Slide 2', color: '#006724' },
          { text: 'Slide 3', color: '#b60000' },
          { text: 'Slide 4', color: '#f4c300' },
          { text: 'Slide 5', color: '#005c98' }
        ]
      }
    }
  }
</script>
```

:::

<style>
.ex-slide {
    padding: 9rem 4.5rem;
    color: #ffffff;
    text-align: center;
}
</style>

### Carousel List

::: demo

```html
<template>
  <section>
    <div class="example-component">
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="arrow">Arrow</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="arrowHover" :disabled="!arrow">Arrow on hover</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="drag">Drag event</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="repeat">Repeat</o-switch>
        </div>
      </o-field>
      <o-field grouped group-multiline>
        <o-field label="Value">
          <o-input type="number" v-model.number="values" min="0" :max="items.length - 1" />
        </o-field>
        <o-field label="Items to Show">
          <o-input type="number" v-model.number="perList" min="1" :max="items.length" />
        </o-field>
        <o-field label="Items to List">
          <o-input type="number" v-model.number="increment" min="1" :max="items.length - 1" />
        </o-field>
      </o-field>
    </div>
    <o-carousel-list v-model="values" :data="items" :arrow="arrow" :arrow-hover="arrowHover" :items-to-show="perList" :items-to-list="increment" :repeat="repeat" :has-drag="drag">
      <template #item="{ item }">
        <img :src="item.image" />
      </template>
    </o-carousel-list>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        arrow: true,
        arrowHover: true,
        drag: true,
        values: 1,
        perList: 4,
        increment: 1,
        repeat: false,
        items: [
          {
            title: 'Slide 1',
            image: 'https://picsummm.photos/id/0/1230/500'
          },
          {
            title: 'Slide 2',
            image: 'https://picsum.photos/id/1/1230/500'
          },
          {
            title: 'Slide 3',
            image: 'https://picsum.photos/id/2/1230/500'
          },
          {
            title: 'Slide 4',
            image: 'https://picsum.photos/id/3/1230/500'
          },
          {
            title: 'Slide 5',
            image: 'https://picsum.photos/id/4/1230/500'
          },
          {
            title: 'Slide 6',
            image: 'https://picsum.photos/id/5/1230/500'
          },
          {
            title: 'Slide 7',
            image: 'https://picsum.photos/id/6/1230/500'
          },
          {
            title: 'Slide 8',
            image: 'https://picsum.photos/id/7/1230/500'
          }
        ]
      }
    }
  }
</script>
```

:::

### Custom As indicators

::: demo

```html
<template>
  <o-carousel :autoplay="false" with-carousel-list :indicator="false" :overlay="gallery" @click="switchGallery(true)">
    <o-carousel-item v-for="(item, i) in items" :key="i">
      <figure class="image">
        <img :src="item.image" />
      </figure>
    </o-carousel-item>
    <span v-if="gallery" @click="switchGallery(false)" class="modal-close is-large" />
    <template #list="props">
      <o-carousel-list v-model="props.active" :data="items" v-bind="al" @switch="props.switch($event, false)" as-indicator>
        <template #item="{ item }">
          <img :src="item.image" />
        </template>
      </o-carousel-list>
    </template>
    <template #overlay>
      <div class="has-text-centered has-text-white">
        Hello, I'm an overlay!
      </div>
    </template>
  </o-carousel>
</template>

<script>
  export default {
    data() {
      return {
        gallery: false,
        al: {
          itemsToShow: 2,
          breakpoints: {
            768: {
              itemsToShow: 4
            },
            960: {
              itemsToShow: 6
            }
          }
        },
        items: [
          {
            title: 'Slide 1',
            image: 'https://picsum.photos/id/0/1230/500'
          },
          {
            title: 'Slide 2',
            image: 'https://picsum.photos/id/1/1230/500'
          },
          {
            title: 'Slide 3',
            image: 'https://picsum.photos/id/2/1230/500'
          },
          {
            title: 'Slide 4',
            image: 'https://picsum.photos/id/3/1230/500'
          },
          {
            title: 'Slide 5',
            image: 'https://picsum.photos/id/4/1230/500'
          },
          {
            title: 'Slide 6',
            image: 'https://picsum.photos/id/5/1230/500'
          },
          {
            title: 'Slide 7',
            image: 'https://picsum.photos/id/6/1230/500'
          },
          {
            title: 'Slide 8',
            image: 'https://picsum.photos/id/7/1230/500'
          }
        ]
      }
    },
    methods: {
      switchGallery(value) {
        this.gallery = value
        if (value) {
          document.documentElement.classList.add('is-clipped')
        } else {
          document.documentElement.classList.remove('is-clipped')
        }
      }
    }
  }
</script>
```

:::

### Custom

::: demo

```html
<template>
  <section>
    <div class="example-component">
      <o-field grouped group-multiline>
        <div class="control">
          <o-switch v-model="autoPlay">Autoplay</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="pauseHover" :disabled="!autoPlay">Pause on hover</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="pauseInfo" :disabled="!pauseHover">Pause info</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="drag">Drag event</o-switch>
        </div>
        <div class="control">
          <o-switch v-model="repeat" :disabled="!autoPlay">Repeat</o-switch>
        </div>
      </o-field>
      <o-field grouped group-multiline>
        <o-field label="Value">
          <o-input type="number" v-model.number="carousel" min="0" :max="carousels.length - 1" />
        </o-field>
        <o-field label="Interval">
          <o-input type="number" v-model.number="interval" min="0" step="1000" :disabled="!autoPlay" />
        </o-field>
        <o-field label="Animated">
          <o-field>
            <o-radio v-model="animated" native-value="fade">
              Fade
            </o-radio>
            <o-radio v-model="animated" native-value="slide">
              Slide
            </o-radio>
          </o-field>
        </o-field>
      </o-field>
    </div>

    <o-carousel
      v-model="carousel"
      :animated="animated"
      :has-drag="drag"
      :autoplay="autoPlay"
      :pause-hover="pauseHover"
      :pause-info="pauseInfo"
      :interval="interval"
      :repeat="repeat"
      @change="info($event)"
    >
      <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section class="ex-slide" :style="{'background-color': carousel.color }">
          <h1>{{carousel.title}}</h1>
          <o-input :placeholder="carousel.title"></o-input>
          <p>A link that <a href="#arrow">goes to arrow</a></p>
        </section>
      </o-carousel-item>
    </o-carousel>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        carousel: 0,
        animated: 'slide',
        drag: false,
        autoPlay: false,
        pauseHover: false,
        pauseInfo: false,
        repeat: false,
        interval: 3000,
        carousels: [
          { text: 'Slide 1', color: '#445e00' },
          { text: 'Slide 2', color: '#006724' },
          { text: 'Slide 3', color: '#b60000' },
          { text: 'Slide 4', color: '#f4c300' },
          { text: 'Slide 5', color: '#005c98' }
        ]
      }
    },
    methods: {
      info(value) {
        this.carousel = value
        this.$oruga.notification.open({
          message: `This Slide ${value} !`,
          variant: 'info'
        })
      }
    }
  }
</script>
```

:::

## Props

| Prop name         | Description      | Type    | Values | Default                                                                                                                                           |
| ----------------- | ---------------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| animated          |                  | string  | -      | 'slide'                                                                                                                                           |
| arrow             |                  | boolean | -      | true                                                                                                                                              |
| arrowHover        |                  | boolean | -      | true                                                                                                                                              |
| autoplay          |                  | boolean | -      | true                                                                                                                                              |
| hasDrag           |                  | boolean | -      | true                                                                                                                                              |
| iconNext          |                  | string  | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;iconNext: 'chevron-right'<br>}</code> |
| iconPack          |                  | string  | -      |                                                                                                                                                   |
| iconPrev          |                  | string  | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;iconPrev: 'chevron-left'<br>}</code>  |
| iconSize          |                  | string  | -      |                                                                                                                                                   |
| indicator         |                  | boolean | -      | true                                                                                                                                              |
| indicatorInside   |                  | boolean | -      | true                                                                                                                                              |
| indicatorMode     |                  | string  | -      | 'click'                                                                                                                                           |
| indicatorPosition |                  | string  | -      | 'bottom'                                                                                                                                          |
| indicatorStyle    |                  | string  | -      | 'dots'                                                                                                                                            |
| interval          |                  | number  | -      |                                                                                                                                                   |
| overlay           |                  | boolean | -      |                                                                                                                                                   |
| override          | Override classes | boolean | -      | false                                                                                                                                             |
| pauseHover        |                  | boolean | -      | true                                                                                                                                              |
| pauseInfo         |                  | boolean | -      | true                                                                                                                                              |
| pauseText         |                  | string  | -      | <div>From <b>config</b></div><br><code style='white-space: nowrap; padding: 0;'> carousel: {<br>&nbsp;&nbsp;pauseText: 'Pause'<br>}</code>        |
| progress          |                  | boolean | -      |                                                                                                                                                   |
| repeat            |                  | boolean | -      | true                                                                                                                                              |
| value             |                  | number  | -      | 0                                                                                                                                                 |
| withCarouselList  |                  | boolean | -      |                                                                                                                                                   |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |
| change     |            |
| click      |            |

## Slots

| Name       | Description | Bindings |
| ---------- | ----------- | -------- |
| default    |             |          |
| list       |             | <br>     |
| indicators |             |          |
| overlay    |             |          |

## Style

| CSS Variable                          | SASS Variable                   | Default              |
| ------------------------------------- | ------------------------------- | -------------------- |
| --oruga-carousel-min-height           | \$carousel-min-height           | 120px                |
| --oruga-carousel-arrow-background     | \$carousel-arrow-background     | \$white              |
| --oruga-carousel-arrow-color          | \$carousel-arrow-color          | \$primary            |
| --oruga-carousel-arrow-icon-spaced    | \$carousel-arrow-icon-spaced    | 1.5rem               |
| --oruga-carousel-arrow-top            | \$carousel-arrow-top            | 50%                  |
| --oruga-carousel-arrow-size           | \$carousel-arrow-size           | 1.5rem               |
| --oruga-carousel-indicator-background | \$carousel-indicator-background | rgba(\$white , 0.50) |
| --oruga-carousel-indicator-border     | \$carousel-indicator-border     | \$white              |
| --oruga-carousel-indicator-color      | \$carousel-indicator-color      | \$primary            |
| --oruga-carousel-indicator-spaced     | \$carousel-indicator-spaced     | .5rem                |
| --oruga-carousel-overlay-background   | \$carousel-overlay-background   | rgba(\$white , 0.86) |
| --oruga-carousel-overlay-z            | \$carousel-overlay-z            | 40                   |
