import type { App, Plugin } from "vue";

import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";

import { registerComponent } from "../../utils/plugins";

export default {
    install(app: App) {
        registerComponent(app, Table);
        registerComponent(app, TableColumn);
    },
} as Plugin;

export { Table as OTable, TableColumn as OTableColumn };
