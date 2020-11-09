import { App, Plugin } from 'vue'

import Icon from './Icon.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Icon)
    }
} as Plugin

export {
    Icon as OIcon
}
