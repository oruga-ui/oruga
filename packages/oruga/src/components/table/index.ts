import type { App } from "vue";

import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";

import { registerComponent } from "@/utils/plugins";
import type { OrugaComponentPlugin } from "@/utils/config";
import type { FieldKey } from "./props";

/** export table specific types */
export type * from "./props";
export type { TableColumn, TableRow } from "./types";

/**
 * Returns a locally-typed OTableColumn component for use with a specific row type.
 * Use in `<script setup>` to get full type inference for the `row` slot prop:
 *
 * ```ts
 * const Column = defineOTableColumn<(typeof data)[number]>()
 * ```
 * ```html
 * <Column v-slot="{ row }" field="name">{{ row.name }}</Column>
 * ```
 */
export function defineOTableColumn<T>(): typeof TableColumn<T, FieldKey<T>> {
    return TableColumn;
}

/** export table plugin */
export default {
    install(app: App): void {
        registerComponent(app, Table);
        registerComponent(app, TableColumn);
    },
} satisfies OrugaComponentPlugin;

/** export table components */
export { Table as OTable, TableColumn as OTableColumn };
