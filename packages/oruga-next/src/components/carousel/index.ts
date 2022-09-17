import type { App, Plugin } from 'vue'

import Carousel from './Carousel.vue'
import CarouselItem from './CarouselItem.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Carousel)
        registerComponent(app, CarouselItem)
    }
} as Plugin

export {
    Carousel as OCarousel,
    CarouselItem as OCarouselItem
}
