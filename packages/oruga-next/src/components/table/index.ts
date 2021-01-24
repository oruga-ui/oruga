import { App, Plugin } from 'vue'

import Table from './Table.vue'
import TableColumn from './TableColumn.vue'

import { registerComponent } from '../../utils/plugins'
import { setVueInstance, VueInstance } from '../../utils/config'

export default {
    install(app: App) {
        // individual import + extend method into Table.vue
        if (typeof VueInstance === 'undefined') {
            setVueInstance(app)
        }
        registerComponent(app, Table)
        registerComponent(app, TableColumn)
    }
} as Plugin

export {
    Table as OTable,
    TableColumn as OTableColumn
}

