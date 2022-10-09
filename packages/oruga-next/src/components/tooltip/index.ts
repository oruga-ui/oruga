import type { App, Plugin } from 'vue'

import Tooltip from './Tooltip.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Tooltip)
    }
} as Plugin

export {
    Tooltip as OTooltip
}
