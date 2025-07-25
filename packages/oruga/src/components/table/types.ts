import type { ComponentPublicInstance, Slots, StyleValue } from "vue";
import type { OptionsItem, ProviderItem } from "@/composables";
import type { ClassBinding } from "@/types";

import type { TableColumnProps } from "./props";

export type TableRow<V = unknown> = OptionsItem<V> & {
    /** table index position of the current row */
    index: number;
};

export type TableColumn<T = unknown> = TableColumnProps<T>;

export type TableColumnComponent<T = unknown> = TableColumn<T> & {
    $el: ComponentPublicInstance;
    $slots: Slots;
    style: StyleValue;
    thClasses: ClassBinding[];
    tdClasses: ClassBinding[];
};

export type TableComponent = {
    isColumnSorted(column: ProviderItem): boolean;
};

export type TableColumnItem<T = unknown> = Omit<ProviderItem, "data"> &
    TableColumnComponent<T> & {
        value: TableColumn<T>;
        thAttrsData: object;
        tdAttrsData: Array<object>;
    };
