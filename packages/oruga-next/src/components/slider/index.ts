import type { App, Plugin } from 'vue'

import Slider from './Slider.vue'
import SliderTick from './SliderTick.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Slider)
        registerComponent(app, SliderTick)
    }
} as Plugin

export {
    Slider as OSlider,
    SliderTick as OSliderTick
}
