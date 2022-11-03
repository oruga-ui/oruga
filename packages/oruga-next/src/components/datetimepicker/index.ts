import type { App, Plugin } from 'vue'

import Datetimepicker from './Datetimepicker.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Datetimepicker)
    }
} as Plugin

export {
    Datetimepicker as ODatetimepicker
}
