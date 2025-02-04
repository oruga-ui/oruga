import type { App, Plugin } from "vue";

import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";

import { registerComponent } from "@/utils/plugins";

/** export table specific types */
export type { TableColumn, TableRow } from "./types";

/** export table plugin */
export default {
    install(app: App) {
        registerComponent(app, Table);
        registerComponent(app, TableColumn);
    },
} as Plugin;

/** export table components */
export { Table as OTable, TableColumn as OTableColumn };
