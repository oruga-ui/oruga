import { App, Plugin } from 'vue'

import Sidebar from './Sidebar.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Sidebar)
    }
} as Plugin

export {
    Sidebar as OSidebar
}
