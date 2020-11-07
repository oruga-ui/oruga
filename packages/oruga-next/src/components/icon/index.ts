import { App, Plugin } from 'vue'

import Icon from './Icon.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin: Plugin = {
    install(app: App) {
        registerComponent(app, Icon)
    }
}

export default Plugin

export {
    Icon as OIcon
}
