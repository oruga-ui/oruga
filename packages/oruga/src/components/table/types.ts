import type {
    ComponentProps,
    ComponentSlots,
} from "vue-component-type-helpers";
import type { ComponentPublicInstance, StyleValue } from "vue";
import TableColumn from "./TableColumn.vue";
import type { ProviderItem } from "@/composables";

export type Column = ComponentProps<typeof TableColumn>;

export type TableColumnSlots = ComponentSlots<typeof TableColumn>;

export type TableColumnComponent = Column & {
    $el: ComponentPublicInstance;
    $slots: TableColumnSlots;
    style: StyleValue;
    isHeaderUnselectable: boolean;
};

export type TableColumn = Omit<ProviderItem, "data"> &
    TableColumnComponent & {
        thAttrsData: object;
        tdAttrsData: Array<object>;
    };
