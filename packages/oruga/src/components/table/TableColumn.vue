<script setup lang="ts" generic="T">
import { computed, getCurrentInstance } from "vue";

import { useProviderChild } from "@/composables";
import { toCssDimension } from "@/utils/helpers";

import type { TableColumnComponent } from "./types";
import type { TableColumnProps } from "./props";

/**
 * @displayName Table Column
 */
defineOptions({
    isOruga: true,
    name: "OTableColumn",
    configField: "table",
});

const props = withDefaults(defineProps<TableColumnProps<T>>(), {
    label: undefined,
    field: undefined,
    formatter: undefined,
    subheading: undefined,
    meta: undefined,
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
    isHeaderUnselectable: isHeaderUnselectable.value,
}));

const { item } = useProviderChild({ data: providedData });

// --- SLOTS TYPED OBJECTS ---

// these properties are just for type addings
// slot props will be set in Table.vue
const row = {} as any;
const column = {} as TableColumnProps<T>;
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
