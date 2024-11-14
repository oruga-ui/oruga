import type { ComponentPublicInstance, Slots, StyleValue } from "vue";
import type { ObjectMap, ProviderItem } from "@/composables";
import type { ClassBind } from "@/types";

import type { TableColumnProps } from "./props";

export type TableRow<T = unknown> = ObjectMap<T>[number];

export type TableColumn<
    T = unknown,
    K extends keyof T | string = string,
> = TableColumnProps<T, K>;

export type TableColumns<T = unknown> = (
    | {
          [K in keyof T]: TableColumn<T, K>;
      }[keyof T]
    | TableColumn<T, string>
)[];

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
