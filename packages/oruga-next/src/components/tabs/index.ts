import { App, Plugin } from 'vue'

import Tabs from './Tabs.vue'
import TabsItem from './TabsItem.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Tabs)
        registerComponent(app, TabsItem)
    }
} as Plugin

export {
    Tabs as OTabs,
    TabsItem as OTabsItem
}
