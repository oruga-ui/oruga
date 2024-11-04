import type { ComponentPublicInstance, Slots, StyleValue } from "vue";
import type { ObjectMap, ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import type { TableColumnProps } from "./props";

export type TableRow<T = unknown> = ObjectMap<T>[number];

export type TableColumn<T = unknown> = TableColumnProps<T>;

export type TableColumnComponent<T = unknown> = TableColumn<T> & {
    $el: ComponentPublicInstance;
    $slots: Slots;
    style: StyleValue;
    thClasses: ClassBind[];
    tdClasses: ClassBind[];
};

export type TableComponent = {
    isColumnSorted(column: ProviderItem): boolean;
};

export type TableColumnItem<T = unknown> = Omit<ProviderItem, "data"> &
    TableColumnComponent<T> & {
        thAttrsData: object;
        tdAttrsData: Array<object>;
    };
