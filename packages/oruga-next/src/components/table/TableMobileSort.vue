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
                    :value="column">
                    {{ column.label }}
                </option>
            </o-select>
            <o-button @click="sort">
                <!--  :class="$table.iconSortClasses()" -->
                <o-icon
                    v-show="currentSortColumn === mobileSort"
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
            mobileSort: this.currentSortColumn,
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
            return !this.columns || !this.columns.some((column) => column === this.mobileSort)
        },
        sortableColumns() {
            if (!this.columns) return []
            return this.columns.filter(c => c.sortable)
        }
    },
    watch: {
        mobileSort(column) {
            if (this.currentSortColumn === column) return
            this.$emit('sort', column, this.defaultEvent)
        },
        currentSortColumn(column) {
            this.mobileSort = column
        }
    },
    methods: {
        sort() {
            this.$emit('sort', this.mobileSort, this.defaultEvent)
        }
    }
})
</script>
