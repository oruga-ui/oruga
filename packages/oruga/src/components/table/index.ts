import type { App } from "vue";

import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";

/** export table specific types */
export type * from "./props";
export type { TableColumn, TableRow } from "./types";

/** export table plugin */
export default {
    install(app: App): void {
        registerComponent(app, Table);
        registerComponent(app, TableColumn);
    },
} satisfies OrugaComponentPlugin;

/** export table components */
export { Table as OTable, TableColumn as OTableColumn };
