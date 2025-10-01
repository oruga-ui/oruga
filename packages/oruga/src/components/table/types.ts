import type { Slots, StyleValue } from "vue";
import type { OptionsItem, ProviderItem } from "@/composables";
import type { ClassBinding } from "@/types";

import type { FieldKey, TableColumnProps } from "./props";

export type TableRow<V = unknown> = OptionsItem<V> & {
    /** table index position of the current row */
    index: number;
};

export type TableColumn<T = unknown> = TableColumnProps<T>;

export type TableColumnComponent<
    T,
    K extends string = FieldKey<T>,
> = TableColumnProps<T, K> & {
    $slots: Slots;
    style: StyleValue;
    thClasses: ClassBinding[];
    thSubClasses: ClassBinding[];
    tdClasses: ClassBinding[];
};

export type TableColumnItem<T, K extends string = FieldKey<T>> = Omit<
    ProviderItem,
    "data"
> &
    TableColumnComponent<T, K> & {
        value: TableColumn<T>;
        thAttrsData: object;
        tdAttrsData: Array<object>;
    };
