import type { App, Plugin } from 'vue'

import Pagination from './Pagination.vue'
import PaginationButton from './PaginationButton.vue'

import { registerComponent } from '../../utils/plugins'

export default {
    install(app: App) {
        registerComponent(app, Pagination)
        registerComponent(app, PaginationButton)
    }
} as Plugin

export {
    Pagination as OPagination,
    PaginationButton as OPaginationButton
}
