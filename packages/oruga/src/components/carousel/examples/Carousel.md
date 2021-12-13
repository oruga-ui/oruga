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
        data(){
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
                <o-field label="Items to Show">
                    <o-input type="number" v-model.number="perList" min="1" :max="items.length" />
                </o-field>
                <o-field label="Items to List">
                    <o-input type="number" v-model.number="increment" min="1" :max="items.length - 1" />
                </o-field>
            </o-field>
        </div>
        <o-carousel
            v-model="values"
            :arrow="arrow"
            :arrow-hover="arrowHover"
            :items-to-show="perList"
            :items-to-list="increment"
            :repeat="repeat"
            :has-drag="drag">
            <o-carousel-item v-for="(item, i) in items" :key="i">
                <img :src="item.image">
            </o-carousel-item>
        </o-carousel>
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
                        image: 'https://picsum.photos/id/1/1230/500'
                    },
                    {
                        title: 'Slide 2',
                        image: 'https://picsum.photos/id/2/1230/500'
                    },
                    {
                        title: 'Slide 3',
                        image: 'https://picsum.photos/id/3/1230/500'
                    },
                    {
                        title: 'Slide 4',
                        image: 'https://picsum.photos/id/4/1230/500'
                    },
                    {
                        title: 'Slide 5',
                        image: 'https://picsum.photos/id/5/1230/500'
                    },
                    {
                        title: 'Slide 6',
                        image: 'https://picsum.photos/id/6/1230/500'
                    },
                    {
                        title: 'Slide 7',
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
    <o-carousel
        :autoplay="false"
        :overlay="gallery"
        @click="switchGallery(true)">
        <o-carousel-item v-for="(item, i) in items" :key="i">
            <a class="image">
                <img :src="item.image">
            </a>
        </o-carousel-item>
        
        <template #indicators="{ active, switchTo }">
            <o-carousel
                :value="active"
                @input="switchTo($event)"
                v-bind="al"
                as-indicator>
                <o-carousel-item 
                    v-for="(item, i) in items"
                    :key="i" 
                    item-class="img-indicator"
                    item-active-class="img-indicator-active">
                    <img :src="item.image">
                </o-carousel-item>
            </o-carousel>
        </template>
        <template #overlay>
            <o-icon 
                v-if="gallery"
                icon="times"
                root-class="ex-close-icon"
                clickable
                @click.native="switchGallery(false)" 
            />
            <div style="color: #ffffff; text-align: center">
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
                        image: 'https://picsum.photos/id/1/1230/500'
                    },
                    {
                        title: 'Slide 2',
                        image: 'https://picsum.photos/id/2/1230/500'
                    },
                    {
                        title: 'Slide 3',
                        image: 'https://picsum.photos/id/3/1230/500'
                    },
                    {
                        title: 'Slide 4',
                        image: 'https://picsum.photos/id/4/1230/500'
                    },
                    {
                        title: 'Slide 5',
                        image: 'https://picsum.photos/id/5/1230/500'
                    },
                    {
                        title: 'Slide 6',
                        image: 'https://picsum.photos/id/6/1230/500'
                    },
                    {
                        title: 'Slide 7',
                        image: 'https://picsum.photos/id/7/1230/500'
                    }
                ]
            }
        },
        methods: {
            switchGallery(value) {
                this.gallery = value
                if (value) {
                    document.documentElement.classList.add('o-clipped')
                } else {
                    document.documentElement.classList.remove('o-clipped')
                }
            }
        }
    }
</script>

<style>
.image img {
    display: block;
    height: auto;
    width: 100%;
}
.img-indicator {
    filter: grayscale(100%);
}
.img-indicator-active {
    filter: grayscale(0%);
}
.ex-close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ffffff;
    z-index: 99;
}
</style>
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
                    <o-input type="number" v-model.number="interval" min="0" step="1000" :disabled="!autoPlay"/>
                </o-field>
            </o-field>
        </div>

        <o-carousel
            v-model="carousel"
            :has-drag="drag"
            :autoplay="autoPlay"
            :pause-hover="pauseHover"
            :interval="interval"
            :repeat="repeat">
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
        }
    }
</script>
```
:::
