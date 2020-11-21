import Table from './Table'
import TableColumn from './TableColumn'

import { use, registerComponent } from '../../utils/plugins'
import { setVueInstance, VueInstance } from '../../utils/config'

const Plugin = {
    install(Vue) {
        // individual import + extend method into Table.vue
        if (typeof VueInstance === 'undefined') {
            setVueInstance(Vue)
        }
        registerComponent(Vue, Table)
        registerComponent(Vue, TableColumn)
    }
}

use(Plugin)

export default Plugin

export {
    Table as OTable,
    TableColumn as OTableColumn
}
