<template>
    <div :class="$table.mobileSortClasses">
        <o-field>
            <o-select
                v-model="mobileSort"
                expanded>
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
                    :key="index"
                    :value="column.newKey">
                    {{ column.label }}
                </option>
            </o-select>
            <o-button @click="sort">
                <o-icon
                    v-show="isCurrentSort"
                    :icon="sortIcon"
                    :pack="iconPack"
                    :size="sortIconSize"
                    both
                    :rotation="!isAsc ? 180 : 0"
                />
            </o-button>
        </o-field>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Button from '../button/Button.vue'
import Select from '../select/Select.vue'
import Icon from '../icon/Icon.vue'
import Field from '../field/Field.vue'

import { getValueByPath } from '../../../../oruga/src/utils/helpers'

export default defineComponent({
    name: 'OTableMobileSort',
    components: {
        [Button.name]: Button,
        [Select.name]: Select,
        [Icon.name]: Icon,
        [Field.name]: Field
    },
    inject: ['$table'],
    emits: ['sort'],
    props: {
        currentSortColumn: Object,
        columns: Array,
        placeholder: String,
        iconPack: String,
        sortIcon: {
            type: String,
            default: 'arrow-up'
        },
        sortIconSize: {
            type: String,
            default: 'small'
        },
        isAsc: Boolean
    },
    data() {
        return {
            mobileSort: getValueByPath(this.currentSortColumn, 'newKey'),
            defaultEvent: {
                shiftKey: true,
                altKey: true,
                ctrlKey: true
            },
            ignoreSort: false
        }
    },
    computed: {
        showPlaceholder() {
            return !this.columns || !this.columns.some((column) =>
                (getValueByPath(column, 'newKey') === this.mobileSort)
            )
        },
        sortableColumns() {
            if (!this.columns) return []
            return this.columns.filter(c => c.sortable)
        },
        isCurrentSort() {
            return getValueByPath(this.currentSortColumn, 'newKey') === this.mobileSort
        }
    },
    watch: {
        mobileSort(value) {
            if (this.currentSortColumn.newKey === value) return
            const column = this.sortableColumns.filter(c =>
                (getValueByPath(c, 'newKey') === value)
            )[0]
            this.$emit('sort', column, this.defaultEvent)
        },
        currentSortColumn(column) {
            this.mobileSort = getValueByPath(column, 'newKey')
        }
    },
    methods: {
        sort() {
            const column = this.sortableColumns.filter(c =>
                (getValueByPath(c, 'newKey') === this.mobileSort)
            )[0]
            this.$emit('sort', column, this.defaultEvent)
        }
    }
})
</script>
