<script setup lang="ts" generic="T, K extends string">
import { computed, getCurrentInstance } from "vue";

import { defineClasses, useProviderChild } from "@/composables";
import { toCssDimension } from "@/utils/helpers";

import type { TableColumnComponent, TableComponent } from "./types";
import type { TableColumnProps } from "./props";

/**
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
    sortable: false,
    visible: true,
    sticky: false,
    headerSelectable: false,
    customSort: undefined,
    customSearch: undefined,
    thAttrs: undefined,
    tdAttrs: undefined,
});

const style = computed(() => ({
    width: toCssDimension(props.width),
}));

const isHeaderUnselectable = computed(
    () => !props.headerSelectable && props.sortable,
);

const vm = getCurrentInstance();

const providedData = computed<TableColumnComponent<T>>(() => ({
    ...props,
    $el: vm!.proxy!,
    $slots: vm!.slots,
    style: style.value,
    thClasses: thClasses.value,
    tdClasses: tdClasses.value,
}));

const { parent, item } = useProviderChild<TableComponent>({
    data: providedData,
});

// --- Computed Component Classes ---

const thClasses = defineClasses(
    [
        "thCurrentSortClass",
        "o-table__th-current-sort",
        null,
        computed(() => parent.value?.isColumnSorted(item.value)),
    ],
    [
        "thSortableClass",
        "o-table__th--sortable",
        null,
        computed(() => props.sortable),
    ],
    [
        "thUnselectableClass",
        "o-table__th--unselectable",
        null,
        isHeaderUnselectable,
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

// --- SLOTS TYPED OBJECTS ---

// these properties are just for type addings
// slot props will be set in Table.vue
const row = {} as any;
const column = {} as TableColumnProps<T, K>;
const index = 0;
const toggle = () => {};
const filters = {} as Record<string, string>;
</script>

<template>
    <span :data-id="item.identifier" data-oruga="table-column">
        {{ label }}

        <!--
            Do not render these slots here.
            These are only for documentation purposes.
            Slots are defined in table component.
        -->
        <template v-if="false">
            <!--
                @slot Default Slot
                @binding {T} row - row data 
                @binding {TableColumn} column - column definition 
                @binding {number} index - row index 
                @binding {number} colindex - column index 
                @binding {(): void} toggle-details - toggle details function 
            -->
            <slot
                :row="row"
                :column="column"
                :index="index"
                :colindex="index"
                :toggle-details="toggle" />
            <!--
                @slot Override header label 
                @binding {TableColumn} column - column definition 
                @binding {number} index - column index 
            -->
            <slot name="header" :column="column" :index="index" />
            <!--
                @slot Override subheading label 
                @binding {TableColumn} column - column definition 
                @binding {number} index - column index 
            -->
            <slot name="subheading" :column="column" :index="index" />

            <!--
                @slot Override searchable input 
                @binding {TableColumn} column - column definition 
                @binding {number} index - column index 
                @binding {object} filters - active filters object
            -->
            <slot
                name="searchable"
                :column="column"
                :index="index"
                :filters="filters" />
        </template>
    </span>
</template>
