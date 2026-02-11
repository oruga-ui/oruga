import type { Slots, StyleValue } from "vue";
import type { ProviderItem } from "@/composables";
import type { ClassBinding } from "@/types";

import type { FieldKey, TableColumnProps } from "./props";

export type TableRow<T = unknown> = {
    /** displayed option label */
    label: string;
    /** the real option value */
    value: T;
    /** table index position of the current row */
    index: number;
    /** internal genereated uniqe option key */
    key: string;
    /** internal definiton if the element should be hidden */
    hidden: boolean;
};

export type TableColumn<T = unknown> = TableColumnProps<T>;

export type TableColumnComponent<
    T,
    K extends string = FieldKey<T>,
> = TableColumnProps<T, K> & {
    $slots: Slots;
    style: StyleValue;
    matches: (row: T, value: string) => boolean;
    getValue: (row: T) => string;
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
