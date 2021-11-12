## Examples

### Base

::: demo
```html
<template>
    <o-carousel>
        <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <section :class="`hero is-medium is-${carousel.color}`">
                <div class="hero-body has-text-centered">
                    <h1 class="title">{{carousel.text}}</h1>
                </div>
            </section>
        </o-carousel-item>
    </o-carousel>
</template>

<script>
    export default {
        data(){
            return {
                carousels: [
                    { text: 'Slide 1', color: 'primary' },
                    { text: 'Slide 2', color: 'info' },
                    { text: 'Slide 3', color: 'success' },
                    { text: 'Slide 4', color: 'warning' },
                    { text: 'Slide 5', color: 'danger' }
                ]
            }
        }
    }
</script>

<style scoped>
    .is-primary {
        background-color: green;
    }
    .is-info {
        background-color: blue;
    }
    .is-success {
        background-color: green;
    }
</style>
```
:::

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
                    <o-switch v-model="gray" :disabled="opacity">Grayscale</o-switch>
                </div>
                <div class="control">
                    <o-switch v-model="opacity" :disabled="gray">Opacity</o-switch>
                </div>
                <div class="control">
                    <o-switch v-model="repeat">Repeat</o-switch>
                </div>
            </o-field>
            <o-field grouped group-multiline>
                <o-field label="Value">
                    <o-input type="number" v-model="values" min="0" :max="items.length - 1" />
                </o-field>
                <o-field label="Items to Show">
                    <o-input type="number" v-model="perList" min="1" :max="items.length" />
                </o-field>
                <o-field label="Items to List">
                    <o-input type="number" v-model="increment" min="1" :max="items.length - 1" />
                </o-field>
            </o-field>
        </div>
        <o-carousel-list
            v-model="values"
            :data="items"
            :arrow="arrow"
            :arrow-hover="arrowHover"
            :items-to-show="perList"
            :items-to-list="increment"
            :repeat="repeat"
            :has-drag="drag"
            :has-grayscale="gray"
            :has-opacity="opacity" />
    </section>
</template>

<script>
    export default {
    data() {
        return {
            arrow: true,
            arrowHover: true,
            drag: true,
            gray: false,
            opacity: false,
            values: 1,
            perList: 4,
            increment: 1,
            repeat: false,
            items: [
                {
                    alt: 'Slide 1',
                    title: 'Slide 1',
                    image: 'https://picsummm.photos/id/0/1230/500',
                    srcFallback: 'https://picsum.photos/id/0/1230/500'
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
    <o-carousel
        :autoplay="false"
        with-carousel-list
        :indicator="false"
        :overlay="gallery"
        @click="switchGallery(true)">
        <o-carousel-item v-for="(item, i) in items" :key="i">
            <figure class="image">
                <img :src="item.image">
            </figure>
        </o-carousel-item>
        <span v-if="gallery" @click="switchGallery(false)" class="modal-close is-large"/>
        <template #list="props">
            <o-carousel-list
                v-model="props.active"
                :data="items"
                v-bind="al"
                @switch="props.switch($event, false)"
                as-indicator />
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
                    hasGrayscale: true,
                    itemsToShow: 2,
                    breakpoints: {
                        768: {
                            hasGrayscale: false,
                            itemsToShow: 4
                        },
                        960: {
                            hasGrayscale: true,
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
                    <o-input type="number" v-model="carousel" min="0" :max="carousels.length - 1" />
                </o-field>
                <o-field label="Interval">
                    <o-input type="number" v-model="interval" min="0" step="1000" :disabled="!autoPlay"/>
                </o-field>
                <o-field label="Animated">
                    <o-field>
                        <o-radio v-model="animated"
                            native-value="fade">
                            Fade
                        </o-radio>
                        <o-radio v-model="animated"
                            native-value="slide">
                            Slide
                        </o-radio>
                    </o-field>
                </o-field>
                <o-field label="Pause Type">
                    <o-select v-model="pauseType" :disabled="!pauseInfo">
                        <option value="is-white">is-white</option>
                        <option value="is-dark">is-dark</option>
                        <option value="is-primary">is-primary</option>
                    </o-select>
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
            :pause-info-type="pauseType"
            :interval="interval"
            :repeat="repeat"
            @change="info($event)">
            <o-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color} is-bold`">
                    <div class="hero-body has-text-centered">
                        <h1 class="title">{{carousel.title}}</h1>
                        <o-input :placeholder="carousel.title"></o-input>
                        <p>A link that <a href="#arrow">goes to arrow</a></p>
                    </div>
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
                animated: 'fade',
                drag: false,
                autoPlay: false,
                pauseHover: false,
                pauseInfo: false,
                repeat: false,
                pauseType: 'is-primary',
                interval: 3000,
                carousels: [
                    { title: 'Slide 1', color: 'dark' },
                    { title: 'Slide 2', color: 'primary' },
                    { title: 'Slide 3', color: 'info' },
                    { title: 'Slide 4', color: 'success' },
                    { title: 'Slide 5', color: 'warning' },
                    { title: 'Slide 6', color: 'danger' }
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
