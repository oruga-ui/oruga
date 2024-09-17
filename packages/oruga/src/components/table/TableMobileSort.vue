<script setup lang="ts" generic="T">
import { computed, watch, ref, type PropType } from "vue";

import OButton from "@/components/button/Button.vue";
import OSelect from "@/components/select/Select.vue";
import OIcon from "@/components/icon/Icon.vue";
import OField from "@/components/field/Field.vue";

import { getValueByPath } from "@/utils/helpers";

import type { TableColumnItem } from "./types";
import type { ClassBind } from "@/types";

defineOptions({
    isOruga: true,
    name: "OTableMobileSort",
    configField: "table",
});

const props = defineProps({
    currentSortColumn: {
        type: Object as PropType<TableColumnItem<T>>,
        default: undefined,
    },
    columns: {
        type: Array as PropType<TableColumnItem<T>[]>,
        default: undefined,
    },
    placeholder: { type: String, default: undefined },
    iconPack: { type: String, default: undefined },
    sortIcon: { type: String, default: "arrow-up" },
    sortIconSize: { type: String, default: "small" },
    isAsc: { type: Boolean, default: false },
    mobileSortClasses: { type: Array as PropType<ClassBind[]>, required: true },
});

const emits = defineEmits<{
    (e: "sort", column: TableColumnItem<T>, event: Event);
}>();

const mobileSort = ref<string>(
    getValueByPath(props.currentSortColumn, "identifier"),
);

const showPlaceholder = computed(
    () =>
        !props.columns ||
        !props.columns.some(
            (column) =>
                getValueByPath(column, "identifier") === mobileSort.value,
        ),
);

const sortableColumns = computed(() =>
    props.columns ? props.columns.filter((c) => c.sortable) : [],
);

const isCurrentSort = computed(
    () =>
        getValueByPath(props.currentSortColumn, "identifier") ===
        mobileSort.value,
);

watch(mobileSort, (value) => {
    if (props.currentSortColumn.identifier === value) return;
    sort();
});

watch(
    () => props.currentSortColumn,
    (column) => {
        mobileSort.value = getValueByPath(column, "identifier");
    },
);

function sort(event?: Event): void {
    const column = sortableColumns.value.find(
        (c) => getValueByPath(c, "identifier") === mobileSort.value,
    );
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
                    both
                    :rotation="!isAsc ? 180 : 0" />
            </o-button>
        </o-field>
    </div>
</template>
