import type { App, Plugin } from 'vue'

import Select from './Select.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Select)
    }
} as Plugin

export {
    Select as OSelect
}
