<template>
    <section :class="monthClasses">
        <div :class="monthBodyClasses">
            <div :class="monthTableClasses">
            <template
                v-for="(date, index) in monthDates"
                :key="index">
                <a
                    :ref="`month-${date.getMonth()}`"
                    v-if="selectableDate(date) && !disabled"
                    :class="cellClasses(date)"
                    role="button"
                    href="#"
                    :disabled="disabled"
                    @click.prevent="updateSelectedDate(date)"
                    @mouseenter="setRangeHoverEndDate(date)"
                    @keydown.prevent="manageKeydown($event, date)"
                    :tabindex="focused.month === date.getMonth() ? null : -1">
                    {{ monthNames[date.getMonth()] }}
                    <div class="events" v-if="eventsDateMatch(date)">
                        <div
                            v-for="(event, index) in (eventsDateMatch(date) as any[])"
                            :key="index" 
                            class="event"
                            :class="event.type"/>
                    </div>
                </a>
                <div
                    v-else
                    :class="cellClasses(date)">
                    {{ monthNames[date.getMonth()] }}
                </div>
            </template>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { isDefined } from '../../utils/helpers'

import BaseComponentMixin from '../../utils/BaseComponentMixin'
import DatepickerMixin from './DatepickerMixin'

export default {
    name: 'ODatepickerMonth',
    mixins: [BaseComponentMixin, DatepickerMixin],
    configField: 'datepicker',
    emits: ['update:modelValue', 'range-start', 'range-end', 'updated:focused'],
    props: {
        modelValue: {
            type: [Date, Array]
        },
        monthNames: Array,
        events: Array,
        indicators: String,
        minDate: Date,
        maxDate: Date,
        focused: Object,
        disabled: Boolean,
        dateCreator: Function,
        unselectableDates: [Array, Function],
        unselectableDaysOfWeek: Array,
        selectableDates: [Array, Function],
        range: Boolean,
        multiple: Boolean,
        monthClass: [String, Function, Array],
        monthBodyClass: [String, Function, Array],
        monthTableClass: [String, Function, Array],
        monthCellClass: [String, Function, Array],
        monthCellSelectedClass: [String, Function, Array],
        monthCellFirstSelectedClass: [String, Function, Array],
        monthCellWithinSelectedClass: [String, Function, Array],
        monthCellLastSelectedClass: [String, Function, Array],
        monthCellWithinHoveredRangeClass: [String, Function, Array],
        monthCellFirstHoveredClass: [String, Function, Array],
        monthCellWithinHoveredClass: [String, Function, Array],
        monthCellLastHoveredClass: [String, Function, Array],
        monthCellTodayClass: [String, Function, Array],
        monthCellSelectableClass: [String, Function, Array],
        monthCellUnselectableClass: [String, Function, Array],
        monthCellEventsClass: [String, Function, Array]
    },
    data() {
        return {
            selectedBeginDate: undefined,
            selectedEndDate: undefined,
            hoveredEndDate: undefined,
            multipleSelectedDates: this.multiple && this.modelValue ? this.modelValue : []
        }
    },
    computed: {
        monthClasses() {
            return [
                this.computedClass('monthClass', 'o-dpck__month')
            ]
        },
        monthBodyClasses() {
            return [
                this.computedClass('monthBodyClass', 'o-dpck__month__body')
            ]
        },
        monthTableClasses() {
            return [
                this.computedClass('monthTableClass', 'o-dpck__month__table')
            ]
        },
        monthCellClasses() {
            return [
                this.computedClass('monthCellClass', 'o-dpck__month__cell')
            ]
        },
        hasEvents() {
            return this.events && this.events.length
        },

        /*
        * Return array of all events in the specified month
        */
        eventsInThisYear() {
            if (!this.events) return []

            const yearEvents = []

            for (let i = 0; i < this.events.length; i++) {
                let event = this.events[i]

                if (!Object.prototype.hasOwnProperty.call(event, 'date')) {
                    event = { date: event }
                }
                if (!Object.prototype.hasOwnProperty.call(event, 'type')) {
                    event.type = 'is-primary'
                }
                if (
                    event.date.getFullYear() === this.focused.year
                ) {
                    yearEvents.push(event)
                }
            }

            return yearEvents
        },
        monthDates() {
            const year = this.focused.year
            const months = []
            for (let i = 0; i < 12; i++) {
                const d = new Date(year, i, 1)
                d.setHours(0, 0, 0, 0)
                months.push(d)
            }
            return months
        },

        focusedMonth() {
            return this.focused.month
        },

        hoveredDateRange() {
            if (!this.range) {
                return []
            }
            if (!isNaN(this.selectedEndDate)) {
                return []
            }
            if (this.hoveredEndDate < this.selectedBeginDate) {
                return [this.hoveredEndDate, this.selectedBeginDate].filter(isDefined)
            }
            return [this.selectedBeginDate, this.hoveredEndDate].filter(isDefined)
        }
    },
    watch: {
        focusedMonth(month) {
            const refName = `month-${month}`
            if (this.$refs[refName] && this.$refs[refName].length > 0) {
                this.$nextTick(() => {
                    if (this.$refs[refName][0]) {
                        this.$refs[refName][0].focus()
                    }
                }) // $nextTick needed when year is changed
            }
        }
    },
    methods: {
        selectMultipleDates(date) {
            const multipleSelect = this.multipleSelectedDates.filter((selectedDate) =>
                selectedDate.getDate() === date.getDate() &&
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth()
            )
            if (multipleSelect.length) {
                this.multipleSelectedDates = this.multipleSelectedDates.filter((selectedDate) =>
                    selectedDate.getDate() !== date.getDate() ||
                    selectedDate.getFullYear() !== date.getFullYear() ||
                    selectedDate.getMonth() !== date.getMonth()
                )
            } else {
                this.multipleSelectedDates.push(date)
            }
            this.$emit('update:modelValue', this.multipleSelectedDates)
        },

        selectableDate(day) {
            const validity = []

            if (this.minDate) {
                validity.push(day >= this.minDate)
            }

            if (this.maxDate) {
                validity.push(day <= this.maxDate)
            }

            validity.push(day.getFullYear() === this.focused.year)

            if (this.selectableDates) {
                if (typeof this.selectableDates === 'function') {
                    if (this.selectableDates(day)) {
                        return true
                    } else {
                        validity.push(false)
                    }
                } else {
                    for (let i = 0; i < this.selectableDates.length; i++) {
                        const enabledDate = this.selectableDates[i]
                        if (day.getFullYear() === enabledDate.getFullYear() &&
                            day.getMonth() === enabledDate.getMonth()) {
                            return true
                        } else {
                            validity.push(false)
                        }
                    }
                }
            }

            if (this.unselectableDates) {
                if (typeof this.unselectableDates === 'function') {
                    validity.push(!this.unselectableDates(day))
                } else {
                    for (let i = 0; i < this.unselectableDates.length; i++) {
                        const disabledDate = this.unselectableDates[i]
                        validity.push(
                            day.getFullYear() !== disabledDate.getFullYear() ||
                                day.getMonth() !== disabledDate.getMonth()
                        )
                    }
                }
            }

            if (this.unselectableDaysOfWeek) {
                for (let i = 0; i < this.unselectableDaysOfWeek.length; i++) {
                    const dayOfWeek = this.unselectableDaysOfWeek[i]
                    validity.push(day.getDay() !== dayOfWeek)
                }
            }

            return validity.indexOf(false) < 0
        },
        eventsDateMatch(day) {
            if (!this.eventsInThisYear.length) return false

            const monthEvents = []

            for (let i = 0; i < this.eventsInThisYear.length; i++) {
                if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
                    monthEvents.push(this.events[i])
                }
            }

            if (!monthEvents.length) {
                return false
            }

            return monthEvents
        },
        /*
        * Build cellClasses for cell using validations
        */
        cellClasses(day) {
            function dateMatch(dateOne, dateTwo, multiple = false) {
                // if either date is null or undefined, return false
                if (!dateOne || !dateTwo || multiple) {
                    return false
                }
                if (Array.isArray(dateTwo)) {
                    return dateTwo.some((date) => (
                        dateOne.getFullYear() === date.getFullYear() &&
                        dateOne.getMonth() === date.getMonth()
                    ))
                }
                return (dateOne.getFullYear() === dateTwo.getFullYear() &&
                    dateOne.getMonth() === dateTwo.getMonth())
            }
            function dateWithin(dateOne, dates, multiple = false) {
                if (!Array.isArray(dates) || multiple) { return false }

                return dateOne > dates[0] && dateOne < dates[1]
            }
            function dateMultipleSelected(dateOne, dates, multiple = false) {
                if (!Array.isArray(dates) || !multiple) { return false }
                return dates.some((date) => (
                    dateOne.getDate() === date.getDate() &&
                    dateOne.getFullYear() === date.getFullYear() &&
                    dateOne.getMonth() === date.getMonth()
                ))
            }

            return [
                ...this.monthCellClasses,
                {
                    [this.computedClass('monthCellSelectedClass', 'o-dpck__month__cell--selected')] :
                        dateMatch(day, this.modelValue, this.multiple) ||
                        dateWithin(day, this.modelValue, this.multiple) ||
                        dateMultipleSelected(day, this.multipleSelectedDates, this.multiple)
                },
                {
                    [this.computedClass('monthCellFirstSelectedClass', 'o-dpck__month__cell--first-selected')] :
                        dateMatch(
                            day,
                            Array.isArray(this.modelValue) && this.modelValue[0],
                            this.multiple)
                },
                {
                    [this.computedClass('monthCellWithinSelectedClass', 'o-dpck__month__cell--within-selected')] :
                        dateWithin(day, this.modelValue, this.multiple)
                },
                {
                    [this.computedClass('monthCellLastSelectedClass', 'o-dpck__month__cell--last-selected')] :
                        dateMatch(
                            day,
                            Array.isArray(this.modelValue) && this.modelValue[1],
                            this.multiple)
                },
                {
                    [this.computedClass('monthCellWithinHoveredRangeClass', 'o-dpck__month__cell--within-hovered-range')] :
                        this.hoveredDateRange && this.hoveredDateRange.length === 2 &&
                        (dateMatch(day, this.hoveredDateRange) ||
                        dateWithin(day, this.hoveredDateRange))
                },
                {
                    [this.computedClass('monthCellFirstHoveredClass', 'o-dpck__month__cell--first-hovered')] :
                       dateMatch(
                            day,
                            Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[0])
                },
                {
                    [this.computedClass('monthCellWithinHoveredClass', 'o-dpck__month__cell--within-hovered')] :
                        dateWithin(day, this.hoveredDateRange)
                },
                {
                    [this.computedClass('monthCellLastHoveredClass', 'o-dpck__month__cell--last-hovered')] :
                        dateMatch(
                            day,
                            Array.isArray(this.hoveredDateRange) && this.hoveredDateRange[1])
                },
                {
                    [this.computedClass('monthCellTodayClass', 'o-dpck__month__cell--today')] :
                        dateMatch(day, this.dateCreator())
                },
                {
                    [this.computedClass('monthCellSelectableclass', 'o-dpck__month__cell--selectable')] :
                        this.selectableDate(day) && !this.disabled
                },
                {
                    [this.computedClass('monthCellUnselectableClass', 'o-dpck__month__cell--unselectable')] :
                        !this.selectableDate(day) || this.disabled
                },
                {
                    [this.computedClass('monthCellEventsClass', 'o-dpck__month__cell--events')] :
                        this.hasEvents
                },
            ]
        },

       /*
        * Emit update:modelValue event with selected date as payload for v-model in parent
        */
        updateSelectedDate(date) {
            if (!this.range && !this.multiple) {
                this.emitChosenDate(date)
            } else if (this.range) {
                this.handleSelectRangeDate(date)
            } else if (this.multiple) {
                this.selectMultipleDates(date)
            }
        },

        /*
         * Emit select event with chosen date as payload
         */
        emitChosenDate(day) {
            if (this.disabled) return

            if (!this.multiple) {
                if (this.selectableDate(day)) {
                    this.$emit('update:modelValue', day)
                }
            } else {
                this.selectMultipleDates(day)
            }
        },

        /*
        * If both begin and end dates are set, reset the end date and set the begin date.
        * If only begin date is selected, emit an array of the begin date and the new date.
        * If not set, only set the begin date.
        */
        handleSelectRangeDate(date) {
            if (this.disabled) return
            if (this.selectedBeginDate && this.selectedEndDate) {
                this.selectedBeginDate = date
                this.selectedEndDate = undefined
                this.$emit('range-start', date)
            } else if (this.selectedBeginDate && !this.selectedEndDate) {
                if (this.selectedBeginDate > date) {
                    this.selectedEndDate = this.selectedBeginDate
                    this.selectedBeginDate = date
                } else {
                    this.selectedEndDate = date
                }
                this.$emit('range-end', date)
                this.$emit('update:modelValue', [this.selectedBeginDate, this.selectedEndDate])
            } else {
                this.selectedBeginDate = date
                this.$emit('range-start', date)
            }
        },

        setRangeHoverEndDate(day) {
            if (this.range) {
                this.hoveredEndDate = day
            }
        },

        changeFocus(month, inc) {
            const nextMonth = month
            nextMonth.setMonth(month.getMonth() + inc)
            this.$emit('update:focused', nextMonth)
        }
    }
}
</script>
