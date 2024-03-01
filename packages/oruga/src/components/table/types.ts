import type { ComponentPublicInstance, StyleValue } from "vue";
import type {
    ComponentProps,
    ComponentSlots,
} from "vue-component-type-helpers";
import type { ObjectMap, ProviderItem } from "@/composables";

import TableColumn from "./TableColumn.vue";

export type Row<T = unknown> = ObjectMap<T>[number];

export type Column<T = unknown> = ComponentProps<typeof TableColumn<T>>;

export type TableColumnSlots = ComponentSlots<typeof TableColumn>;

export type TableColumnComponent<T = unknown> = Column<T> & {
    $el: ComponentPublicInstance;
    $slots: TableColumnSlots;
    style: StyleValue;
    thAttrsData: object;
    tdAttrsData: Array<object>;
    isHeaderUnselectable: boolean;
};

export type TableColumn<T = unknown> = Omit<ProviderItem, "data"> &
    TableColumnComponent<T>;
