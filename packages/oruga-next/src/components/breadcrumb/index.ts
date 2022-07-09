import { App, Plugin } from 'vue'

import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Breadcrumb)
        registerComponent(app, BreadcrumbItem)
    }
} as Plugin

export {
    Breadcrumb as OBreadcrumb,
    BreadcrumbItem as OBreadcrumbItem
}
