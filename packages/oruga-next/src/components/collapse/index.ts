import type { App, Plugin } from 'vue'

import Collapse from './Collapse.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Collapse)
    }
} as Plugin

export {
    Collapse as OCollapse
}
