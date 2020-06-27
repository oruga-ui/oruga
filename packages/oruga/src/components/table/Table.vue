<template>
    <div :class="rootClass">

        <slot />

        <o-table-mobile-sort
            v-if="mobileCards && hasSortablenewColumns"
            :current-sort-column="currentSortColumn"
            :sort-multiple="sortMultiple"
            :sort-multiple-data="sortMultipleDataComputed"
            :is-asc="isAsc"
            :columns="newColumns"
            :placeholder="mobileSortPlaceholder"
            :icon-pack="iconPack"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            @sort="(column, event) => sort(column, null, event)"
            @removePriority="(column) => removeSortingPriority(column)"
        />

        <template v-if="paginated && (paginationPosition === 'top' || paginationPosition === 'both')">
            <slot name="pagination">
                <o-table-pagination  
                    v-bind="$attrs"
                    :per-page="perPage"
                    :paginated="paginated"
                    :total="newDataTotal"
                    :current-page.sync="newCurrentPage"
                    @page-change="(event) => $emit('page-change', event)"
                >
                    <slot name="top-left"/>
                </o-table-pagination>
            </slot>
        </template>

        <div
            :class="tableWrapperClasses"
            :style="tableWrapperStyle"
        >
            <table
                :class="tableClasses"
                :tabindex="!focusable ? false : 0"
                @keydown.self.prevent.up="pressedArrow(-1)"
                @keydown.self.prevent.down="pressedArrow(1)">
                <thead v-if="newColumns.length && showHeader">
                    <tr>
                        <th v-if="showDetailRowIcon" width="40px"/>
                        <th :class="thCheckboxClass" v-if="checkable && checkboxPosition === 'left'">
                            <template v-if="headerCheckable">
                                <o-checkbox
                                    :value="isAllChecked"
                                    :disabled="isAllUncheckable"
                                    @change.native="checkAll"/>
                            </template>
                        </th>
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="index"
                            :class="[column.headerClass,
                                (!sortMultiple && currentSortColumn === column) && thCurrentSortClass,
                                column.sortable && thSortableClass,
                                column.sticky && thStickyClass,
                                column.isHeaderUnSelectable && thUnselectableClass
                            ]"
                            :style="column.style"
                            @click.stop="sort(column, null, $event)">
                            <div :class="[ thWrapClass, {
                                [thRightClass]: column.numeric,
                                [thCenteredClass]: column.centered
                            }]">
                                <template v-if="column.$scopedSlots && column.$scopedSlots.header">
                                    <o-slot-component
                                        :component="column"
                                        scoped
                                        name="header"
                                        tag="span"
                                        :props="{ column, index }"
                                    />
                                </template>
                                <template v-else>
                                    <span :class="thContentClass">
                                        {{ column.label }}
                                        <template
                                            v-if="sortMultiple &&
                                                sortMultipleDataComputed &&
                                                sortMultipleDataComputed.length > 0 &&
                                                sortMultipleDataComputed.filter(i => i.field === column.field).length > 0">
                                            <o-icon
                                                :icon="sortIcon"
                                                :pack="iconPack"
                                                both
                                                :size="sortIconSize"
                                                :class="{[iconSortDescClass]: sortMultipleDataComputed.filter(i => i.field === column.field)[0].order === 'desc'}"
                                            />
                                            {{ findIndexOfSortData(column) }}
                                            <o-button
                                                :class="multiColumnSortDeleteIconClass"
                                                native-type="button"
                                                size="small"
                                                @click.stop="removeSortingPriority(column)"/>
                                        </template>

                                        <o-icon
                                            v-else
                                            :icon="sortIcon"
                                            :pack="iconPack"
                                            both
                                            :size="sortIconSize"
                                            :class="[ iconSortClass, {
                                                [iconSortDescClass]: !isAsc,
                                                [iconSortInvisibleClass]: currentSortColumn !== column
                                            }]"
                                        />
                                    </span>
                                </template>
                            </div>
                        </th>
                        <th :class="thCheckboxClass" v-if="checkable && checkboxPosition === 'right'">
                            <template v-if="headerCheckable">
                                <o-checkbox
                                    :value="isAllChecked"
                                    :disabled="isAllUncheckable"
                                    @change.native="checkAll"/>
                            </template>
                        </th>
                    </tr>
                    <tr v-if="hasCustomSubheadings" :class="subheadingClass">
                        <th v-if="showDetailRowIcon" :class="thDetailedClass" />
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="index"
                            :style="column.style">
                            <div :class="[ thWrapClass, {
                                [thRightClass]: column.numeric,
                                [thCenteredClass]: column.centered
                            }]">
                                <template
                                    v-if="column.$scopedSlots && column.$scopedSlots.subheading"
                                >
                                    <o-slot-component
                                        :component="column"
                                        scoped
                                        name="subheading"
                                        tag="span"
                                        :props="{ column, index }"
                                    />
                                </template>
                                <template v-else>{{ column.subheading }}</template>
                            </div>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                    <tr v-if="hasSearchablenewColumns">
                        <th v-if="showDetailRowIcon" :class="thDetailedClass" />
                        <th v-if="checkable && checkboxPosition === 'left'" />
                        <th
                            v-for="(column, index) in visibleColumns"
                            :key="index"
                            :style="column.style">
                            <div :class="thWrapClass">
                                <template v-if="column.searchable">
                                    <template
                                        v-if="column.$scopedSlots
                                        && column.$scopedSlots.searchable">
                                        <o-slot-component
                                            :component="column"
                                            :scoped="true"
                                            name="searchable"
                                            tag="span"
                                            :props="{ column, filters }"
                                        />
                                    </template>
                                    <o-input
                                        v-else
                                        @[filtersEvent].native="onFiltersEvent"
                                        v-model="filters[column.field]"
                                        :type="column.numeric ? 'number' : 'text'" />
                                </template>
                            </div>
                        </th>
                        <th v-if="checkable && checkboxPosition === 'right'" />
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(row, index) in visibleData">
                        <tr
                            :key="customRowKey ? row[customRowKey] : index"
                            :class="[rowClass(row, index), {
                                [tdSelectedClass]: row === selected
                            }]"
                            @click="selectRow(row)"
                            @dblclick="$emit('dblclick', row)"
                            @mouseenter="$listeners.mouseenter ? $emit('mouseenter', row) : null"
                            @mouseleave="$listeners.mouseleave ? $emit('mouseleave', row) : null"
                            @contextmenu="$emit('contextmenu', row, $event)"
                            :draggable="draggable"
                            @dragstart="handleDragStart($event, row, index)"
                            @dragend="handleDragEnd($event, row, index)"
                            @drop="handleDrop($event, row, index)"
                            @dragover="handleDragOver($event, row, index)"
                            @dragleave="handleDragLeave($event, row, index)">

                            <td
                                v-if="showDetailRowIcon"
                                :class="detailedChevronClass"
                            >
                                <a
                                    v-if="hasDetailedVisible(row)"
                                    role="detailed"
                                    @click.stop="toggleDetails(row)">
                                    <o-icon
                                        icon="chevron-right"
                                        :pack="iconPack"
                                        both
                                        :class="{[detailedIconExpandedClass]: isVisibleDetailRow(row)}"/>
                                </a>
                            </td>

                            <td
                                :class="tdCheckboxCell"
                                v-if="checkable && checkboxPosition === 'left'">
                                <o-checkbox
                                    :disabled="!isRowCheckable(row)"
                                    :value="isRowChecked(row)"
                                    @click.native.prevent.stop="checkRow(row, index, $event)"
                                />
                            </td>

                            <template v-for="(column, index) in visibleColumns">

                                <template v-if="column.$scopedSlots && column.$scopedSlots.default">
                                    <o-slot-component
                                        :key="(column.customKey || column.label) + index"
                                        :component="column"
                                        scoped
                                        name="default"
                                        tag="td"
                                        :class="column.rootClasses"
                                        :data-label="column.label"
                                        :props="{ row, column, index }"
                                    />
                                </template>

                            </template>

                            <td
                                :class="tdCheckboxCell"
                                v-if="checkable && checkboxPosition === 'right'">
                                <o-checkbox
                                    :disabled="!isRowCheckable(row)"
                                    :value="isRowChecked(row)"
                                    @click.native.prevent.stop="checkRow(row, index, $event)"
                                />
                            </td>
                        </tr>

                        <tr
                            v-if="isActiveDetailRow(row)"
                            :key="(customRowKey ? row[customRowKey] : index) + 'detail'"
                            :class="detailedClass">
                            <td :colspan="columnCount">
                                <slot
                                    name="detail"
                                    :row="row"
                                    :index="index"/>
                            </td>
                        </tr>
                        <slot
                            v-if="isActiveCustomDetailRow(row)"
                            name="detail"
                            :row="row"
                            :index="index"
                        />
                    </template>

                    <tr
                        v-if="!visibleData.length"
                        :class="emptyClass">
                        <td :colspan="columnCount">
                            <slot name="empty"/>
                        </td>
                    </tr>

                </tbody>

                <tfoot v-if="$slots.footer !== undefined">
                    <tr :class="footerClass">
                        <slot name="footer" v-if="hasCustomFooterSlot()"/>
                        <th :colspan="columnCount" v-else>
                            <slot name="footer"/>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <template v-if="loading">
            <slot name="loading">
                <o-loading :full-page="false" :active.sync="loading" />
            </slot>
        </template>

        <template v-if="(checkable && hasBottomLeftSlot()) ||
            (paginated && (paginationPosition === 'bottom' || paginationPosition === 'both'))">
            <slot name="pagination">
                <o-table-pagination
                    v-bind="$attrs"
                    :per-page="perPage"
                    :paginated="paginated"
                    :total="newDataTotal"
                    :current-page.sync="newCurrentPage"
                    @page-change="(event) => $emit('page-change', event)"
                >
                    <slot name="bottom-left"/>
                </o-table-pagination>
            </slot>
        </template>
        
    </div>
</template>

<script>
import { getValueByPath, indexOf, multiColumnSort, toCssDimension, getCssClass } from '../../utils/helpers'
import config from '../../utils/config'
import { VueInstance } from '../../utils/config'

import Button from '../button/Button'
import Checkbox from '../checkbox/Checkbox'
import Icon from '../icon/Icon'
import Input from '../input/Input'
import Pagination from '../pagination/Pagination'
import Loading from '../loading/Loading'
import SlotComponent from '../../utils/SlotComponent'
import TableMobileSort from './TableMobileSort'
import TableColumn from './TableColumn'
import TablePagination from './TablePagination'

/**
 * Tabulated data are sometimes needed, it's even better when it's responsive
 * @displayName Table
 * @style _table.scss
 */
export default {
    name: 'OTable',
    components: {
        [Button.name]: Button,
        [Checkbox.name]: Checkbox,
        [Icon.name]: Icon,
        [Input.name]: Input,
        [Pagination.name]: Pagination,
        [Loading.name]: Loading,
        [SlotComponent.name]: SlotComponent,
        [TableMobileSort.name]: TableMobileSort,
        [TableColumn.name]: TableColumn,
        [TablePagination.name]: TablePagination
    },
    inheritAttrs: false,
    provide() {
        return {
            $table: this
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        bordered: Boolean,
        striped: Boolean,
        narrowed: Boolean,
        hoverable: Boolean,
        loading: Boolean,
        detailed: Boolean,
        checkable: Boolean,
        headerCheckable: {
            type: Boolean,
            default: true
        },
        checkboxPosition: {
            type: String,
            default: 'left',
            validator: (value) => {
                return [
                    'left',
                    'right'
                ].indexOf(value) >= 0
            }
        },
        selected: Object,
        isRowSelectable: {
            type: Function,
            default: () => true
        },
        focusable: Boolean,
        customIsChecked: Function,
        isRowCheckable: {
            type: Function,
            default: () => true
        },
        checkedRows: {
            type: Array,
            default: () => []
        },
        mobileCards: {
            type: Boolean,
            default: true
        },
        defaultSort: [String, Array],
        defaultSortDirection: {
            type: String,
            default: 'asc'
        },
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
        },
        sortMultipleData: {
            type: Array,
            default: () => []
        },
        sortMultipleKey: {
            type: String,
            default: null
        },
        paginated: Boolean,
        currentPage: {
            type: Number,
            default: 1
        },
        perPage: {
            type: [Number, String],
            default: 20
        },
        showDetailIcon: {
            type: Boolean,
            default: true
        },
        paginationPosition: {
            type: String,
            default: 'bottom',
            validator: (value) => {
                return [
                    'bottom',
                    'top',
                    'both'
                ].indexOf(value) >= 0
            }
        },
        backendSorting: Boolean,
        backendFiltering: Boolean,
        rowClass: {
            type: Function,
            default: () => ''
        },
        openedDetailed: {
            type: Array,
            default: () => []
        },
        hasDetailedVisible: {
            type: Function,
            default: () => true
        },
        detailKey: {
            type: String,
            default: ''
        },
        customDetailRow: {
            type: Boolean,
            default: false
        },
        backendPagination: Boolean,
        total: {
            type: [Number, String],
            default: 0
        },
        iconPack: String,
        mobileSortPlaceholder: String,
        customRowKey: String,
        draggable: {
            type: Boolean,
            default: false
        },
        scrollable: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        ariaPageLabel: String,
        ariaCurrentLabel: String,
        stickyHeader: Boolean,
        height: [Number, String],
        filtersEvent: {
            type: String,
            default: ''
        },
        cardLayout: Boolean,
        showHeader: {
            type: Boolean,
            default: true
        },
        rootClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.rootClass', '')
                return getCssClass(clazz, override, 'o-table')
            }
        },
        wrapperClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.wrapperClass', '')
                return getCssClass(clazz, override, 'o-table-wrapper')
            }
        },
        footerClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.footerClass', '')
                return getCssClass(clazz, override, 'o-table-footer')
            }
        },
        emptyClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.emptyClass', '')
                return getCssClass(clazz, override, 'o-table-empty')
            }
        },
        detailedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.detailedClass', '')
                return getCssClass(clazz, override, 'o-table-detail')
            }
        },
        detailedChevronClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.detailedChevronClass', '')
                return getCssClass(clazz, override, 'o-table-chevron-cell')
            }
        },
        detailedIconExpandedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.detailedIconExpandedClass', '')
                return getCssClass(clazz, override, 'o-table-detail-icon-expanded')
            }
        },
        borderedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.borderedClass', '')
                return getCssClass(clazz, override, 'o-table-bordered')
            }
        },
        stripedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.stripedClass', '')
                return getCssClass(clazz, override, 'o-table-striped')
            }
        },
        narrowClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.narrowClass', '')
                return getCssClass(clazz, override, 'o-table-narrow')
            }
        },
        hoverableClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.hoverableClass', '')
                return getCssClass(clazz, override, 'o-table-hoverable')
            }
        },
        thWrapClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thWrapClass', '')
                return getCssClass(clazz, override, 'o-table-th-wrap')
            }
        },
        thContentClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thContentClass', '')
                return getCssClass(clazz, override, 'o-table-th-content')
            }
        },
        thRightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thRightClass', '')
                return getCssClass(clazz, override, 'o-table-th-right')
            }
        },
        thCenteredClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thCenteredClass', '')
                return getCssClass(clazz, override, 'o-table-th-centered')
            }
        },
        thStickyClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thStickyClass', '')
                return getCssClass(clazz, override, 'o-table-th-sticky')
            }
        },
        thCheckboxClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thCheckboxClass', '')
                return getCssClass(clazz, override, 'o-table-th-checkbox')
            }
        },
        thCurrentSortClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thCurrentSortClass', '')
                return getCssClass(clazz, override, 'o-table-th-current-sort')
            }
        },
        thSortableClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thSortableClass', '')
                return getCssClass(clazz, override, 'o-table-th-sortable')
            }
        },
        thUnselectableClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thUnselectableClass', '')
                return getCssClass(clazz, override, 'o-table-th-unselectable')
            }
        },
        thDetailedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.thDetailedClass', '')
                return getCssClass(clazz, override, 'o-table-th-detail')
            }
        },
        tdRightClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.tdRightClass', '')
                return getCssClass(clazz, override, 'o-table-td-right')
            }
        },
        tdCenteredClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.tdCenteredClass', '')
                return getCssClass(clazz, override, 'o-table-td-centered')
            }
        },
        tdStickyClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.tdStickyClass', '')
                return getCssClass(clazz, override, 'o-table-td-sticky')
            }
        },
        tdCheckboxCell: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.tdCheckboxCell', '')
                return getCssClass(clazz, override, 'o-table-checkbox-cell')
            }
        },
        tdSelectedClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.tdSelectedClass', '')
                return getCssClass(clazz, override, 'o-table-row-selected')
            }
        },
        subheadingClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.subheadingClass', '')
                return getCssClass(clazz, override, 'o-table-subheading')
            }
        },
        stickyHeaderClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.stickyHeaderClass', '')
                return getCssClass(clazz, override, 'o-table-sticky-header')
            }
        },
        mobileCardsClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.mobileCardsClass', '')
                return getCssClass(clazz, override, 'o-table-mobile-cards')
            }
        },
        cardsClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.cardsClass', '')
                return getCssClass(clazz, override, 'o-table-cards')
            }
        },
        scrollableClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.scrollableClass', '')
                return getCssClass(clazz, override, 'o-table-scrollable')
            }
        },
        mobileSortClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.mobileSortClass', '')
                return getCssClass(clazz, override, 'o-table-mobile-sort')
            }
        },
        iconSortDescClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.iconSortDesc', '')
                return getCssClass(clazz, override, 'o-icon-sort-desc')
            }
        },
        iconSortClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.iconSortClass', '')
                return getCssClass(clazz, override, 'o-icon-sort')
            }
        },
        iconSortInvisibleClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.iconSortInvisibleClass', '')
                return getCssClass(clazz, override, 'o-icon-sort-invisible')
            }
        },
        multiColumnSortDeleteIconClass: {
            type: String,
            default: () => {
                const override = getValueByPath(config, 'table.override', false)
                const clazz = getValueByPath(config, 'table.multiColumnSortDeleteIconClass', '')
                return getCssClass(clazz, override, 'delete multi-sort-cancel-icon')
            }
        },
    },
    data() {
        return {
            sortMultipleDataLocal: [],
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
            firstTimeSort: true, // Used by first time initSort
        }
    },
    computed: {
        tableClasses() {
            return [
                this.bordered && this.borderedClass,
                this.striped && this.stripedClass,
                this.narrowed && this.narrowClass,
                ((this.hoverable || this.focusable) && this.visibleData.length) && this.hoverableClass
            ]
        },
        tableWrapperClasses() {
            return [
                this.wrapperClass,
                this.mobileCards && this.mobileCardsClass,
                this.stickyHeader && this.stickyHeaderClass,
                this.cardLayout && this.cardsClass,
                this.isScrollable && this.scrollableClass
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
                const end = parseInt(start, 10) + parseInt(perPage, 10)
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
        * Check if has any column using subheading.
        */
        hasCustomSubheadings() {
            if (this.$scopedSlots && this.$scopedSlots.subheading) return true
            return this.newColumns.some((column) => {
                return column.subheading || (column.$scopedSlots && column.$scopedSlots.subheading)
            })
        },

        /**
        * Return total column count based if it's checkable or expanded
        */
        columnCount() {
            let count = this.newColumns.length
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
                    const TableColumnComponent = VueInstance.extend(TableColumn)
                    const component = new TableColumnComponent(
                        { parent: this, propsData: column }
                    )
                    component.$scopedSlots = {
                        default: (props) => {
                            const vnode = component.$createElement('span', {
                                domProps: {
                                    innerHTML: getValueByPath(props.row, column.field)
                                }
                            })
                            return [vnode]
                        }
                    }
                    return component
                })
            }
            return this.defaultSlots
                .filter((vnode) =>
                    vnode.componentInstance &&
                    vnode.componentInstance.$options &&
                    vnode.componentInstance.$options.name === 'OTableColumn')
                .map((vnode) => vnode.componentInstance)
        },

        sortMultipleDataComputed() {
            return this.backendSorting ? this.sortMultipleData : this.sortMultipleDataLocal
        }
    },
    watch: {
        /**
        * When data prop change:
        *   1. Update internal value.
        *   2. Filter data if it's not backend-filtered.
        *   3. Sort again if it's not backend-sorted.
        *   4. Set new total if it's not backend-paginated.
        */
        data(value) {
            this.newData = value
            if (!this.backendFiltering) {
                this.newData = value.filter(
                    (row) => this.isRowFiltered(row))
            }
            if (!this.backendSorting) {
                this.sort(this.currentSortColumn, true)
            }
            if (!this.backendPagination) {
                this.newDataTotal = this.newData.length
            }
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
        checkedRows(rows) {
            this.newCheckedRows = [...rows]
        },

        filters: {
            handler(value) {
                if (this.backendFiltering) {
                    this.$emit('filters-change', value)
                } else {
                    this.newData = this.data.filter(
                        (row) => this.isRowFiltered(row))
                    if (!this.backendPagination) {
                        this.newDataTotal = this.newData.length
                    }
                    if (!this.backendSorting) {
                        if (this.sortMultiple &&
                            this.sortMultipleDataLocal && this.sortMultipleDataLocal.length > 0) {
                            this.doSortMultiColumn()
                        } else if (Object.keys(this.currentSortColumn).length > 0) {
                            this.doSortSingleColumn(this.currentSortColumn)
                        }
                    }
                }
            },
            deep: true
        },

        /**
        * When the user wants to control the detailed rows via props.
        * Or wants to open the details of certain row with the router for example.
        */
        openedDetailed(expandedRows) {
            this.visibleDetailRows = expandedRows
        }
    },
    methods: {
        onFiltersEvent(event) {
            this.$emit(`filters-event-${this.filtersEvent}`, { event, filters: this.filters })
        },
        findIndexOfSortData(column) {
            const sortObj = this.sortMultipleDataComputed.filter((i) =>
                i.field === column.field)[0]
            return this.sortMultipleDataComputed.indexOf(sortObj) + 1
        },
        removeSortingPriority(column) {
            if (this.backendSorting) {
                this.$emit('sorting-priority-removed', column.field)
            } else {
                this.sortMultipleDataLocal = this.sortMultipleDataLocal.filter(
                    (priority) => priority.field !== column.field)

                const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                    return (i.order && i.order === 'desc' ? '-' : '') + i.field
                })
                this.newData = multiColumnSort(this.newData, formattedSortingPriority)
            }
        },
        resetMultiSorting() {
            this.sortMultipleDataLocal = []
            this.currentSortColumn = {}
            this.newData = this.data
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
                        return isAsc ? newA - newB : newB - newA
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

        sortMultiColumn(column) {
            this.currentSortColumn = {}
            if (!this.backendSorting) {
                const existingPriority = this.sortMultipleDataLocal.filter((i) =>
                    i.field === column.field)[0]
                if (existingPriority) {
                    existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc'
                } else {
                    this.sortMultipleDataLocal.push(
                        {field: column.field, order: column.isAsc}
                    )
                }
                this.doSortMultiColumn()
            }
        },

        doSortMultiColumn() {
            const formattedSortingPriority = this.sortMultipleDataLocal.map((i) => {
                return (i.order && i.order === 'desc' ? '-' : '') + i.field
            })
            this.newData = multiColumnSort(this.newData, formattedSortingPriority)
        },

        /**
        * Sort the column.
        * Toggle current direction on column if it's sortable
        * and not just updating the prop.
        */
        sort(column, updatingData = false, event = null) {
            if (
                // if backend sorting is enabled, just emit the sort press like usual
                // if the correct key combination isnt pressed, sort like usual
                !this.backendSorting &&
                this.sortMultiple &&
                ((this.sortMultipleKey && event[this.sortMultipleKey]) || !this.sortMultipleKey)
            ) {
                this.sortMultiColumn(column)
            } else {
                if (!column || !column.sortable) return

                // sort multiple is enabled but the correct key combination isnt pressed so reset
                if (this.sortMultiple) {
                    this.sortMultipleDataLocal = []
                }

                if (!updatingData) {
                    this.isAsc = column === this.currentSortColumn
                        ? !this.isAsc
                        : (this.defaultSortDirection.toLowerCase() !== 'desc')
                }
                if (!this.firstTimeSort) {
                    this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc', event)
                }
                if (!this.backendSorting) {
                    this.doSortSingleColumn(column)
                }
                this.currentSortColumn = column
            }
        },

        doSortSingleColumn(column) {
            this.newData = this.sortBy(
                this.newData,
                column.field,
                column.customSort,
                this.isAsc
            )
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
            this.$emit('click', row, index)

            if (this.selected === row) return
            if (!this.isRowSelectable(row)) return

            // Emit new and old row
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
            this.visibleDetailRows.splice(i, 1)
        },

        isVisibleDetailRow(obj) {
            const index = this.handleDetailKey(obj)
            const result = this.visibleDetailRows.indexOf(index) >= 0
            return result
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
                let value = this.getValueByPath(row, key)
                if (value == null) return false
                if (Number.isInteger(value)) {
                    if (value !== Number(this.filters[key])) return false
                } else {
                    const re = new RegExp(this.filters[key], 'i')
                    if (typeof value === 'boolean') value = `${value}`
                    if (!value.match(re)) return false
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

        checkPredefinedDetailedRows() {
            const defaultExpandedRowsDefined = this.openedDetailed.length > 0
            if (defaultExpandedRowsDefined && !this.detailKey.length) {
                throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"')
            }
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
            if (this.$slots.footer.length > 1) return true

            const tag = this.$slots.footer[0].tag
            if (tag !== 'th' && tag !== 'td') return false

            return true
        },

        /**
        * Check if bottom-left slot exists.
        */
        hasBottomLeftSlot() {
            return typeof this.$slots['bottom-left'] !== 'undefined'
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
            if (!this.backendSorting) {
                if (this.sortMultiple && this.sortMultipleData) {
                    this.sortMultipleData.forEach((column) => {
                        this.sortMultiColumn(column)
                    })
                } else {
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
                }
            }
        },
        /**
        * Emits drag start event
        */
        handleDragStart(event, row, index) {
            this.$emit('dragstart', {event, row, index})
        },
        /**
        * Emits drag leave event
        */
        handleDragEnd(event, row, index) {
            this.$emit('dragend', {event, row, index})
        },
        /**
        * Emits drop event
        */
        handleDrop(event, row, index) {
            this.$emit('drop', {event, row, index})
        },
        /**
        * Emits drag over event
        */
        handleDragOver(event, row, index) {
            this.$emit('dragover', {event, row, index})
        },
        /**
        * Emits drag leave event
        */
        handleDragLeave(event, row, index) {
            this.$emit('dragleave', {event, row, index})
        },

        refreshSlots() {
            this.defaultSlots = this.$slots.default || []
        }
    },
    mounted() {
        this.refreshSlots()
        this.checkPredefinedDetailedRows()
        this.checkSort()
    }
}
</script>
