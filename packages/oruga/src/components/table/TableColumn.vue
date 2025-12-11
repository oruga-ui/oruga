<script setup lang="ts" generic="T, K extends string">
import { computed, useSlots, useTemplateRef, type VNode } from "vue";

import { defineClasses, useProviderChild } from "@/composables";
import { toCssDimension } from "@/utils/helpers";

import type { TableColumn, TableColumnComponent } from "./types";
import type { TableColumnProps } from "./props";

/**
 * Define a column used by the table component.
 * @displayName Table Column
 */
defineOptions({
    isOruga: true,
    name: "OTableColumn",
    configField: "table",
});

const props = withDefaults(defineProps<TableColumnProps<T, K>>(), {
    label: undefined,
    field: undefined,
    formatter: undefined,
    subheading: undefined,
    width: undefined,
    numeric: false,
    position: undefined,
    searchable: false,
    filterable: false,
    sortable: false,
    hidden: false,
    sticky: false,
    /** @deprecated remove */
    headerSelectable: false,
    customSort: undefined,
    customSearch: undefined,
    customFilter: undefined,
    thAttrs: undefined,
    tdAttrs: undefined,
});

const rootRef = useTemplateRef<HTMLElement>("rootElement");

defineSlots<{
    /**
     * Define the column content here
     * @param row {unknown} - row data
     * @param column {TableColumn} - column definition
     * @param index {number} - row index
     * @param colindex {number} - column index
     * @param toggleDetails {(): void} - toggle details function
     */
    default?(props: {
        row: T extends unknown ? any : T;
        column: TableColumn<T>;
        index: number;
        colindex: number;
        toggleDetails: () => void;
    }): VNode[];
    /**
     * Override header label
     * @param column {TableColumn} - column definition
     * @param index {number} - column index
     */
    header?(props: { column: TableColumn<T>; index: number }): VNode[];
    /**
     * Override subheading label
     * @param column {TableColumn} - column definition
     * @param index {number} - column index
     */
    subheading?(props: { column: TableColumn<T>; index: number }): VNode[];
    /**
     * Override searchable input
     * @deprecated use `filter` instead
     * @param column {TableColumn} - column definition
     * @param index {number} - column index
     * @param filters {object} - active filters object
     */
    searchable?(props: {
        column: TableColumn<T>;
        index: number;
        filters: Record<string, string>;
    }): VNode[];
    /**
     * Override filter input
     * @param column {TableColumn} - column definition
     * @param index {number} - column index
     * @param filters {object} - active filters object
     */
    filter?(props: {
        column: TableColumn<T>;
        index: number;
        filters: Record<string, string>;
    }): VNode[];
}>();

const slots = useSlots();

// provided data is a computed ref to ensure reactivity
const providedData = computed<TableColumnComponent<T>>(() => ({
    ...(props as TableColumn<T>),
    $slots: slots,
    style: style.value,
    thClasses: thClasses.value,
    tdClasses: tdClasses.value,
    thSubClasses: thSubheadingClasses.value,
}));

/** inject functionalities and data from the parent component */
const { item } = useProviderChild<unknown, TableColumnComponent<T>>(rootRef, {
    data: providedData,
});

const style = computed(() => ({
    width: toCssDimension(props.width),
    "min-width": toCssDimension(props.width),
}));

// #region --- Computed Component Classes ---

const thClasses = defineClasses(
    [
        "thSortableClass",
        "o-table__th--sortable",
        null,
        computed(() => props.sortable),
    ],
    /** @deprecated will be removed*/
    [
        "thUnselectableClass",
        "o-table__th--unselectable",
        null,
        computed(() => props.sortable && !props.headerSelectable),
    ],
    [
        "thPositionClass",
        "o-table__th--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
    [
        "thStickyClass",
        "o-table__th--sticky",
        null,
        computed(() => props.sticky),
    ],
);

const tdClasses = defineClasses(
    [
        "tdPositionClass",
        "o-table__td--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
    [
        "tdStickyClass",
        "o-table__td--sticky",
        null,
        computed(() => props.sticky),
    ],
);

const thSubheadingClasses = defineClasses(
    ["thSubheadingClass", "o-table__th-subheading"],
    [
        "thPositionClass",
        "o-table__th--",
        computed(() => props.position),
        computed(() => !!props.position),
    ],
);

// #endregion --- Computed Component Classes ---

// --- SLOTS TYPED OBJECTS ---

// these properties are just for type addings
// slot props will be set in Table.vue
const row = {} as any;
const column = {} as TableColumn<T>;
const index = 0;
const toggle = () => {};
const filters = {} as Record<string, string>;
</script>

<template>
    <span
        ref="rootElement"
        data-oruga="table-column"
        :data-id="`table-${item.identifier}`">
        {{ label }}

        <!--
            Do not render these slots here.
            These are only for documentation purposes.
            Slots are defined in table component.
        -->
        <template v-if="false">
            <slot
                :row="row"
                :column="column"
                :index="index"
                :colindex="index"
                :toggle-details="toggle" />

            <slot name="header" :column="column" :index="index" />

            <slot name="subheading" :column="column" :index="index" />

            <slot
                name="searchable"
                :column="column"
                :index="index"
                :filters="filters" />

            <slot
                name="filter"
                :column="column"
                :index="index"
                :filters="filters" />
        </template>
    </span>
</template>
