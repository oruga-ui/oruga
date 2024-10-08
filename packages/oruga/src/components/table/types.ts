import type { ComponentPublicInstance, Slots, StyleValue } from "vue";
import type { ObjectMap, ProviderItem } from "@/composables";

import TableColumn from "./TableColumn.vue";
import type { TableColumnProps } from "./props";

export type TableRow<T = unknown> = ObjectMap<T>[number];

export type TableColumn<T = unknown> = TableColumnProps<T>;

// type TableColumnSlots = ComponentSlots<typeof TableColumn>;

export type TableColumnComponent<T = unknown> = TableColumn<T> & {
    $el: ComponentPublicInstance;
    $slots: Slots;
    style: StyleValue;
    isHeaderUnselectable: boolean;
};

export type TableColumnItem<T = unknown> = Omit<ProviderItem, "data"> &
    TableColumnComponent<T> & {
        thAttrsData: object;
        tdAttrsData: Array<object>;
    };
