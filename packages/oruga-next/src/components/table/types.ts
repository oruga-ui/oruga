import type { ComponentPublicInstance, StyleValue } from "vue";
import TableColumn from "./TableColumn.vue";
import type { ProviderItem } from "@/composables";
import type { ComponentSlots } from "vue-component-type-helpers";

export type Column = Partial<{
    /** Define the column label */
    label: string;
    /** Define the object property key */
    field: string;
    /** Define a column sub label */
    subheading: string;
    /** Enable column sortability */
    sortable: boolean;
    /** Enable an additional searchbar below the column header */
    searchable: boolean;
    /** Add addtional meta information for the column */
    meta: unknown;
    /** Column fixed width */
    width: number | string;
    /** Define column value as number */
    numeric: boolean;
    /**
     * Position of the column content
     * @values left, centered, right
     */
    position: string;
    /** Define whether the column is visible or not - default true */
    visible: boolean;
    /** Define a custom sort function */
    customSort: (a: Column, b: Column, isAsc: boolean) => number;
    /** Define a custom funtion for the filter search */
    customSearch: (row: unknown, filter: string) => boolean;
    /** Whether the column is sticky or not */
    sticky: boolean;
    /** Make header selectable  */
    headerSelectable;
    /** Adds native attributes to th :th-attrs="(column)" => ({})" */
    thAttrs: (column: Column) => object;
    /** Adds native attributes to td :td-attrs="(row, column)" => ({})" */
    tdAttrs: (row: unknown, column: Column) => object;
}>;

export type TableColumnSlots = ComponentSlots<typeof TableColumn>;

export type TableColumnComponent = Column & {
    $el: ComponentPublicInstance;
    $slots: TableColumnSlots;
    style: StyleValue;
    thAttrsData: object;
    tdAttrsData: Array<object>;
    isHeaderUnselectable: boolean;
};

export type TableColumn = Omit<ProviderItem, "data"> & TableColumnComponent;
