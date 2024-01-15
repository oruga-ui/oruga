<script setup lang="ts">
import {
    computed,
    onBeforeMount,
    ref,
    useSlots,
    getCurrentInstance,
    type PropType,
} from "vue";

import { useProviderChild } from "@/composables";
import { toCssDimension } from "@/utils/helpers";

import type { TableColumnComponent, Column } from "./types";

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
    /** Define a custom sort function */
    customSort: {
        type: Function as PropType<
            (a: Column, b: Column, isAsc: boolean) => number
        >,
        default: undefined,
    },
    /** Define a custom funtion for the filter search */
    customSearch: {
        type: Function as PropType<(row: unknown, filter: string) => boolean>,
        default: undefined,
    },
    /** Whether the column is sticky or not */
    sticky: { type: Boolean, default: false },
    /** Make header selectable */
    headerSelectable: { type: Boolean, default: false },
    /** Adds native attributes to th */
    thAttrs: {
        type: Function as PropType<(column: Column) => object>,
        default: () => ({}),
    },
    /** Adds native attributes to td */
    tdAttrs: {
        type: Function as PropType<(row: unknown, column: Column) => object>,
        default: () => ({}),
    },
});

const thAttrsData = ref({});
const tdAttrsData = ref([]);

const style = computed(() => ({
    width: toCssDimension(props.width),
}));

const isHeaderUnselectable = computed(
    () => !props.headerSelectable && props.sortable,
);

const vm = getCurrentInstance();
const slots = useSlots();

const providedData = computed<TableColumnComponent>(() => ({
    ...props,
    $el: vm.proxy,
    $slots: slots,
    style: style.value,
    thAttrsData: thAttrsData.value,
    tdAttrsData: tdAttrsData.value,
    isHeaderUnselectable: isHeaderUnselectable.value,
}));

const { item } = useProviderChild({ data: providedData });

onBeforeMount(() => {
    if (typeof props.thAttrs !== "undefined") {
        thAttrsData.value = props.thAttrs(props);
    }
});
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
                @binding {unknown} row - row data 
                @binding {Column} column - column definition 
                @binding {number} index - row index 
                @binding {number} colindex - column index 
                @binding {(row): void} toggle-details - toggle details function 
            -->
            <slot
                :row="null"
                :column="null"
                :index="null"
                :colindex="null"
                :toggle-details="null" />
            <!--
                @slot Override header label 
                @binding {Column} column - column definition 
                @binding {number} index - column index 
            -->
            <slot name="header" :column="null" :index="null" />
            <!--
                @slot Override subheading label 
                @binding {Column} column - column definition 
                @binding {number} index - column index 
            -->
            <slot name="subheading" :column="null" :index="null" />

            <!--
                @slot Override searchable input 
                @binding {Column} column - column definition 
                @binding {number} index - column index 
                @binding {Record<string,string>} filters - active filters object
            -->
            <slot
                name="searchable"
                :column="null"
                :index="null"
                :filter="null" />
        </template>
    </span>
</template>
