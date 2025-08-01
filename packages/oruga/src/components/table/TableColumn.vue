<script setup lang="ts" generic="T, K extends string">
import { computed, getCurrentInstance, useTemplateRef } from "vue";

import OInput from "@/components/input/Input.vue";

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
    sortable: false,
    hidden: false,
    sticky: false,
    /** @deprecated remove */
    headerSelectable: false,
    customSort: undefined,
    customSearch: undefined,
    thAttrs: undefined,
    tdAttrs: undefined,
});

const rootRef = useTemplateRef<HTMLElement>("rootElement");

const vm = getCurrentInstance();

// provided data is a computed ref to ensure reactivity
const providedData = computed<TableColumnComponent<T>>(() => ({
    ...(props as TableColumn<T>),
    $instance: vm!.proxy!,
    $slots: vm!.slots,
    style: style.value,
    thClasses: thClasses.value,
    tdClasses: tdClasses.value,
    thSubClasses: thSubheadingClasses.value,
}));

/** inject functionalities and data from the parent component */
const { parent, item } = useProviderChild<TableColumnComponent<T>>(rootRef, {
    data: providedData,
});

const p = parent as any;

const style = computed(() => ({
    width: toCssDimension(props.width),
    "min-width": toCssDimension(props.width),
}));

/** check if the column is the current sort column */
const isColumnSorted = computed(
    () => p.currentSortColumn.value?.identifier === item.value.identifier,
);

function onFilterChange(value: string, event: Event): void {
    // emits("filters-event", props.filtersEvent, filters.value, event);
}

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

const thLabelClasses = defineClasses(["thLabelClass", "o-table__th__label"]);

const thSortIconClasses = defineClasses([
    "thSortIconClass",
    "o-table__th__sort-icon",
]);

// #endregion --- Computed Component Classes ---

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
    <span
        ref="rootElement"
        data-oruga="table-column"
        :data-id="`table-${item.identifier}`">
        <!-- {{ label }} -->

        <!--
            Do not render these slots here.
            These are only for documentation purposes.
            Slots are defined in table component.
        -->
        <!-- <template v-if="false"> -->

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
        <slot name="header" :column="column" :index="index">
            <span :class="thLabelClasses">
                {{ column.label }}
            </span>
            <span
                v-if="column.sortable"
                v-show="isColumnSorted"
                :class="thSortIconClasses"
                :aria-hidden="!isColumnSorted">
                <o-icon
                    :icon="p.sortIcon"
                    :pack="p.iconPack"
                    :size="p.sortIconSize"
                    :rotation="!p.isAsc ? 180 : 0" />
            </span>
        </slot>

        <!--
            @slot Override subheading label
            @binding {TableColumn} column - column definition
            @binding {number} index - column index
        -->
        <slot name="subheading" :column="column" :index="index">
            <span :class="thLabelClasses">
                {{ column.subheading }}
            </span>
        </slot>

        <!--
            @slot Override searchable input
            @binding {TableColumn} column - column definition
            @binding {number} index - column index
            @binding {object} filters - active filters object
        -->
        <slot name="filter" :column="column" :index="index" :filters="filters">
            <!--
                @slot Override searchable input
                @deprecated use `filter` instead
                @binding {TableColumn} column - column definition
                @binding {number} index - column index
                @binding {object} filters - active filters object
            -->
            <slot
                name="searchable"
                :column="column"
                :index="index"
                :filters="filters">
                <o-input
                    :name="`column_${column.field}_filter`"
                    :type="column.numeric ? 'number' : 'search'"
                    role="searchbox"
                    :placeholder="p.filtersPlaceholder"
                    :icon="p.filtersIcon"
                    :pack="p.iconPack"
                    size="small"
                    :aria-label="`${column.label} filter`"
                    @input="onFilterChange" />
            </slot>
        </slot>
        <!-- </template> -->
    </span>
</template>
