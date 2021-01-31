<template>
    <div :class="rootClasses">
        <o-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            v-bind="dropdownBind"
            :position="position"
            :disabled="disabled"
            :inline="inline"
            :mobile-modal="mobileModal"
            :trap-focus="trapFocus"
            :aria-role="ariaRole"
            :aria-modal="!inline"
            :append-to-body="appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange">
            <template
                #trigger
                v-if="!inline">
                <slot name="trigger">
                    <o-input
                        ref="input"
                        autocomplete="off"
                        v-bind="inputBind"
                        :value="formattedValue"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-right="iconRight"
                        :icon-pack="iconPack"
                        :rounded="rounded"
                        :loading="loading"
                        :disabled="disabled"
                        :readonly="!editable"
                        :use-html5-validation="false"
                        @click.native="onInputClick"
                        @keyup.native.enter="togglePicker(true)"
                        @change.native="onChange($event.target.value)"
                        @focus="handleOnFocus" />
                </slot>
            </template>
            <o-dropdown-item
                override
                :disabled="disabled"
                :clickable="false">
                <div :class="boxClasses">
                    <header :class="headerClasses">
                        <template v-if="$slots.header !== undefined && $slots.header.length">
                            <slot name="header" />
                        </template>
                        <div
                            v-else
                            :class="headerButtonsClasses">
                            <a
                                v-show="!showPrev && !disabled"
                                :class="prevBtnClasses"
                                role="button"
                                href="#"
                                :disabled="disabled"
                                :aria-label="ariaPreviousLabel"
                                @click.prevent="prev"
                                @keydown.enter.prevent="prev"
                                @keydown.space.prevent="prev">

                                <o-icon
                                    :icon="iconPrev"
                                    :pack="iconPack"
                                    both
                                    clickable />
                            </a>
                            <a
                                v-show="!showNext && !disabled"
                                :class="nextBtnClasses"
                                role="button"
                                href="#"
                                :disabled="disabled"
                                :aria-label="ariaNextLabel"
                                @click.prevent="next"
                                @keydown.enter.prevent="next"
                                @keydown.space.prevent="next">

                                <o-icon
                                    :icon="iconNext"
                                    :pack="iconPack"
                                    both
                                    clickable />
                            </a>
                            <div :class="listsClasses">
                                <o-field>
                                    <o-select
                                        v-if="!isTypeMonth"
                                        v-model="focusedDateData.month"
                                        :disabled="disabled"
                                        :size="size">
                                        <option
                                            v-for="month in listOfMonths"
                                            :value="month.index"
                                            :key="month.name"
                                            :disabled="month.disabled">
                                            {{ month.name }}
                                        </option>
                                    </o-select>
                                    <o-select
                                        v-model="focusedDateData.year"
                                        :disabled="disabled"
                                        :size="size">
                                        <option
                                            v-for="year in listOfYears"
                                            :value="year"
                                            :key="year">
                                            {{ year }}
                                        </option>
                                    </o-select>
                                </o-field>
                            </div>
                        </div>
                    </header>
                    <o-datepicker-table
                        v-model="computedValue"
                        :day-names="newDayNames"
                        :month-names="newMonthNames"
                        :first-day-of-week="firstDayOfWeek"
                        :rules-for-first-week="rulesForFirstWeek"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :focused="focusedDateData"
                        :disabled="disabled"
                        :unselectable-dates="unselectableDates"
                        :unselectable-days-of-week="unselectableDaysOfWeek"
                        :selectable-dates="selectableDates"
                        :events="events"
                        :indicators="indicators"
                        :date-creator="dateCreator"
                        :type-month="isTypeMonth"
                        :nearby-month-days="nearbyMonthDays"
                        :nearby-selectable-month-days="nearbySelectableMonthDays"
                        :show-week-number="showWeekNumber"
                        :week-number-clickable="weekNumberClickable"
                        :range="range"
                        :multiple="multiple"
                        :table-class="tableClass"
                        :table-head-class="tableHeadClass"
                        :table-head-cell-class="tableHeadCellClass"
                        :table-body-class="tableBodyClass"
                        :table-row-class="tableRowClass"
                        :table-cell-class="tableCellClass"
                        :table-cell-selected-class="tableCellSelectedClass"
                        :table-cell-first-selected-class="tableCellFirstSelectedClass"
                        :table-cell-invisible-class="tableCellInvisibleClass"
                        :table-cell-within-selected-class="tableCellWithinSelectedClass"
                        :table-cell-last-selected-class="tableCellLastSelectedClass"
                        :table-cell-first-hovered-class="tableCellFirstHoveredClass"
                        :table-cell-within-hovered-class="tableCellWithinHoveredClass"
                        :table-cell-last-hovered-class="tableCellLastHoveredClass"
                        :table-cell-today-class="tableCellTodayClass"
                        :table-cell-selectable-class="tableCellSelectableClass"
                        :table-cell-unselectable-class="tableCellUnselectableClass"
                        :table-cell-nearby-class="tableCellNearbyClass"
                        :table-cell-events-class="tableCellEventsClass"
                        :table-events-class="tableEventsClass"
                        :table-event-variant-class="tableEventVariantClass"
                        :table-event-class="tableEventClass"
                        :table-event-indicators-class="tableEventIndicatorsClass"
                        @range-start="date => $emit('range-start', date)"
                        @range-end="date => $emit('range-end', date)"
                        @close="togglePicker(false)"
                        @update:focused="focusedDateData = $event" />
                </div>

                <footer
                    v-if="$slots.default !== undefined && $slots.default.length"
                    :class="footerClasses">
                    <slot/>
                </footer>
            </o-dropdown-item>
        </o-dropdown>

        <o-input
            v-else
            ref="input"
            v-bind="inputBind"
            :type="!isTypeMonth ? 'date' : 'month'"
            autocomplete="off"
            :value="formatNative(computedValue)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :rounded="rounded"
            :loading="loading"
            :max="formatNative(maxDate)"
            :min="formatNative(minDate)"
            :disabled="disabled"
            :readonly="false"
            :use-html5-validation="false"
            @change.native="onChangeNativePicker"
            @focus="onFocus"
            @blur="onBlur"/>
    </div>
</template>

<script>
import FormElementMixin from '../../utils/FormElementMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import MatchMediaMixin from '../../utils/MatchMediaMixin'

import { isMobile, getMonthNames, getWeekdayNames, matchWithGroups, getValueByPath } from '../../utils/helpers'
import config from '../../utils/config'

import Dropdown from '../dropdown/Dropdown'
import DropdownItem from '../dropdown/DropdownItem'
import Input from '../input/Input'
import Field from '../field/Field'
import Select from '../select/Select'
import Icon from '../icon/Icon'

import DatepickerTable from './DatepickerTable'

const defaultDateFormatter = (date, vm) => {
    const targetDates = Array.isArray(date) ? date : [date]
    const dates = targetDates.map((date) => {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12)
        return !vm.isTypeMonth ? vm.dtf.format(d) : vm.dtfMonth.format(d)
    })
    return !vm.multiple ? dates.join(' - ') : dates.join(', ')
}

const defaultDateParser = (date, vm) => {
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
        const formatRegex = (vm.isTypeMonth ? vm.dtfMonth : vm.dtf)
            .formatToParts(new Date(2000, 11, 25)).map((part) => {
                if (part.type === 'literal') {
                    return part.value
                }
                return `((?!=<${part.type}>)\\d+)`
            }).join('')
        const dateGroups = matchWithGroups(formatRegex, date)

        // We do a simple validation for the group.
        // If it is not valid, it will fallback to Date.parse below
        if (
            dateGroups.year &&
            dateGroups.year.length === 4 &&
            dateGroups.month &&
            dateGroups.month <= 12
        ) {
            if (vm.isTypeMonth) return new Date(dateGroups.year, dateGroups.month - 1)
            else if (dateGroups.day && dateGroups.day <= 31) {
                return new Date(dateGroups.year, dateGroups.month - 1, dateGroups.day, 12)
            }
        }
    }
    // Fallback if formatToParts is not supported or if we were not able to parse a valid date
    if (!vm.isTypeMonth) return new Date(Date.parse(date))
    if (date) {
        const s = date.split('/')
        const year = s[0].length === 4 ? s[0] : s[1]
        const month = s[0].length === 2 ? s[0] : s[1]
        if (year && month) {
            return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0)
        }
    }
    return null
}

/**
 * An input with a simple dropdown/modal for selecting a date, uses native datepicker for mobile
 * @displayName Datepicker
 * @example ./examples/Datepicker.md
 */
export default {
    name: 'ODatepicker',
    components: {
        [DatepickerTable.name]: DatepickerTable,
        [Input.name]: Input,
        [Field.name]: Field,
        [Select.name]: Select,
        [Icon.name]: Icon,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem
    },
    configField: 'datepicker',
    mixins: [BaseComponentMixin, FormElementMixin, MatchMediaMixin],
    inheritAttrs: false,
    provide() {
        return {
            $datepicker: this
        }
    },
    props: {
        value: {
            type: [Date, Array]
        },
        dayNames: {
            type: Array,
            default: () => {
                return getValueByPath(config, 'datepicker.dayNames', undefined)
            }
        },
        monthNames: {
            type: Array,
            default: () => {
                return getValueByPath(config, 'datepicker.monthNames', undefined)
            }
        },
        firstDayOfWeek: {
            type: Number,
            default: () => {
                return getValueByPath(config, 'datepicker.firstDayOfWeek', 0)
            }
        },
        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: String,
        inline: Boolean,
        minDate: Date,
        maxDate: Date,
        focusedDate: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        horizontalTimePicker: Boolean,
        unselectableDates: Array,
        unselectableDaysOfWeek: {
            type: Array,
            default: () => {
                return getValueByPath(config, 'datepicker.unselectableDaysOfWeek', undefined)
            }
        },
        selectableDates: Array,
        dateFormatter: {
            type: Function,
            default: (date, vm) => {
                const dateFormatter = getValueByPath(config, 'datepicker.dateFormatter', undefined)
                if (typeof dateFormatter === 'function') {
                    return dateFormatter(date)
                } else {
                    return defaultDateFormatter(date, vm)
                }
            }
        },
        dateParser: {
            type: Function,
            default: (date, vm) => {
                const dateParser = getValueByPath(config, 'datepicker.dateParser', undefined)
                if (typeof dateParser === 'function') {
                    return dateParser(date)
                } else {
                    return defaultDateParser(date, vm)
                }
            }
        },
        dateCreator: {
            type: Function,
            default: () => {
                const dateCreator = getValueByPath(config, 'datepicker.dateCreator', undefined)
                if (typeof dateCreator === 'function') {
                    return dateCreator()
                } else {
                    return new Date()
                }
            }
        },
        mobileNative: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'datepicker.mobileNative', true)
            }
        },
        position: String,
        iconRight: String,
        events: Array,
        indicators: {
            type: String,
            default: 'dots'
        },
        openOnFocus: Boolean,
        iconPrev: {
            type: String,
            default: () => {
                return getValueByPath(config, 'datepicker.iconPrev', 'chevron-left')
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return getValueByPath(config, 'datepicker.iconNext', 'chevron-right')
            }
        },
        yearsRange: {
            type: Array,
            default: () => {
                return getValueByPath(config, 'datepicker.yearsRange', [-100, 10])
            }
        },
        type: {
            type: String,
            validator: (value) => {
                return [
                    'month'
                ].indexOf(value) >= 0
            }
        },
        nearbyMonthDays: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'datepicker.nearbyMonthDays', true)
            }
        },
        nearbySelectableMonthDays: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'datepicker.nearbySelectableMonthDays', false)
            }
        },
        showWeekNumber: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'datepicker.showWeekNumber', false)
            }
        },
        weekNumberClickable: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'datepicker.weekNumberClickable', false)
            }
        },
        rulesForFirstWeek: {
            type: Number,
            default: () => 4
        },
        range: {
            type: Boolean,
            default: false
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        mobileModal: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'datepicker.mobileModal', true)
            }
        },
        trapFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(config, 'datepicker.trapFocus', true)
            }
        },
        locale: {
            type: [String, Array],
            default: () => {
                return getValueByPath(config, 'locale')
            }
        },
        appendToBody: Boolean,
        ariaNextLabel: String,
        ariaPreviousLabel: String,
        rootClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        boxClass: [String, Function, Array],
        headerClass: [String, Function, Array],
        headerButtonsClass: [String, Function, Array],
        headerButtonsSizeClass: [String, Function, Array],
        prevBtnClass: [String, Function, Array],
        nextBtnClass: [String, Function, Array],
        listsClass: [String, Function, Array],
        footerClass: [String, Function, Array],
        tableClass: [String, Function, Array],
        tableHeadClass: [String, Function, Array],
        tableHeadCellClass: [String, Function, Array],
        tableBodyClass: [String, Function, Array],
        tableRowClass: [String, Function, Array],
        tableCellClass: [String, Function, Array],
        tableCellSelectedClass: [String, Function, Array],
        tableCellFirstSelectedClass: [String, Function, Array],
        tableCellInvisibleClass: [String, Function, Array],
        tableCellWithinSelectedClass: [String, Function, Array],
        tableCellLastSelectedClass: [String, Function, Array],
        tableCellFirstHoveredClass: [String, Function, Array],
        tableCellWithinHoveredClass: [String, Function, Array],
        tableCellLastHoveredClass: [String, Function, Array],
        tableCellTodayClass: [String, Function, Array],
        tableCellSelectableClass: [String, Function, Array],
        tableCellUnselectableClass: [String, Function, Array],
        tableCellNearbyClass: [String, Function, Array],
        tableCellEventsClass: [String, Function, Array],
        tableEventsClass: [String, Function, Array],
        tableEventVariantClass: [String, Function, Array],
        tableEventClass: [String, Function, Array],
        tableEventIndicatorsClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
        /** Classes to apply on internal input (@see o-input style docs) */
        inputClasses: Object,
        /** Classes to apply on internal dropdown (@see o-dropdown style docs) */
        dropdownClasses: Object
    },
    data() {
        const focusedDate = (Array.isArray(this.value) ? this.value[0] : (this.value)) ||
            this.focusedDate || this.dateCreator()

        if (!this.value && this.maxDate && this.maxDate.getFullYear() < new Date().getFullYear()) {
            focusedDate.setFullYear(this.maxDate.getFullYear())
        }

        return {
            dateSelected: this.value,
            focusedDateData: {
                day: focusedDate.getDate(),
                month: focusedDate.getMonth(),
                year: focusedDate.getFullYear()
            },
            $elementRef: 'input'
        }
    },
    computed: {
        inputBind() {
            return {
                ...this.$attrs,
                ...this.inputClasses
            }
        },
        dropdownBind() {
            return {
                ...this.dropdownClasses
            }
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-dpck'),
                { [this.computedClass('sizeClass', 'o-dpck--', this.size)]: this.size },
                 { [this.computedClass('mobileClass', 'o-dpck--mobile')]: this.isMatchMedia },
            ]
        },
        boxClasses() {
            return [
                this.computedClass('boxClass', 'o-dpck__box')
            ]
        },
        headerClasses() {
            return [
                this.computedClass('headerClass', 'o-dpck__header')
            ]
        },
        headerButtonsClasses() {
            return [
                this.computedClass('headerButtonsClass', 'o-dpck__header__buttons'),
                { [this.computedClass('headerButtonsSizeClass', 'o-dpck__header__buttons--', this.size)]: this.size },
            ]
        },
        prevBtnClasses() {
            return [
                this.computedClass('prevBtnClass', 'o-dpck__header__previous')
            ]
        },
        nextBtnClasses() {
            return [
                this.computedClass('nextBtnClass', 'o-dpck__header__next')
            ]
        },
        listsClasses() {
            return [
                this.computedClass('listsClass', 'o-dpck__header__list')
            ]
        },
        footerClasses() {
            return [
                this.computedClass('footerClass', 'o-dpck__footer')
            ]
        },

        computedValue: {
            get() {
                return this.dateSelected
            },
            set(value) {
                this.updateInternalState(value)
                if (!this.multiple) this.togglePicker(false)
                this.$emit('input', value)
                if (this.useHtml5Validation) {
                    this.$nextTick(() => {
                        this.checkHtml5Validity()
                    })
                }
            }
        },
        formattedValue() {
            return this.formatValue(this.computedValue)
        },
        localeOptions() {
            return new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                month: 'numeric'
            }).resolvedOptions()
        },
        dtf() {
            return new Intl.DateTimeFormat(this.locale, { timeZone: 'UTC' })
        },
        dtfMonth() {
            return new Intl.DateTimeFormat(this.locale, {
                year: this.localeOptions.year || 'numeric',
                month: this.localeOptions.month || '2-digit',
                timeZone: 'UTC'
            })
        },
        newMonthNames() {
            if (Array.isArray(this.monthNames)) {
                return this.monthNames
            }
            return getMonthNames(this.locale)
        },
        newDayNames() {
            if (Array.isArray(this.dayNames)) {
                return this.dayNames
            }
            return getWeekdayNames(this.locale)
        },
        listOfMonths() {
            let minMonth = 0
            let maxMonth = 12
            if (this.minDate && this.focusedDateData.year === this.minDate.getFullYear()) {
                minMonth = this.minDate.getMonth()
            }
            if (this.maxDate && this.focusedDateData.year === this.maxDate.getFullYear()) {
                maxMonth = this.maxDate.getMonth()
            }
            return this.newMonthNames.map((name, index) => {
                return {
                    name: name,
                    index: index,
                    disabled: index < minMonth || index > maxMonth
                }
            })
        },
        /*
         * Returns an array of years for the year dropdown. If earliest/latest
         * dates are set by props, range of years will fall within those dates.
         */
        listOfYears() {
            let latestYear = this.focusedDateData.year + this.yearsRange[1]
            if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
                latestYear = Math.max(this.maxDate.getFullYear(), this.focusedDateData.year)
            }

            let earliestYear = this.focusedDateData.year + this.yearsRange[0]
            if (this.minDate && this.minDate.getFullYear() > earliestYear) {
                earliestYear = Math.min(this.minDate.getFullYear(), this.focusedDateData.year)
            }

            const arrayOfYears = []
            for (let i = earliestYear; i <= latestYear; i++) {
                arrayOfYears.push(i)
            }

            return arrayOfYears.reverse()
        },

        showPrev() {
            if (!this.minDate) return false
            if (this.isTypeMonth) {
                return this.focusedDateData.year <= this.minDate.getFullYear()
            }
            const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month)
            const date = new Date(this.minDate.getFullYear(), this.minDate.getMonth())
            return (dateToCheck <= date)
        },

        showNext() {
            if (!this.maxDate) return false
            if (this.isTypeMonth) {
                return this.focusedDateData.year >= this.maxDate.getFullYear()
            }
            const dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month)
            const date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth())
            return (dateToCheck >= date)
        },

        isMobile() {
            return this.mobileNative && isMobile.any()
        },

        isTypeMonth() {
            return this.type === 'month'
        },

        ariaRole() {
            return !this.inline ? 'dialog' : undefined
        }
    },
    watch: {
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
            this.updateInternalState(value)
            if (!this.multiple) this.togglePicker(false)
        },

        focusedDate(value) {
            if (value) {
                this.focusedDateData = {
                    day: value.getDate(),
                    month: value.getMonth(),
                    year: value.getFullYear()
                }
            }
        },

        /*
         * Emit input event on month and/or year change
         */
        'focusedDateData.month'(value) {
            this.$emit('change-month', value)
        },
        'focusedDateData.year'(value) {
            this.$emit('change-year', value)
        }
    },
    methods: {
        /*
         * Parse string into date
         */
        onChange(value) {
            const date = this.dateParser(value, this)
            if (date && (!isNaN(date) ||
                (Array.isArray(date) && date.length === 2 && !isNaN(date[0]) && !isNaN(date[1])))) {
                this.computedValue = date
            } else {
                // Force refresh input value when not valid date
                this.computedValue = null
                if (this.$refs.input) {
                    this.$refs.input.newValue = this.computedValue
                }
            }
        },

        /*
         * Format date into string
         */
        formatValue(value) {
            if (Array.isArray(value)) {
                const isArrayWithValidDates = Array.isArray(value) && value.every((v) => !isNaN(v))
                return isArrayWithValidDates ? this.dateFormatter([...value], this) : null
            }
            return (value && !isNaN(value)) ? this.dateFormatter(value, this) : null
        },

        /*
         * Either decrement month by 1 if not January or decrement year by 1
         * and set month to 11 (December) or decrement year when 'month'
         */
        prev() {
            if (this.disabled) return

            if (this.isTypeMonth) {
                this.focusedDateData.year -= 1
            } else {
                if (this.focusedDateData.month > 0) {
                    this.focusedDateData.month -= 1
                } else {
                    this.focusedDateData.month = 11
                    this.focusedDateData.year -= 1
                }
            }
        },

        /*
         * Either increment month by 1 if not December or increment year by 1
         * and set month to 0 (January) or increment year when 'month'
         */
        next() {
            if (this.disabled) return

            if (this.isTypeMonth) {
                this.focusedDateData.year += 1
            } else {
                if (this.focusedDateData.month < 11) {
                    this.focusedDateData.month += 1
                } else {
                    this.focusedDateData.month = 0
                    this.focusedDateData.year += 1
                }
            }
        },

        formatNative(value) {
            return this.isTypeMonth
                ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value)
        },

        /*
         * Format date into string 'YYYY-MM-DD'
         */
        formatYYYYMMDD(value) {
            const date = new Date(value)
            if (value && !isNaN(date.getTime())) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                return year + '-' +
                    ((month < 10 ? '0' : '') + month) + '-' +
                    ((day < 10 ? '0' : '') + day)
            }
            return ''
        },

        /*
         * Format date into string 'YYYY-MM'
         */
        formatYYYYMM(value) {
            const date = new Date(value)
            if (value && !isNaN(date.getTime())) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                return year + '-' +
                    ((month < 10 ? '0' : '') + month)
            }
            return ''
        },

        /*
         * Parse date from string
         */
        onChangeNativePicker(event) {
            const date = event.target.value
            const s = date ? date.split('-') : []
            if (s.length === 3) {
                const year = parseInt(s[0], 10)
                const month = parseInt(s[1]) - 1
                const day = parseInt(s[2])
                this.computedValue = new Date(year, month, day)
            } else {
                this.computedValue = null
            }
        },
        updateInternalState(value) {
            const currentDate = Array.isArray(value)
                ? (!value.length ? this.dateCreator() : value[0])
                : (!value ? this.dateCreator() : value)
            this.focusedDateData = {
                day: currentDate.getDate(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear()
            }
            this.dateSelected = value
        },

        /*
         * Toggle datepicker
         */
        togglePicker(active) {
            if (this.$refs.dropdown) {
                if (this.closeOnClick) {
                    this.$refs.dropdown.isActive = typeof active === 'boolean'
                        ? active
                        : !this.$refs.dropdown.isActive
                }
            }
        },

        /*
         * Call default onFocus method and show datepicker
         */
        handleOnFocus(event) {
            this.onFocus(event)
            if (this.openOnFocus) {
                this.togglePicker(true)
            }
        },

        /*
         * Toggle dropdown
         */
        toggle() {
            if (this.mobileNative && this.isMobile) {
                const input = this.$refs.input.$refs.input
                input.focus()
                input.click()
                return
            }
            this.$refs.dropdown.toggle()
        },

        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event) {
            if (this.$refs.dropdown.isActive) {
                event.stopPropagation()
            }
        },

        /**
         * Keypress event that is bound to the document.
         */
        keyPress({ key }) {
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
                this.togglePicker(false)
            }
        },

        /**
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
            if (!value) {
                this.onBlur()
            }
        },

        changeFocus(day) {
            this.focusedDateData = {
                day: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear()
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress)
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress)
        }
    }
}
</script>
