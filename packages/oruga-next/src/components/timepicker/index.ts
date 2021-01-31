import { App, Plugin } from 'vue'

import Timepicker from './Timepicker.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Timepicker)
    }
} as Plugin

export {
    Timepicker as OTimepicker
}
