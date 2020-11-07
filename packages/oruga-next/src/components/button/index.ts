import { App, Plugin } from 'vue'
import Button from './Button.vue'

import { registerComponent } from '../../utils/plugins'

const Plugin: Plugin = {
    install(app: App) {
        registerComponent(app, Button)
    }
}

export default Plugin

export {
    Button as OButton
}
