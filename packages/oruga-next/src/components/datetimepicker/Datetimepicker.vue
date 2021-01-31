<template>
    <o-datepicker
        v-if="!isMobile || inline"
        ref="datepicker"
        v-model="computedValue"
        v-bind="datepicker"
        :class="datepickerWrapperClasses"
        :rounded="rounded"
        :open-on-focus="openOnFocus"
        :position="position"
        :inline="inline"
        :editable="editable"
        :expanded="expanded"
        :close-on-click="false"
        :date-formatter="defaultDatetimeFormatter"
        :date-parser="defaultDatetimeParser"
        :min-date="minDate"
        :max-date="maxDate"
        :icon="icon"
        :icon-pack="iconPack"
        :size="datepickerSize"
        :placeholder="placeholder"
        :range="false"
        :disabled="disabled"
        :mobile-native="isMobileNative"
        :locale="locale"
        :append-to-body="appendToBody"
        @focus="onFocus"
        @blur="onBlur"
        @change-month="$emit('change-month', $event)"
        @change-year="$emit('change-year', $event)">
        <div :class="timepickerWrapperClasses">
            <o-timepicker
                ref="timepicker"
                v-bind="timepicker"
                v-model="computedValue"
                inline
                :editable="editable"
                :min-time="minTime"
                :max-time="maxTime"
                :size="timepickerSize"
                :disabled="timepickerDisabled"
                :mobile-native="isMobileNative"
                :locale="locale"
            />
        </div>
        <template v-if="$slots.default !== undefined && $slots.default.length">
            <slot/>
        </template>
    </o-datepicker>
    <o-input
        v-else
        ref="input"
        type="datetime-local"
        autocomplete="off"
        :value="formatNative(computedValue)"
        :placeholder="placeholder"
        :size="size"
        :icon="icon"
        :icon-pack="iconPack"
        :rounded="rounded"
        :max="formatNative(maxDate)"
        :min="formatNative(minDate)"
        :disabled="disabled"
        :readonly="false"
        v-bind="$attrs"
        :use-html5-validation="useHtml5Validation"
        @change="onChangeNativePicker"
        @focus="onFocus"
        @blur="onBlur"/>
</template>

<script lang="ts">
import FormElementMixin from '../../utils/FormElementMixin'
import BaseComponentMixin from '../../utils/BaseComponentMixin'
import { getValueByPath, isMobile, matchWithGroups } from '../../utils/helpers'
import config from '../../utils/config'

import Datepicker from '../datepicker/Datepicker.vue'
import Timepicker from '../timepicker/Timepicker.vue'
import { defineComponent } from 'vue'

const AM = 'AM'
const PM = 'PM'

/**
 * An input with a simple dropdown/modal for selecting a date and time, uses native datetimepicker for mobile
 * @displayName Datetimepicker
 * @example ./examples/Datetimepicker.md
 */
export default defineComponent({
    name: 'ODatetimepicker',
    components: {
        [Datepicker.name]: Datepicker,
        [Timepicker.name]: Timepicker
    },
    configField: 'datetimepicker',
    mixins: [FormElementMixin, BaseComponentMixin],
    inheritAttrs: false,
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: Date
        },
        editable: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        disabled: Boolean,
        icon: String,
        iconPack: String,
        inline: Boolean,
        openOnFocus: Boolean,
        position: String,
        mobileNative: {
            type: Boolean,
            default: true
        },
        minDatetime: Date,
        maxDatetime: Date,
        datetimeFormatter: {
            type: Function
        },
        datetimeParser: {
            type: Function
        },
        datetimeCreator: {
            type: Function,
            default: (date: Date) => {
                const datetimeCreator = getValueByPath(config, 'datetimepicker.datetimeCreator', undefined)
                if (typeof datetimeCreator === 'function') {
                    return datetimeCreator(date)
                } else {
                    return date
                }
            }
        },
        datepicker: Object,
        timepicker: Object,
        locale: {
            type: [String, Array],
            default: () => {
                return getValueByPath(config, 'locale')
            }
        },
        appendToBody: Boolean,
        datepickerWrapperClass: [String, Function, Array],
        timepickerWrapperClass: [String, Function, Array],
    },
    data() {
        return {
            newValue: this.modelValue
        }
    },
    computed: {
        datepickerWrapperClasses() {
            return [
                this.computedClass('datepickerWrapperClass', 'o-dtpck__date')
            ]
        },
        timepickerWrapperClasses() {
            return [
                this.computedClass('timepickerWrapperClass', 'o-dtpck__time')
            ]
        },
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                if (value) {
                    let val = new Date(value.getTime())
                    if (this.newValue) {
                        // restore time part
                        if ((value.getDate() !== this.newValue.getDate() ||
                            value.getMonth() !== this.newValue.getMonth() ||
                            value.getFullYear() !== this.newValue.getFullYear()) &&
                            value.getHours() === 0 &&
                            value.getMinutes() === 0 &&
                            value.getSeconds() === 0) {
                            val.setHours(this.newValue.getHours(),
                                this.newValue.getMinutes(),
                                this.newValue.getSeconds(), 0)
                        }
                    } else {
                        val = this.datetimeCreator(value)
                    }
                    // check min and max range
                    if (this.minDatetime && val < this.minDatetime) {
                        val = this.minDatetime
                    } else if (this.maxDatetime && val > this.maxDatetime) {
                        val = this.maxDatetime
                    }
                    this.newValue = new Date(val.getTime())
                } else {
                    this.newValue = this.modelValue
                }
                this.$emit('update:modelValue', this.newValue)
            }
        },
        localeOptions() {
            return new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: this.enableSeconds() ? 'numeric' : undefined
            }).resolvedOptions()
        },
        dtf() {
            return new Intl.DateTimeFormat(this.locale, {
                year: this.localeOptions.year || 'numeric',
                month: this.localeOptions.month || 'numeric',
                day: this.localeOptions.day || 'numeric',
                hour: this.localeOptions.hour || 'numeric',
                minute: this.localeOptions.minute || 'numeric',
                second: this.enableSeconds() ? this.localeOptions.second || 'numeric' : undefined,
                hour12: !this.isHourFormat24(),
                // timeZone: 'UTC'
            })
        },
        isMobileNative() {
            return this.mobileNative
        },
        isMobile() {
            return this.isMobileNative && isMobile.any()
        },
        minDate() {
            if (!this.minDatetime) {
                return this.datepicker ? this.datepicker.minDate : null
            }
            return new Date(this.minDatetime.getFullYear(),
                this.minDatetime.getMonth(),
                this.minDatetime.getDate(), 0, 0, 0, 0)
        },
        maxDate() {
            if (!this.maxDatetime) {
                return this.datepicker ? this.datepicker.maxDate : null
            }
            return new Date(this.maxDatetime.getFullYear(),
                this.maxDatetime.getMonth(),
                this.maxDatetime.getDate(), 0, 0, 0, 0)
        },
        minTime() {
            if (!this.minDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.timepicker.minTime : null
            }
            return this.minDatetime
        },
        maxTime() {
            if (!this.maxDatetime || (this.newValue === null || typeof this.newValue === 'undefined')) {
                return this.timepicker ? this.timepicker.maxTime : null
            }
            return this.maxDatetime
        },
        datepickerSize() {
            return this.datepicker && this.datepicker.size
                ? this.datepicker.size : this.size
        },
        timepickerSize() {
            return this.timepicker && this.timepicker.size
                ? this.timepicker.size : this.size
        },
        timepickerDisabled() {
            return this.timepicker && this.timepicker.disabled
                ? this.timepicker.disabled : this.disabled
        }
    },
    watch: {
        modelValue(value) {
            this.newValue = value
        }
    },
    methods: {
        enableSeconds() {
            if (this.$refs.timepicker) {
                return this.$refs.timepicker.enableSeconds
            }
            return false
        },
        isHourFormat24() {
            if (this.$refs.timepicker) {
                return this.$refs.timepicker.isHourFormat24
            }
            return !this.localeOptions.hour12
        },
        defaultDatetimeParser(date) {
            const datetimeParser = getValueByPath(config, 'datetimepicker.datetimeParser', undefined)
            if (typeof this.datetimeParser === 'function') {
                return this.datetimeParser(date)
            } else if (typeof datetimeParser === 'function') {
                return datetimeParser(date)
            } else {
                if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                    let dayPeriods = [AM, PM, AM.toLowerCase(), PM.toLowerCase()]
                    if (this.$refs.timepicker) {
                        dayPeriods.push(this.$refs.timepicker.amString)
                        dayPeriods.push(this.$refs.timepicker.pmString)
                    }
                    const parts = this.dtf.formatToParts(new Date())
                    const formatRegex = parts.map((part, idx) => {
                        if (part.type === 'literal') {
                            if (idx + 1 < parts.length && parts[idx + 1].type === 'hour') {
                                return `[^\\d]+`
                            }
                            return part.value.replace(/ /g, '\\s?')
                        } else if (part.type === 'dayPeriod') {
                            return `((?!=<${part.type}>)(${dayPeriods.join('|')})?)`
                        }
                        return `((?!=<${part.type}>)\\d+)`
                    }).join('')
                    const datetimeGroups = matchWithGroups(formatRegex, date)

                    // We do a simple validation for the group.
                    // If it is not valid, it will fallback to Date.parse below
                    if (
                        datetimeGroups.year &&
                        datetimeGroups.year.length === 4 &&
                        datetimeGroups.month &&
                        datetimeGroups.month <= 12 &&
                        datetimeGroups.day &&
                        datetimeGroups.day <= 31 &&
                        datetimeGroups.hour &&
                        datetimeGroups.hour >= 0 &&
                        datetimeGroups.hour < 24 &&
                        datetimeGroups.minute &&
                        datetimeGroups.minute >= 0 &&
                        datetimeGroups.minute < 59
                    ) {
                        const d = new Date(
                            datetimeGroups.year,
                            datetimeGroups.month - 1,
                            datetimeGroups.day,
                            datetimeGroups.hour,
                            datetimeGroups.minute,
                            datetimeGroups.second || 0)
                        return d
                    }
                }

                return new Date(Date.parse(date))
            }
        },
        defaultDatetimeFormatter(date) {
             const datetimeFormatter = getValueByPath(config, 'datetimepicker.datetimeFormatter', undefined)
            if (typeof this.datetimeFormatter === 'function') {
                return this.datetimeFormatter(date)
            } else if (typeof datetimeFormatter === 'function') {
                return datetimeFormatter(date)
            } else {
                return this.dtf.format(date)
            }
        },
        /*
        * Parse date from string
        */
        onChangeNativePicker(event) {
            const date = event.target.value
            const s = date ? date.split(/\D/) : []
            if (s.length >= 5) {
                const year = parseInt(s[0], 10)
                const month = parseInt(s[1], 10) - 1
                const day = parseInt(s[2], 10)
                const hours = parseInt(s[3], 10)
                const minutes = parseInt(s[4], 10)
                // Seconds are omitted intentionally; they are unsupported by input
                // type=datetime-local and cause the control to fail native validation
                this.computedValue = new Date(year, month, day, hours, minutes)
            } else {
                this.computedValue = null
            }
        },
        formatNative(value) {
            const date = new Date(value)
            if (value && !isNaN(date.getTime())) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                const hours = date.getHours()
                const minutes = date.getMinutes()
                const seconds = date.getSeconds()
                return year + '-' +
                    ((month < 10 ? '0' : '') + month) + '-' +
                    ((day < 10 ? '0' : '') + day) + 'T' +
                    ((hours < 10 ? '0' : '') + hours) + ':' +
                    ((minutes < 10 ? '0' : '') + minutes) + ':' +
                    ((seconds < 10 ? '0' : '') + seconds)
            }
            return ''
        },
        toggle() {
            this.$refs.datepicker.toggle()
        }
    },
    mounted() {
        if (!this.isMobile || this.inline) {
            // $refs attached, it's time to refresh datepicker (input)
            if (this.newValue) {
                this.$refs.datepicker.$forceUpdate()
            }
        }
    }
})
</script>
