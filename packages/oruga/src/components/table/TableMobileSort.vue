<template>
    <div class="o-table-mobile-sort">
        <div class="field has-addons">
            <o-select
                v-model="sortMultipleSelect"
                expanded
                v-if="sortMultiple">
                <option
                    v-for="(column, index) in sortableColumns"
                    :key="index"
                    :value="column">
                    {{ getLabel(column) }}
                    <template v-if="getSortingObjectOfColumn(column)">
                        <template v-if="columnIsDesc(column)">
                            &#8595;
                        </template>
                        <template v-else>
                            &#8593;
                        </template>
                    </template>
                </option>
            </o-select>
            <o-select
                v-model="mobileSort"
                expanded
                v-else>
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
            <div class="control">
                <template
                    v-if="sortMultiple && sortMultipleData.length > 0" >
                    <button
                        variant="primary"
                        @click="sort">
                        <o-icon
                            :class="{ 'o-sort-icon-desc': columnIsDesc(sortMultipleSelect) }"
                            :icon="sortIcon"
                            :pack="iconPack"
                            :size="sortIconSize"
                            both
                        />
                    </button>
                    <o-button
                        variant="primary"
                        @click="removePriority">
                        <o-icon
                            icon="delete"
                            :size="sortIconSize"
                            both
                        />
                    </o-button>
                </template>
                <o-button
                    v-else-if="!sortMultiple"
                    variant="primary"
                    @click="sort">
                    <o-icon
                        v-show="currentSortColumn === mobileSort"
                        :class="{ 'o-sort-icon-desc': !isAsc }"
                        :icon="sortIcon"
                        :pack="iconPack"
                        :size="sortIconSize"
                        both
                    />
                </o-button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../button/Button'
import Select from '../select/Select'
import Icon from '../icon/Icon'

export default {
    name: 'OTableMobileSort',
    components: {
        [Button.name]: Button,
        [Select.name]: Select,
        [Icon.name]: Icon
    },
    props: {
        currentSortColumn: Object,
        sortMultipleData: Array,
        isAsc: Boolean,
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
        sortMultiple: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sortMultipleSelect: '',
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
        sortMultipleSelect(column) {
            if (this.ignoreSort) {
                this.ignoreSort = false
            } else {
                this.$emit('sort', column, this.defaultEvent)
            }
        },
        mobileSort(column) {
            if (this.currentSortColumn === column) return

            this.$emit('sort', column, this.defaultEvent)
        },
        currentSortColumn(column) {
            this.mobileSort = column
        }
    },
    methods: {
        removePriority() {
            this.$emit('removePriority', this.sortMultipleSelect)
            // ignore the watcher to sort when we just change whats displayed in the select
            // otherwise the direction will be flipped
            // The sort event is already triggered by the emit
            this.ignoreSort = true
            // Select one of the other options when we reset one
            let remainingFields = this.sortMultipleData.filter((data) =>
                data.field !== this.sortMultipleSelect.field)
                .map((data) => data.field)
            this.sortMultipleSelect = this.columns.filter((column) =>
                remainingFields.includes(column.field))[0]
        },
        getSortingObjectOfColumn(column) {
            return this.sortMultipleData.filter((i) =>
                i.field === column.field)[0]
        },
        columnIsDesc(column) {
            let sortingObject = this.getSortingObjectOfColumn(column)
            if (sortingObject) {
                return !!(sortingObject.order && sortingObject.order === 'desc')
            }
            return true
        },
        getLabel(column) {
            let sortingObject = this.getSortingObjectOfColumn(column)
            if (sortingObject) {
                return column.label + '(' + (this.sortMultipleData.indexOf(sortingObject) + 1) + ')'
            }
            return column.label
        },
        sort() {
            this.$emit('sort', (this.sortMultiple ? this.sortMultipleSelect : this.mobileSort), this.defaultEvent)
        }
    }
}
</script>
