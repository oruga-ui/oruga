<script setup lang="ts" generic="T">
import { computed, watch, ref } from "vue";

import OButton from "@/components/button/Button.vue";
import OSelect from "@/components/select/Select.vue";
import OIcon from "@/components/icon/Icon.vue";
import OField from "@/components/field/Field.vue";

import type { TableColumnItem } from "./types";
import type { ClassBinding } from "@/types";

defineOptions({
    isOruga: true,
    name: "OTableMobileSort",
    configField: "table",
});

const props = withDefaults(
    defineProps<{
        /** the column the table is currently sorted by */
        currentSortColumn?: TableColumnItem<T>;
        /** all table columns, the sortable ones are selectable */
        columns: TableColumnItem<T>[];
        /** placeholder of the sort select */
        placeholder: string;
        /** icon pack of the sort icon */
        iconPack?: string;
        /** icon of the sort direction button */
        sortIcon?: string;
        /** size of the sort direction icon */
        sortIconSize?: string;
        /** the current sort direction is ascending */
        isAsc?: boolean;
        /** classes of the mobile sort elements */
        mobileSortClasses: ClassBinding[];
    }>(),
    {
        currentSortColumn: undefined,
        sortIcon: "arrow-up",
        sortIconSize: "small",
        iconPack: undefined,
        isAsc: false,
    },
);

const emits = defineEmits<{
    sort: [column: TableColumnItem<T>, event: Event];
}>();

const mobileSort = ref<string | undefined>(props.currentSortColumn?.identifier);

const showPlaceholder = computed(
    () =>
        !props.columns ||
        props.columns.every((column) => column.identifier !== mobileSort.value),
);

const sortableColumns = computed(() =>
    props.columns ? props.columns.filter((c) => c.sortable) : [],
);

const isCurrentSort = computed(
    () => props.currentSortColumn?.identifier === mobileSort.value,
);

watch(mobileSort, (value) => {
    if (props.currentSortColumn?.identifier === value) return;
    sort(new Event("sort"));
});

watch(
    () => props.currentSortColumn,
    (column) => {
        mobileSort.value = column?.identifier;
    },
);

function sort(event: Event): void {
    const column = sortableColumns.value.find(
        (column) => column.identifier === mobileSort.value,
    );
    if (!column) return;
    emits("sort", column, event);
}
</script>

<template>
    <div :class="mobileSortClasses">
        <o-field addons>
            <o-select v-model="mobileSort" expanded>
                <template v-if="placeholder">
                    <option
                        v-show="showPlaceholder"
                        :value="{}"
                        selected
                        disabled
                        hidden>
                        {{ placeholder }}
                    </option>
                </template>
                <option
                    v-for="(column, index) in sortableColumns"
                    :key="column.field || index"
                    :value="column.identifier">
                    {{ column.label }}
                </option>
            </o-select>

            <o-button @click="sort($event)">
                <o-icon
                    v-show="isCurrentSort"
                    :icon="sortIcon"
                    :pack="iconPack"
                    :size="sortIconSize"
                    :rotation="!isAsc ? 180 : 0" />
            </o-button>
        </o-field>
    </div>
</template>
