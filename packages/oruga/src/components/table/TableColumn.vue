<script setup lang="ts" generic="T">
import { toRaw, computed, getCurrentInstance, type PropType } from "vue";

import { useProviderChild } from "@/composables";
import { toCssDimension } from "@/utils/helpers";

import type { TableColumnComponent } from "./types";

/**
 * @displayName Table Column
 */
defineOptions({
    isOruga: true,
    name: "OTableColumn",
    configField: "table",
});

const props = defineProps({
    /** Define the column label */
    label: { type: String, default: undefined },
    /** Define an object property key if data is an object */
    field: { type: String, default: undefined },
    /** Provide a display function to edit the output */
    display: {
        type: Function as PropType<(value: unknown, row: T) => string>,
        default: undefined,
    },
    /** Define a column sub heading  */
    subheading: { type: String, default: undefined },
    /** Add addtional meta information for the column for custom purpose*/
    meta: {
        type: [String, Number, Boolean, Function, Object, Array],
        default: undefined,
    },
    /** Column fixed width */
    width: { type: [Number, String], default: undefined },
    /** Define column value as number */
    numeric: { type: Boolean, default: false },
    /**
     * Position of the column content
     * @values left, centered, right
     */
    position: {
        type: String,
        default: undefined,
        validator: (value: string) =>
            ["left", "centered", "right"].indexOf(value) > -1,
    },
    /** Enable an additional searchbar below the column header */
    searchable: { type: Boolean, default: false },
    /** Enable column sortability */
    sortable: { type: Boolean, default: false },
    /** Define whether the column is visible or not */
    visible: { type: Boolean, default: true },
    /** Whether the column is sticky or not */
    sticky: { type: Boolean, default: false },
    /** Make header selectable */
    headerSelectable: { type: Boolean, default: false },
    /** Define a custom sort function */
    customSort: {
        type: Function as PropType<(a: T, b: T, isAsc: boolean) => number>,
        default: undefined,
    },
    /** Define a custom filter funtion for the search */
    customSearch: {
        type: Function as PropType<(row: T, filter: string) => boolean>,
        default: undefined,
    },
    /**
     * Adds native attributes to th
     * @deprecated will be moved to table component in v0.9
     */
    thAttrs: {
        type: Function as PropType<(column: typeof props) => object>,
        default: () => ({}),
    },
    /**
     * Adds native attributes to td
     * @deprecated will be moved to table component in v0.9
     */
    tdAttrs: {
        type: Function as PropType<(row: T, column: typeof props) => object>,
        default: () => ({}),
    },
});

const style = computed(() => ({
    width: toCssDimension(props.width),
}));

const isHeaderUnselectable = computed(
    () => !props.headerSelectable && props.sortable,
);

const vm = getCurrentInstance();

const providedData = computed<TableColumnComponent>(() => ({
    ...toRaw(props), // TODO: remove toRaw when tdAttrs/thAttrs are moved to table component
    label: props.label,
    field: props.field,
    subheading: props.subheading,
    meta: props.meta,
    width: props.width,
    numeric: props.numeric,
    position: props.position,
    searchable: props.searchable,
    sortable: props.sortable,
    visible: props.visible,
    customSort: props.customSort,
    customSearch: props.customSearch,
    sticky: props.sticky,
    headerSelectable: props.headerSelectable,
    $el: vm.proxy,
    $slots: vm.slots,
    style: style.value,
    isHeaderUnselectable: isHeaderUnselectable.value,
}));

const { item } = useProviderChild({ data: providedData });
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
                :row="null"
                :column="null"
                :index="null"
                :colindex="null"
                :toggle-details="null" />
            <!--
                @slot Override header label 
                @binding {TableColumn} column - column definition 
                @binding {number} index - column index 
            -->
            <slot name="header" :column="null" :index="null" />
            <!--
                @slot Override subheading label 
                @binding {TableColumn} column - column definition 
                @binding {number} index - column index 
            -->
            <slot name="subheading" :column="null" :index="null" />

            <!--
                @slot Override searchable input 
                @binding {TableColumn} column - column definition 
                @binding {number} index - column index 
                @binding {object} filters - active filters object
            -->
            <slot
                name="searchable"
                :column="null"
                :index="null"
                :filters="null" />
        </template>
    </span>
</template>
