import type { App, Plugin } from 'vue'

import Tabs from './Tabs.vue'
import TabItem from './TabItem.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Tabs)
        registerComponent(app, TabItem)
    }
} as Plugin

export {
    Tabs as OTabs,
    TabItem as OTabItem
}
