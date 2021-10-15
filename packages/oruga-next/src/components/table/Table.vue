<template>
    <div
        :class="tableWrapperClasses"
        :style="tableWrapperStyle"
    >

        <div ref="slot" style="display:none">
            <slot />
        </div>

        <o-table-mobile-sort
            v-if="isMobile && hasSortablenewColumns"
            :current-sort-column="currentSortColumn"
            :columns="newColumns"
            :placeholder="mobileSortPlaceholder"
            :icon-pack="iconPack"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            :is-asc="isAsc"
            @sort="(column, event) => sort(column, null, event)"
            @remove-priority="(column) => removeSortingPriority(column)"
        />

        <template v-if="paginated && (paginationPosition === 'top' || paginationPosition === 'both')">
            <slot name="pagination">
                <o-table-pagination
                    v-bind="$attrs"
                    :per-page="perPage"
                    :paginated="paginated"
                    :total="newDataTotal"
                    :current-page="newCurrentPage"
                    @update:currentPage="newCurrentPage = $event"
                    :root-class="paginationWrapperClasses"
                    :icon-pack="iconPack"
                    :rounded="paginationRounded"
                    @page-change="(event) => $emit('page-change', event)"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                >
                    <slot name="top-left"/>
                </o-table-pagination>
            </slot>
        </template>

        <table
            :class="tableClasses"
            :tabindex="!focusable ? false : 0"
            @keydown.self.prevent.up="pressedArrow(-1)"
            @keydown.self.prevent.down="pressedArrow(1)">
            <caption v-if="$slots.caption">
                <slot name="caption" />
            </caption>
            <thead v-if="newColumns.length && showHeader">
                <tr>
                    <th v-if="showDetailRowIcon" :class="thDetailedClasses"/>
                    <th :class="thCheckboxClasses" v-if="checkable && checkboxPosition === 'left'">
                        <template v-if="headerCheckable">
                            <o-checkbox
                                autocomplete="off"
                                :modelValue="isAllChecked"
                                :disabled="isAllUncheckable"
                                @change="checkAll"/>
                        </template>
                    </th>
                    <th
                        v-for="(column, index) in visibleColumns"
                        :key="column.newKey + ':' + index + 'header'"
                        v-bind="column.thAttrs && column.thAttrs(column)"
                        :class="thClasses(column)"
                        :style="column.style"
                        @click.stop="sort(column, null, $event)">

                        <template v-if="column.hasHeaderSlot">
                            <o-slot-component
                                :component="column"
                                scoped
                                name="header"
                                tag="span"
                                :props="{ column, index }"
                            />
                        </template>
                        <template v-else>
                            <span>
                                {{ column.label }}
                                <span
                                    v-show="column.sortable && currentSortColumn === column"
                                    :class="thSortIconClasses(column)">
                                    <o-icon
                                        :icon="sortIcon"
                                        :pack="iconPack"
                                        both
                                        :size="sortIconSize"
                                        :rotation="!isAsc ? 180 : 0" />
                                </span>
                            </span>
                        </template>
                    </th>
                    <th :class="thCheckboxClasses" v-if="checkable && checkboxPosition === 'right'">
                        <template v-if="headerCheckable">
                            <o-checkbox
                                autocomplete="off"
                                :modelValue="isAllChecked"
                                :disabled="isAllUncheckable"
                                @change="checkAll"/>
                        </template>
                    </th>
                </tr>
                <tr v-if="hasSearchablenewColumns">
                    <th v-if="showDetailRowIcon" :class="thDetailedClasses" />
                    <th v-if="checkable && checkboxPosition === 'left'" />
                    <th
                        v-for="(column, index) in visibleColumns"
                        :key="column.newKey + ':' + index + 'searchable'"
                        v-bind="column.thAttrs && column.thAttrs(column)"
                        :class="thClasses(column)"
                        :style="column.style">
                        <template v-if="column.searchable">
                            <template v-if="column.hasSearchableSlot">
                                <o-slot-component
                                    :component="column"
                                    scoped
                                    name="searchable"
                                    tag="span"
                                    :props="{ column, filters }"
                                />
                            </template>
                            <o-input
                                v-else
                                @[filtersEvent]="onFiltersEvent"
                                v-model="filters[column.field]"
                                :type="column.numeric ? 'number' : 'text'" />
                        </template>
                    </th>
                    <th v-if="checkable && checkboxPosition === 'right'" />
                </tr>
                <tr v-if="hasCustomSubheadings">
                    <th v-if="showDetailRowIcon" :class="thDetailedClasses" />
                    <th v-if="checkable && checkboxPosition === 'left'" />
                    <th
                        v-for="(column, index) in visibleColumns"
                        :key="column.newKey + ':' + index + 'subheading'"
                        :style="column.style"
                        :class="thSubheadingClasses"
                    >
                        <template
                            v-if="
                                column.$slots &&
                                column.$slots.subheading
                            ">
                            <o-slot-component
                                :component="column"
                                scoped
                                name="subheading"
                                tag="span"
                                :props="{ column, index }"
                            />
                        </template>
                        <template v-else>{{ column.subheading }}</template>
                    </th>
                    <th v-if="checkable && checkboxPosition === 'right'" />
                </tr>
            </thead>
            <tbody>
                <template
                    v-for="(row, index) in visibleData"
                    :key="this.customRowKey ? row[this.customRowKey] : index">
                    <tr
                        :class="rowClasses(row, index)"
                        @click="selectRow(row)"
                        @dblclick="$emit('dblclick', row)"
                        @mouseenter="emitEventForRow('mouseenter', $event, row)"
                        @mouseleave="emitEventForRow('mouseleave', $event, row)"
                        @contextmenu="$emit('contextmenu', row, $event)"
                        :draggable="draggable"
                        @dragstart="handleDragStart($event, row, index)"
                        @dragend="handleDragEnd($event, row, index)"
                        @drop="handleDrop($event, row, index)"
                        @dragover="handleDragOver($event, row, index)"
                        @dragleave="handleDragLeave($event, row, index)">

                        <td
                            v-if="showDetailRowIcon"
                            :class="tdDetailedChevronClasses"
                        >

                            <o-icon
                                v-if="hasDetailedVisible(row)"
                                :icon="detailIcon"
                                :pack="iconPack"
                                :rotation="isVisibleDetailRow(row) ? 90 : 0"
                                role="button"
                                @click.stop="toggleDetails(row)"
                                clickable
                                both />
                        </td>

                        <td
                            :class="tdCheckboxClasses"
                            v-if="checkable && checkboxPosition === 'left'">
                            <o-checkbox
                                autocomplete="off"
                                :disabled="!isRowCheckable(row)"
                                :modelValue="isRowChecked(row)"
                                @update:modelValue="checkRow(row, index, $event)"
                            />
                        </td>

                        <o-slot-component
                            v-for="(column, colindex) in visibleColumns"
                            :key="column.newKey + index + ':' + colindex"
                            v-bind="column.tdAttrs && column.tdAttrs(row, column)"
                            :component="column"
                            scoped
                            name="default"
                            tag="td"
                            :class="tdClasses(row, column)"
                            :data-label="column.label"
                            :props="{ row, column, index, colindex, toggleDetails }"
                            @click="$emit('cell-click', row, column, index, colindex, $event)"
                        />

                        <td
                            :class="tdCheckboxClasses"
                            v-if="checkable && checkboxPosition === 'right'">
                            <o-checkbox
                                autocomplete="off"
                                :disabled="!isRowCheckable(row)"
                                :modelValue="isRowChecked(row)"
                                @update:modelvalue="checkRow(row, index, $event)"
                            />
                        </td>
                    </tr>

                    <transition :name="detailTransition">
                        <tr
                            v-if="isActiveDetailRow(row)"
                            :key="(this.customRowKey ? row[this.customRowKey] : index) + 'detail'"
                            :class="detailedClasses">
                            <td :colspan="columnCount">
                                <slot
                                    name="detail"
                                    :row="row"
                                    :index="index"/>
                            </td>
                        </tr>
                    </transition>
                    <slot
                        v-if="isActiveCustomDetailRow(row)"
                        name="detail"
                        :row="row"
                        :index="index"
                    />
                </template>

                <tr v-if="!visibleData.length">
                    <td :colspan="columnCount">
                        <slot name="empty"/>
                    </td>
                </tr>

            </tbody>

            <tfoot v-if="$slots.footer">
                <tr :class="footerClasses">
                    <slot name="footer" v-if="hasCustomFooterSlot()"/>
                    <th :colspan="columnCount" v-else>
                        <slot name="footer"/>
                    </th>
                </tr>
            </tfoot>
        </table>

        <template v-if="loading">
            <slot name="loading">
                <o-loading :full-page="false" :active="loading" />
            </slot>
        </template>

        <template v-if="(checkable && $slots['bottom-left']) ||
            (paginated && (paginationPosition === 'bottom' || paginationPosition === 'both'))">
            <slot name="pagination">
                <o-table-pagination
                    v-bind="$attrs"
                    :per-page="perPage"
                    :paginated="paginated"
                    :total="newDataTotal"
                    :current-page="newCurrentPage"
                    @update:currentPage="newCurrentPage = $event"
                    :root-class="paginationWrapperClasses"
                    :icon-pack="iconPack"
                    :rounded="paginationRounded"
                    @page-change="(event) => $emit('page-change', event)"
                    :aria-next-label="ariaNextLabel"
                    :aria-previous-label="ariaPreviousLabel"
                    :aria-page-label="ariaPageLabel"
                    :aria-current-label="ariaCurrentLabel"
                >
                    <slot name="bottom-left"/>
                </o-table-pagination>
            </slot>
        </template>

    </div>
</template>

<script lang="ts">
import { createApp, createVNode, defineComponent, h } from 'vue'

import Button from '../button/Button.vue'
import Checkbox from '../checkbox/Checkbox.vue'
import Icon from '../icon/Icon.vue'
import Input from '../input/Input.vue'
import Loading from '../loading/Loading.vue'

import SlotComponent from '../../utils/SlotComponent'

import TableMobileSort from './TableMobileSort.vue'
import TableColumn from './TableColumn.vue'
import TablePagination from './TablePagination.vue'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

import { getValueByPath, indexOf, toCssDimension, debounce, escapeRegExpChars } from '../../utils/helpers'
import { getOptions } from '../../utils/config'

/**
 * Tabulated data are sometimes needed, it's even better when it's responsive
 * @displayName Table
 * @requires ./TableColumn.vue
 * @example ./examples/Table.md
 * @style _table.scss
 */
export default defineComponent({
    name: 'OTable',
    components: {
        [Button.name]: Button,
        [Checkbox.name]: Checkbox,
        [Icon.name]: Icon,
        [Input.name]: Input,
        [Loading.name]: Loading,
        [SlotComponent.name]: SlotComponent,
        [TableMobileSort.name]: TableMobileSort,
        [TableColumn.name]: TableColumn,
        [TablePagination.name]: TablePagination
    },
    mixins: [BaseComponentMixin, MatchMediaMixin],
    configField: 'table',
    inheritAttrs: false,
    provide() {
        return {
            $table: this
        }
    },
    emits: [
        'page-change', 'click', 'dblclick', 'contextmenu',
        'check', 'check-all', 'update:checkedRows',
        'select', 'update:selected', 'filters-change', 'details-close', 'update:openedDetailed',
        'mouseenter', 'mouseleave', 'sort', 'sorting-priority-removed',
        'dragstart', 'dragend', 'drop', 'dragleave', 'dragover', 'cell-click'
    ],
    props: {
        /** Table data */
        data: {
            type: Array,
            default: () => []
        },
        /** Table columns */
        columns: {
            type: Array,
            default: () => []
        },
        /** Border to all cells */
        bordered: Boolean,
        /** Whether table is striped */
        striped: Boolean,
        /** Makes the cells narrower */
        narrowed: Boolean,
        /** Rows are highlighted when hovering */
        hoverable: Boolean,
        /** Loading state */
        loading: Boolean,
        /** Allow row details  */
        detailed: Boolean,
        /** Rows can be checked (multiple), checked rows will have a .is-checked class if you want to style */
        checkable: Boolean,
        /** Show check/uncheck all checkbox in table header when checkable */
        headerCheckable: {
            type: Boolean,
            default: true
        },
        /**
         * Position of the checkbox (if checkable is true)
         * @values left, right
         */
        checkboxPosition: {
            type: String,
            default: 'left',
            validator: (value: string) => {
                return [
                    'left',
                    'right'
                ].indexOf(value) >= 0
            }
        },
        /** Set which row is selected, use the .sync modifier (Vue 2.x) or v-model:selected (Vue 3.x) to make it two-way binding */
        selected: Object,
        /** Custom method to verify if a row is selectable, works when is selected. */
        isRowSelectable: {
            type: Function,
            default: () => true
        },
        /** Table can be focused and user can navigate with keyboard arrows (require selected) and rows are highlighted when hovering */
        focusable: Boolean,
        /** Custom method to verify if row is checked, works when is checkable. Useful for backend pagination */
        customIsChecked: Function,
        /** Custom method to verify if a row is checkable, works when is checkable */
        isRowCheckable: {
            type: Function,
            default: () => true
        },
        /** Set which rows are checked, use the .sync modifier (Vue 2.x) or v-model:checkedRows (Vue 3.x) to make it two-way binding */
        checkedRows: {
            type: Array,
            default: () => []
        },
        /** Rows appears as cards on mobile (collapse rows) */
        mobileCards: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'table.mobileCards', true)
            }
        },
        /** Sets the default sort column and order — e.g. ['first_name', 'desc']	 */
        defaultSort: [String, Array],
        /**
         * Sets the default sort column direction on the first click
         * @values asc, desc
         */
        defaultSortDirection: {
            type: String,
            default: 'asc'
        },
        /** Sets the header sorting icon */
        sortIcon: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'table.sortIcon', 'arrow-up') }
        },
        /**
         * Sets the size of the sorting icon
         * @values small, medium, large
         */
        sortIconSize: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'table.sortIconSize', 'small') }
        },
        /** Adds pagination to the table */
        paginated: Boolean,
        /** Current page of table data (if paginated), use the .sync modifier (Vue 2.x) or v-model:currentPage (Vue 3.x) to make it two-way binding */
        currentPage: {
            type: Number,
            default: 1
        },
        /** How many rows per page (if paginated) */
        perPage: {
            type: [Number, String],
            default: () => { return getValueByPath(getOptions(), 'table.perPage', 20) }
        },
        /** Allow chevron icon and column to be visible */
        showDetailIcon: {
            type: Boolean,
            default: true
        },
        /** Icon name of detail action */
        detailIcon: {
            type: String,
            default: 'chevron-right'
        },
        /**
         * Pagination position (if paginated)
         * @values bottom, top, bot
         */
        paginationPosition: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'table.paginationPosition', 'bottom') },
            validator: (value: string) => {
                return [
                    'bottom',
                    'top',
                    'both'
                ].indexOf(value) >= 0
            }
        },
        /** Columns won't be sorted with Javascript, use with sort event to sort in your backend */
        backendSorting: Boolean,
        /** Columns won't be filtered with Javascript, use with searchable prop to the columns to filter in your backend */
        backendFiltering: Boolean,
        /** Add a class to row based on the return */
        rowClass: {
            type: Function,
            default: () => ''
        },
        /** Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop) */
        openedDetailed: {
            type: Array,
            default: () => []
        },
        /** Controls the visibility of the trigger that toggles the detailed rows. */
        hasDetailedVisible: {
            type: Function,
            default: () => true
        },
        /** Use a unique key of your data Object when use detailed or opened detailed. (id recommended) */
        detailKey: {
            type: String,
            default: ''
        },
        /** Custom style on details */
        customDetailRow: {
            type: Boolean,
            default: false
        },
        /* Transition name to use when toggling row details. */
        detailTransition: {
            type: String,
            default: ''
        },
        /** Rows won't be paginated with Javascript, use with page-change event to paginate in your backend */
        backendPagination: Boolean,
        /** Total number of table data if backend-pagination is enabled */
        total: {
            type: [Number, String],
            default: 0
        },
        /** Icon pack to use */
        iconPack: String,
        /** Text when nothing is selected */
        mobileSortPlaceholder: String,
        /** Use a unique key of your data Object for each row. Useful if your data prop has dynamic indices. (id recommended) */
        customRowKey: String,
        /** Allows rows to be draggable */
        draggable: {
            type: Boolean,
            default: false
        },
        /** Add a horizontal scrollbar when table is too wide */
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        /** Show a sticky table header */
        stickyHeader: Boolean,
        /** Table fixed height */
        height: [Number, String],
        /** Add a native event to filter */
        filtersEvent: {
            type: String,
            default: ''
        },
        /** Filtering debounce time (in milliseconds) */
        debounceSearch: Number,
        /** Show header */
        showHeader: {
            type: Boolean,
            default: () => { return getValueByPath(getOptions(), 'table.showHeader', true) }
        },
        /** Make the checkbox column sticky when checkable */
        stickyCheckbox: {
            type: Boolean,
            default: false
        },
        /** Rounded pagination if paginated */
        paginationRounded: Boolean,
        tableClass: [String, Function, Array],
        wrapperClass: [String, Function, Array],
        footerClass: [String, Function, Array],
        emptyClass: [String, Function, Array],
        detailedClass: [String, Function, Array],
        borderedClass: [String, Function, Array],
        stripedClass: [String, Function, Array],
        narrowedClass: [String, Function, Array],
        hoverableClass: [String, Function, Array],
        thClass: [String, Function, Array],
        tdClass: [String, Function, Array],
        thPositionClass: [String, Function, Array],
        thStickyClass: [String, Function, Array],
        thCheckboxClass: [String, Function, Array],
        thCurrentSortClass: [String, Function, Array],
        thSortableClass: [String, Function, Array],
        thUnselectableClass: [String, Function, Array],
        thSortIconClass: [String, Function, Array],
        thDetailedClass: [String, Function, Array],
        tdPositionClass: [String, Function, Array],
        tdStickyClass: [String, Function, Array],
        tdCheckboxClass: [String, Function, Array],
        tdDetailedChevronClass: [String, Function, Array],
        trSelectedClass: [String, Function, Array],
        stickyHeaderClass: [String, Function, Array],
        scrollableClass: [String, Function, Array],
        mobileSortClass: [String, Function, Array],
        paginationWrapperClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
        thSubheadingClass: [String, Function, Array]
    },
    data() {
        return {
            getValueByPath,
            visibleDetailRows: this.openedDetailed,
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCheckedRows: [...this.checkedRows],
            lastCheckedRowIndex: null,
            newCurrentPage: this.currentPage,
            currentSortColumn: {},
            isAsc: true,
            filters: {},
            defaultSlots: [],
            firstTimeSort: true,
            sequence: 1
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.checkSort()
        })
    },
    computed: {
        tableClasses() {
            return [
                this.computedClass('tableClass', 'o-table'),
                { [this.computedClass('borderedClass', 'o-table--bordered')]: this.bordered },
                { [this.computedClass('stripedClass', 'o-table--striped')]: this.striped },
                { [this.computedClass('narrowedClass', 'o-table--narrowed')]: this.narrowed },
                { [this.computedClass('hoverableClass', 'o-table--hoverable')]: ((this.hoverable || this.focusable) && this.visibleData.length) },
                { [this.computedClass('emptyClass', 'o-table--table__empty')]: !this.visibleData.length }
            ]
        },
        tableWrapperClasses() {
            return [
                this.computedClass('wrapperClass', 'o-table__wrapper'),
                { [this.computedClass('stickyHeaderClass', 'o-table__wrapper--sticky-header')]: this.stickyHeader },
                { [this.computedClass('scrollableClass', 'o-table__wrapper--scrollable')]: this.isScrollable },
                { [this.computedClass('mobileClass', 'o-table__wrapper--mobile')]: this.isMobile },
            ]
        },
        footerClasses() {
            return [
                this.computedClass('footerClass', 'o-table__footer')
            ]
        },
        thBaseClasses() {
            return [
                this.computedClass('thClass', 'o-table__th')
            ]
        },
        tdBaseClasses() {
            return [
                this.computedClass('tdClass', 'o-table__td')
            ]
        },
        thCheckboxClasses() {
            return [
                ...this.thBaseClasses,
                this.computedClass('thCheckboxClass', 'o-table__th-checkbox')
            ]
        },
        thDetailedClasses() {
            return [
                 ...this.thBaseClasses,
                this.computedClass('thDetailedClass', 'o-table__th--detailed')
            ]
        },
        thSubheadingClasses() {
            return [
                ...this.thBaseClasses,
                this.computedClass('thSubheadingClass', 'o-table__th')
            ];
        },
        tdCheckboxClasses() {
            return [
                ...this.tdBaseClasses,
                this.computedClass('tdCheckboxClass', 'o-table__td-checkbox'),
                ...this.thStickyClasses({ sticky: this.stickyCheckbox })
            ]
        },
        detailedClasses() {
            return [
                this.computedClass('detailedClass', 'o-table__detail')
            ]
        },
        tdDetailedChevronClasses() {
            return [
                ...this.tdBaseClasses,
                this.computedClass('tdDetailedChevronClass', 'o-table__td-chevron')
            ]
        },
        mobileSortClasses() {
            return [
                this.computedClass('mobileSortClass', 'o-table__mobile-sort')
            ]
        },
        paginationWrapperClasses() {
            return [
                this.computedClass('paginationWrapperClass', 'o-table__pagination')
            ]
        },
        tableWrapperStyle() {
            return {
                height: toCssDimension(this.height)
            }
        },
        /**
        * Splitted data based on the pagination.
        */
        visibleData() {
            if (!this.paginated) return this.newData

            const currentPage = this.newCurrentPage
            const perPage = this.perPage

            if (this.newData.length <= perPage) {
                return this.newData
            } else {
                const start = (currentPage - 1) * perPage
                const end = start + parseInt(perPage, 10)
                return this.newData.slice(start, end)
            }
        },

        visibleColumns() {
            if (!this.newColumns) return this.newColumns
            return this.newColumns.filter((column) => {
                return column.visible || column.visible === undefined
            })
        },

        /**
        * Check if all rows in the page are checked.
        */
        isAllChecked() {
            const validVisibleData = this.visibleData.filter(
                (row) => this.isRowCheckable(row))
            if (validVisibleData.length === 0) return false
            const isAllChecked = validVisibleData.some((currentVisibleRow) => {
                return indexOf(this.newCheckedRows, currentVisibleRow, this.customIsChecked) < 0
            })
            return !isAllChecked
        },

        /**
        * Check if all rows in the page are checkable.
        */
        isAllUncheckable() {
            const validVisibleData = this.visibleData.filter(
                (row) => this.isRowCheckable(row))
            return validVisibleData.length === 0
        },

        /**
        * Check if has any sortable column.
        */
        hasSortablenewColumns() {
            return this.newColumns.some((column) => {
                return column.sortable
            })
        },

        /**
        * Check if has any searchable column.
        */
        hasSearchablenewColumns() {
            return this.newColumns.some((column) => {
                return column.searchable
            })
        },

        /**
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
            let count = this.visibleColumns.length
            count += this.checkable ? 1 : 0
            count += (this.detailed && this.showDetailIcon) ? 1 : 0

            return count
        },

        /**
        * return if detailed row tabled
        * will be with chevron column & icon or not
        */
        showDetailRowIcon() {
            return this.detailed && this.showDetailIcon
        },

        /**
        * return if scrollable table
        */
        isScrollable() {
            if (this.scrollable) return true
            if (!this.newColumns) return false
            return this.newColumns.some((column) => {
                return column.sticky
            })
        },

        newColumns() {
            if (this.columns && this.columns.length) {
                return this.columns.map((column) => {
                    const vnode = createVNode(TableColumn, column, (props) => {
                        const vnode = h('span', {}, getValueByPath(props.row, column.field))
                        return [vnode]
                    })
                    return createApp(vnode)
                        .provide('$table', this)
                        .mount(document.createElement('div'))
                })
            }
            let defaultSlots = this.defaultSlots
                .filter((vnode) =>
                    vnode && vnode.$data && vnode.$data._isTableColumn
                )
            return defaultSlots
        },

        isMobile() {
            return this.mobileCards && this.isMatchMedia
        },

        hasCustomSubheadings() {
            if (this.$slots && this.$slots.subheading()) return true
            return this.newColumns.some((column) => {
                return column.subheading || (column.$slots && column.$slots.subheading())
            })
        },
    },
    watch: {
        /**
        * When data prop change:
        *   1. Update internal value.
        *   2. Filter data if it's not backend-filtered.
        *   3. Sort again if it's not backend-sorted.
        *   4. Set new total if it's not backend-paginated.
        */
        data: {
            handler(value) {
                this.newData = value
                if (!this.backendFiltering) {
                    this.newData = value.filter((row) => this.isRowFiltered(row))
                }
                if (!this.backendSorting) {
                    this.sort(this.currentSortColumn, true)
                }
                if (!this.backendPagination) {
                    this.newDataTotal = this.newData.length
                }
            },
            deep: true,
        },

        /**
        * When Pagination total change, update internal total
        * only if it's backend-paginated.
        */
        total(newTotal) {
            if (!this.backendPagination) return

            this.newDataTotal = newTotal
        },

        currentPage(newValue) {
            this.newCurrentPage = newValue
        },

        /**
        * When checkedRows prop change, update internal value without
        * mutating original data.
        */
        checkedRows: {
            handler(rows) {
                this.newCheckedRows = [...rows]
            },
            deep: true,
        },

        debounceSearch: {
            handler(value) {
                this.debouncedHandleFiltersChange = debounce(this.handleFiltersChange, value)
            },
            immediate: true
        },

        filters: {
            handler(value) {
                if (this.debounceSearch) {
                    this.debouncedHandleFiltersChange(value)
                } else {
                    this.handleFiltersChange(value)
                }
            },
            deep: true,
        },

        /**
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed(expandedRows) {
            this.visibleDetailRows = expandedRows
        },

        newCurrentPage(newVal) {
            this.$emit('update:currentPage', newVal)
        }
    },
    methods: {
        thClasses(column) {
            return [
                ...this.thBaseClasses,
                ...this.thStickyClasses(column),
                column.thAttrs && getValueByPath(column.thAttrs(column), 'class'),
                { [this.computedClass('thCurrentSortClass', 'o-table__th-current-sort')]: (this.currentSortColumn === column) },
                { [this.computedClass('thSortableClass', 'o-table__th--sortable')]: column.sortable },
                { [this.computedClass('thUnselectableClass', 'o-table__th--unselectable')]: column.isHeaderUnselectable },
                { [this.computedClass('thPositionClass', 'o-table__th--', column.position)]: column.position },
            ]
        },
        thStickyClasses(column) {
            return [
                { [this.computedClass('thStickyClass', 'o-table__th--sticky')]: column.sticky }
            ]
        },
        rowClasses(row, index) {
            return [
                this.rowClass(row, index),
                { [this.computedClass('trSelectedClass', 'o-table__tr--selected')]: this.isRowSelected(row, this.selected) }
            ]
        },
        thSortIconClasses() {
            return [
                this.computedClass('thSortIconClass', 'o-table__th__sort-icon'),
            ]
        },
        tdClasses(row, column) {
            return [
                ...this.tdBaseClasses,
                column.tdAttrs && getValueByPath(column.tdAttrs(row, column), 'class'),
                { [this.computedClass('tdPositionClass', 'o-table__td--', column.position)]: column.position },
                { [this.computedClass('tdStickyClass', 'o-table__td--sticky')]: column.sticky }
            ]
        },
        onFiltersEvent(event) {
            this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters })
        },
        handleFiltersChange(value) {
            if (this.backendFiltering) {
                this.$emit('filters-change', value)
            } else {
                this.newData = this.data.filter((row) => this.isRowFiltered(row))
                if (!this.backendPagination) {
                    this.newDataTotal = this.newData.length
                }
                if (!this.backendSorting) {
                    if (Object.keys(this.currentSortColumn).length > 0) {
                        this.doSortSingleColumn(this.currentSortColumn)
                    }
                }
            }
        },

        /**
        * Sort an array by key without mutating original data.
        * Call the user sort function if it was passed.
        */
        sortBy(array, key, fn, isAsc) {
            let sorted = []
            // Sorting without mutating original data
            if (fn && typeof fn === 'function') {
                sorted = [...array].sort((a, b) => fn(a, b, isAsc))
            } else {
                sorted = [...array].sort((a, b) => {
                    // Get nested values from objects
                    let newA = getValueByPath(a, key)
                    let newB = getValueByPath(b, key)

                    // sort boolean type
                    if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                        return isAsc ? (newA as any) - (newB as any) : (newB as any) - (newA as any)
                    }

                    if (!newA && newA !== 0) return 1
                    if (!newB && newB !== 0) return -1
                    if (newA === newB) return 0

                    newA = (typeof newA === 'string')
                        ? newA.toUpperCase()
                        : newA
                    newB = (typeof newB === 'string')
                        ? newB.toUpperCase()
                        : newB

                    return isAsc
                        ? newA > newB ? 1 : -1
                        : newA > newB ? -1 : 1
                })
            }

            return sorted
        },

        /**
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
            if (!column || !column.sortable) return

            if (!updatingData) {
                this.isAsc = column === this.currentSortColumn
                    ? !this.isAsc
                    : (this.defaultSortDirection.toLowerCase() !== 'desc')
            }
            if (!this.firstTimeSort) {
                /**
                 * @property {string} field column field
                 * @property {boolean} direction 'asc' or 'desc'
                 * @property {Event} event native event
                */
                this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event)
            }
            if (!this.backendSorting) {
                this.doSortSingleColumn(column)
            }
            this.currentSortColumn = column
        },

        doSortSingleColumn(column) {
            this.newData = this.sortBy(
                this.newData,
                column.field,
                column.customSort,
                this.isAsc
            )
        },

        isRowSelected(row, selected) {
            if (!selected) {
                return false
            }
            if (this.customRowKey) {
                return row[this.customRowKey] === selected[this.customRowKey]
            }
            return row === selected
        },

        /**
        * Check if the row is checked (is added to the array).
        */
        isRowChecked(row) {
            return indexOf(this.newCheckedRows, row, this.customIsChecked) >= 0
        },

        /**
        * Remove a checked row from the array.
        */
        removeCheckedRow(row) {
            const index = indexOf(this.newCheckedRows, row, this.customIsChecked)
            if (index >= 0) {
                this.newCheckedRows.splice(index, 1)
            }
        },

        /**
        * Header checkbox click listener.
        * Add or remove all rows in current page.
        */
        checkAll() {
            const isAllChecked = this.isAllChecked
            this.visibleData.forEach((currentRow) => {
                if (this.isRowCheckable(currentRow)) {
                    this.removeCheckedRow(currentRow)
                }
                if (!isAllChecked) {
                    if (this.isRowCheckable(currentRow)) {
                        this.newCheckedRows.push(currentRow)
                    }
                }
            })
            /**
             * @property {Array<Object>} newCheckedRows checked rows
             */
            this.$emit('check', this.newCheckedRows)
            this.$emit('check-all', this.newCheckedRows)

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows)
        },

        /**
        * Row checkbox click listener.
        */
        checkRow(row, index, event) {
            if (!this.isRowCheckable(row)) return
            const lastIndex = this.lastCheckedRowIndex
            this.lastCheckedRowIndex = index

            if (event.shiftKey && lastIndex !== null && index !== lastIndex) {
                this.shiftCheckRow(row, index, lastIndex)
            } else if (!this.isRowChecked(row)) {
                this.newCheckedRows.push(row)
            } else {
                this.removeCheckedRow(row)
            }

            this.$emit('check', this.newCheckedRows, row)

            // Emit checked rows to update user variable
            this.$emit('update:checkedRows', this.newCheckedRows)
        },

        /**
         * Check row when shift is pressed.
         */
        shiftCheckRow(row, index, lastCheckedRowIndex) {
            // Get the subset of the list between the two indicies
            const subset = this.visibleData.slice(
                Math.min(index, lastCheckedRowIndex),
                Math.max(index, lastCheckedRowIndex) + 1
            )

            // Determine the operation based on the state of the clicked checkbox
            const shouldCheck = !this.isRowChecked(row)

            subset.forEach((item) => {
                this.removeCheckedRow(item)
                if (shouldCheck && this.isRowCheckable(item)) {
                    this.newCheckedRows.push(item)
                }
            })
        },

        /**
        * Row click listener.
        * Emit all necessary events.
        */
        selectRow(row, index) {
            /**
             * @property {Object} row clicked row
             * @property {number} index index of clicked row
             */
            this.$emit('click', row, index)

            if (this.selected === row) return
            if (!this.isRowSelectable(row)) return

            // Emit new and old row
            /**
             * @property {Object} row selected row
             * @property {Array<Object>} selected selected rows
             */
            this.$emit('select', row, this.selected)

            // Emit new row to update user variable
            this.$emit('update:selected', row)
        },

        /**
        * Toggle to show/hide details slot
        */
        toggleDetails(obj) {
            const found = this.isVisibleDetailRow(obj)

            if (found) {
                this.closeDetailRow(obj)
                this.$emit('details-close', obj)
            } else {
                this.openDetailRow(obj)
                this.$emit('details-open', obj)
            }

            // Syncs the detailed rows with the parent component
            this.$emit('update:openedDetailed', this.visibleDetailRows)
        },

        openDetailRow(obj) {
            const index = this.handleDetailKey(obj)
            this.visibleDetailRows.push(index)
        },

        closeDetailRow(obj) {
            const index = this.handleDetailKey(obj)
            const i = this.visibleDetailRows.indexOf(index)
            if (i >= 0) {
                this.visibleDetailRows.splice(i, 1)
            }
        },

        isVisibleDetailRow(obj) {
            const index = this.handleDetailKey(obj)
            return this.visibleDetailRows.indexOf(index) >= 0
        },

        isActiveDetailRow(row) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isActiveCustomDetailRow(row) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row)
        },

        isRowFiltered(row) {
            for (const key in this.filters) {
                // remove key if empty
                if (!this.filters[key]) {
                    delete this.filters[key]
                    return true
                }
                const input = this.filters[key]
                const column = this.newColumns.filter((c) => c.field === key)[0]
                if (column && column.customSearch && typeof column.customSearch === 'function') {
                    if (!column.customSearch(row, input)) return false
                } else {
                    let value = this.getValueByPath(row, key)
                    if (value == null) return false
                    if (Number.isInteger(value)) {
                        if (value !== Number(input)) return false
                    } else {
                        const re = new RegExp(escapeRegExpChars(input), 'i')
                        if (!re.test(value)) return false
                    }
                }
            }
            return true
        },

        /**
        * When the detailKey is defined we use the object[detailKey] as index.
        * If not, use the object reference by default.
        */
        handleDetailKey(index) {
            const key = this.detailKey
            return !key.length || !index
                ? index
                : index[key]
        },

        /**
        * Call initSort only first time (For example async data).
        */
        checkSort() {
            if (this.newColumns.length && this.firstTimeSort) {
                this.initSort()
                this.firstTimeSort = false
            } else if (this.newColumns.length) {
                if (Object.keys(this.currentSortColumn).length > 0) {
                    for (let i = 0; i < this.newColumns.length; i++) {
                        if (this.newColumns[i].field === this.currentSortColumn.field) {
                            this.currentSortColumn = this.newColumns[i]
                            break
                        }
                    }
                }
            }
        },

        /**
        * Check if footer slot has custom content.
        */
        hasCustomFooterSlot() {
            const footer = this.$slots.footer()
            if (footer.length > 1) return true

            const tag = footer[0].tag
            if (tag !== 'th' && tag !== 'td') return false

            return true
        },

        /**
        * Table arrow keys listener, change selection.
        */
        pressedArrow(pos) {
            if (!this.visibleData.length) return

            let index = this.visibleData.indexOf(this.selected) + pos

            // Prevent from going up from first and down from last
            index = index < 0
                ? 0
                : index > this.visibleData.length - 1
                    ? this.visibleData.length - 1
                    : index

            const row = this.visibleData[index]

            if (!this.isRowSelectable(row)) {
                let newIndex = null
                if (pos > 0) {
                    for (let i = index; i < this.visibleData.length && newIndex === null; i++) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i
                    }
                } else {
                    for (let i = index; i >= 0 && newIndex === null; i--) {
                        if (this.isRowSelectable(this.visibleData[i])) newIndex = i
                    }
                }
                if (newIndex >= 0) {
                    this.selectRow(this.visibleData[newIndex])
                }
            } else {
                this.selectRow(row)
            }
        },

        /**
        * Focus table element if has selected prop.
        */
        focus() {
            if (!this.focusable) return

            this.$el.querySelector('table').focus()
        },

        /**
        * Initial sorted column based on the default-sort prop.
        */
        initSort() {
            if (!this.defaultSort) return
            let sortField = ''
            let sortDirection = this.defaultSortDirection
            if (Array.isArray(this.defaultSort)) {
                sortField = this.defaultSort[0]
                if (this.defaultSort[1]) {
                    sortDirection = this.defaultSort[1]
                }
            } else {
                sortField = this.defaultSort
            }
            const sortColumn = this.newColumns.filter(
                (column) => (column.field === sortField))[0]
            if (sortColumn) {
                this.isAsc = sortDirection.toLowerCase() !== 'desc'
                this.sort(sortColumn, true)
            }
        },
        /**
        * Emits drag start event
        */
        handleDragStart(event, row, index) {
            if (!this.draggable) return
            this.$emit('dragstart', {event, row, index})
        },
        /**
        * Emits drag leave event
        */
        handleDragEnd(event, row, index) {
            if (!this.draggable) return
            this.$emit('dragend', {event, row, index})
        },
        /**
        * Emits drop event
        */
        handleDrop(event, row, index) {
            if (!this.draggable) return
            this.$emit('drop', {event, row, index})
        },
        /**
        * Emits drag over event
        */
        handleDragOver(event, row, index) {
            if (!this.draggable) return
            this.$emit('dragover', {event, row, index})
        },
        /**
        * Emits drag leave event
        */
        handleDragLeave(event, row, index) {
            if (!this.draggable) return
            this.$emit('dragleave', {event, row, index})
        },

        emitEventForRow(eventName, event, row) {
            return this.$attrs[eventName] ? this.$emit(eventName, row, event) : null
        },

        _addColumn(column) {
            if (typeof window !== 'undefined') {
                this.$nextTick(() => {
                    this.defaultSlots.push(column)
                    requestAnimationFrame(() => {
                        const div = this.$refs['slot']
                        if (div && div.children) {
                            const position = [...div.children].map(c =>
                                parseInt(c.getAttribute('data-id'), 10)).indexOf(column.newKey)
                            if (position !== this.defaultSlots.length) {
                                this.defaultSlots.splice(position, 0, column);
                                this.defaultSlots = this.defaultSlots.slice(0, this.defaultSlots.length - 1)
                            }
                        }
                    })
                })
            }
        },

        _removeColumn(column) {
            this.$nextTick(() => {
                this.defaultSlots = this.defaultSlots.filter(d => d.newKey !== column.newKey)
            })
        },

        _nextSequence() {
            return this.sequence++
        }
    }
})
</script>
